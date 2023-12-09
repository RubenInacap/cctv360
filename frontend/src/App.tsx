import { BrowserRouter,Route,Routes } from "react-router-dom"
import Layout from "./components/Layout"
import { PrivateRoute, AdminPrivateRoute } from "./components/PrivateRoute"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AdminPage from "./pages/AdminPage"
import AddProductosPage from "./pages/AddProductosPage"
import EditProductosPage from "./pages/EditProductoPage"
import SoloProduct from "./pages/SoloProduct"
import CatePage from "./pages/CategoriaPage"
import SearchByCate from "./pages/buscarPorCategoria"
import CartPage from "./pages/CartPage"
import UserProfile from "./pages/UserProfile"
import SoloOrder from "./pages/SoloOrder"


function App() {
    return (<>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>

              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage/>} />
              <Route path="productos/:slug" element={<SoloProduct/>} />
              <Route path="cate" element={<CatePage/>} />
              <Route path="cate/:cate" element={<SearchByCate/>} />


              <Route element={<PrivateRoute />} >
                <Route path="cart" element={<CartPage/>} />
                <Route path="profile" element={<UserProfile/>} />
                <Route path="order/:id" element={<SoloOrder />} />
              </Route>

              <Route path = "admin" element = {<AdminPrivateRoute/>} >
                <Route index element={<AdminPage/>} />
                <Route path="add" element={<AddProductosPage/>} />
                <Route path="edit/:id" element={<EditProductosPage/>} />
              </Route>

            </Route>
          </Routes>
        </BrowserRouter>
      </>
    )
}
export default App
