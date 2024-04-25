import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "jquery/dist/jquery.min.js";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { localStore } from "./Redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider Provider store={localStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
