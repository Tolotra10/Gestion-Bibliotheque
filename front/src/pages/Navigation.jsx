import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {FaFire} from 'react-icons/fa'

const Navigation = () => {
    const [filtres,setFiltres] = useState(false)
    return (
        <div className='nav'>
            <Link to='/'  style={{position:'fixed',top:'15px',left:'15px',color:'#ce0b46',display:'flex',
            alignItems:'center'}}>
                <FaFire style={{fontSize:'30px',marginRight:'2px'}}/>
                <p>G-biblio</p></Link>
            <div className="navContent">
                <div className="container">
                    <Link to='/addBooks'><p>Admin</p></Link>
                    <Link to='/'><FaFire/></Link>
                    <div className="filtre"
                    onMouseEnter={()=>{setFiltres(true)}} 
                    onMouseLeave={()=>{setFiltres(false)}}>
                        {
                            filtres ?
                            <ul style={{width:'150px'}}>
                                <Link to='/?cat=roman'><li>Romans</li></Link>
                                <Link to='/?cat=history'><li>Histoire</li></Link>
                                <Link to='/?cat=tech'><li>Technologie</li></Link>
                                <Link to='/?cat=bandeD'><li>Bande dessinée</li></Link>
                            </ul> :
                            ''
                        }
                        <p style={{cursor:'pointer'}}>Filtre</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigation;