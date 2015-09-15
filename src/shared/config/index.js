import assign from 'object-assign';

import configDefault from './default';
import configTest from './test';
import configProd from './production';

let configs = {
    production: configProd,
    test: configTest,
    default: configDefault
};

let config = assign(configDefault, configs[(process.env.NODE_ENV || 'default')]);

export default config;
