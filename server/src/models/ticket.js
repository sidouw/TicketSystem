const {Schema,model,ObjectId} = require('mongoose');
/************************** Ticket Schema **************************/

const ticketSchema = new Schema({
    title: {
        type:String,
        required : true
    },
    submiter :{
        type:ObjectId,
        required:true,
        ref:'user'
    },
    developer :{
        type:ObjectId,
        ref:'user'
    },
    description :{
        type:String
    },
    project :{
        type:ObjectId,
        required:true,
        ref:'project'
    },
    priority:{
        type:Number,
        default :0
    },
    status:{
        type:Number,
        default:0
    },
    type:{
        type:Number,
        default:0
    }
},{
    timestamps:true
}
);

const Ticket = model("ticket", ticketSchema);
module.exports = Ticket;