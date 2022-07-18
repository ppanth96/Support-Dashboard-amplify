import React from "react";
import Channelstatus from "./channelstatus/Channelstatus.js";
import TicketsSolved from "./solvedtickets/TicketsSolved.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div class="page">
        <div id="side">
          <Channelstatus />
        </div>
        <div id="main">
          <TicketsSolved />
        </div>
      </div>
    </div>
  );
}

export default App;
