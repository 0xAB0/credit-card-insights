import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(() => ({}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Import
      </Typography>
    </Container>
  );
}
