import type React from "react"
import { useState, useEffect } from "react"
import {
  Button,
  styled,  
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
// Estilo personalizado para el botón
const SearchButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  height: 48,
  padding: "0 24px",
  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
  textTransform: "none",
  fontWeight: 600,
  minWidth: 120,
  "&:hover": {
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-1px)",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}))

export default function SearchButtonC({handleClick} : {handleClick: () => void}) {
    return (
        <SearchButton
            variant="contained"
            color="primary"
            onClick={handleClick}
            startIcon={<SearchIcon />}
        >
            Buscar
        </SearchButton>
    )
   

}