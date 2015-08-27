import assign from 'object-assign';

import configDefault from './default';
import configProd from './production';

let configs = {
    production: configProd,
    default: configDefault
};

let config = assign(configDefault, configs[(process.env.NODE_ENV || 'default')]);

export default config;