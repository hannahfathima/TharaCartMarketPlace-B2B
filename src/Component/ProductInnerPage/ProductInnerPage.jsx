import { useEffect, useState } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import './ProductInnerPage.scss';
import AddedFavAlert from '../AddedFavAlert/AddedFavAlert';
import AddToCartAlert from '../AddToCartAlert/AddToCartAlert';
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import useProductInnerDetails from '../../redux/hooks/ProductInnerPageHooks/useProductInnerDetails';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import UseLoginedUser from '../../redux/hooks/NavbarHook/UseLoginedUser';
import baseUrl from '../../baseUrl';
import useProductRating from '../../redux/hooks/ProductInnerPageHooks/useProductRating';
import useQna from '../../redux/hooks/ProductInnerPageHooks/useQna';
import Modal from '../ImageModal/ImageModal';
import useFetchAddress from '../../redux/hooks/checkoutPageHooks/useFetchAddress';
import useWishListProducts from '../../redux/hooks/cartPageHooks/useWishListProducts';
import useCartProduct from '../../redux/hooks/cartPageHooks/useCartProduct';
import { removeFromWishList } from '../../redux/slices/cartSlices/removeWishlistProdSlice';

import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/slices/cartSlices/removeCartItemSlice';



const ProductInnerPage = () => {
  const { prodId } = useParams()
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartAlertVisible, setCartAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Item Added to Cart');
  const [favAlertVisible, setFavAlertVisible] = useState(false);
  const [faveAlertMessage, setFavAlertMessage] = useState('Product Moved to Wishlist');
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const { status: removeWishListItemStatus, error: removeWishListItemError } = useSelector(state => state.removeWishListItem);

  const [userReview, setUserReview] = useState({
    review: '',
    comment: ''
  }); // Updated state
  const handleImageClick = (url) => {
    setModalImage(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };











  const getProduct = async () => {
    try {
      const cachedProduct = localStorage.getItem(`productDetails_${prodId}`);
      const cachedProductTimestamp = JSON.parse(localStorage.getItem(`productDetailsTimestamp_${prodId}`));

      let productDetails;
      let shouldFetch = true;

      if (cachedProduct && cachedProductTimestamp) {
        if (Date.now() - cachedProductTimestamp < 24 * 60 * 60 * 1000) {
          productDetails = JSON.parse(cachedProduct);
          setProductDetails(productDetails);
          shouldFetch = false;
        }
      }

      if (shouldFetch) {
        const res = await axios.get(`${baseUrl}/getProductInnerDetails?pId=${prodId}`);
        productDetails = res.data.productDetails;
        console.log('Fetched from API:', productDetails);

        localStorage.setItem(`productDetails_${prodId}`, JSON.stringify(productDetails));
        localStorage.setItem(`productDetailsTimestamp_${prodId}`, JSON.stringify(Date.now()));

        setProductDetails(productDetails);

      }

      const visitedProducts = JSON.parse(localStorage.getItem('visitedProducts')) || [];
      const lastUpdated = JSON.parse(localStorage.getItem('visitedProductsLastUpdated')) || Date.now();

      if (Date.now() - lastUpdated > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('visitedProducts');
      }

      localStorage.setItem('visitedProductsLastUpdated', JSON.stringify(Date.now()));

      if (!visitedProducts.find(product => product.prodId === prodId)) {
        if (visitedProducts.length >= 10) {
          visitedProducts.shift();
        }
        visitedProducts.push({
          prodId: prodId,
          details: productDetails
        });

        localStorage.setItem('visitedProducts', JSON.stringify(visitedProducts));
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError(error);
      setLoading(false);
    }
  };
  const { loginedUser, status, error: loginedUserError } = UseLoginedUser();
  const { productRatings, status: productRatingStatus, error: productRatingError } = useProductRating();
  const { qna, status: qnaStatus, error: qnaError } = useQna();
  const { address, status: addressStatus, error: addressError, refetch: addressRefetch } = useFetchAddress()



  useEffect(() => {
    if (productRatingStatus === 'succeeded') {
      console.log('Product Ratings:', productRatings);


    } else {
      console.log('No data available yet or fetch failed.');
    }
  }, [productRatingStatus, productRatings]);








  useEffect(() => {
    if (prodId) {
      getProduct();

      if (loginedUser) {
        console.log(loginedUser.customDocId);
      } else {
        console.log("loginedUser is undefined or null");
      }
    }
  }, [prodId, loginedUser]);

  const quantity = 1;




  const { wishListProduct, status: wishlisStatus, error: wishlistError, refetch: wishListRefetch } = useWishListProducts();
  const { refetch, cartProduct, status: cartProdStatus, error: cartProderror } = useCartProduct(); // Include refetch
  // Check if the product is in the cart
  useEffect(() => {
    if (cartProduct && cartProdStatus === 'succeeded') {
      const productInCart = cartProduct.some(item => item.productId === prodId);
      setIsInCart(productInCart); // Update the state based on cart data
    }
  }, [cartProduct, cartProdStatus, prodId]);
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

      // Post request to add the product to the cart
      const res = await axios.post(
        `${baseUrl}/add-to-cart`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setAlertMessage('Item Added to Cart');
        refetch();
      } else {
        setAlertMessage('Unexpected response. Please try again.');
      }

      setCartAlertVisible(true);
      setTimeout(() => setCartAlertVisible(false), 4000);

      // Optionally, refetch the cart data or update local cart state here
      // refetchCart(); // if you have a refetch function for cart data
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setAlertMessage('Failed to add item to cart. Please try again.');
      setCartAlertVisible(true);
      setTimeout(() => setCartAlertVisible(false), 4000);
    }
  };
  useEffect(() => {
    if (wishlisStatus === 'succeeded' && wishListProduct) {
      const isProductInWishlist = wishListProduct.some(item => item.productId === prodId);
      setIsInWishlist(isProductInWishlist); // Update the state based on wishlist data
    }
  }, [wishlisStatus, wishListProduct, prodId]);




  const addToWishList = async (productId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setFavAlertMessage('Authentication error. Please log in.');
        setFavAlertVisible(true);
        setTimeout(() => setFavAlertVisible(false), 4000);
        return;
      }

      const res = await axios.post(
        `${baseUrl}/add-to-wishlist`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setFavAlertMessage('Product Moved to Wishlist');
        setIsInWishlist(true); // Update state to show filled heart icon
        wishListRefetch(); // Optionally refetch the wishlist to sync the state
      } else if (res.status === 400) {
        setFavAlertMessage('Product already in wishlist');
        setIsInWishlist(true); // Assuming product is already in wishlist, set filled heart
      }
      setFavAlertVisible(true);
      setTimeout(() => setFavAlertVisible(false), 4000);
    } catch (error) {
      setFavAlertMessage('Failed to move item to wishlist. Please try again.');
      setFavAlertVisible(true);
      setTimeout(() => setFavAlertVisible(false), 4000);
    }
  };

  const currentUrl = encodeURIComponent(window.location.href);
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productDetails.name,
        text: 'Check out this product!',
        url: currentUrl,
      })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in your browser. Please use one of the share links below.');
    }
  };







  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching product details: {error.message}</div>;
  }
  const getAverageRating = (details) => {
    const { oneRating, twoRating, threeRating, fourRating, fiveRating } = details;

    const totalRatings = oneRating + twoRating + threeRating + fourRating + fiveRating;
    const weightedSum = (1 * oneRating) + (2 * twoRating) + (3 * threeRating) + (4 * fourRating) + (5 * fiveRating);

    const averageRating = totalRatings === 0 ? 0 : (weightedSum / totalRatings).toFixed(1);

    return averageRating;
  };
  const currentDate = new Date();
  const deliveryDate = new Date();
  deliveryDate.setDate(currentDate.getDate() + 7);

  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const formattedDate = deliveryDate.toLocaleDateString('en-US', options);
  const averageRating = getAverageRating(productDetails);
  const totalReviews = productDetails.oneRating + productDetails.twoRating + productDetails.threeRating + productDetails.fourRating + productDetails.fiveRating;
  const {
    oneRating,
    twoRating,
    threeRating,
    fourRating,
    fiveRating
  } = productDetails;
  const totalVotes = oneRating + twoRating + threeRating + fourRating + fiveRating;
  const weightedTotal =
    oneRating * 1 +
    twoRating * 2 +
    threeRating * 3 +
    fourRating * 4 +
    fiveRating * 5;

  const avgScore = totalVotes ? (weightedTotal / totalVotes).toFixed(1) : 0;

  // Function to calculate progress bar width
  const getProgressBarWidth = (ratingCount) => {
    return totalVotes ? `${(ratingCount / totalVotes) * 100}%` : '0%';
  };
  const selectImage = (imageIndex) => {
    setSelectedImage(imageIndex);
  };
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      try {
        const response = await axios.post(`${baseUrl}/upload-images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const imageUrls = response.data.imageUrls;
        setSelectedImages(imageUrls);
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    }
  };
  const handleRatingChange = (newRating) => {
    setSelectedRating(newRating); // Updated to use selectedRating
  };

  const reference = `/${productDetails.reference._path.segments[0]}/${productDetails.reference._path.segments[1]}/${productDetails.reference._path.segments[2]}/${productDetails.reference._path.segments[3]}`
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        productId: prodId,
        customerId: loginedUser.customDocId, // Replace with actual customer ID
        rating: selectedRating,
        comment: userReview.comment,
        mediaUrl: selectedImages.map(url => ({
          type: 'image',
          url
        })),
        reference: reference, // Ensure this matches your backend expectations
        review: userReview.review
      };

      console.log('Sending payload:', payload);

      const response = await axios.post(`${baseUrl}/add-rating`, payload);
      console.log('Response:', response.data);

      alert('Rating added successfully!');

      // Optionally reset the form fields
      setUserReview({ review: '', comment: '' });
      setSelectedImages([]);
      setSelectedRating(0);

    } catch (error) {
      console.error('Error adding rating:', error.response ? error.response.data : error.message);

      // Display an appropriate error message to the user
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        alert('An error occurred while submitting your rating. Please try again.');
      }
    }
  };
  const removeWishListProd = async (productId) => {
    try {
      await dispatch(removeFromWishList(productId));
      wishListRefetch();
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className='ProductInnerPageMailWrapper'>
      <Navbar />
      <div className="product-inner-page">
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

        <div className="product-page-left">
          <div className="product-sub-images-container">
            {productDetails.imageUrls.map((data, index) => (
              <div
                key={index}
                className={`product-sub-image ${selectedImage === index ? "activeImg" : ''}`}
                onClick={() => selectImage(index)}
              >
                <img src={data} alt="" />
              </div>
            ))}
          </div>
          <div className="selected-image-container">
            <img src={productDetails.imageUrls[selectedImage]} alt="" />

            {/* Conditionally render the heart icon based on isInWishlist */}
            {isInWishlist ? (
              <IoIosHeart
                className='fav-icon filled'
                style={{ color: "red" }}
                onClick={() => removeWishListProd(prodId)}
              />

            ) : (
              <IoIosHeartEmpty className='fav-icon' onClick={() => addToWishList(prodId)} />
            )}

            <RiShareForwardLine className='share-icon' onClick={handleShare} />
          </div>

        </div>
        <div className="product-page-right">
          <p className="product-discription">
            {productDetails.name}
          </p>
          <div className="brand">
            <p>Brand</p>
            <p className='brand-vlue'>{productDetails.brandDetails.brandName}</p>
          </div>
          <div className="rating-wrapper">
            <div className="rating-container">
              <FaRegStar className='star-icon' />
              <span>{averageRating}</span>
            </div>
            <span className='rating-count'>({totalReviews} Ratings)</span>
          </div>
          <div className="price-wrapper">
            <h2 className="price">₹{productDetails.offerPrice.toFixed(2)}</h2>
            <p className='crossed-price'><strike>₹{productDetails.price.toFixed(2)}</strike></p>
            <p className="gst">Incl. GST</p>
            <p className="offer-text">{Math.round(productDetails.discountPercentage)}% OFF</p>
            <p className='saved-perc'>You Save ₹{productDetails.price - productDetails.offerPrice}</p>
          </div>
          {/* <div className="weight-packaging">
            <div className="weight-wrapper">
              <p>Weight</p>
              <div className="grams">
                <div className="gram-column">100g</div>
                <div className="gram-column disabled-gram">200g</div>
                <div className="gram-column active-gram">500g</div>
              </div>
            </div>
            <div className="weight-wrapper">
              <p>Packaging</p>
              <div className="grams">
                <div className="gram-column">Mix</div>
                <div className="gram-column disabled-gram">Glass Jar</div>
                <div className="gram-column active-gram">Paper</div>
              </div>
            </div>
          </div> */}
          <div className="delivery-details-card">
            <div className="delivery-left">
              <p>Deliver To</p>
              <select name="" id="">
                {address?.map((data, index) =>
                  <option value="" key={index}>{data.localArea} {data.pincode}</option>
                )}
              </select>
              <div><button className='buy-btn'>Buy Now</button></div>
              <div style={{ marginTop: "1rem" }}>
                <span>Sold By :</span> <Link to={`/seller-store/${productDetails.sellerDetails.sellerId}`} style={{ textDecoration: "none" }}><span style={{ color: "#02400C" }}>{productDetails.sellerDetails.name}</span></Link>
              </div>
              <div>
                <span>Ship by :</span> <span style={{ color: "#02400C" }}>Thara Cart</span>
              </div>
            </div>
            <div className="delivery-right">
              <p className="order-time">Order Before 5PM, Today</p>
              <p className="del-date">Expect Delivery by {formattedDate}</p>

              {/* Conditionally render the button based on whether the product is in the cart */}
              {isInCart ? (
                <Link to="/shopping-cart">
                  <button className="addTocartBtn">Go to Cart</button>
                </Link>
              ) : (
                <button className="addTocartBtn" onClick={() => addToCart(prodId, quantity)}>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
          <div className="register-now-card">
            <img src="/Images/Vector (1).png" className='star-logo' alt="" />
            <div className="reg-left">
              <div><span style={{ fontWeight: "700" }}>Save up to 15%</span> <span>with Business Account</span></div>
              <div><p>You’ll get Wholesale Price & GST Input tax credit</p></div>
            </div>
            <div className="reg-right">
              <button>Register Now</button>
            </div>
          </div>
          <div className="highlight-about-product-wrapper">
            {
              productDetails.highlights || productDetails.about && (
                <>
                  <h3>Highlights</h3>
                  <ul>
                    <li>The story of each pisang product starts from a hill station or plantation in the outskirts of Kerala. Our plantations are placed at locations where there is plenty of water and good soil to support the growth of the crops.</li>
                    <li>The seeds have a warm, slightly pungent, and highly aromatic flavour. However, this little spice has a lot more to offer than simply flavour. For centuries, it has been used in traditional medicine to relieve a multitude of illnesses. These tiny pods of cardamom enclose not just a strong characteristic flavour, but also loads of health benefits.</li>
                  </ul>
                  <h3>About Product</h3>
                  <p>The story of each pisang product starts from a hill station or plantation in the outskirts of Kerala. Our plantations are placed at locations where there is plenty of water and good soil to support the growth of the crops.Cultivated and procured at regular intervals to meet market demands, our team does maintain enough stock to ensure proper flow. We also ensure that products are freshly delivered to our customers.</p>
                </>
              )
            }
          </div>
          <div className="delivery-detail-card-wrapper">
            <div className='delivery-card'>
              <img src="/Images/money-bag 1 (1).png" alt="" />
              <p>Cash On Delivery</p>
            </div>
            <div className='delivery-card'>
              <img src="/Images/box 1 (1).png" alt="" />
              <p>Thara Cart Delivery</p>
            </div>
            <div className='delivery-card'>
              <img src="/Images/box 2.png" alt="" />
              <p>7 Day Replacable</p>
            </div>
            <div className='delivery-card'>
              <img src="/Images/box 1 (1).png" alt="" />
              <p>Thara Cart Delivery</p>
            </div>
            <div className='delivery-card'>
              <img src="/Images/money-bag 1 (1).png" alt="" />
              <p>Cash On Delivery</p>
            </div>
          </div>
          <h2 className='more-details-heading'>More Details</h2>
          <div className="accordion" id="accordionExample">
            {/* <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  In The Box
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <span>1 Pack of Cardamom</span>
                </div>
              </div>
            </div> */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  General Details
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <table>
                    <tr>
                      <td>Brand</td>
                      <th>{productDetails.brandDetails.brandName}</th>
                    </tr>
                    {productDetails.breadth && (
                      <tr>
                        <td>Breadth</td>
                        <th>{productDetails.breadth} cm</th>
                      </tr>
                    )}
                    {productDetails.height && (
                      <tr>
                        <td>Height</td>
                        <th>{productDetails.height} cm</th>
                      </tr>
                    )}
                    {Object.keys(productDetails.features).map((key) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <th>{productDetails.features[key].value}</th>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
            {/* <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Manufacturing, Packaging and Import Info
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div> */}
            {/* <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                  Cooking Instruction
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div> */}
            {/* <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  Legal Disclaimer
                </button>
              </h2>
              <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div> */}
          </div>
          <div className="rating-and-reviews-wrapper">
            <div className="rating-section">
              <h2>Ratings & Reviews</h2>
              <div className="rating-detail-wrapper">
                <div className="rating-star-count">
                  <div><p>{avgScore}</p></div>
                  <div className='rating-stars'>
                    {Array.from({ length: 5 }, (_, index) => {
                      const starValue = index + 1;
                      return (
                        <span key={index}>
                          {avgScore >= starValue
                            ? <FaStar className='fill-star-rated' />
                            : avgScore >= starValue - 0.5
                              ? <FaRegStarHalfStroke className='fill-star-rated' />
                              : <FaStar className='unfilled-star' />
                          }
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="rating-progress-bar">
                  <div className="individual-rate">
                    <span>5</span>
                    <FaStar className='fill-star-rated' />
                    <div className="progress-bar-main">
                      <div className="collapse-inner"
                        style={{
                          width: getProgressBarWidth(fiveRating),
                          height: '9px',
                          backgroundColor: '#02400C',
                          borderRadius: '12px'
                        }}>
                      </div>
                    </div>
                  </div>
                  <div className="individual-rate">
                    <span>4</span>
                    <FaStar className='fill-star-rated' />
                    <div className="progress-bar-main">
                      <div className="collapse-inner"
                        style={{
                          width: getProgressBarWidth(fourRating),
                          height: '9px',
                          backgroundColor: '#02400C',
                          borderRadius: '12px'
                        }}>
                      </div>
                    </div>
                  </div>
                  <div className="individual-rate">
                    <span>3</span>
                    <FaStar className='fill-star-rated' />
                    <div className="progress-bar-main">
                      <div className="collapse-inner"
                        style={{
                          width: getProgressBarWidth(threeRating),
                          height: '9px',
                          backgroundColor: '#02400C',
                          borderRadius: '12px'
                        }}>
                      </div>
                    </div>
                  </div>
                  <div className="individual-rate">
                    <span>2</span>
                    <FaStar className='fill-star-rated' />
                    <div className="progress-bar-main">
                      <div className="collapse-inner"
                        style={{
                          width: getProgressBarWidth(twoRating),
                          height: '9px',
                          backgroundColor: '#02400C',
                          borderRadius: '12px'
                        }}>
                      </div>
                    </div>
                  </div>
                  <div className="individual-rate">
                    <span>1</span>
                    <FaStar className='fill-star-rated' />
                    <div className="progress-bar-main">
                      <div className="collapse-inner"
                        style={{
                          width: getProgressBarWidth(oneRating),
                          height: '9px',
                          backgroundColor: '#02400C',
                          borderRadius: '12px'
                        }}>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rating-buttons">
                  <div><button data-bs-toggle="modal" data-bs-target="#RateProductModal">Rate The Product</button></div>
                  <button data-bs-toggle="modal" data-bs-target="#ReportProductModal">Report</button>
                </div>
                {/* <!-- RateProductModal --> */}
                <div className="modal fade" id="RateProductModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content rating-modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Review Product</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                          <h3 className='rate-product-heading'>Product Details</h3>
                          <div className="rateproduct-prod-detail">
                            <div className="prod-image"><img src={productDetails.imageUrls} alt="" /></div>
                            <div className="prod-details">
                              <h4>{productDetails.name}</h4>
                              <p>{formattedDate}</p>
                              <span>TCIN : SFNM109898</span>
                            </div>
                          </div>
                          <div className="rating-stars">
                            {Array.from({ length: 5 }, (_, index) => {
                              const starValue = index + 1;
                              return (
                                <span key={index} onClick={() => handleRatingChange(starValue)}>
                                  {selectedRating >= starValue
                                    ? <FaStar className='fill-star-rated' />
                                    : selectedRating >= starValue - 0.5
                                      ? <FaRegStarHalfStroke className='fill-star-rated' />
                                      : <FaStar className='not-fill-star-rated' />
                                  }
                                </span>
                              );
                            })}
                          </div>
                          <div className="add-rating-image-section">
                            <h5>Add Photos or Videos</h5>
                            <div className="selected-image-wrapper">
                              <div className="file-upload">
                                <input
                                  type="file"
                                  id="file"
                                  className="file-input"
                                  multiple
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                                <label htmlFor="file" className="file-label">
                                  <span className="plus-sign">+</span>
                                </label>
                              </div>
                              {selectedImages.length > 0 &&
                                selectedImages.map((image, index) => (
                                  <div className="selected-image" key={index}>
                                    <img src={image} alt={`Selected ${index + 1}`} />
                                  </div>
                                ))}
                            </div>
                          </div>
                          <h2 className="avg-prod-text">Why is it an average product?</h2>
                          <div className="prod-comment-wrapper">
                            <div><label htmlFor="review">Review</label></div>
                            <input
                              type="text"
                              id="review"
                              value={userReview.review} // Updated to use userReview.review
                              onChange={(e) => setUserReview(prevState => ({
                                ...prevState,
                                review: e.target.value
                              }))} // Updated to set review
                            />
                          </div>
                          <div className="prod-comment-wrapper">
                            <div><label htmlFor="comment">Write Comments (Optional)</label></div>
                            <textarea
                              id="comment"
                              value={userReview.comment} // Updated to use userReview.comment
                              onChange={(e) => setUserReview(prevState => ({
                                ...prevState,
                                comment: e.target.value
                              }))} // Updated to set comment
                            ></textarea>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="submit" className="btn btn-primary">Apply Ratings</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* <!-- ReportProductModal --> */}
                <div className="modal fade" id="ReportProductModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Report Product</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <h4 className="what-is-issue-heading">What is the issue?</h4>
                        <div className="issue-list">
                          <div className="radio-group">
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}> <input type="radio" id="option1" name="radio" className="radio-input" />
                              <label htmlFor="option1" className="radio-label">Incorrect Informations</label> </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}> <input type="radio" id="option1" name="radio" className="radio-input" />
                              <label htmlFor="option1" className="radio-label">Counterfeit Products</label> </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}> <input type="radio" id="option1" name="radio" className="radio-input" />
                              <label htmlFor="option1" className="radio-label">Copyright & Trademarks violation</label> </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}> <input type="radio" id="option1" name="radio" className="radio-input" />
                              <label htmlFor="option1" className="radio-label">Others</label> </div>
                          </div>
                        </div>
                        <div className="comment-section">
                          <p>Any Comments</p>
                          <textarea name="" id=""></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button>Submit Report</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {productRatings?.message ? (
              // Display the message if there is no data
              <span className='noRevew'>{productRatings.message}</span>
            ) : (
              // Display the reviews if productRatings is an array
              productRatings?.map((data, index) => (
                <div className="review-section" key={index}>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < data.rating ? 'fill-star-rated' : 'fill-star-rated not-fill'}
                      />
                    ))}
                  </div>
                  <p className='review-title'>{data.review}</p>
                  <div className="user-details">
                    <p>{data.userDetails.name}</p>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <img src="/Images/Icon.png" alt="" />
                      <p>Verified Purchase</p>
                    </div>
                  </div>
                  <p className="rate-discription">{data.comment}</p>
                  <div className="review-image-section">
                    {data.mediaUrl?.map((url, index) => (
                      <div className="review-image" key={index} onClick={() => handleImageClick(url.url)}>
                        <img src={url.url} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
            <Modal isOpen={isModalOpen} onClose={closeModal} imageUrl={modalImage} />



            <div className="seeMoreReviewBtn"><button>See More Reviews</button></div>
          </div>
          <div className="faq-section-wrapper">
            <div className="faq-head"><h2>Questions & Answers</h2></div>
            <div className="listOfQstns">
              {
                qna?.map((data) =>
                  <>
                    <div className='qstn' style={{ display: "flex", gap: "5px" }}>
                      <span>Q :</span>
                      <span>{data.question}</span>
                    </div>
                    <div className='anser' style={{ display: "flex", gap: "5px" }}>

                      {data.answers.map((data) =>
                        <>
                          <span>A :</span>
                          <span>{data.ans}</span>
                        </>
                      )}
                    </div>
                    <p className="user">{data.customerDetails.name}</p>
                  </>
                )
              }
              {/* <div className='qstn' style={{ display: "flex", gap: "5px" }}>
                <span>Q :</span>
                <span>From which coutry Indomie is imported</span>
              </div> */}
              {/* <p className="first-answer">
                Be the first one to asnswer
              </p> */}
            </div>
            <div className="seemore-faq-btn">
              <button>See More Q&A</button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductInnerPage;