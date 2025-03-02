import express from 'express';
import dotenv from 'dotenv';
import mainrouter from './routes/mainrouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api", mainrouter);


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});