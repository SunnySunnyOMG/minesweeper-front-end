import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { Link, Route } from 'react-router-dom';
import TextInput from '../components/TextInput';
import styles from './styles/Login.module.scss';
import Text from '../components/Text';
import WhiteBlank from '../components/WhiteBlank';

class Login extends Component {

  state = {
    username: '',
    password: '',
    email: ''
  }

  onSubmit = () => {
    const { location, login, signup } = this.props;
    const { username, password, email } = this.state
    if (location.pathname.indexOf('/signup') > -1) {
      console.log('signup')
      signup({ username, password, email })
    } else {
      console.log('login')
      login({ username, password })
    }
  }

  onChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value
    })
  }


  render() {
    const { location, isError } = this.props
    const {
      username,
      password,
      email
    } = this.state;
    const is_signup = location.pathname.indexOf('signup') > -1
    const footer = {
      text: is_signup ? "Already have an acount?" : "Don't have an account?",
      link_text: is_signup ? "Login now" : "Sign up now",
      link_to: is_signup ? '/login' : '/signup',
    }
    return (
      <div className={styles.container}>
        <Text type="xl bold">Minesweeper</Text>
        <WhiteBlank h={20} />
        <TextInput
          value={username}
          alt={'user name'}
          id="username"
          onChange={this.onChange}
          placeholder="Username"
        />
        <WhiteBlank h={20} />
        <TextInput
          value={password}
          alt={'password'}
          id="password"
          onChange={this.onChange}
          placeholder="Password"
        />
        <WhiteBlank h={20} />
        <Route
          path="/signup"
          render={() =>
            <TextInput
              value={email}
              alt={'email'}
              id="email" onChange={this.onChange}
              placeholder="Email" />}
        />
        {isError && <Text type="err">invalid username/password</Text>}
        <WhiteBlank h={60} />
        <Button disabled={!username || !password} className={styles.button} onClick={this.onSubmit}>
          <Text type="bold white">Let's start!</Text>
        </Button>

        <Text type="s l">{footer.text}<Link to={footer.link_to}>{footer.link_text}</Link></Text>
      </div>
    )
  }

}

const mapDispatch = dispatch => ({
  login: ({ username, password }) => dispatch.user.login({ username, password }),
  signup: ({ username, password, email }) => dispatch.user.signup({ username, password, email })
})

const mapState = state => ({
  token: state.user.token,
  isError: state.user.is_login_error
})

export default connect(mapState, mapDispatch)(Login)

