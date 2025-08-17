import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ItemtedRoute, AdminRoute } from "./service/Guard";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ItemCCategoryPage from "./pages/ItemCategoryPage";


import ItemPage from "./pages/ProductPage";
import AddEditItemPage from "./pages/AddEditItemPage";




import StockPage from "./pages/StockPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>

        {/* ADMIN ROUTES */}
        <Route path="/Item category" element={<AdminRoute element={<ItemCategoryPage/>}/>}/>
        
       
        <Route path="/item" element={<AdminRoute element={<ItemPage/>}/>}/>


        <Route path="/add-item" element={<AdminRoute element={<AddEditItemPage/>}/>}/>
        <Route path="/edit-item/:itemId" element={<AdminRoute element={<AddEditItemPage/>}/>}/>

          {/* ADMIN AND MANAGERS ROUTES */}
      
        <Route path="/stock" element={<itemedRoute element={<stockPage/>}/>}/>



        <Route path="*" element={<LoginPage/>}/>


        

      </Routes>
    </Router>
  )
}

export default App;
