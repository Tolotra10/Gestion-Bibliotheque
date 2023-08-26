import {db} from '../db.js'

export const getLocations = (req,res) =>{

    db.query("SELECT * FROM location",(err,data)=>{
        if(err) return res.send(err)

        return res.status(200).json(data)
    })
}
// export const getLocation = (req,res) =>{
//     const q = "SELECT `locataire`,`livre`,`dateLocation`,`dateLimit` FROM location p WHERE p.id=?"

//     db.query(q,[req.params.id],(err,data)=>{
//         if(err) return res.send(err)

//         return res.status(200).json(data[0])
//     })
    
// }
export const postLocation = (req,res) =>{
    const date = new Date();
    const q = "INSERT INTO location(`locataire`,`livre`,`dateLocation`,`dateLimit`,`lid`) VALUES (?)"

    const values = [
        req.body.locataire,
        req.body.livre,
        date,
        req.body.dateLimit,
        req.body.lid
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.send(err)

        return res.json('Post success')
    })
}
export const deleteLocation = (req,res) =>{
    const id = req.params.id
    const q = 'DELETE FROM location WHERE id = ?'

    db.query(q,id,(result,error)=>{
        if(error){
            console.log(error);
        }
    })
}

export const updatedLocationState = (req,res) =>{
    const id = req.params.id
    const q = 'UPDATE livres SET state = 1 WHERE id = ?'

    db.query(q,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })
}