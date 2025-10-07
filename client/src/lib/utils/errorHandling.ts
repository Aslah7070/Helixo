import { toast } from "react-toastify";
import axios from "axios";

export function handleApiError(error: unknown, defaultMessage = "An error occurred") {
  let message = defaultMessage;
  if (axios.isAxiosError(error)) {
    message =
      error.response?.data?.message ||
      error.message ||
      defaultMessage;
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message); 
  throw new Error(message); 
}