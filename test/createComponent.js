import React from 'react';
import TestUtils from 'react-addons-test-utils';

export function createComponent(component, props, ...children) {
  const renderer = TestUtils.createRenderer();
  const element = React.createElement(component, props, children.length > 1 ? children : children[0])
  renderer.render(element);
  return renderer.getRenderOutput();
}

export function createAltWrappedComponent() {
  const renderer = TestUtils.createRenderer();
  let wrapped = createComponent(...arguments);
  renderer.render(wrapped);
  let output = renderer.getRenderOutput();
  return output;
}
