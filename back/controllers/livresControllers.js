import {db} from '../db.js'

export const getLivres = (req,res) =>{
    const q = req.query.cat
    ? "SELECT * FROM livres WHERE cat=?"
    : "SELECT * FROM livres"

    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.send(err)

        return res.status(200).json(data)
    })
}
export const getLivre = (req,res) =>{
    const id = req.params.id
    const q = "SELECT * FROM livres WHERE id = ?"

    db.query(q,id,(err,data)=>{
        if(err) return res.send(err)

        return res.status(200).json(data[0])
    })
    
}
export const postLivre = (req,res) =>{
    const q = "INSERT INTO livres(`title`,`category`,`image`,`cat`) VALUES (?)"

    const values = [
        req.body.title,
        req.body.category,
        req.body.image,
        req.body.cat,
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.send(err)

        return res.json('Post success')
    })
}
export const deleteLivre = (req,res) =>{
    const id = req.params.id
    const q = 'DELETE FROM livres WHERE id = ?'

    db.query(q,id,(result,error)=>{
        if(error){
            console.log(error);
        }
    })
}

export const makezero = (req,res) =>{
    const id = req.params.id
    const q = 'UPDATE livres SET state = 0 WHERE id = ?'

    db.query(q,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    })
}
export const makeone = (req,res) =>{
    const id = req.params.id
    const state = '1'
    const q = 'UPDATE livres SET state = ? WHERE id = ?'

    db.query(q,[state,id],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
}
export const updateLivre = (req,res) =>{
    const id = req.params.id
    const {title,category,image,cat} = req.body
    const q = 'UPDATE livres SET title = ? ,category = ? ,image = ? ,cat = ? WHERE id = ?'

    db.query(q,[title,category,image,cat,id],(error,result)=>{
        if(error){
            console.log(error);
        }
    })
}