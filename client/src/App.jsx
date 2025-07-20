import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import authService from "./services/authService";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const response = await authService.signin(email, password);
    if (response.data.status === "SUCCESS" && response.data.validUser) {
        const userData = response.data.data;
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }
    return response;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="w-full p-6 flex flex-col min-h-screen">
      <header>
        <Navbar user={user} logout={logout} />
      </header>
      <main className="flex-grow">
        <Outlet context={{ login }} />
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};
export default App
