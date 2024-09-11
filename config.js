import dotenv from 'dotenv';

// Load the environment variables from the .env file
dotenv.config();
export const PORT = process.env.PORT || 5555;

export const mongoDBURL = process.env.REACT_APP_API_KEY;
