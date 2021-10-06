import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import PendingMessages from "./Pages/PendingMessages";
import PendingImages from "./Pages/PendingImages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/pendingimgs">
          <PendingImages />
        </Route>
        <Route exact path="/pendingmsgs">
          <PendingMessages />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
