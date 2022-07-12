const {Schema,model,ObjectId} = require('mongoose');
/************************** Comment  Schema **************************/

const CommentSchema = new Schema({
    ticket:{
        type:ObjectId,
        required : true,
        ref:'ticket'
    },
    content :{
        type:String, 
        required:true,
    }
    ,
    user:{
        type:ObjectId,
        required : true,
        ref:'user'
    }
},{
    timestamps:true
}
);
const Comment = model("comment", CommentSchema);
module.exports = Comment;
