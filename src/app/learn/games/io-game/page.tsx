"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

export default function IoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameStateRef = useRef({
    player: {
      x: 0,
      y: 0,
      radius: 20,
      color: '#4ade80',
      speed: 5,
      bullets: [] as Bullet[]
    },
    enemies: [] as Enemy[],
    lastEnemySpawn: 0,
    lastBulletFired: 0,
    animationId: 0
  });

  type Bullet = {
    x: number;
    y: number;
    radius: 5;
    color: string;
    velocity: {
      x: number;
      y: number;
    }
  };

  type Enemy = {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: {
      x: number;
      y: number;
    }
  };

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 500;

    // Initialize player position
    const state = gameStateRef.current;
    state.player.x = canvas.width / 2;
    state.player.y = canvas.height / 2;

    // Key press state
    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      Space: false
    };

    // Event listeners for keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
          e.key === 'ArrowLeft' || e.key === 'ArrowRight' || 
          e.key === ' ') {
        keys[e.key === ' ' ? 'Space' : e.key as keyof typeof keys] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
          e.key === 'ArrowLeft' || e.key === 'ArrowRight' || 
          e.key === ' ') {
        keys[e.key === ' ' ? 'Space' : e.key as keyof typeof keys] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Touch controls for mobile
    let touchX = 0;
    let touchY = 0;
    let isTouching = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
        isTouching = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && isTouching) {
        const newTouchX = e.touches[0].clientX;
        const newTouchY = e.touches[0].clientY;
        
        // Calculate direction based on touch movement
        if (newTouchX < touchX - 20) keys.ArrowLeft = true;
        else if (newTouchX > touchX + 20) keys.ArrowRight = true;
        else {
          keys.ArrowLeft = false;
          keys.ArrowRight = false;
        }
        
        if (newTouchY < touchY - 20) keys.ArrowUp = true;
        else if (newTouchY > touchY + 20) keys.ArrowDown = true;
        else {
          keys.ArrowUp = false;
          keys.ArrowDown = false;
        }
        
        touchX = newTouchX;
        touchY = newTouchY;
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
      keys.ArrowUp = false;
      keys.ArrowDown = false;
      keys.ArrowLeft = false;
      keys.ArrowRight = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    // Draw player function
    const drawPlayer = () => {
      if (!ctx) return;
      
      ctx.beginPath();
      ctx.arc(state.player.x, state.player.y, state.player.radius, 0, Math.PI * 2);
      ctx.fillStyle = state.player.color;
      ctx.fill();
      
      // Draw player face (makes it more engaging)
      ctx.beginPath();
      ctx.arc(state.player.x - 7, state.player.y - 5, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(state.player.x + 7, state.player.y - 5, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(state.player.x, state.player.y + 5, 8, 0, Math.PI);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    // Draw bullet function
    const drawBullets = () => {
      if (!ctx) return;
      
      state.player.bullets.forEach((bullet, index) => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fillStyle = bullet.color;
        ctx.fill();
        
        // Update bullet position
        bullet.x += bullet.velocity.x;
        bullet.y += bullet.velocity.y;
        
        // Remove bullets that are off screen
        if (bullet.x < 0 || bullet.x > canvas.width || 
            bullet.y < 0 || bullet.y > canvas.height) {
          state.player.bullets.splice(index, 1);
        }
      });
    };

    // Create enemy function
    const createEnemy = () => {
      const now = Date.now();
      if (now - state.lastEnemySpawn < 1000) return; // Spawn enemy every second
      
      state.lastEnemySpawn = now;
      
      // Randomize enemy spawn position (outside the canvas)
      let x, y;
      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - 20 : canvas.width + 20;
        y = Math.random() * canvas.height;
      } else {
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - 20 : canvas.height + 20;
      }
      
      // Calculate angle to player
      const angle = Math.atan2(
        state.player.y - y,
        state.player.x - x
      );
      
      // Calculate velocity based on angle
      const velocity = {
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2
      };
      
      // Random size and color
      const radius = Math.random() * 20 + 10;
      const colors = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      state.enemies.push({
        x,
        y,
        radius,
        color,
        velocity
      });
    };

    // Draw enemies function
    const drawEnemies = () => {
      if (!ctx) return;
      
      state.enemies.forEach((enemy, index) => {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fillStyle = enemy.color;
        ctx.fill();
        
        // Update enemy position
        enemy.x += enemy.velocity.x;
        enemy.y += enemy.velocity.y;
        
        // Check collision with player
        const dist = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
        if (dist - enemy.radius - state.player.radius < 1) {
          cancelAnimationFrame(state.animationId);
          setGameOver(true);
          return;
        }
        
        // Check collision with bullets
        state.player.bullets.forEach((bullet, bulletIndex) => {
          const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
          if (dist - enemy.radius - bullet.radius < 1) {
            // Increase score on hit
            setScore(prevScore => prevScore + 10);
            
            // Remove enemy and bullet
            state.enemies.splice(index, 1);
            state.player.bullets.splice(bulletIndex, 1);
          }
        });
        
        // Remove enemies that are way off screen
        if (enemy.x < -100 || enemy.x > canvas.width + 100 || 
            enemy.y < -100 || enemy.y > canvas.height + 100) {
          state.enemies.splice(index, 1);
        }
      });
    };

    // Fire bullet function
    const fireBullet = (mouseX?: number, mouseY?: number) => {
      const now = Date.now();
      if (now - state.lastBulletFired < 300) return; // Limit firing rate
      
      state.lastBulletFired = now;
      
      let angle;
      if (mouseX !== undefined && mouseY !== undefined) {
        // Calculate angle to mouse position
        angle = Math.atan2(
          mouseY - state.player.y,
          mouseX - state.player.x
        );
      } else {
        // Default angle (right)
        angle = 0;
        
        // Adjust angle based on key press
        if (keys.ArrowUp && keys.ArrowRight) angle = Math.PI * 1.75;
        else if (keys.ArrowUp && keys.ArrowLeft) angle = Math.PI * 1.25;
        else if (keys.ArrowDown && keys.ArrowRight) angle = Math.PI * 0.25;
        else if (keys.ArrowDown && keys.ArrowLeft) angle = Math.PI * 0.75;
        else if (keys.ArrowUp) angle = Math.PI * 1.5;
        else if (keys.ArrowDown) angle = Math.PI * 0.5;
        else if (keys.ArrowLeft) angle = Math.PI;
        else if (keys.ArrowRight) angle = 0;
      }
      
      const velocity = {
        x: Math.cos(angle) * 7,
        y: Math.sin(angle) * 7
      };
      
      state.player.bullets.push({
        x: state.player.x,
        y: state.player.y,
        radius: 5,
        color: '#FFF',
        velocity
      });
    };

    // Mouse click event for shooting
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      fireBullet(mouseX, mouseY);
    };
    
    canvas.addEventListener('click', handleClick);
    
    // Touch tap for shooting on mobile
    const handleTap = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;
        fireBullet(touchX, touchY);
      }
    };
    
    canvas.addEventListener('touchstart', handleTap);

    // Animation loop
    const animate = () => {
      state.animationId = requestAnimationFrame(animate);
      
      if (!ctx) return;
      
      // Clear canvas
      ctx.fillStyle = 'rgba(21, 21, 33, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw starfield background (adds to the space theme)
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = 'white';
        ctx.fillRect(
          Math.floor(Math.random() * canvas.width),
          Math.floor(Math.random() * canvas.height),
          1,
          1
        );
      }
      
      // Update player position based on key press
      if (keys.ArrowUp && state.player.y > state.player.radius) {
        state.player.y -= state.player.speed;
      }
      if (keys.ArrowDown && state.player.y < canvas.height - state.player.radius) {
        state.player.y += state.player.speed;
      }
      if (keys.ArrowLeft && state.player.x > state.player.radius) {
        state.player.x -= state.player.speed;
      }
      if (keys.ArrowRight && state.player.x < canvas.width - state.player.radius) {
        state.player.x += state.player.speed;
      }
      
      // Fire bullet with spacebar
      if (keys.Space) {
        fireBullet();
      }
      
      // Create enemies
      createEnemy();
      
      // Draw everything
      drawPlayer();
      drawBullets();
      drawEnemies();
      
      // Draw score
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.fillText(`Score: ${score}`, 20, 40);
    };
    
    animate();
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchstart', handleTap);
      cancelAnimationFrame(state.animationId);
    };
  }, [gameStarted, score]);
  
  // Reset game state
  function resetGame() {
    const state = gameStateRef.current;
    state.player.x = 0;
    state.player.y = 0;
    state.player.bullets = [];
    state.enemies = [];
    state.lastEnemySpawn = 0;
    state.lastBulletFired = 0;
    
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4 bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg shadow-md">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-foreground mb-4 text-white"
      >
        Bubble Blaster IO
      </motion.h1>
      
      {!gameStarted ? (
        // Start screen
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center bg-black/50 p-6 rounded-xl shadow-lg backdrop-blur-sm"
        >
          <div className="w-64 h-64 mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <div className="text-6xl">🎮</div>
          </div>
          
          <p className="text-lg text-gray-100 mb-6">
            Move with arrow keys, shoot with spacebar or mouse click!
          </p>
          
          <div className="bg-indigo-900/70 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-bold text-indigo-200 mb-2">How to Play:</h3>
            <ul className="list-disc pl-5 text-indigo-100 space-y-1">
              <li>Use arrow keys <b>←↑→↓</b> to move your character</li>
              <li>Press <b>spacebar</b> to shoot or <b>click</b> to aim and shoot</li>
              <li>Shoot the colored bubbles to earn points</li>
              <li>Avoid getting hit by enemy bubbles</li>
              <li>See how high a score you can get!</li>
            </ul>
          </div>
          
          <Button 
            onClick={resetGame}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-xl rounded-full shadow-md transform hover:scale-105 transition-transform"
          >
            Start Game!
          </Button>
        </motion.div>
      ) : (
        // Game screen
        <>
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center bg-indigo-800/50 px-4 py-2 rounded-full">
              <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white font-bold">Score: {score}</span>
            </div>
          </div>
          
          <canvas 
            ref={canvasRef} 
            className="mx-auto mb-4 border-2 border-indigo-500 rounded-lg shadow-lg overflow-hidden cursor-crosshair" 
            width={800}
            height={500}
          ></canvas>
          
          <div className="flex justify-center space-x-6 mt-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-start-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    const event = new KeyboardEvent('keydown', { 'key': 'ArrowUp' });
                    window.dispatchEvent(event);
                    setTimeout(() => {
                      const event = new KeyboardEvent('keyup', { 'key': 'ArrowUp' });
                      window.dispatchEvent(event);
                    }, 100);
                  }}
                  className="bg-indigo-700/50 w-12 h-12 flex items-center justify-center"
                >
                  <ArrowUp className="w-6 h-6" />
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => {
                    const event = new KeyboardEvent('keydown', { 'key': 'ArrowLeft' });
                    window.dispatchEvent(event);
                    setTimeout(() => {
                      const event = new KeyboardEvent('keyup', { 'key': 'ArrowLeft' });
                      window.dispatchEvent(event);
                    }, 100);
                  }}
                  className="bg-indigo-700/50 w-12 h-12 flex items-center justify-center"
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => {
                    const event = new KeyboardEvent('keydown', { 'key': 'ArrowDown' });
                    window.dispatchEvent(event);
                    setTimeout(() => {
                      const event = new KeyboardEvent('keyup', { 'key': 'ArrowDown' });
                      window.dispatchEvent(event);
                    }, 100);
                  }}
                  className="bg-indigo-700/50 w-12 h-12 flex items-center justify-center"
                >
                  <ArrowDown className="w-6 h-6" />
                </Button>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => {
                    const event = new KeyboardEvent('keydown', { 'key': 'ArrowRight' });
                    window.dispatchEvent(event);
                    setTimeout(() => {
                      const event = new KeyboardEvent('keyup', { 'key': 'ArrowRight' });
                      window.dispatchEvent(event);
                    }, 100);
                  }}
                  className="bg-indigo-700/50 w-12 h-12 flex items-center justify-center"
                >
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => {
                const event = new KeyboardEvent('keydown', { 'key': ' ' });
                window.dispatchEvent(event);
                setTimeout(() => {
                  const event = new KeyboardEvent('keyup', { 'key': ' ' });
                  window.dispatchEvent(event);
                }, 100);
              }}
              className="bg-indigo-700/50 h-12 px-8"
            >
              Shoot
            </Button>
          </div>
          
          {gameOver && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-10 bg-black/70 backdrop-blur-sm"
            >
              <div className="bg-indigo-900 p-6 rounded-xl shadow-lg max-w-md">
                <div className="text-4xl font-bold mb-4 text-white">
                  Game Over!
                </div>
                <div className="text-2xl mb-6 text-indigo-200">
                  Your Score: <span className="text-yellow-400 font-bold">{score}</span>
                </div>
                
                <div className="flex space-x-4 justify-center">
                  <Button onClick={resetGame} className="bg-indigo-600">
                    Play Again
                  </Button>
                  
                  <Button asChild variant="outline" className="text-white">
                    <Link href="/learn/games">Back to Games</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
      
      {gameStarted && !gameOver && (
        <div className="flex mt-4 space-x-2">
          <Button onClick={() => setGameOver(true)} variant="outline" className="text-red-400">
            Quit Game
          </Button>
        </div>
      )}
      
      <div className="pb-16 md:pb-0"></div> {/* Spacer for bottom nav */}
    </div>
  );
} 