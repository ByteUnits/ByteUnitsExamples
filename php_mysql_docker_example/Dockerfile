# Use the PHP image based off Alpine Linux
FROM php:5.6.38-alpine

# Setup some environment variables
# PHP Variables
ENV APP_DIR /approved
ENV APPLICATION_ENV development
# MySQL Variables
ENV TIMEZONE Europe/Paris
ENV MYSQL_ROOT_PASSWORD newpassword
ENV MYSQL_DATABASE FaithfulScholars
ENV MYSQL_USER root
ENV MYSQL_PASSWORD newpassword
ENV MYSQL_USER_MONITORING monitoring
ENV MYSQL_PASSWORD_MONITORING monitoring

# Create app directory for the PHP code
RUN mkdir $APP_DIR
WORKDIR $APP_DIR
VOLUME $APP_DIR

# Install php composer to setup additional php components
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');    \
    \$sig = file_get_contents('https://composer.github.io/installer.sig');      \
    if (trim(\$sig) === hash_file('SHA384', 'composer-setup.php')) exit(0);     \
    echo 'ERROR: Invalid installer signature' . PHP_EOL;                        \
    unlink('composer-setup.php');                                               \
    exit(1);"                                                                   \
 && php composer-setup.php -- --filename=composer --install-dir=/usr/local/bin  \
 && rm composer-setup.php

# Install MySQL using Alpines APK package manager
RUN apk add --no-cache mysql
RUN addgroup mysql mysql

# Setup the MySQL startup script
WORKDIR /scripts

COPY start.sh start.sh

# Volume to persist MySQL data
VOLUME [ "/var/lib/mysql" ]

# Export port 80 to view php app
EXPOSE 80

# Run the php servlet on port 80
CMD ["php", "-S", "0.0.0.0:80", "-t", "/app/public"]

