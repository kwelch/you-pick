import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route } from 'react-router';
import Media from 'react-media';
import { Loop } from 'react-game-kit';
import jsxstyle, { Flex, Block, Inline } from 'jsxstyle';
import WebFont from 'webfontloader';
import './base.css'; //eslint-disable-line import/no-unassigned-import

WebFont.load({
  google: {
    families: ['Arimo'],
  },
});

const primaryColor = jsxstyle.rgb(20, 20, 100);

class SpinnerWheel extends Component {
  static contextTypes = {
    loop: PropTypes.object,
  };
  distance = 10;
  time = 1;
  gravity = 0.025;

  state = {
    velocity: 10,
    rotation: 0,
  };
  update = () => {
    this.setState(prevState => {
      const velocity = prevState.velocity - this.gravity;
      if (velocity <= 0) {
        return {
          velocity: 0,
          rotation: prevState.rotation,
        };
      }
      return {
        velocity,
        rotation: prevState.rotation + velocity,
      };
    });
  };
  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }
  render() {
    const { slices } = this.props;
    const size = 300;
    // not sure why but this makes it fill the entire circle
    const MAGIC_DASHARRAY_NUMBER = 471.5 * 2;
    const total = slices.reduce((acc = 0, curr) => acc + curr.size, 0);
    let currentStart = 0;

    return (
      <svg
        width={size}
        height={size}
        style={{
          borderRadius: '50%',
          transform: `rotate(${this.state.rotation}deg)`,
        }}
      >
        {slices.map(s => {
          const radius = size / 2;
          const percent = s.size / total * MAGIC_DASHARRAY_NUMBER;
          const dashArray = `0,${currentStart},${percent},${MAGIC_DASHARRAY_NUMBER}`;
          currentStart += percent;

          return (
            <circle
              key={s.name}
              r={radius}
              cx={radius}
              cy={radius}
              style={{
                fill: 'none',
                stroke: s.color,
                strokeWidth: size,
                strokeDasharray: dashArray,
              }}
            />
          );
        })}

      </svg>
    );
  }
}

const Header = ({ pageWidth }) => {
  return (
    <Flex
      backgroundColor={primaryColor}
      width="100%"
      boxShadow="0px 2px 5px rgba(0,0,0,.3)"
      marginBottom={15}
    >
      <Block
        width={pageWidth}
        textAlign="center"
        padding="15px 10px"
        margin="auto"
      >
        <Inline color="#FFF">
          You Pick
        </Inline>
      </Block>
    </Flex>
  );
};

class App extends Component {
  state = {
    slices: [
      { name: 'a', color: 'red', size: 15 },
      { name: 'b', color: 'blue', size: 35 },
      { name: 'c', color: 'green', size: 65 },
      { name: 'd', color: 'purple', size: 35 },
    ],
  };

  render() {
    return (
      // <Router>
      (
        <Media query="(max-width: 768px)">
          {matches => {
            const pageWidth = matches ? '100%' : 768;
            return (
              <Flex margin={0} padding={0} flexDirection="column">
                <Header pageWidth={pageWidth} />
                <Flex width={pageWidth} justifyContent="center" margin="auto">
                  <Flex flexDirection="column">
                    <Loop>
                      <Block
                        color="#232323"
                        fontSize="1.5rem"
                        textAlign="center"
                        marginBottom="1rem"
                      >
                        Spin Me!
                      </Block>
                      <SpinnerWheel slices={this.state.slices} />
                    </Loop>
                  </Flex>
                </Flex>
              </Flex>
            );
          }}
        </Media>
      )
      // </Router>
    );
  }
}
export default App;
