import "./App.css";
import Movies from "./components/movies";
import AddMovie from "./components/add-movie";
import { Container } from "@mui/material";
import { render } from "@testing-library/react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
function App(): JSX.Element {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Container maxWidth="md">
          <AddMovie />
          <Movies />
        </Container>
      </ApolloProvider>
    </div>
  );
}

export default App;
