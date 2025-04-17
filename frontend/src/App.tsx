import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes/routes';
import WelcomePage from './pages/WelcomePage/WelcomePage';


import './App.css';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Layout from './components/Layout/Layout';
import AppLayout from './components/AppLayout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import CartPage from './pages/CartPage/CartPage';
import OrderPage from './pages/OrderPage/OrderPage';

import { CartProvider } from './context/CartContext/CartContext';
// import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
            <Route path={ROUTES.SIGN_IN} element={<SigninPage />} />
            <Route path={ROUTES.SIGN_UP} element={<SignupPage />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
            <Route path={ROUTES.ORDERS} element={<OrderPage />} />
          </Route>
          {/* <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          <Route path={ROUTES.HOME} element={<HomePage />} /> */}
        </Routes>
      </Router >
    </CartProvider>
  );
}

export default App;
