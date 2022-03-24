import Layout from "../components/Layout";
import "../public/main.css";
import { SideBarProvider } from "../context/context";
import { FilterProvider } from "../context/filter_context";
import { CartProvider } from "../context/cart_context";
import { UserProvider, useUserContext } from "../context/user_context";
import axios from "axios";
import { SWRConfig } from "swr";
import NextNProgress from "nextjs-progressbar";

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
            <UserProvider>
              <Layout>
                <NextNProgress
                  color={"var(--clr-primary-7)"}
                  startPosition={0.3}
                  stopDelayMs={200}
                  height={3}
                  showOnShallow={true}
                />
                <Component {...pageProps} />
              </Layout>
            </UserProvider>
          </CartProvider>
        </FilterProvider>
      </SideBarProvider>
    </SWRConfig>
  );
}

export default MyApp;
