import express from "express";
import testModel from "./models/Test";

const app = express();

app.get("/api/test", async (req, res) => {
        const test = await testModel.create({text: "abced"})

        res.json(test);
})


app.listen(3001, () => {
    console.log("Server is listening to port 3001")
})