import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles/History.module.scss';
import Button from '../components/Button';
import Text from '../components/Text';
import { Link } from 'react-router-dom';

import game_styles from './styles/NewGame.module.scss';


class History extends Component {

  componentDidMount() {
    this.props.fetch()
  }

  render() {
    const { historyList } = this.props;
    return (
      <div className={styles.container}>

        {
          Object.entries(historyList).map(([index, game]) =>
            <Link to={`/game/${game.id}`}>
              <Button id="shadow" className={[styles.card, game_styles[this._decideColor(game.size_x)]].join(' ')} key={game.id}>
                <Text type="bold xl white">
                  {game.size_x} * {game.size_y}
                </Text>

                <Text type="s white">last play: {game.updated_at.slice(0, 19).split('T').join(' ')}</Text>
                <Tag status={game.status}/>
              </Button>
            </Link>)
        }

      </div>
    )
  }

  _decideColor = (size_x) => {
    if (size_x < 6) return 'easy'
    if (size_x >= 6 && size_x < 12) return 'normal'
    if (size_x >= 12) return 'hard'
  }
}

const STATUS = {
  'WN': {
    text: 'Win!',
    style: {backgroundColor: 'green'}
  },
  'PD':{},
  'LT':{
    text: 'Lose',
    style: {backgroundColor: 'orange'}
  }
}

function Tag({status}){
  const {text, style} = STATUS[status]
  return text ? <div style={style} className={styles.tag}>{text}</div> : null
}

const mapState = state => ({
  historyList: state.history.list
})

const mapDispatch = dispatch => ({
  fetch: () => dispatch.history.fetch()
})

export default connect(mapState, mapDispatch)(History)