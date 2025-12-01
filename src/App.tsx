import { useState } from "react";
import "./App.css";
import Timaverkefni22 from "./pages/Timaverkefni22";
import Timi22 from "./pages/timi22";

function App() {
  const [route, setRoute] = useState<string>("/");
  return (
    <div>
      <nav style={{}}>
        <a onClick={() => setRoute("/")}>Home Timi 22</a>
        <a onClick={() => setRoute("/timaverkefni22")}>Tímaverkefni 22</a>
      </nav>
      {route === "/timaverkefni22" ? <Timaverkefni22 /> : <Timi22 />}
    </div>
  );
}

export default App;
