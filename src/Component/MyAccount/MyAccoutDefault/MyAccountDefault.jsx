import { useEffect } from 'react';
import './MyAccountDefault.scss'
import { IoIosArrowForward } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";

import { RiErrorWarningLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const MyAccountDefault = ({user}) => {
  // Helper function to get the primary address
const getPrimaryAddress = (addresses) => {
  if (!addresses || addresses.length === 0) return null;
  return addresses.find(address => address.primaryAddress === true) || null;
};
useEffect(()=>{
  if(user){
    console.log('propsData',user);
  }
},[])
const primaryAddress = getPrimaryAddress(user?.address);
  return (
    <div className='myAccount-wrapper'>
      <div className="myaccount-main-body">
      
        <div className="myaccount-right-home">
          <div className="welcome-title">
            <h1>
              Welcome to your Thara Cart Account
            </h1>
            <div className="coins">
              <img src="/Images/Coin.png" alt="" /><span>{user?.coin}</span>
            </div>


          </div>

          <div className="email-verification-details">
            <div className="left-section">
              <div className="warning-icon">
                <RiErrorWarningLine className='warning-symbel' />

              </div>
              <div className="warning-text">
                <span>Your email id is not verified</span>
              </div>
            </div>
            <div className="right-section">
              <Link className='verify-btn' to='/' >Verify Now</Link>
            </div>
          </div>
          <div className="border">
            <div className="registerNow-container">
              <div className="regNow-left">
                <div className="star-icon">
                  <img src="/Images/green-star.png" alt="" />
                </div>
                <div className="buy-more-text">
                  <h5>Buy More, Save More with Tharacart Business Account <span>You’ll get Wholesale Price & GST Input tax credit</span></h5>
                </div>
              </div>

              <div className="regNow-right">
                <div className="border-btn">
                  <div className="registre-btn">
                    <button>Register Now</button>
                  </div>
                </div>
              </div>


            </div>


          </div>
          <div className="my-order-main-container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-7">
                  <div className="order-deatis-card-left">
                    <div className="my-orders">
                      <div className="my-order-icon">
                        <img src="/Images/my-order.png" alt="" />
                      </div>
                      <h1>My Orders</h1>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="order-item">
                          <div className="order-item-image">
                            <img src="/Images/trend prod2.svg" alt="" />
                          </div>

                          <div className="item-details">
                            <div className="about-item">
                              <h1>Arriving on 23rd Dec 2023</h1>
                              <p>Slurrp Farm No Maida No MSG Not Fried, Curry Masala Millet Hakka Noodles, Pack of 3 Hakka Noodles Vegetarian (192 g)</p>
                              <div className="track-order-btn">
                                <button>Track Order</button>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="order-item">
                          <div className="order-item-image">
                            <img src="/Images/trend prod2.svg" alt="" />
                          </div>

                          <div className="item-details">
                            <div className="about-item">

                              <p>Slurrp Farm No Maida No MSG Not Fried, Curry Masala Millet Hakka Noodles, Pack of 3 Hakka Noodles Vegetarian (192 g)</p>
                              {/* <div className="track-order-btn">
                          <button>Track Order</button>
                        </div> */}
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="see-more">
                          <div>
                            <Link className='seemore-btn' to='/'>see-more</Link><span><IoIosArrowForward className='right-arrow' />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
                <div className="col-lg-5">
                  <div className="order-deatis-card-right">
                    <div className="my-orders">
                      <div className="my-order-icon">
                        <img src="/Images/user.png" alt="" />
                      </div>
                      <h1>Account Info</h1>
                    </div>
                    <div className="contact-details">
                      <span>Phone</span>
                      <span>+91-{user?.address[0].phoneNumber}</span>
                      {/* <Link className='verifyy' to='/verifynow'>Verify Now</Link> */}
                    </div>
                    <div className="contact-details">
                      <span>Email</span>
                      <p>{user?.email}</p>
                      <div className="verified">
                        {/* <h5>verified</h5><span><img src="/Images/Icon (6).svg" alt="" /></span> */}
                      </div>
                    </div>
                    <div className="contact-details">
        <span>Primary Address</span>
        {primaryAddress ? (
          <p>
            {primaryAddress.houseName}, {primaryAddress.landMark}, {primaryAddress.localArea}, {primaryAddress.state} - {primaryAddress.pincode}
            <br />
            Phone: {primaryAddress.phoneNumber}
          </p>
        ) : (
          <p>No Primary Address</p>
        )}
      </div>
                    <div className="contact-details">
                      <span>Social Accounts</span>
                      <p>No Social Account Connceted</p>

                    </div>
                    <div className="see-more2">
                      <div>
                        <Link className='seemore-btn' to='/'>see-more</Link><span><IoIosArrowForward className='right-arrow' />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            <div className="my-wishlist-container">
              <div className="wishlist-left">
                <div className="favourate-icon">
                  <MdFavoriteBorder className='fav-icon' />
                  <span>My Wishlist</span>
                </div>


                <div className="create-new-list">
                  <div className="create-icon">
                    <img src="/Images/plus-01.png" alt="" />

                  </div>
                  <Link className='crate-link' to='/'>Create New List</Link>
                </div>
              </div>
              <div className="wishlist-right">
                <div className="see-more">
                  <div>
                    <Link className='seemore-btn' to='/'>see-more</Link><span><IoIosArrowForward className='right-arrow' />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-wishlist-container2">
              <div className="default-list-left">
              <span>Default List</span>
              <p>O Items</p>
              </div>
              <div className="viewlist-right">
                <div className="list-btn">
                  <button>View List</button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default MyAccountDefault