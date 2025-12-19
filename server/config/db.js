const mongoose = require('mongoose')

const setDB_Connection = async()=>{
 await mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DataBase Connected")
}).catch((error)=>{
    console.log("Error"+String(error))
}) 
}
module.exports = setDB_Connection