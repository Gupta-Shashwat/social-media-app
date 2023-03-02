import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));

const CONNECTION_URL = "mongodb+srv://shashwatgupta:admin@cluster0.n7xnkik.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`)))
    .catch((err) => console.log(err.message));