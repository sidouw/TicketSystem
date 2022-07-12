const express = require('express')
const router = express.Router()
const Project = require('../models/project')
const {auth,developer,admin} = require('../utils/auth')


// Create Project
router.post('/projects',auth,admin,async (req,res)=>{

    try {
        const project = new Project(req.body)
        await project.save()
        res.status(201).send(project)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Edit Project 
router.patch('/projects',auth,developer,async(req,res)=>{
    const allowedupdates = ['name','description','users','_id']
    const updates = Object.keys(req.body)
    const isValid = updates.every(update=> allowedupdates.includes(update))
    if(!isValid){
        return res.status(400).send()
    }
    try {
        const project = await Project.findById(req.body._id)
        if (!project) {
            return res.status(400).send()
        }

        updates.forEach((update)=>project[update]= req.body[update])
        
        await project.save()

        res.send(project)
    } catch (error) {
        res.status(500).send()
    }
})

// add edit users
router.patch('/projectsU',auth,admin,async(req,res)=>{
    try {

       await Project.findOneAndUpdate(
            { _id: req.body.Project },
            {  "$addToSet": {
                users: {
                  "$each":req.body.selectedUsers
                }
              }},
             )
        res.send()
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// get Project users
router.get('/projectsU/:id',auth,async(req,res)=>{
    try {

        const project = await Project.findById(req.params.id).populate('users')
        if(! project){
            return  res.status(400).send({error:'Project Not Found'})
        }
        res.send(project)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// remove Project users
router.delete('/projectsU',auth,admin,async(req,res)=>{
    try {

       await Project.findOneAndUpdate(
            { _id: req.body.Project },
            {  "$pullAll": {
                users:req.body.selectedUsers
              }},
             )
        res.send()
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// Delete Project 
router.delete('/projects',auth,admin,async (req,res)=>{
    try {
        await Project.deleteOne({ _id: req.body._id })
        // TODO Delete all project tickets and ticket comments
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// Find project by ID
router.get('/projects/:id',auth,async (req,res)=>{
    try {
        const project =await Project.findOne({_id:req.params.id}).populate("users")
        if(! project){
            return  res.status(400).send({error:'Project Not Found'})
        }
        res.send(project)
    } catch (error) {
        res.status(400).send({error})
    }

})

// Find all projects 
router.get('/projects',auth,async (req,res)=>{
    try {
        const project =await Project.find()
        if(! project){
            return  res.status(400).send({error:'Project Not Found'})
        }
        res.send(project)
    } catch (error) {
        res.status(400).send({error})
    }
})


module.exports = router