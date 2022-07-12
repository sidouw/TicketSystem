const {Schema,model,ObjectId} = require('mongoose');
/************************** History  Schema **************************/

const HistorySchema = new Schema({
    ticket:{
        type:ObjectId,
        required : true,
        ref:'ticket'
    },
    proprety :{
        type:String, 
        required:true
    },
    old:{
        type:String,
        required : true
    },
    new:{
        type:String,
        required : true
    },
},{
    timestamps:true
}
);
const History = model("history", HistorySchema);
module.exports = History;