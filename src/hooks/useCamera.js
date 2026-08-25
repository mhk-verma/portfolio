import { useState, useRef, useCallback, useEffect } from 'react';

export const useCamera = () => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      console.log('Requesting camera access...');
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });
      
      console.log('Camera stream obtained:', mediaStream);
      setStream(mediaStream);
      
      // Wait for state to update
      await new Promise(resolve => setTimeout(resolve, 200));
      
      if (videoRef.current) {
        console.log('Attaching stream to video element');
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded, readyState:', videoRef.current.readyState);
          videoRef.current.play().then(() => {
            console.log('Video playing successfully');
            setIsReady(true);
          }).catch(e => {
            console.log('Play error:', e);
            setIsReady(true);
          });
        };
      } else {
        console.log('videoRef.current is null, waiting for it to be available');
        setIsReady(true);
      }
      
      return mediaStream;
    } catch (err) {
      console.error('Camera access error:', err);
      setError(err.message);
      setIsReady(false);
      throw err;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsReady(false);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    stream,
    error,
    isReady,
    startCamera,
    stopCamera
  };
};
