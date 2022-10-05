import { useMemo } from "react";
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
import { Search, Contacts, Delete, Phone } from "@mui/icons-material";

const sampleData = [
  {
    name: "Eric Elliot",
    number: "123-123-123",
  },
  {
    name: "Bill Gates",
    number: "233-521-2315",
  },
];

function App() {
  const theme = useTheme();

  const items = useMemo(() => {
    return sampleData.map(({ name, number }) => (
      <>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ListItemText
            primary={name}
            secondary={
              <Box mt={1} display="flex" flexDirection="row" alignItems="center">
                <Phone fontSize="small" sx={{marginRight: theme.spacing(1)}} /> {number}
              </Box>
            }
          />
          <Button variant="contained" color="error">
            <Delete />
          </Button>
        </ListItem>

        <Divider component="li" />
      </>
    ));
  }, []);

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
          <Button variant="contained">Add Contact</Button>
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
            padding:0
          }}
        >
          {items}
        </List>
      </Container>
    </div>
  );
}

export default App;
