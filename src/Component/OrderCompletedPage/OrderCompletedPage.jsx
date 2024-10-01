import { useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import './OrderCompltedPage.scss'
import useFetchUser from '../../redux/hooks/myAccountHooks/useFetchUser'

const OrderCompletedPage = () => {
    const {orderId}=useParams();
    const {user, status, error}=useFetchUser();

    return (
        <div className='OrderCompltedMainWrapper'>
            <Navbar />
            <div className="order-completed-page">
                <div className="thanks-container">
                    <div className='thanks-container-left'>
                        <img src="/Images/Frame 1261155039.png" alt="" />
                        <div>
                            <h3>Thanks for shopping with us</h3>
                            <p>An email confirming the Order ID : {orderId} has been sent your mail <br /> address {user?.email}</p>
                            <span>You save ₹140 on this order</span>
                        </div>
                    </div>
                    <div className="thanks-container-right">
                        <button>View Order Details</button>
                    </div>

                </div>
                {/* =======================order-summery=================== */}
                <div className="container-fluid">
                    <div className="order-summery-payment-summery-wrapper row">
                        <div className="col-lg-8 col-md-8 col-sm-12 order-summery-section">
                            <div className="order-summery-card">
                                <h3 className='order-item-heading'>Order Summary</h3>
                                <div className="order-item-main-wrapper row">
                                    <div className="col-lg-9 order-details">
                                        <div className="product-image"><img src="/Images/trend prod3.svg" alt="" /></div>
                                        <div className="prod-details">
                                            <p className='delivery-date'>Est. Delivery by 25, Dec 2023</p>
                                            <p className='prod-discription'>Slurrp Farm No Maida No MSG Not Fried, Curry Masala Millet Hakka Noodles, Pack of 3 Hakka Noodles Vegetarian (192 g)</p>
                                            <span className='brand'><span>Brand</span><span>Pisang</span></span>
                                            <span className="sold-by"><span>Sold by</span><span>Thara Online Store</span></span>
                                            <span className="quantity"><span>Quantity</span><span>01</span></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 price-details">
                                        <div>
                                            <span className="offer-price">₹150.50</span>
                                            <span className='og-price'><strike>₹299.05</strike></span>
                                            <span className='gst'>Incl. GST</span>
                                        </div>
                                        <div>
                                            <span className="offer-ratio">25% OFF</span>
                                            <span className='saved-price'>You Save ₹150</span>
                                        </div>
                                        <div>
                                            <span className='delivefry-fee'><strike>₹40.00</strike> | <span className='free-delivery'>Free Delivery</span></span>
                                        </div>
                                    </div>

                                </div>
                                <div className="order-item-main-wrapper row">
                                    <div className="col-lg-9 order-details">
                                        <div className="product-image"><img src="/Images/trend prod3.svg" alt="" /></div>
                                        <div className="prod-details">
                                            <p className='delivery-date'>Est. Delivery by 25, Dec 2023</p>
                                            <p className='prod-discription'>Slurrp Farm No Maida No MSG Not Fried, Curry Masala Millet Hakka Noodles, Pack of 3 Hakka Noodles Vegetarian (192 g)</p>
                                            <span className='brand'><span>Brand</span><span>Pisang</span></span>
                                            <span className="sold-by"><span>Sold by</span><span>Thara Online Store</span></span>
                                            <span className="quantity"><span>Quantity</span><span>01</span></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 price-details">
                                        <div>
                                            <span className="offer-price">₹150.50</span>
                                            <span className='og-price'><strike>₹299.05</strike></span>
                                            <span className='gst'>Incl. GST</span>
                                        </div>
                                        <div>
                                            <span className="offer-ratio">25% OFF</span>
                                            <span className='saved-price'>You Save ₹150</span>
                                        </div>
                                        <div>
                                            <span className='delivefry-fee'><strike>₹40.00</strike> | <span className='free-delivery'>Free Delivery</span></span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 payment-summery-section">
                            <div className="payment-summery-card">
                                <h3>Payment Summary</h3>
                                <table>
                                    <tr>
                                        <td className="left-td">Payment Method</td>
                                        <td className="right-td">Prepaid (Credit Card)</td>
                                    </tr>
                                    <tr>
                                        <td className="left-td">Sub Total</td>
                                        <td className="right-td">₹76.00</td>
                                    </tr>
                                    <tr>
                                        <td className="left-td">Shipping Charges</td>
                                        <td className="right-td"><strike>₹40.00</strike> | <span className="free-delivery">Free Delivery</span></td>
                                    </tr>
                                    {/* <tr>
                                        <td className="left-td">Thara Coins</td>
                                        <td className="right-td">
                                            <img src="/Images/Coin.png" alt="" className="coin" />
                                            <span className="coin-point">1000 Points </span>
                                            <span className="redused-price"> -₹10.00</span>
                                        </td>
                                    </tr> */}
                                    <tr>
                                        <td className="left-td">Coupon Discount</td>
                                        <td className="right-td coupn-dscnd">-₹50.00</td>
                                    </tr>
                                </table>
                                <img src="/Images/Line 39.png" alt="" className="line" />
                                <table>
                                    <tr>
                                        <td className="left-td totel">Total</td>
                                        <td className="right-td totel">₹76.00</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderCompletedPage
