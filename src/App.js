import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { allRoutes } from "./routes";

function App() {
  allRoutes.subscribe(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <RouterProvider router={allRoutes} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
