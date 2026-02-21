const express = require("express");
const session = require("express-session");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes');


const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
