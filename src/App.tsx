import { Route, BrowserRouter, HashRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Mint from "./pages/Mint";

const App = () => {
  return (
    <HashRouter>
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route path="/mint" component={Mint} />
      </div>
    </HashRouter>
  );
};

export default App;
