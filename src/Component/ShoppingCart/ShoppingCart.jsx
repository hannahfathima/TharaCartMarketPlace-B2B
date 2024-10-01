import { useEffect, useState } from 'react';
import './ShoppingCart.scss'
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import useCartProduct from '../../redux/hooks/cartPageHooks/useCartProduct';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/slices/cartSlices/removeCartItemSlice';
import { removeFromWishList } from '../../redux/slices/cartSlices/removeWishlistProdSlice';
import { updateCartQuantity } from '../../redux/slices/cartSlices/updateQuantity';
import CustomAlert from '../ConfirmAlert/ConfirmAlert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AddedFavAlert from '../AddedFavAlert/AddedFavAlert';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import useWishListProducts from '../../redux/hooks/cartPageHooks/useWishListProducts';
import AddToCartAlert from '../AddToCartAlert/AddToCartAlert';
import { Link } from 'react-router-dom';
import UseLoginedUser from '../../redux/hooks/NavbarHook/UseLoginedUser';


const ShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);
  const [favAlertVisible, setFavAlertVisible] = useState(false);
  const [faveAlertMessage, setFavAlertMessage] = useState('Product Moved to Wishlist');
  const [cartAlertVisible, setCartAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Item Added to Cart');
  const dispatch = useDispatch();
  const { status: removeItemStatus, error: removeItemError } = useSelector(state => state.removeCartItem);
  const { status: removeWishListItemStatus, error: removeWishListItemError } = useSelector(state => state.removeWishListItem);
  const { loginedUser } = UseLoginedUser();

  const { refetch, cartProduct, status, error } = useCartProduct(); // Include refetch
  const { wishListProduct, status: wishlisStatus, error: wishlistError, refetch: wishListRefetch } = useWishListProducts(); // Include refetch
  useEffect(() => {
    if (wishListProduct) {
      console.log('wishListProduct', wishListProduct);
    }


  }, [wishListProduct])
  const subtotal = cartProduct?.reduce((acc, item) => acc + item.offerPrice * item.quantity, 0) || 0;

  const handleRemove = (productId) => {
    setProductIdToRemove(productId);
    setShowAlert(true);
  };

  const handleConfirm = async () => {
    if (productIdToRemove) {
      try {
        await dispatch(removeFromCart(productIdToRemove)).unwrap();
        refetch();
      } catch (error) {
        console.error('Failed to remove item:', error);
      }
    }
    setShowAlert(false);
  };
  const removeWishListProd = async (productId) => {
    try {
      await dispatch(removeFromWishList(productId));
      wishListRefetch();
    } catch (error) {
      console.log(error);

    }
  }
  const handleCancel = () => {
    setShowAlert(false);
  };
  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await dispatch(updateCartQuantity({ productId, quantity })).unwrap();
      refetch(); // Refetch cart data after quantity update
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };
  const addToWishList = async (productId) => {
    try {
      console.log(productId);
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        setFavAlertMessage('Authentication error. Please log in.');
        setFavAlertVisible(true);
        setTimeout(() => setFavAlertVisible(false), 4000);
        return;
      }
      const res = await axios.post(`${baseUrl}/add-to-wishlist`, { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response Status:', res.status);
      if (res.status === 200) {
        setFavAlertMessage('Product Moved to Wishlist');
        wishListRefetch();
      } else if (res.status === 400) {
        setFavAlertMessage('Product already in wishlist');
      }
      setFavAlertVisible(true);
      setTimeout(() => setFavAlertVisible(false), 4000);
    } catch (error) {
      console.log('Error caught:', error);
      setFavAlertMessage('Failed to move item to wishlist. Please try again.');
      setFavAlertVisible(true);
      setTimeout(() => setFavAlertVisible(false), 4000);
    }
  };
  const quantity = 1;
  const addToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error('No token found');
        setAlertMessage('Authentication error. Please log in.');
        setCartAlertVisible(true);
        setTimeout(() => setCartAlertVisible(false), 3000);
        return;
      }

      const res = await axios.post(
        `${baseUrl}/add-to-cart`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      setAlertMessage('Item Added to Cart');
      setCartAlertVisible(true);
      refetch();
      setTimeout(() => setCartAlertVisible(false), 4000);
    } catch (error) {
      console.log(error);
      setAlertMessage('Failed to add item to cart. Please try again.');
      setCartAlertVisible(true);
      setTimeout(() => setCartAlertVisible(false), 4000);
    }
  };

  if (status === 'loading' || wishlisStatus == 'loading') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw'
        }}
      >
        <CircularProgress className='loading' />
      </Box>
    );
  }
  if (loginedUser.length == 0) {
    return (
      <>
        <div>Please Login </div>
        <div><Link><button>Login</button></Link></div>
      </>
    )
  }
  if (status == 'failed') {
    return <div>{error}</div>
  }
  if (wishlisStatus == 'failed') {
    return <div>{wishlistError}</div>
  }

  return (
    <div className='shoppingCartMainWrapper'>
      <AddedFavAlert
        visible={favAlertVisible}
        onClose={() => setFavAlertVisible(false)}
        message={faveAlertMessage}
      />
      <AddToCartAlert
        visible={cartAlertVisible}
        onClose={() => setCartAlertVisible(false)}
        message={alertMessage}
      />
      <ScrollToTopOnMount />
      <Navbar />
      <div className="container-fluid"  id='cart'>
        <div className="shopping-cart-page row">
          <div className="col-lg-8 shopping-cart-left">
            <h3 className="cart-heading">Your Cart ({cartProduct?.length})</h3>
            <div className="register-card">
              <div className="reg-card-left">
                <img src="/Images/Vector (1).png" alt="" />
                <p className="save-text">Save up to 15% with Business Account</p>
                <span>You’ll get Wholesale Price & GST Input tax credit</span>
              </div>
              <div className="reg-card-right">
                <button>Register Now</button>
              </div>
            </div>
            {/* =======================cart-items===================== */}
            <div className="cart-items-main">
              {
                cartProduct?.length > 0 ? (
                  cartProduct?.map((data, index) =>
                    <div className="cart-item row" key={index}>
                      <div className="col-lg-8 cart-item-left">
                        <div className="image-description-wrapper">
                          <div className="prod-image"><img src={data.imageUrls} alt="" /></div>
                          <div className="discription">
                            <p>{data.name}</p>
                            <span className='brand'>Brand</span>
                            <span className="brand-value">{data.brandDetails.brandName}</span>
                            <span className="orderd-buy">Sold by</span>
                            <span className="ordered-by-value">{data.sellerDetails.storedetails.storename}</span>
                          </div>
                        </div>
                        <div className="count-section">
                          <div className="calculator">
                            <div className="decrement" onClick={() => handleUpdateQuantity(data.productId, data.quantity - 1)}><FaMinus className='count-icon' /></div>
                            <div className="count"><span>{data.quantity}</span></div>
                            <div className="increment"
                              onClick={() => data.quantity < data.b2cMaxQty
                                ? handleUpdateQuantity(data.productId, data.quantity + 1)
                                : null}
                              style={{ cursor: data.quantity >= data.b2cMaxQty ? 'not-allowed' : 'pointer', opacity: data.quantity >= data.b2cMaxQty ? 0.5 : 1 }}>
                              <FaPlus className='count-icon' />
                            </div>

                          </div>
                          <p onClick={() => addToWishList(data.productId)}><FaRegHeart className='fav-icon' />Save for Later</p>
                          <p onClick={() => handleRemove(data.productId)} disabled={removeItemStatus === 'loading'}>Remove</p>
                        </div>
                      </div>
                      <div className="col-lg-4 cart-item-right">
                        <div>
                          <span className="offer-price">₹{data.offerPrice.toFixed(2)}</span>
                          <span className="og-price"><strike>₹{data.price.toFixed(2)}</strike></span>
                          <span className="gst">Incl. GST</span>
                        </div>
                        <div>
                          <span className='offer-ratio'>{((data.price - data.offerPrice) / data.price * 100).toFixed(0)}% OFF</span>
                          <span className='saved-amt'>You Save ₹{(data.price - data.offerPrice).toFixed(2)}</span>
                        </div>

                      </div>
                    </div>
                  )
                ) : (<><p className='No-Data'>No Data In Your Products</p></>)
              }
              {showAlert && (
                <CustomAlert
                  message="Are you sure you want to remove this item from the cart?"
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                />
              )}
            </div>

            {/* ======================================whislist-section================================== */}
            <div className="whishlist-section-main">
              <div className="whist-list-collapse" onClick={() => setIsOpen(!isOpen)}>
                <span><FaRegHeart className='fav-icon' /> My Wishlist</span>
                <FaChevronDown className={`down-arrow ${isOpen ? "up-arrow" : ''}`} />
              </div>
              <div className={`collapse-content whist-lisdt-item-main ${isOpen ? 'collapse-opened' : ""}`}>
              {wishListProduct?.length > 0 ? (
  wishListProduct.map((data, index) => {
    const isInCart = cartProduct?.some(cartItem => cartItem.productId === data.productId); // Check if item is in cart

    return (
      <div className="whishlist-item cart-item row" key={index}>
        <div className="col-lg-8 cart-item-left">
          <div className="image-description-wrapper">
            <div className="prod-image"><img src={data.imageUrls} alt="" /></div>
            <div className="discription">
              <p>{data.name}</p>
              <span className='brand'>Brand</span>
              <span className="brand-value">{data.brandDetails.brandName}</span>
              <span className="orderd-buy">Sold by</span>
              <span className="ordered-by-value">{data.sellerDetails.storedetails.storename}</span>
            </div>
          </div>
          <div className="count-section">
            {isInCart ? (
             <a href="#cart"> <p>Go to Cart</p></a>
            ) : (
              <p onClick={() => addToCart(data.productId, quantity)}>Move to Cart</p>
            )}
            <p onClick={() => removeWishListProd(data.productId)}>Remove</p>
          </div>
        </div>
        <div className="col-lg-4 cart-item-right">
          <div>
            <span className="offer-price">₹{data.offerPrice.toFixed(2)}</span>
            <span className="og-price"><strike>₹{data.price.toFixed(2)}</strike></span>
            <span className="gst">Incl. GST</span>
          </div>
          <div>
            <span className='offer-ratio'>{((data.price - data.offerPrice) / data.price * 100).toFixed(0)}% OFF</span>
            <span className='saved-amt'>You Save ₹{(data.price - data.offerPrice).toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  })
) : (<><p>No Data In Your WishList</p></>)}

              </div>
            </div>
          </div>
          <div className="col-lg-4 shopping-cart-right">
            <div className="order-summery-card">
              <h4>Order Summary</h4>
              <div className="order-details">
                <table>
                  <tr>
                    <td className='left-td'>Sub Total</td>
                    <td className='right-td total'>₹{subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className='left-td'>Shipping Charges</td>
                    <td className='right-td'><span className='crossed-price'><strike>₹40.00</strike> | </span> <span className='free-dlvry-text' >Free Delivery</span></td>
                  </tr>
                  <tr>
                    <td className='left-td'>Coupon Discount</td>
                    <td className='right-td'><span className='discount'>-₹50.00</span></td>
                  </tr>
                </table>
                <img src="/Images/Line 39.png" alt="" />
                <table>
                  <tr>
                    <td className='left-td totel-price-text'>Total</td>
                    <td className='right-td total-price'>₹{(subtotal - 50).toFixed(2)}</td>  {/* Subtotal minus discount */}
                  </tr>
                </table>
                <img src="/Images/Line 40.png" alt="" />
                <p className='saved-count'>You can save up to ₹140 on this order</p>
                <Link to='/checkOut-page'> <button className='checkoutBtn'>Proceed to Checkout</button></Link>
              </div>
              <div className="secured-transaction-container">
                <img src="/Images/fi_1746680454848.png" alt="" />
                <h6>256 bit Secured Transactions</h6>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ShoppingCart
