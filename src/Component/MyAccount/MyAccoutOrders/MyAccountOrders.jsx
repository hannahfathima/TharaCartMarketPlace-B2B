import './MyAccountOrders.scss'
import { Link } from 'react-router-dom'

const MyAccountOrders = () => {
  return (
    <div className='myaccout-wrapper'>
      <div className="myaccount-main-body">

        <div className="myaccount-homepage">
          <div className="homepage-content">
            <h1>These are your orders</h1>
            <div className="drop-down-containers">
              <div className="left-side">
                <div className="drop-down">
                  <select name="" id="">
                    <option value="">Delivery Status</option>
                  </select>
                </div>
                <div className="drop-down">
                  <select name="" id="">
                    <option value="">Order Time : Last 6 Months</option>
                  </select>
                </div>
              </div>

              <div className="right-side">
                <form action="">
                  <div className="search-bar">
                    <div className="search-bar-icon">
                      <img src="/Images/search-01.png" alt="" />
                    </div>
                    <input type="search" placeholder='Search product name / order no' />

                  </div>
                  <div className="search-btn">
                    <button>Search</button>

                  </div>
                </form>
              </div>
            </div>

            <div className="oredr-tracking-container">
              <div className="tracking-titles">
                <div className="order-id">
                  <h4> <span>Order ID</span> TC-KL00123</h4>
                </div>
                <div className="oredr-placed">
                  <h4> <span>Order Placed</span>Monday, 23 Sept 2024</h4>
                </div>
                <div className="total-amount">
                  <h4> <span>Total Amount</span>₹1500.00</h4>
                </div>
              </div>


            </div>
            <div className="container-fluid">
              <div className="row tracking-container-row" >
                <div className="col-lg-8">
                  <div className="track-container-left-side">
                    <div className="oredr-image">
                      <img src="/Images/trend prod1.svg" alt="" />
                    </div>
                    <div className="order-details">
                      <h5>Arriving on 23rd Dec 2023</h5>
                      <p>Slurrp Farm No Maida No MSG Not Fried, Curry Masala Millet Hakka Noodles, Pack of 3 Hakka Noodles Vegetarian (192 g)</p>
                      <Link className='vieworder' to='/'>View Order Details</Link>
                    </div>
                  </div>

                </div>
                <div className="col-lg-4">
                  <div className="track-container-right-side">
                    <div className="view-account-btn">
                      <button>Vew Tracking Details</button>
                    </div>
                    <div className="get-help-btn">
                      <button>Get Help</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="oredr-tracking-container">
              <div className="tracking-titles">
                <div className="order-id">
                  <h4> <span>Order ID</span> TC-KL00123</h4>
                </div>
                <div className="oredr-placed">
                  <h4> <span>Order Placed</span>Monday, 23 Sept 2024</h4>
                </div>
                <div className="total-amount">
                  <h4> <span>Total Amount</span>₹1500.00</h4>
                </div>
              </div>


            </div>
            <div className="container-fluid">
              <div className="row tracking-container-row" >
                <div className="col-lg-8">
                  <div className="track-container-left-side">
                    <div className="oredr-image">
                      <img src="/Images/trend prod1.svg" alt="" />
                    </div>
                    <div className="order-details">
                      <h5>Delivered on 23rd Dec 2023</h5>
                      <p>Slurrp Farm No Maida No MSG Not Fried, Curry Masala Millet Hakka Noodles, Pack of 3 Hakka Noodles Vegetarian (192 g)</p>
                      <Link className='vieworder' to='/'>View Order Details</Link>
                    </div>
                  </div>

                </div>
                <div className="col-lg-4">
                  <div className="track-container-right-side">
                    <div className="view-account-btn">
                      <button><img src="/Images/arrow-rotate-right-01.svg" alt="" />Vew Tracking Details</button>
                    </div>
                    <div className="get-help-btn">
                      <button>Review Product</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MyAccountOrders