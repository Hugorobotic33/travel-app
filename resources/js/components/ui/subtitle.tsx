import { Typography } from "@mui/material";

export default function Subtitle({ text }: { text?: string }) {
    return (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            maxWidth: 600,

          }}
        >
          Selecciona una fecha y el número de personas para reservar
        </Typography>
    );
}