import styled from "styled-components";
import PageHero from "../../components/PageHero";
import ChangeName from "../../components/ChangeName";
import aboutImg from "../../public/shopping-online.png";
import Image from "next/image";
import Head from "next/head";

const ChangeTheName = () => {
  return (
    <main>
      <PageHero title="Change Name" />
      <Head>
        <title>Lets Go Shopping ! - Change Name </title>
      </Head>
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
            <h2>Change Name</h2>
            <div className="underline"></div>
          </div>
          <p>
            <ChangeName />
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
export default ChangeTheName;
