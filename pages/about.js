import styled from "styled-components";
import PageHero from "../components/PageHero";
import aboutImg from "../public/shopping-online.png";
import Image from "next/image";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <Image
          src={aboutImg}
          alt="vahid e-commerce"
          // width={175}
          // height={100}
          objectFit="contain"
          placeholder="blur"
        />
        <article>
          <div className="title">
            <h2>About us</h2>
            <div className="underline"></div>
          </div>
          <p>
            Lorem ipsum amet consectetur adiopisicing eliot. Totami quaerat,
            modi doloremque necessitatibus eum dolor nesciunt delectus,
            voluptate blanditiis, obcaecati beatae ab aut ipsa consequuntur
            tempora cumque. Ut quo enim vero odio minus nostrum eveniet,
            doloribus veritatis dolorem unde ipsum, voluptatibus totam.
            Explicabo, quas libero! Laborum incidunt minima consequatur ratione?
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
