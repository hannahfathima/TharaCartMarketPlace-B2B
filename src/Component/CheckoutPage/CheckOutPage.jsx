import { useEffect, useState } from 'react';
import './CheckOutPage.scss'
import { BiUser } from "react-icons/bi";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import UseLoginedUser from '../../redux/hooks/NavbarHook/UseLoginedUser';
import axios from 'axios';
import baseUrl from '../../baseUrl';
import useCartProduct from '../../redux/hooks/cartPageHooks/useCartProduct';
import { updateCartQuantity } from '../../redux/slices/cartSlices/updateQuantity';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../redux/slices/cartSlices/removeCartItemSlice';
import CustomAlert from '../ConfirmAlert/ConfirmAlert';
import useFetchAddress from '../../redux/hooks/checkoutPageHooks/useFetchAddress';
import { Link, useNavigate } from 'react-router-dom';

const CheckOutPage = () => {
    const [count, setCount] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [cod,setCod]=useState(false)
const [payment,setPayment]=useState(false)
    const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(false);
    const [buttonText, setButtonText] = useState("Proceed to Checkout");
    const [isPaymentOptionsExpanded, setIsPaymentOptionsExpanded] = useState(false);
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        alternativePhoneNumber: '',
        typeOfAddress: 'Home',
        primaryAddress: false,
        houseName: '',
        localArea: '',
        landMark: '',
        pincode: '',
        state: '',
        location: { latitude: 0, longitude: 0 },
        country: '',// Default location for latitude and longitude
    });

    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [productIdToRemove, setProductIdToRemove] = useState(null);
    const { status: removeItemStatus, error: removeItemError } = useSelector(state => state.removeCartItem);


    const { loginedUser } = UseLoginedUser()
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

    const [isExpanded, setIsExpanded] = useState(true);



    const handleAccordionToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleRadioChange = (index) => {
        setSelectedAddressIndex(index);
    };

    const { address, status: addressStatus, error: addressError, refetch: addressRefetch } = useFetchAddress()
    const { refetch, cartProduct, status: cartProdStatus, error: cartProderror } = useCartProduct(); // Include refetch;
    const handleUpdateQuantity = async (productId, quantity) => {
        try {
            await dispatch(updateCartQuantity({ productId, quantity })).unwrap();
            refetch(); // Refetch cart data after quantity update
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };
    const handleCancel = () => {
        setShowAlert(false);
    };
    const handleRemove = (productId) => {
        setProductIdToRemove(productId);
        setShowAlert(true);
    };

    const handleConfirm = async () => {
        if (productIdToRemove) {
            try {
                await dispatch(removeFromCart(productIdToRemove)).unwrap();
                refetch(); // Refetch cart data after removal
            } catch (error) {
                console.error('Failed to remove item:', error);
            }
        }
        setShowAlert(false);
    };
    const subtotal = cartProduct?.reduce((acc, item) => acc + item.sellingPrice * item.quantity, 0) || 0;




    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        console.log(formData);

    };

    // Function to get the user's current location
    const handleUseMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Location:', latitude, longitude);

                    // Update formData with the current location
                    setFormData({
                        ...formData,
                        location: { latitude, longitude },
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to fetch location');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    };

    const addAddress = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('No auth token found');
                return;
            }

            // Structure the address object (using formData)
            const address = [
                {
                    name: formData.name,
                    phoneNumber: formData.phoneNumber,
                    alternativePhoneNumber: formData.alternativePhoneNumber,
                    typeOfAddress: formData.typeOfAddress,
                    primaryAddress: formData.primaryAddress,
                    houseName: formData.houseName,
                    localArea: formData.localArea,
                    landMark: formData.landMark,
                    pincode: formData.pincode,
                    state: formData.state,
                    location: formData.location,
                    country: formData.country// Location with latitude and longitude
                },
            ];

            // Send the address data to the backend
            const res = await axios.post(`${baseUrl}/add-address`,{ address }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(res.data);
            alert('Address Added Successfully');
        } catch (error) {
            console.error('Error adding address:', error);
            alert('Error adding address');
        }
    };

    useEffect(() => {
        if (selectedAddressIndex !== null) {
            setIsOrderSummaryExpanded(true);
            setButtonText("Proceed to Payment");
        }
    }, [selectedAddressIndex]);

    const handleButtonClick = () => {
        if (selectedAddressIndex === null) {
            // Logic to proceed to checkout (e.g., navigate to address selection)
        } else {
            // Open the Payment Options collapse
            setIsPaymentOptionsExpanded(true);
        }
    };
    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
        setButtonText("Place Order");
        setPayment(true)
        setCod(true)
    };
    const placeOrder = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('authToken'); // Retrieve authToken from local storage
    
            if (!token) {
                alert('No authentication token found');
                return;
            }
    
            // Prepare the payload for the request
            const orderData = {
                cod, // Pass the COD status
                products: cartProduct.map((product) => ({
                    id: product.productId,    
                    quantity: product.quantity 
                })),
                totalPrice:subtotal
            };
    
            // Make the axios POST request
            const res = await axios.post(`${baseUrl}/place-order`, 
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in Authorization header
                    },
                }
            );
    
            console.log(res.data);
            alert('Order placed successfully');
            navigate(`/order-completed-page/${res.data.orderId}`)
            
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again.');
        }
    };
    
    
    return (
        <div className='CheckOutPageMainWrapper'>
            <div className="checkuot-page">
                {/* =======================nav-bar==================== */}
                <div className="navigation-bar">
                    <div className="nav-left">
                        <Link to='/'><img src="/Images/tharacart-nav-logo.svg" alt="" /></Link>
                    </div>
                    <div className="nav-center">
                        <img src="/Images/fi_1746680.png" alt="" />
                        <span>Secured Checkout</span>
                    </div>
                    <div className="nav-right">
                        <BiUser className='user-icon' />
                        <select name="" id="">
                            <option value="">{loginedUser?.name}</option>
                        </select>
                    </div>
                </div>
                {/* =================================checkoutPage-left================================ */}
                <div className="container-fluid">
                    <div className="address-section-and-order-summery-wrapper row">
                        <div className="col-lg-8 address-section">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header select-address" id="headingOne">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#SelectAddress"
                                            aria-expanded={isExpanded}
                                            aria-controls="collapseOne"
                                            onClick={handleAccordionToggle}
                                        >
                                            {/* Display the selected address or the default message */}
                                            {selectedAddressIndex !== null ? (
                                                <div className="selected-address-true-section">
                                                    <div style={{ width: "80%" }}>
                                                        <h3>Select Address</h3>
                                                        <span className="selected-address">
                                                            {`${address[selectedAddressIndex].houseName}, ${address[selectedAddressIndex].localArea}, ${address[selectedAddressIndex].state}, ${address[selectedAddressIndex].pincode}`}
                                                        </span>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "end", width: "20%" }}>
                                                        <button className="edit-btn" data-bs-toggle="collapse" data-bs-target="#SelectAddress">
                                                            Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <span>1. Select Address</span>
                                                    {/* Always show the Add New Address button */}
                                                    <button className="add-new-address-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Add New Address
                                                    </button>
                                                </>
                                            )}
                                        </button>
                                    </h2>

                                    {/* Address Selection Collapse */}
                                    <div id="SelectAddress" className={`accordion-collapse collapse ${isExpanded ? 'show' : ''}`} aria-labelledby="headingOne">
                                        <div className="accordion-body">
                                            {address?.map((data, index) => (
                                                <div className="row AddressRow" key={index}>
                                                    <div className="col-lg-8 select-address-left">
                                                        <div className="radio-button">
                                                            <div>
                                                                <div className="custom-radio-container">
                                                                    <input
                                                                        type="radio"
                                                                        id={`address-radio-${index}`}
                                                                        name="customRadio"
                                                                        className="custom-radio"
                                                                        checked={selectedAddressIndex === index}
                                                                        onChange={() => {
                                                                            handleRadioChange(index); // Pass the index to the handler
                                                                            setIsExpanded(false); // Collapse the address section after selection
                                                                        }}
                                                                    />
                                                                    <label htmlFor={`address-radio-${index}`} className="custom-radio-label"></label>
                                                                </div>
                                                            </div>
                                                            <div className="address-details">
                                                                <h6>
                                                                    <span>{data.name},</span> <span>+91 {data.phoneNumber}</span>
                                                                </h6>
                                                                <p>{data.localArea}, {data.landMark}, {data.state}, {data.pincode}</p>
                                                                <p>{data.alternativePhoneNumber ? `Alternative Number: ${data.alternativePhoneNumber}` : "No Alternative Number"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 select-address-right">
                                                        <button>Add Delivery Note</button>
                                                        <button>Edit</button>
                                                    </div>
                                                </div>
                                            ))}
                                            {showAlert && (
                                                <CustomAlert
                                                    message="Are you sure you want to remove this item from the cart?"
                                                    onConfirm={handleConfirm}
                                                    onCancel={handleCancel}
                                                />
                                            )}
                                            <div className="seemore-btn">
                                                <button>See More Addresses <HiOutlineChevronDown /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Address</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row">
                                                    <div className="col-lg-6 modal-left">
                                                        <h3>Personal Details</h3>
                                                        <div><label htmlFor="">Full Name *</label></div>
                                                        <div><input type="text" className='name-input' name="name" value={formData.name} onChange={handleInputChange} /></div>

                                                        <div><label htmlFor="">Phone Number *</label></div>
                                                        <div className="number-input">
                                                            <div className="contry-code">
                                                                <select name="" id="">
                                                                    <option value="">+91</option>
                                                                </select>
                                                            </div>
                                                            <div className="number-typing-section">
                                                                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                                                            </div>
                                                        </div>

                                                        <div><label htmlFor="">Alternative Phone Number</label></div>
                                                        <div><input type="text" className='number-input' name="alternativePhoneNumber" value={formData.alternativePhoneNumber} onChange={handleInputChange} /></div>

                                                        <div><label htmlFor="">Type of Address</label></div>
                                                        <div style={{ paddingTop: "1rem" }}>
                                                            <span className={`address-type ${formData.typeOfAddress === 'Home' ? 'active-address-type' : ''}`} onClick={() => setFormData({ ...formData, typeOfAddress: 'Home' })}>Home</span>
                                                            <span className={`address-type ${formData.typeOfAddress === 'Office' ? 'active-address-type' : ''}`} onClick={() => setFormData({ ...formData, typeOfAddress: 'Office' })}>Office</span>
                                                        </div>

                                                        <div className='check-box'>
                                                            <input type="checkbox" name="primaryAddress" checked={formData.primaryAddress} onChange={handleInputChange} />
                                                            <label htmlFor="">Make this as my primary address</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 modal-right">
                                                        <h3>Delivery Address</h3>
                                                        <div className="use-my-location" onClick={handleUseMyLocation} style={{ cursor: 'pointer' }}>
                                                            <img src="/Images/target-01.png" alt="Use My Location" />
                                                            <span>Use My Location</span>
                                                        </div>

                                                        <div><label htmlFor="">House No, Building Name*</label></div>
                                                        <div><input type="text" className='address-input' name="houseName" value={formData.houseName} onChange={handleInputChange} /></div>

                                                        <div><label htmlFor="">Local Area, Nearby Road, City *</label></div>
                                                        <div><input type="text" className='address-input' name="localArea" value={formData.localArea} onChange={handleInputChange} /></div>

                                                        <div><label htmlFor="">Landmark</label></div>
                                                        <div><input type="text" className='address-input' name="landMark" value={formData.landMark} onChange={handleInputChange} /></div>
                                                        <div><label htmlFor="">Country</label></div>
                                                        <div><input type="text" className='address-input' name="country" value={formData.country} onChange={handleInputChange} /></div>
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <label htmlFor="">Pincode *</label>
                                                                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} />
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <label htmlFor="">State *</label>
                                                                <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="modal-footer">
                                                <button type="button" onClick={addAddress}>Save Address</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item orderSummeryWrapper">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button
                                            className={`accordion-button ${isOrderSummaryExpanded ? '' : 'collapsed'}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#OrderSummery"
                                            aria-expanded={isOrderSummaryExpanded}
                                            aria-controls="collapseTwo"
                                        >
                                            <span>2. Order Summary</span>
                                        </button>
                                    </h2>
                                    <div
                                        id="OrderSummery"
                                        className={`accordion-collapse collapse ${isOrderSummaryExpanded ? 'show' : ''}`}
                                        aria-labelledby="headingTwo"
                                    >
                                        <div className="accordion-body">
                                            <div className="order-summery-details-main">
                                                <div className="reg-now-container">
                                                    <img src="/Images/Vector (1).png" alt="" />
                                                    <div>
                                                        <span className='first-span'><strong>Save upto 15% </strong>with Business Account</span>
                                                        <span className="second-span">You’ll get Wholesale Price & GST Input tax credit</span>
                                                    </div>
                                                    <div><button>Register Now</button></div>
                                                </div>

                                                {
                                                    cartProduct?.length > 0 ? (
                                                        cartProduct?.map((data, index) =>
                                                            <div className="cart-item row" key={index}>
                                                                <div className="col-lg-8 cart-item-left">
                                                                    <div className="image-description-wrapper">
                                                                        <div className="prod-image"><img src={data.imageUrls} alt="" /></div>
                                                                        <div className="discription">
                                                                            <p>{data.name}</p>
                                                                            <span className='brand'>Brand</span>
                                                                            <span className="brand-value">{data.brandDetails.brandName}</span>
                                                                            <span className="orderd-buy">Sold by</span>
                                                                            <span className="ordered-by-value">{data.sellerDetails.storedetails.storename}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="count-section">
                                                                        <div className="calculator">
                                                                            <div className="decrement" onClick={() => handleUpdateQuantity(data.productId, data.quantity - 1)}><FaMinus className='count-icon' /></div>
                                                                            <div className="count"><span>{data.quantity}</span></div>
                                                                            <div className="increment"
                                                                                onClick={() => data.quantity < data.b2cMaxQty
                                                                                    ? handleUpdateQuantity(data.productId, data.quantity + 1)
                                                                                    : null}
                                                                                style={{ cursor: data.quantity >= data.b2cMaxQty ? 'not-allowed' : 'pointer', opacity: data.quantity >= data.b2cMaxQty ? 0.5 : 1 }}>
                                                                                <FaPlus className='count-icon' />
                                                                            </div>
                                                                        </div>
                                                                        <p onClick={() => handleRemove(data.productId)} disabled={removeItemStatus === 'loading'} style={{ cursor: "pointer" }}>Remove</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 cart-item-right">
                                                                    <div>
                                                                        <span className="offer-price">₹{data.sellingPrice.toFixed(2)}</span>
                                                                        <span className="og-price"><strike>₹{data.price.toFixed(2)}</strike></span>
                                                                        <span className="gst">Incl. GST</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className='offer-ratio'>{((data.price - data.sellingPrice) / data.price * 100).toFixed(0)}% OFF</span>
                                                                        <span className='saved-amt'>You Save ₹{(data.price - data.sellingPrice).toFixed(2)}</span>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        )
                                                    ) : (<><p className='No-Data'>No Data In Your Products</p></>)
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className={`accordion-button ${isPaymentOptionsExpanded ? '' : 'collapsed'}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target=""
                                            aria-expanded={isPaymentOptionsExpanded}
                                            aria-controls="collapseThree"
                                        >
                                            <span className='payment-heading'>3. Payment Options</span>
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className={`accordion-collapse collapse ${isPaymentOptionsExpanded ? 'show' : ''}`}
                                        aria-labelledby="headingThree"
                                    >
                                        <div className="accordion-body payment-body">
                                            <form>
                                                <div className="payment-method-item">
                                                    <label className="custom-radio">
                                                        <input
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="Cash on Delivery"
                                                            onChange={handlePaymentMethodChange}
                                                        />
                                                        <span className="custom-radio-button"></span>
                                                        <img src="/Images/Frame 1261155772.png" alt="" />
                                                        <span>Cash on Delivery</span>
                                                    </label>
                                                </div>
                                                {/* <div className="payment-method-item">
                                                    <label className="custom-radio">
                                                        <input type="radio" name="paymentMethod" value="UPI" />
                                                        <span className="custom-radio-button"></span>
                                                        <img src="/Images/UPI.png" alt="" />
                                                        <span>UPI</span>
                                                    </label>
                                                </div>
                                                <div className="payment-method-item">
                                                    <label className="custom-radio">
                                                        <input type="radio" name="paymentMethod" value="Card" />
                                                        <span className="custom-radio-button"></span>
                                                        <img src="/Images/CARD.png" alt="" />
                                                        <span>Card</span>
                                                    </label>
                                                </div>
                                                <div className="payment-method-item">
                                                    <label className="custom-radio">
                                                        <input type="radio" name="paymentMethod" value="Net banking" />
                                                        <span className="custom-radio-button"></span>
                                                        <img src="/Images/NET-BANKING.png" alt="" />
                                                        <span>Net banking</span>
                                                    </label>
                                                </div>
                                                <div className="payment-method-item">
                                                    <label className="custom-radio">
                                                        <input type="radio" name="paymentMethod" value="Wallet" />
                                                        <span className="custom-radio-button"></span>
                                                        <img src="/Images/WALLET.png" alt="" />
                                                        <span>Wallet</span>
                                                    </label>
                                                </div>
                                                <div className="payment-method-item">
                                                    <label className="custom-radio">
                                                        <input type="radio" name="paymentMethod" value="EMI" />
                                                        <span className="custom-radio-button"></span>
                                                        <img src="/Images/EMI.png" alt="" />
                                                        <span>EMI</span>
                                                    </label>
                                                </div>
                                                <div className="payment-method-item">
                                                    <label className="custom-radio">
                                                        <input type="radio" name="paymentMethod" value="Pay Later" />
                                                        <span className="custom-radio-button"></span>
                                                        <img src="/Images/PAY-LATER.png" alt="" />
                                                        <span>Pay Later</span>
                                                    </label>
                                                </div> */}
                                            </form>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="order-summery-card">
                                <h4>Order Summary</h4>
                                <div className="order-details">
                                    <table>
                                        <tr>
                                            <td className='left-td'>Sub Total</td>
                                            <td className='right-td total'>₹{subtotal.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className='left-td'>Shipping Charges</td>
                                            <td className='right-td'><span className='crossed-price'><strike>₹40.00</strike> | </span> <span className='free-dlvry-text'>Free Delivery</span></td>
                                        </tr>
                                        <tr>
                                            <td className='left-td'>Coupon Discount</td>
                                            <td className='right-td'><span className='discount'>-₹50.00</span></td>
                                        </tr>
                                    </table>
                                    <img src="/Images/Line 39.png" alt="" />
                                    <table>
                                        <tr>
                                            <td className='left-td totel-price-text'>Total</td>
                                            <td className='right-td total-price'>₹{(subtotal - 50).toFixed(2)}</td>
                                        </tr>
                                    </table>
                                    <img src="/Images/Line 40.png" alt="" />
                                    <p className='saved-count'>You can save up to ₹140 on this order</p>
                                    {/* Proceed to Checkout button */}
                                    {payment==true?(
                                        <button  className='checkoutBtn' onClick={placeOrder}>placeOrder</button>
                                    ):(   <button
                                        type="button"
                                        className='checkoutBtn'
                                        disabled={selectedAddressIndex === null}
                                        style={{ backgroundColor: selectedAddressIndex === null ? '#ccc' : '#02400C' }}
                                        onClick={handleButtonClick}
                                    >
                                        {buttonText}
                                    </button>)}
                                 
                                </div>
                                <div className="secured-transaction-container">
                                    <img src="/Images/fi_1746680454848.png" alt="" />
                                    <h6>256 bit Secured Transactions</h6>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CheckOutPage
