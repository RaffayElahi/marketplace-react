import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import './App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import  MyProvider  from './context/context';
import Signup from './pages/Signup';
import CartPage from './pages/CartPage';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import DashboardHomeCover from './pages/DashboardHomeCover';
import DashboardOrdersCover from './pages/DashboardOrdersCover';
import DashboardCustomerCover from './pages/DashboardCustomerCover';
import DashboardAnalyticsCover from './pages/DashboardAnalyticsCover';
import DashboardProductAllCover from './pages/DashboardProductAllCover';
import DashboardProductAddCover from './pages/DashboardProductAddCover';
import DashboardProductEditCover from './pages/DashboardProductEditCover';
import VerifyEmail from "./pages/VerifyEmail"
import VerifyEmailToken from './pages/VerifyEmailToken';
import RequireAuth from './components/RequireAuth';
import PresistantLogin from './components/PresistantLogin';



const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
      <MyProvider>
        <Router>
          <Routes>
            <Route element={<PresistantLogin/>}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/products/:productCode' element={<ProductDetail/>}/>
                <Route element={<RequireAuth allowedRoles={['user']}/>}>
                  <Route path='/cart' element={<CartPage/>}/>
                </Route>
                <Route path='/verify-email' element={<VerifyEmail/>}/>
                <Route path='/verify-email/:token' element={<VerifyEmailToken/>}/>
              </Route>

              <Route element={<RequireAuth allowedRoles={['admin']}/>}>
                <Route path='/dashboardofsite' element={<DashboardLayout/>}>
                  <Route index element={<DashboardHomeCover/>}/>
                  <Route path='/dashboardofsite/orders' element={<DashboardOrdersCover/>}/>
                  <Route path='/dashboardofsite/products' element={<DashboardProductAllCover/>}/>
                  <Route path='/dashboardofsite/products/add' element={<DashboardProductAddCover/>}/>
                  <Route path='/dashboardofsite/products/edit/:id' element={<DashboardProductEditCover/>}/>
                  <Route path='/dashboardofsite/customers' element={<DashboardCustomerCover/>}/>
                  <Route path='/dashboardofsite/analytics' element={<DashboardAnalyticsCover/>}/>
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </MyProvider>

  );

  
};

export default App;