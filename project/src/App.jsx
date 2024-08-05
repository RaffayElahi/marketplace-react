import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import { useState, useEffect, useContext } from 'react';
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
import AuthExistance from './components/AuthExistance'
import PresistantLogin from './components/PresistantLogin';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import NotFound from './pages/NotFound'
import Unauthorized from './pages/Unauthorized'
import EmailLoader from './components/Loaders/EmailLoader'


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <EmailLoader fullscreen={true}/>;
  }

  return (
      <MyProvider>
        <Router>
          <Routes>
            <Route element={<PresistantLogin />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route element={<AuthExistance/>}>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/signup' element={<Signup/>}/>
                </Route>
                <Route path='/about' element={<About/>}/>
                <Route path='/products/:productCode' element={<ProductDetail/>}/>
                <Route path='/verify-email' element={<VerifyEmail/>}/>
                <Route path='/verify-email/:token' element={<VerifyEmailToken/>}/>
                <Route element={<RequireAuth allowedRoles={['user']}/>}>
                  <Route path='/success' element={<Success/>}/>
                  <Route path='/cancel' element={<Cancel/>}/>
                  <Route path='/cart' element={<CartPage/>}/>
                </Route>
                <Route path='/unauthorized' element={<Unauthorized/>}/>
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
            <Route path='*' element={<NotFound/>}></Route>
            </Route>
          </Routes>
        </Router>
      </MyProvider>
  );

};

export default App;