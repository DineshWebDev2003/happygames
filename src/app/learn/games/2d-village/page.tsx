"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Village2DGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Effect for initializing and running the game
  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Game variables
    let animationFrameId: number;
    const gameObjects: GameObject[] = [];
    let player: Player;
    
    // Asset paths
    const ASSETS = {
      player: '/images/village-game/player.png',
      tree: '/images/village-game/tree.png',
      house: '/images/village-game/house.png',
      background: '/images/village-game/village-bg.png',
    };

    // Load assets
    const loadedImages: {[key: string]: HTMLImageElement} = {};
    let loadedCount = 0;
    const totalAssets = Object.keys(ASSETS).length;
    
    // Game classes
    class GameObject {
      x: number;
      y: number;
      width: number;
      height: number;
      image: HTMLImageElement | null;
      
      constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = null;
      }
      
      update() {
        // Base update method
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        if (this.image) {
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
      }
      
      intersects(other: GameObject): boolean {
        return !(
          this.x > other.x + other.width ||
          this.x + this.width < other.x ||
          this.y > other.y + other.height ||
          this.y + this.height < other.y
        );
      }
    }
    
    class Player extends GameObject {
      speed: number;
      direction: {x: number, y: number};
      
      constructor(x: number, y: number) {
        super(x, y, 50, 50);
        this.speed = 5;
        this.direction = {x: 0, y: 0};
        this.image = loadedImages.player;
      }
      
      update() {
        // Update player position
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;
        
        // Keep player within bounds
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
        
        // Check collisions with other objects
        for (let i = 1; i < gameObjects.length; i++) { // Skip player (index 0)
          const obj = gameObjects[i];
          
          if (this.intersects(obj)) {
            if (obj instanceof House) {
              // Player reached a house, increment score
              setScore(prevScore => prevScore + 10);
              
              // Visual feedback - make the house slightly transparent temporarily
              const house = obj as House;
              house.visited = true;
              setTimeout(() => { house.visited = false; }, 1000);
            } else if (obj instanceof Tree) {
              // Player hit a tree, push back
              const pushBackDistance = 10;
              if (this.direction.x > 0) this.x -= pushBackDistance;
              if (this.direction.x < 0) this.x += pushBackDistance;
              if (this.direction.y > 0) this.y -= pushBackDistance;
              if (this.direction.y < 0) this.y += pushBackDistance;
              
              // Small score penalty
              setScore(prevScore => Math.max(0, prevScore - 5));
            }
          }
        }
      }
    }
    
    class House extends GameObject {
      visited: boolean = false;
      
      constructor(x: number, y: number) {
        super(x, y, 100, 100);
        this.image = loadedImages.house;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        if (this.image) {
          // Make the house semi-transparent when visited
          if (this.visited) {
            ctx.globalAlpha = 0.6;
          }
          
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
          
          // Reset alpha
          ctx.globalAlpha = 1.0;
          
          // Draw "visited" indicator if needed
          if (this.visited) {
            ctx.fillStyle = 'gold';
            ctx.fillText('+ 10 points!', this.x + this.width/2 - 40, this.y - 10);
          }
        }
      }
    }
    
    class Tree extends GameObject {
      constructor(x: number, y: number) {
        super(x, y, 60, 80);
        this.image = loadedImages.tree;
      }
    }
    
    // Setup keyboard input
    const keys: {[key: string]: boolean} = {};
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Game initialization
    const initGame = () => {
      // Clear previous game state
      gameObjects.length = 0;
      
      // Create player
      player = new Player(canvas.width / 2 - 25, canvas.height / 2 - 25);
      gameObjects.push(player);
      
      // Create houses
      gameObjects.push(new House(100, 150));
      gameObjects.push(new House(500, 200));
      gameObjects.push(new House(300, 400));
      
      // Create trees
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * (canvas.width - 60);
        const y = Math.random() * (canvas.height - 80);
        gameObjects.push(new Tree(x, y));
      }
      
      // Start the game loop
      gameLoop();
    };
    
    // Load all assets before starting
    const loadAssets = () => {
      Object.entries(ASSETS).forEach(([key, src]) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImages[key] = img;
          loadedCount++;
          
          if (loadedCount === totalAssets) {
            // All assets loaded, start the game
            setAssetsLoaded(true);
            initGame();
          }
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          setLoadingError(`Failed to load ${key} image. Please make sure all game assets are properly installed.`);
          
          // Use placeholder for failed loads
          const canvas = document.createElement('canvas');
          canvas.width = 100;
          canvas.height = 100;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#FF00FF'; // Magenta placeholder
            ctx.fillRect(0, 0, 100, 100);
            ctx.fillStyle = 'black';
            ctx.font = '14px Arial';
            ctx.fillText('Missing', 20, 50);
            ctx.fillText(key, 25, 70);
          }
          const placeholder = new Image();
          placeholder.src = canvas.toDataURL();
          loadedImages[key] = placeholder;
          loadedCount++;
          
          if (loadedCount === totalAssets) {
            setAssetsLoaded(true);
            initGame();
          }
        };
      });
    };
    
    // Game loop
    const gameLoop = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      if (loadedImages.background) {
        ctx.drawImage(loadedImages.background, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#87CEEB'; // Sky blue
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Update player direction based on keys
      player.direction.x = 0;
      player.direction.y = 0;
      
      if (keys['ArrowUp'] || keys['w']) player.direction.y = -1;
      if (keys['ArrowDown'] || keys['s']) player.direction.y = 1;
      if (keys['ArrowLeft'] || keys['a']) player.direction.x = -1;
      if (keys['ArrowRight'] || keys['d']) player.direction.x = 1;
      
      // Update and draw all game objects
      gameObjects.forEach(obj => {
        obj.update();
        obj.draw(ctx);
      });
      
      // Draw score
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.font = 'bold 24px Arial';
      const scoreText = `Score: ${score}`;
      ctx.strokeText(scoreText, 20, 30);
      ctx.fillText(scoreText, 20, 30);
      
      // Continue the game loop
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    
    // Start by loading assets
    loadAssets();
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, score]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
  };

  // Generate placeholder images directly in the canvas
  const generatePlaceholders = () => {
    // Generate player image  
    const generatePlayerImage = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 50;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';
      
      // Body
      ctx.fillStyle = '#3498db'; // Blue
      ctx.fillRect(10, 10, 30, 30);
      
      // Head
      ctx.fillStyle = '#f1c40f'; // Yellow
      ctx.beginPath();
      ctx.arc(25, 15, 10, 0, Math.PI * 2);
      ctx.fill();
      
      // Eyes
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(22, 13, 2, 0, Math.PI * 2);
      ctx.arc(28, 13, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Smile
      ctx.beginPath();
      ctx.arc(25, 17, 5, 0, Math.PI);
      ctx.stroke();
      
      return canvas.toDataURL();
    };

    // Generate house image
    const generateHouseImage = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';
      
      // House base
      ctx.fillStyle = '#e74c3c'; // Red
      ctx.fillRect(20, 40, 60, 50);
      
      // Roof
      ctx.fillStyle = '#7f8c8d'; // Gray
      ctx.beginPath();
      ctx.moveTo(10, 40);
      ctx.lineTo(50, 10);
      ctx.lineTo(90, 40);
      ctx.closePath();
      ctx.fill();
      
      // Door
      ctx.fillStyle = '#8e44ad'; // Purple
      ctx.fillRect(40, 65, 20, 25);
      
      // Door knob
      ctx.fillStyle = '#f1c40f'; // Yellow
      ctx.beginPath();
      ctx.arc(55, 80, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Windows
      ctx.fillStyle = '#3498db'; // Blue
      ctx.fillRect(30, 50, 15, 10);
      ctx.fillRect(55, 50, 15, 10);
      
      return canvas.toDataURL();
    };

    // Generate tree image
    const generateTreeImage = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 60;
      canvas.height = 80;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';
      
      // Trunk
      ctx.fillStyle = '#8b4513'; // Brown
      ctx.fillRect(25, 50, 10, 30);
      
      // Leaves
      ctx.fillStyle = '#2ecc71'; // Green
      ctx.beginPath();
      ctx.moveTo(30, 5);
      ctx.lineTo(5, 50);
      ctx.lineTo(55, 50);
      ctx.closePath();
      ctx.fill();
      
      // More leaves
      ctx.fillStyle = '#27ae60'; // Darker green
      ctx.beginPath();
      ctx.moveTo(30, 15);
      ctx.lineTo(10, 45);
      ctx.lineTo(50, 45);
      ctx.closePath();
      ctx.fill();
      
      return canvas.toDataURL();
    };

    // Generate background image
    const generateBackgroundImage = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';
      
      // Sky
      ctx.fillStyle = '#87CEEB'; // Sky blue
      ctx.fillRect(0, 0, 800, 500);
      
      // Grass
      ctx.fillStyle = '#2ecc71'; // Green
      ctx.fillRect(0, 380, 800, 120);
      
      // Sun
      ctx.fillStyle = '#f1c40f'; // Yellow
      ctx.beginPath();
      ctx.arc(100, 100, 50, 0, Math.PI * 2);
      ctx.fill();
      
      // Clouds
      ctx.fillStyle = 'white';
      for (let i = 0; i < 5; i++) {
        const x = 150 + i * 140;
        const y = 80 + (i % 2) * 50;
        const size = 30 + (i % 3) * 10;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.arc(x + size, y, size * 0.8, 0, Math.PI * 2);
        ctx.arc(x - size, y, size * 0.7, 0, Math.PI * 2);
        ctx.arc(x, y - size/2, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Path
      ctx.fillStyle = '#d35400'; // Orange/brown path
      ctx.beginPath();
      ctx.moveTo(0, 420);
      ctx.lineTo(800, 420);
      ctx.lineTo(800, 450);
      ctx.lineTo(0, 450);
      ctx.closePath();
      ctx.fill();
      
      return canvas.toDataURL();
    };

    return {
      player: generatePlayerImage(),
      house: generateHouseImage(),
      tree: generateTreeImage(),
      background: generateBackgroundImage()
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">2D Village Game</h1>
      
      {!gameStarted ? (
        <div className="text-center space-y-6">
          <p className="text-lg">
            Explore the 2D village using arrow keys or WASD to move around.
          </p>
          
          <div className="bg-slate-100 p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-2">How to Play:</h2>
            <ul className="text-left list-disc pl-6">
              <li>Use Arrow Keys or WASD to move</li>
              <li>Explore the village</li>
              <li>Avoid trees</li>
              <li>Visit houses to gain points</li>
            </ul>
          </div>
          
          <Button 
            onClick={startGame}
            className="px-8 py-6 text-xl bg-green-600 hover:bg-green-700"
          >
            Start Game
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            Note: This game generates placeholder images on the fly for optimal performance.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {loadingError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{loadingError}</p>
              <p className="text-sm mt-2">Using generated placeholders instead.</p>
            </div>
          )}
          
          <div className="relative">
            <canvas 
              ref={canvasRef} 
              width={800} 
              height={500}
              className="border-2 border-gray-300 rounded-lg shadow-lg bg-sky-100"
            />
          </div>
          
          <div className="flex space-x-4">
            <Button 
              onClick={() => setGameStarted(false)}
              variant="outline"
              className="text-red-500"
            >
              Quit Game
            </Button>
          </div>
          
          <div className="mt-4 bg-slate-100 p-4 rounded-lg max-w-md">
            <h3 className="font-bold mb-1">Controls:</h3>
            <p className="text-sm">
              Arrow Keys or WASD to move your character around the village.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 