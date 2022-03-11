import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const ProductImages = ({
  images = [
    {
      url: "https://res.cloudinary.com/waheeeed/image/upload/v1646850151/file-upload/tmp-1-1646850147576_x6txpv.png",
    },
  ],
}) => {
  const [main, setMain] = useState(images[0]);
  return (
    <Wrapper>
      <Image
        src={main.url}
        alt="main image"
        width="100%"
        height="100%"
        layout="responsive"
        className="main-img"
      />
      <div className="gallery">
        {images.map((image, index) => {
          return (
            <Image
              height="100%"
              width="100%"
              src={image.url}
              alt={image.filename}
              key={index}
              onClick={() => setMain(images[index])}
              className={`${image.url === main.url ? "active" : null} pointer`}
            />
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
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      .pointer {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      .pointer {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
