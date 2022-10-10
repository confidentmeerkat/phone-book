import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  value: string;
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
}

const FilterInput: React.FC<Props> = ({ value, onChange }) => {
  return (
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
        value={value}
        onChange={onChange}
        placeholder="Search for contact by last name..."
      />
    </Box>
  );
};

export default FilterInput;
