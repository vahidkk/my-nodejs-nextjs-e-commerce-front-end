import Layout from "../components/Layout";
import "../public/main.css";
import { SideBarProvider } from "../context/context";
import { FilterProvider } from "../context/filter_context";
import { CartProvider } from "../context/cart_context";
import axios from "axios";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  const fetcher = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  };
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <SideBarProvider>
        <FilterProvider>
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </FilterProvider>
      </SideBarProvider>
    </SWRConfig>
  );
}

export default MyApp;
