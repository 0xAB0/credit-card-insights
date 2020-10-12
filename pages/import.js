import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  box: {
    margin: theme.spacing(3, 1),
  },
}));

export default function Import() {
  const router = useRouter();
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selected, setSelected] = useState([]);

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

  const handleCategoryChange = async (event, newValue, rowId) => {
    if (newValue) {
      setRows(
        rows.map((item) =>
          item.rowId === rowId ? { ...item, category: newValue } : item
        )
      );

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/import/${router.query.id}/${rowId}/category`,
        newValue,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
    }
  };

  useEffect(() => {
    const allRowsId = rows.map((row) => row.rowId);

    setSelected(
      selected.map((selectedItem) =>
        allRowsId.includes(selectedItem.rowId)
          ? rows.find((row) => row.rowId === selectedItem.rowId)
          : selectedItem
      )
    );
  }, [rows]);

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/import/${id}/data`
      );
      setRows(res.data.rows);
    };

    fetchData(router.query.id);
  }, [router.query]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category/list`
      );
      setCategoryList(res.data);
    };

    fetchCategoryList();
  }, []);

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
            {rows.map((row) => {
              const isItemSelected = isSelected(row);
              const labelId = `enhanced-table-checkbox-${row.rowId}`;

              return (
                <TableRow
                  key={row.rowId}
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
                    <Autocomplete
                      value={row.category}
                      onChange={(event, newValue) => {
                        handleCategoryChange(event, newValue, row.rowId);
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        // Suggest the creation of a new value
                        if (params.inputValue !== "") {
                          filtered.push(params.inputValue);
                        }

                        return filtered;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      options={categoryList}
                      getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === "string") {
                          return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        // Regular option
                        return option.title;
                      }}
                      size="small"
                      freeSolo
                      renderInput={(params) => <TextField {...params} />}
                    />
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
