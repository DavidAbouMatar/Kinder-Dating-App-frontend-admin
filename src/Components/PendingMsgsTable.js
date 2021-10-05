import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";

function PendingMsgsTable({ rows, removeMsg }) {
  async function approveHandler(msg_id) {
    removeMsg(msg_id);
    let response = await axios.post(
      "http://127.0.0.1:8000/api/admin/approve_msg",
      {
        approved_msg_id: msg_id,
      }
    );
    console.log(response.data.message);
  }

  async function rejectHandler(msg_id) {
    removeMsg(msg_id);
    let response = await axios.post(
      "http://127.0.0.1:8000/api/admin/reject_msg",
      {
        rejected_msg_id: msg_id,
      }
    );
    console.log(response.data.message);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.body}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#F06795", color: "#FFFFFF" }}
                  onClick={() => {
                    approveHandler(row.id);
                  }}
                >
                  Approve
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    rejectHandler(row.id);
                  }}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PendingMsgsTable;
