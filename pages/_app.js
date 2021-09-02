import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Component.layout {...pageProps}>
      <Component {...pageProps} />
    </Component.layout>
  );
}

export default MyApp;
