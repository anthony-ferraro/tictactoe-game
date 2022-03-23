import NewGameMenu from "./components/NewGameMenu";
import Game from "./components/Game";
import { GlobalProvider } from "./context/GlobalState";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
            <Route path='/' element={<NewGameMenu></NewGameMenu>}></Route>
            <Route path='/game' element={<Game></Game>}></Route>
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
