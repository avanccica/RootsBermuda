import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // small base file (Tailwind or your CSS)

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
