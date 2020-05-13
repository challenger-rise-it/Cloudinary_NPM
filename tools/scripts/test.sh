#!/bin/bash
set -e;

node_v=$(node --version) ;

if [[ "${node_v%%.*}" == 'v4' || "${node_v%%.*}" == 'v6' ]]
then
  npm run test-es5
else
  npm run test-es6
fi
  npm run dtslint
