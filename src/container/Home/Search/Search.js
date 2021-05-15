import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'components/UI/Heading/Heading';
import Text from 'components/UI/Text/Text';
import Container from 'components/UI/Container/Container';
import './mysearch.css';
import GlideCarousel, {
  GlideSlide,
} from 'components/UI/GlideCarousel/GlideCarousel';
import SearchForm from './SearchForm';
import BannerWrapper, { SearchWrapper } from './Search.style';
// slider images

const SearchArea = ({ searchTitleStyle, searchDescriptionStyle }) => {
  return (
    <BannerWrapper>
      <GlideCarousel
        controls={false}
        options={{ gap: 0, autoplay: 5000, animationDuration: 1000 }}
        bullets={true}
        numberOfBullets={3}
      >
        <>
          <div class="video-background">
  <div class="video-foreground">
    <iframe src="https://www.youtube.com/embed/4rQU7DBh5lA?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1" frameborder="0" allowfullscreen></iframe>
  </div>
</div>
          {/* <GlideSlide>
            <img src={bannerBg1} alt="Banner 2" />
          </GlideSlide>
          <GlideSlide>
            <img src={bannerBg1} alt="Banner 3" />
          </GlideSlide> */}
        </>
      </GlideCarousel>

      <Container>
        <SearchWrapper>
          <Heading
            {...searchTitleStyle}
            content="Latest reviews. Lowest prices."
          />
          <Text
            {...searchDescriptionStyle}
            content="compares prices from 200+ booking sites to help you find the lowest
          price on the right hotel for you."
          />
          <SearchForm />
        </SearchWrapper>
      </Container>
    </BannerWrapper>
  );
};

SearchArea.propTypes = {
  searchTitleStyle: PropTypes.object,
  searchDescriptionStyle: PropTypes.object,
};

SearchArea.defaultProps = {
  searchTitleStyle: {
    color: '#2C2C2C',
    fontSize: ['20px', '24px', '28px'],
    lineHeight: ['28px', '30px', '30px'],
    mb: '9px',
  },
  searchDescriptionStyle: {
    color: '#2C2C2C',
    fontSize: '15px',
    lineHeight: '24px',
    mb: '30px',
  },
};

export default SearchArea;
