import mongoose from 'mongoose';
const dbConnection = async()=>{
     try {
          // await mongoose.connect('mongodb://127.0.0.1:27017/rest')
          await mongoose.connect('mongodb://127.0.0.1:27017/rest')
          console.log('DB connected')
     } catch (error) {
         console.log(error.message);
         
     }
}
export default dbConnection