import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';
import { Input, Button } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import FormControl from 'components/UI/FormControl/FormControl';
import Wrapper, {
  Title,
  TitleInfo,
  FormWrapper,
  BannerWrapper,
} from './Auth.style';
// demo images
import authBgImg from 'assets/images/login-page-bg.jpg';
import tripFinder from 'assets/images/logo-alt.svg';

export default function ForgetPassWord() {
  const { control, errors, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Logo withLink linkTo="/" src={tripFinder} title="TripFinder." />
        <Title>Welcome Back</Title>
        <TitleInfo>Enter your email to recover your account</TitleInfo>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Email"
            htmlFor="email"
            error={
              errors.email && (
                <>
                  {errors.email?.type === 'required' && (
                    <span>This field is required!</span>
                  )}
                  {errors.email?.type === 'pattern' && (
                    <span>Please enter a valid email address!</span>
                  )}
                </>
              )
            }
          >
            <Controller
              as={<Input />}
              type="email"
              id="email"
              name="email"
              defaultValue=""
              control={control}
              rules={{
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              }}
            />
          </FormControl>
          <Button
            className="signin-btn"
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%' }}
          >
            <MdEmail />
            Send email
          </Button>
        </form>
      </FormWrapper>
      <BannerWrapper>
        <div
          style={{
            backgroundImage: `url(${authBgImg})`,
            backgroundPosition: 'center center',
            height: '100vh',
            backgroundSize: 'cover',
          }}
        />
      </BannerWrapper>
    </Wrapper>
  );
}
