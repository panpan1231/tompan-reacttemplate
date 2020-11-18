#! /usr/bin/env node

'use strict';

const appName = "newProject";
const { spawnSync } = require('child_process');
const url = 'https://github.com/panpan1231/tompan-reacttemplate.git';

spawnSync('git', ['clone', url, `${process.cwd()}/${appName}`]);
spawnSync('npm', ['install', '--prefix', `${process.cwd()}/${appName}`]);

console.log('Your app has been successfully installed');
console.log(`$ cd ${appName}`);
console.log('$ npm start');
