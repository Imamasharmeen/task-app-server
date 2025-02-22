const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: ["http://localhost:5173", "https://singular-crumble-3496ac.netlify.app"] } });

app.use(cors({ origin: ["http://localhost:5173", "https://singular-crumble-3496ac.netlify.app"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s6qv7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });

async function run() {
  try {
    const database = client.db("task-managementDB");
    const userCollection = database.collection("users");
    const taskCollection = database.collection("tasks");

    // Ensure Indexing for Performance
    await userCollection.createIndex({ email: 1 }, { unique: true });
    await taskCollection.createIndex({ _id: 1 });

    // User Registration
  
}
run().catch(console.dir);

app.get("/", (req, res) => res.send("Hello Task Management"));

server.listen(port, () => console.log(`Server running on port ${port}`));
