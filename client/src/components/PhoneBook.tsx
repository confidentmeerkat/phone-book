import { Container } from "@mui/material";
import { createContext, useMemo, useRef, useState } from "react";
import { useContactsQuery } from "../graphql/generates";
import ContactFormDialog, {
  Contact,
  SubmitFunction,
} from "./ContactFormDialog";
import ContactList from "./ContactList";
import FilterInput from "./FilterInput";
import PhoneBookHeader from "./PhoneBookHeader";

interface IModalContext {
  open: boolean;
  handleSubmit: React.MutableRefObject<SubmitFunction | undefined>;
  openModal: () => void;
  closeModal: () => void;
  initialInput: Contact;
  setInitialInput: React.Dispatch<React.SetStateAction<Contact>>;
}

export const ContactModalContext = createContext<IModalContext>(
  {} as IModalContext
);

const PhoneBook: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialInput, setInitialInput] = useState<Contact>({
    firstname: "",
    lastname: "",
    number: "",
  });
  const handleFormSubmit = useRef<SubmitFunction>({} as SubmitFunction);

  const { data: contactsData, isFetching } = useContactsQuery();
  const [filter, setFilter] = useState("");

  const filteredContacts = useMemo(() => {
    return (contactsData?.contacts || []).filter((contact) =>
      contact?.lastname.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  }, [contactsData, filter]);

  return (
    <ContactModalContext.Provider
      value={{
        open: dialogOpen,
        initialInput,
        handleSubmit: handleFormSubmit,
        openModal: () => setDialogOpen(true),
        closeModal: () => setDialogOpen(false),
        setInitialInput,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PhoneBookHeader />

        <FilterInput
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {isFetching ? (
          "Loading..."
        ) : (
          <ContactList list={filteredContacts as Contact[]} />
        )}
      </Container>

      {dialogOpen && <ContactFormDialog />}
    </ContactModalContext.Provider>
  );
};

export default PhoneBook;
