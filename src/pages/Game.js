import React, { Component } from 'react';
import Map from '../components/Map';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

import styles from './styles/Game.module.scss';
import Text from '../components/Text';
import WhiteBlank from '../components/WhiteBlank';

class Game extends Component {

  componentDidMount() {
    const { match: { params: { game_id } }, getGame } = this.props;
    getGame(game_id);
  }


  render() {
    const { gameStatus } = this.props
    const status = this.renderStatus(gameStatus)
    return (
      <div className={styles.container}>
        <div className={styles.info}>
          {status && <Text style={{ margin: 0, marginRight:20 }} type="bold xl">{status}</Text>}
          <Link to="/game/new">
            <Button className={styles.restart}>Restart</Button>
          </Link>
        </div>
        <WhiteBlank h={20} />
        <Map />
      </div>
    )
  }

  renderStatus = (status) => {
    switch (status) {
      case 'WN':
        return 'You Win!';
      case 'PD':
        return ''
      case 'LT':
        return 'Oops, you lose'
      default:
        console.error('wrong status', status)
    }
  }
}

const mapDispatch = dispatch => ({
  getGame: (id) => dispatch.game.fetch(id)
})

const mapState = state => ({
  gameStatus: state.game.status
})

export default connect(mapState, mapDispatch)(Game)

