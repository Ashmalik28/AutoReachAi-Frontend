import React from "react";
import DashboardPreview from "./DashBoardPreview";

const Hero = () => {
  return (
    <section className="w-full bg-gray-100 pt-20 flex flex-col items-center text-center">
      
      {/* Top Badge */}
      <div className="flex items-center gap-2 bg-blue-50 text-gray-700 border border-gray-300 px-4 py-1 rounded-full text-sm mb-6">
        <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
        Meet the new standard in automation
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-7xl font-bold text-gray-900 max-w-4xl leading-tight">
        Automate Your Job <br />
        Applications with AI
      </h1>

      {/* Description */}
      <p className="mt-6 text-gray-600 font-semibold max-w-2xl text-xl">
        Upload your resume and recruiter list — let AI handle the rest.
        We craft personalized emails and send them automatically so you can
        focus on interviewing.
      </p>

      {/* Buttons */}
      <div className="mt-8 gap-4 flex justify-center">
        <button className="bg-gray-900 text-lg text-white px-6 rounded-full font-medium hover:bg-black transition">
          Start Sending Emails →
        </button>

        <button className="border border-gray-300 text-lg px-6 py-3 font-bold rounded-full text-gray-700 hover:bg-gray-200 transition">
          Learn More
        </button>
      </div>
      <DashboardPreview/>
    </section>
  );
};

export default Hero;