import React from "react";

const steps = [
  {
    id: "01",
    title: "Upload Resume",
    desc: "Drop your latest PDF resume. Our system extracts your key skills, experiences, and achievements to build your AI profile.",
  },
  {
    id: "02",
    title: "Upload Excel File",
    desc: "Import your list of target recruiters, hiring managers, and companies. We'll validate the emails and prep the queue.",
  },
  {
    id: "03",
    title: "AI Generates Emails",
    desc: "Review the AI-drafted emails. Each one is unique, referencing the company, the recruiter's role, and your matching skills.",
  },
  {
    id: "04",
    title: "Emails Sent Automatically",
    desc: "Hit start. We send them through your connected inbox at human-like intervals. Sit back and wait for the interview invites.",
    highlight: true,
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-gray-50 py-24 px-6">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-15 items-start">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col col-span-2 items-start">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-left font-normal text-gray-600">
            Four simple steps to put your job search on autopilot.
          </p>

          <button className="mt-6 text-lg bg-gray-900 text-white px-5 py-2 rounded-full font-medium hover:bg-black transition shadow-md">
            See Demo
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 col-span-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-6 items-start bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition"
            >
              
              {/* Number */}
              <div
                className={`min-w-12 h-12 flex items-center justify-center rounded-full text-base font-extrabold
                ${
                  step.highlight
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {step.id}
              </div>

              {/* Content */}
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-base font-semibold text-left text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;