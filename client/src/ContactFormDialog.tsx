import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

export interface Contact {
  id?: String;
  firstname: String;
  lastname: String;
  number: String;
}

export interface SubmitFunction {
  (data: Contact): void;
}

interface Props {
  open: boolean;
  initialInput?: Contact;
  onSubmit: SubmitFunction;
  onClose: () => void;
}

const ContactFormDialog: React.FC<Props> = ({
  open,
  initialInput,
  onSubmit,
  onClose,
}) => {

  const { register, handleSubmit } = useForm({ defaultValues: initialInput });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{initialInput? "Update" : "New"} Contact</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="First Name" {...register("firstname")} fullWidth />
          <TextField margin="dense" label="Last Name" {...register("lastname")} fullWidth />
          <TextField margin="dense" label="Number" {...register("number")} fullWidth />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ContactFormDialog;
