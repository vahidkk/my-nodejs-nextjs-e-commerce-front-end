import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";
import Image from "next/image";
import Link from "next/link";
import { useAllProducts } from "../utils/useSWR";

const FeaturedProducts = () => {
  const {
    isLoading: loading,
    isError: error,
    isFeatured: featured,
  } = useAllProducts();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  } else
    return (
      <Wrapper className="section">
        <div className="title">
          <h2>featured products</h2>
          <div className="underline"></div>
        </div>
        <div className="section-center featured">
          {featured.slice(0, 3).map((product) => {
            return <Product key={product.id} {...product} />;
          })}
        </div>
        <Link href="/products" className="btn">
          all products
        </Link>
      </Wrapper>
    );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
