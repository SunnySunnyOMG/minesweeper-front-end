import React from 'react';

import styles from './styles/Header.module.scss';
import Text from '../components/Text';
import { connect } from 'react-redux'
import Button from './Button';
import WhiteBlank from './WhiteBlank';
import { Link } from 'react-router-dom';


function HeaderBar({ title, username, token, logout }) {
  if (title !== document.title) document.title = title
  return (
    <div className={styles.container}>
      <Link to="/game/new"><Text type='l' className={styles.logo}>{title}</Text></Link>
      {token ? <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text>{username}</Text>
        <WhiteBlank w={10} />
        <Link to="/history"><Button><Text type="s">History</Text></Button></Link>
        <WhiteBlank w={10} />
        <Button><Text onClick={logout} type="s">Log out</Text></Button>
      </div> : <Link to="/login"><Button><Text type="s">Log in</Text></Button></Link>}
    </div>
  );
}

const mapState = state => ({
  token: state.user.token,
  username: state.user.username
})

const mapDispatch = dispatch => ({
  fectchHistory: () => dispatch.history.fetch(),
  logout: () => dispatch.user.logout()
})

export default connect(mapState, mapDispatch)(HeaderBar)

HeaderBar.defaultProps = {
  title: "Let's play !"
}