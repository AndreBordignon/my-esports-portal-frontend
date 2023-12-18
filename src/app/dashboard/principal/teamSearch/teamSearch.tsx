import React, { useState } from 'react';

const TeamSearch = ({ onSearch }: any) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Buscar time..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            />
        </div>
    );
};

export default TeamSearch;
