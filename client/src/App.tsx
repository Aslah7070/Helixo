

import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function App() {


const queryClient = new QueryClient();
  return (
    <>

      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
         <AppRoutes/>
         </QueryClientProvider>
      </BrowserRouter>


    </>
  )
}

export default App
