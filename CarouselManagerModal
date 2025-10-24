import React from 'react';
import { UploadIcon } from './Icons';

const CarouselManagerModal = ({ isOpen, onClose, images, theme, setImages }) => {
  if (!isOpen) return null;

  const handleSimulatedUpload = () => {
    const newId = images.length + 1;
    const newImage = {
      id: newId,
      url: `https://placehold.co/1200x300/34D399/064E3B?text=New+Pic+${newId}`,
      alt: `Uploaded Image ${newId} (Admin)`
    };
    setImages(prev => [...prev, newImage]);
    console.log(`Simulated: Added new image ${newId} to carousel state.`);
  };

  const handleRemoveImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4">
      <div className={`w-full max-w-2xl p-6 rounded-xl shadow-2xl ${theme.sectionBg} border ${theme.borderColor} ${theme.darkText}`}>
        <h3 className="text-2xl font-bold mb-4">Manage Carousel Images</h3>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 mb-4">
          {images.map(image => (
            <div key={image.id} className={`flex items-center justify-between p-3 rounded-lg ${theme.cardBg} border ${theme.borderColor}`}>
              <div className="flex items-center space-x-3 w-4/5">
                <img src={image.url} alt={image.alt} className="w-16 h-10 object-cover rounded-md" />
                <span className="text-sm truncate">{image.alt.split('(')[0].trim()}</span>
              </div>
              <button onClick={() => handleRemoveImage(image.id)} className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition" title="Remove Image">&times;</button>
            </div>
          ))}
          {images.length === 0 && <p className="text-center italic text-sm text-gray-500">No images currently in the carousel.</p>}
        </div>

        <p className={`${theme.subtleText} text-sm mb-3 text-center`}>Photos will be uploadable from your <strong>Device</strong> or <strong>Google Drive</strong>.</p>

        <button onClick={handleSimulatedUpload} className="w-full mb-4 px-4 py-3 rounded-full font-semibold bg-lime-500 text-gray-900 shadow-lg hover:bg-lime-600 transition flex items-center justify-center space-x-2">
          <UploadIcon className="w-5 h-5" />
          <span>Upload Pictures from Device / Drive (Simulated)</span>
        </button>

        <div className="flex justify-end">
          <button onClick={onClose} className={`px-6 py-2 rounded-full font-semibold ${theme.accentBtn} transition`}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default CarouselManagerModal;
