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
  id?: string;
  firstname: string;
  lastname: string;
  number: string;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialInput });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{initialInput?.id ? "Update" : "New"} Contact</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            {...register("firstname", { required: true })}
            fullWidth
            error={!!errors.firstname}
            helperText={errors.firstname && errors.firstname.message}
          />
          <TextField
            margin="dense"
            label="Last Name"
            {...register("lastname", { required: true })}
            fullWidth
            error={!!errors.lastname}
            helperText={errors.lastname && errors.lastname.message}
          />
          <TextField
            margin="dense"
            label="Number"
            placeholder="xxx-xxx-xxxx"
            {...register("number", {
              required: true,
              pattern: {
                value: /^\d{3}-\d{3}-\d{4}$/,
                message: "Phone number format is xxx-xxx-xxxx",
              },
            })}
            error={!!errors.number}
            helperText={errors.number && errors.number.message}
            fullWidth
          />
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
