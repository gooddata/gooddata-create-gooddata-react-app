import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AppProviders } from "./contexts";

import "./index.scss";
import "@gooddata/react-components/styles/css/main.css";

ReactDOM.render(
    <AppProviders>
        <App />
    </AppProviders>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
