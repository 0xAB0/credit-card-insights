import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";

import TimeSeriesLineGraph from "../components/TimeSeriesLineGraph";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  box: {
    margin: theme.spacing(2, 0),
  },
  formControl: {
    width: 200,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [statement, setStatement] = React.useState("July%202020");

  const handleChange = (event) => {
    setStatement(event.target.value);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4">Overview</Typography>

      <Box display="flex" justifyContent="flex-end" className={classes.box}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          size="small"
        >
          <InputLabel>Statement</InputLabel>
          <Select value={statement} onChange={handleChange} label="Statement">
            <MenuItem value="July%202020">July 2020</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" justifyContent="center" className={classes.box}>
        <TimeSeriesLineGraph statement={statement} />
      </Box>
    </Container>
  );
}
