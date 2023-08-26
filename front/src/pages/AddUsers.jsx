import React,{useState,useEffect} from 'react';
import Admin from './Admin';
import axios from 'axios';
import Swal from 'sweetalert2'
import {AiOutlineDelete,AiFillEdit} from 'react-icons/ai'

const AddUsers = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [users,setUsers] = useState([])
    
    const addUser = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/api/users", {
            name:name,
            email:email,

        }).then(
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Lecteur ajouté avec success',
            showConfirmButton: false,
            timer: 2500
          }),
          setName(''),
          setEmail('')
        )

        setTimeout(()=>
        window.location.reload(),2500)
      };

    const fetchAllUsers = () =>{
        axios.get('http://localhost:8080/api/users').then((res)=>{
            setUsers(res.data)
        })
    } 
    useEffect(()=>{
        fetchAllUsers()
    },[])

    const deleteUser = (id) =>{
        axios.delete(`http://localhost:8080/api/users/${id}`)
        setTimeout(()=>window.location.reload(),500)
    }
        return (
        <div className='box'>
            <p className='title'>Administrateur</p>
            <div className="container">
                <Admin/>
                <div style={{display:"flex",justifyContent:'space-around'}}>
                    <div className="content">
                        <p style={{color:"#0b5383",marginBottom:'1rem',fontSize:'1.3rem'}}>Ajouter un lecteur</p><br />
                        <input type="text" placeholder='Nom du lecteur' onChange={(e)=>{setName(e.target.value)}}/><br/>
                        <input type="email" placeholder='Adresse mail' onChange={(e)=>{setEmail(e.target.value)}}/><br/>
                        <button onClick={addUser}>Ajouter</button>
                    </div>
                    <div className="content">
                        <p style={{color:"#0b5383",marginBottom:'1.5rem',fontSize:'1.3rem'}}>Liste des lecteurs</p>
                        {
                            users.map((user,index)=>{
                                return(
                                    <div key={index} style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:"10px"}}>
                                        <p style={{fontSize:"1.2rem"}}>{user.name}</p>
                                        <AiOutlineDelete style={{color:'#ce0b46'}} onClick={()=>deleteUser(user.id)}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUsers;