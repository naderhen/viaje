'use strict';

import del from 'del';
import path from 'path';
import debug from 'debug';

export default () => {
    const DIST_PATH = path.resolve(__dirname, '../../dist/*');
    const BOWER_PATH = '!' + path.resolve(__dirname, '../../dist/bower_components');

    del.sync([DIST_PATH, BOWER_PATH]);
    debug('dev')('cleaned `dist` directory');
};