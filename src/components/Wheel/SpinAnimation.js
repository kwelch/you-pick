import React from 'react';
import Animated from 'animated/lib/targets/react-dom';

const Div = Animated.createAnimatedComponent('div');

export default class SpinAnimation extends React.Component {
  state = {
    rotation: new Animated.Value(0),
  };

  animate = () => {
    Animated.decay(this.state.rotation, { velocity: 1 }).start();
  };

  render() {
    return (
      <Div
        style={{
          transform: [
            {
              rotate: this.state.rotation.interpolate({
                inputRange: [-800, 0, 800],
                outputRange: ['-360deg', '0deg', '360deg'],
              }),
            },
          ],
        }}
      >
        {React.Children.only(this.props.children)}
      </Div>
    );
  }
}
