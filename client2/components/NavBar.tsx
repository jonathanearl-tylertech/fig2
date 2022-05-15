import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { endUserSession } from '../feature/sessionslice';
import { AuthHelper } from '../services/auth-helper';
import { RootState } from '../store';

function NavBar() {
  const userInfo: any = useSelector((state: RootState) => state.session.userInfo);
  const dispatch = useDispatch();

  async function logout() {
    await AuthHelper.logout();
    dispatch(endUserSession())
  }

  return (
    <nav className="w-screen h-12 bg-white mb-12">
      <ul className="max-w-4xl flex flex-row justify-end mx-auto">
        <li className="flex h-12 p-3">
          <Link to={'/explore'}>Explore</Link>
        </li>
        <li className="flex h-12 p-3">
          <Link to={`/${userInfo?.username}`}>Profile</Link>
        </li>
        <li className="flex h-12 p-3">
          <Link to={'/explore'} onClick={logout}>Logout</Link>
        </li>
      </ul>
    </nav>
  )
}
export default NavBar;
