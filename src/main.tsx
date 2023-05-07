import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n';
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useIsAuthenticated } from 'react-auth-kit';
import Cookies from 'js-cookie';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Suspense fallback={<div>Loading...</div>}>
                <AuthProvider
                    authType={'cookie'}
                    authName={'_auth'}
                    cookieDomain={window.location.hostname}
                    cookieSecure={true}
                >
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthProvider>
            </Suspense>
        </Provider>
    </React.StrictMode>,
)
