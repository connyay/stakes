#!/bin/bash

cd ./client
sudo npm install
bower install

cd ../server
composer install
