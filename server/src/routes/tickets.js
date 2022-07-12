const express = require('express')
const router = express.Router()
const Ticket = require('../models/ticket')
const {auth,developer,admin} = require('../utils/auth')


const clearPasswords = async (tickets)=>new Promise((resole,reject)=>{
    tickets.forEach(ticket=>{
        ticket.developer = {username:ticket.developer?.username,_id:ticket.developer?._id}
        ticket.submiter = {username:ticket.submiter?.username,_id:ticket.submiter?._id}
    })
    resole()
})

// Create Ticket
router.post('/tickets',auth,async (req,res)=>{

    try {
        const ticket = new Ticket({...req.body,submiter:req.user._id})
        await ticket.save()
        res.status(201).send(ticket)
    } catch (error) {
        res.status(400).send(error)
    }
})

// Edit Ticket
router.patch('/tickets',auth,developer,async(req,res)=>{
    const allowedupdates = ['title','description','priority','status','type','_id']
    const updates = Object.keys(req.body)
    const isValid = updates.every(update=> allowedupdates.includes(update))
    if(!isValid){
        return res.status(400).send()
    }

    try {
        const ticket = await Ticket.findById(req.body._id)
        
        if (!ticket) {
            return res.status(400).send()
        }
        updates.forEach((update)=>ticket[update]= req.body[update])
        await ticket.save()
        res.send(ticket)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tickets/assign',auth,admin,async(req,res)=>{
    try {
        const update = await Ticket.updateMany(
            { _id: { $in: req.body.tickets} },
            { $set: { developer:req.body.developer } },
            {multi: true}
         )
         res.send(update.acknowledged)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Delete Ticket  Not Working
router.delete('/tickets',auth,admin,async (req,res)=>{
    try {
        await Ticket.deleteOne({ _id: req.body._id })
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// Find ticket by ID


router.get('/tickets/project/:id',auth,async (req,res)=>{
    try {
        const ticket =await Ticket.find({project:req.params.id}).populate('submiter')
        clearPasswords(ticket)
        if(! ticket){
            return  res.status(400).send({error:'Ticket Not Found'})
        }
        res.send(ticket)
    } catch (error) {
        res.status(400).send({error})
    }

})

// Find all tickets 
router.get('/tickets',auth,async (req,res)=>{
    
    try {
        const tickets =await Ticket.find().populate('project').populate('developer')
        await clearPasswords(tickets)
        if(! tickets){
            return  res.status(400).send({error:'Ticket Not Found'})
        }
        res.send(tickets)
    } catch (error) {
        res.status(400).send({error})
    }
})
// Find Unassigned
router.get('/tickets/unassigned',auth,developer,async (req,res)=>{
    try {
        const tickets =await Ticket.find({developer:{$exists: false}}).populate('project')
        if(! tickets){
            return  res.status(400).send({error:'Ticket Not Found'})
        }
        res.send(tickets)
    } catch (error) {
        res.status(400).send({error})
    }
})

// Find user
router.get('/tickets/user',auth,async (req,res)=>{
    try {
        const tickets =
        req.user.role<=1 ?
            await Ticket.find({developer:req.user._id}).populate('project').populate('developer')
            :
            await Ticket.find({submiter:req.user._id}).populate('project').populate('developer')

        await clearPasswords(tickets)
        
        if(! tickets){
            return  res.status(400).send({error:'Ticket Not Found'})
        }
        res.send(tickets)
    } catch (error) {
        res.status(400).send({error})
    }
})

router.get('/tickets/:id',auth,async (req,res)=>{
    try {
        const ticket =await Ticket.findOne({_id:req.params.id}).populate('developer').populate('submiter').populate('project')
        ticket.developer = {username:ticket.developer?.username,_id:ticket.developer?._id}
        ticket.submiter = {username:ticket.submiter?.username,_id:ticket.submiter?._id}
        ticket.project = {name:ticket.project?.name,_id:ticket.project?._id}

        if(! ticket){
            return  res.status(400).send({error:'Ticket Not Found'})
        }
        res.send(ticket)
    } catch (error) {
        res.status(400).send({error})
    }

})
module.exports = router