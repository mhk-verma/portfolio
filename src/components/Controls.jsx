import React from 'react';
import { Camera, CameraOff, Trash2, Undo, Redo, Brush, Palette, FlipHorizontal } from 'lucide-react';

const Controls = ({
  isCameraReady,
  isCameraRunning,
  onStartCamera,
  onStopCamera,
  onClear,
  onUndo,
  onRedo,
  brushSize,
  onBrushSizeChange,
  brushColor,
  onBrushColorChange,
  isMirrored,
  onMirrorToggle,
  canUndo,
  canRedo
}) => {
  const colors = [
    '#00ffff', // Cyan
    '#ff00ff', // Magenta
    '#00ff00', // Green
    '#ffff00', // Yellow
    '#ffffff', // White
    '#ff6600', // Orange
  ];

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-64 bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-cyan-500/30">
      <div className="space-y-3">
        {/* Camera Controls */}
        <div className="flex gap-2">
          {!isCameraRunning ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('=== ENABLE CAMERA BUTTON CLICKED ===');
                console.log('Event:', e);
                console.log('onStartCamera function:', onStartCamera);
                onStartCamera();
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 px-4 rounded-lg transition-all cursor-pointer"
            >
              <Camera size={18} />
              Enable Camera
            </button>
          ) : (
            <button
              onClick={onStopCamera}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            >
              <CameraOff size={18} />
              Stop
            </button>
          )}
          
          <button
            onClick={onMirrorToggle}
            className={`p-2 rounded-lg transition-all ${isMirrored ? 'bg-cyan-500/30 text-cyan-400' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            title="Mirror Camera"
          >
            <FlipHorizontal size={20} />
          </button>
        </div>

        {/* Drawing Controls */}
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg transition-all"
            title="Clear Canvas (C)"
          >
            <Trash2 size={18} />
            Clear
          </button>
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white py-2 px-3 rounded-lg transition-all"
            title="Undo (Z)"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white py-2 px-3 rounded-lg transition-all"
            title="Redo (Y)"
          >
            <Redo size={18} />
          </button>
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-2">
          <Brush size={18} className="text-gray-400" />
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <span className="text-white text-sm w-8">{brushSize}</span>
        </div>

        {/* Color Picker */}
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-gray-400" />
          <div className="flex gap-2 flex-1">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onBrushColorChange(color)}
                className={`w-8 h-8 rounded-full transition-all ${
                  brushColor === color 
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' 
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
