import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function showAlert(message: string) {
    Swal.fire({
        title: "Creada con exito!",
        text: message,
        icon: "success",
        didOpen: (popup) => {
            popup.style.zIndex = '1400'; 
        }
    }).then((result) => {
    if (result.isConfirmed) {      
      router.visit('/reservations');
    }
  });
}
