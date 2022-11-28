import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import logo from '../../../../src/Assests/Logo/logo.png';

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    const menuItems = <>
        <li> <Link to='/'>Home</Link></li>
        <li> <Link to='/blog'>Blog</Link></li>
        <li> <Link to='/dashboard'>Dashboard</Link></li>
        {
            user?.uid ?
                <li><button onClick={handleLogout}>Sign Out</button></li>
                :
                < li > <Link to="/login">Login</Link></li>
        }
    </>;
    return (
        <div className='bg-blue-800 '>
            <div className="navbar container mx-auto  text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-secondary	 font-bold normal-case text-xl">RESALE PHONE</Link >
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>

            </div>
        </div>

    );
};

export default Navbar;