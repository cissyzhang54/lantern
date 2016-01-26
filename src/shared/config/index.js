import deepAssign from 'deep-assign';

import configDefault from './default';
import configTest from './test';
import configProd from './production';

let configs = {
    production: configProd,
    test: configTest,
    default: configDefault
};

let config = deepAssign(configDefault, configs[(process.env.NODE_ENV || 'default')]);

export default config;
