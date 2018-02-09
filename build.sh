#!/usr/bin/env bash

USERNAME="akrn"

if [ -z "$VERSION" ]; then
    VERSION=$(node -e "console.log(require('./package.json').version)")
fi

if [ -z "$NAME" ]; then
    NAME=$(node -e "console.log(require('./package.json').name.split('/').pop())")
fi

echo "Building version $VERSION..."

docker build -t "$USERNAME/$NAME:$VERSION" -t "$USERNAME/$NAME:latest" "$@" . \
  && docker push "$USERNAME/$NAME:latest"