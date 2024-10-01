import React, { useEffect, useState } from 'react';
import './BrandPage.scss';
import { FaRegCircleCheck, FaRegStar } from "react-icons/fa6";
import { IoArrowRedoOutline } from "react-icons/io5";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import useFeaturedProducts from '../../redux/hooks/HomePageHooks/useFeaturedProducts';
import useBrandPage from '../../redux/hooks/BrandPageHook/useBrandPage';
import useGetBrand from '../../redux/hooks/topDealsHooks/useGetBrand';
import ReactPlayer from 'react-player';

const BrandPage = () => {
  const { featuredProducts, status: featuredProductsStatus, error: featuredProductsError } = useFeaturedProducts();
  const { BrandPage, status, error } = useBrandPage();
  const { brands, status: brandStatus, error: brandError } = useGetBrand();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]); // State for dynamic order

  useEffect(() => {
    const isLoading = featuredProductsStatus === 'loading' || status === 'loading' || brandStatus === 'loading';
    const hasFailed = featuredProductsStatus === 'failed' || status === 'failed' || brandStatus === 'failed';
    
    setLoading(isLoading);

    if (hasFailed) {
      console.error('Error loading data:', featuredProductsError || error || brandError);
    }

    // If BrandPage data exists, set the dynamic order from the database
    if (BrandPage && BrandPage[0]?.order) {
      setOrder(BrandPage[0].order);
    }
  }, [featuredProductsStatus, status, brandStatus, BrandPage]);

  const calculateAverageRating = (ratings) => {
    const { oneRating, twoRating, threeRating, fourRating, fiveRating } = ratings;
    const totalRatings = oneRating + twoRating + threeRating + fourRating + fiveRating;
    if (totalRatings === 0) return 0;
    const averageRating = (
      (oneRating * 1) + (twoRating * 2) + (threeRating * 3) + (fourRating * 4) + (fiveRating * 5)
    ) / totalRatings;
    return averageRating.toFixed(1);
  };

  const renderProductSection = () => (
    <div className="products-card-wrapper">
      <h1>Featured Products</h1>
      <div className="container-fluid">
        <div className="row">
          {featuredProducts.map((data, index) => {
            const averageRating = calculateAverageRating(data || {});
            const sellingPrice = parseFloat(data.sellingPrice);
            const originalPrice = parseFloat(data.price);
            const discountPercentage = originalPrice > 0 ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100) : 0;

            return (
              <div className="col-lg-4" key={index}>
                <div className="featured-pro-card">
                  <div className="best-seller-in-card">
                    <span>Best Seller</span>
                  </div>
                  <div className="featured-card-image">
                    <img src={data.imageUrls[0]} alt={data.name} />
                  </div>
                  <div className="feature-card-pro-description">
                    <p>{data.name}</p>
                  </div>
                  <div className="price-deatils">
                    <h2>₹{sellingPrice.toFixed(2)}</h2>
                    <h3><strike>₹{originalPrice.toFixed(2)}</strike></h3>
                    <span>{discountPercentage}% OFF</span>
                  </div>
                  <div className="add-tocart-btn-container">
                    <div className="rating">
                      <FaRegStar className='FaRegStar' /><span>{averageRating}</span>
                    </div>
                    <div className="add-tocart-btn">
                      <button className='add-cart'>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderGallerySection = () => (
    <div className="product-ad-wrapper">
      <div className="container-fluid">
        <div className="row product-ad-row">
          {BrandPage[0]?.gallerySection.map((item, index) => (
            <React.Fragment key={index}>
              <div className="col-lg-4">
                <div className="product-ad-left">
                  <div className="ad-description-box">
                    <div className="ad-title">
                      <h1>{item.Title}</h1>
                    </div>
                    <p>{item.Description}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="product-ad-right">
                  <div className="row">
                    {BrandPage[0]?.gallerySection.map((image, imgIndex) => (
                      <div className="col-lg-6" key={imgIndex}>
                        <div className="product-ad-card-right">
                          <img src={image.imageUrl} alt={`Gallery Image ${imgIndex + 1}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBannerSection = () => (
    <div className="hero-section">
      <div className="container-fluid">
        <div className="row banner-row">
          <div className="col-lg-9 col-md-12">
            <div className="banner-left-card">
              {BrandPage[0]?.bannerSection.map((item, index) => (
                <img key={index} src={item.imageUrl} alt={item.title || "Brand Banner"} />
              ))}
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="banner-right-card">
              <div className="card-right">
                <div className="card-image">
                  <img src={BrandPage[0]?.logo || "/Images/Rectangle 530.png"} alt="Brand Image" />
                </div>
                <div className="card-title-container">
                  <h1>{brands[0]?.brandName || BrandPage[0]?.brandId || "Brand Name"}</h1>
                  <FaRegCircleCheck className='FaRegCircleCheck' />
                  <div className="bestseller-container">
                    <span>Best Seller</span>
                  </div>
                </div>
                <div className="description">
                  <span>Joined on {new Date(BrandPage[0]?.createdDate._seconds * 1000).toLocaleDateString()} (1 Year)</span>
                </div>
                <div className="button-container">
                  <button className='report'>Report</button>
                  <div className="whishlist-container">
                    <IoArrowRedoOutline className='IoArrowRedoOutline' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVideoSection = () => (
    <div className="video-main-container">
      <h1>Featured Video</h1>
      {BrandPage[0]?.videoSection.map((item, index) => (
        <div className="video-container" key={index}>
          <ReactPlayer
            url={item.link}
            controls
            width="100%"
            height="100%"
            style={{ aspectRatio: '16 / 9' }}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
          />
        </div>
      ))}
    </div>
  );

  const renderSection = (sectionName) => {
    switch (sectionName) {
      case 'productSection': return renderProductSection();
      case 'gallerySection': return renderGallerySection();
      case 'bannerSection': return renderBannerSection();
      case 'videoSection': return renderVideoSection();
      default: return null;
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || featuredProductsError || brandError) {
    return <div className="error">Error: {error || featuredProductsError || brandError}</div>;
  }

  return (
    <div className='brandpage-wrapper'>
      <Navbar />
      <div className="brandpage-body">
        {order.map((sectionName, index) => (
          <React.Fragment key={index}>
            {renderSection(sectionName)}
          </React.Fragment>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default BrandPage;
