import React,{useState,useEffect} from 'react';
import Admin from './Admin';
import {AiOutlineDelete} from 'react-icons/ai'
import axios from 'axios'

const Dashboard = () => {
    const [loc,setLoc] = useState([])

    const changeState = async(lid) =>{
        await axios.put(`http://localhost:8080/api/livres/available/${lid}`)
    }
    const deleteItem = async(id) =>{
        await axios.delete(`http://localhost:8080/api/location/${id}`)
    }
    const deleteLoc = async(id,lid) =>{
        changeState(lid)
        deleteItem(id)
        setTimeout(()=>window.location.reload(),1000)
     }
    const fetchAllLoc = () =>{
        axios.get('http://localhost:8080/api/location').then((res)=>{
            setLoc(res.data)
        })
    }
    useEffect(() => {
        fetchAllLoc()
    }, []);

    return (
        <div className='dash'>
            <p className="title">Administrateur</p>
            <div className="container">
                <Admin/>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                            <th>Livre</th>
                            <th>Loué par</th>
                            <th>Date de location</th>
                            <th>Date limite</th>
                            <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loc.map((item,index)=>{
                                    const id = item.id
                                    const lid = item.lid
                                    return(
                                            <tr key={index}>
                                            <td>{item.livre}</td>
                                            <td>{item.locataire}</td>
                                            <td>{item.dateLocation}</td>
                                            <td>{item.dateLimit}</td>
                                            <td>
                                                <AiOutlineDelete onClick={()=>{deleteLoc(id,lid)}}/>
                                            </td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;