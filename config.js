import dotenv from "dotenv";
dotenv.config()

export const config ={
    db:{
        uri:process.env.DB_URI
    },
    jwt:{
        secret:process.env.JWT_SECRET_KEY
    },
    email:{
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD
    },
};