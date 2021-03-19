FROM php:7.3.1-cli

ENV ACCEPT_EULA=Y

RUN apt-get update \
  && apt-get install -y --no-install-recommends gnupg zip unzip \
  && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
  && curl https://packages.microsoft.com/config/debian/9/prod.list \
  > /etc/apt/sources.list.d/mssql-release.list \
  && apt-get install -y --no-install-recommends \
  locales \
  apt-transport-https \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen \
  && apt-get update \
  && apt-get -y --no-install-recommends install \
  unixodbc-dev \
  msodbcsql17

RUN docker-php-ext-install mbstring pdo pdo_mysql \
  && pecl install sqlsrv pdo_sqlsrv xdebug \
  && docker-php-ext-enable sqlsrv pdo_sqlsrv xdebug

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN cd /usr/local/etc/php/conf.d/ && \
  echo 'memory_limit = -1' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini

RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
  echo "[XDebug]" > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
  echo "xdebug.mode = debug"  > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
  echo "xdebug.start_with_request = yes"  > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
  echo "xdebug.client_port = 9000"  > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
  echo "xdebug.client_host = host.docker.internal"  > /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

COPY . /var/www/html

WORKDIR /var/www/html

RUN composer install

EXPOSE 80

ENTRYPOINT ["php", "-S", "0.0.0.0:80", "-t", "public"]