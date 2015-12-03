
const colourPallete = [
  '#2d8dcc',
  '#e67e22'
];

function getKeyColourMapping(keys) {
  let colours = {};

  keys.map((k, i) => {
    colours[k] = colourPallete[i];
  });

  return colours;
};

export default { getKeyColourMapping };
