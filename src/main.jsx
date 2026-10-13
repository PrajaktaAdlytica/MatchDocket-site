import React from 'react';
import {hydrateRoot,createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion');
const root=document.getElementById('root');const app=<BrowserRouter><App/></BrowserRouter>;
if(root.hasChildNodes())hydrateRoot(root,app);else createRoot(root).render(app);
