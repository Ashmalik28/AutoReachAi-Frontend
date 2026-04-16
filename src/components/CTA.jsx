import React from "react";

const CTA = () => {
  return (
    <section className="w-full py-24 px-6 bg-black">
      
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Start Reaching Recruiters Smartly
        </h2>

        {/* Subtext */}
        <p className="mt-6 font-medium text-gray-300 text-xl">
          Join thousands of job seekers who automate their outreach and land
          interviews 3x faster.
        </p>

        {/* Button */}
        <div className="mt-10">
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:scale-110 transition shadow-lg">
            Get Started Now
          </button>
        </div>

      </div>

    </section>
  );
};

export default CTA;