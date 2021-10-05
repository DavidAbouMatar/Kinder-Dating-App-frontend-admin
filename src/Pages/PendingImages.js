import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import PendingImgsTable from "../Components/PendingImgsTable";
import axios from "axios";

function PendingImages(props) {
  const [isPending, setIsPending] = useState(true);
  const [rows, setRows] = useState(null);

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
  }, []);

  return (
    <div>
      <NavBar pageTitle="Pending Images">
        {isPending && <div>Loading...</div>}
        {!isPending && (
          <PendingImgsTable rows={rows} removeImg={clickHandler} />
        )}
      </NavBar>
    </div>
  );
}

export default PendingImages;
