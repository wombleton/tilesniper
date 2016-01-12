import React, { Component, PropTypes } from 'react';
const ReactDOM = require('react-dom');
import fetch from '../../core/fetch';
import withStyles from '../../decorators/withStyles';
import s from './index.scss';

@withStyles(s)
class Candidate extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  labels = [ 'background', 'frame', 'comb', 'part bee', 'bee', 'part queen', 'queen'];

  componentDidMount () {
    const { data } = this.props;
    const { image, size } = data;
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);

    const ctx = canvas.getContext('2d');
    const g = ctx.createImageData(size, size);

    for (let i = 0; i < image.length; i++) {
      g.data[i] = image.charCodeAt(i);
    }
    ctx.putImageData(g, 0, 0);
  }

  onClick (label) {
    const { data } = this.props;
    data.label = label;

    async () => {
      const response = await fetch('/api/tile', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }()
  }

  render () {
    const { data } = this.props;
    const { size, x, y } = data;

    const buttons = this.labels.map((label, i) => {
      return (<button key={i} onClick={this.onClick.bind(this, label)}>
        { label }
      </button>);
    });

    return (
      <div className={s.candidate}>
        <div>
          <canvas ref="canvas" height={size} width={size}></canvas>
        </div>
        <div>
          { buttons }
          x: {data.x}, y: {data.y}
        </div>
      </div>
    );
  }
}

export default Candidate;
