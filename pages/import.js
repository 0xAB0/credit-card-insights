import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

function createData(id, date, description, amount, category) {
  return { id, date, description, amount, category };
}

const data = [
  createData(1, "2020-08-01", "supermarket", "$13.23", "grocery"),
  createData(2, "2020-08-07", "bus", "$3.00", "transit"),
  createData(3, "2020-08-10", "coffee", "$5.00", "food & drink"),
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  box: {
    margin: theme.spacing(3, 1),
  },
  categorySelect: {
    width: 150,
  },
}));

export default function Import() {
  const classes = useStyles();
  const [rows, setRows] = React.useState(data);
  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rows);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (row) => selected.indexOf(row) !== -1;

  const handleCategoryChange = (event, rowId) => {
    setRows(
      rows.map((item) =>
        item.id === rowId ? { ...item, category: event.target.value } : item
      )
    );
  };

  React.useEffect(() => {
    const rowsId = rows.map((row) => row.id);

    setSelected(
      selected.map((selectedItem) =>
        rowsId.includes(selectedItem.id)
          ? rows.find((row) => row.id === selectedItem.id)
          : selectedItem
      )
    );
  }, [rows]);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Import
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell padding="none">Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  key={index}
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{ "aria-labelledby": labelId }}
                      onChange={(event) => handleClick(event, row)}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.date}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>
                    <FormControl
                      className={classes.categorySelect}
                      size="small"
                    >
                      <Select
                        value={row.category}
                        onChange={(event) =>
                          handleCategoryChange(event, row.id)
                        }
                      >
                        <MenuItem value="grocery">grocery</MenuItem>
                        <MenuItem value="transit">transit</MenuItem>
                        <MenuItem value="food & drink">food & drink</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box textAlign="right" className={classes.box}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(selected)}
        >
          Confirm
        </Button>
      </Box>
    </Container>
  );
}
