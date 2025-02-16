// import mongoose from "mongoose";
// import AutoIncrement from "mongoose-sequence"; // Import the plugin

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     age: { type: Number, required: true },
//     college: { type: String, required: true }
// });

// // Apply auto-increment plugin
// userSchema.plugin(AutoIncrement(mongoose), { inc_field: "id" });

// const User = mongoose.model("User", userSchema);

// export default User;


import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    college : {
        type : String,
        required : true
    }
})
userSchema.plugin(AutoIncrement(mongoose),{inc_field : "id"})
const User = mongoose.model('User',userSchema);

export default User;