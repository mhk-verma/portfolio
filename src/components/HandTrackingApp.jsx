import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCamera } from '../hooks/useCamera';
import { useHandTracking } from '../hooks/useHandTracking';
import { useDrawing } from '../hooks/useDrawing';
import { getCanvasCoordinates } from '../utils/coordinateMapping';
import { isWritingGesture } from '../utils/gestureDetection';
import { smoothPoint } from '../utils/strokeSmoothing';
import CameraView from './CameraView';
import DrawingCanvas from './DrawingCanvas';
import Controls from './Controls';
import StatusIndicator from './StatusIndicator';

const HandTrackingApp = () => {
  // Camera
  const { videoRef, stream, error: cameraError, isReady: cameraReady, startCamera, stopCamera } = useCamera();
  
  // Hand tracking
  const [handResults, setHandResults] = useState(null);
  const [isHandLoaded, setIsHandLoaded] = useState(false);
  const [isHandDetecting, setIsHandDetecting] = useState(false);
  const [handError, setHandError] = useState(null);
  
  // Drawing
  const {
    strokes,
    currentStroke,
    brushSize,
    brushColor,
    startStroke,
    continueStroke,
    endStroke,
    clearCanvas,
    undo,
    redo,
    setBrushSize,
    setBrushColor
  } = useDrawing();
  
  // UI State
  const [isMirrored, setIsMirrored] = useState(true);
  const [fingertipPosition, setFingertipPosition] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [gestureType, setGestureType] = useState('unknown');
  
  // Refs for smoothing
  const smoothedPointRef = useRef(null);
  const lastGestureRef = useRef('unknown');
  const gestureStabilityCounter = useRef(0);
  const canvasRef = useRef(null);
  
  // Handle hand tracking results
  const handleHandResults = useCallback((results) => {
    setHandResults(results);
    
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      
      // Get canvas coordinates
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      if (canvas && video) {
        const coords = getCanvasCoordinates(landmarks, video, canvas, isMirrored);
        
        if (coords) {
          // Smooth the point
          const smoothed = smoothPoint(coords, smoothedPointRef.current, 0.7);
          smoothedPointRef.current = smoothed;
          setFingertipPosition(smoothed);
          
          // Always draw when hand is detected
          if (!isDrawing) {
            console.log('Starting stroke at:', smoothed);
            console.log('Current strokes count:', strokes.length);
            startStroke(smoothed);
            setIsDrawing(true);
            setGestureType('writing');
          } else {
            console.log('Continuing stroke at:', smoothed);
            continueStroke(smoothed);
          }
        }
      }
    } else {
      // No hand detected
      setFingertipPosition(null);
      if (isDrawing) {
        endStroke();
        setIsDrawing(false);
        setGestureType('unknown');
      }
      smoothedPointRef.current = null;
    }
  }, [isMirrored, isDrawing, startStroke, continueStroke, endStroke]);
  
  // Initialize hand tracking when camera is ready
  useEffect(() => {
    console.log('HandTrackingApp useEffect triggered');
    console.log('Conditions:', { cameraReady, videoRef: !!videoRef.current, stream: !!stream, isHandLoaded });
    let animationFrameId = null;
    
    if (cameraReady && videoRef.current && !isHandLoaded) {
      const initHands = async () => {
        try {
          console.log('Initializing MediaPipe Hands...');
          
          // Wait for video to be ready
          await new Promise((resolve) => {
            if (videoRef.current.readyState >= 2) {
              resolve();
            } else {
              videoRef.current.onloadedmetadata = resolve;
            }
          });
          
          console.log('Video ready, loading MediaPipe Hands...');
          
          const { Hands } = await import('@mediapipe/hands');
          
          const hands = new Hands({
            locateFile: (file) => {
              console.log('Loading MediaPipe file:', file);
              return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
          });
          
          hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 0, // Use lite model for better compatibility
            minDetectionConfidence: 0.1, // Very low threshold
            minTrackingConfidence: 0.1
          });
          console.log('MediaPipe Hands options set with lite model');
          
          hands.onResults((results) => {
            console.log('Hand detection results:', results.multiHandLandmarks?.length || 0, 'hands detected');
            handleHandResults(results);
          });
          
          await hands.initialize();
          console.log('MediaPipe Hands initialized');
          setIsHandLoaded(true);
          
          // Manual frame processing
          const processFrame = async () => {
            if (videoRef.current && videoRef.current.readyState >= 2) {
              try {
                // Create a canvas to ensure proper frame format
                const canvas = document.createElement('canvas');
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(videoRef.current, 0, 0);
                
                console.log('Sending frame to MediaPipe via canvas, dimensions:', canvas.width, 'x', canvas.height);
                await hands.send({ image: canvas });
              } catch (e) {
                console.log('Frame processing error:', e);
              }
            } else {
              console.log('Video not ready, readyState:', videoRef.current?.readyState);
            }
            animationFrameId = requestAnimationFrame(processFrame);
          };
          
          processFrame();
          setIsHandDetecting(true);
          console.log('Hand tracking started');
          
        } catch (err) {
          console.error('Hand tracking initialization error:', err);
          setHandError(err.message);
        }
      };
      
      initHands();
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [cameraReady, stream, isHandLoaded, videoRef, handleHandResults]);
  
  // Auto-start camera on mount
  useEffect(() => {
    console.log('Component mounted, auto-starting camera...');
    handleStartCamera();
  }, []);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'c' || e.key === 'C') {
        clearCanvas();
      } else if (e.key === 'z' || e.key === 'Z') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          undo();
        }
      } else if (e.key === 'y' || e.key === 'Y') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          redo();
        }
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsDrawing(false);
        if (currentStroke) {
          endStroke();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearCanvas, undo, redo, currentStroke, endStroke]);
  
  // Status calculations
  const cameraStatus = stream ? 'active' : cameraError ? 'error' : 'pending';
  const handStatus = handResults?.multiHandLandmarks?.length > 0 ? 'detected' : 'not_detected';
  const drawingStatus = isDrawing ? 'active' : gestureType === 'writing' ? 'ready' : 'inactive';
  
  const canUndo = strokes.length > 0;
  const canRedo = false; // Simplified for now
  
  const handleStartCamera = async () => {
    console.log('=== handleStartCamera called ===');
    try {
      console.log('Calling startCamera...');
      const result = await startCamera();
      console.log('Camera started successfully, result:', result);
    } catch (err) {
      console.error('Failed to start camera:', err);
    }
  };
  
  const handleStopCamera = () => {
    stopCamera();
    setIsHandLoaded(false);
    setIsHandDetecting(false);
    setHandResults(null);
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
          Air <span className="text-cyan-400">Writing</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Use your hand to write in the air
        </p>
      </div>
      
      {/* Main Container */}
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
        {/* Camera View */}
        <CameraView 
          videoRef={videoRef}
          isReady={cameraReady}
          mirrored={isMirrored}
          className="absolute inset-0 z-0"
        />
        
        {/* Drawing Canvas */}
        <div 
          ref={canvasRef}
          className="absolute inset-0 z-10"
        >
          <DrawingCanvas
            strokes={strokes}
            currentStroke={currentStroke}
            fingertipPosition={fingertipPosition}
            isDrawing={isDrawing}
          />
        </div>
        
        {/* Status Indicator */}
        <StatusIndicator
          cameraStatus={cameraStatus}
          handStatus={handStatus}
          drawingStatus={drawingStatus}
          error={cameraError || handError}
        />
        
        {/* Controls */}
        <Controls
          isCameraReady={cameraReady}
          isCameraRunning={!!stream}
          onStartCamera={handleStartCamera}
          onStopCamera={handleStopCamera}
          onClear={clearCanvas}
          onUndo={undo}
          onRedo={redo}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
          brushColor={brushColor}
          onBrushColorChange={setBrushColor}
          isMirrored={isMirrored}
          onMirrorToggle={() => setIsMirrored(!isMirrored)}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        
        {/* Initial Prompt */}
        {!stream && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90">
            <div className="text-center max-w-md px-6">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Start Air Writing</h2>
              <p className="text-gray-400 mb-6">
                Grant camera access to use your hand as a digital pen. 
                Extend your index finger to write in the air.
              </p>
              <button
                onClick={handleStartCamera}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-105"
              >
                Enable Camera
              </button>
              <p className="text-xs text-gray-500 mt-4">
                Camera processing happens locally on your device.
              </p>
            </div>
          </div>
        )}
        
        {/* Hand Detection Prompt */}
        {stream && handStatus === 'not_detected' && (
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-cyan-500/30">
            <p className="text-white text-sm">Show your hand to begin</p>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      {stream && (
        <div className="mt-6 text-center text-gray-500 text-sm max-w-2xl">
          <p className="mb-2">
            <span className="text-cyan-400 font-medium">Writing gesture:</span> Extend index finger, curl others
          </p>
          <p className="mb-2">
            <span className="text-cyan-400 font-medium">Shortcuts:</span> C = Clear | Ctrl+Z = Undo | Ctrl+Y = Redo | Space = Stop
          </p>
        </div>
      )}
    </div>
  );
};

export default HandTrackingApp;
