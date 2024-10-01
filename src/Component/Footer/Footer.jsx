import { Link } from 'react-router-dom'
import './Footer.scss'

const Footer = () => {
  return (
    <div className='FooterMainWrapper'>
      <div className="top-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-12 footer-left">
              <img src="/Images/tharacart-nav-logo.svg" className='footer-logo' alt="" />
              <p className="footer-address">11/321, Thara Appartments, Hospital road, <br />
                Perinthalmanna, Malappuram, Kerala, 679322</p>
              <p className="download-text">Download Our Mobile App</p>
              <a href=""><img src="/Images/appstore.svg" alt="" style={{ marginRight: "20px" }} /></a>
              <a href=""><img src="/Images/googleplay.svg" alt="" /></a>

            </div>
            <div className="col-lg col-sm-12 col-md-6 footer-right1">
              <h3>About</h3>
              <div className="footer-items">
                <div><span>About Us</span></div>
                <div><span>Career</span></div>
                <div><span>Press</span></div>
                <div><span>Blog</span></div>
              </div>

            </div>
            <div className="col-lg col-sm-12 col-md-6 footer-right2">
              <h3>Make Money</h3>
              <div className="footer-items">
                <div><span>Become A Seller</span></div>
                <div><span>Register Your Brand</span></div>
                <div><span>Be An Affiliate</span></div>
                <div><span>Refer & Eran</span></div>
                <div><span>Advertise In Thara Cart</span></div>

              </div>
            </div>
            <div className="col-lg col-sm-12 col-md-6 footer-right3">
              <h3>Social</h3>
              <div className="footer-items">
                <div><span>Facebook</span></div>
                <div><span>Instagram</span></div>
                <div><span>LinkedIn</span></div>
                <div><span>Youtube</span></div>
                <div><span>Twitter</span></div>
              </div>
            </div>
            <div className="col-lg col-sm-12 col-md-6 footer-right4">
              <h3>Help </h3>
              <div className="footer-items">
                <div><span>Help Centre</span></div>
                <div><span>Buyer Protection</span></div>
                <div><span>Report Infringement</span></div>
                <div><span>Return & Cancellation</span></div>
                <div><span>Don’t have GST?</span></div>
              </div>
            </div>
            <div className="col-lg col-sm-12 col-md-6 footer-right5">
              <h3>Policies </h3>
              <div className="footer-items">
                <div><span>Terms of Use</span></div>
                <div><span>Privacy Policy</span></div>
                <div><span>Shipping Policy</span></div>
                <div><span>Return & Cancellation</span></div>
                <div><span>Affiliate Policy</span></div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <span>© 2019 -2024 Thara Cart Pvt Ltd</span>
        <img src="/Images/footer-cards.svg" alt="" />
      </div>
    </div>
  )
}

export default Footer
