import React,{useState,useEffect} from 'react';
import axios from 'axios'
import {FaSearch} from 'react-icons/fa'
import Popup from './Popup';
import {AiFillDelete,AiFillEdit,AiFillAlert} from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom';

const Liste = () => {
    const [livres,setLivres] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [search,setSearch] = useState('')


    const navigate = useNavigate() 

    const fetchAllBooks = () =>{
        axios.get(`http://localhost:8080/api/livres/${cat}`).then((res)=>{
            setLivres(res.data)
        })
    }
    
    const cat = useLocation().search
    
    var item = livres.find(livre => livre.id === selectedId)

    useEffect(() => {
        fetchAllBooks()
    }, [cat]);

    const [popup,setPopup] = useState(false)

    const openPopup = (id) =>{
        setSelectedId(id);
        setPopup(true)
    }
    const deleteBook = (id) =>{
        axios.delete(`http://localhost:8080/api/livres/delete/${id}`)
        setTimeout(()=>window.location.reload(),500)
    }


    const edithBook = (id) =>{
        //
    }

    const getLivres = () =>{
        if(!livres) return <p style={{fontSize:'1.3rem'}}>Loading...</p>

        const filtered = livres.filter((livre)=>{
            if(search === '' || livre.title.toLocaleLowerCase().includes(
                search.toLocaleLowerCase()) ||
                livre.category.toLocaleLowerCase().includes(
                    search.toLocaleLowerCase()
                )){
                    return livre
                }
        })
        if(!filtered.length){
            return <p style={{fontSize:'1.3rem',color:'#ce0b46'}}>Aucun résultat.</p>
        }
        return <>
            {
            filtered.map((livre,index)=>{
                var bookState = livre.state
                return(
                    <div className="content" key={index}>
                        <p className='tbook'>{livre.title}</p>
                        <p className='cbook'>{livre.category}</p>
                        <img src={`./upload/${livre.image}`} alt="image" />
                        <p style={{padding:'10px'}}>Etat : <span className={bookState===1?'dispo':'ndispo'}>
                            {bookState === 1 ? 'disponible' : 'insdisponible'}</span>
                        </p>

                        <div style={{display:'flex',gap:'5px'}}>
                            <button onClick={()=>{navigate(`/update/${livre.id}`)}} style={{background:'#0b5383'}}><AiFillEdit/></button>
                            {bookState === 1 ? 
                            <button onClick={()=>{openPopup(livre.id)}} style={{background:'#49b3fa'}}>Louer</button> : ''}
                            <button onClick={()=>{deleteBook(livre.id)}} style={{background:'#ce0b46'}}><AiFillDelete/></button>
                        </div>
                    </div>
                )
            })
        }
        </>
    }
    return (
        <div className='livre'>
            <p className='title'>Livres disponibles</p>
            <div className="search">
                <input type="text" placeholder='Mot clé' onChange={(e)=>{setSearch(e.target.value)}}/>
                <button><FaSearch/></button>
            </div>
            <div className="container">
                {
                    getLivres()
                }
                {
                    popup ? <Popup setPopup={setPopup} title={item.title} bookState={item.state} popId={item.id}/> : ''
                }
            </div>
        </div>
    );
};

export default Liste;