ARG PHP_IMAGE

FROM ${PHP_IMAGE}

# Composer のハッシュ値
ARG composer_hash=dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6
# Composer の保存先
ARG composer_path=/usr/local/bin/composer

# llコマンドが使えるように
RUN echo "\n\
alias ll='ls -la --color'\n\
" >> /root/.bashrc
 
#apt-getはUbuntu系Linuxで使うパッケージ管理コマンド
#パッケージ一覧を更新する（≒スーパーの棚卸し）
RUN apt-get update \
  # Composer インストール \
  && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
  && php -r "if (hash_file('sha384', 'composer-setup.php') === '$composer_hash') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
  && php composer-setup.php \
  && php -r "unlink('composer-setup.php');" \
  && mv composer.phar $composer_path \
  && chmod 755 $composer_path \
  # 指定のパッケージを自動でインストールする（-y は「はい、全部OK」って意味）
  && apt-get install -y git \
  && apt-get install -y vim \
  && apt-get install -y unzip \
  && apt-get install -y libicu-dev \
  # PHPに「MySQL使えるようにして！」っていう指示。
  && docker-php-ext-install mysqli \
  # Apache に「URL書き換え機能（mod_rewrite）」をONにしてる。
  && a2enmod rewrite

RUN apt-get update && apt-get install -y \
      libfreetype6-dev \
      libjpeg62-turbo-dev \
      libpng-dev \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) gd