import React from "react";
import ReactDOM from "react-dom/client";
import CoinsList from "./components/coins-list/CoinsList";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoadingProvider } from "./components/context/LoadingProvider";
import store from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Provider store={store()}>
        <LoadingProvider>
          <CoinsList />
        </LoadingProvider>
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
