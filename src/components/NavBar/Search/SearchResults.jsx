// SearchComponent.js
import React, { useState } from 'react';
import Fuse from 'fuse.js';

const SearchComponent = ({ data, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch(value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchComponent;
