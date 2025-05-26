import { Typography } from "@mui/material";

export default function Title({ text }: { text?: string }) {
    return (
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            background: "linear-gradient(45deg, #1976d2, #42a5f5)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {text || "Bienvenido a nuestra plataforma"}
        </Typography>
    );
}