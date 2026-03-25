import { Link } from "react-router-dom";
import { Facebook, Instagram, Github, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-orange-600 p-1.5 rounded-lg">
                                <span className="text-white font-bold text-xl">B</span>
                            </div>
                            <span className="text-2xl font-bold text-white">BiteBridge</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Connecting communities through surplus food sharing. Our mission is to reduce food waste and ensure no one goes hungry.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
                            <li><Link to="/available-foods" className="hover:text-orange-500 transition-colors">Available Foods</Link></li>
                            <li><Link to="/login" className="hover:text-orange-500 transition-colors">Login / Register</Link></li>
                            <li><Link to="/#how-it-works" className="hover:text-orange-500 transition-colors">How It Works</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Our Features</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                                Food Donation
                            </li>
                            <li className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                                Community Requests
                            </li>
                            <li className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                                Zero Waste Initiative
                            </li>
                            <li className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                                Verified Donors
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-3 text-orange-600 mt-0.5" />
                                <span>123 Sharing Way, Community City, CC 45678</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-3 text-orange-600" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={18} className="mr-3 text-orange-600" />
                                <span>support@bitebridge.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} BiteBridge. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
