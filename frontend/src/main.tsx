import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./app/App";
import {StoreProvider} from "@/app/providers/StoreProvider";
import "@/shared/config/i18n/i18n";
import {Provider, ErrorBoundary} from '@rollbar/react';

const rootElement = document.getElementById("root");

const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: import.meta.env.MODE,
    captureUncaught: true,
    captureUnhandledRejections: true,
};

if (!rootElement) {
    throw new Error("Root element #root was not found");
}

createRoot(rootElement).render(
    <StrictMode>
        <Provider config={rollbarConfig}>
            <ErrorBoundary
                fallbackUI={() => (
                    <div style={{padding: '20px', color: 'red'}}>
                        <h2>Oops, something went wrong.</h2>
                        <p>We've been notified and are looking into it.</p>
                    </div>
                )}
            >
                <BrowserRouter>
                    <StoreProvider>
                        <App/>
                    </StoreProvider>
                </BrowserRouter>
            </ErrorBoundary>
        </Provider>
    </StrictMode>,
);
