import React from 'react';
import axios from "axios";
import './ProductCard.css';
import { FiExternalLink } from 'react-icons/fi';
import TextLink from 'components/UI/TextLink/TextLink';
import Rating from 'components/UI/Rating/Rating';
import Favourite from 'components/UI/Favorite/Favorite';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import GridCard from '../GridCard/GridCard';

import $ from 'jquery';
import { style } from 'styled-system';

const responsive = {
  desktop: {

    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
    paritialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const PostGrid = ({
  title,
  property_name,
  star_rating,
  floor,
  link,
  id,
  pricing,
  gallery= [
    {
      "id": "98348",
      "url": "http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-12_thumb.jpg"
    },
    {
      "id": "10832",
      "url": "http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-13_thumb.jpg"
    },
    {
      "id": "70635",
      "url": "http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-14_thumb.jpg"
    }
  ]
}, style = {
  height: "400px",
 
}
) => {
  return (
  <>
    <GridCard
      isCarousel={true}
      favorite={
        <Favourite
          onClick={event => {
            console.log(event);
          }}
        />
      }
      location={title}
      title={<TextLink link={`${link}/${id}`} content={title} />}
      price={`$${pricing}/Night - Free Cancellation`}
      rating={<Rating rating={star_rating} ratingCount={star_rating} type="bulk" />}
      viewDetailsBtn={
        <TextLink
        link={`${link}/${id}`}
          icon={<FiExternalLink />}
          content="View Details"
        />
      }
    >
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        renderDotsOutside={false}
        responsive={responsive}
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
      >
        {gallery.map(({ url, property_name }, index) => (
          <img
            src={url}
            alt={property_name}
            key={index}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'relative',
            }}
          />
        ))}
      </Carousel>
    </GridCard>
	</>
  );
 
};

export default PostGrid;
