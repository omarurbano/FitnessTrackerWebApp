import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="w-full p-6 flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};
export default App
