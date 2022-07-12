const {connect} = require('mongoose')



connect(process.env.DATABASE_URL)
.then(()=>{
    console.log('conected to db')
}).catch(()=>{
    console.log('Failed To connect to db on ',process.env.DATABASE_URL)
})