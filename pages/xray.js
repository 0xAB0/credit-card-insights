import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TopFiveTable from "../components/TopFiveTable";
import DetailsTable from "../components/DetailsTable";
import PieGraph from "../components/PieGraph";
import TimeSeriesLineGraph from "../components/TimeSeriesLineGraph";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3, 0),
    },
  },
}));

export default function XRay() {
  const router = useRouter();
  const classes = useStyles();

  const { type, statement, start, end } = router.query;

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        XRay
      </Typography>

      {/* summary */}
      <Container>
        <Typography variant="h5" gutterBottom>
          Summary
        </Typography>
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
      </Container>

      {/* details */}
      <Container>
        <Typography variant="h5" gutterBottom>
          Details
        </Typography>
        <Paper>
          <DetailsTable
            type={type}
            statement={statement}
            start={start}
            end={end}
          />
        </Paper>
      </Container>

      {/* graphs */}
      <Container>
        <Typography variant="h5" gutterBottom>
          Graphs
        </Typography>
        <Grid container spacing={2} justify="space-evenly">
          <Grid item>
            <PieGraph
              type={type}
              statement={statement}
              start={start}
              end={end}
            />
          </Grid>

          <Grid item>
            <TimeSeriesLineGraph
              query={{ ...router.query, breakdown: "all", resolution: "day" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
