import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();


router.post("/add", async (req, res) => {

  try {

    const movie = new Movie(req.body);

    await movie.save();

    res.json({ message: "Movie added successfully" });

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Server error" });

  }

});


router.get("/all", async (req, res) => {

  try {

    const movies = await Movie.find();

    res.json(movies);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});


router.delete("/:id", async (req, res) => {

  try {

    await Movie.findByIdAndDelete(req.params.id);

    res.json({ message: "Movie deleted" });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

});

export default router;