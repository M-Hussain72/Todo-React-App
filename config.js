import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();
export const PORT = process.env.PORT || 5555;

export const mongoDBURL ='mongodb+srv://hussain:mh6302288@cluster0.ti747.mongodb.net/?retryWrites=true&w=majority'
// process.env.MONGO_DB_URL;
console.log(mongoDBURL);
