import {
  TextField,  
  InputAdornment,  
  styled,
} from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"

// Estilo personalizado para los campos
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 50,
    height: 48,
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.divider,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
  },
  "& .MuiInputLabel-root": {
    transform: "translate(14px, 14px) scale(1)",
    "&.Mui-focused, &.MuiFormLabel-filled": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
  },
}))

export default function TextFieldNumber({value, onChange}: {value: string, onChange: (e: any) => void}) {
  return (
    <StyledTextField
        label="Personas"
        type="number"
        value={value}
        onChange={onChange}        
        InputProps={{
            startAdornment: (
            <InputAdornment position="start">
                <PersonIcon color="action" sx={{ fontSize: 20 }} />
            </InputAdornment>
            ),
            inputProps: { min: 1, max: 20 },
        }}
    />       
  )
}
