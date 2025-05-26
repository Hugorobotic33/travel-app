import { Button } from "@mui/material";
import { MoveLeft } from "lucide-react";

export default function BtnBack({ onClick }: { onClick: () => void }) {
   return (
    <Button variant="text" color="secondary" startIcon={<MoveLeft />} onClick={onClick}>
        Volver al Inicio
    </Button>
   );
}