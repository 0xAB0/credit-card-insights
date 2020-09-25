import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const ImportBtn = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = () => {
    setOpen(false);
    router.push("/import");
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Import
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Import CSV</DialogTitle>
        <DialogContent>
          <label htmlFor="upload-csv-file">
            <input required type="file" accept=".csv" id="upload-csv-file" />
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="textSecondary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImportBtn;
