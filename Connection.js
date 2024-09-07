
const monggose = require("mongoose")

async function connectToDatabseFun(url)
{
    monggose.connect(url).then(()=>{
        console.log("Connected to database")
    }).catch(()=>{
        console.log("Issue appreaed")
    })
} 

module.exports = {
    connectToDatabseFun
}