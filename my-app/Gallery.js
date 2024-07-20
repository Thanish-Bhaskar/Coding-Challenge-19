import React, { useState, useEffect } from 'react';
import './Gallery.css';

const API_URL = 'https://course-api.com/react-tours-project';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        setTours(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  const toggleReadMore = (id) => {
    setTours(tours.map(tour => tour.id === id ? { ...tour, showMore: !tour.showMore } : tour));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="gallery">
      {tours.map(tour => (
        <div key={tour.id} className="tour">
          <img src={tour.image} alt={tour.name} />
          <div className="tour-info">
            <h4>{tour.name}</h4>
            <h4 className="tour-price">${tour.price}</h4>
          </div>
          <p>
            {tour.showMore ? tour.info : `${tour.info.substring(0, 200)}...`}
            <button onClick={() => toggleReadMore(tour.id)}>
              {tour.showMore ? 'Show Less' : 'Read More'}
            </button>
          </p>
          <button className="btn" onClick={() => removeTour(tour.id)}>
            Not Interested
          </button>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
