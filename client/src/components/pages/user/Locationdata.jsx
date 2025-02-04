import React from 'react';

const Locationdata = ({ data }) => {
    if (!Array.isArray(data)) {
        return <div>No data available</div>;  // Handle case where data is not available
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-5 px-4 md:px-8">
                {data.length === 0 ? (
                    <p>No help centers found for the searched city.</p>
                ) : (
                    data.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{item.location}</p>
                            <h2 className="text-lg font-bold text-blue-600">{item.contact}</h2>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Locationdata;
