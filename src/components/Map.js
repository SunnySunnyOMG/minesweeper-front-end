/** the map UI of the minesweeper */

import React from 'react';
import Box from './Box';
import styles from './styles/Map.module.scss';
import { connect } from 'react-redux';
import { Loading } from './Loading';

const range = len => Array.from(new Array(len), (val, index) => index);
const UNKOWN = 9
const FLAG = 10
function Map({ sizeX, sizeY, snapshot, reveal, flag }) {
  return (
    <div className={styles.container}>
      {
        sizeY ? range(sizeY).map(pos_y =>
          <div key={pos_y} className={styles.row}>
            {
              range(sizeX).map(pos_x => {
                const _box_value = snapshot && snapshot[pos_y][pos_x]
                return <Box
                  className={styles.margin}
                  key={`${pos_x}-${pos_y}`}
                  posX={pos_x}
                  posY={pos_y}
                  onFlag={flag}
                  onClick={reveal}
                  num={_box_value}
                />
              })
            }
          </div>
        ) : <Loading />
      }
    </div>
  )
}


Map.defaultProps = {
  sizeX: 0,
  sizeY: 0
}

const mapState = (state) => {
  return {
    sizeX: state.game.size_x,
    sizeY: state.game.size_y,
    snapshot: state.game.snapshot
  }
}

const mapDispatch = dispatch => {
  return {
    reveal: ({ posX, posY }) => dispatch.game.checkBlock({ posX, posY, is_flag: false }),
    flag: ({ posX, posY }) => dispatch.game.checkBlock({ posX, posY, is_flag: true })
  }
}

export default connect(mapState, mapDispatch)(Map)