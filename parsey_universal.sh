#!/bin/bash
set -eu
cd "${0%/*}"

readonly language="${1:-English}"
if [[ ! -d "models/parsey_universal/$language" ]]; then
  (
    mkdir -p models/parsey_universal
    cd models/parsey_universal
    wget "http://download.tensorflow.org/models/parsey_universal/$language.zip" >&2
    unzip "$language.zip" >&2
    rm "$language.zip" >&2
  )
fi

docker run --rm -i --entrypoint=/data/docker_entrypoints/parsey_universal.sh \
  -e "language=$language" \
  -v "$PWD:/data" \
  tensorflow/syntaxnet 
