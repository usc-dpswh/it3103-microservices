#!/bin/bash

# Navigate to the OAuth2 directory
cd /bitnami/suitecrm/public/legacy/Api/V8/OAuth2

# Generate a private key
openssl genrsa -out private.key 2048

# Generate a public key
openssl rsa -in private.key -pubout -out public.key

# Change key permissions
chmod 600 private.key public.key

# Change ownership of the keys to daemon user
chown daemon:daemon private.key public.key

echo "RSA keys generated successfully."
