import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import { LOGIN_PAGE } from 'settings/constant';
import SignUpForm from './SignUpForm';
import SocialLogin from '../SocialLogin';
import Wrapper, {
  Title,
  TitleInfo,
  Text,
  FormWrapper,
  BannerWrapper,
} from '../Auth.style';
// demo image
import signUpImage from 'assets/images/login-page-bg.jpg';
import tripFinder from 'assets/images/logo-alt.svg';

const SignUp = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <Logo withLink linkTo="/" src={tripFinder} title="TripFinder." />
        <Title>Welcome To TripFinder</Title>
        <TitleInfo>Please Register for your account</TitleInfo>
        <SignUpForm />
        <Divider>Or Register Up With </Divider>
        <SocialLogin />
        <Text>
          Already Have an Account! &nbsp;
          <Link to={LOGIN_PAGE}>Login</Link>
        </Text>
      </FormWrapper>
      <BannerWrapper>
        <div
          style={{
            backgroundImage: `url(${signUpImage})`,
            backgroundPosition: 'center center',
            height: '100vh',
            backgroundSize: 'cover',
          }}
        />
      </BannerWrapper>
    </Wrapper>
  );
};

export default SignUp;
