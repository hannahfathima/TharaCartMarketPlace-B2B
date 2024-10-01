import { useEffect, useState } from 'react';
import './CategoriesPage.scss';
import { MdOutlineKeyboardArrowDown, MdOutlineFavoriteBorder } from "react-icons/md";
import { HiOutlineStar } from "react-icons/hi2";
import Navbar from '../Navbar/Navbar';
import useCategories from '../../redux/hooks/HomePageHooks/useCategories';
import useAllProducts from '../../redux/hooks/allProductsHook/useAllProducts';
import { Link, useParams } from 'react-router-dom';
import useGetBrand from '../../redux/hooks/topDealsHooks/useGetBrand';

const CategoriesPage = () => {
  const [showMore, setShowMore] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // New state for selected category
  const { categoryId } = useParams();
  const [sortOrder, setSortOrder] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [availability, setAvailability] = useState('');
  const { categories, status: categoriesStatus, error: categoriesError } = useCategories();
  const { AllProducts: allProducts, status: allProductsStatus, error: allProductsError } = useAllProducts();

  useEffect(() => {
    if (categories && categoryId) {
      // Filter categories based on the current categoryId
      const filtered = categories.filter(category => category.parentCategory === categoryId);
      setFilteredCategories(filtered);
    } else if (categories) {
      // Filter top-level categories
      const topLevelCategories = categories.filter(category => !category.parentCategory);
      setFilteredCategories(topLevelCategories);
    }
  }, [categories, categoryId]);

  useEffect(() => {
    if (allProducts) {
      let productsInCategory;

      if (selectedCategory) {
        // Filter products based on the selected category
        productsInCategory = allProducts.filter(product => product.categoryIds.includes(selectedCategory));
      } else if (categoryId) {
        // If a parent category is selected but no specific child category, show products for the parent category
        productsInCategory = allProducts.filter(product => product.categoryIds.includes(categoryId));
      } else {
        // If no categoryId, show all products
        productsInCategory = allProducts;
      }

      // Apply sorting
      const sortedProducts = sortProducts(productsInCategory, sortOrder);
      setFilteredProducts(sortedProducts);
    }
  }, [allProducts, selectedCategory, categoryId, sortOrder]);

  const toggleShowMore = () => {
    setShowMore(prevShowMore => !prevShowMore);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const sortProducts = (products, sortOrder) => {
    switch (sortOrder) {
      case 'low-to-high':
        return [...products].sort((a, b) => a.sellingPrice - b.sellingPrice);
      case 'high-to-low':
        return [...products].sort((a, b) => b.sellingPrice - a.sellingPrice);
      default:
        return products;
    }
  };

  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder); // Update sortOrder state
  };



  const calculateAverageRating = (ratings) => {
    const { oneRating, twoRating, threeRating, fourRating, fiveRating } = ratings;
    const totalRatings = oneRating + twoRating + threeRating + fourRating + fiveRating;
    if (totalRatings === 0) return 0;
    const averageRating = (
      (oneRating * 1) + (twoRating * 2) + (threeRating * 3) + (fourRating * 4) + (fiveRating * 5)
    ) / totalRatings;
    return averageRating.toFixed(1);
  };

  const { brands, status: brandStatus, error: brandError } = useGetBrand();


  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
  };

  const getFilteredProducts = () => {
    return filteredProducts
      .filter(product => !selectedBrand || product.brandId === selectedBrand)
      .filter(product => {
        if (availability === 'in-stock') {
          return product.stock > 0;
        } else if (availability === 'out-of-stock') {
          return product.stock <= 0;
        }
        return true;
      })
      .filter(product => {
        if (selectedRating) {
          const averageRating = calculateAverageRating(product);
          return averageRating === parseFloat(selectedRating).toFixed(1);
        }
        return true;
      })
      
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  }
  if (categoriesStatus === 'loading' || allProductsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (categoriesStatus === 'failed' || allProductsStatus === 'failed') {
    return <div>Error: {categoriesError?.message || allProductsError?.message}</div>;
  }
  return (
    <div className='categories-main-page'>
      <Navbar />
      <div style={{ width: '100%' }}>
        <div className="category-homepage">
          <div className="category-list">
            <div className="category-title">
              <h1>Shop By Popular Categories</h1>
              {filteredCategories.length > 7 && (
                <div className="seemore" onClick={toggleShowMore}>
                  <h1>See More <span><MdOutlineKeyboardArrowDown className={`uparrow ${showMore ? "downarrow" : ""}`} /></span></h1>
                </div>
              )}
            </div>
            <div className="category-container">
              {filteredCategories.slice(0, 7).map((category) => (
                <div key={category.id} className="category-items" onClick={() => handleCategoryClick(category.id)}>
                  <img src={category.categoryBanner} alt={category.name} />
                  <p>{category.name}</p>
                </div>
              ))}
            </div>
            {showMore && (
              <div className="category-container">
                {filteredCategories.slice(7).map((category) => (
                  <div key={category.id} className="category-items" onClick={() => handleCategoryClick(category.id)}>
                    <img src={category.imageUrl} alt={category.name} />
                    <p>{category.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="category-banner" style={{ backgroundImage: `url("/Images/brand page banner.png")`, backgroundSize: "cover" }}>
        </div>
      </div>

      <div className="categories-main-body">
        <div className='SearchResultPage-wrapper'>
          <div className="search-result-body">
            <div className="search-home">
              <div className="show-result">
                <h4><span>Showing 1-{filteredProducts.length} of {filteredProducts.length} results</span> “Indomie Special Chicken Noodles”</h4>
              </div>

              <div className="selecter-filter">
                <div className="filter-1">
                  <select
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option value="">Sort by</option>
                    <option value="low-to-high">Price - Low to High</option>
                    <option value="high-to-low">Price - High to Low</option>
                  </select>
                </div>
                <div className="filter-2">
                  <select name="brand" id="brand" onChange={(e) => setSelectedBrand(e.target.value)} value={selectedBrand}>
                    <option value="">Brand</option>
                    {brands?.map(brand => (
                      <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                    ))}
                  </select>
                </div>
                <div className="filter-3">
                  <select name="availability" id="availability" onChange={handleAvailabilityChange} value={availability}>
                    <option value="">Availability</option>
                    <option value="in-stock">In stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
                <div className="filter-4">
                  <select name="rating" id="rating" onChange={handleRatingChange} value={selectedRating}>
                    <option value="">Rating</option>
                    <option value="1">Rating ★</option>
                    <option value="2">Rating ★★</option>
                    <option value="3">Rating ★★★</option>
                    <option value="4">Rating ★★★★</option>
                    <option value="5">Rating ★★★★★</option>
                  </select>
                </div>
              </div>

              <div className="Products-main-body">
                <div className="container-fluid">
                  <div className="row">
                    {getFilteredProducts().map((data, index) => {
                      const averageRating = calculateAverageRating(data);
                      const sellingPrice = data.sellingPrice;
                      const originalPrice = data.price;
                      const offerPercentage = originalPrice
                        ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
                        : 0;
                      return (
                        <div className="col-lg-3" key={index} style={{ marginBottom: "10px" }}>
                          <Link to={`/product-inner-page/${data.productId}`}>
                          <div className="product-card">
                            <div className="best-seller">
                              <h5>Best Seller</h5>
                            </div>
                            <div className="favourate-icon">
                              <MdOutlineFavoriteBorder />
                            </div>
                            <div className="product-image">
                              <img src={data.imageUrls[0]} alt={data.name} />

                            </div>
                            <div className="product-details">
                              <div className="product-title">
                                <p>{data.name}</p>
                              </div>
                              <div className="product-price">
                                <div className="exact-price">
                                  <h1>₹{sellingPrice}</h1>
                                </div>
                                <div className="before-price">
                                  {originalPrice && (
                                    <h3><strike>₹{originalPrice}</strike></h3>
                                  )}
                                </div>
                                <div className="offer">
                                  {offerPercentage > 0 && (
                                    <h3>{offerPercentage}% OFF</h3>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="product-rating">
                              <HiOutlineStar className='HiOutlineStar-icon' /><span>{averageRating}</span>
                            </div>
                            <div className="sponsered">
                              <h4>Sponsored</h4>
                            </div>
                            {data.stock <= 0 && (
                              <div className="out-of-stock-overlay">
                                <span>Out of Stock</span>
                              </div>
                            )}
                          </div></Link>
                        </div>
                      );
                    })}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
