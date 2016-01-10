import React, { Component, DOM, PropTypes } from 'react';
const ReactDOM = require('react-dom');
const _ = require('lodash');
const dispatcher = require('../../core/Dispatcher');
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
    const img = ReactDOM.findDOMNode(this.refs.img);
    const canvas = document.createElement('canvas');
    this.height = canvas.height = img.height;
    this.width = canvas.width = img.width;

    this.ctx = canvas.getContext('2d');
    this.ctx.drawImage(img, 0, 0);
    this.updateStyles();
  }

  updateStyles() {
    const { left, top } = this.getCoords(this.state.pos);
    const style = {
      left: `${left}px`,
      top: `${top}px`
    };
    this.setState({ style });
  }

  onMouseMove(e) {
    const pos = this.getPos(e);
    this.setState({ pos });
    this.updateStyles();
  }

  getCoords(pos) {
    const left = Math.max(0, pos.x - 32);
    const top = Math.max(0, pos.y - 32);

    return { left, top };
  }

  getPos(e) {
    const { currentTarget: target } = e;
    return {
      x: e.pageX - target.offsetLeft,
      y: e.pageY - target.offsetTop
    };
  }

  slurp(pos) {
    const coords = this.getCoords(pos);

    if (coords.left < 0 || coords.left + 64 > this.width) {
      return;
    }

    if (coords.top < 0 || coords.top + 64 > this.height) {
      return;
    }

    const d = this.ctx.getImageData(coords.left, coords.top, 64, 64);
    const chars = [];
    d.data.forEach((n) => {
      chars.push(String.fromCharCode(n));
    });

    return chars.join('');
  }

  onClick(e) {
    const { x, y } = this.getPos(e);

    for (let i = -16; i <= 16; i += 8) {
      for (let j = -16; j <= 16; j += 8) {
        slurp({
          x: x + i,
          y: y + j
        });
      }
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <div className={s.bd} onMouseMove={this.onMouseMove.bind(this)} onClick={this.onClick.bind(this)}>
            <img ref="img" src={img} />
            <div className={s.reticule} style={this.state.style} />
          </div>
        </div>
      </div>
    );
  }
}

export default TileSniper;
