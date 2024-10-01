import { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import './WhishList.scss'
import axios from 'axios';
import baseUrl from '../../../baseUrl';
import AddToCartAlert from '../../AddToCartAlert/AddToCartAlert';
import { useDispatch } from 'react-redux';
import { removeFromWishList } from '../../../redux/slices/cartSlices/removeWishlistProdSlice';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';
import useCartProduct from '../../../redux/hooks/cartPageHooks/useCartProduct';

const WhishList = ({ wishList, refetch }) => {
    const [selectedList, setSelectedList] = useState('yourList');
    const [cartAlertVisible, setCartAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('Item Added to Cart');
    const [searchTerm, setSearchTerm] = useState(''); // New state for search term
    const quantity = 1;
    const dispatch = useDispatch();
    const { refetch: cartRefetch, cartProduct } = useCartProduct();

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
            setTimeout(() => setCartAlertVisible(false), 4000);
        } catch (error) {
            console.log(error);
            setAlertMessage('Failed to add item to cart. Please try again.');
            setCartAlertVisible(true);
            setTimeout(() => setCartAlertVisible(false), 4000);
        }
    };

    const removeWishListProd = async (productId) => {
        try {
            await dispatch(removeFromWishList(productId));
            refetch();
        } catch (error) {
            console.log(error);
        }
    };

    // Filter the wishlist based on the search term
    const filteredWishList = wishList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='WhisListMainWrapper'>
            <AddToCartAlert
                visible={cartAlertVisible}
                onClose={() => setCartAlertVisible(false)}
                message={alertMessage}
            />
            <ScrollToTopOnMount />
            <div className="whislistSection">
                <div className="whishlist-main-card">
                    <div className="whishListHeader">
                        <div className={`lists ${selectedList === 'yourList' ? "active-list" : ""}`} onClick={() => setSelectedList('yourList')}>Your List</div>
                        <div className={`lists ${selectedList === 'sharedList' ? "active-list" : ""}`} onClick={() => setSelectedList('sharedList')}>Shared List</div>
                    </div>
                    {
                        selectedList === 'yourList' && (
                            <>
                                <div className="your-list-wrapper">
                                    <div className="your-list-left">
                                        <div className="list-item">
                                            <h4>Your Wishlist</h4>
                                            <button className='Default'>Default</button>
                                            <button>Private</button>
                                        </div>
                                        <div className="list-item">
                                            <h4>Wishlist 2</h4>
                                            <button>Private</button>
                                        </div>
                                    </div>
                                    <div className="your-list-right">
                                        <div className="your-list-right-header">
                                            <div>
                                                <h1>Your Wishlist</h1>
                                                <p>{filteredWishList.length} Products</p>
                                            </div>
                                            <div className='search-input'>
                                                <div className="searc-bar">
                                                    <CiSearch className='search-icon' />
                                                    <input
                                                        type="text"
                                                        placeholder='Search Product Name, TCIN'
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                                                    />
                                                </div>
                                                {/* <button>Search</button> */}
                                            </div>
                                        </div>
                                        <div className="whish-list-item-wrapper">
                                            {
                                                filteredWishList.map((data, index) => {
                                                    const totalRatings = data.oneRating + data.twoRating + data.threeRating + data.fourRating + data.fiveRating;
                                                    const averageRating = totalRatings > 0
                                                        ? ((1 * data.oneRating) + (2 * data.twoRating) + (3 * data.threeRating) + (4 * data.fourRating) + (5 * data.fiveRating)) / totalRatings
                                                        : 0;

                                                    const isInCart = cartProduct.some((cartItem) => cartItem.productId === data.productId);

                                                    const handleAddToCart = async (productId, quantity) => {
                                                        await addToCart(productId, quantity);
                                                        cartRefetch();
                                                    };

                                                    return (
                                                        <div className="whish-list-item row" key={index}>
                                                            <div className="col-lg-8 col-sm-12 wish-list-item-left">
                                                                <div className="prod-image">
                                                                    <img src={data.imageUrls} alt={data.name} />
                                                                </div>
                                                                <div className="prod-details">
                                                                    <p className="prod-description">{data.name}</p>
                                                                    <div className="price-details">
                                                                        <span className="offer-price">₹{data.offerPrice.toFixed(2)}</span>
                                                                        <span className="og-price">
                                                                            <strike>₹{data.price.toFixed(2)}</strike>
                                                                        </span>
                                                                        <span className="offer-ratio">
                                                                            {Math.round(((data.price - data.offerPrice) / data.price) * 100)}% OFF
                                                                        </span>
                                                                        <div className="rating-box">
                                                                            <FaRegStar className="star" />
                                                                            <span>{averageRating.toFixed(1)}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-sm-12 wish-list-item-right">
                                                                <div>
                                                                    {isInCart ? (
                                                                        <button className="go-to-cart">
                                                                            Go to Cart
                                                                        </button>
                                                                    ) : (
                                                                        <button className="add-two-cart" onClick={() => handleAddToCart(data.productId, 1)}>
                                                                            Add To Cart
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <button onClick={() => removeWishListProd(data.productId)}>Remove</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                                
                                            }
                                        </div>
                                        
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        selectedList == 'sharedList' && (
                            <>
                                <div className="your-list-wrapper">
                                    <div className="your-list-left">
                                        <div className="list-item">
                                            <h4>Your Shared List</h4>
                                            <button className='Default'>Default</button>
                                            <button>Private</button>
                                        </div>
                                        <div className="list-item">
                                            <h4>Shared List 2</h4>
                                            <button>Private</button>
                                        </div>
                                    </div>
                                    <div className="your-list-right">
                                        <div className="your-list-right-header">
                                            <div>
                                                <h1>Shared List</h1>
                                                <p>02 Products</p>
                                            </div>
                                            <div style={{ display: "flex", gap: "10px" }}>
                                            <div className='search-input'>
                                                <div className="searc-bar">
                                                    <CiSearch className='search-icon' />
                                                    <input type="text" placeholder='Search Product Name, TCIN' />
                                                </div>
                                                <button>Search</button>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="shared-item-wrapper">
                                            <div className="shared-item">
                                                <h1>Favourite Shirts</h1>
                                                <div className="shared-items-card-main">
                                                    <div className="shared-item-card"><img src="/Images/trend prod3.svg" alt="" /></div>
                                                    <div className="shared-item-card"><img src="/Images/trend prod3.svg" alt="" /></div>
                                                    <div className="shared-item-card"><img src="/Images/trend prod3.svg" alt="" /></div>
                                                    <div className="shared-item-card"><span>3 +</span></div>
                                                </div>
                                                <button><RiShareForwardLine className='share-icon' /> Share</button>
                                                <button>Remove</button>
                                            </div>
                                            <div className="shared-item">
                                                <h1>Favourite Shirts</h1>
                                                <div className="shared-items-card-main">
                                                    <div className="shared-item-card"><img src="/Images/trend prod3.svg" alt="" /></div>
                                                    <div className="shared-item-card"><img src="/Images/trend prod3.svg" alt="" /></div>
                                                    <div className="shared-item-card"><img src="/Images/trend prod3.svg" alt="" /></div>
                                                    <div className="shared-item-card"><span>3 +</span></div>
                                                </div>
                                                <button><RiShareForwardLine className='share-icon' /> Share</button>
                                                <button>Remove</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )

     }

                </div>
            </div>
        </div>
    )
}

export default WhishList;
