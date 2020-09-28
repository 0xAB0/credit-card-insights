import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

const TopFiveTable = ({ name }) => {
  const rows = [
    { rank: 1, name: "no. 1" },
    { rank: 2, name: "no. 2" },
    { rank: 3, name: "no. 3" },
    { rank: 4, name: "no. 4" },
    { rank: 5, name: "no. 5" },
  ];
  return (
    <TableContainer component={Paper} style={{ width: 250 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>{name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rank}>
              <TableCell component="th" scope="row">
                {row.rank}
              </TableCell>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopFiveTable;
