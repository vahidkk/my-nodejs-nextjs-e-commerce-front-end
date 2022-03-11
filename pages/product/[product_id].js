import { useRouter } from "next/router";
import { useSingleProduct } from "../../utils/useSWR";
import { formatPrice } from "../../utils/helpers";
import PageHero from "../../components/PageHero";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Stars from "../../components/Stars";
import ProductImages from "../../components/ProductImages";
import styled from "styled-components";
import Link from "next/link";

const SingleProductPage = () => {
  const router = useRouter();
  const { product_id } = router.query;
  const { data, isLoading, isError } = useSingleProduct(product_id);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  const { name, price, description, stock, stars, reviews, company, images } =
    data.product;
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link href="/products">
          <a className="btn">back to products</a>
        </Link>
        <div className=" product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price"> {formatPrice(price)}</h5>
            <p className="desc"> {description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "In stock" : "out of stock"}
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
            {/* {stock > 0 && <AddToCart product={data.product} />} Not implemented yet !*/}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
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
