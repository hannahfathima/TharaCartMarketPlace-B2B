import './Navbar.scss';
import { FiDownload } from 'react-icons/fi';
import { IoHeartOutline, IoLocationOutline, IoSearchOutline } from 'react-icons/io5';
import { AiOutlineUser } from 'react-icons/ai';
import { GrCart } from 'react-icons/gr';
import { FaChevronDown } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import CategoriesMegaMenu from '../CategoriesMegaMenu/CategoriesMegaMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useCategories from '../../redux/hooks/HomePageHooks/useCategories';
import UseLoginedUser from '../../redux/hooks/NavbarHook/UseLoginedUser';
import useFetchAddress from '../../redux/hooks/checkoutPageHooks/useFetchAddress';
import baseUrl from '../../baseUrl';
import { FaBars } from "react-icons/fa6";
import { FaUserAlt } from 'react-icons/fa';
import useCartProduct from '../../redux/hooks/cartPageHooks/useCartProduct';

const Navbar = () => {
    const navigate = useNavigate();
    const [isCategoriesMenuVisible, setIsCategoriesMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);

    const toggleCategoriesMenu = () => {
        setIsCategoriesMenuVisible(!isCategoriesMenuVisible);
    };

    const { loginedUser, status: loginedStatus, isAuthTokenPresent } = UseLoginedUser();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const { categories, status, error } = useCategories();
    const { address, status: addressStatus, error: addressError, refetch: addressRefetch } = useFetchAddress()
    const { refetch, cartProduct, status:cartStatus, error:cartError } = useCartProduct(); // Include refetch


    useEffect(() => {
        console.log('categoriesss:', categories);
    }, [categories]);

    const mainCategories = categories?.filter(cat => cat.parentCategory === cat.id);

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            try {
                const response = await axios.get(`${baseUrl}/getSearchProd`, {
                    params: { q: query }
                });
                setSearchSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching search suggestions:', error);
                setSearchSuggestions([]);
            }
        } else {
            setSearchSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        navigate(`/search-result-page?query=${encodeURIComponent(suggestion.name)}`);
    };

    return (
        <div className="All-navbar">
            {isCategoriesMenuVisible && <CategoriesMegaMenu />}
            <div className='NavbarMainWrapper'>
                <div className="top-navbar">
                    <div className="top-left">
                        <Link to='/'><img src="/Images/tharacart-nav-logo.svg" alt="Logo" className="nav-logo" /></Link>
                    </div>
                    <div className="top-center">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder='Search...'
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <img src="/Images/nav-search.svg" alt="Search" />
                        </div>
                        {searchQuery.length > 0 && searchSuggestions.length > 0 && (
                            <div className="search-suggestions">
                                <ul>
                                    {searchSuggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                            {suggestion.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="top-right">
                        <div className="download-app" data-bs-toggle="dropdown" aria-expanded="false">
                            <Link><FiDownload className='nav-icon' /><span>Download App</span></Link>
                        </div>
                        <ul className="dropdown-menu dowlLoadDropDown">
                            <li><div className="downLoadText">Download Our Mobile App</div></li>
                            <li><a href=""><img src="/Images/appstore.svg" alt="" /></a></li>
                            <li><a href=""><img src="/Images/googleplay.svg" alt="" /></a></li>
                        </ul>
                        <div className="whishList">
                            <Link><IoHeartOutline className='nav-icon' /><span>My Wishlist</span></Link>
                        </div>
                        <div className="sign-in" data-bs-toggle="dropdown" aria-expanded="false">
                            <Link>
                                <AiOutlineUser className='nav-icon' />
                                {loginedStatus === 'loading' ? (
                                    <span>Loading...</span>
                                ) : isAuthTokenPresent && loginedUser ? (
                                    <span>{loginedUser.name}</span>
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </Link>
                        </div>
                        {loginedUser ? (
                            <ul className="dropdown-menu">
                                <li>
                                    <div className="sign-in-drop-item logoutBtn" onClick={handleLogout}><Link>Logout</Link></div>
                                </li>
                                <li>
                                    <Link to='/my-account'><div className="sign-in-drop-item">My Profile</div></Link>
                                </li>

                            </ul>
                        ) : (
                            <ul className="dropdown-menu">
                                <li>
                                    <div className="sign-in-drop-item"><Link to='/login'>Sign In</Link></div>
                                </li>
                                <li>
                                    <div className="sign-in-drop-item B2B"><Link>Sign In B2B</Link></div>
                                </li>
                                <li>
                                    <div className="sign-in-drop-item signUp"><Link to='/sign-up-with-email'>Sign Up</Link></div>
                                </li>
                            </ul>
                        )}
                        <div className="cart">
                        <Link to='/shopping-cart'><GrCart className='nav-icon' /></Link>
                            <div className="count">{cartProduct?.length}</div>
                        </div>
                    </div>
                </div>
                <div className="bottom-navbar">
                    <div className="bottom-nav-left">
                        <div className="category-dropdown" onClick={toggleCategoriesMenu}>
                            All Categories <FaChevronDown className={`down-icon ${isCategoriesMenuVisible ? "rotate" : ""}`} />
                        </div>
                    </div>
                    <div className="bottom-nav-center">
                        <div className="nav-main">
                            {mainCategories?.map(category => (
                                <div className="navlink" key={category.id}>
                                    <Link to={`/categories-page/${category.id}`} className='link'>
                                        {category.name || 'Unnamed Category'}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bottom-nav-right">
                        {
                            loginedUser?.length>0? (
                                <>
                                    <IoLocationOutline className='location' />
                                    <select name="" id="">
                                        {
                                            address?.map((data, index) =>
                                                <option value="" key={index}>{data.localArea} {data.pincode}</option>
                                            )
                                        }
                                    </select>
                                </>
                            ):(<></>)
                        }

                    </div>
                </div>
            </div>
            <div className="mobile-navbar-main">
                <div className="mobile-nav">
                        <div className="mob-nav-left">
                            <div className="search-bar">
                                <input type="text" placeholder='Search Products...'  value={searchQuery}
                                onChange={handleSearchChange} />
                                <IoSearchOutline className='lense-icon' />
                            </div>
                        </div>
                        {searchQuery.length > 0 && searchSuggestions.length > 0 && (
                            <div className="search-suggestions">
                                <ul>
                                    {searchSuggestions.map((suggestion, index) => (
                                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                            {suggestion.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                       
                        <div className="mob-nav-right">
                        <FaUserAlt className='user-icon' data-bs-toggle="dropdown" aria-expanded="false" />

                        <Link to='/shopping-cart'><GrCart className='cart-icon' /></Link>
                        <FaBars className='bars' />
                        </div>
                        {loginedUser ? (
                            <ul className="dropdown-menu">
                                <li>
                                    <div className="sign-in-drop-item logoutBtn" onClick={handleLogout}><Link>Logout</Link></div>
                                </li>
                                <li>
                                    <Link to='/my-account'><div className="sign-in-drop-item">My Profile</div></Link>
                                </li>

                            </ul>
                        ) : (
                            <ul className="dropdown-menu">
                                <li>
                                    <div className="sign-in-drop-item"><Link to='/login'>Sign In</Link></div>
                                </li>
                                <li>
                                    <div className="sign-in-drop-item B2B" ><Link>Sign In B2B</Link></div>
                                </li>
                                <li>
                                    <div className="sign-in-drop-item signUp"><Link to='/sign-up-with-email'>Sign Up</Link></div>
                                </li>
                            </ul>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
