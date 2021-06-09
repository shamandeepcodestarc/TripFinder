import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { AuthContext } from 'context/AuthProvider';
import { FORGET_PASSWORD_PAGE } from 'settings/constant';
import { FieldWrapper, SwitchWrapper, Label } from '../Auth.style';
import axios from "axios";
const SignInForm = () => {
  const { signIn, IsLoggedIn } = useContext(AuthContext);
  const { control, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    signIn(data);
    axios.post(`http://codestarc.com/client/newproject/api/login`, data)
    .then(res => {
      if (res.data.data) {
        localStorage.setItem("IsLoggedIn", true);
        localStorage.setItem("key", JSON.stringify(res.data.data.token));
        localStorage.setItem("data", res.data.data.user.id);
        localStorage.setItem("role", JSON.stringify(res.data.data.user.role))
        return res.data.data;
        // history.push('/canclation', roomModel)
      }
    }).catch(err => {
      console.log(err);
    })
  };
  if (IsLoggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
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
      <FormControl
        label="Password"
        htmlFor="password"
        error={
          errors.password && (
            <>
              {errors.password?.type === 'required' && (
                <span>This field is required!</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span>Password must be at lest 6 characters!</span>
              )}
              {errors.password?.type === 'maxLength' && (
                <span>Password must not be longer than 20 characters!</span>
              )}
            </>
          )
        }
      >
        <Controller
          as={<Input.Password />}
          defaultValue=""
          control={control}
          id="password"
          name="password"
          rules={{ required: true, minLength: 6, maxLength: 20 }}
        />
      </FormControl>
      <FieldWrapper>
        <SwitchWrapper>
          <Controller
            as={<Switch />}
            name="rememberMe"
            defaultValue={false}
            valueName="checked"
            control={control}
          />
          <Label>Remember Me</Label>
        </SwitchWrapper>
        <Link to={FORGET_PASSWORD_PAGE}>Forget Password ?</Link>
      </FieldWrapper>
      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: '100%' }}
      >
        <MdLockOpen />
        Login
      </Button>
    </form>
  );
};

export default SignInForm;
