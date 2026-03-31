import React from 'react';
import { LuSearch } from "react-icons/lu";

const ShopFilters = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory, sortBy, setSortBy,categories }) => {
    return (
        <div className="filter-bar mb-5 mx-4 p-4 rounded shadow-sm">
            <div className="row g-4 align-items-center">
                
                {/* Search Input */}
                <div className="col-lg-3">
                    <div className="search-wrapper position-relative">
                        <LuSearch className="search-icon" />
                        <input 
                            type="text" 
                            className="form-control search-input" 
                            placeholder="Search our collection..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="col-lg-7">
                    <div className="category-tabs d-flex justify-content-center gap-2 overflow-auto">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/*  Sort Dropdown */}
                <div className="col-lg-2">
                    <select 
                        className="form-select sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="default">Sort by: Featured</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ShopFilters;