import { useFilter } from "@/context/filter-context";
import { router } from "@inertiajs/react";
import { Button } from "@mui/material";
import { MoveLeft } from "lucide-react";

export default function BtnBack({ onClick }: { onClick: () => void }) {
    const {setParams} = useFilter()
    function handleNavigate(){
    router.visit('/');
    setParams((prev: any) => ({
                ...prev,
                date: null,
    }));    

}
   return (
    <Button variant="text" color="secondary" startIcon={<MoveLeft />} onClick={handleNavigate}>
        Volver al Inicio
    </Button>
   );
}