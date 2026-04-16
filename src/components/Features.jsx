import React from "react";
import { Wand2, Send, Paperclip, FileSpreadsheet } from "lucide-react";

const Features = () => {
  return (
    <section className="w-full bg-white py-20 px-6">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Powerful Features, Zero Chaos
        </h2>
        <p className="mt-4 text-lg font-semibold text-gray-600">
          Everything you need to scale your outreach without losing the personal touch.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-14 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* Card 1 */}
        <div className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out">
          <div className="w-11 h-11 group-hover:bg-yellow-50 group-hover:text-orange-400 text-black flex items-center justify-center bg-gray-100 rounded-lg mb-4">
            <Wand2 size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-bold flex justify-start text-gray-900">
            AI Email Generation
          </h3>
          <p className="mt-2 text-gray-600 font-semibold flex text-start text-sm leading-relaxed">
            Our AI analyzes your resume and the recruiter's profile to draft highly
            personalized, context-aware emails that get replies.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white group border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out">
          <div className="w-11 h-11 group-hover:bg-yellow-50 group-hover:text-orange-400 text-black  flex items-center justify-center bg-gray-100 rounded-lg mb-4">
            <Send size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-bold flex justify-start text-gray-900">
            Bulk Email Sending
          </h3>
          <p className="mt-2 text-gray-600 font-semibold text-start text-sm leading-relaxed">
            Connect your inbox and send hundreds of tailored emails on autopilot
            with smart delays to protect your sender reputation.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white group border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out">
          <div className="w-11 h-11 group-hover:bg-yellow-50 group-hover:text-orange-400 text-black flex items-center justify-center bg-gray-100 rounded-lg mb-4">
            <Paperclip size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-bold flex justify-start text-gray-900">
            Resume Attachment
          </h3>
          <p className="mt-2 text-gray-600 font-semibold text-start text-sm leading-relaxed">
            Securely upload your PDF resume once, and we'll ensure it's perfectly
            attached to every outgoing application email.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white group border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out">
          <div className="w-11 h-11 group-hover:bg-yellow-50 group-hover:text-orange-400 text-black font-extrabold flex items-center justify-center bg-gray-100 rounded-lg mb-4">
            <FileSpreadsheet size={20} strokeWidth={2.5}/>
          </div>
          <h3 className="text-lg font-bold flex justify-start text-gray-900">
            Excel Upload Support
          </h3>
          <p className="mt-2 text-gray-600 font-semibold text-start text-sm leading-relaxed">
            Drop in your CSV or Excel list of target companies and recruiter contacts.
            We map the columns and queue the campaigns instantly.
          </p>
        </div>

      </div>

    </section>
  );
};

export default Features;