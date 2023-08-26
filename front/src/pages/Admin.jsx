import React from 'react';
import { Link } from 'react-router-dom';
import {FaUser,FaBook,FaDatabase} from 'react-icons/fa'

const Admin = () => {
    return (
        <div>
            <div className="sideBar">
                <div className="links">
                    <Link to='/addBooks'><FaBook/></Link>
                    <Link to='/addUsers'><FaUser/></Link>
                    <Link to='/dashboard'><FaDatabase/></Link>
                </div>
            </div>
            
        </div>
    );
};

export default Admin;