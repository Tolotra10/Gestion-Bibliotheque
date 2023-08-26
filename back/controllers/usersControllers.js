import {db} from '../db.js'

export const getUsers = (req,res) =>{
    

    db.query("SELECT * FROM users",(err,data)=>{
        if(err) return res.send(err)

        return res.status(200).json(data)
    })
}
export const postUser = (req,res) =>{
    const q = "INSERT INTO users(`name`,`email`) VALUES (?)"

    const values = [
        req.body.name,
        req.body.email
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.send(err)

        return res.json('Post success')
    })
}
export const deleteUser = (req,res) =>{
    const id = req.params.id
    const q = 'DELETE FROM users WHERE id = ?'

    db.query(q,id,(result,error)=>{
        if(error){
            console.log(error);
        }
    })
}
export const updateUser = (req,res) =>{
    res.json('user updated')
}