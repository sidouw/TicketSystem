const express = require('express')
const fs = require('fs')
const router = express.Router()
const User = require('../models/user')
const {auth,developer,admin} = require('../utils/auth')
const path = require("path")

// Login
router.post('/users/login',async (req,res)=>{
    
    try {
        const user = await User.findByCred(req.body.username,req.body.password)
        const token = await user.genAuthToken()
        res.status(200).send({user,token})
    } catch (error) {
        res.status(400).send({error:'Wrong Username or Password'})
    }
})

// Logout 
router.get('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens =req.user.tokens.filter((token)=> req.token !== token)
        await req.user.save()
        res.status(200).send({user:req.user})
    } catch (error) {
        res.status(400).send({error})
    }
})

// check auth
router.get('/users/auth',auth,(req,res)=>{
    res.send(req.user)
})

// Create User
router.post('/users/signup',async (req,res)=>{

    try {
        const user = new User(req.body)
        user.role = 2
        await user.save()
        const token = await user.genAuthToken()
        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send({error:'User name already in use'})
    }
})

// Edit User
router.patch('/users',auth,admin,async(req,res)=>{
    const allowedupdates = ['username','password','state']
    
    const updates = Object.keys(req.body)
    const isValid = updates.every(update=> allowedupdates.includes(update))
    if(!isValid){
        
        return res.status(400).send()
    }
    try {

        updates.forEach((update)=>req.user[update]= req.body[update])

        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

// Delete User 
router.delete('/users',auth,admin,async (req,res)=>{
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(400).send()
    }
})

// Edit Users
router.patch('/usersm',auth,admin,async(req,res)=>{

    try {
        const update = await User.updateMany(
            { _id: { $in: req.body.selectedUsers} },
            { $set: { role:req.body.role } },
            {multi: true}
         )
         res.send(update.acknowledged)
    } catch (error) {
        res.status(500).send(error)
    }
    
     
})
// Delete Users
router.delete('/usersm',auth,admin,async(req,res)=>{

    try {
        const update = await User.deleteMany(
            { _id: { $in: req.body.selectedUsers} }
         )
         res.send(update.acknowledged)
    } catch (error) {
        res.status(500).send(error)
    }
    
})


// Find user by ID
router.get('/users/:id',auth,async (req,res)=>{
    try {
        const user =await User.findOne({_id:req.params.id})
        if(! user){
            return  res.status(400).send({error:'User Not Found'})
        }
        res.send(user)
    } catch (error) {
        res.status(400).send({error})
    }

})

// Find all users 
router.get('/users',auth,async (req,res)=>{
    try {
        const users =await User.find()
        if(! users){
            return  res.status(400).send({error:'no user found'})
        }
        res.send(users)
    } catch (error) {
        res.status(400).send({error})
    }

})

// Upload User Image 
router.post('/users/image',auth,async (req,res)=>{
    try {
        const img = req.body.image
        var data = img.replace(/^data:image\/\w+;base64,/, "")
        var buf = Buffer.from(data, 'base64')
        fs.writeFileSync(path.join(path.dirname(__dirname),'public','images',req.user._id+'.jpg'),buf)
        req.user.photo_url = true
        await req.user.save()
        res.send()
    } catch (error) {
        console.log(error);
        res.status(400).send()
    }
})

// Get User Image
router.get('/users/image',(req,res)=>{
    res.sendFile(path.join(path.dirname(__dirname),'public','images',req.query.img+'.jpg'))
})

module.exports = router