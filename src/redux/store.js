import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/HomePageSlice/categorySlice';
import topDealsReducer from './slices/HomePageSlice/topDealsSlice';
import limitedTimeDealsReducer from './slices/HomePageSlice/limitedTimeDealsSlice';
import featuredBrandsReducer from './slices/HomePageSlice/featuredBrandSlice';
import topStoresReducer from './slices/HomePageSlice/topStoreSlice';
import newArrivalsReducer from './slices/HomePageSlice/newArrivalSlice';
import featuredProductsReducer from './slices/HomePageSlice/featuresProductSlice';
import topBrandReducer from './slices/HomePageSlice/topBrandSlice';
import fetchProductInnerDetails from './slices/productInnerSlice/productInnerSlice';
import topDealsProductsReducer from './slices/topDealsSlice/topDealsProductSlice';
import brandsReducer from './slices/topDealsSlice/getBrandSlice';
import fetchLimitedTimeProductsReducer from './slices/LimitedTimeOfferSlice/LimitedOfferProductSlice';
import fetchFeaturedBrandProductReducer from './slices/FeaturedBrandProductsSlice/featuredBrandProductSlice';
import fetchTopStoresProductReducer from './slices/topStoresProductSlice/topStoresProductSlice';
import fetchNewArrivalsProdReducer from './slices/NewArrivalsProd/NewArrivalsProdSlice';
import userReducer from './slices/NavbarSlice/LoginedUserSlice';
import fetchProductRatingsReducer from './slices/productInnerSlice/productRatingsSlice';
import fetchQnaReducer from './slices/productInnerSlice/QnaSlice';
import cartProductReducer from './slices/cartSlices/cartProductSlice';

import fetchBrandPageReducer from './slices/BrandPageSlice/BrandPageSlice';
import fetchAllProductsReducer from './slices/AllproductsSlice/allProductsSlice';
import fetchSellerStoreProdReducer from './slices/SellerStoreSlice/SellerStoreSlice';
import fetchSellerStoreBrandReducer from './slices//SellerStoreSlice/sellersBrandSlice';
import fetchSellerStorePagenationReducer from './slices/SellerStoreSlice/SellerStorePagenation';
import fetchSellerReducer from './slices/SellerStoreSlice/sellerSlice';

import fetchSearchSuggestionsReducer from './slices/Search/SliceSuggestions';

import cartReducer from './slices/cartSlices/removeCartItemSlice';
import WishListReducer from './slices/cartSlices/removeWishlistProdSlice';
import updateCartQuantityReducer from './slices/cartSlices/updateQuantity';
import WishListProductReducer from './slices/cartSlices/wishListProdSlice';
import addressReducer from './slices/checkoutPageSlice/fetchAddressSlice';
import fetchuserReducer from './slices/myAccountSlice/fetchUserSlice';
import fetchOneSellerReducer from './slices/SellerStoreSlice/fetchOneSellerSlice';




export const store = configureStore({
  reducer: {
    //NAVBAR
    loginedUser: userReducer,
    //HOME PAGE
    category: categoryReducer,
    topDeals: topDealsReducer,
    limitedTimeDeals: limitedTimeDealsReducer,
    featuredBrands: featuredBrandsReducer,
    topStores: topStoresReducer,
    newArrivals: newArrivalsReducer,
    featuredProducts: featuredProductsReducer,
    topBrand: topBrandReducer,
    //PRODUCT INNER PAGE
    productInnerDetails: fetchProductInnerDetails,
    productRatings: fetchProductRatingsReducer,
    qna: fetchQnaReducer,
    //TOP DEALS PAGE
    topDealsProducts: topDealsProductsReducer,
    brands: brandsReducer,
    // LIMITED TIME DEALS PAGE//
    limitedTimeDealProducts: fetchLimitedTimeProductsReducer,
    featuredBrandProduct: fetchFeaturedBrandProductReducer,
    topStoresProduct: fetchTopStoresProductReducer,
    newArrivalsProduct: fetchNewArrivalsProdReducer,
    //CART PAGE
    cartProduct: cartProductReducer,
    removeCartItem: cartReducer,
    removeWishListItem: WishListReducer,
    updateCartQuantity: updateCartQuantityReducer,
    wishListProduct: WishListProductReducer,
    //CHECKOUT PAGE
    address: addressReducer,
    //MY ACCOUNT
    user: fetchuserReducer,
    //SELLER STORE PAGE
    BrandPage: fetchBrandPageReducer,
    AllProducts: fetchAllProductsReducer,
    SellerStoreProducts: fetchSellerStoreProdReducer,
    SellerStoreBrands: fetchSellerStoreBrandReducer,
    SellerStorePagenation: fetchSellerStorePagenationReducer,
    sellers: fetchSellerReducer,
    oneSeller:fetchOneSellerReducer,

    suggestions: fetchSearchSuggestionsReducer,






  },
});

export default store;
