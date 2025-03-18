import mongoose from "mongoose"

  export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://gender:gendernyabiba@cluster0.gjdwm.mongodb.net/gender').then(()=>console.log("DB Connected"));

}







