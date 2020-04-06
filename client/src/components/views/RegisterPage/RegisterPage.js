import React, { useState } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const { email, name, password, confirmPassword } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      return alert(`비밀번호를 확인해 주세요!`);
    }

    let body = {
      email: inputs.email,
      name: inputs.name,
      password: inputs.password,
    };

    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert(`Failed to sign up!`);
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
        <label htmlFor="name">Name</label>
        <Input type="text" name="name" value={name} onChange={onChange} />
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <Input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
