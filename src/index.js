import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './services/context/AuthContext';
import createAppStore from './services/redux/store/createAppStore';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

const store = createAppStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <Provider store={store}>
            <BrowserRouter>
                <HelmetProvider>
                    <App />
                    <ToastContainer />
                </HelmetProvider>
            </BrowserRouter>
        </Provider>
    </AuthProvider>
);

