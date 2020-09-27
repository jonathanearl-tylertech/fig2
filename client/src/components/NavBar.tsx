import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components'

function NavBar() {
    return (
        <Nav>
            <Ul>
                <Li>
                    <Link to="/">FriendFeed</Link>
                </Li>
                <Li>
                    <Link to="/about">About</Link>
                </Li>
                <Li>
                    <Link to="/users">Users</Link>
                </Li>
            </Ul>
        </Nav>
    )
}
export default NavBar;

const Nav = styled.nav`
  display: flex;
`
const Ul = styled.ul`
  display: flex;
  list-style: none;
`
const Li = styled.li`
  width: calc(100vw/5);
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`