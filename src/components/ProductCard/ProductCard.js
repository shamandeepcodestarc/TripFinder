import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import TextLink from 'components/UI/TextLink/TextLink';
import Rating from 'components/UI/Rating/Rating';
import Favourite from 'components/UI/Favorite/Favorite';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import GridCard from '../GridCard/GridCard';
import $ from 'jquery';

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
//  localStorage.removeItem('myproperty');
//  localStorage.removeItem('itemsincart');

if(localStorage.getItem('itemsincart') != null) {
var count = localStorage.getItem('itemsincart');
$("#lblCartCount").html(count);
}else{
var count = 0 ;
}
$(document).on('click', '.tour_add_cart', function (e) {
  e.preventDefault();



  // var jsonArray1 = [{'name': "doug", 'id':5}, {'name': "dofug", 'id':23}];
  // var jsonArray2 = [{'name': "goud", 'id':1}, {'name': "doaaug", 'id':52}];
  // jsonArray1 = jsonArray1.concat(jsonArray2);
  // console.log(jsonArray1,'=====================');



   var hotelid = $(this).data("id");
   const task = localStorage.getItem('myproperty');            
   count++;
   
    
   console.log(hotelid);
   $.ajax({ url: 'http://codestarc.com/client/newproject/api/getpropertybyid/'+hotelid,
         type: 'get',
         success: function(data) {
           var resdata = data.data;

          $("#lblCartCount").html(count);
          localStorage.setItem('itemsincart', +count);
          var local = localStorage.getItem('myproperty');
          if(local){
            var arr2= JSON.parse(local);
            var jsonArray1 = arr2.concat(data.data);
            localStorage.setItem('myproperty', JSON.stringify(jsonArray1));
            var local_1 = localStorage.getItem('myproperty');
            console.log(JSON.parse(local_1),'======= original data');
          } else{
            localStorage.setItem('myproperty', JSON.stringify(resdata));
          }
    }
});
});
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
}) => {

  return (
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
      addtoCartBtn={
        <button type="button"
        className="tour_add_cart" data-id={`${id}`}    
        > Add to Cart </button>
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
  );
};

export default PostGrid;
