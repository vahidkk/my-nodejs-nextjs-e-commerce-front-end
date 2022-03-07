import logo from "../public/letsgoshopping.png";
import Image from "next/image";
import Link from "next/link";
import { links } from "../utils/constants";
import styled from "styled-components";
import CartButtons from "./CartButtons";
import { X } from "react-feather";
import { useSideBarContext } from "../context/context";

const Sidebar = () => {
  const myUser = true;
  const { isSidebarOpen, closeSidebar } = useSideBarContext();
  return (
    <SidebarContainer>
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <div className="sidebar-header">
          <Image
            src={logo}
            alt="vahid e-commerce"
            width={175}
            height={100}
            className="logo"
            objectFit="contain"
            placeholder="blur"
          />
          <button className="close-btn" type="button" onClick={closeSidebar}>
            <X />
          </button>
        </div>
        <ul className="links">
          {links.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link href={url} onClick={closeSidebar}>
                  {text}
                </Link>
              </li>
            );
          })}
          {myUser && (
            <li>
              <Link href="/checkout" onClick={closeSidebar}>
                checkout
              </Link>
            </li>
          )}
        </ul>
        <CartButtons />
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-grey-5);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-grey-5);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-primary-5);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar;
