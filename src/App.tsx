import { Route, HashRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Mint from "./pages/Mint";
import { useAppDispatch } from "./features/hooks";
import { setWeb3 } from "./features/network/network-slice";
declare let window: any;

const App = () => {
  const dispatch = useAppDispatch();

  const checkWeb3 = () => {
    if (window.ethereum) {
      dispatch(setWeb3(true));
      console.log("User has Metamask.");
    } else {
      dispatch(setWeb3(false));
      console.log("User has no Metamask.");
    }
  };
  checkWeb3();
  return (
    <>
      <HashRouter>
        <div>
          <Route exact path="/" component={Dashboard} />
          <Route path="/mint" component={Mint} />
        </div>
      </HashRouter>
    </>
  );
};

export default App;
