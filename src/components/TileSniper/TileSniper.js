import React, { Component, DOM, PropTypes } from 'react';
const _ = require('lodash');
import s from './index.scss';
import img from './image.jpg';
import withStyles from '../../decorators/withStyles';

const title = 'Snipe';

@withStyles(s)
class TileSniper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pos: { x: 0, y: 0 }
    };
    this.updateStyles = _.throttle(this.updateStyles, 100);
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    this.updateStyles();
  }

  updateStyles() {
    const left = Math.max(0, this.state.pos.x - 32);
    const top = Math.max(0, this.state.pos.y - 32);
    const style = {
      left: `${left}px`,
      top: `${top}px`
    };
    this.setState({ style });
  }

  onMouseMove(e) {
    const { currentTarget: target } = e;
    const pos = {
      x: e.pageX - target.offsetLeft,
      y: e.pageY - target.offsetTop
    };
    this.setState({ pos });
    this.updateStyles();
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <div className={s.bd} onMouseMove={this.onMouseMove.bind(this)} >
            <img src={img} />
            <div className={s.reticule} style={this.state.style} />
          </div>
        </div>
      </div>
    );
  }
}

export default TileSniper;
