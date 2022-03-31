import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import Link from "next/link";
import Image from "next/image";

const ListView = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => {
        const { id, image, name, price, description } = product;
        return (
          <article key={id}>
            <Link href={`/product/${id}`} className="btn">
              <Image
                width="300px"
                height="200px"
                className="list-view-img"
                src={image[0].thumb}
                placeholder="blur"
                blurDataURL={`data:image/jpeg;base64,${image.small}`}
                alt={name}
              />
            </Link>
            <div>
              <Link href={`/product/${id}`} className="btn">
                <h4>{name}</h4>
              </Link>
              <h5 className="price">{formatPrice(price)}</h5>
              <p>{description.substring(0, 150)}...</p>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  .list-view-img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
    cursor: pointer;
  }
  h4 {
    margin-bottom: 0.5rem;
    cursor: pointer;
  }
  .price {
    color: var(--clr-grey-2);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
