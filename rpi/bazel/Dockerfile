#
# Builds Bazel from scratch (incl. protoc & protoc-gen-grpc-java deps).
# Build with:
#   docker run --rm --privileged multiarch/qemu-user-static:register --reset
#   docker build -t rpi-raspbian-bazel .
#
# TODO: read https://resin.io/blog/building-arm-containers-on-any-x86-machine-even-dockerhub/
# 
FROM resin/rpi-raspbian as bazel-builder
RUN apt-get update && \
  apt-get install -y build-essential git wget oracle-java8-jdk autoconf automake libtool curl make g++ unzip &&
  export BAZEL_VERSION=0.8.0 && \
  wget https://github.com/bazelbuild/bazel/archive/$BAZEL_VERSION.zip && \
  unzip $BAZEL_VERSION.zip >/dev/null && \
  rm $BAZEL_VERSION.zip && \
  mv bazel-$BAZEL_VERSION bazel-src && \
  cd bazel-src && \
  sed -i 's/-Isrc/-I. -Ithird_party\/googleapis -Isrc/' scripts/bootstrap/compile.sh && \
  sed -Ei 's/-classpath/-J-Xmx800M \0/' scripts/bootstrap/compile.sh && \
  sed -Ei 's/atexit cleanup_tempdir_/ln -s "\$\{DIR\}\/src derived #\0/' scripts/bootstrap/buildenv.sh && \
  cp \
    third_party/pprof/*.proto \
    third_party/googleapis/google/devtools/remoteexecution/v1test/*.proto \
    third_party/googleapis/google/devtools/build/v1/*.proto \
    third_party/googleapis/google/api/*.proto \
    third_party/googleapis/google/api/experimental/*.proto \
    third_party/googleapis/google/rpc/*.proto \
    third_party/googleapis/google/longrunning/*.proto \
    third_party/googleapis/google/bytestream/*.proto \
    third_party/googleapis/google/watcher/v1/*.proto \
    src/main/protobuf && \
  pushd third_party/protobuf/3.4.0 && \
    ./autogen.sh && \
    ./configure && \
    make && \
    make check && \
    make install && \
    ldconfig && \
  popd && \
  export PROTOC=`which protoc` && \
  pushd third_party/grpc/compiler/src/java_plugin/cpp && \
    g++ -w -I/usr/local/include -export-dynamic \
      java_generator.cpp java_plugin.cpp \
      -o protoc-gen-grpc-java \
      -L/usr/local/lib -lprotobuf -lprotoc && \
    export GRPC_JAVA_PLUGIN="$PWD/protoc-gen-grpc-java" && \
  popd && \
  bash ./compile.sh

# https://docs.docker.com/engine/userguide/eng-image/multistage-build/#use-multi-stage-builds
FROM resin/rpi-raspbian
WORKDIR /root/
COPY --from=bazel-builder \
  /usr/local/bin/protoc \
  /bazel-src/bazel-bin/blaze \
  /bazel-src/third_party/grpc/compiler/src/java_plugin/cpp/protoc-gen-grpc-java \
  /usr/bin

# https://github.com/bazelbuild/bazel/issues/3174
# WARNING: /tmp/bazel_k4wE9AzC/out/external/bazel_tools/WORKSPACE:1: Workspace name in /tmp/bazel_k4wE9AzC/out/external/bazel_tools/WORKSPACE (@io_bazel) does not match the name given in the repository's definition (@bazel_tools); this will cause a build error in future versions
# ERROR: /home/pi/bazel-0.8.0/src/java_tools/buildjar/java/com/google/devtools/build/buildjar/BUILD:144:12: in srcs attribute of bootstrap_java_library rule //src/java_tools/buildjar/java/com/google/devtools/build/buildjar:skylark-deps: '//:bootstrap-derived-java-srcs' does not produce any bootstrap_java_library srcs files (expected .java)
# ERROR: Analysis of target '//src:bazel' failed; build aborted: Analysis of target '//src/java_tools/buildjar/java/com/google/devtools/build/buildjar:skylark-deps' failed; build aborted
# INFO: Elapsed time: 19.893s
# FAILED: Build did NOT complete successfully (60 packages loaded)

#   apt-get install protobuf-compiler libprotobuf-dev libprotobuf-java libprotoc-dev && \
#   export GRPC_VERSION=1.6.1 && \
#   export GRPC_BRANCH=v1.6.x && \
