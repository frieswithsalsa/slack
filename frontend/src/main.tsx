import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./app/App";
import {StoreProvider} from "@/app/providers/StoreProvider";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <StoreProvider>
            <App/>
        </StoreProvider>
    </BrowserRouter>,
);
