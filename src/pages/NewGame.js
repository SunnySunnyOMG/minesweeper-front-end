import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles/NewGame.module.scss';
import login_styles from './styles/Login.module.scss';
import Button from '../components/Button';
import Text from '../components/Text';
import { Link } from 'react-router-dom';
import TextInput from '../components/TextInput';

const DIFFICULTIES = {
  easy: [5, 5, 2],
  normal: [8, 8, 10],
  hard: [12, 12, 20]
}
class NewGame extends Component {
  /**
   *
   *  let user customize the game 
   * todo: 
   *       still need some style adjust
   * 
   */

  // state={
  //   width:'',
  //   height:'',
  //   mine_num: ''
  // }

  create = (size_x, size_y, mine_num) => {
    console.log(size_x, size_y, mine_num)
    this.props.createGame({ size_x, size_y, mine_num }).then(({ id }) => this.props.history.replace('/game/' + id))
  }

  render() {
    const { token } = this.props;
    // const { width, height, mine_num } = this.state
    return (
      <div className={styles.overlay}>
        <div className={styles.container}>
          {!token && <>
            <Link to="/login">
              <Button className={login_styles.button}>
                <Text type="bold white">Login</Text>
              </Button>
            </Link>
            <Text>OR</Text>
          </>}
          <Text type="black">Start Game Now!</Text>
          <div>
            {Object.entries(DIFFICULTIES).map(([name, setting]) =>
              <Button id="shadow" className={styles.button + ' ' + styles[name]} key={name} onClick={() => this.create(...setting)}>{name}</Button>)
            }
          </div>
          {/* <div>
            <TextInput onChange={this.onChange} value={width} id="width" />
            <TextInput onChange={this.onChange} height={height} id="height" />
            <TextInput onChange={this.onChange} mine_num={mine_num} id="mine_num" />
          </div>

          <Button id="shadow" className={styles.button} onClick={() => this.create(width, height, mine_num)}>Customize</Button> */}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  token: state.user.token
})

const mapDispatch = dispatch => ({
  createGame: ({ size_x, size_y, mine_num }) => dispatch.game.create({ size_x, size_y, mine_num })
})

export default connect(mapState, mapDispatch)(NewGame)