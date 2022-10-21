import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/userRoute.js"

const port = process.env.PORT || 5000;

const app = express();

//Midddleware
app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: "true"}))
app.use(express.urlencoded({limit: "30mb", extended: "true"}))
app.use(cors())

app.use("/api/user", userRouter); //http://localhost:5000/api/user/signup

//DB-URL
const MONGODB_URL = "mongodb+srv://Rico:Nightg007@cluster0.ujpbbgr.mongodb.net/tour_db?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
//DB Connection

console.log(mongoose.connection.readyState);

console.log

app.get('/', (req, res)=> {
    res.send("Hello Express");
});

app.listen(port, () => console.log(`Listening on locahost: ${port}`));