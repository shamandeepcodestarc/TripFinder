import React, { useState,useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import Loader from 'components/Loader/Loader';
import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';
import TextLink from 'components/UI/TextLink/TextLink';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import ImageCard from 'components/ImageCard/ImageCard';
import axios from 'axios'
import GlideCarousel, {
  GlideSlide,
} from 'components/UI/GlideCarousel/GlideCarousel';
import useDataApi from 'library/hooks/useDataApi';
import { LISTING_POSTS_PAGE } from 'settings/constant';
import LocationWrapper, { CarouselSection } from './Location.style';
const carouselOptions = {
  type: 'carousel',
  perView: 5,
  gap: 30,
  hoverpause: true,
  breakpoints: {
    1440: {
      perView: 5,
      gap: 20,
    },
    1200: {
      perView: 4,
    },
    991: {
      perView: 3,
      gap: 15,
    },
    667: {
      perView: 2,
      gap: 20,
    },
    480: {
      perView: 1,
      gap: 0,
    },
  },
};

const LocationGrid = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://codestarc.com/client/newproject/api/getproperties").then(response => {
      if (response && response.data && response.data.data && response.data.data.length !== 0) {
        setData(response.data.data)
       
      }
    })
  },[])

  return (
    <LocationWrapper>
      <Container fluid={true}>
        <SectionTitle
          title={<Heading content="Explore Destinations" />}
          link={<TextLink link={LISTING_POSTS_PAGE} content="Show all" />}
        />

        <CarouselSection>
          {data.length !== 0 ? (
            <GlideCarousel
              carouselSelector="explore_carousel"
              prevButton={<IoIosArrowBack />}
              nextButton={<IoIosArrowForward />}
              options={carouselOptions}
            >
              <>
                {data.map((post, index) => (
                  <GlideSlide key={index}>
                    <ImageCard
                      link="listing"
                      imageSrc="http://s3.amazonaws.com/redqteam.com/tripfinder-images/hotel-1.jpg"
                      title={post.title}
                      meta={`${post.total_rooms} Rooms`}
                    />
                  </GlideSlide>
                ))}
              </>
            </GlideCarousel>
          ) : (
            <Loader />
          )}
        </CarouselSection>
      </Container>
    </LocationWrapper>
  );
};

export default LocationGrid;
