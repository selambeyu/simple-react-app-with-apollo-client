import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  useMutation,
  useQuery,
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

export default function Movies() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error! {error.message}</h3>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Movie</TableCell>
            <TableCell align="left">Rating</TableCell>
            <TableCell align="left">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.movies.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.movie_name}</TableCell>
              <TableCell align="left">{row.rating}</TableCell>
              <TableCell align="left">{row.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
