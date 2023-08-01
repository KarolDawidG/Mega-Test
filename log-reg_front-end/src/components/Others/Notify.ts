import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (e: any) =>
  toast(e, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
