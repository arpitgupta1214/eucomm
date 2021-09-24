import "../styles/globals.scss";
import config from "data/config.json";
import store from "store";
import { Provider as StoreProvider } from "react-redux";
import UiProvider from "components/UiProvider";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <UiProvider>
        {Component.layout ? (
          <Component.layout {...pageProps} config={config}>
            <Component {...pageProps} config={config} />
          </Component.layout>
        ) : (
          <Component {...pageProps} config={config} />
        )}
      </UiProvider>
    </StoreProvider>
  );
}

export default MyApp;
