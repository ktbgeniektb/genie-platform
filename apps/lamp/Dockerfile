FROM php:8.2-apache

# 必要なPHP拡張をインストール
RUN apt-get update && apt-get install -y zip unzip \
    && docker-php-ext-install pdo pdo_mysql

# Laravelの public ディレクトリを DocumentRoot に設定
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Apache設定ファイル全体を書き換え（全conf対象）
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# mod_rewrite 有効化
RUN a2enmod rewrite

# Laravelアプリをコピー
COPY . /var/www/html
