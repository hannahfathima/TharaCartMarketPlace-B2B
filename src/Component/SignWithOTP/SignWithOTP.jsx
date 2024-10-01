import { Link } from 'react-router-dom'
import './SignWithOTP.scss'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
const SignWithOTP = () => {
  return (
    <>
      <Navbar />

      <div className="signWithOtpMainWrapper">
        <div className="sign-with-otp-card">
          <div className="number-section">
            <h3>Continue to B2B Market</h3>
            <form action="">
              <div><label htmlFor=""> Phone Number *</label></div>
              <div><input type="text" className='emailOrPhone' /></div>
              <div style={{ display: "flex", alignItems: "center", paddingTop: "10px", paddingBottom: "10px" }}>
                <input type="checkbox" id='subscribe' />
                <label htmlFor='subscribe' className='sub-label'>Subscribe to WhatsApp, Email notifications. (Optional)</label>
              </div>
              <button>Get OTP</button>
            </form>
            <p>By Continuing, You agreeing to share my information. Also <br />
              agree with our <a href="">Terms of Service</a> & <a href="">Privacy Policy</a>.</p>
            <div className="underline-number-section">
              <div className="ul"></div>
              <span>OR</span>
              <div className="ul"></div>
            </div>
          </div>
          <div className="google-authentication">
            <div className="google-auth-container">
              <img src="/Images/google.svg" alt="" />
              <span>Continue with Google</span>
            </div>
            <div className="google-auth-container">
              <img src="/Images/email-icon.svg" alt="" />
              <span>Continue with Email</span>
            </div>

          </div>
        </div>
        <div className="sign-to-B2B-card">
          <p className='buy-bsns'>Buying for Business? </p>
          <Link>Sign In to B2B Account</Link>
        </div>
      </div>
      <Footer />

    </>
  )
}

export default SignWithOTP
