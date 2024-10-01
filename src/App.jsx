import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignWithOTP from './Component/SignWithOTP/SignWithOTP';
import SignUpWithEmail from './Component/SignUpWithEmail/SignUpWithEmail';
import Otp from './Component/OTPsend/Otp';
import Signin from './Component/OTPverfication/Signin';
import HomePage from './Component/HomePage/HomePage';
import SearchresultSidebar from './Component/LeftMenuBar/SearchresultSidebar';
import ProductInnerPage from './Component/ProductInnerPage/ProductInnerPage';

import ShoppingCart from './Component/ShoppingCart/ShoppingCart';
import SearchResultPage from './Component/SearchResultPage/SearchResultPage';
import CheckOutPage from './Component/CheckoutPage/CheckOutPage';
import OrderCompletedPage from './Component/OrderCompletedPage/OrderCompletedPage';
import MyAccount from './Component/MyAccount/MyAccount';
import MyAccountSidebar from './Component/MyAcSlideBar/MyAccountSidebar';
import OrderInnerPageCancellation from './Component/OrderInnerPageCancellation/OrderInnerPageCancellation';
import OrderInnerPage from './Component/MyAccount/OrderInnerPage/OrderInnerPage';
import OrderInnerDelevered from './Component/MyAccount/MyAccountDeleverd/OrderInnerDelevered';
import CategoriesPage from './Component/CategoriesPage/CategoriesPage';
import TopDeals from './Component/TopDeals/TopDeals';
import LimitedTimeDeals from './Component/LimitedTimeDeals/LimitedTimeDeals';
import FeaturedBrands from './Component/FeaturedBrands/FeaturedBrands';
import TopStores from './Component/TopStores/TopStores';
import NewArrival from './Component/NewArivals/NewArrival';
import RecentlyViewed from './Component/RecentlyViewed/RecentlyViewed';
import BrandPage from './Component/BrandPage/BrandPage';
import ProtectedRoute from './Component/ProtectRoute';
import SellerStore from './Component/BrandStore/SellerStore';
import UseLoginedUser from './redux/hooks/NavbarHook/UseLoginedUser';
import useFetchAddress from './redux/hooks/checkoutPageHooks/useFetchAddress';
import SignInWithEmailB2b from './Component/SignInWinthEmailB2b/SignInWithEmailB2b';
import SignInWithEmailPersonalAddress from './Component/SignInWithEmailPersonalAddress/SignInWithEmailPersonalAddress';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/sign-with-otp' element={<SignWithOTP />} />
        <Route path='/sign-up-with-email' element={<SignUpWithEmail />} />
        <Route path='/otp-snd' element={<Otp />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/signIn-with-Email' element={<SignInWithEmailB2b />} />
        <Route path='/menubar' element={<SearchresultSidebar />} />
        <Route path='/sign-up-with-email-personal-detail' element={<SignInWithEmailPersonalAddress   />} />
        
        {/* Protected Routes */}
        <Route 
          path='/product-inner-page/:prodId' 
          element={<ProtectedRoute element={<ProductInnerPage />} />} 
        />
        <Route 
          path='/categories-page/:categoryId' 
          element={<ProtectedRoute element={<CategoriesPage />} />} 
        />
        <Route 
          path='/seller-store/:sellerId' 
          element={<ProtectedRoute element={<SellerStore />} />} 
        />
        <Route 
          path='/search-result-page' 
          element={<ProtectedRoute element={<SearchResultPage />} />} 
        />
        <Route 
          path='/shopping-cart' 
          element={<ProtectedRoute element={<ShoppingCart />} />} 
        />
        <Route 
          path='/checkOut-page' 
          element={<ProtectedRoute element={<CheckOutPage />} />} 
        />
        <Route 
          path='/order-completed-page/:orderId' 
          element={<ProtectedRoute element={<OrderCompletedPage />} />} 
        />
        <Route 
          path='/my-account' 
          element={<ProtectedRoute element={<MyAccount />} />} 
        />
        <Route 
          path='/side' 
          element={<ProtectedRoute element={<MyAccountSidebar />} />} 
        />
        <Route 
          path='/order-inner-cancellation' 
          element={<ProtectedRoute element={<OrderInnerPageCancellation />} />} 
        />
        <Route 
          path='/order-inner-page' 
          element={<ProtectedRoute element={<OrderInnerPage />} />} 
        />
        <Route 
          path='/order-inner-page-delivered' 
          element={<ProtectedRoute element={<OrderInnerDelevered />} />} 
        />
        <Route 
          path='/top-deals' 
          element={<ProtectedRoute element={<TopDeals />} />} 
        />
        <Route 
          path='/limited-time-deals' 
          element={<ProtectedRoute element={<LimitedTimeDeals />} />} 
        />
        <Route 
          path='/featured-brands' 
          element={<ProtectedRoute element={<FeaturedBrands />} />} 
        />
        <Route 
          path='/topStore-Page' 
          element={<ProtectedRoute element={<TopStores />} />} 
        />
        <Route 
          path='/new-arrival' 
          element={<ProtectedRoute element={<NewArrival />} />} 
        />
        <Route 
          path='/recently-viewed' 
          element={<ProtectedRoute element={<RecentlyViewed />} />} 
        />
        <Route 
          path='/brand-page' 
          element={<ProtectedRoute element={<BrandPage />} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
