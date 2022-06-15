import "./App.css";
import { Grid } from "@mui/material";
import Search from "./components/Search";
import AnimateBack from "./components/AnimateBack";

function App() {
  return (
    <div>
    <Grid
      className="App"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <h1>Link generator</h1>
      <Search />
    </Grid>
    <AnimateBack />
    </div>
  );
}

export default App;
