import express from "express";
import cors  from "cors";
import connectToDatabase from "./config/db.js";
import dotenv from 'dotenv';
import router from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use('/api', router);
connectToDatabase();

const PORT = process.env.PORT || 3000;
app.use(cors({ origin: `${process.env.ORIGIN}` }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});