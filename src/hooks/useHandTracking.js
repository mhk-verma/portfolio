import { useState, useRef, useCallback, useEffect } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export const useHandTracking = (videoElement, onResults) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState(null);
  const handsRef = useRef(null);
  const cameraRef = useRef(null);

  const initializeHands = useCallback(async () => {
    try {
      setError(null);
      
      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5
      });

      hands.onResults((results) => {
        if (onResults) {
          onResults(results);
        }
      });

      await hands.initialize();
      handsRef.current = hands;
      setIsLoaded(true);

      if (videoElement) {
        const camera = new Camera(videoElement, {
          onFrame: async () => {
            if (handsRef.current) {
              await handsRef.current.send({ image: videoElement });
            }
          },
          width: 1280,
          height: 720
        });
        
        cameraRef.current = camera;
        await camera.start();
        setIsDetecting(true);
      }
    } catch (err) {
      setError(err.message);
      setIsLoaded(false);
      setIsDetecting(false);
    }
  }, [videoElement, onResults]);

  const stopTracking = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
    }
    setIsDetecting(false);
  }, []);

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, [stopTracking]);

  return {
    isLoaded,
    isDetecting,
    error,
    initializeHands,
    stopTracking
  };
};
