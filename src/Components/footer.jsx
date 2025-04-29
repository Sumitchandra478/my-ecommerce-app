import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // Optional: For social media icons

function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className=" text-white bg-dark py-4 mt-5 mx-auto" style={{width:'93%'}}>
      <div className="container  text-center">
        <div className="row " style={{width:'100%'}}>
          {/* Contact Information */}
          <div className="col-lg-4 mb-1">
            <h5>Contact Information</h5>
            <a style={{textDecoration:'none',color:'#fff'}} href='Tel:8112206447'>Phone: +918112206447</a><br/>
            <a  style={{textDecoration:'none',color:'#fff'}}  href='mailTo:Email: sumitchandra478@gmail.com'>Email: sumitchandra478@gmail.com</a>
            <p>Address: Pune,Maharashtra</p>
          </div>

          {/* Terms & Conditions & Privacy Policy */}
          <div className="col-lg-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/terms" className="text-white">Terms & Conditions</a></li>
              <li><a href="/privacy-policy" className="text-white">Privacy Policy</a></li>
              <li><a href="/about" className="text-white">About Us</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-lg-4 mb-1 text-center">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="https://www.facebook.com/share/14QCEh5RLP/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/sumit_chandra478" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaInstagram />
              </a>
              <a href="https://github.com/Sumitchandra478" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          {/* <div className="col-lg-6 mb-3">
            <h5>Newsletter Signup</h5>
            <form onSubmit={handleNewsletterSignup}>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-light w-100">Subscribe</button>
            </form>
          </div>*/}
        </div> 

        {/* <div className="row mt-6">
          <div className="col text-center">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
          </div>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
