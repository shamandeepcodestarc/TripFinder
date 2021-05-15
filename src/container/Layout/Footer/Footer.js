import React from 'react';
import Logo from 'components/UI/Logo/Logo';
import Footers from 'components/Footer/Footer';
import LogoImage from 'assets/images/logo-alt.svg';
import FooterMenu from './FooterMenu';

const Footer = () => {
  return (
    <Footers
      logo={<Logo withLink linkTo="/" src={LogoImage} title="TripFinder." />}
      menu={<FooterMenu />}
      copyright={`Copyright @ ${new Date().getFullYear()} RedQ, Inc.`}
    />
  );
};

export default Footer;
