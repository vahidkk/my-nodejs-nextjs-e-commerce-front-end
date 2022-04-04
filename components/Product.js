import { formatPrice } from "../utils/helpers";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Product = ({ image, name, price, id }) => {
  return (
    <Wrapper>
      <div className="container">
        <Link href={`/product/${id}`} className="link">
          <Image
            height={225}
            width={300}
            src={image[0].thumb}
            placeholder="blur"
            blurDataURL={`data:image/jpeg;base64,${image.small}`}
            alt={name}
            className="img"
          />
        </Link>
      </div>
      <footer>
        <Link href={`/product/${id}`} className="link">
          <h5>
            <b>{name}</b>
          </h5>
        </Link>
        <p>{formatPrice(price)}</p>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  .img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
    cursor: pointer;
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  h5 {
    cursor: pointer;
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    /* justify-content: space-between; */
    justify-content: flex-start;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
    color: var(--clr-grey-2);
    letter-spacing: var(--spacing);
  }
  footer p {
    margin-left: 1.8vw;
  }
`;
export default Product;
