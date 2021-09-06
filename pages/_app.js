import "../styles/globals.scss";
import store from "store";
import { Provider as StoreProvider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      {Component.layout ? (
        <Component.layout {...pageProps}>
          <Component {...pageProps} />
        </Component.layout>
      ) : (
        <Component {...pageProps} />
      )}
    </StoreProvider>
  );
}

export default MyApp;
