const express = require('express')
const router = express.Router()
const {Types} = require('mongoose')
const Comment = require('../models/comment')
const {auth} = require('../utils/auth')

const trimUserData = async (comments)=>new Promise((resole,reject)=>{
    comments.forEach(comment=>{
        comment.user = {username:comment.user?.username,_id:comment.user?._id,role:comment.user?.role}
    })
    resole()
})

// Create Comment
router.post('/comments',auth,async (req,res)=>{
    
    try {
        const comment = new Comment(req.body)
        await comment.save()
        
        res.status(201).send(comment)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

// Edit Comment Not Working
router.patch('/comments',auth,async(req,res)=>{
    const allowedupdates = ['name','description','users','_id']
    const updates = Object.keys(req.body)
    const isValid = updates.every(update=> allowedupdates.includes(update))
    if(!isValid){
        return res.status(400).send()
    }
    try {
        const comment = await Comment.findById(req.body._id)
        if (!comment) {
            return res.status(400).send()
        }

        updates.forEach((update)=>comment[update]= req.body[update])
        
        await comment.save()

        res.send(comment)
    } catch (error) {
        res.status(500).send()
    }
})



// Delete Comment
router.delete('/comments',auth,async (req,res)=>{
    try {
        await Comment.deleteOne({ _id: req.body._id })
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// Find comment by ID
router.get('/comments/:id',auth,async (req,res)=>{

    const skip = Math.max(req.query.skip ? parseInt(req.query.skip) : 0,0) 
    const limit =Math.min(req.query.limit ? parseInt(req.query.limit) : 10,10)
    
    try {
        const comment =await Comment.find({ticket:req.params.id}).sort({createdAt:-1}).skip(skip).limit(limit).populate("user")

        await trimUserData(comment)
        if(! comment){
            return  res.status(400).send({error:'Comment Not Found'})
        }
        res.send(comment)
    } catch (error) {
        console.log(error);
        res.status(400).send({error})
    }

})

// Find all comments 
router.get('/comments',auth,async (req,res)=>{
    try {
        const comment =await Comment.find()
        if(! comment){
            return  res.status(400).send({error:'Comment Not Found'})
        }
        res.send(comment)
    } catch (error) {
        res.status(400).send({error})
    }
})


module.exports = router