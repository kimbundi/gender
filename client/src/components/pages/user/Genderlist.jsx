import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/Appcontext';
import Searchbar from '../../usersection/Searchbar';
import { useParams } from 'react-router-dom';
import Locationdata from './locationdata';

const Genderlist = () => {
  const { navigate, allData } = useContext(AppContext);
  const { input } = useParams(); // Get the input (city) from the URL
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    console.log("Input from URL:", input); // Check the input value
    console.log("All Data:", allData); // Check the content of allData

    if (allData && allData.length > 0) {
      const tempData = allData.slice(); // Copy of allData

      // Filter data based on the location from the URL
      if (input) {
        const filtered = tempData.filter(
          (item) =>
            item.location &&
            item.location.toLowerCase().includes(input.toLowerCase()) // Case-insensitive matching
        );

        console.log("Filtered Data:", filtered); // Log filtered data for debugging
        setFilteredData(filtered); // Update filtered data state
      } else {
        setFilteredData(tempData); // If no input, show all data
      }
    }
  }, [allData, input]); // Re-run when input or allData changes

  return (
    <div className="relative md:px-36 px-8 pt-20 text-left">
      <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">Help Centres</h1>
          <p className="text-gray-500">
            <span onClick={() => navigate('/')} className="text-blue-600 cursor-pointer">
              Home
            </span>{' '}
            / <span>Help Centres</span>
          </p>
        </div>
        <Searchbar data={input} />
      </div>

      {/* Conditional rendering based on filtered data */}
      {filteredData.length > 0 ? (
        <Locationdata data={filteredData} />
      ) : (
        <p className="text-gray-500">No help centers found for the searched city.</p>
      )}
    </div>
  );
};

export default Genderlist;
