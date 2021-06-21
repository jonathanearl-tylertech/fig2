import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="w-screen h-12 bg-white mb-12">
      <ul className="max-w-4xl flex flex-row justify-end mx-auto">
        <li className="flex h-12 p-3">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  )
}
export default NavBar;
