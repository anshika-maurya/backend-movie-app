import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";


dotenv.config();

const app = express();



app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);


app.get("/", (req, res) => {
  res.send("API running...");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.log(err);
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.get("/api/tmdb/trending", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_KEY}`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "TMDB fetch failed" });
  }
});

app.get("/api/tmdb", async (req, res) => {
  try {

    const endpoint = req.query.endpoint;

    const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.TMDB_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "TMDB fetch failed" });
  }
});