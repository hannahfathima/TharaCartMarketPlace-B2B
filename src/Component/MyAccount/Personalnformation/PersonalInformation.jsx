import { useState } from 'react';
import './PersonalInformation.scss'

const PersonalInformation = ({ user }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='Personal-information-main-wrapper'>
            <div className="personal-information">
                <h2 className='information-heading'>Personal Information</h2>
                <div className="container-fluid">
                    <div className="personal-information-cards-wrapper row">
                        <div className="col-lg-6 infrmtn-left">
                            <div className="address-card">
                                <div className="address-item">
                                    <div>
                                        <p>Full Name</p>
                                        <span>{user.name}</span>
                                    </div>
                                    <div><button>Edit</button></div>
                                </div>
                                <div className="address-item">
                                    <div>
                                        <p>Email</p>
                                        <div><span>{user?.email}</span></div>
                                        {/* <span className="verifaid">Verified</span><img src="/Images/Icon copy.png" alt="" /> */}
                                    </div>
                                    <div><button>Edit</button></div>
                                </div>
                                <div className="address-item">
                                    <div>
                                        <p>Phone</p>
                                        <div><span>+91-{user.address[0].phoneNumber}</span></div>
                                        {/* <span className="verifyNow">Verify Now</span> */}
                                    </div>
                                    <div><button>Edit</button></div>
                                </div>
                                <div className="address-item">
      <div>
        <p>Password</p>
        <span>{showPassword ? user.password : '*'.repeat(user.password.length)}</span>
      </div>
      <div>
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>

                            </div>
                        </div>
                        <div className="col-lg-6 infrmtn-right">
                            <div className="connect-social-account-card">
                                <h2>Connect Social Accounts</h2>
                                <div className="create-account-item">
                                    <div className="connect-google">
                                        <img src="/Images/google.svg" alt="" />
                                        <span>Connect Google Account</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <img src="/Images/x-circle-contained.png" className='cross-img' alt="" />
                                        <span className='connection'>Not Connected</span>
                                    </div>
                                </div>
                                <div className="create-account-item">
                                    <div className="connect-google">
                                        <img src="/Images/Apple.png" alt="" />
                                        <span>Apple account</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                        <img src="/Images/Icon copy.png" className='cross-img' alt="" />
                                        <span className='connection'>Connected</span>
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

export default PersonalInformation
