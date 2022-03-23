import styled from "styled-components";
import PageHero from "../../components/PageHero";
import OrdersHistory from "../../components/OrdersHistory";
const MyOrdersHistory = () => {
  return (
    <main>
      <PageHero title="Change Password" />
      <Wrapper className="page section section-center">
        <article>
          <div className="title">
            <h2>Orders History</h2>
            <div className="underline"></div>
          </div>
          <p>
            <OrdersHistory />
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;

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
export default MyOrdersHistory;
