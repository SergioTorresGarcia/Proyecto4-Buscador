import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json()); // parsea las req a json


const PORT = process.env.PORT || 4000

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello world!')
});

app.get("/healthy", (req, res) => {
    res.status(200).json(
        {
            "success": true,
            "message": "Server is healthy"
        }
    )
});




app.listen(PORT, () => {
    console.log("Server is running");

})