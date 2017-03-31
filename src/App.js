import React from 'react';
import jsxstyle, { Flex, Block, Inline } from 'jsxstyle';
import WebFont from 'webfontloader';
import './base.css'; //eslint-disable-line import/no-unassigned-import

WebFont.load({
  google: {
    families: ['Arimo'],
  },
});

const primaryColor = jsxstyle.rgb(20, 20, 100);
const pageWidth = 768;

const App = () => {
  return (
    <Flex justifyContent="space-around" alignContent="center" margin={0} padding={0} flexDirection="column">
      <Flex backgroundColor={primaryColor} width="100%" boxShadow="0px 2px 5px rgba(0,0,0,.3)" marginBottom={15}>
        <Block width={pageWidth} padding="15px 10px" margin="auto">
          <Inline color="white">You Pick</Inline>
        </Block>
      </Flex>
      <Flex width={pageWidth} margin="auto">
        Hello World!
      </Flex>
    </Flex>
  );
};
export default App;
