import { GoogleGenAI } from "@google/genai";    // Import Google GenAI library for AI model interactions
//import dotenv from "dotenv";
import "dotenv/config";    // Load environment variables from .env file
import express from "express";   // Import Express.js for building web applications
import cors from "cors";    // Import CORS middleware for enabling Cross-Origin Resource Sharing
import multer from "multer";    // Import Multer for handling multipart/form-data, used for file uploads
//dotenv.config();

//initialize express app
const app = express();      // Create an instance of an Express application
app.use(cors());    // Enable CORS(Cross-Origin resource sharing) for all routes
app.use(express.json());    // Parse JSON request bodies/membolehkan req dengan Content-type application/json


const ai = new GoogleGenAI({});

// tambah route untuk menerima permintaan POST
app.post('/chat', async(req,res) => {
    // Check if the request body is empty
    if (!req.body) {       
        return res.status(400).send("Request body is empty");
    }

    const {prompt} = req.body;    // Destructure the 'prompt' property from the request body
    if (!prompt) {      // Check if 'prompt' is not provided
        return res.status(400).send("Prompt is required");    // Check if 'prompt' is provided, if not, send a 400 Bad Request response
    }

    try {
        // Generate content using the AI model
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",    // Specify the AI model to use
            contents: prompt,    // Use the 'prompt' from the request body as input
        });
        res.json(response);    // Send the AI response back to the client in JSON format
    } catch (error) {
        console.error("Error generating content:", error);    // Log any errors that occur during content generation
        res.status(500).send("Internal Server Error");    // Send a 500 Internal Server Error response if an error occurs
    }

});

/*async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();*/

app.listen(3000, () => {    // Start the Express server on port 3000
    console.log("Server is running on port 3000");    // Log a message indicating the server is running
});