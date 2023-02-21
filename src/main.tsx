import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

//TODO: drop zone 100% of document not view port - done
//TODO: filter files by valid types - done
//TODO: show errors in UI

//TODO: menu click outside
