const {Schema,model} = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
/************************** User Schema **************************/

const userSchema = new Schema({
    username:{
        type:String, 
        required:true,
        unique :true
    },
    email :{
        type:String, 
        required:true,
    }
    ,
    password:{
        type:String,
        required:true
    },
    role : {
        type:Number,
        default : 0
    },
    tokens : [{
        type:String,
        required:true
    }],
},{
    timestamps:true
}
);

userSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.genAuthToken =async function(){
    try {
        const token = jwt.sign({id:this._id.toString()},process.env.SECRET)
        this.tokens.push(token)
        await this.save()
        return token
    } catch (error) {
        throw Error(error)
    }
}

userSchema.statics.findByCred = async (username,password)=>{
    try {
        const user =await User.findOne({username})
    if(! user){
        throw new Error('Unable to login')
    }
    const isAMatch = await bcrypt.compare(password,user.password)
    if (! isAMatch) {
        throw new Error('Unable to login')
    }
    return user
    } catch (error) {
        throw Error(error)
    }
}

userSchema.pre('save',async function (next) {
    if(this.isModified('password')){
        try {
            this.password = await bcrypt.hash(this.password,8)
            next()
        } catch (error) {
            next()
        }
    }
    
})
const User = model("user", userSchema);
module.exports = User;