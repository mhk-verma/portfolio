import React, { useRef, useEffect } from 'react';

const CameraView = ({ videoRef, isReady, mirrored = true, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log('CameraView - isReady:', isReady);
    console.log('CameraView - videoRef.current:', videoRef.current);
    console.log('CameraView - srcObject:', videoRef.current?.srcObject);
    
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.play().then(() => {
        console.log('Video playing successfully');
      }).catch(e => {
        console.log('Video play error:', e);
      });
    }
  }, [isReady, videoRef]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden bg-black ${className}`}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        autoPlay
        playsInline
        muted
        style={{ 
          transform: mirrored ? 'scaleX(-1)' : 'scaleX(1)',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          backgroundColor: '#000'
        }}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Camera not ready</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraView;
