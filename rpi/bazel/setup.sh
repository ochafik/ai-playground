#!/bin/bash
set -eu

apt-get update
apt-get install -y curl build-essential git default-jdk autoconf automake libtool make g++

git clone -b raspbian-from-scratch https://github.com/ochafik/bazel.git --depth=1
cd bazel

pushd third_party/protobuf/3.4.0
  ./autogen.sh && ./configure && make && make install && ldconfig
popd
export PROTOC=`which protoc`

pushd third_party/grpc/compiler/src/java_plugin/cpp
  g++ -w -I/usr/local/include -export-dynamic \
    java_generator.cpp java_plugin.cpp \
    -o protoc-gen-grpc-java \
    -L/usr/local/lib -lprotobuf -lprotoc
  export GRPC_JAVA_PLUGIN="$PWD/protoc-gen-grpc-java"
popd

bash ./compile.sh
