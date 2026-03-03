import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import weightsData from './pong_weights.json';

// Minimal Neural Network Feed-Forward (no dependency, <1ms inference)
const predictAction = (inputs: number[], weights: any) => {
    const relu = (x: number) => Math.max(0, x);
    let h1 = new Array(16).fill(0);
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 5; j++) h1[i] += inputs[j] * weights.w1[j][i];
        h1[i] = relu(h1[i] + weights.b1[i]);
    }
    let h2 = new Array(16).fill(0);
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) h2[i] += h1[j] * weights.w2[j][i];
        h2[i] = relu(h2[i] + weights.b2[i]);
    }
    let o = new Array(3).fill(0);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 16; j++) o[i] += h2[j] * weights.w3[j][i];
        o[i] += weights.b3[i];
    }
    // Argmax (0: UP, 1: STAY, 2: DOWN)
    return o.indexOf(Math.max(...o));
};

interface PingPongGameProps {
    onClose: () => void;
    isPlaying: boolean;
    isPaused?: boolean;
}

export function PingPongGame({ onClose, isPlaying, isPaused = false }: PingPongGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const [score, setScore] = useState({ player: 0, ai: 0 });
    const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('pongHighScore') || '0', 10));

    // Track playing state in a ref to use inside the game loop
    const isPlayingRef = useRef(isPlaying);
    const isPausedRef = useRef(isPaused);
    const highScoreRef = useRef(highScore);

    useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
    useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);

    // Game state mutables (kept out of React state to avoid re-renders)
    const gameState = useRef({
        playerY: 0,
        aiY: 0,
        ballX: 0,
        ballY: 0,
        ballSpeedX: 5, // For default speed
        ballSpeedY: 5,
        upPressed: false,
        downPressed: false,
        score: { player: 0, ai: 0 }
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Handle high DPI displays dynamically
        const updateSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement!.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            // Initialize positions on first load
            if (gameState.current.playerY === 0) {
                gameState.current.playerY = rect.height / 2 - 40;
                gameState.current.aiY = rect.height / 2 - 40;
                gameState.current.ballX = rect.width / 2;
                gameState.current.ballY = rect.height / 2;
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        // Event Listeners
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isPlayingRef.current) return;
            if (e.key === 'ArrowUp') { gameState.current.upPressed = true; e.preventDefault(); }
            if (e.key === 'ArrowDown') { gameState.current.downPressed = true; e.preventDefault(); }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (!isPlayingRef.current) return;
            if (e.key === 'ArrowUp') gameState.current.upPressed = false;
            if (e.key === 'ArrowDown') gameState.current.downPressed = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Constants
        const PADDLE_HEIGHT = 80;
        const PADDLE_WIDTH = 8;
        const BALL_SIZE = 8;
        const PADDLE_SPEED = 7;
        const AI_SPEED_LEFT = PADDLE_SPEED * 0.55; // Slower, lazier tracking
        const AI_SPEED_RIGHT = PADDLE_SPEED * 0.7; // Faster, tighter tracking

        const resetBall = (width: number, height: number, scorer: 'player' | 'ai') => {
            gameState.current.ballX = width / 2;
            gameState.current.ballY = height / 2;
            gameState.current.ballSpeedX = (scorer === 'player' ? -5 : 5);
            gameState.current.ballSpeedY = (Math.random() * 6) - 3;
            // Only update external visual score if we are actively playing
            if (isPlayingRef.current) {
                setScore({ ...gameState.current.score });
                if (gameState.current.score.player > highScoreRef.current) {
                    highScoreRef.current = gameState.current.score.player;
                    setHighScore(gameState.current.score.player);
                    localStorage.setItem('pongHighScore', gameState.current.score.player.toString());
                }
            }
        };

        // Game Loop
        const draw = () => {
            // Get logical size
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);

            // Clear layout
            ctx.fillStyle = '#f4f4f5'; // light bg
            ctx.fillRect(0, 0, width, height);

            const state = gameState.current;

            // Draw dashed center line
            ctx.setLineDash([10, 10]);
            ctx.beginPath();
            ctx.moveTo(width / 2, 0);
            ctx.lineTo(width / 2, height);
            ctx.strokeStyle = '#e4e4e7';
            ctx.stroke();
            ctx.setLineDash([]);

            const isFrozen = !isPlayingRef.current && isPausedRef.current;
            const speedCoef = isPlayingRef.current ? 1 : 0.8; // 20% slower in background mode

            if (!isFrozen) {
                // Update Player logic based on active mode vs background mode
                if (isPlayingRef.current) {
                    // Manual Control
                    if (state.upPressed && state.playerY > 0) state.playerY -= PADDLE_SPEED;
                    if (state.downPressed && state.playerY < height - PADDLE_HEIGHT) state.playerY += PADDLE_SPEED;
                } else {
                    // Background Bot Control (Left paddle) - Neural Network (Bot 1)
                    const action1 = predictAction([
                        state.ballX / width,
                        state.ballY / height,
                        state.ballSpeedX / 10,
                        state.ballSpeedY / 10,
                        (state.playerY + PADDLE_HEIGHT / 2) / height
                    ], (weightsData as any).bot1);

                    if (action1 === 0) state.playerY -= AI_SPEED_LEFT * speedCoef;
                    else if (action1 === 2) state.playerY += AI_SPEED_LEFT * speedCoef;
                }

                // Update AI (Right paddle) - Neural Network (Bot 2)
                const action2 = predictAction([
                    state.ballX / width,
                    state.ballY / height,
                    state.ballSpeedX / 10,
                    state.ballSpeedY / 10,
                    (state.aiY + PADDLE_HEIGHT / 2) / height
                ], (weightsData as any).bot2);

                if (action2 === 0) state.aiY -= AI_SPEED_RIGHT * speedCoef;
                else if (action2 === 2) state.aiY += AI_SPEED_RIGHT * speedCoef;

                // Clamp paddles
                state.playerY = Math.max(0, Math.min(state.playerY, height - PADDLE_HEIGHT));
                state.aiY = Math.max(0, Math.min(state.aiY, height - PADDLE_HEIGHT));

                // Update Ball
                state.ballX += state.ballSpeedX * speedCoef;
                state.ballY += state.ballSpeedY * speedCoef;

                // Top/Bottom Collision
                if (state.ballY <= 0 || state.ballY >= height - BALL_SIZE) {
                    state.ballSpeedY = -state.ballSpeedY;
                }

                // Player Paddle Collision
                if (
                    state.ballX <= 20 + PADDLE_WIDTH &&
                    state.ballX + BALL_SIZE >= 20 &&
                    state.ballY + BALL_SIZE >= state.playerY &&
                    state.ballY <= state.playerY + PADDLE_HEIGHT
                ) {
                    state.ballSpeedX = -state.ballSpeedX * 1.05; // speed up slightly
                    state.ballX = 20 + PADDLE_WIDTH; // un-stick
                    const hitPoint = state.ballY - (state.playerY + PADDLE_HEIGHT / 2);
                    state.ballSpeedY = hitPoint * 0.15;
                }

                // AI Paddle Collision
                if (
                    state.ballX + BALL_SIZE >= width - 20 - PADDLE_WIDTH &&
                    state.ballX <= width - 20 &&
                    state.ballY + BALL_SIZE >= state.aiY &&
                    state.ballY <= state.aiY + PADDLE_HEIGHT
                ) {
                    state.ballSpeedX = -state.ballSpeedX * 1.05;
                    state.ballX = width - 20 - PADDLE_WIDTH - BALL_SIZE; // un-stick
                    const hitPoint = state.ballY - (state.aiY + PADDLE_HEIGHT / 2);
                    state.ballSpeedY = hitPoint * 0.15;
                }

                // Detect Goals
                if (state.ballX < 0) {
                    if (isPlayingRef.current) state.score.ai++;
                    resetBall(width, height, 'ai');
                } else if (state.ballX > width) {
                    if (isPlayingRef.current) state.score.player++;
                    resetBall(width, height, 'player');
                }
            }

            // Render Paddles & Ball
            ctx.fillStyle = '#09090b'; // dark shapes
            ctx.fillRect(20, state.playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
            ctx.fillRect(width - 20 - PADDLE_WIDTH, state.aiY, PADDLE_WIDTH, PADDLE_HEIGHT);
            ctx.fillRect(state.ballX, state.ballY, BALL_SIZE, BALL_SIZE);

            requestRef.current = requestAnimationFrame(draw);
        };

        requestRef.current = requestAnimationFrame(draw);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', updateSize);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []); // Removed isPlaying dependency so loop runs continuously

    const handleClose = () => {
        // Reset score fully on close so next play starts at 0
        gameState.current.score = { player: 0, ai: 0 };
        setScore({ player: 0, ai: 0 });
        onClose();
    };

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none z-50">
            {isPlaying && (
                <div
                    className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 text-4xl sm:text-5xl text-foreground/20 z-20 pointer-events-none select-none drop-shadow-sm"
                    style={{ fontFamily: "'VT323', monospace", letterSpacing: "2px" }}
                >
                    <div className="flex gap-16 items-center">
                        <span className={`w-32 text-right ${score.player > score.ai ? "text-foreground min-w-[3ch]" : ""}`}>{score.player}</span>
                        <span className="text-xl text-border/50 -translate-y-1">|</span>
                        <span className={`w-32 text-left ${score.ai > score.player ? "text-foreground min-w-[3ch]" : ""}`}>{score.ai}</span>
                    </div>
                    {highScore > 0 && <span className="text-[1.2rem] text-muted-foreground/40 mt-1">HI: {highScore}</span>}
                </div>
            )}

            {isPlaying && (
                <button
                    onClick={handleClose}
                    className="absolute z-30 top-12 left-12 p-2 pointer-events-auto transition-colors group cursor-pointer"
                >
                    <ArrowLeft strokeWidth={1.5} className="w-6 h-6 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                </button>
            )}

            {/* The Game Canvas */}
            <div
                className="w-full h-full relative"
                // Fade to 15% opacity when not playing
                style={{ opacity: isPlaying ? 1 : 0.15, transition: 'opacity 0.6s ease' }}
            >
                {isPlaying && (
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground uppercase tracking-[0.3em] bg-background/80 px-4 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                        Use UP and DOWN arrows
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block"
                    style={{ pointerEvents: isPlaying ? 'auto' : 'none' }}
                />
            </div>
        </div>
    );
}
