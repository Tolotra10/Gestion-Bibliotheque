import axios from 'axios'
import { useState,useEffect } from 'react';
import Swal from "sweetalert2"
import {AiFillCloseCircle} from 'react-icons/ai'

const Popup = ({setPopup,title,popId}) => {
    const [lect,setLect] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [date,setDate] = useState('')

    const handleDateChange = (e) =>{
        setDate(e.target.value)
    }
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
      };
    const closePop = () =>{
        setPopup(false)
    }
    const fetchAllLect = () =>{
        axios.get('http://localhost:8080/api/users').then((res)=>{
            setLect(res.data)
        })
    }

    const handleStateChange = async(id) =>{
        await axios.put(`http://localhost:8080/api/livres/unavailable/${id}`)
    }
    const reloadPage = () =>{
        setPopup(false)
        window.location.reload()
    }
    
    const addLoc = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/api/location", {
            locataire:selectedOption,
            livre:title,
            dateLimit:date,
            lid:popId
        }).then(
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Location ajouté avec success',
            showConfirmButton: false,
            timer: 2500
          })
        )
        handleStateChange(popId)
        setTimeout(()=>reloadPage(),2500)
      };
    useEffect(() => {
        fetchAllLect()
    }, []);


    return (
        <div className='popup'>
           <div className="container">
            <button onClick={closePop}><AiFillCloseCircle/></button>
                <p className='livre'>{title}</p>
                <p>Insérer le locataire !</p>
                <select value={selectedOption} onChange={handleSelectChange}>
                    <option>Choisir</option>
                    {
                        lect.map((item,index)=>{
                            return(
                                <option key={index} value={item.name}>{item.name}</option>
                            )
                        })
                    }
                </select>
                <p>A rendre le</p>
                <input type="date" className='calendar' onChange={handleDateChange}/>

                <input type="button" value="Valider" className='validate' onClick={addLoc}/>
           </div>
        </div>
    );
};

export default Popup;