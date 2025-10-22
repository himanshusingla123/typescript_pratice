import express, { type Request, type Response } from "express";
import {z} from "zod";

const PingResponseSchema = z.object({
    message: z.string(),
    timestamp: z.string(),
});

type PingResponse = z.infer<typeof PingResponseSchema>;

const app = express()
const PORT = 3000;

app.get("/ping",(req:Request, res: Response<PingResponse>)=>
{
    const response:PingResponse = {
        message:"pong",
        timestamp: new Date().toISOString(),
    };

    PingResponseSchema.parse(response);

    res.json(response)
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});