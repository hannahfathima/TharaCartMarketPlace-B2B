import './LimitedTimeDeals.scss';
import SearchresultSidebar from '../LeftMenuBar/SearchresultSidebar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navbar from '../Navbar/Navbar';
import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import Footer from '../Footer/Footer';
import useLimitedTimeDeals from '../../redux/hooks/HomePageHooks/useLimitedTimeDeal';
import useLimitedOfferProducts from '../../redux/hooks/LimitedTimeHook/useLimitedOfferProducts';

const LimitedTimeDeals = () => {
    const [sort, setSort] = useState('Low to High');
    const sliderRef = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,     
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const { limitedTimeDeals: limitedTimeDealsBanner, status: limitedTimeDealsBannerStatus, error: limitedTimeDealsBannerError } = useLimitedTimeDeals();
    const { limitedTimeDealProducts: limitedTimeDealsProducts, status: limitedTimeDealsProductsStatus, error: limitedTimeDealsProductsError } = useLimitedOfferProducts();

    useEffect(() => {
        console.log('limitedTimeDeals :', limitedTimeDealsProducts);
    }, [limitedTimeDealsProducts]);

    const calculateTimeRemaining = (endDate) => {
        const now = new Date();
        const end = new Date(endDate.seconds * 1000);
        const timeDiff = end - now;

        if (timeDiff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

        const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
        const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    };

    const [timeRemaining, setTimeRemaining] = useState({});

    useEffect(() => {
        const updateTimer = () => {
            const updatedTimes = {};
            limitedTimeDealsProducts.forEach(product => {
                updatedTimes[product.id] = calculateTimeRemaining(product.limitedTimeEndDate);
            });
            setTimeRemaining(updatedTimes);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [limitedTimeDealsProducts]);

    if (limitedTimeDealsBannerStatus === 'loading' || limitedTimeDealsProductsStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (limitedTimeDealsBannerStatus === 'failed') {
        return <div>Error: {limitedTimeDealsBannerError}</div>;
    }
    if (limitedTimeDealsProductsStatus === 'failed') {
        return <div>Error: {limitedTimeDealsProductsError}</div>;   
    }


    
    return (
        <div className='LimitedTimeDealsMainWrapper'>
            <div className="LimitedTimeDealsWrapper">
                <Navbar />
                <div className="TopDeals-left"><SearchresultSidebar /></div>
                <div className="TopDeals-right">
                    <h2 className='top-deals-heading'><img src="/Images/chevron-down.png" alt="" /> Limited Time Deals</h2>
                    <div className="carousel-section">
                        <Slider {...settings}>
                            {limitedTimeDealsBanner.map((data, index) =>
                                <div key={index}>
                                    <div className="top-deals-image">
                                        <img src={data.image[0]} alt="" />
                                        <div className="time-count">
                                            Ends in {String(timeRemaining[data.id]?.hours || 0).padStart(2, '0')}:
                                            {String(timeRemaining[data.id]?.minutes || 0).padStart(2, '0')}:
                                            {String(timeRemaining[data.id]?.seconds || 0).padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Slider>
                    </div>
                    <div className="selectBox-section">
                        <div className="sort-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Sort : Price -</span>
                            <FaAngleDown className='downAngle' />
                        </div>
                        <ul className="dropdown-menu sort-dropdown-result">
                            <li><a className="dropdown-item" >Low to High</a></li>
                            <li><a className="dropdown-item" >High to Low</a></li>
                        </ul>
                        <div className="sort-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Brand</span>
                            <FaAngleDown className='downAngle' />
                        </div>
                        <ul className="dropdown-menu sort-dropdown-result">
                            <li><a className="dropdown-item" >sdfsdfgs</a></li>
                            <li><a className="dropdown-item" >sdfgsdfsdf</a></li>
                        </ul>
                        <div className="sort-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Availability</span>
                            <div className="count">2</div>
                            <FaAngleDown className='downAngle' />
                        </div>
                        <ul className="dropdown-menu sort-dropdown-result">
                            <li><a className="dropdown-item" >sdfsdfgs</a></li>
                            <li><a className="dropdown-item" >sdfgsdfsdf</a></li>
                        </ul>
                        <div className="sort-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Rating</span>
                            <div className="count">2</div>
                            <FaAngleDown className='downAngle' />
                        </div>
                        <ul className="dropdown-menu sort-dropdown-result">
                            <li><a className="dropdown-item" >sdfsdfgs</a></li>
                            <li><a className="dropdown-item" >sdfgsdfsdf</a></li>
                        </ul>
                    </div>
                    <div className="products-list-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                {limitedTimeDealsProducts.map((data, index) =>
                                    <div className="col-lg-3" key={index}>
                                        <div className="prod-card">
                                            <div className="prod-image">
                                                <img src={data.imageUrls[0]} alt={data.name} />
                                            </div>
                                            <div className="card-time-count-down-box">
                                                {String(timeRemaining[data.id]?.hours || 0).padStart(2, '0')}hr : 
                                                {String(timeRemaining[data.id]?.minutes || 0).padStart(2, '0')}min : 
                                                {String(timeRemaining[data.id]?.seconds || 0).padStart(2, '0')}sec
                                            </div>
                                            <h5 className="prodDiscription">{data.name}</h5>
                                            <span className='offerPrice'>₹{data.sellingPrice}</span>
                                            <span className="ogPrice"><strike>₹{data.price}</strike></span>
                                            <span className="offer-text">
                                                {Math.round(((data.price - data.sellingPrice) / data.price) * 100)}% OFF
                                            </span>
                                            <div><button>Add to Cart</button></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LimitedTimeDeals;
