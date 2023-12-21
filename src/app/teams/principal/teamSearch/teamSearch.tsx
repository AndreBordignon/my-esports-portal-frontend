import React, { useState } from 'react';

const TeamSearch = ({ onSearch }: any) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="w-90 md:w-96 container md:mx-2 mt-2 relative border-2 border-border bg-coolGray-900 h-10 rounded-lg text-sm ">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-800 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Buscar time..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="align-center placeholder:text-gray-800 w-full bg-transparent focus:outline-none mt-2 pl-8 justify-center"
      />
    </div>
  );
};

export default TeamSearch;
