import styled from "styled-components";
import Image from "next/image";
import logo from "../public/letsgoshopping.png";
import { Menu } from "react-feather";
import Link from "next/link";
import { links } from "../utils/constants";
import CartButtons from "./CartButtons";

const Nav = () => {
  const openSidebar = () => {};
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          <Link href="/">
            <Image
              src={logo}
              alt="vahid e-commerce"
              width={175}
              height={100}
              className="logo"
              objectFit="contain"
              placeholder="blur"
            />
          </Link>
          <button type="button" className="nav-toggle" onClick={openSidebar}>
            <Menu />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link href={url}>{text}</Link>
              </li>
            );
          })}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
  }
  .logo {
    margin-left: -15px;
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Nav;
