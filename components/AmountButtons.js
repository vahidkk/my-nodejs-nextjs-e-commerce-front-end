import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const AmountButtons = ({ increase, decrease, amount }) => {
  return (
    <Wrapper>
      <button type="button" onClick={decrease}>
        <FaMinus title="Decrease quantity" />
      </button>
      <h2>{amount}</h2>
      <button type="button" onClick={increase}>
        <FaPlus title="Increase quantity" />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 100px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--clr-grey-5);
  }
  @media (min-width: 776px) {
    width: 140px;
  }
`;

export default AmountButtons;
