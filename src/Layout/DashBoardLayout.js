import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';
import Navbar from '../Pages/Share/Navbar/Navbar';

const DashBoardLayout = () => {

    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    return (
        <div>
            <Navbar></Navbar>
            <label htmlFor="dashboard-drawer" className='lg:hidden'>open</label>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {
                            isSeller && <>
                                <li><Link to="/dashboard/seller/addproduct">Add Product</Link></li>
                                <li><Link to="/dashboard/seller/products">My Products</Link></li>
                            </>
                        }
                        {
                            isBuyer &&
                            <li><Link to="/dashboard/buyer/myorders">My Orders</Link></li>
                        }

                        {/* {
                            isAdmin && <>
                                <li><Link to="/dashboard/allusers">All users</Link></li>
                                <li><Link to="/dashboard/adddoctor">Add A Doctor</Link></li>
                                <li><Link to="/dashboard/managedoctors">Manage Doctors</Link></li>
                            </>
                        } */}

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;