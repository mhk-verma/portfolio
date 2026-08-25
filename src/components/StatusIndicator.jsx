import React from 'react';
import { Camera, Hand, PenTool, AlertCircle } from 'lucide-react';

const StatusIndicator = ({ 
  cameraStatus, 
  handStatus, 
  drawingStatus,
  error 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ready':
      case 'detected':
      case 'active':
        return 'text-cyan-400';
      case 'error':
        return 'text-red-400';
      case 'pending':
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case 'camera':
        return <Camera size={16} />;
      case 'hand':
        return <Hand size={16} />;
      case 'drawing':
        return <PenTool size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-64 bg-black/80 backdrop-blur-md rounded-xl p-3 border border-cyan-500/30">
      <div className="space-y-2">
        {/* Camera Status */}
        <div className="flex items-center gap-2">
          {getStatusIcon('camera')}
          <span className="text-gray-400 text-sm">Camera:</span>
          <span className={`text-sm font-medium ${getStatusColor(cameraStatus)}`}>
            {cameraStatus === 'ready' ? 'Ready' : cameraStatus === 'active' ? 'Active' : cameraStatus === 'error' ? 'Error' : 'Pending'}
          </span>
        </div>

        {/* Hand Status */}
        <div className="flex items-center gap-2">
          {getStatusIcon('hand')}
          <span className="text-gray-400 text-sm">Hand:</span>
          <span className={`text-sm font-medium ${getStatusColor(handStatus)}`}>
            {handStatus === 'detected' ? 'Detected' : handStatus === 'not_detected' ? 'Not Detected' : 'Pending'}
          </span>
        </div>

        {/* Drawing Status */}
        <div className="flex items-center gap-2">
          {getStatusIcon('drawing')}
          <span className="text-gray-400 text-sm">Drawing:</span>
          <span className={`text-sm font-medium ${getStatusColor(drawingStatus)}`}>
            {drawingStatus === 'active' ? 'Active' : drawingStatus === 'ready' ? 'Ready' : 'Inactive'}
          </span>
        </div>

        {/* Error Message */}
        {error && !error.includes('play()') && (
          <div className="flex items-center gap-2 text-red-400 text-sm mt-2 pt-2 border-t border-red-500/30">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-700">
          Camera processing happens locally on your device.
        </div>
      </div>
    </div>
  );
};

export default StatusIndicator;
