import { Fragment, useCallback, useMemo, useState } from "react";
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

const sampleData = [
  {
    id: "1",
    firstname: "Eric",
    lastname: "Elliot",
    number: "123-123-123",
  },
  {
    id: "2",
    firstname: "Bill",
    lastname: "Gates",
    number: "233-521-2315",
  },
];

function App() {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateContact: SubmitFunction = useCallback((data: Contact) => {
    setDialogOpen(false);
  }, [setDialogOpen]);

  const handleUpdateContact: SubmitFunction = useCallback((data: Contact) => {
    setDialogOpen(false);
  }, [setDialogOpen]);

  const handleAddClicked = () => {
    setHandleSubmit(() => handleCreateContact);
    setDialogOpen(true);
  };

  const handleUpdateClicked = useCallback((id: string) => {
    setHandleSubmit(() => handleUpdateContact);
    setInitialInput(sampleData.find(({id: itemId}) => itemId === id))
    setDialogOpen(true);
  }, [handleUpdateContact]);

  const [handleSubmit, setHandleSubmit] = useState<SubmitFunction>(
    () => handleCreateContact
  );

  const handleClose = () => {
    setDialogOpen(false);
  };

  const [initialInput, setInitialInput] = useState<Contact>();

  const items = useMemo(() => {
    return sampleData.map(({ firstname, lastname, number, id }) => (
      <Fragment key={id}>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ListItemText
            primary={firstname + ' ' + lastname}
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
                {number}
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
              onClick={() => handleUpdateClicked(id)}
            >
              <Edit />
            </Button>
            <Button
              sx={{ minWidth: "32px", padding: theme.spacing(1, 1) }}
              variant="contained"
              color="error"
            >
              <Delete />
            </Button>
          </Box>
        </ListItem>

        <Divider component="li" />
      </Fragment>
    ));
  }, [theme, handleUpdateClicked]);

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
