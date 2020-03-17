import React, { useState, useContext } from "react";
import { Link } from  'react-router-dom'
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from '../context/auth'
import { useForm } from '../util/hooks'
import "./Register.css";

function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData }}) {
        props.history.push("/");
        context.login(userData)
        },
        onError(err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    };

    return (
      <div>
        <form className="auth-form" onSubmit={onSubmit}>
          <h1>Login</h1>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={values.username}
              error={errors.username ? true : undefined}
              onChange={onChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="username">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              error={errors.password ? true : undefined}
              onChange={onChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit">Login</button>
            <Link to="/register">
              <button type="button">Switch</button>
            </Link>
          </div>
        </form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
    }

    const LOGIN_USER = gql`
    mutation login($username: String! $password: String!) {
        login(username: $username password: $password) {
            id
            email
            username
            token
        }
    }
`;

export default Login;
