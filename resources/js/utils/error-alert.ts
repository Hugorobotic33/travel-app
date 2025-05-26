import Swal from 'sweetalert2';

export default function showErrorAlert(message: string) {
    Swal.fire({
        title: "Ocurrio un error!",
        text: message,
        icon: "error",       
    });
}