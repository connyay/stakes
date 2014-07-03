#!/bin/bash

cd ./client
npm install
bower install

cd ../server
composer install
