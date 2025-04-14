import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortDropdown = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined" sx={{ minWidth: 200, marginBottom: 2 }}>
      <InputLabel id="sort-label">Sort by</InputLabel>
      <Select
        labelId="sort-label"
        value={value}
        onChange={onChange}
        label="Sort by"
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="priceAsc">Price: Low to High</MenuItem>
        <MenuItem value="priceDesc">Price: High to Low</MenuItem>
        <MenuItem value="nameAsc">Name: A to Z</MenuItem>
        <MenuItem value="nameDesc">Name: Z to A</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
