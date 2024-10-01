import React, { useState, useEffect } from 'react';
import './SearchResultPage.scss';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { HiOutlineStar } from "react-icons/hi2";
import SearchresultSidebar from '../LeftMenuBar/SearchresultSidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { MdKeyboardArrowDown } from "react-icons/md";

import useGetBrand from '../../redux/hooks/topDealsHooks/useGetBrand';

const SearchResultPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedSort, setSelectedSort] = useState('Price: Low to High');
    const [availability, setAvailability] = useState('all');
    const [selectedBrandId, setSelectedBrandId] = useState('all');
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isBrandOpen, setisBrandOpen] = useState(false);
    const [isOpenStock, setIsOpenStock] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
    const { brands, status: brandsStatus, error: brandsError } = useGetBrand();

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getSearchProd', {
                    params: { q: query }
                });
                setProducts(response.data);
                setFilteredProducts(response.data); // Initially display all products
                console.log(response.data);
                
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
                setFilteredProducts([]);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    // Calculate average rating
    const calculateAverageRating = (ratings) => {
        const { oneRating, twoRating, threeRating, fourRating, fiveRating } = ratings;
        const totalRatings = oneRating + twoRating + threeRating + fourRating + fiveRating;
        if (totalRatings === 0) return 0;
        const averageRating = (
            (oneRating * 1) + (twoRating * 2) + (threeRating * 3) + (fourRating * 4) + (fiveRating * 5)
        ) / totalRatings;
        return averageRating.toFixed(1);
    };

    // Handle sorting products
    const handleSortChange = (e) => {
        setSelectedSort(e.target.value);
        sortProducts(e.target.value);
    };

    // Sorting logic
    const sortProducts = (sortOption) => {
        let sortedProducts = [...filteredProducts];
        if (sortOption === 'Price: Low to High') {
            sortedProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
        } else if (sortOption === 'Price: High to Low') {
            sortedProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
        }

        setFilteredProducts(sortedProducts);
    };

    // State initialization (place these in your component's state)


    // Toggle the stock dropdown
    const toggleStockDropdown = () => {
        setIsOpenStock(!isOpenStock);
    };

    // Handle stock availability change
    const handleStockChange = (event) => {
        const stockOption = event.target.value;
        let updatedAvailability = [...availability];

        if (event.target.checked) {
            updatedAvailability.push(stockOption);
        } else {
            updatedAvailability = updatedAvailability.filter(option => option !== stockOption);
        }

        setAvailability(updatedAvailability);
    };

    const filterByStock = (availabilityOptions) => {
        // Check if both 'in-stock' and 'out-of-stock' are selected
        const hasInStock = availabilityOptions.includes('in-stock');
        const hasOutOfStock = availabilityOptions.includes('out-of-stock');

        if (hasInStock && hasOutOfStock) {
            // If both options are selected, display all products
            setFilteredProducts(products);
        } else if (hasInStock) {
            // If only 'in-stock' is selected, display in-stock products
            setFilteredProducts(products.filter(product => product.stock > 0));
        } else if (hasOutOfStock) {
            // If only 'out-of-stock' is selected, display out-of-stock products
            setFilteredProducts(products.filter(product => product.stock <= 0));
        } else {
            // If no options are selected, display all products
            setFilteredProducts(products);
        }
    };


    useEffect(() => {
        filterByStock(availability);
    }, [availability, products]);
    // Handle brand change
    const handleBrandChange = (event) => {
        const brandId = event.target.value;

        let updatedSelectedBrands = [...selectedBrandId]; // copy current selected brands

        if (event.target.checked) {
            // Add brand if checked
            updatedSelectedBrands.push(brandId);
        } else {
            // Remove brand if unchecked
            updatedSelectedBrands = updatedSelectedBrands.filter(id => id !== brandId);
        }

        setSelectedBrandId(updatedSelectedBrands);

        if (updatedSelectedBrands.length === 0) {
            setFilteredProducts(products); // Show all products if no brand is selected
        } else {
            const filtered = products.filter(product =>
                updatedSelectedBrands.includes(product.brandId)
            );
            setFilteredProducts(filtered);
        }
    };

    // Fetch brand data
    useEffect(() => {
        console.log('Brands:', brands);
    }, [brands]);

    if (brandsStatus === 'loading') return <p>Loading brands...</p>;
    if (brandsStatus === 'error') return <p>Error loading brands: {brandsError}</p>;

    // Rating filter functions
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (e) => {
        const ratingValue = e.target.value;
        if (e.target.checked) {
            setSelectedRatings([...selectedRatings, ratingValue]);
        } else {
            setSelectedRatings(selectedRatings.filter(rating => rating !== ratingValue));
        }
    };

    useEffect(() => {
        if (selectedRatings.length > 0) {
            setFilteredProducts(
                products.filter(product =>
                    selectedRatings.some(rating =>
                        Math.round(calculateAverageRating(product)) >= parseInt(rating)
                    )
                )
            );
        } else {
            setFilteredProducts(products); // Display all products if no rating is selected
        }
    }, [selectedRatings, products]);

    // Toggle brand dropdown visibility
    const toggleBrandDropdown = () => {
        setisBrandOpen(!isBrandOpen);
    };
    return (
        <div className='SearchResultPage-wrapper'>
            <Navbar />
            <div className="search-result-body">
                <div className="slide-bar-left">
                    <SearchresultSidebar />
                </div>
                <div className="search-home">
                    <div className="show-result">
                        <h4><span>Showing {filteredProducts.length} results</span> for “{query}”</h4>
                    </div>

                    <div className="selecter-filter">
                        {/* Sorting */}
                        <div className="filter-1">
                            <div className="dropdown">
                                <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort:
                                </div>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item">
                                        <input
                                            type="radio"
                                            name="sort"
                                            id="low-to-high"
                                            value="Price: Low to High"
                                            checked={selectedSort === 'Price: Low to High'}
                                            onChange={handleSortChange}
                                        />
                                        <label htmlFor="low-to-high">Price: Low to High</label>
                                    </li>
                                    <li className="dropdown-item">
                                        <input
                                            type="radio"
                                            name="sort"
                                            id="high-to-low"
                                            value="Price: High to Low"
                                            checked={selectedSort === 'Price: High to Low'}
                                            onChange={handleSortChange}
                                        />
                                        <label htmlFor="high-to-low">Price: High to Low</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Brand Filter */}
                        <div className="filter-2">
                            <button onClick={toggleBrandDropdown} className="dropdown-btn">
                                <label>Brand</label>
                                {/* Conditionally applying 'open' class to rating arrow */}
                                <span className={`rating-arrow ${isBrandOpen ? 'open' : ''}`}>
                                    <MdKeyboardArrowDown />
                                </span>
                            </button>

                            {/* Dropdown content */}
                            {isBrandOpen && (
                                <div className="dropdown">
                                    {brands.map(brand => (
                                        <div key={brand.brandId} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                id={`brand-${brand.brandId}`}
                                                value={brand.brandId}
                                                checked={selectedBrandId.includes(brand.brandId)}
                                                onChange={handleBrandChange}
                                            />
                                            <label htmlFor={`brand-${brand.brandId}`}>{brand.brandName}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="filter-3">
                            <button onClick={toggleStockDropdown} className="dropdown-btn">
                                <label>Availability</label>
                                <span className={`rating-arrow ${isOpenStock ? 'open' : ''}`}>
                                        <MdKeyboardArrowDown />
                                    </span>           
                            </button>

                            {isOpenStock && (
                                <div className="dropdown">
                                    <div className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            id="in-stock"
                                            value="in-stock"
                                            checked={availability.includes('in-stock')}
                                            onChange={handleStockChange}
                                        />
                                        <label htmlFor="in-stock">In Stock</label>
                                    </div>
                                    <div className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            id="out-of-stock"
                                            value="out-of-stock"
                                            checked={availability.includes('out-of-stock')}
                                            onChange={handleStockChange}
                                        />
                                        <label htmlFor="out-of-stock">Out of Stock</label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rating Filter with Checkboxes in Dropdown */}
                        <div className="filter-4">
                            <div className="rating-dropdown">
                                <button onClick={toggleDropdown} className="rating-dropdown-btn">
                                    {selectedRatings.length > 0
                                        ? `${selectedRatings.join(', ')} Rating`
                                        : 'Ratings'}
                                    <span className={`rating-arrow ${isOpen ? 'open' : ''}`}>
                                        <MdKeyboardArrowDown />
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="rating-dropdown-content">
                                        <label className="rating-option">
                                            <input
                                                type="checkbox"
                                                value="1"
                                                onChange={handleCheckboxChange}
                                                checked={selectedRatings.includes('1')}
                                            />
                                            1 & Up Rating
                                        </label>
                                        <label className="rating-option">
                                            <input
                                                type="checkbox"
                                                value="2"
                                                onChange={handleCheckboxChange}
                                                checked={selectedRatings.includes('2')}
                                            />
                                            2 & Up Rating
                                        </label>
                                        <label className="rating-option">
                                            <input
                                                type="checkbox"
                                                value="3"
                                                onChange={handleCheckboxChange}
                                                checked={selectedRatings.includes('3')}
                                            />
                                            3 & Up Rating
                                        </label>
                                        <label className="rating-option">
                                            <input
                                                type="checkbox"
                                                value="4"
                                                onChange={handleCheckboxChange}
                                                checked={selectedRatings.includes('4')}
                                            />
                                            4 & Up Rating
                                        </label>
                                        <label className="rating-option">
                                            <input
                                                type="checkbox"
                                                value="5"
                                                onChange={handleCheckboxChange}
                                                checked={selectedRatings.includes('5')}
                                            />
                                            5 & Up Rating
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>




                    </div>

                    <div className="Products-main-body">
                        <div className="container-fluid">
                            <div className="row">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map(product => {
                                        const averageRating = calculateAverageRating(product); // Calculate rating outside JSX

                                        return (
                                            <div className="col-lg-3" key={product.id} style={{ marginBottom: "10px" }}>
                                                <div className="product-card">
                                                    <div className="best-seller">
                                                        <h5>Best Seller</h5>
                                                    </div>
                                                    <div className="favourate-icon">
                                                        <MdOutlineFavoriteBorder />
                                                    </div>
                                                    <div className="product-image">
                                                        <img src={product.imageUrls} alt={product.name} />
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
                                                            {product.price > product.sellingPrice && (
                                                                <div className="offer">
                                                                    <h3>
                                                                        {Math.round(((product.price - product.sellingPrice) / product.price) * 100)}% OFF
                                                                    </h3>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="product-rating">
                                                        <HiOutlineStar className="HiOutlineStar-icon" />
                                                        <span>{averageRating}</span>
                                                    </div>

                                                    {product.stock <= 0 && (
                                                        <div className="out-of-stock-label">
                                                            Out of Stock
                                                        </div>
                                                    )}
                                                    <div className="sponsered">
                                                        <h4>Sponsored</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>No products found.</p>
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

export default SearchResultPage;
