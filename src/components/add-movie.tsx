import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  useMutation,
} from "@apollo/client";
import { cache } from "../cache";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
});
const GET_MOVIES = gql`
  query {
    movies {
      id
      movie_name
      rating
      duration
    }
  }
`;

const ADD_MOVIE = gql`
  mutation AddMovie(
    $movie_name: String!
    $duration: String!
    $rating: String!
  ) {
    addMovie(movie_name: $movie_name, duration: $duration, rating: $rating) {
      id
    }
  }
`;

export default function AddMovie() {
  const [movie_name, setMovieName] = useState("");
  const [rating, setRating] = useState("");
  const [duration, setDuration] = useState("");

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [GET_MOVIES],
  });

  const handleSubmit = (e: any) => {
    addMovie({
      variables: {
        movie_name: movie_name,
        duration: duration,
        rating: rating,
      },
    }).then((data) => {
      console.log("log", data);
      setMovieName("");
      setDuration("");
      setRating("");
    });
  };

  return (
    <Paper>
      <Typography variant="h3">Rate Your Favorite Movies</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FormControl fullWidth>
            <TextField
              label="Movie"
              aria-label="Movie Title"
              size="medium"
              variant="outlined"
              required
              value={movie_name}
              onChange={(event) => setMovieName(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FormControl fullWidth>
            <TextField
              label="Rating"
              aria-label="Movie Rating"
              size="medium"
              variant="outlined"
              required
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FormControl fullWidth>
            <TextField
              label="Duration"
              aria-label="Movie Duration"
              size="medium"
              variant="outlined"
              required
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FormControl>
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}
