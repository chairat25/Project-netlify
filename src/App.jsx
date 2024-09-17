import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbartest from "./components/Navbartest";
import Sidebar from "./components/Sidebar";
import Home3 from "./paeges/Home3";
import Home from "./paeges/Home";
import Login from "./paeges/Login";
import Logout from "./paeges/Logout";
import Search from "./components/Search";
import Home2 from "./paeges/Home2";
import Register from "./paeges/Register";
import Translate from "./paeges/Translate";
import AddFood from "./paeges/AddFood";
import AddDataShop from "./paeges/AddDataShop";
import RecipeDetail from "./paeges/RecipeDetail";
import Fooddetails from "./paeges/Fooddetails";
import Editstore from "./paeges/Editstore";
import Store_information from "./paeges/Store_information";
import Notshowfood from "./paeges/Notshowfood";
import NavbarSidebar from "./components/NavbarSidebar";
import Profile from "./paeges/Profile";
import Slideshow from "./paeges/Slideshow";
import Showuser from "./paeges/Showuser";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // สถานะการล็อคอินเริ่มต้นเป็น false

  return (
    <Router>
      <Showuser/>
      <NavbarSidebar isLoggedIn={isLoggedIn} />

      <Routes>
        <Route
          path="/Showuser"
          element={<Showuser isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/Showuser"
          element={<Showuser setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/Slideshow"
          element={<Slideshow isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/Slideshow"
          element={<Slideshow setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/Notshowfood"
          element={<Notshowfood isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/Store_information"
          element={<Store_information isLoggedIn={isLoggedIn} />}
        />
        <Route path="/Home" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/Search" element={<Search isLoggedIn={isLoggedIn} />} />
        <Route path="/Home2" element={<Home2 isLoggedIn={isLoggedIn} />} />
        <Route path="/Home3" element={<Home3 isLoggedIn={isLoggedIn} />} />
        <Route path="/Home3" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/Home3" element={<Login isLoggedIn={isLoggedIn} />} />
        <Route
          path="/Login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/Login"
          element={<NavbarSidebar setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/NavbarSidebar"
          element={<NavbarSidebar setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/NavbarSidebar"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/Logout"
          element={<Logout setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/Fooddetails"
          element={<Fooddetails isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/Register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/Translate"
          element={<Translate isLoggedIn={isLoggedIn} />}
        />
        <Route path="/AddFood" element={<AddFood isLoggedIn={isLoggedIn} />} />
        <Route
          path="/AddDataShop"
          element={<AddDataShop isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/RecipeDetail"
          element={<RecipeDetail isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/Editstore"
          element={<Editstore isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
