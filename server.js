const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRoute");
const groupRoute = require('./Routes/groupRoute');
const groupMarks = require('./Routes/marksRoute');
const groupTask = require('./Routes/taskRoute');

const cors = require("cors");


const app = express();
const PORT = 5000;
app.use(
  cors({
    origin: ["https://collabortive-project.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/groups', groupRoute);
app.use('/api/groupmarks', groupMarks);
app.use('/api/taskboard', groupTask);


mongoose.connect("mongodb+srv://Abdulkareem:Miniclip18@cluster0.xehpn.mongodb.net/danishFYP", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));



app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
