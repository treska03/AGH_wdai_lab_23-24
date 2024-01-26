import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Daj3} from "../components/dajpan3.tsx" 
import { Shop } from "../components/products/Shop.tsx";
import { ProductPage } from "../components/products/ProductPage.tsx";
import { EditProducts } from "../components/products/EditProducts.tsx";
import { LoginPage } from "../components/user/LoginPage.tsx";
import { UserProfile } from "../components/user/User.tsx";
import { Logout } from "../components/user/LogoutPage.tsx";
import { Navbar } from "../components/Navbar.tsx";

export const Router = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route index element={<h1>Default path greeting!!</h1>}/>
        <Route path="/meme" element={<Daj3 />} />
      
        <Route path="/sklep" element={<Shop />}>
          <Route index element={<ProductPage/>} />
          <Route path="edytuj/:id" element={<EditProducts/>}/>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<UserProfile />} />
        
      </Routes>
    </BrowserRouter>
  );
};
