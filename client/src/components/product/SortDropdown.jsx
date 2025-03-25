import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortDropdown = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: 2 }}>
      <InputLabel id="sort-label">Sortera efter</InputLabel>
      <Select
        labelId="sort-label"
        value={value}
        onChange={onChange}
        label="Sortera efter"
      >
        <MenuItem value="default">Standard</MenuItem>
        <MenuItem value="priceAsc">Pris: Låg till Hög</MenuItem>
        <MenuItem value="priceDesc">Pris: Hög till Låg</MenuItem>
        <MenuItem value="nameAsc">Namn: A till Ö</MenuItem>
        <MenuItem value="nameDesc">Namn: Ö till A</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;