/** the basic unit of a map */

import React, { PureComponent } from 'react';
import styles from './styles/Box.module.scss';
import { FaBomb, FaFlag } from 'react-icons/fa';
import constants from '../config/constants';

export default class Box extends PureComponent {
  static defaultProps = {
    num: 0,
    flagged: false,
    className: '',
    exposed: false,
    posX: -1,
    posY: -1,
    onFlag: ({ posX, posY }) => { },
    onClick: ({ posX, posY }) => { }
  }

  onClick = () => {
    if (this.props.flagged) return;

    const { posX, posY, onClick, exposed } = this.props;
    console.log(posX, posY)
    !exposed && onClick({ posX, posY })
  }

  flag = e => {
    e.preventDefault();
    if (this.props.exposed) return;
    const { posX, posY, onFlag } = this.props;
    onFlag({ posX, posY })
  }

  render() {
    const { num, className } = this.props;
    const { exposed, display, box_style } = this._getBoxState(num)
    return (
      <div
        className={[styles.container, exposed ? styles.flip : styles.hide, box_style, className].join(' ')}
        onClick={this.onClick}
        onContextMenu={this.flag}
      >
        {display}
      </div>
    )
  }

  _getBoxState = (num) => {
    const { MINE, FLAG, SAFE, UNKNOWN } = constants;
    switch (num) {
      case MINE:
        return {
          exposed: true,
          display: <FaBomb className={styles.bomb} />,
          box_style: styles.bomb_box
        }
      case FLAG:
        return {
          exposed: false,
          display: <FaFlag className={styles.flag} />,
          box_style: ''
        }
      case SAFE:
        return {
          exposed: true,
          display: '',
          box_style: styles.safe_box
        }

      case UNKNOWN:
        return {
          exposed: false,
          display: '',
          box_style: ''
        }

      default:
        return {
          exposed: true,
          display: <p>{num}</p>,
          box_style: styles.edge_box
        }
    }
  }


}