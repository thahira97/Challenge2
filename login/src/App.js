import "./App.css";
import { Login } from "./Login";
import { Register } from "./Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Success } from "./Success";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Register></Register>
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>{" "}
        <Route path="/success" exact>
          <Success></Success>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
