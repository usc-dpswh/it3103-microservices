#!/usr/bin/env bash

set -e

ROOT_DIR='/opt/bitnami/suitecrm'
OAUTH_DIR="$ROOT_DIR/public/legacy/Api/V8/OAuth2"
CONFIG_FILE="$ROOT_DIR/public/legacy/config.php"
BOOTSTRAP_FLAG="$ROOT_DIR/bootstrap.flag"

bootstrap() {
    echo 'Initializing bootstrap'

    openssl genrsa -out "$OAUTH_DIR/private.key" 2048
    openssl rsa -in "$OAUTH_DIR/private.key" -pubout -out "$OAUTH_DIR/public.key"
    chmod 600 "$OAUTH_DIR/private.key" "$OAUTH_DIR/public.key"
    chown daemon:daemon "$OAUTH_DIR/private.key" "$OAUTH_DIR/public.key"

    ENCRYPTION_KEY=$(php -r 'echo base64_encode(random_bytes(32));')
    sed -i "s|'oauth2_encryption_key' => '.*'|'oauth2_encryption_key' => '$ENCRYPTION_KEY'|" "$CONFIG_FILE"

    touch "$BOOTSTRAP_FLAG"

    echo 'Bootstrap complete'
}

if [[ ! -f $BOOTSTRAP_FLAG ]]; then
    bootstrap
else
    echo "Bootstrap skipped - already configured"
fi