import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './OrderInnerPageCancellation.scss'
import { PiWarningCircleLight } from "react-icons/pi";


const OrderInnerPageCancellation = () => {
    return (
        <div className='order-cancellation-mainpage'>
            <Navbar/>
            <div className="order-sub-body">
                <h1>Cancel & Support</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4">
                            <ul className="image-list">
                                <h1>
                                    Cancel & Support
                                </h1>
                                <li>
                                    <input type="checkbox" id="product1" />
                                    <label htmlFor="product1">
                                        <img src="/Images/trend prod2.svg" alt="Product 1" />
                                    </label>
                                    <div className="product-description">
                                        <p>Slurrp Farm No Maida No MSG Not Fried, Curry Masala Millet Hakka Noodles, Pack of 3 Hakka Noodles Vegetarian (192 g)</p>
                                        <span>Qty : 2</span>
                                    </div>
                                </li>
                                <li>
                                    <input type="checkbox" id="product2" />
                                    <label htmlFor="product2">
                                        <img src="/Images/trend prod2.svg" alt="Product 2" />
                                    </label>
                                    <div className="product-description">
                                        <p>Slurrp Farm No Maida No MSG Not Fried, Curry Masala Millet Hakka Noodles, Pack of 3 Hakka Noodles Vegetarian (192 g)</p>
                                        <span>Qty : 2</span>
                                    </div>

                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4">
                            <div className="cancellation-card">
                                <div className="containeer-heading">
                                    <h1>
                                        Cancellation Reason
                                    </h1>
                                </div>


                                <div className="reason-container">
                                    <label htmlFor="">Reasons *</label>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            < div className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

                                            </div>
                                        </h2>
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    < div className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        <div className="account-info">

                                                            <div className="text">
                                                                <span>I Entered Wrong Address</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        hanan
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="change-address-container">


                                    <div className="address-card-description">
                                        <div className="description-heading">
                                            <h1>Do you want to change the address?</h1>
                                        </div>
                                        <p>Since the order is not shipped yet. You can request change the address if you wish to. </p>
                                        <span>Current Address</span>
                                        <div className="description-heading">
                                            <h1>Akhil V, 9539366641</h1>
                                        </div>
                                        <p>Thara Trading, Near KSRTC Bus Depo, East town Perinthalmanna, Malayalam 679329
                                            <div className="change-my-address-btn">
                                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Change My Address</button>

                                            </div>

                                            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h4 className="modal-title fs-5" id="exampleModalLabel">Change Address?</h4>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                    <div className="description-heading">
                                            <h1>Do you want to change the address?</h1>
                                        </div>
                                        <p>Since the order is not shipped yet. You can request change the address if you wish to. </p>
                                        <span>Current Address</span>
                                        <div className="description-heading">
                                            <h1>Akhil V, 9539366641</h1>
                                        </div>
                                        <p>Thara Trading, Near KSRTC Bus Depo, East town Perinthalmanna, Malayalam 679329</p>
                                                    </div>
                                                    <div className="modal-footer" style={{display:"flex",justifyContent:"start"}}>
                                                        <button type="button" className="btn modal-button1" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn modal-button2">Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </p>



                               
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="col-lg-4">

                            <div className="overviw-container">
                                <div className="overvie-heading">
                                    <h1>Overview</h1>

                                    <div className="overviw-details">
                                        <table>
                                            <tr>
                                                <td><span>Order ID</span></td>
                                                <td>TC-09876</td>
                                            </tr>
                                            <tr>
                                                <td><span>Order ID</span></td>
                                                <td>02 Dec 2023, 08:00PM</td>
                                            </tr>
                                            <tr>
                                                <td><span>Order ID</span></td>
                                                <td>TC-09876</td>
                                            </tr>
                                            <tr>
                                                <td><span>Order ID</span></td>
                                                <td>TC-09876</td>
                                            </tr>
                                            <tr>
                                                <td><span>Order ID</span></td>
                                                <td>TC-09876</td>
                                            </tr>
                                        </table>
                                        <div className="refund-method">
                                            <h1>Select Refund Method</h1>
                                            <label className="custom-radio">
                                                <input type="radio" name="refund-method" value="original" checked />
                                                <span className="radio-button"></span>
                                                Original Payment Method <span><PiWarningCircleLight className='warning' />
                                                </span>
                                            </label>
                                            <label className="custom-radio">
                                                <input type="radio" name="refund-method" value="wallet" />
                                                <span className="radio-button"></span>
                                                Wallet
                                            </label>
                                        </div>

                                        <div className="cancel-oredr-btn">
                                            <button >
                                                Cancel Order
                                            </button>
                                            <button className='btn1'>
                                                Don’t Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default OrderInnerPageCancellation