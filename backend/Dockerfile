FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    sqlite3 \
    libsqlite3-dev

RUN docker-php-ext-install pdo pdo_sqlite zip

# habilita mod_rewrite para Laravel
RUN a2enmod rewrite

# permite uso do .htaccess
RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

COPY . .

# aponta apache para pasta public
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

# instalar composer
RUN curl -sS https://getcomposer.org/installer | php \
 && mv composer.phar /usr/local/bin/composer

# instalar dependências
RUN composer install --no-dev --optimize-autoloader

# limpar cache do Laravel (ESSENCIAL em deploy)
RUN php artisan config:clear
RUN php artisan route:clear
RUN php artisan cache:clear

# permissões
RUN chown -R www-data:www-data /var/www/html/storage
RUN chown -R www-data:www-data /var/www/html/bootstrap/cache

EXPOSE 80
