
import { BottomNavLayout } from "@/components/layout/bottom-nav-layout";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <BottomNavLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">Contact</h1>
          <p className="text-gray-300">This page uses the bottom navigation layout.</p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Get In Touch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Mail className="text-gray-900" size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400 text-sm">mansurishahrukh007@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Phone className="text-gray-900" size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-400 text-sm">+91 740 540 1426</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <MapPin className="text-gray-900" size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-400 text-sm">Ahmedabad, Gujarat, India</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Send Message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </BottomNavLayout>
  );
}


