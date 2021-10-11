import { Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Mint from "./pages/Mint";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/mint" component={Mint} />
      </div>
    </BrowserRouter>
  );
};

export default App;
