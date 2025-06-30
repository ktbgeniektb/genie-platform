FROM php:8.2-apache

RUN apt-get update && apt-get install -y zip unzip \
    && docker-php-ext-install pdo pdo_mysql

# Laravelの公開ディレクトリに合わせる
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Apacheの設定を上書き
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf

# Laravelアプリをコピー
COPY . /var/www/html
