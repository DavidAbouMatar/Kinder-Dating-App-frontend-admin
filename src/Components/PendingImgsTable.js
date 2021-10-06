import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import axios from "axios";

function PendingImgsTable({ rows, removeImg }) {
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/");
  }

  async function approveHandler(img_id) {
    removeImg(img_id);
    let response = await axios.post(
      "http://127.0.0.1:8000/api/admin/approve_img",
      {
        approved_img_id: img_id,
      },
      config
    );
    console.log(response.data.message);
  }

  async function rejectHandler(img_id) {
    removeImg(img_id);
    let response = await axios.post(
      "http://127.0.0.1:8000/api/admin/reject_img",
      {
        rejected_img_id: img_id,
      },
      config
    );
    console.log(response.data.message);
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      {rows.map((row) => (
        <Card key={row.id} sx={{ minWidth: 300, maxWidth: 500, m: 3 }}>
          <CardMedia
            component="img"
            height="350"
            image={row.picture_url}
            alt={row.user_id}
          />
          <CardActions>
            <Button
              variant="contained"
              style={{ backgroundColor: "#F06795", color: "#FFFFFF" }}
              onClick={() => {
                approveHandler(row.id);
              }}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                rejectHandler(row.id);
              }}
            >
              Reject
            </Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
}

export default PendingImgsTable;
