import Layout from "../components/Layout";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "../public/main.css";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
