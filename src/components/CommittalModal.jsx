import React, { useState } from 'react';

const CommitModal = ({ isOpen, onClose, theme, editableState }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const isDarkTheme = theme.mainBg.includes('bg-gray-900');

  const handleCommit = (e) => {
    e.preventDefault();
    setError('');

    // Simulated Authentication Logic
    if (username === 'admin' && password === 'admin') {
      console.log('--- COMMIT ACTION LOG: SUCCESS ---');
      console.log('Editable Content to be Saved:', editableState);
      onClose();
    } else {
      setError('Invalid username or password. Please use "admin" for both.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md p-6 rounded-xl shadow-2xl ${theme.sectionBg} border ${theme.borderColor} ${theme.darkText}`}>
        <h3 className="text-2xl font-bold mb-4">Commit Changes</h3>
        <p className={`${theme.subtleText} mb-6`}>Enter credentials to publish edits to the live site.</p>

        {error && (
          <div className="bg-red-900 text-white p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleCommit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 rounded-lg border ${theme.borderColor} ${theme.mainBg.split(' ')[0]} ${isDarkTheme ? 'text-lime-400' : 'text-gray-900'}`}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 rounded-lg border ${theme.borderColor} ${theme.mainBg.split(' ')[0]} ${isDarkTheme ? 'text-lime-400' : 'text-gray-900'}`}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-full font-semibold bg-red-600 text-white shadow-lg hover:bg-red-700 transition">Cancel (Red)</button>
            <button type="submit" className="px-6 py-2 rounded-full font-semibold bg-lime-500 text-gray-900 shadow-lg hover:bg-lime-600 transition">Commit (Green)</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommitModal;
