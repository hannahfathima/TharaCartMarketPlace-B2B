import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { FaArrowRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useCategories from '../../redux/hooks/HomePageHooks/useCategories';
import useTopDeals from '../../redux/hooks/HomePageHooks/useTopDeals';
import useLimitedTimeDeal from '../../redux/hooks/HomePageHooks/useLimitedTimeDeal';
import useFeacturedBrand from '../../redux/hooks/HomePageHooks/useFeacturedBrand';
import useTopStores from '../../redux/hooks/HomePageHooks/useTopStores';
import useNewArrival from '../../redux/hooks/HomePageHooks/useNewArrival';
import useFeaturedProducts from '../../redux/hooks/HomePageHooks/useFeaturedProducts';
import useTopBrand from '../../redux/hooks/HomePageHooks/useTopBrand';


const HomePage = () => {
  // const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [timers, setTimers] = useState({});
  const [hotCategory, setHotCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const { categories, status: categoriesStatus, error: categoriesError } = useCategories();
  const { topDeals, status: topDealsStatus, error: topDealsError } = useTopDeals();
  const { limitedTimeDeals, status: limitedTimeDealsStatus, error: limitedTimeDealsError } = useLimitedTimeDeal();
  const { featuredBrands, status: featuredBrandsStatus, error: featuredBrandsError } = useFeacturedBrand();
  const { topStores, status: topStoresStatus, error: topStoresError } = useTopStores();
  const { newArrivals, status: newArrivalsStatus, error: newArrivalsError } = useNewArrival();
  const { featuredProducts, status: featuredProductsStatus, error: featuredProductsError } = useFeaturedProducts();
  const { topBrand, status: topBrandStatus, error: topBrandError } = useTopBrand();

  useEffect(() => {
    const filteredCategories = categories.filter((data) => data.id === data.parentCategory);
    setHotCategory(filteredCategories);

  }, [categories]);
  // console.log('sdfhgsdhfdshb',featuredProducts[0]);



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true, // Allow free scrolling     
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 6,
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

  const hotCatSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true, // Allow free scrolling     
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };
  const topDealsSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    swipeToSlide: true, // Allow free scrolling     
    responsive: [
      {
        breakpoint: 1499,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const featuredBrandsSettigs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    swipeToSlide: true, // Allow free scrolling     
    responsive: [
      {
        breakpoint: 1499,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const newArrivalSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    swipeToSlide: true, // Allow free scrolling     
    responsive: [
      {
        breakpoint: 1499,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const topBrandsSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    swipeToSlide: true, // Allow free scrolling     
    responsive: [
      {
        breakpoint: 1499,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
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
  const calculateAverageRating = (ratings) => {
    const { oneRating, twoRating, threeRating, fourRating, fiveRating } = ratings;

    const totalRatings = oneRating + twoRating + threeRating + fourRating + fiveRating;

    // If there are no ratings, return 0 or a default value
    if (totalRatings === 0) return 0;

    const averageRating = (
      (oneRating * 1) +
      (twoRating * 2) +
      (threeRating * 3) +
      (fourRating * 4) +
      (fiveRating * 5)
    ) / totalRatings;

    return averageRating.toFixed(1); // Rounded to 1 decimal place
  };
  const calculateAverageRatingVisited = (ratings) => {
    const { oneRating, twoRating, threeRating, fourRating, fiveRating } = ratings;

    const totalRatings = oneRating + twoRating + threeRating + fourRating + fiveRating;

    // If there are no ratings, return 0 or a default value
    if (totalRatings === 0) return 0;

    const averageRating = (
      (oneRating * 1) +
      (twoRating * 2) +
      (threeRating * 3) +
      (fourRating * 4) +
      (fiveRating * 5)
    ) / totalRatings;

    return averageRating.toFixed(1); // Rounded to 1 decimal place
  };


  // Memoize the deals to avoid unnecessary recalculations
  const memoizedDeals = useMemo(() => {
    return limitedTimeDeals.map(deal => ({
      ...deal,
      startDate: deal.startDate, // Assuming startDate is already a Firestore timestamp
      endDate: deal.endDate,     // Assuming endDate is already a Firestore timestamp
    }));
  }, [limitedTimeDeals]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimers = {};
      memoizedDeals.forEach(product => {
        const startDate = new Date(product.startDate._seconds * 1000 + product.startDate._nanoseconds / 1000000);
        const endDate = new Date(product.endDate._seconds * 1000 + product.endDate._nanoseconds / 1000000);
        const now = new Date().getTime();

        if (!isNaN(startDate) && !isNaN(endDate)) {
          if (now >= startDate && now <= endDate) {
            const distance = endDate - now;
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            newTimers[product.id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          } else if (now < startDate) {
            newTimers[product.id] = 'Starts soon';
          } else {
            newTimers[product.id] = '00:00:00';
          }
        } else {
          newTimers[product.id] = 'Invalid date';
        }
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [memoizedDeals]);
  const getVisitedProducts = () => {
    // Retrieve the 'visitedProducts' from localStorage
    const visitedProductsJson = localStorage.getItem('visitedProducts');

    // Parse the JSON string into an array of objects
    let visitedProducts = [];
    if (visitedProductsJson) {
      visitedProducts = JSON.parse(visitedProductsJson);
    }

    return visitedProducts;
  };
  const visitedProducts = getVisitedProducts();

  if (categoriesStatus === 'loading' || topDealsStatus === 'loading' || limitedTimeDealsStatus === 'loading' || featuredBrandsStatus === 'loading' || topStoresStatus === 'loading' || newArrivalsStatus === 'loading' || featuredProductsStatus === 'loading' || topBrandStatus === 'loading') {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  // Handle error state for both categories and topDeals
  if (categoriesStatus === 'failed') {
    return <div>Error: {`Error Fetching Category Data${categoriesError}`}</div>;
  }

  if (topDealsStatus === 'failed') {
    return <div>Error: {`Error Fetcing Top Deals${topDealsError}`}</div>;
  }
  if (limitedTimeDealsStatus === 'failed') {
    return <div>Error: {limitedTimeDealsError}</div>;
  }
  if (featuredBrandsStatus === 'failed') {
    return <div>Error: {featuredBrandsError}</div>;
  }
  if (topStoresStatus === 'failed') {
    return <div>Error: {topStoresError}</div>;
  }
  if (newArrivalsStatus === 'failed') {
    return <div>Error: {newArrivalsError}</div>;
  }
  if (featuredProductsStatus === 'failed') {
    return <div>Error: {featuredProductsError}</div>;
  }
  if (topBrandStatus === 'failed') {
    return <div>Error: {topBrandError}</div>;
  }


  return (
    <div className='HomePageMailWrapper'>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress style={{ color: "#02400C" }} />
        </Box>
      ) : (
        <>
          <Navbar />
          <div className="HomePageHero">
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>

              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="/Images/Home Page Banner Celbrate BG.svg" className="d-block w-100" alt="..." />
                  <img src="/Images/Hero-MobilePhoneBg.svg" alt="" className="mobile-pick" />
                  <div className="hero-content">
                    <h2>Download Our App</h2>
                    <h1>Get Welcome Offer 10%* OFF</h1>
                    <p>*Offer is only available for first time app users. T&C apply.</p>
                    <div className="play-apple">
                      <img src="/Images/googleplay.svg" alt="" />
                      <img src="/Images/appstore.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="/Images/Home Page Banner Celbrate BG.svg" className="d-block w-100" alt="..." />
                  <img src="/Images/Hero-MobilePhoneBg.svg" alt="" className="mobile-pick" />
                  <div className="hero-content">
                    <h2>Download Our App</h2>
                    <h1>Get Welcome Offer 10%* OFF</h1>
                    <p>*Offer is only available for first time app users. T&C apply.</p>
                    <div className="play-apple">
                      <img src="/Images/googleplay.svg" alt="" />
                      <img src="/Images/appstore.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="/Images/Home Page Banner Celbrate BG.svg" className="d-block w-100" alt="..." />
                  <img src="/Images/Hero-MobilePhoneBg.svg" alt="" className="mobile-pick" />
                  <div className="hero-content">
                    <h2>Download Our App</h2>
                    <h1>Get Welcome Offer 10%* OFF</h1>
                    <p>*Offer is only available for first time app users. T&C apply.</p>
                    <div className="play-apple">
                      <img src="/Images/googleplay.svg" alt="" />
                      <img src="/Images/appstore.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="/Images/Home Page Banner Celbrate BG.svg" className="d-block w-100" alt="..." />
                  <img src="/Images/Hero-MobilePhoneBg.svg" alt="" className="mobile-pick" />
                  <div className="hero-content">
                    <h2>Download Our App</h2>
                    <h1>Get Welcome Offer 10%* OFF</h1>
                    <p>*Offer is only available for first time app users. T&C apply.</p>
                    <div className="play-apple">
                      <img src="/Images/googleplay.svg" alt="" />
                      <img src="/Images/appstore.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================product-banner-section========================== */}
          <div className="product-banner-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4">
                  <div className="product-banner"><img src="/Images/product-banner1.svg" alt="" /></div>
                </div>
                <div className="col-lg-4">
                  <div className="product-banner"><img src="/Images/product-banner2.svg" alt="" /></div>
                </div>
                <div className="col-lg-4">
                  <div className="product-banner"><img src="/Images/product-banner3.svg" alt="" /></div>
                </div>
              </div>
            </div>
          </div>
          {/* =====================================Hot-categories================================ */}
          <div className="hot-categories-wrapper">
            <h2>Hot Categories</h2>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
              </Box>
            ) : hotCategory.length === 0 ? (
              <p>No Data</p>
            ) : (
              // <div className="hotCategoryWrapper">
                <Slider {...hotCatSettings}>
                {hotCategory.map(product => (
                  <div key={product.id}>
                    <Link className='link'>
                      <div className="hot-cat-card">
                        <img src={product.categoryIcon} alt={product.name} />
                      </div>
                    </Link>
                    <p>{product.name}</p>
                  </div>
                ))}
                </Slider>
              // </div>
            )}
          </div>
          {/* =====================================Hot-categories================================ */}
          {/* ========================================top-deals-section============================== */}
          <section id="top-deals">
            <div className="top-deals">
              <div className="deals-headng-wrapper">
                <h2 className="top-deals-heading">Top Deals</h2>
                <Link to='/top-deals'><span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span></Link>
              </div>
              {topDeals.length === 0 ? (<p>No top Deals</p>) : (
                // <div className="topdealsMainCarouselWrapper">
                 <Slider {...topDealsSettings}>
                 {topDeals.map(product => (
                    <div key={product.id}>
                      <Link className='link'>
                        <div className="top-deal-card">
                          <img src={product.bannerUrl} alt={product.id} />
                        </div></Link>
                    </div>
                  ))}
                 </Slider>
                // </div>
              )}

            </div>
          </section>
          {/* ========================================top-deals-section============================== */}
          {/* ===========================================limited-time-offer================================ */}
          <section id="limited-time-deals-section">
            <div className="top-deals">
              <div className="deals-headng-wrapper">
                <h2 className="top-deals-heading">Limited Time Offer</h2>
                <Link to='/limited-time-deals'>
                  <span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span>

                </Link>
              </div>
              <Slider ref={sliderRef} {...topDealsSettings}>
                {limitedTimeDeals.map(product => (
                  <div key={product.id}>
                    <Link className='link'>
                      <div className="top-deal-card limited-time-deals-card">
                        <div className="limited-time-deal-img-container">
                          <img src={product.image} alt={product.id} />
                          <div className="timer">
                            <span>Ends in  {timers[product.id]}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
          {/* ===========================================limited-time-offer================================ */}
          {/* ===============================================featured-brands================================= */}
          <section id="featuredBrands">
            <div className="top-deals">
              <div className="deals-headng-wrapper">
                <h2 className="top-deals-heading">Featured Brands</h2>
                <Link to='/featured-brands'>
                  <span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span>
                </Link>
              </div>
              <Slider ref={sliderRef} {...featuredBrandsSettigs}>
                {featuredBrands.map(product => (
                  <div key={product.id}>
                    <Link className='link'>
                      <div className="top-deal-card featuredBrandsCard">
                        <div className="featuredBrandImage">
                          <img src={product.image} alt={product.id} />
                          {product.selectedBrandDetails.length > 0 && (
                            <div className="indomei-container">
                              <div className="ad">AD</div>
                              <div className="indomie-image">
                                <img src={product.selectedBrandDetails[0].brandLogo} alt={product.selectedBrandDetails[0].brandName} />
                              </div>
                              <div className="indomie-text">
                                {product.selectedBrandDetails[0].brandName}
                                <FaAngleRight className='rightAngle' />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
          {/* ===============================================featured-brands================================= */}
          {/* ==================================================top-stores-section================================ */}
          <section id="top-stores">
            <div className="top-deals">
              <div className="deals-headng-wrapper">
                <h2 className="top-deals-heading">Top Stores</h2>
                <Link to='/topStore-Page'>
                <span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span>
                </Link>
              </div>
              <Slider ref={sliderRef} {...topDealsSettings}>
                {topStores.map(product => (
                  <div key={product.id}>
                    <Link className='link'>
                      <div className="top-deal-card limited-time-deals-card">
                        <div className="limited-time-deal-img-container">
                          <img src={product.image} alt={product.id} />
                          <div className="timer tharaonline">
                            <span>{product.sellerData.storedetails.storename}</span>
                          </div>
                        </div>
                      </div></Link>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
          {/* ==================================================top-stores-section================================ */}
          {/* ====================================new-arrivals========================== */}
          <section id="newArrivals">
            <div className="top-deals">
              <div className="deals-headng-wrapper">
                <h2 className="top-deals-heading">New Arrivals</h2>
                <span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span>
              </div>
              {/* <div className="newArivalCardWrapper"> */}
              <Slider {...newArrivalSettings}>
              {newArrivals.map(product => (
                  <div key={product.id}>
                    <Link className='link'>
                      <div className="newArrivals-card ">
                        <img src={product.image} alt={product.id} />
                      </div></Link>
                  </div>
                ))}
              </Slider>
              {/* </div> */}
            </div>
          </section>
          {/* ====================================new-arrivals========================== */}
          {/* ================================featured prod========================== */}
          <div className="trending-products featured-products">
            <div className="deals-headng-wrapper">
              <h2 className="top-deals-heading">Featured Products</h2>
              <span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span>
            </div>
            <div className="trending-product-card-wrapper">
              <div className="featuredProdCardWrapper">
                {featuredProducts.map(product => {
                  const averageRating = calculateAverageRating(product);
                  const sellingPrice = parseFloat(product.sellingPrice).toFixed(2);
                  const originalPrice = parseFloat(product.price).toFixed(2);

                  return (
                    <div key={product.id}>
                      <Link className='link' to={`/product-inner-page/${product.productId}`}>
                        <div className="trending-card">
                          <div className="featuredProdImage">
                            <img src={product.imageUrls} alt={product.name} />
                          </div>
                          <div className="rating-box">
                            <FaRegStar className='ratingStar' />
                            <span>{averageRating}</span>
                          </div>
                          <div className="best-seller-box">
                            Best Seller
                          </div>
                          <h6>
                            Sold By <strong>{product.sellerDetails.storedetails.storename}</strong>
                          </h6>
                          <p>{product.name}</p>
                          <span className='price'>₹ {product.offerPrice.toFixed(2)}</span>
                          <span className='crossed-price'>
                            <strike>₹ {originalPrice}</strike>
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* ================================Top Brands========================== */}
          {/* ===================================top-brands-section========================== */}
          <section id="top-brands-section">
            <div className="top-deals">
              <div className="deals-headng-wrapper">
                <h2 className="top-deals-heading">Top Brands</h2>
                <span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span>
              </div>
              <Slider ref={sliderRef} {...topBrandsSettings}>
                {topBrand.map(product => (
                  <div key={product.id}>
                    <Link className='link'>
                      <div className="top-brand-card">
                        <div className="top-brand-image">  <img src={product.brandLogo} alt={product.id} /></div>
                        <h6>{product.brandName}</h6>
                        <p>Upto 20% OFF </p>
                      </div></Link>

                  </div>
                ))}
              </Slider>
            </div>
          </section>
          {/* ===================================top-brands-section========================== */}
          {/* =======================================discount-for-you-section========================= */}
          <section id="discount-for-you-section">
            <div className="top-deals">
              <div className="deals-headng-wrapper">
                <h2 className="top-deals-heading">Discounts For You</h2>
                <span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span>
              </div>
              <Slider ref={sliderRef} {...topDealsSettings}>
                <div>
                  <div className="recoment-card rcmnt-card1">
                    <h3>Spices</h3>
                    <span>Up to 25% OFF</span>
                    <img src="/Images/Frame 1261154613.png" alt="" />
                  </div>
                </div>
                <div>
                  <div className="recoment-card rcmnt-card2">
                    <h3>Noodles</h3>
                    <span>Up to 25% OFF</span>
                    <img src="/Images/Frame 1261154613.png" alt="" />
                  </div>
                </div>
                <div>
                  <div className="recoment-card rcmnt-card3">
                    <h3>Oils</h3>
                    <span>Up to 25% OFF</span>
                    <img src="/Images/Frame 1261154613.png" alt="" />
                  </div>
                </div>
                <div>
                  <div className="recoment-card rcmnt-card3">
                    <h3>Sweets</h3>
                    <span>Up to 25% OFF</span>
                    <img src="/Images/Frame 1261154613.png" alt="" />
                  </div>
                </div>
                <div>
                  <div className="recoment-card rcmnt-card3">
                    <h3>Chocolates</h3>
                    <span>Up to 25% OFF</span>
                    <img src="/Images/Frame 1261154613.png" alt="" />
                  </div>
                </div>
              </Slider>
              <Slider ref={sliderRef} {...topDealsSettings}>
                <div>
                  <div className="recoment-card rcmnt-card1">
                    <h3>Spices</h3>
                    <span>Up to 25% OFF</span>
                    <img src="/Images/Frame 1261154613.png" alt="" />
                  </div>
                </div>
                <div>
                  <div className="recoment-card rcmnt-card2">
                    <h3>Noodles</h3>
                    <span>Up to 25% OFF</span>
                    <img src="/Images/Frame 1261154613.png" alt="" />
                  </div>
                </div>
                <div>
                  <div className="recoment-card rcmnt-card3">
                    <h3>Oils</h3>
                    <span>Up to 25% OFF</span>
                    <img src="/Images/Frame 1261154613.png" alt="" />
                  </div>
                </div>
                <div>
                  <div className="recoment-card rcmnt-card3">
                    <h3>Sweets</h3>
                    <span>Up to 25% OFF</span>
                    <img src="/Images/Frame 1261154613.png" alt="" />
                  </div>
                </div>
                <div>
                  <div className="recoment-card rcmnt-card3">
                    <h3>Chocolates</h3>
                    <span>Up to 25% OFF</span>
                    <img src="/Images/Frame 1261154613.png" alt="" />
                  </div>
                </div>
              </Slider>
            </div>
          </section>
          {/* =======================================discount-for-you-section========================= */}
          {/* ===========================================recently-viwed================================ */}
          <div className="trending-products">
            <div className="deals-headng-wrapper">
              <h2 className="top-deals-heading">Recently Viewed</h2>
              <Link to='/recently-viewed'> <span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span></Link>
            </div>
            <div className="trending-product-card-wrapper">
              {/* <div className="carousel-next-btn-wrapp">
                <img src="/Images/carousel-next.svg" alt="" className='carousel-next-button' onClick={CarouseNext} />
              </div> */}
              {/* <Slider ref={sliderRef} {...settings}> */}
              <div className="recently">
                {visitedProducts.map(product => {
                  const averageRating = calculateAverageRatingVisited(product.details);
                  const sellingPrice = parseFloat(product.details.sellingPrice).toFixed(2);
                  const originalPrice = parseFloat(product.details.price).toFixed(2);

                  return (
                    <div key={product.id}>
                      <Link className='link' to={`/product-inner-page/${product.productId}`}>
                        <div className="trending-card">
                          <div className="featuredProdImage">
                            <img src={product.details.imageUrls} alt={product.details.name} />
                          </div>
                          <div className="rating-box">
                            <FaRegStar className='ratingStar' />
                            <span>{averageRating}</span>
                          </div>
                          <div className="best-seller-box">
                            Best Seller
                          </div>
                          <h6>
                            Sold By <strong>{product.details.sellerDetails.storedetails.storename}</strong>
                          </h6>
                          <p>{product.name}</p>
                          <span className='price'>₹ {sellingPrice}</span>
                          <span className='crossed-price'>
                            <strike>₹ {originalPrice}</strike>
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              {/* </Slider> */}
            </div>
          </div>
          {/* ===========================================recently-viwed================================ */}
          {/* ===========================================Buy Again================================ */}
          {/* <div className="trending-products">
            <div className="deals-headng-wrapper">
              <h2 className="top-deals-heading">Buy Again</h2>
              <span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span>
            </div>
            <div className="trending-product-card-wrapper">
              <div className="carousel-next-btn-wrapp">
                <img src="/Images/carousel-next.svg" alt="" className='carousel-next-button' onClick={CarouseNext} />
              </div>
              <Slider ref={sliderRef} {...settings}>
                {products.map(product => (
                  <div key={product.id}>
                    <Link className='link'>
                      <div className="trending-card">
                        <img src={product.image} alt={product.name} />
                        <div className="rating-box">
                          <FaRegStar className='ratingStar' />
                          <span>4.3</span>
                        </div>
                        <div className="best-seller-box">
                          Best Seller
                        </div>
                        <h6>Sold By <strong>Thara Tading Pvt Ltd</strong></h6>
                        <p>{product.name}</p>
                        <span className='price'>{product.regularPrice}</span>
                        <span className='crossed-price'><strike>{product.price}</strike></span>
                      </div></Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div> */}
          {/* ===========================================Buy Again================================ */}
          {/* ===========================================Recommend================================ */}
          {/* <div className="trending-products">
            <div className="deals-headng-wrapper">
              <h2 className="top-deals-heading">Recommend</h2>
              <span className="viewAll">View All <FaArrowRight className='viewAllBtn' /></span>
            </div>
            <div className="trending-product-card-wrapper">
              <div className="carousel-next-btn-wrapp">
                <img src="/Images/carousel-next.svg" alt="" className='carousel-next-button' onClick={CarouseNext} />
              </div>
              <Slider ref={sliderRef} {...settings}>
                {products.map(product => (
                  <div key={product.id}>
                    <Link className='link'>
                      <div className="trending-card">
                        <img src={product.image} alt={product.name} />
                        <div className="rating-box">
                          <FaRegStar className='ratingStar' />
                          <span>4.3</span>
                        </div>
                        <div className="best-seller-box">
                          Best Seller
                        </div>
                        <h6>Sold By <strong>Thara Tading Pvt Ltd</strong></h6>
                        <p>{product.name}</p>
                        <span className='price'>{product.regularPrice}</span>
                        <span className='crossed-price'><strike>{product.price}</strike></span>
                      </div></Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div> */}
          {/* ===========================================Recommend================================ */}

          <Footer />
        </>
      )}

    </div>
  )
}

export default HomePage
