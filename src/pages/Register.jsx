import React, { useState, useContext } from 'react'
import gql from 'graphql-tag'
import { useMutation } from "@apollo/react-hooks"
import './Register.css'
import { useForm } from '../util/hooks'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'

function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(registerUser, {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData}}) {
        context.login(userData)
        props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    });

    function registerUser(){
        addUser()
    }

    return (
      <div>
        <form className="auth-form" onSubmit={onSubmit}>
          <h1>Register</h1>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              error={errors.email ? true : undefined}
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
          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              error={errors.confirmPassword ? true : undefined}
              onChange={onChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit">Sign Up</button>
            <Link to="/login">
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
        id email username token
    }
  }
`;

export default Register
