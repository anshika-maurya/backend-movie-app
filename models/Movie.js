import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  poster: {
    type: String
  },

  description: {
    type: String
  },

  trailer: {
    type: String
  },

  releaseDate: {
    type: String
  },

  genre: {
    type: String
  }

});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;