import React, { useEffect, useState } from 'react';
import './NewArrival.scss';
import SearchresultSidebar from '../LeftMenuBar/SearchresultSidebar';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { HiOutlineStar } from "react-icons/hi2";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import useNewArrival from '../../redux/hooks/HomePageHooks/useNewArrival';
import useNewArrivalsProdSlice from '../../redux/hooks/NewArrivalsProd/useNewArrivalsProdSlice';
import useGetBrand from '../../redux/hooks/topDealsHooks/useGetBrand';

const NewArrival = () => {
    const [sortOption, setSortOption] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedAvailability, setSelectedAvailability] = useState('');

    const { newArrivals, status: newArrivalsStatus, error: newArrivalsError } = useNewArrival();
    const { newArrivalsProduct, status: newArrivalsProductStatus, error: newArrivalsProductError } = useNewArrivalsProdSlice();
    const { brands, status: brandStatus, error: brandError } = useGetBrand();
    const [rating, setRating] = useState('');

    useEffect(() => {
        // Fetch data or perform any side effects
    }, []);

    if (newArrivalsStatus === 'loading' || newArrivalsProductStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (newArrivalsStatus === 'failed') {
        return <div>Error: {newArrivalsError}</div>;
    }

    if (newArrivalsProductStatus === 'failed') {
        return <div>Error: {newArrivalsProductError}</div>;
    }

    const calculateAverageRating = (ratings = {}) => {
        const { oneRating = 0, twoRating = 0, threeRating = 0, fourRating = 0, fiveRating = 0 } = ratings;
        const totalRatings = oneRating + twoRating + threeRating + fourRating + fiveRating;

        if (totalRatings === 0) return 0;

        const totalRatingSum = (oneRating * 1) + (twoRating * 2) + (threeRating * 3) + (fourRating * 4) + (fiveRating * 5);
        const averageRating = totalRatingSum / totalRatings;

        return averageRating.toFixed(1); // Rounded to 1 decimal place
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    };

    const handleRatingChange = (e) => {
        setSelectedRating(e.target.value);
        const ratingCondition = rating === ''
        ? true
        : parseFloat(rating) === parseFloat(calculateAverageRating(product));

    };

    const handleAvailabilityChange = (e) => {
        setSelectedAvailability(e.target.value);
    };

    const filterProducts = (product) => {
        const averageRating = calculateAverageRating(product.ratings);
        return (
            (selectedBrand === '' || product.brandId === selectedBrand) &&
            (selectedRating === '' || averageRating >= selectedRating) &&
            (selectedAvailability === '' ||
                (selectedAvailability === 'inStock' && product.stock > 0) ||
                (selectedAvailability === 'outOfStock' && product.stock <= 0))
        );
    };

    const sortProducts = (a, b) => {
        if (sortOption === 'Price: Low to High') return a.sellingPrice - b.sellingPrice;
        if (sortOption === 'Price: High to Low') return b.sellingPrice - a.sellingPrice;
        return 0; // No sorting
    };

    const sortedAndFilteredProducts = newArrivalsProduct
        .filter(filterProducts)
        .sort(sortProducts);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2.3,
        arrows: false,
        slidesToScroll: 1,
        swipeToSlide: true,
        draggable: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2.5,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1.5,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className='NewArrivals-wrapper'>
            <Navbar />
            <div className="newArrivals-sub-body">
                <div className="left-newArrivals">
                    <SearchresultSidebar />
                </div>
                <div className="right-newArrivals">
                    <div className="new-arrival-heading-container">
                        <div className="left-arrow">
                            <IoIosArrowDropleftCircle className='BsArrowLeftCircleFill' />
                        </div>
                        <h1>New Arrivals</h1>
                    </div>
                    <div className="new-arrivals-card-wrapper">
                        <Slider {...settings}>
                            {newArrivals.map((data, index) =>
                                <div key={index}>
                                    <div className="image-card-container">
                                        <img src={data.image || data.imageUrls[0]} alt={data.name} />
                                    </div>
                                </div>
                            )}
                        </Slider>
                    </div>
                    <div className="filter-dropdowns">
                        <div className="selecter-filter">
                            <div className="filter-1">
                                <div className="dropdown">
                                    <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sort: {sortOption || 'Select Sort'}
                                    </div>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">
                                            <input type="radio" name="sort" id="low-to-high" value="Price: Low to High" checked={sortOption === 'Price: Low to High'} onChange={handleSortChange} />
                                            <label htmlFor="low-to-high">Price: Low to High</label>
                                        </li>
                                        <li className="dropdown-item">
                                            <input type="radio" name="sort" id="high-to-low" value="Price: High to Low" checked={sortOption === 'Price: High to Low'} onChange={handleSortChange} />
                                            <label htmlFor="high-to-low">Price: High to Low</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="filter-2">
                                <select name="brand" id="brand" onChange={handleBrandChange}>
                                    <option value="">All Brands</option>
                                    {brands && brands.map((brand) => (
                                        <option key={brand.brandId} value={brand.brandId}>
                                            {brand.brandName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter-3">
                                <select name="availability" id="availability" onChange={handleAvailabilityChange}>
                                    <option value="">Availability</option>
                                    <option value="inStock">In Stock</option>
                                    <option value="outOfStock">Out of Stock</option>
                                </select>
                            </div>
                            <div className="filter-4">
                                <select name="rating" id="rating"   onChange={handleRatingChange}>
                       
                                        <option value="">Rating</option>
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>{num} Rating</option>
                                        ))}
                                        
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="Products-main-body">
                        <div className="container-fluid">
                            <div className="row">
                                {sortedAndFilteredProducts.map((product, index) => {
                                    const averageRating = calculateAverageRating(product);
                                    const discountPercentage = Math.round(((product.price - product.sellingPrice) / product.price) * 100);

                                    return (
                                        <div className="col-lg-3 col-md-6 col-sm-12" key={index} style={{ marginBottom: "10px" }}>
                                            <div className={`product-card ${product.stock <= 0 ? 'out-of-stock-card' : ''}`}>
                                                <div className="best-seller">
                                                    <h5>Best Seller</h5>
                                                </div>
                                                <div className="favourate-icon">
                                                    <MdOutlineFavoriteBorder />
                                                </div>
                                                <div className="product-image">
                                                    <img src={product.imageUrls?.[0]} alt={product.name} />
                                                </div>
                                                <div className="product-details">
                                                    <div className="product-title">
                                                        <p>{product.name}</p>
                                                    </div>
                                                    <div className="product-price">
                                                        <div className="exact-price">
                                                            <h1>₹ {product.sellingPrice}</h1>
                                                        </div>
                                                        <div className="before-price">
                                                            <h3><strike>₹ {product.price}</strike></h3>
                                                        </div>
                                                        <div className="offer">
                                                            <h3>{discountPercentage}% OFF</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-rating">
                                                    <HiOutlineStar className="HiOutlineStar-icon" />
                                                    <span>{averageRating}</span>
                                                </div>
                                                <div className="sponsered">
                                                    <h4>Sponsored</h4>
                                                </div>
                                                {product.stock <= 0 && (
                                                    <div className="out-of-stock-message">
                                                        <h4>Out of Stock</h4>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NewArrival;
