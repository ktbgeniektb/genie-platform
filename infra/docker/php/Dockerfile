FROM php:8.2-apache

RUN apt-get update && apt-get install -y zip unzip \
    && docker-php-ext-install pdo pdo_mysql

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf

COPY . /var/www/html

# mod_rewrite 有効化
RUN a2enmod rewrite

# DocumentRoot 変更（すでにあるはず）
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf