FROM php:8.2-apache

# 必要なPHP拡張をインストール
RUN apt-get update && apt-get install -y zip unzip \
    && docker-php-ext-install pdo pdo_mysql

# Laravelの public ディレクトリを DocumentRoot に設定
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf

# mod_rewrite を有効に（Laravelに必要）
RUN a2enmod rewrite

# Laravelプロジェクトをコンテナにコピー（docker-composeでvolumeマウントしてればこれは省略してもOK）
COPY . /var/www/html
