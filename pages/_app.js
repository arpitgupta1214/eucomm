import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return Component.layout ? (
    <Component.layout {...pageProps}>
      <Component {...pageProps} />
    </Component.layout>
  ) : (
    <Component {...pageProps} />
  );
}

export default MyApp;
