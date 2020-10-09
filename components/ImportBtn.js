import { useRouter } from "next/router";
import axios from "axios";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = e.target.file.files[0];

    try {
      const filedata = await axios.post("/api/upload", file);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/import/?name=${file.name}`,
        filedata.data
      );

      if (res.data.status === "ok") {
        setOpen(false);
        router.push({
          pathname: "/import",
          query: { id: res.data.id },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Import
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Import CSV</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <input required name="file" type="file" accept=".csv" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="default">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Upload
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ImportBtn;
