import './Address.scss'
import { BsThreeDotsVertical } from "react-icons/bs";

const Address = ({user}) => {
    return (
        <div className='AddressPageMainWrapper'>
            <div className="address-section">
                <div className="address-header">
                    <h2>My Saved Addresses</h2>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Address</button>
                </div>
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
                                        <div><input type="text" className='name-input' /></div>
                                        <div><label htmlFor="">Phone Number *</label></div>
                                        <div>
                                            <div className="number-input">
                                                <div className="contry-code">
                                                    <select name="" id="">
                                                        <option value="">+91</option>
                                                    </select>
                                                </div>
                                                <div className="number-typing-section"><input type="text" /></div>
                                            </div>
                                        </div>
                                        <div><label htmlFor="">Type of Address</label></div>
                                        <div style={{ paddingTop: "1rem" }}>
                                            <span className='address-type'>Home</span>
                                            <span className='address-type active-address-type'>Office</span>
                                        </div>
                                        <div className='check-box'>
                                            <input type="checkbox" />
                                            <label htmlFor="">Make this as my primary address</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 modal-right">
                                        <h3>Delivery Address</h3>
                                        <div className="use-my-location">
                                            <img src="/Images/target-01.png" alt="" />
                                            <span>Use My Location</span>
                                        </div>
                                        <div><label htmlFor="">House No, Building Name*</label></div>
                                        <div><input type="text" className='address-input' /></div>
                                        <div><label htmlFor="">Local Area,  Nearby Road, City *</label></div>
                                        <div><input type="text" className='address-input' /></div><div><label htmlFor="">Landmark</label></div>
                                        <div><input type="text" className='address-input' /></div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="">Pincode *</label>
                                                <input type="text" />
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="">State *</label>
                                                <input type="text" />
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button>Save Address</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="address-cards-main row">
                        {
                            user.address.map((data,index)=>
                                <div className="col-lg-6" key={index}>
                            <div className="address-card">
                                <div className="card-header">
                                    <div>
                                        {data.primaryAddress?(<button className='addressType active-address'>Default</button>):''}
                                        <button className='addressType'>{data.typeOfAddress}</button>
                                    </div>
                                    <div>
                                        <button className='edit-btn'>Edit</button>
                                        <BsThreeDotsVertical className='menu-dot' />
                                    </div>
                                </div>
                                <h2 className="card-title">{data.name},+91 {data.phoneNumber}</h2>
                                <p>{data.houseName}, {data.landMark}, {data.localArea}, {data.state},IN - {data.pincode}</p>
                                <p>{`Alternative Number : ${data.alternativePhoneNumber}`}</p>
                            </div>
                        </div>
                            )
                        }
                       
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address
