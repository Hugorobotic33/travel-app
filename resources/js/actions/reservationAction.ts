import showAlert from "@/utils/alert";
import showErrorAlert from "@/utils/error-alert";
import axios from 'axios';

export async function createReservation(data: any, callback: () => void) {
        try{
                await axios.post('/api/reservations', data);
                callback()                
                // Opcional: mostrar mensaje de éxito
                showAlert("Reservacion creada con éxito");
            }catch(error){
                console.log(error);
                
                showErrorAlert("Error al crear la reservacion")
            }finally {
                if(localStorage.getItem('pendingReservation')) {
                    localStorage.removeItem('pendingReservation');
                }                
            }
}
