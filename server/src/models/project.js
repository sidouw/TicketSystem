const {Schema,model,ObjectId} = require('mongoose');
/************************** Project  Schema **************************/

const ProjectSchema = new Schema({
    name:{
        type:String, 
        required:true,
        unique :true
    },
    description :{
        type:String, 
        required:true
    },
    users:[{
        type:ObjectId,
        required : true,
        ref:'user'
    }]
},{
    timestamps:true
}
);
const Project = model("project", ProjectSchema);
module.exports = Project;