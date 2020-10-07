import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import {
  PieChart,
  Pie,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from "recharts";

import TopFiveTable from "../components/TopFiveTable";
import { tableData, barData, graphData } from "../sampleData";

const useStyles = makeStyles((theme) => ({
  transactions: {
    margin: theme.spacing(4, 2),
  },
}));

export default function XRay() {
  const router = useRouter();
  const classes = useStyles();

  const { type, statement, start, end } = router.query;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        XRay
      </Typography>

      {/* summary */}
      <Grid container spacing={3} justify="space-evenly">
        <Grid item>
          <TopFiveTable
            name="category"
            type={type}
            statement={statement}
            start={start}
            end={end}
          />
        </Grid>
        <Grid item>
          <TopFiveTable
            name="individual"
            type={type}
            statement={statement}
            start={start}
            end={end}
          />
        </Grid>
        <Grid item>
          <TopFiveTable
            name="frequent"
            type={type}
            statement={statement}
            start={start}
            end={end}
          />
        </Grid>
      </Grid>

      {/* all transactions */}
      <div className={classes.transactions}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* graphing */}
      <Grid container spacing={2} justify="space-evenly">
        <Grid item>
          <PieChart width={500} height={250}>
            <Pie
              data={barData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              label
            />
          </PieChart>
        </Grid>

        <Grid item>
          <BarChart width={500} height={250} data={graphData.slice(6)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expense" fill="#8884d8" />
            <Bar dataKey="income" fill="#82ca9d" />
          </BarChart>
        </Grid>

        <Grid item>
          <LineChart
            width={500}
            height={300}
            data={graphData.slice(6)}
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
        </Grid>
      </Grid>
    </Container>
  );
}
