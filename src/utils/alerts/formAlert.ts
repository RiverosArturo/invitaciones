import Swal from 'sweetalert2';

export const formAlert = () => {
  Swal.fire({
    title: "Tu mensaje ha sido enviado con éxito!",
    text: "Pronto nos pondremos en contacto contigo.",
    icon: 'success',
    showConfirmButton: false,
    background: '#ffffff',
    color: '#1f2937',
    position: 'center',
    toast: true,
    timer: 4000,
    timerProgressBar: true,
    customClass: {
      popup: 'rounded-lg shadow-md border border-gray-200',
      title: 'text-sm font-medium',
      timerProgressBar: 'bg-blue-500 h-1',
    },
  });
};

export const formAlertError = ( error: string = "" ) => {
  Swal.fire({
    title: "Error!!!",
    text: error,
    icon: 'success',
    showConfirmButton: false,
    background: '#ffffff',
    color: '#1f2937',
    position: 'center',
    toast: true,
    timer: 4000,
    timerProgressBar: true,
    customClass: {
      popup: 'rounded-lg shadow-md border border-gray-200',
      title: 'text-sm font-medium',
      timerProgressBar: 'bg-blue-500 h-1',
    },
  });
};