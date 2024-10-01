import React from 'react'
import { Link } from 'react-router-dom'
import './SignInWithEmailPersonalAddress.scss'

const SignInWithEmailPersonalAddress = () => {
  return (
    <div className='sign-in-with-personal-Address'>
         <div className="signWithOtpMainWrapper">
        <div className="sign-with-otp-card">
          <div className="number-section">
            <h3>Enter Your Personal Details</h3>
            <h6 className='sub-heading-form'>Before shopping provide your basic details</h6>
            <form action="">
   

              <div><label htmlFor="">Name *</label></div>
              <div><input type="text" className='emailOrPhone' /></div>
              <div><label htmlFor="">Email *</label></div>
              <div><input type="email" className='emailOrPhone' /></div>
              <div><label htmlFor="">Referral Code (Optional)</label></div>
              <div><input type="text" className='emailOrPhone' /></div>
              
        

      
              <button>Continue to Home</button>
            </form>


          </div>

        </div>

      </div>
    </div>
  )
}

export default SignInWithEmailPersonalAddress
