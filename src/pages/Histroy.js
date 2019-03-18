import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles/History.module.scss';
import Button from '../components/Button';
import Text from '../components/Text';
import { Link } from 'react-router-dom';



class History extends Component {

  componentDidMount(){

  }
  
  render() {
    const { token } = this.props;
    // const { width, height, mine_num } = this.state
    return (
        <div className={styles.container}>
          {/* <div>
            {Object.entries(DIFFICULTIES).map(([name, setting]) =>
              <Button id="shadow" className={styles.card} key={name} onClick={() => this.create(...setting)}>
              {name}
              </Button>)
            }
          </div> */}
        </div>
    )
  }
}

const mapState = state => ({
  historyList: state.history.list
})

const mapDispatch = dispatch => ({
  fetch: () => dispatch.history.fetch()
})

export default connect(mapState, mapDispatch)(History)