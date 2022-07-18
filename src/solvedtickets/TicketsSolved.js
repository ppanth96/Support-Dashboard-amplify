import React, { useEffect, useState } from "react"
import { API } from "aws-amplify"
import "./Solvedtickets.css";

function table(agent_name, solved_tickets) {
  return (
    <tr>
      <td data-label="Agent Name">{agent_name}</td>
      <td data-label="Solved Tickets">{solved_tickets}</td>
    </tr>
  );
}

function TicketsSolved() {
  useEffect(() => {
    fetchstatus();
  }, []);

  const [items, setItems] = useState([]);

  async function fetchstatus() {
    API.get("dashboardAPI", "/channel-status/scores", {})
      .then((response) => {
        setItems(response);
        console.log(`Response: ${response}`);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  const date = new Date();
  const quarter = Math.floor((date.getMonth() + 3) / 3);

  return (
    <section>
      <h2>Tickets Solved for Quarter {quarter}</h2>
      <div class="table-wrapper">
        <table class="fl-table">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Total Tickets Solved</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item) => (
            table(item.agent, item.tickets_solved)
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TicketsSolved;