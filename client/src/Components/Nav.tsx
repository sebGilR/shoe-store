import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import SectionBase from "./Utils";

type NavBarProps = {
  navBackground: boolean;
};

const NavBar = styled(SectionBase)<NavBarProps>`
  position: fixed;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  background-color: #14141c;
  font-family: "Raleway", sans-serif;
  z-index: 100;
  ${({ navBackground }) =>
    navBackground &&
    css`
      background-color: #4d4d52;
      box-shadow: 0px 0px 15px 0px #000000df;
      border-bottom: 1px solid #64c064;
    `};

  h1 {
    font-size: 30px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItemWrapper = styled.div`
  margin-right: 50px;
  font-weight: bold;
  position: relative;

  a {
    color: white;
    text-decoration: none;
  }

  &:hover a {
    color: #dddddd;
  }

  &:hover div {
    width: 100%;
  }

  div {
    width: 0;
    height: 4px;
    border-radius: 2px;
    position: absolute;
    bottom: -10px;
    background-color: #64c064;
    transition: all 0.2s ease-in;
  }
`;

const Accent = styled.span`
  font-weight: bold;
  color: #64c064;
`;

type NavProps = {
  children: React.ReactNode;
};

const NavItem = ({ children }: NavProps) => (
  <NavItemWrapper>
    <span>{children}</span>
    <div />
  </NavItemWrapper>
);

const Nav: React.FC = () => {
  const [navBackground, setNavBackground] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 5) {
      setNavBackground(true);
    } else {
      setNavBackground(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <NavBar navBackground={navBackground}>
      <a
        href="/"
        style={{ fontSize: "30px", color: "white", textDecoration: "none" }}
      >
        <Accent>Shoe</Accent>Store
      </a>
      <Navigation>
        <NavItem>
          <Link to="/">Inventory</Link>
        </NavItem>
        <NavItem>
          <Link to="/low-high">Low/High Stock View</Link>
        </NavItem>
      </Navigation>
    </NavBar>
  );
};

export default Nav;
