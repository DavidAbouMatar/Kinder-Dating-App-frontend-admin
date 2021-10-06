import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import PendingMsgsTable from "../Components/PendingMsgsTable";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import axios from "axios";

function PendingMessages(props) {
  const history = useHistory();
  let config = {};

  function loginStatusCheck() {
    let login_status = JSON.parse(localStorage.getItem("login"));
    if (login_status.login) {
      const token = login_status.token;
      config = { headers: { Authorization: `Bearer ${token}` } };
    } else {
      history.push("/");
    }
  }

  const [isPending, setIsPending] = useState(true);
  const [rows, setRows] = useState(null);
  const [pending_imgs_count, setPending_imgs_count] = useState(0);
  const [pending_msgs_count, setPending_msgs_count] = useState(0);

  async function fetchPendingCount() {
    try {
      let response = await axios.get(
        "http://localhost:8000/api/admin/pending_count",
        config
      );
      let pending_count_data = response.data;
      setPending_imgs_count(pending_count_data["imgs_count"]);
      setPending_msgs_count(pending_count_data["msgs_count"]);
    } catch (error) {
      console.log(error);
      history.push("/");
    }
  }

  function clickHandler(msg_id) {
    let newRows = rows.filter((row) => row.id != msg_id);
    setRows(newRows);
  }

  async function fetchData() {
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/admin/get_msgs",
        config
      );
      let data = response.data;
      setRows(data);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      history.push("/");
    }
  }

  useEffect(() => {
    loginStatusCheck();
    fetchData();
    fetchPendingCount();
  }, []);

  return (
    <div>
      <NavBar
        pageTitle="Pending Messages"
        pending_imgs_count={pending_imgs_count}
        pending_msgs_count={pending_msgs_count}
      >
        {isPending && <CircularProgress style={{ color: "#F06795" }} />}
        {!isPending && (
          <PendingMsgsTable rows={rows} removeMsg={clickHandler} />
        )}
      </NavBar>
    </div>
  );
}

export default PendingMessages;
