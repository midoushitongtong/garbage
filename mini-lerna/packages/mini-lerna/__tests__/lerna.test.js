'use strict';

const helloWorld = () => {
  return 'helloWorld';
};

describe('lerna', () => {
  it('test hello world', () => {
    expect(helloWorld()).toBe('helloWorld');
  });
});
