import React from 'react';
import Image from 'components/UI/Image/Image';
import Heading from 'components/UI/Heading/Heading';
import TextLink from 'components/UI/TextLink/TextLink';
import NotFoundWrapper, { ContentWrapper } from './404.style';

import Image404 from 'assets/images/404@2x.png';

export default ({ staticContext = {} }) => {
  staticContext.status = 404;
  return (
    <NotFoundWrapper>
      <ContentWrapper>
        <Image src={Image404} alt="404" />
        <Heading as="h2" content="Something Went Wrong" />
        <TextLink link="/" content="Go Back" />
      </ContentWrapper>
    </NotFoundWrapper>
  );
};
