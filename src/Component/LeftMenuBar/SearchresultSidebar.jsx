import React, { useCallback, useState } from 'react'
import './SearchresultSidebar.scss'

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";

import { Link } from 'react-router-dom';
import useCategories from '../../redux/hooks/HomePageHooks/useCategories';


const SearchresultSidebar = () => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(100);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
const { categories, status, error }=useCategories();

  const handleDrag = useCallback((event, setValue) => {
    const progressBar = document.querySelector('.bar');
    const rect = progressBar.getBoundingClientRect();
    const newValue = ((event.clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(Math.max(newValue, 0), 100));
  }, []);
  return (
    <div className='Filter-wrapper'>
      <div className="filter-body">
        <div className="filter-main-heading">
          <h1>Filters</h1>
        </div>
        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded={isCollapsed} onClick={toggleCollapse} aria-controls="collapseExample">
            <div className="collapse-title">
              <h1>Categories</h1>
            </div>
            <div className="collapse-arrow">
              <IoIosArrowUp className={`down-arrow ${isCollapsed ? 'rotated' : ''}`} />
            </div>
          </div>

          <div className='collapse' id="collapseExample">
            {
              categories.map((data,index)=>
                <div key={index}>{data.name}</div>
              )
            }
          </div>

            {/* <div className="card card-body">
              <div className="collapse-body-content">


                <div className="collapse-sub-body" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">
                  <h1>Groceries & Essentials</h1>
                  <div className="collapse-arrow-icon">
                    <IoIosArrowDown  />

                  </div>
                </div>

                

                <div className="collapse" id="collapseExample2">
                  <div className="card card-body collapse-sub-body-lists">
                    <Link className='groceries' to="">Noodles & Pasta</Link>
                    <Link className='groceries' to="">Essential Oils</Link>
                    <Link className='groceries' to="">Sweets</Link>
                  </div>
                </div>


                <div className=" collapse-sub-body" data-bs-toggle="collapse" data-bs-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample3">
                  <h1>Electronics</h1>
                  <div className="collapse-arrow-icon">
                    <IoIosArrowDown />

                  </div>
                </div>

                <div className="collapse" id="collapseExample3">
                  <div className="card card-body">
                    hanna
                  </div>
                </div>



                <div className=" collapse-sub-body" data-bs-toggle="collapse" data-bs-target="#collapseExample4" aria-expanded="false" aria-controls="collapseExample4">
                  <h1>  Home & Furniture</h1>
                  <div className="collapse-arrow-icon">
                    <IoIosArrowDown />

                  </div>
                </div>

                <div className="collapse" id="collapseExample4">
                  <div className="card card-body">
                    hanna
                  </div>
                </div>



                <div className=" collapse-sub-body" data-bs-toggle="collapse" data-bs-target="#collapseExample5" aria-expanded="false" aria-controls="collapseExample5">
                  <h1>Men’s Fashion</h1>
                  <div className="collapse-arrow-icon">
                    <IoIosArrowDown />

                  </div>
                </div>

                <div className="collapse" id="collapseExample5">
                  <div className="card card-body">
                    hanna
                  </div>
                </div>


                <div className=" collapse-sub-body" data-bs-toggle="collapse" data-bs-target="#collapseExample6" aria-expanded="false" aria-controls="collapseExample6">
                  <h1>Women’s Fashion</h1>
                  <div className="collapse-arrow-icon">
                    <IoIosArrowDown />

                  </div>
                </div>

                <div className="collapse" id="collapseExample6">
                  <div className="card card-body">
                    hanna
                  </div>
                </div>


                <div className=" collapse-sub-body" data-bs-toggle="collapse" data-bs-target="#collapseExample7" aria-expanded="false" aria-controls="collapseExample7">
                  <h1>Beauty & Fragrance</h1>
                  <div className="collapse-arrow-icon">
                    <IoIosArrowDown />

                  </div>
                </div>

                <div className="collapse" id="collapseExample7">
                  <div className="card card-body">
                    hanna
                  </div>
                </div>


                <div className=" collapse-sub-body" data-bs-toggle="collapse" data-bs-target="#collapseExample8" aria-expanded="false" aria-controls="collapseExample8">
                  <h1>Toys</h1>
                  <div className="collapse-arrow-icon">
                    <IoIosArrowDown />

                  </div>
                </div>

                <div className="collapse" id="collapseExample8">
                  <div className="card card-body">
                    hanna
                  </div>
                </div>
              </div>
            </div> */}
        </div>

        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain " aria-expanded="false" aria-controls="collapseExampleMain">
            <div className="collapse-title">
              <h1>Ratings</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain">
            <div className="card card-body">
              <div className="collapse-body-content">
                <div className="rating-container">
                  <div className="rating-check-box">
                    <input type="checkbox" />
                  </div>
                  <div className="rating-number">
                    <span>5</span>
                  </div>
                  <div className="rating-icons">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                  </div>
                </div>

                <div className="rating-container">
                  <div className="rating-check-box">
                    <input type="checkbox" />
                  </div>
                  <div className="rating-number">
                    <span>4</span>
                  </div>
                  <div className="rating-icons">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarOutline />
                  </div>
                </div>

                <div className="rating-container">
                  <div className="rating-check-box">
                    <input type="checkbox" />
                  </div>
                  <div className="rating-number">
                    <span>3</span>
                  </div>
                  <div className="rating-icons">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                  </div>
                </div>
                <div className="rating-container">
                  <div className="rating-check-box">
                    <input type="checkbox" />
                  </div>
                  <div className="rating-number">
                    <span>2</span>
                  </div>
                  <div className="rating-icons">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                  </div>
                </div>
                <div className="rating-container">
                  <div className="rating-check-box">
                    <input type="checkbox" />
                  </div>
                  <div className="rating-number">
                    <span>1</span>
                  </div>
                  <div className="rating-icons">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain2 " aria-expanded="false" aria-controls="collapseExampleMain2">
            <div className="collapse-title">
              <h1>Pricing</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain2">
            <div className="card card-body">
              <div className="collapse-body-content">

                <div className="progress-bar">
                  <div className="bar">
                    <div
                      className="circle from"
                      style={{ left: `${from}%` }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        const handleMouseMove = (moveEvent) => handleDrag(moveEvent, setFrom);
                        const handleMouseUp = () => {
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    />
                    <div
                      className="circle to"
                      style={{ left: `${to}%` }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        const handleMouseMove = (moveEvent) => handleDrag(moveEvent, setTo);
                        const handleMouseUp = () => {
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    />
                  </div>
                </div>

                <div className="progress-count">
                  <div className="progressbar-min-couny-section">
                    <div className="min-value-container">
                      <div className="min-value-left-side">
                        <span>₹</span>
                      </div>
                      <div className="min-value-right-side">
                        <span>{Math.round(from * 100)}</span>
                      </div>
                    </div>
                    <div className="min-count">
                      <span>Min.</span>
                    </div>
                  </div>

                  <div className="progressbar-min-couny-section">
                    <div className="max-value-container">
                      <div className="min-value-left-side">
                        <span>₹</span>
                      </div>
                      <div className="min-value-right-side">
                        <span>{Math.round(to * 100)}</span>
                      </div>
                    </div>
                    <div className="max-count">
                      <span>Max.</span>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain3" aria-expanded="false" aria-controls="collapseExampleMain3">
            <div className="collapse-title">
              <h1>Ratings</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain3">
            <div className="card card-body">
              <div className="collapse-body-content">
                <div className="rating-container">
                  <div className="rating-check-box">
                    <input type="checkbox" />
                  </div>
                  <div className="rating-number">
                    <span>5</span>
                  </div>
                  <div className="rating-icons">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                  </div>
                </div>

                <div className="rating-container">
                  <div className="rating-check-box">
                    <input type="checkbox" />
                  </div>
                  <div className="rating-number">
                    <span>4</span>
                  </div>
                  <div className="rating-icons">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarOutline />
                  </div>
                </div>

                <div className="rating-container">
                  <div className="rating-check-box">
                    <input type="checkbox" />
                  </div>
                  <div className="rating-number">
                    <span>3</span>
                  </div>
                  <div className="rating-icons">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                  </div>
                </div>
                <div className="rating-container">
                  <div className="rating-check-box">
                    <input type="checkbox" />
                  </div>
                  <div className="rating-number">
                    <span>2</span>
                  </div>
                  <div className="rating-icons">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                  </div>
                </div>
                <div className="rating-container">
                  <div className="rating-check-box">
                    <input type="checkbox" />
                  </div>
                  <div className="rating-number">
                    <span>1</span>
                  </div>
                  <div className="rating-icons">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                    <MdOutlineStarOutline />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain4" aria-expanded="false" aria-controls="collapseExampleMain4">
            <div className="collapse-title">
              <h1>Brands</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain4">
            <div className="card card-body">
              <div className="collapse-body-content">
                hanan


              </div>
            </div>
          </div>
        </div>


        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain5" aria-expanded="false" aria-controls="collapseExampleMain5">
            <div className="collapse-title">
              <h1>Gender</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain5">
            <div className="card card-body">
              <div className="collapse-body-content">
                hanan


              </div>
            </div>
          </div>
        </div>

        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain6" aria-expanded="false" aria-controls="collapseExampleMain6">
            <div className="collapse-title">
              <h1>Size</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain6">
            <div className="card card-body">
              <div className="collapse-body-content">
                hanan


              </div>
            </div>
          </div>
        </div>

        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain7" aria-expanded="false" aria-controls="collapseExampleMain7">
            <div className="collapse-title">
              <h1>Availability</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain7">
            <div className="card card-body">
              <div className="collapse-body-content">
                hanan


              </div>
            </div>
          </div>
        </div>

        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain8" aria-expanded="false" aria-controls="collapseExampleMain8">
            <div className="collapse-title">
              <h1>Type</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain8">
            <div className="card card-body">
              <div className="collapse-body-content">
                hanan


              </div>
            </div>
          </div>
        </div>

        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain9" aria-expanded="false" aria-controls="collapseExampleMain9">
            <div className="collapse-title">
              <h1>Discount</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain9">
            <div className="card card-body">
              <div className="collapse-body-content">
                hanan


              </div>
            </div>
          </div>
        </div>

        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain10" aria-expanded="false" aria-controls="collapseExampleMain10">
            <div className="collapse-title">
              <h1>Flavor</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain10">
            <div className="card card-body">
              <div className="collapse-body-content">
                hanan


              </div>
            </div>
          </div>
        </div>

        <div className="filter-collapse">
          <div className='collapse-title-body' data-bs-toggle="collapse" data-bs-target="#collapseExampleMain11" aria-expanded="false" aria-controls="collapseExampleMain11">
            <div className="collapse-title">
              <h1>Special Diet Needs</h1>
            </div>
            <div className="collapse-arrow">
              < IoIosArrowUp className='down-arrow' />
            </div>
          </div>

          <div className="collapse" id="collapseExampleMain11">
            <div className="card card-body">
              <div className="collapse-body-content">
                hanan


              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default SearchresultSidebar
