#!/bin/bash

# roda migrations
php artisan migrate --force

# roda seeders
php artisan db:seed --force

# inicia o servidor Laravel
php artisan serve --host=0.0.0.0 --port=$PORT
