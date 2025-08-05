import mongoose from "mongoose"

  
  export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://nyabibakim:kim45nyabiba@cluster0.1b4ldg7.mongodb.net').then(()=>console.log("DB Connected"));

}







