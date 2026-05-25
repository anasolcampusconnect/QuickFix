import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 md:py-16 w-full">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900">Contact Us</h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form Section */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
              <input type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
              <div className="flex gap-2">
                <span className="p-4 bg-gray-100 rounded-xl border border-gray-200 font-bold">+91</span>
                <input type="tel" placeholder="Enter Phone Number" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>
              <textarea placeholder="Enter Message" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl h-32 focus:ring-2 focus:ring-blue-600 outline-none"></textarea>
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">Submit</button>
            </form>
          </div>

          {/* Support Info Section */}
          <div className="space-y-8">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-3">Need help?</h3>
              <p className="text-gray-600 leading-relaxed">
                For any immediate help regarding your bookings, please log-in and visit our Help Center. You will be able to get instant resolution through our chat support.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-3">Still facing issues?</h3>
              <p className="text-gray-600 leading-relaxed">
                If you've already tried chatting with us and are not satisfied with the resolution - please send us an email on 
                <a href="mailto:resolve@urbancompany.com" className="text-blue-600 font-bold ml-1 hover:underline">resolve@urbancompany.com</a>. 
                We will get back to you within 24-48 hours.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-2">Media inquiries</h3>
                <p className="text-gray-600 text-sm">For media inquiries, you can send us an email on 
                  <a href="mailto:press@urbancompany.com" className="text-blue-600 block mt-2 font-bold hover:underline">press@urbancompany.com</a>
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-2">Helpline number?</h3>
                <p className="text-gray-600 text-sm">We have switched from a phone number to fast chat-based support. Select your issue in our Help Center to start a chat.</p>
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-2xl text-white text-center">
              <h3 className="text-xl font-bold mb-2">Our office addresses</h3>
              <p className="mb-6 opacity-90">Find a list of our regional office locations.</p>
              <button className="bg-white text-blue-600 py-3 px-6 rounded-lg font-bold hover:bg-gray-100">View Addresses</button>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;