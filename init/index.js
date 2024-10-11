const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");
main()
.then((res)=>{
    // console.log(res);
    console.log("connection successful");
}
)
.catch((err)=>console.log(err));
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
};
const initDB =async () =>{
await listing.deleteMany({});
initdata.data = initdata.data.map((obj)=>({...obj, owner: "66f031f1551c173f16cdce22"}));
await listing.insertMany(initdata.data)
};
initDB();
