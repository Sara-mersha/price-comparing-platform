import React from 'react';
import '../styles/Footer.css';

// Importing images
import FacebookIcon from '../assets/Social(2).png';
import InstagramIcon from '../assets/Social(1).png';
import TwitterIcon from '../assets/Social.png';
import GooglePlayIcon from '../assets/Google Play.png';
import AppStoreIcon from '../assets/Play Store.png';

const Footer = () => {
  return (
    <footer className="footer" id="about">
      <div className="footer-content">
        <div className="footer-left">
          <h2>price compare</h2>
          <p>Trust your purchase.</p>
        </div>

        <div className="footer-middle">
          <div className="footer-column">
            <h3>Contact</h3>
            <ul>
              <li><a href="#">09-xx-xx-xx-xx</a></li>
              <li><a href="#">Socials</a></li>
              <li><a href="#">22, Hanan K building</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-right">
          <div className="social-media">
            <a href="#"><img src={FacebookIcon} alt="Facebook" /></a>
            <a href="#"><img src={InstagramIcon} alt="Instagram" /></a>
            <a href="#"><img src={TwitterIcon} alt="Twitter" /></a>
          </div>
          <p>Discover our app</p>
          <div className="app-links">
            <a href="#"><img src={GooglePlayIcon} alt="Google Play" /></a>
            <a href="#"><img src={AppStoreIcon} alt="App Store" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>All rights reserved @pricecompare.com 2024&copy;</p>
      </div>
    </footer>
  );
};

export default Footer;
