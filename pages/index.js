import { useState, useEffect } from "react";
import axios from "axios";
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
  const [allData, setAllData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [label, setLabel] = useState("all");

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/graph/TimeSeries?statement=July%202020`
      );
      setAllData(res.data.series[0].dataPoints);
      setPaymentData(res.data.series[1].dataPoints);
    }

    fetchData();
  }, []);

  return (
    <Container className={classes.root}>
      <Typography variant="h4">Overview</Typography>

      <Box display="flex" justifyContent="flex-end" className={classes.box}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          size="small"
        >
          <InputLabel>Data</InputLabel>
          <Select value={label} onChange={handleChange} label="Data">
            <MenuItem value="all">All Data</MenuItem>
            <MenuItem value="payment">Payment Data</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" justifyContent="center" className={classes.box}>
        <LineChart
          width={730}
          height={300}
          data={label === "all" ? allData : paymentData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </Box>
    </Container>
  );
}
