import { Delete, Edit, Phone } from "@mui/icons-material";
import {
  Button,
  Divider,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from "../graphql/generates";
import { Contact, SubmitFunction } from "./ContactFormDialog";
import { ContactModalContext } from "./PhoneBook";

const ContactItem: React.FC<{ item: Contact }> = ({ item }) => {
  const { openModal, closeModal, setInitialInput, handleSubmit } =
    useContext(ContactModalContext);

  const queryClient = useQueryClient();
  const { mutate: updateContact } = useUpdateContactMutation();
  const { mutate: deleteContact } = useDeleteContactMutation();

  const theme = useTheme();

  const handleUpdateContact: SubmitFunction = useCallback(
    (data: Contact) => {
      const { id, ...rest } = data;
      if (id) {
        updateContact(
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

      closeModal();
    },
    [closeModal, queryClient, updateContact]
  );
  const handleEditClicked = () => {
    setInitialInput(item);
    handleSubmit.current = handleUpdateContact;
    openModal();
  };

  const handleDeleteContact = useCallback(() => {
    deleteContact(
      { id: item?.id as string },
      {
        onSuccess: () => {
          queryClient.setQueryData(["Contacts"], ({ contacts }: any) => {
            return {
              contacts: contacts.filter(
                (contact: Contact) => contact?.id !== item.id
              ),
            };
          });
        },
      }
    );
  }, [queryClient, deleteContact]);

  return (
    <>
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ListItemText
          primary={item?.firstname + " " + item?.lastname}
          secondary={
            <Box
              component="span"
              mt={1}
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Phone fontSize="small" sx={{ marginRight: theme.spacing(1) }} />{" "}
              {item?.number}
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
            onClick={() => handleEditClicked()}
          >
            <Edit />
          </Button>

          <Button
            sx={{ minWidth: "32px", padding: theme.spacing(1, 1) }}
            variant="contained"
            color="error"
            onClick={() => handleDeleteContact()}
          >
            <Delete />
          </Button>
        </Box>
      </ListItem>

      <Divider component="li" />
    </>
  );
};

export default ContactItem;
