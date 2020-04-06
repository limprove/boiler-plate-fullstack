import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    let body = {
      email: inputs.email,
      password: inputs.password,
    };

    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
        props.history.push('/');
      } else {
        alert(`Error`);
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="email">E-mail</label>
        <Input type="text" name="email" value={email} onChange={onChange} />
        <label htmlFor="password">password</label>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default LoginPage;
