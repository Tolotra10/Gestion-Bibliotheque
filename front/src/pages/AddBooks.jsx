import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Swal from "sweetalert2"
import { Link, useParams } from 'react-router-dom';
import Admin from './Admin';

const AddBooks = () => {

 
    const [title,setTitle] = useState('')
    const [category,setCategory] = useState('')
    const [cat,setCat] = useState('')
    const [file,setFile] = useState('')
    const {id} = useParams()

    const handleInputChange = (e) =>{
        setFile(e.target.files[0])
    }

    const upload = async() =>{
        try {
            const formdata = new FormData()
            formdata.append('file',file)
            const res = await axios.post('http://localhost:8080/api/upload',formdata)
            return res.data
        } catch (error) {
            console.log(error);
        }
       }

    const addBook = async (e) => {
        const imgUrl = await upload()
        e.preventDefault()
        await axios.post("http://localhost:8080/api/livres", {
        title:title,
        category:category,
        image:file ? imgUrl : "",
        cat:cat

        }).then(
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Livre ajouté avec success',
            showConfirmButton: false,
            timer: 2500
          })
        )
        setTimeout(()=>{
          window.location.reload()
        },500)
      };

      useEffect(()=>{
        axios.get(`http://localhost:8080/api/livres/${id}`).then((res)=>{
            setTitle(res.data.title)
        })
      },[id])

    return (
        <div className='box'>
          <p className="title">Administrateur</p>
          
          <div className="container">
          <Admin/>
            <div className="content" style={{marginLeft:'150px'}}>
              <p style={{color:"#0b5383",marginBottom:'1rem',fontSize:'1.3rem'}}>Ajouter un livre</p>
              <input type="text" placeholder='Nom' onChange={(e)=>{setTitle(e.target.value)}}/><br/>
              <input type="text" placeholder='Category' onChange={(e)=>{setCategory(e.target.value)}}/><br/>
              <input type="file" onChange={handleInputChange}/><br/>
              <select value={cat} onChange={(e)=>{setCat(e.target.value)}}>
                <option>Choisir category</option>
                <option value="history">history</option>
                <option value="roman">roman</option>
                <option value="bandeD">bandeD</option>
                <option value="tech">tech</option>
              </select><br />
              <button onClick={addBook}>Ajouter</button>
              <Link to='/'><p>Retour</p></Link>
              </div>
          </div>
    </div>
    );
};

export default AddBooks;