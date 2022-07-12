const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req,res,next)=>{

    try {
        const token = req.header('Authorization').replace('Bearer ','')
        // const token = req.cookies.token
        const decoded = jwt.verify(String(token),process.env.SECRET)
        const user =await User.findOne({_id:decoded.id,tokens:token})
        
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user=user
        next()
    } catch (error) {        
        res.status(401).send({error:'Please authenticate'})
    }

}

const admin = async (req,res,next)=>{
    if(req.user.role<=0) {
        next()
    } else{        
        res.status(401).send({error:'Unauthorized'})
    }
}

const developer = async (req,res,next)=>{
    if(req.user.role<=2) {
        next()
    } else{        
        res.status(401).send({error:'Unauthorized'})
    }
}


module.exports = {auth,admin,developer}