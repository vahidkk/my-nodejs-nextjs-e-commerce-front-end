import { useRouter } from "next/router";
import { useSingleProduct } from "../../utils/useSWR";
import { formatPrice } from "../../utils/helpers";
import PageHero from "../../components/PageHero";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Stars from "../../components/Stars";
import ProductImages from "../../components/ProductImages";
import AddToCart from "../../components/AddToCart";
import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import { getPictures } from "../api/pictures";

const SingleProductPage = ({ fetchedData }) => {
  const { data, pictures } = fetchedData;
  const router = useRouter();
  const { product_id } = router.query;
  const { name, price, description, inventory, stars, reviews, company } =
    data.product;
  return (
    <Wrapper>
      <Head>
        <title>{name} </title>
      </Head>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link href="/products">
          <a className="btn">back to products</a>
        </Link>
        <div className=" product-center">
          <ProductImages images={pictures} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price"> {formatPrice(price)}</h5>
            <p className="desc"> {description}</p>
            <p className="info">
              <span>Available : </span>
              {inventory > 0 ? `In stock (${inventory} left)` : "out of stock"}
            </p>
            <p className="info">
              <span>SKU : </span>
              {product_id}
            </p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {inventory > 0 && <AddToCart product={data.product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const res = await fetch(process.env.MY_API_PRODUCTS_ROUTE);
  const posts = await res.json();
  const paths = posts.products.map((post) => ({
    params: { product_id: post._id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const res = await fetch(
    process.env.MY_API_PRODUCTS_ROUTE + context.params.product_id
  );
  const data = await res.json();
  const pictures = await getPictures(data.product.image);
  console.log("data2", data);
  const fetchedData = { data, pictures };
  return { props: { fetchedData } };
}
const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-grey-2);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
