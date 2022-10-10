import { List, useTheme } from "@mui/material";
import { Contact } from "./ContactFormDialog";
import ContactItem from "./ContactItem";

interface Props {
  list: Contact[];
}

const ContactList: React.FC<Props> = ({ list }) => {
  const theme = useTheme();

  return (
    <List
      sx={{
        width: "100%",
        border: "solid 1px lightgray",
        borderRadius: "4px",
        marginTop: theme.spacing(2),
        padding: 0,
      }}
    >
      {list.map((item) => (
        <ContactItem item={item} key={item!.id} />
      ))}
    </List>
  );
};

export default ContactList;
