import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    
    if (currentState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    
    login(currentState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio
    });
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setBio("");
    setIsDataSubmitted(false);
    setCurrentState("Sign Up");
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    document.body.style.overflow = 'unset';
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="logo1.png" alt="Logo" className="w-10 h-10" />
            <span className="text-2xl font-bold text-white">ChatApp</span>
          </div>
          <button
            onClick={openLoginModal}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
              text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 
              shadow-lg hover:shadow-xl backdrop-blur-sm"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Connect
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Instantly
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-purple-200 font-light leading-relaxed max-w-2xl">
                Experience seamless communication with our modern chat platform. 
                Connect with friends, share moments, and stay in touch like never before.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={openLoginModal}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                  text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 
                  transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
              >
                Start Chatting Now
              </button>
              {/* <button className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white 
                px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white"></div>
                <div className="text-purple-300 text-sm"></div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white"></div>
                <div className="text-purple-300 text-sm"></div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white"></div>
                <div className="text-purple-300 text-sm"></div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Preview */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Real-time Messaging</h3>
                    <p className="text-purple-200">Instant delivery guaranteed</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Your privacy is protected</h3>
                     
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Media Sharing</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src="logo1.png" alt="Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-white">ChatApp</span>
              </div>
              <p className="text-purple-200 text-sm leading-relaxed">
                The future of communication is here. Connect, share, and stay in touch with the world.
              </p>
            </div>

            {/* <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div> */}

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 text-sm">© 2025 Made By Sumit😎. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://github.com/sumit-kumarr" className="text-purple-200 hover:text-white transition-colors border-2 border-purple-200 rounded-md px-4 py-2">
                github
              </a>
              
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeLoginModal}
          ></div>
          <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <button
              onClick={closeLoginModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <form onSubmit={onSubmitHandler} className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {currentState}
                </h2>
                <p className="text-purple-200 text-sm">
                  {currentState === "Sign Up" ? "Create your account to get started" : "Welcome back! Please sign in"}
                </p>
              </div>

              {currentState === "Sign Up" && !isDataSubmitted && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-200">Full Name</label>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    type="text"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              {!isDataSubmitted && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-200">Email Address</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-purple-200">Password</label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </>
              )}

              {currentState === "Sign Up" && isDataSubmitted && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-200">Bio</label>
                  <textarea
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    rows={4}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm resize-none"
                    placeholder="Tell us about yourself..."
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                  text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                {currentState === "Sign Up" ? 
                  (isDataSubmitted ? "Create Account" : "Continue") : 
                  "Sign In"
                }
              </button>

              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-purple-500 border-white/20 rounded focus:ring-purple-500 bg-white/10"
                />
                <label className="ml-2 text-sm text-purple-200">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              <div className="text-center">
                {currentState === "Sign Up" ? (
                  <p className="text-sm text-purple-200">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentState("Login");
                        setIsDataSubmitted(false);
                      }}
                      className="text-white font-medium hover:text-purple-300 transition-colors"
                    >
                      Sign in here
                    </button>
                  </p>
                ) : (
                  <p className="text-sm text-purple-200">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setCurrentState("Sign Up")}
                      className="text-white font-medium hover:text-purple-300 transition-colors"
                    >
                      Create one here
                    </button>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;