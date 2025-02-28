import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { FakeStore } from "./main";

function App() {
  return (
    <div className="App">
      <FakeStore />
    </div>
  );
}

export default App;
