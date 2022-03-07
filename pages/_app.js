import Layout from "../components/Layout";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "../public/main.css";
import { SideBarProvider } from "../context/context";
function MyApp({ Component, pageProps }) {
  return (
    <SideBarProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SideBarProvider>
  );
}

export default MyApp;
