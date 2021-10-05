import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";

function PendingImgsTable({ rows, removeImg }) {
  async function approveHandler(img_id) {
    removeImg(img_id);
    let response = await axios.post(
      "http://127.0.0.1:8000/api/admin/approve_img",
      {
        approved_img_id: img_id,
      }
    );
    console.log(response.data.message);
  }

  async function rejectHandler(img_id) {
    removeImg(img_id);
    let response = await axios.post(
      "http://127.0.0.1:8000/api/admin/reject_img",
      {
        rejected_img_id: img_id,
      }
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
        <Card sx={{ minWidth: 300, maxWidth: 500, m: 3 }}>
          <CardMedia
            component="img"
            height="350"
            image={row.picture_url}
            alt={row.user_id}
          />
          <CardActions>
            <Button
              variant="contained"
              color="error"
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
