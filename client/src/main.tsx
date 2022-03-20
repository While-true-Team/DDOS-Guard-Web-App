import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./app/App";
import {store} from "./store";
import {Provider} from "react-redux";
import {ChosenThemeProvider, ThemeProvider} from "./providers";
import "@fontsource/montserrat/700.css";

ReactDOM.render(
    <ChosenThemeProvider>
        <ThemeProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </ChosenThemeProvider>,
    document.getElementById("app")
)
