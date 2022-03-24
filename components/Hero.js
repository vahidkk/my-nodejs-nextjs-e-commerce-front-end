import styled from "styled-components";
import heroBcg from "../public/letsgoshopping.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content">
        <h2>
          Buy <br />
          High quality products
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure
          quasi odit tenetur unde officiis repudiandae quod deserunt quia eum?
        </p>
        <Link href="/products">
          <a className="btn hero-btn">shop now</a>
        </Link>
      </article>
      <article className="img-container">
        <Image src={heroBcg} alt="vahid" className="main-img" />
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
  }
`;

export default Hero;
