import styled from "styled-components";
import ProductList from "../components/ProductList";
import PageHero from "../components/PageHero";
import Filters from "../components/Filters";
import Sort from "../components/Sort";
import Head from "next/head";
import { getPictures } from "./api/pictures";

const ProductsPage = ({ manipulateDataWithNewImages }) => {
  return (
    <main>
      <Head>
        <title>Lets Go Shopping ! - Products </title>
      </Head>
      <PageHero title="products" />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters data={manipulateDataWithNewImages} />
          <div>
            <Sort />
            <ProductList data={manipulateDataWithNewImages} />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export async function getStaticProps() {
  const res = await fetch(process.env.MY_API_PRODUCTS_ROUTE);
  const data = await res.json();
  const rawImages = data.products.map((i) => {
    return i.image[0];
  });
  const pictures = await getPictures(rawImages);

  const manipulateDataWithNewImages = data.products.map((item, index) => {
    return { ...item, image: [pictures[index]] };
  });
  return { props: { manipulateDataWithNewImages } };
}

export default ProductsPage;
