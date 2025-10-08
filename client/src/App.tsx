

import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
function App() {


const queryClient = new QueryClient();
  return (
    <>

      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
         <AppRoutes/>
           <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

           <Toaster position="top-right" />
         </QueryClientProvider>
      </BrowserRouter>


    </>
  )
}

export default App
