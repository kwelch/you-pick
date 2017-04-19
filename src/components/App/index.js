import React, { Component } from 'react';
import Wheel from '../Wheel';
import SpinAnimation from '../Wheel/SpinAnimation';
import Media from 'react-media';
import glamorous from 'glamorous';
import { rgb } from 'polished';
import WebFont from 'webfontloader';
import './base.css'; //eslint-disable-line import/no-unassigned-import

const { Div } = glamorous;

const Flex = props => <Div display="flex" {...props} />;
const Block = props => <Div display="block" {...props} />;
const Inline = props => <Div display="inline" {...props} />;

WebFont.load({
  google: {
    families: ['Arimo'],
  },
});

const primaryColor = rgb(20, 20, 100);

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

  _handleClick = () => {
    this.animation.animate();
  };

  render() {
    return (
      <Media query="(max-width: 768px)">
        {matches => {
          const pageWidth = matches ? '100%' : 768;
          return (
            <Flex margin={0} padding={0} flexDirection="column">
              <Header pageWidth={pageWidth} />
              <Flex width={pageWidth} justifyContent="center" margin="auto">
                <Flex flexDirection="column">
                  <Block
                    color="#232323"
                    fontSize="1.5rem"
                    textAlign="center"
                    marginBottom="1rem"
                    cursor="pointer"
                    onClick={this._handleClick}
                  >
                    Spin Me!
                  </Block>
                  <SpinAnimation
                    ref={spin => {
                      this.animation = spin;
                    }}
                  >
                    <Wheel slices={this.state.slices} />
                  </SpinAnimation>
                </Flex>
              </Flex>
            </Flex>
          );
        }}
      </Media>
    );
  }
}
export default App;
