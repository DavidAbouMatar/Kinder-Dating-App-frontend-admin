import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";

function PendingImages(props) {
  const [isPending, setIsPending] = useState(true);
  const [pending_imgs_count, setPending_imgs_count] = useState(0);
  const [pending_msgs_count, setPending_msgs_count] = useState(0);

  async function fetchPendingCount() {
    let response = await axios.get(
      "http://localhost:8000/api/admin/pending_count"
    );
    let pending_count_data = response.data;
    setPending_imgs_count(pending_count_data["imgs_count"]);
    setPending_msgs_count(pending_count_data["msgs_count"]);
    setIsPending(false);
  }

  useEffect(() => {
    fetchPendingCount();
  }, []);

  return (
    <div>
      {isPending && <div>Loading...</div>}(
      <NavBar
        pageTitle="Admin Pannel"
        pending_imgs_count={pending_imgs_count}
        pending_msgs_count={pending_msgs_count}
      ></NavBar>
      )
    </div>
  );
}

export default PendingImages;
