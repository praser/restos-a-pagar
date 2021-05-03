#!/bin/bash

while getopts t: flag
do
  case "${flag}" in
    t) tag=${OPTARG};;
  esac
done

echo "Gerando build com a tag: $tag...";

# Remover build pre existente
rm -rf ./build

# copiar a pasta do projeto
rsync -ax ./ ./build

# acessar a pasta do build
cd build

# instalar dependências de produção
rm -rf vendor && composer install --no-dev

# remover os arquivos desnecessários para a produção
rm -rf \
  .dockerignore \
  CONTRIBUTING.md \
  composer.json \
  compose.lock \
  phpcs.xml \
  .env \
  Dockerfile \
  phpstan.neon.dist \
  var \
  .DS_Store \
  .gitignore \
  README.md \
  logs \
  phpunit.xml \
  .coveralls.yml \
  .vscode \
  phinx.php \
  src/Infrastructure/Database/Migrations \
  src/Infrastructure/Database/Seeds

# compactar
zip -r "restos-a-pagar-backend-$tag.zip" .

# remover a pasta da build
cd .. && mv build/*.zip . && rm -rf build