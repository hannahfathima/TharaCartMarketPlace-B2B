import React from 'react'
import './Otp.scss'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
const Otp = () => {
  return (
    <div className='otp-main-body'>
      <Navbar />
      <div className="otp-sub-body">
        <div className="otp-form-container">
          <div className="form-title">
            <h1>Enter OTP</h1>
          </div>
          <div className="form-subtitle">
            <h3>Enter the verification code we just sent on your phone number <span>+91 987654321</span></h3>
          </div>

          <form action="">
            <div className="otp-input">
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />

            </div>
            <div className="otp-timer">
              <h3>00:30</h3>
            </div>

            <button>Confirm</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Otp
