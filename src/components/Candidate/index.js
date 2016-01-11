import React, { Component, PropTypes } from 'react';
const ReactDOM = require('react-dom');

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

  render () {
    const { data } = this.props;
    const { size, x, y } = data;

    const buttons = this.labels.map((label, i) => {
      return (<button key={i}>
        { label }
      </button>);
    });

    return (
      <div>
        <div>
          <canvas ref="canvas" height={size} width={size}></canvas>
        </div>
        <div>
          { buttons }
        </div>
        <div>
          x: {data.x}, y: {data.y}
        </div>
      </div>
    );
  }
}

export default Candidate;
