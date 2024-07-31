import { Outlet } from "react-router-dom";
import "./App.css";

import Navbar from "./assets/components/navbar/Navbar";

function App({ children }) {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
