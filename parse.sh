#!/bin/bash
set -eu

readonly language="${1:-English}"
if [[ ! -d "$language" ]]; then
  wget "http://download.tensorflow.org/models/parsey_universal/$language.zip" >&2
  unzip "$language.zip" >&2
fi

docker run --rm -i --entrypoint=/ParseyUniversal/entrypoint.sh \
  -e "language=$language" \
  -v "$PWD:/ParseyUniversal" \
  tensorflow/syntaxnet 
