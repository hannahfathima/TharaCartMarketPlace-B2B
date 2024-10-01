import React from 'react'
import { Link } from 'react-router-dom'
import './SignInWithEmailB2b.scss'
import { PiWarningCircleBold } from "react-icons/pi";

// import ''
const SignInWithEmailB2b = () => {
  return (
    <div className='b2b-main-sign-in'>
      <div className="signWithOtpMainWrapper">
        <div className="sign-with-otp-card">
          <div className="number-section">
            <h3>Complete Business Details</h3>
            <form action="">
              <div className="tax-option-container">
                <h1 className='text-option'>Tax Option*</h1>
                <div className="radio-sec">
                  <label>
                    <input type="radio" name="taxOption" />GSTIN Number
                  </label>
                  <label>
                    <input type="radio" name="taxOption" />Enrolment ID / UIN
                  </label>
                </div>
              </div>

              <div><label htmlFor="">Enter GST Number *</label></div>
              <div><input type="text" className='emailOrPhone' /></div>
              <div><label htmlFor=""> Official Phone Number *</label></div>
              <div className='phone-input'><div className="left-input-phone">+91</div> <input type="text" className='' /></div>
              <div style={{ display: "flex", alignItems: "center", paddingTop: "10px", paddingBottom: "10px" }}>
                <span className='gstnumber'>Don’t have GSTIN?  <Link to='/'>Apply Now</Link></span>
              </div>

              <div className="warning-div">
                <div className="warning-symbol">
                  <PiWarningCircleBold  className='PiWarningCircleBold'/>

                </div>
                <div className="warning-mesage">
                  <h6 className='warning-text'>Official phone number should same as phone number registered In GSTIN</h6>
                </div>
              </div>
              <button>Verify</button>
            </form>


          </div>

        </div>

      </div>
    </div>
  )
}

export default SignInWithEmailB2b
