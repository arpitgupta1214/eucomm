import "../styles/globals.scss";
import config from "data/config";
import StoreProvider from "store";
import UiProvider from "components/UiProvider";
import { useState } from "react";
import router from "next/router";
import Loader from "components/Loader";

function MyApp({ Component, pageProps }) {
  const [routeChanging, setRouteChanging] = useState(false);
  router.events.on("routeChangeStart", () => setRouteChanging(true));
  router.events.on("routeChangeComplete", () => setRouteChanging(false));

  return (
    <StoreProvider>
      <UiProvider>
        {routeChanging ? (
          <Loader />
        ) : Component.layout ? (
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
