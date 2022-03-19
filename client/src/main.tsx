import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./app/App";
import {store} from "./store";
import {Provider} from "react-redux";
import "@fontsource/montserrat/700.css";
import {ChosenThemeProvider, ThemeProvider} from "./providers";

ReactDOM.render(
    <Provider store={store}>
        <ChosenThemeProvider>
            <ThemeProvider>
                <App/>
            </ThemeProvider>
        </ChosenThemeProvider>
    </Provider>,
    document.getElementById("app")
);
