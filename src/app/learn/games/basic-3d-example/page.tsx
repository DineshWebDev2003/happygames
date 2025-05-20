"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Basic3DExample() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<string>('');

  useEffect(() => {
    // Only run if we have a mounted ref
    if (!mountRef.current) return;
    
    // Dynamic imports for Three.js and related modules
    const loadScene = async () => {
      const THREE = await import('three');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
      const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');

      // Create scene, camera, renderer
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87CEEB);
      
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 5, 10);
      
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(800, 500);
      renderer.shadowMap.enabled = true;
      
      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
        mountRef.current.appendChild(renderer.domElement);
      }
      
      // Add orbit controls to move the camera
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();
      
      // Add a loading indicator
      const loadingElem = document.createElement('div');
      loadingElem.style.position = 'absolute';
      loadingElem.style.top = '50%';
      loadingElem.style.left = '50%';
      loadingElem.style.transform = 'translate(-50%, -50%)';
      loadingElem.style.color = 'white';
      loadingElem.style.padding = '10px';
      loadingElem.style.background = 'rgba(0,0,0,0.7)';
      loadingElem.style.borderRadius = '5px';
      loadingElem.textContent = 'Loading 3D model...';
      if (mountRef.current) {
        mountRef.current.appendChild(loadingElem);
      }
      
      // Add a ground plane
      const groundGeometry = new THREE.PlaneGeometry(20, 20);
      const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x7CFC00,
        roughness: 0.8
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);
      
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7.5);
      directionalLight.castShadow = true;
      
      // Better shadows
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      directionalLight.shadow.camera.left = -10;
      directionalLight.shadow.camera.right = 10;
      directionalLight.shadow.camera.top = 10;
      directionalLight.shadow.camera.bottom = -10;
      
      scene.add(directionalLight);
      
      // Load a model
      let villageModel = null;
      const gltfLoader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      gltfLoader.setDRACOLoader(dracoLoader);
      
      // Choose whether to load from uploaded file or from server
      if (uploadedFile) {
        console.log('Loading from uploaded file:', uploadedFile.name);
        setLoadingStatus(`Loading from uploaded file: ${uploadedFile.name}`);
        if (loadingElem) {
          loadingElem.textContent = `Loading from uploaded file: ${uploadedFile.name}`;
        }
        
        // Convert File to URL
        const fileURL = URL.createObjectURL(uploadedFile);
        
        gltfLoader.load(
          fileURL,
          (gltf) => {
            console.log('Model loaded successfully from file!', gltf);
            setLoadingStatus('Model loaded successfully!');
            
            // Success handler for uploaded file
            villageModel = gltf.scene;
            
            // Center the model
            const box = new THREE.Box3().setFromObject(villageModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Calculate appropriate scale based on model size
            const maxDimension = Math.max(size.x, size.y, size.z);
            const scale = 5 / maxDimension; // Scale to fit within 5 units
            
            console.log('Model size:', size, 'Using scale:', scale);
            
            // Scale and center the model
            villageModel.scale.set(scale, scale, scale);
            villageModel.position.set(-center.x * scale, 0, -center.z * scale); // Center on ground plane
            
            // Make sure the model casts and receives shadows
            villageModel.traverse((object: any) => {
              if ((object as THREE.Mesh).isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                
                // Fix materials if needed
                if (object.material) {
                  // Ensure materials render properly
                  object.material.side = THREE.DoubleSide;
                  object.material.transparent = false;
                }
              }
            });
            
            scene.add(villageModel);
            
            // Handle animations if they exist
            if (gltf.animations && gltf.animations.length) {
              console.log('Village has animations:', gltf.animations.length);
              const mixer = new THREE.AnimationMixer(villageModel);
              const animations = gltf.animations;
              const runAction = mixer.clipAction(animations[0]);
              runAction.play();
              
              // Update function needs to handle animation
              const oldUpdate = update;
              update = (time) => {
                mixer.update(0.016); // Update animation
                oldUpdate(time);
              };
            } else {
              console.log('Village model has no animations');
            }
            
            // Set camera to view the village - adjusted for auto-scaling
            camera.position.set(5, 3, 5);
            controls.target.set(0, 1, 0); // Look at center of model
            controls.update();
            
            // Clean up the object URL after use
            URL.revokeObjectURL(fileURL);
          },
          (xhr) => {
            // Progress for uploaded file
            const percent = Math.floor(xhr.loaded / xhr.total * 100);
            console.log(`Loading model: ${percent}%`);
            setLoadingStatus(`Loading model: ${percent}%`);
            if (loadingElem) {
              loadingElem.textContent = `Loading model: ${percent}%`;
            }
          },
          (error) => {
            // Error for uploaded file
            console.error('Error loading uploaded model:', error);
            setLoadingStatus(`Error: ${error.message || 'Unknown error'}`);
            
            // Clean up the object URL on error
            URL.revokeObjectURL(fileURL);
            
            if (loadingElem) {
              loadingElem.textContent = `Error loading uploaded model: ${error.message || 'Unknown error'}`;
              
              // Show error for a while then remove
              setTimeout(() => {
                if (mountRef.current && loadingElem.parentNode === mountRef.current) {
                  mountRef.current.removeChild(loadingElem);
                }
              }, 5000);
            }
          }
        );
      } else {
        // Load from public directory
        console.log('Loading from public directory: /models/village.glb');
        setLoadingStatus('Loading from public directory...');
        if (loadingElem) {
          loadingElem.textContent = 'Loading from public directory...';
        }
        
        // Update model path to use a query parameter to avoid caching issues
        const modelPath = `/models/village.glb?v=${Date.now()}`;
        
        gltfLoader.load(
          modelPath,
          (gltf) => {
            console.log('Model loaded successfully from public directory!');
            setLoadingStatus('Model loaded successfully!');
            
            // Model loaded successfully
            villageModel = gltf.scene;
            
            // Center the model
            const box = new THREE.Box3().setFromObject(villageModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Calculate appropriate scale based on model size
            const maxDimension = Math.max(size.x, size.y, size.z);
            const scale = 5 / maxDimension; // Scale to fit within 5 units
            
            console.log('Model size:', size, 'Using scale:', scale);
            
            // Scale and center the model
            villageModel.scale.set(scale, scale, scale);
            villageModel.position.set(-center.x * scale, 0, -center.z * scale); // Center on ground plane
            
            // Make sure the model casts and receives shadows
            villageModel.traverse((object: any) => {
              if ((object as THREE.Mesh).isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                
                // Fix materials if needed
                if (object.material) {
                  // Ensure materials render properly
                  object.material.side = THREE.DoubleSide;
                  object.material.transparent = false;
                }
              }
            });
            
            scene.add(villageModel);
            
            // Handle animations if they exist
            if (gltf.animations && gltf.animations.length) {
              console.log('Village has animations:', gltf.animations.length);
              const mixer = new THREE.AnimationMixer(villageModel);
              const animations = gltf.animations;
              const runAction = mixer.clipAction(animations[0]);
              runAction.play();
              
              // Update function needs to handle animation
              const oldUpdate = update;
              update = (time) => {
                mixer.update(0.016); // Update animation
                oldUpdate(time);
              };
            } else {
              console.log('Village model has no animations');
            }
            
            // Set camera to view the village - adjusted for auto-scaling
            camera.position.set(5, 3, 5);
            controls.target.set(0, 1, 0); // Look at center of model
            controls.update();
            
            // Remove loading indicator when done
            if (mountRef.current && loadingElem.parentNode === mountRef.current) {
              mountRef.current.removeChild(loadingElem);
            }
          },
          (xhr) => {
            // Progress callback
            const percent = Math.floor(xhr.loaded / xhr.total * 100);
            console.log(`Loading: ${percent}%`);
            setLoadingStatus(`Loading: ${percent}%`);
          },
          (error) => {
            console.error('Error loading model from public directory:', error);
            setLoadingStatus(`Error: ${error.message || 'Unknown error'}`);
            
            // Try an alternative approach with a manual fetch
            console.log('Trying alternative loading approach...');
            if (loadingElem) {
              loadingElem.textContent = 'Trying alternative loading approach...';
            }
            
            fetch('/models/test.txt')
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Test file not accessible: ${response.status}`);
                }
                return response.text();
              })
              .then(text => {
                console.log('Test file content:', text);
                alert(`Public files are accessible. Test file content: "${text}". The model file might be too large or corrupted.`);
              })
              .catch(fetchError => {
                console.error('Test file fetch error:', fetchError);
                alert(`Cannot access files in public directory. Error: ${fetchError.message}`);
              });
            
            // Show error on screen
            if (loadingElem) {
              loadingElem.textContent = `Error loading model: ${error.message || 'Unknown error'}`;
              
              // Add a placeholder ground with simple buildings instead
              const groundGeometry = new THREE.PlaneGeometry(20, 20);
              const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x7CFC00 });
              const ground = new THREE.Mesh(groundGeometry, groundMaterial);
              ground.rotation.x = -Math.PI / 2;
              ground.receiveShadow = true;
              scene.add(ground);
              
              // Add simple house
              const houseGroup = new THREE.Group();
              
              // House body
              const houseBody = new THREE.Mesh(
                new THREE.BoxGeometry(2, 1, 2),
                new THREE.MeshStandardMaterial({ color: 0xF5DEB3 })
              );
              houseBody.position.y = 0.5;
              houseBody.castShadow = true;
              houseBody.receiveShadow = true;
              houseGroup.add(houseBody);
              
              // House roof
              const roof = new THREE.Mesh(
                new THREE.ConeGeometry(1.5, 1, 4),
                new THREE.MeshStandardMaterial({ color: 0xCD5C5C })
              );
              roof.position.y = 1.5;
              roof.rotation.y = Math.PI / 4;
              roof.castShadow = true;
              houseGroup.add(roof);
              
              scene.add(houseGroup);
              
              // Remove error message after a delay
              setTimeout(() => {
                if (mountRef.current && loadingElem.parentNode === mountRef.current) {
                  mountRef.current.removeChild(loadingElem);
                }
              }, 5000); // Longer time to read error
            }
          }
        );
      }
      
      // Animation loop
      let update = (time: number) => {
        // For village model, we might just want to allow orbit controls to explore it
        // instead of animating the model itself
        if (villageModel) {
          // Optional: slowly rotate the scene for display purposes
          // villageModel.rotation.y = time * 0.0001;
        }
      };
      
      // Render loop
      const animate = (time: number) => {
        update(time);
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      
      // Handle window resize
      const handleResize = () => {
        if (!mountRef.current) return;
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      
      window.addEventListener('resize', handleResize);
      requestAnimationFrame(animate);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        scene.clear();
        if (mountRef.current) {
          while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
          }
        }
      };
    };
    
    loadScene();
  }, [uploadedFile]); // Re-run when a file is uploaded

  const downloadExample = () => {
    // Open instructions in a new tab
    window.open("https://sketchfab.com/models/ac2d381f9d044b7ca02c43187c0c516c", "_blank");
  };
  
  // Function to check if model is loaded
  const checkModelLoaded = () => {
    // This is just a helper to manually test if model exists
    console.log('Checking file system access...');
    alert('Make sure village.glb (33MB with 1k textures) is in the public/models directory.');
  };
  
  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log('File selected:', file.name, file.size);
      setLoadingStatus(`File selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      setUploadedFile(file);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">3D Village Scene Example</h1>
      
      <div className="mb-4">
        <p className="text-lg mb-2">
          This example demonstrates how to load and display a 3D village model from Sketchfab using Three.js.
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Create a Three.js scene with proper lighting</li>
          <li>Load a GLTF/GLB village model from a file</li>
          <li>Set up camera and controls to explore the scene</li>
          <li>Handle large environmental models with proper scaling</li>
        </ul>
        
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-4">
            <Button onClick={downloadExample}>
              View Model on Sketchfab
            </Button>
            <Button onClick={checkModelLoaded} variant="outline">
              Check Model Location
            </Button>
          </div>
          
          {/* Add file upload option */}
          <div className="p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
            <h3 className="text-md font-medium mb-2">Upload GLB File Directly</h3>
            <p className="text-sm text-gray-600 mb-2">
              If the model isn't loading from the public directory, you can upload it directly here:
            </p>
            <input 
              type="file" 
              accept=".glb,.gltf" 
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100"
            />
            {loadingStatus && (
              <p className="mt-2 text-sm text-blue-600">{loadingStatus}</p>
            )}
          </div>
        </div>
      </div>
      
      <div 
        ref={mountRef} 
        className="w-full h-[500px] bg-slate-800 rounded-lg shadow-lg relative"
      />
      
      <div className="mt-6 bg-slate-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Instructions for using 3D village models in your game:</h2>
        <ol className="list-decimal ml-6">
          <li>Download the village model from Sketchfab in GLB format (33MB with 1k textures recommended)</li>
          <li>Save it as "village.glb" in your public/models folder</li>
          <li>Adjust the scale (village models are often very large)</li>
          <li>Set up appropriate camera position to view the village</li>
          <li>Allow users to explore with orbit controls</li>
        </ol>
      </div>
      
      <div className="mt-4 p-4 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-2">Model Attribution</h3>
        <p className="text-sm text-gray-700">
          "Village, country road, country house and farm" (<a href="https://skfb.ly/pwyMM" target="_blank" className="text-blue-600 hover:underline">https://skfb.ly/pwyMM</a>) by Metazeon is 
          licensed under <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" className="text-blue-600 hover:underline">Creative Commons Attribution 4.0</a>.
        </p>
      </div>
    </div>
  );
} 