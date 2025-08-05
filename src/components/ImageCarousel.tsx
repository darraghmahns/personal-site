import React, { useState } from 'react';
import '../assets/styles/ImageCarousel.css';

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button className="carousel-button prev" onClick={prevSlide}>
          ‹
        </button>
        
        <div className="carousel-slide">
          <img 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt}
            className="carousel-image"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              height: 'auto',
              width: 'auto',
              borderRadius: '5px',
              display: 'block',
              objectFit: 'scale-down'
            }}
          />
          {images[currentIndex].caption && (
            <div className="carousel-caption">
              {images[currentIndex].caption}
            </div>
          )}
        </div>
        
        <button className="carousel-button next" onClick={nextSlide}>
          ›
        </button>
      </div>
      
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;