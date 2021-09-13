import "../styles/globals.scss";

import store from "store";
import { Provider as StoreProvider } from "react-redux";
import UiProvider from "components/UiProvider";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <UiProvider>
        {Component.layout ? (
          <Component.layout {...pageProps}>
            <Component {...pageProps} />
          </Component.layout>
        ) : (
          <Component {...pageProps} />
        )}
      </UiProvider>
    </StoreProvider>
  );
}

export default MyApp;
