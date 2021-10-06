import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import PendingMsgsTable from "../Components/PendingMsgsTable";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import LinearProgress from "@mui/material/LinearProgress";
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
  const [isAutoReview, setIsAutoReview] = useState(false);

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

  async function autoMsgReview() {
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/admin/auto_review_msgs",
        config
      );
    } catch (error) {
      console.log(error);
    }
  }

  function clickHandler(msg_id) {
    let newRows = rows.filter((row) => row.id != msg_id);
    setRows(newRows);
  }

  function switchHandler() {
    if (isAutoReview) {
      setIsAutoReview(false);
    } else {
      setIsAutoReview(true);
      setRows([]);
      autoMsgReview();
    }
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
          <Grid
            component="main"
            container
            spacing={0}
            direction="column"
            alignItems="end"
            justifyContent="center"
          >
            <FormGroup>
              <FormControlLabel
                control={<Switch color="error" onClick={switchHandler} />}
                label="Auto Msg Reviewer"
              />
            </FormGroup>
          </Grid>
        )}
        {!isPending && isAutoReview && (
          <Grid
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
            // container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Typography variant="h3">Auto Message Reviewer is On...</Typography>
            <LinearProgress color="error" />
            <Typography variant="h6"></Typography>
          </Grid>
        )}

        {!isPending && !isAutoReview && (
          <PendingMsgsTable rows={rows} removeMsg={clickHandler} />
        )}
      </NavBar>
    </div>
  );
}

export default PendingMessages;
