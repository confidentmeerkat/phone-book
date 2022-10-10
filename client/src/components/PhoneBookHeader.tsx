import { Contacts } from "@mui/icons-material";
import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import { Contact, useCreateContactMutation } from "../graphql/generates";
import { SubmitFunction } from "./ContactFormDialog";
import { ContactModalContext } from "./PhoneBook";

const PhoneBookHeader: React.FC = () => {
  const theme = useTheme();
  const { mutate: createContact } = useCreateContactMutation();
  const queryClient = useQueryClient();

  const { openModal, setInitialInput, handleSubmit, closeModal } =
    useContext(ContactModalContext);

  const addContact: SubmitFunction = useCallback(
    async (data: Contact) => {
      await createContact(
        { input: data },
        {
          onSuccess: (data) => {
            queryClient.setQueryData(["Contacts"], ({ contacts }: any) => {
              return { contacts: [...contacts, data.createContact] };
            });
          },
        }
      );
      closeModal();
    },
    [ createContact, queryClient, closeModal]
  );

  const handleAddClicked = useCallback(() => {
    handleSubmit.current = addContact;
    setInitialInput({ firstname: "", lastname: "", number: "" });
    openModal();
  }, [addContact, openModal, setInitialInput, handleSubmit]);

  return (
    <>
      <Typography mt={6} variant="h3">
        <Contacts fontSize="large" sx={{ marginRight: theme.spacing(2) }} />
        Phone Book App
      </Typography>
      <Box
        mt={6}
        width="100%"
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
      >
        <Typography variant="h4">Contacts</Typography>
        <Button variant="contained" onClick={handleAddClicked}>
          Add Contact
        </Button>
      </Box>
    </>
  );
};

export default PhoneBookHeader;
