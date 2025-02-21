import express from 'express';
import cors from 'cors';
import clientRoutes from "./routes/clientRoutes.js"

const app = express();
const port = 4000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

app.use('/api', clientRoutes);

app.listen(port, () => {
    console.log("Listening on port "+port)
});