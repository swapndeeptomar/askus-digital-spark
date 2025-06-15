import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-askus-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-askus-purple text-white flex items-center justify-center font-bold">D</div>
              <span className="text-xl font-bold">DigiSphere</span>
            </div>
            <p className="text-gray-300 mb-4">Innovative digital solutions for businesses of all sizes. Transform your online presence with our expert services.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white">Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-300 hover:text-white">Portfolio</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/blogs" className="text-gray-300 hover:text-white">Blogs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-white">Web Development</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white">Mobile App Development</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white">SEO Optimization</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white">Digital Marketing</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white">Graphic Design</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white">Cybersecurity</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="mt-1 text-askus-purple" size={16} />
                <span className="text-gray-300">ask.us.technocrats@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 text-askus-purple" size={16} />
                <span className="text-gray-300"><u><a href="">9926089855</a></u></span>
                <span className="text-gray-300"><u><a href="">9294711619</a></u></span></li>
                <li className="flex items-start gap-3"><span className="text-gray-300"> &nbsp;&nbsp; <u><a href="">9039616208</a></u></span>
              
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 text-askus-purple" size={16} />
                <span className="text-gray-300">Indore , Madhya Pradesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} DigiSphere. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
