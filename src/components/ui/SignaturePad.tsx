/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';

interface SignaturePadProps {
  onSignatureCapture: (blob: Blob) => void;
  onClose: () => void;
}

export default function SignaturePad({ onSignatureCapture, onClose }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width - 2;
      canvas.height = rect.height - 2;
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    isDrawing.current = true;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if canvas is empty (all white)
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let isEmpty = true;

    for (let i = 0; i < data.length; i += 4) {
      // Check if pixel is not white (255, 255, 255)
      if (data[i] !== 255 || data[i + 1] !== 255 || data[i + 2] !== 255) {
        isEmpty = false;
        break;
      }
    }

    if (isEmpty) {
      alert('Please draw a signature before saving');
      return;
    }

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (blob) {
        onSignatureCapture(blob);
        onClose();
      }
    }, 'image/png');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Sign Here</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Canvas Container */}
        <div className="border border-gray-300 m-4 bg-white" style={{ height: '300px' }}>
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="cursor-crosshair block w-full h-full"
            style={{ touchAction: 'none' }}
          />
        </div>

        {/* Instructions */}
        <p className="text-sm text-gray-600 px-4 mb-4">Draw your signature above</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={handleClear}
            type="button"
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
          >
            Clear
          </button>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Save Signature
          </button>
        </div>
      </div>
    </div>
  );
}
