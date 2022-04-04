import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Loading from "./Loading";

const ProductImages = ({ images }) => {
  const [main, setMain] = useState(images[0]);
  return (
    <Wrapper>
      {main ? (
        <Image
          key={main.large}
          src={main.large}
          placeholder="blur"
          blurDataURL={`data:image/jpeg;base64,${main.small}`}
          alt="main image"
          width="100%"
          height="100%"
          layout="responsive"
          className="main-img"
        />
      ) : (
        <Loading />
      )}
      <div className="gallery">
        {images.map((image, index) => {
          return (
            <span
              key={index}
              className={`${
                image.large === main.large ? "active " : "pointer "
              } span-image-border`}
            >
              <Image
                height="100%"
                width="100%"
                src={image.large}
                placeholder="blur"
                blurDataURL={`data:image/jpeg;base64,${image.small}`}
                key={index}
                onClick={() => setMain(images[index])}
              />
            </span>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  .main-img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    .pointer {
      cursor: pointer;
    }
  }
  .active {
    border: 1px solid var(--clr-primary-6);
  }
  .span-image-border {
    display: flex;
    width: fit-content;
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    /* .gallery {
      .pointer {
        height: 50px;
      }
    } */
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    /* .gallery {
      .pointer {
        height: 75px;
      }
    } */
  }
`;

export default ProductImages;
