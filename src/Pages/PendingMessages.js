import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import PendingMsgsTable from "../Components/PendingMsgsTable";
import axios from "axios";

function PendingMessages(props) {
  const [isPending, setIsPending] = useState(true);
  const [rows, setRows] = useState(null);

  function clickHandler(msg_id) {
    let newRows = rows.filter((row) => row.id != msg_id);
    setRows(newRows);
  }

  async function fetchData() {
    let response = await axios.get("http://127.0.0.1:8000/api/admin/get_msgs");
    let data = response.data;
    setRows(data);
    setIsPending(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NavBar pageTitle="Pending Messages">
        {isPending && <div>Loading...</div>}
        {!isPending && (
          <PendingMsgsTable rows={rows} removeMsg={clickHandler} />
        )}
      </NavBar>
    </div>
  );
}

export default PendingMessages;
