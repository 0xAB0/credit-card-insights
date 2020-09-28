import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

import { graphData } from "../sampleData";

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

  const [time, setTime] = React.useState("6mn");

  const handleChange = (event) => {
    setTime(event.target.value);
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
          <InputLabel>Time</InputLabel>
          <Select value={time} onChange={handleChange} label="Time">
            <MenuItem value="6mn">Past 6 months</MenuItem>
            <MenuItem value="12mn">Past 12 months</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" justifyContent="center" className={classes.box}>
        <LineChart
          width={730}
          height={300}
          data={time === "6mn" ? graphData.slice(6) : graphData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expense" stroke="#8884d8" />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" />
        </LineChart>
      </Box>
    </Container>
  );
}
