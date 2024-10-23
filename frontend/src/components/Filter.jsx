import React, { useState } from "react";
import filter from "../assets/filter.png";
import twoStars from "../assets/2stars.png";
import threeStars from "../assets/3stars.png";
import fourStars from "../assets/4stars.png";
import fiveStars from "../assets/5stars.png";
import "../styles/Filter.css";

export default function Filter({ onFilterChange }) {
    const [price, setPrice] = useState(7000);
    const [rating, setRating] = useState("all");

    const handlePriceChange = (event) => {
        const newPrice = event.target.value;
        setPrice(newPrice);
        // Send filter updates to the parent component
        onFilterChange({ price: newPrice, rating });
    };

    const handleRatingChange = (event) => {
        const newRating = event.target.value;
        setRating(newRating);
        // Send filter updates to the parent component
        onFilterChange({ price, rating: newRating });
    };

    const handleSubmit = () => {
        // Optional: Add further logic here if necessary for form submission
        onFilterChange({ price, rating });
    };

    return (
        <div className="filter-container">
            {/* Filter Header */}
            <div className="filter">
                <img src={filter} alt="filter" className="filter-image" />
                <p className="filter-text">Filter</p>
            </div>

            {/* Price Slider */}
            <div className="price-slider-container">
                <label htmlFor="priceSlider" className="price-label">Price</label>
                <div className="slider-wrapper">
                    <span className="min-value">0</span>
                    <input
                        type="range"
                        className="slider"
                        id="priceSlider"
                        min="0"
                        max="7000"
                        value={price}
                        onChange={handlePriceChange}
                    />
                    <span className="max-value">7k+</span>
                </div>
                <div className="price-bubble">{price}</div>
            </div>

            {/* Retailer Rating */}
            <div className="rating-section">
                <label className="main-rating-label">Retailer Rating</label>

                {/* 5 Stars */}
                <div className="rating-option">
                    <input
                        type="radio"
                        id="5stars"
                        name="rating"
                        value="5"
                        checked={rating === "5"}
                        onChange={handleRatingChange}
                    />
                    <label htmlFor="5stars" className="rating-label">
                        <img src={fiveStars} alt="5 stars" className="stars-image" />
                        <span>5 Stars</span>
                    </label>
                </div>

                {/* Above 4 Stars */}
                <div className="rating-option">
                    <input
                        type="radio"
                        id="4stars"
                        name="rating"
                        value="4"
                        checked={rating === "4"}
                        onChange={handleRatingChange}
                    />
                    <label htmlFor="4stars" className="rating-label">
                        <img src={fourStars} alt="4 stars" className="stars-image" />
                        <span>Above 4 Stars</span>
                    </label>
                </div>

                {/* Above 3 Stars */}
                <div className="rating-option">
                    <input
                        type="radio"
                        id="3stars"
                        name="rating"
                        value="3"
                        checked={rating === "3"}
                        onChange={handleRatingChange}
                    />
                    <label htmlFor="3stars" className="rating-label">
                        <img src={threeStars} alt="3 stars" className="stars-image" />
                        <span>Above 3 Stars</span>
                    </label>
                </div>

                {/* Above 2 Stars */}
                <div className="rating-option">
                    <input
                        type="radio"
                        id="2stars"
                        name="rating"
                        value="2"
                        checked={rating === "2"}
                        onChange={handleRatingChange}
                    />
                    <label htmlFor="2stars" className="rating-label">
                        <img src={twoStars} alt="2 stars" className="stars-image" />
                        <span>Above 2 Stars</span>
                    </label>
                </div>

                {/* All Ratings */}
                <div className="rating-option">
                    <input
                        type="radio"
                        id="allRatings"
                        name="rating"
                        value="all"
                        checked={rating === "all"}
                        onChange={handleRatingChange}
                    />
                    <label htmlFor="allRatings" className="rating-label">
                        <span>All Ratings</span>
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <button className="submit-button" onClick={handleSubmit}>
                Apply Filters
            </button>
        </div>
    );
}
