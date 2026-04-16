import React from "react";

const DashboardPreview = () => {
  return (
    <div className="mt-10  w-full mb-25 flex justify-center px-4">
      
      {/* Outer Container */}
        
        {/* Browser Header */}
        <div className="bg-white w-3/5 shadow-2xl shadow-blue-200 rounded-2xl border-2 border-gray-200 overflow-hidden">
          
          {/* Top Bar */}
          <div className="flex items-center gap-2 px-4 py-4 border-b-2 border-gray-200 bg-white">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
          </div>

          {/* Content */}
          <div className="p-6 bg-gray-50">
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-6">
              
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-gray-500 text-lg font-semibold flex justify-start">Emails Sent</p>
                <h2 className="text-4xl font-bold flex justify-start text-gray-900 mt-1">128</h2>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-gray-500 text-lg flex font-semibold justify-start">Responses</p>
                <h2 className="text-4xl font-bold flex justify-start text-gray-900 mt-1">34</h2>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-gray-500 text-lg font-semibold  flex justify-start">Open Rate</p>
                <h2 className="text-4xl font-bold flex justify-start text-gray-900 mt-1">72%</h2>
              </div>

            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-gray-700 text-3xl flex justify-start font-semibold mb-3">
                Recent Activity
              </h3>
              <div className=" border border-gray-100"></div>

              <ul className="space-y-2 mt-5 text-gray-600 font-normal text-xl text-start">
                <li>• Email sent to 1 Google recruiter</li>
                <li>• Email opened by Amazon HR</li>
                <li>• Response received from Microsoft</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
  );
};

export default DashboardPreview;