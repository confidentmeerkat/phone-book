import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Container,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { Search, Contacts, Delete, Phone, Edit } from "@mui/icons-material";
import ContactFormDialog, {
  Contact,
  SubmitFunction,
} from "./ContactFormDialog";
import {
  useContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} from "./graphql/generates";
import { useQueryClient } from "@tanstack/react-query";

function App() {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialInput, setInitialInput] = useState<Contact>();

  const queryClient = useQueryClient();
  const { data: contactsData, isFetching } = useContactsQuery();
  const { mutate: createContact } = useCreateContactMutation();
  const { mutate: updateContact } = useUpdateContactMutation();
  const { mutate: deleteContact } = useDeleteContactMutation();

  const handleCreateContact: SubmitFunction = useCallback(
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
      setDialogOpen(false);
    },
    [setDialogOpen, createContact]
  );

  const handleUpdateContact: SubmitFunction = useCallback(
    async (data: Contact) => {
      const { id, ...rest } = data;
      if (id) {
        await updateContact(
          { id, input: rest },
          {
            onSuccess: (data) => {
              queryClient.setQueryData(["Contacts"], ({ contacts }: any) => {
                return {
                  contacts: contacts.map((contact: any) => {
                    if (contact.id === id) {
                      return data.updateContact;
                    }

                    return contact;
                  }),
                };
              });
            },
          }
        );
      }

      setDialogOpen(false);
    },
    [setDialogOpen]
  );

  const handleAddClicked = () => {
    setHandleSubmit(() => handleCreateContact);
    setInitialInput({ firstname: "", lastname: "", number: "" });
    setDialogOpen(true);
  };

  const handleUpdateClicked = useCallback(
    (id: string) => {
      setHandleSubmit(() => handleUpdateContact);
      setInitialInput(
        (contactsData?.contacts || []).find(
          (contact) => contact?.id === id
        ) as Contact
      );
      setDialogOpen(true);
    },
    [handleUpdateContact]
  );

  const handleDeleteContact = useCallback((id: string) => {
    deleteContact(
      { id },
      {
        onSuccess: () => {
          queryClient.setQueryData(["Contacts"], ({ contacts }: any) => {
            return {contacts: contacts.filter(((contact: Contact)  => contact?.id !== id))};
          });
        },
      }
    );
  }, []);

  const [handleSubmit, setHandleSubmit] = useState<SubmitFunction>(
    () => handleCreateContact
  );

  const handleClose = () => {
    setDialogOpen(false);
  };

  const items = useMemo(() => {
    return (contactsData?.contacts || []).map((contact) => (
      <Fragment key={contact?.id}>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ListItemText
            primary={contact?.firstname + " " + contact?.lastname}
            secondary={
              <Box
                component="span"
                mt={1}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Phone
                  fontSize="small"
                  sx={{ marginRight: theme.spacing(1) }}
                />{" "}
                {contact?.number}
              </Box>
            }
          />
          <Box>
            <Button
              sx={{
                minWidth: "32px",
                padding: theme.spacing(1, 1),
                marginRight: theme.spacing(1),
              }}
              variant="contained"
              color="primary"
              onClick={() => handleUpdateClicked(contact?.id as string)}
            >
              <Edit />
            </Button>

            <Button
              sx={{ minWidth: "32px", padding: theme.spacing(1, 1) }}
              variant="contained"
              color="error"
              onClick={() => handleDeleteContact(contact?.id as string)}
            >
              <Delete />
            </Button>
          </Box>
        </ListItem>

        <Divider component="li" />
      </Fragment>
    ));
  }, [theme, handleUpdateClicked, contactsData]);

  return (
    <div className="App">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
        <Box mt={3} width="100%">
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            placeholder="Search for contact by last name..."
          />
        </Box>
        {isFetching ? (
          "Loading"
        ) : (
          <List
            sx={{
              width: "100%",
              border: "solid 1px lightgray",
              borderRadius: "4px",
              marginTop: theme.spacing(2),
              padding: 0,
            }}
          >
            {items}
          </List>
        )}
        {dialogOpen && (
          <ContactFormDialog
            open={dialogOpen}
            onSubmit={handleSubmit}
            initialInput={initialInput}
            onClose={handleClose}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
