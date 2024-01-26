import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AddProducts } from "../components/products/AddProducts";
import { Profile } from "../components/user/Profile"
import { RemoveProducts } from "../components/products/RemoveProducts";
import { FAQ } from "../components/faq/FAQ";
import { Shop } from "../components/products/Shop";
import { LandingPage } from "../components/products/LandingPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <main>
        <Routes>

          <Route path="/produkty" element={<Shop />} />
          <Route path="/produkty/dodaj" element ={<AddProducts/>} />
          <Route index element={<LandingPage/>} />
          <Route path="/profil" element={<Profile/>}/>
          <Route path="/produkty/usun" element={<RemoveProducts/>}/>
          <Route path="faq" element={<FAQ/>}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
};
