import express from "express";

const app = express();

app.get("/test", (req, res) => {
    res.json("This is only for testing");
})

app.listen(3001, () => {
    console.log("Server is listening to port 3001")
})