import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main>
      <main>
        <RouterProvider router={router} />
        <Toaster />
      </main>
    </main>
  );
};

export default App;
