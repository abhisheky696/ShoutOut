import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
// import store from "./redux/store.jsx";
import { persistor, store } from './redux/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
            <ToastContainer />
        </PersistGate>
        </Provider>
    </StrictMode>
);
