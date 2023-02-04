import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.scss';
import './samples/node-api';

//window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true };
//__REACT_DEVTOOLS_GLOBAL_HOOK__ = true;
//console.log('window.__REACT_DEVTOOLS_GLOBAL_HOOK__', window.__REACT_DEVTOOLS_GLOBAL_HOOK__);
//window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {}

//__REACT_DEVTOOLS_GLOBAL_HOOK__ = { isDisabled: true };

//window.__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent.clearErrorsAndWarnings()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');

