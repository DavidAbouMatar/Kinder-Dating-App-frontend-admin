import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import PendingImgsTable from "../Components/PendingImgsTable";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function PendingImages(props) {
  const [isPending, setIsPending] = useState(true);
  const [rows, setRows] = useState(null);
  const [pending_imgs_count, setPending_imgs_count] = useState(0);
  const [pending_msgs_count, setPending_msgs_count] = useState(0);

  async function fetchPendingCount() {
    let response = await axios.get(
      "http://localhost:8000/api/admin/pending_count"
    );
    let pending_count_data = response.data;
    setPending_imgs_count(pending_count_data["imgs_count"]);
    setPending_msgs_count(pending_count_data["msgs_count"]);
  }

  function clickHandler(img_id) {
    let newRows = rows.filter((row) => row.id != img_id);
    setRows(newRows);
  }

  async function fetchData() {
    let response = await axios.get("http://127.0.0.1:8000/api/admin/get_imgs");
    let data = response.data;
    setRows(data);
    setIsPending(false);
  }

  useEffect(() => {
    fetchData();
    fetchPendingCount();
  }, []);

  return (
    <div>
      <NavBar
        pageTitle="Pending Images"
        pending_imgs_count={pending_imgs_count}
        pending_msgs_count={pending_msgs_count}
      >
        {isPending && <CircularProgress style={{ color: "#F06795" }} />}
        {!isPending && (
          <PendingImgsTable rows={rows} removeImg={clickHandler} />
        )}
      </NavBar>
    </div>
  );
}

export default PendingImages;
