import './TopDeals.scss'
import SearchresultSidebar from '../LeftMenuBar/SearchresultSidebar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navbar from '../Navbar/Navbar'
import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import Footer from '../Footer/Footer';
import useTopDeals from '../../redux/hooks/HomePageHooks/useTopDeals';
import useTopDealsProduct from '../../redux/hooks/topDealsHooks/useTopDealsProduct';
import { Link } from 'react-router-dom';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import useGetBrand from '../../redux/hooks/topDealsHooks/useGetBrand';
import { IoChevronBackCircle } from "react-icons/io5";


const TopDeals = () => {
    const [sort, setSort] = useState('Low to High');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [tempSelectedBrands, setTempSelectedBrands] = useState([]); // Temporary state for brand filter
    const [showInStock, setShowInStock] = useState(false); // State for In Stock filter
    const [showOutOfStock, setShowOutOfStock] = useState(false); // State for Out of Stock filter
    const [selectedRatings, setSelectedRatings] = useState([]);

    const [appliedFilters, setAppliedFilters] = useState({
        brands: [],
        inStock: false,
        outOfStock: false,
        ratings: []
    });

    const sliderRef = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        swipeToSlide: true,
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

    const { topDeals: topDealsBanner, status: bannerStatus, error: bannererror } = useTopDeals();
    const { topDealsProducts, status: topDealsProdStatus, error: topDealsProdError } = useTopDealsProduct();
    const { brands: brands, status: brandStatus, error: brandError } = useGetBrand();

    useEffect(() => {
        console.log('brands:', topDealsProducts);
    }, [topDealsProducts]);

    const handleBrandSelection = (brandId) => {
        setTempSelectedBrands((prevSelected) =>
            prevSelected.includes(brandId)
                ? prevSelected.filter((id) => id !== brandId)
                : [...prevSelected, brandId]
        );
    };

    const handleRatingSelection = (rating) => {
        setSelectedRatings((prevSelected) =>
            prevSelected.includes(rating)
                ? prevSelected.filter((r) => r !== rating)
                : [...prevSelected, rating]
        );
    };

    const applyFilters = () => {
        setAppliedFilters({
            brands: tempSelectedBrands,
            inStock: showInStock,
            outOfStock: showOutOfStock,
            ratings: selectedRatings
        });
    };

    const filteredTopDealsProducts = topDealsProducts
        .filter(product => {
            // Filter by brand
            const brandFilter = !appliedFilters.brands.length || appliedFilters.brands.includes(product.brandId);
            // Filter by availability
            const availabilityFilter = (appliedFilters.inStock && product.stock > 0) || (appliedFilters.outOfStock && product.stock <= 0) || (!appliedFilters.inStock && !appliedFilters.outOfStock);
            // Filter by ratings
            const totalRatings = product.oneRating + product.twoRating + product.threeRating + product.fourRating + product.fiveRating;
            const weightedSum =
                (product.oneRating * 1) +
                (product.twoRating * 2) +
                (product.threeRating * 3) +
                (product.fourRating * 4) +
                (product.fiveRating * 5);
            const averageRating = totalRatings > 0 ? (weightedSum / totalRatings).toFixed(1) : 'N/A';
            const ratingFilter = !appliedFilters.ratings.length || appliedFilters.ratings.some(rating => averageRating >= rating);

            return brandFilter && availabilityFilter && ratingFilter;
        })
        .sort((a, b) => {
            switch (sort) {
                case 'Low to High':
                    return a.sellingPrice - b.sellingPrice;
                case 'High to Low':
                    return b.sellingPrice - a.sellingPrice;
                default:
                    return 0;
            }
        });

    if (bannerStatus === 'loading' || topDealsProdStatus === 'loading' || brandStatus === 'loading') {
        return <div>Loading</div>;
    }
    if (bannerStatus === 'failed') {
        return <div>Failed with {bannererror}</div>;
    }
    if (topDealsProdError === 'failed') {
        return <div>Failed with {topDealsProdError}</div>;
    }
    if (brandStatus === 'failed') {
        return <div>Failed with {brandError}</div>;
    }

    return (
        <div className='TopDealsMainwrapper'>
            <ScrollToTopOnMount />
            <Navbar />
            <div className="TopDelasWrapper">
                <div className="TopDeals-left"><SearchresultSidebar /></div>
                <div className="TopDeals-right">
                    <h2 className='top-deals-heading'>
                    <IoChevronBackCircle className='IoChevronBackCircle'/>
                    Top Deals
                    </h2>
                    <div className="carousel-section">
                        <Slider {...settings}>
                            {topDealsBanner.map((data, index) =>
                                <div key={index}>
                                    <div className="top-deals-image"><img src={data.bannerUrl} alt="" /></div>
                                </div>
                            )}
                        </Slider>
                    </div>
                    <div className="selectBox-section">
                        <div className="sort-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Sort : Price - {sort}</span>
                            <FaAngleDown className='downAngle' />
                        </div>
                        <ul className="dropdown-menu sort-dropdown-result">
                            <li><a className="dropdown-item" onClick={() => setSort('Low to High')}>Low to High</a></li>
                            <li><a className="dropdown-item" onClick={() => setSort('High to Low')}>High to Low</a></li>
                        </ul>

                        <div className="sort-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Brand</span>
                            <FaAngleDown className='downAngle' />
                        </div>
                        <ul className="dropdown-menu sort-dropdown-result">
                            {brands.map((brand, index) => (
                                <li key={index} className="dropdown-item">
                                    <input
                                        type="checkbox"
                                        id={`brand-${brand.brandId}`}
                                        value={brand.brandId}
                                        onChange={(e) => handleBrandSelection(brand.brandId)}
                                        checked={tempSelectedBrands.includes(brand.brandId)}
                                    />
                                    <label htmlFor={`brand-${brand.brandId}`}>{brand.brandName}</label>
                                </li>
                            ))}
                            <button className="apply-button" onClick={applyFilters}>Apply</button>
                        </ul>

                        <div className="sort-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Availability</span>
                            <FaAngleDown className='downAngle' />
                        </div>
                        <ul className="dropdown-menu sort-dropdown-result">
                            <li className="dropdown-item">
                                <input
                                    type="checkbox"
                                    id="inStock"
                                    onChange={() => setShowInStock(!showInStock)}
                                    checked={showInStock}
                                />
                                <label htmlFor="inStock">In Stock</label>
                            </li>
                            <li className="dropdown-item">
                                <input
                                    type="checkbox"
                                    id="outOfStock"
                                    onChange={() => setShowOutOfStock(!showOutOfStock)}
                                    checked={showOutOfStock}
                                />
                                <label htmlFor="outOfStock">Out Of Stock</label>
                            </li>
                            <button className="apply-button" onClick={applyFilters}>Apply</button>
                        </ul>

                        <div className="sort-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Rating</span>
                            <FaAngleDown className='downAngle' />
                        </div>
                        <ul className="dropdown-menu sort-dropdown-result">
                            <li className='dropdown-item'>
                                <input
                                    type="checkbox"
                                    id="rating-1"
                                    onChange={() => handleRatingSelection(1)}
                                    checked={selectedRatings.includes(1)}
                                />
                                <label htmlFor="rating-1">1 Stars & Up</label>
                            </li>
                            <li className='dropdown-item'>
                                <input
                                    type="checkbox"
                                    id="rating-2"
                                    onChange={() => handleRatingSelection(2)}
                                    checked={selectedRatings.includes(2)}
                                />
                                <label htmlFor="rating-2">2 Stars & Up</label>
                            </li>
                            <li className='dropdown-item'>
                                <input
                                    type="checkbox"
                                    id="rating-3"
                                    onChange={() => handleRatingSelection(3)}
                                    checked={selectedRatings.includes(3)}
                                />
                                <label htmlFor="rating-3">3 Stars & Up</label>
                            </li>
                            <li className='dropdown-item'>
                                <input
                                    type="checkbox"
                                    id="rating-4"
                                    onChange={() => handleRatingSelection(4)}
                                    checked={selectedRatings.includes(4)}
                                />
                                <label htmlFor="rating-4">4 Stars & Up</label>
                            </li>
                            <li className='dropdown-item'>
                                <input
                                    type="checkbox"
                                    id="rating-5"
                                    onChange={() => handleRatingSelection(5)}
                                    checked={selectedRatings.includes(5)}
                                />
                                <label htmlFor="rating-5">5 Stars & Up</label>
                            </li>
                            <button className="apply-button" onClick={applyFilters}>Apply</button>
                        </ul>

                    </div>
                    <div className="products-list-wrapper">
                        <div className="container-fluid">
                            <div className="row">
                                {filteredTopDealsProducts.map((data, index) => {
                                    const percentageOff = Math.round(((data.price - data.sellingPrice) / data.price) * 100);
                                    const totalRatings = data.oneRating + data.twoRating + data.threeRating + data.fourRating + data.fiveRating;
                                    const weightedSum =
                                        (data.oneRating * 1) +
                                        (data.twoRating * 2) +
                                        (data.threeRating * 3) +
                                        (data.fourRating * 4) +
                                        (data.fiveRating * 5);
                                    const averageRating = totalRatings > 0 ? (weightedSum / totalRatings).toFixed(1) : 'N/A';

                                    return (
                                        <div className="col-lg-3" key={index}>
                                            <Link to={`/product-inner-page/${data.productId}`}>
                                                <div className="prod-card">
                                                    <div className="prod-image">
                                                        <img src={data.imageUrls} alt="" />
                                                    </div>
                                                    <div className="offer-box">
                                                        {percentageOff}% OFF
                                                    </div>
                                                    <h5 className="prodDiscription">{data.name}</h5>
                                                    <span className='offerPrice'>₹{data.sellingPrice.toFixed(2)}</span>
                                                    <span className="ogPrice">
                                                        <strike>₹{data.price.toFixed(2)}</strike>
                                                    </span>
                                                    <span className="offer-text">{percentageOff}% OFF</span>
                                                    <div className="stock">
                                                        {data.stock > 4 && data.stock < 10 && "Only few left"}
                                                        {data.stock <= 4 && data.stock > 0 && `Only ${data.stock} left`}
                                                        {data.stock <= 0 && "Out of Stock"}
                                                    </div>
                                                    <div className="ratingBox">
                                                        <FaRegStar className='star' /><span>{averageRating}</span>
                                                    </div>
                                                    <span className="sponserd">Sponsored</span>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TopDeals;
