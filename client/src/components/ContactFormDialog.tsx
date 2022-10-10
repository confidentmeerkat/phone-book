import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ContactModalContext } from "./PhoneBook";

export interface Contact {
  id?: string;
  firstname: string;
  lastname: string;
  number: string;
}

export interface SubmitFunction {
  (data: Contact): void;
}

const ContactFormDialog: React.FC = () => {
  const {
    closeModal,
    open,
    handleSubmit: onSubmit,
    initialInput,
  } = useContext(ContactModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialInput });

  return (
    <Dialog open={open} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit?.current as SubmitFunction)}>
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
          <Button onClick={closeModal}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ContactFormDialog;
