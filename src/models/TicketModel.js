import mongoose, {Schema,model } from "mongoose";

const ticketSchema = new Schema(
    {
        customerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Client"
        },
        email:{
            type:String
        },
        password:{
            type:String
        },
        isVerified:{
            type:String
        },
        loginAttempts:{
            type:String
        },
        timeOut:{
            type: String
        },
    },
    {
        timestamps:true,
        strict:false,
    },
);
export default model ("Ticket",ticketSchema);