const express = require("express");
require("express")
const path = require("path");
const app = express();
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const authRoutes = require("./routes/auth/auth.js");
const todosRoutes = require("./routes/todos/todos.js");
const notFound = require("./middleware/notfound.js");


const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use('/', authRoutes);
app.use('/register', authRoutes);
app.use('/login', authRoutes);
app.use('/todos', todosRoutes);

app.use(notFound);



app.listen(process.env.PORT, () => console.log("Serveur lancé sur http://localhost:",process.env.PORT));
