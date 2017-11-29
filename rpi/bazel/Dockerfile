#
# Builds Bazel from scratch (incl. protoc & protoc-gen-grpc-java deps).
# 
FROM resin/rpi-raspbian
# docker run --rm --privileged multiarch/qemu-user-static:register --reset

#oracle-java8-jdk openjdk-8-jdk 
# sed -i 's/jessie/stretch/g' /etc/apt/sources.list && \
#   apt-get update && \
#   apt-get upgrade && \
#   apt-get dist-upgrade && \
RUN apt-get update && \
  apt-get install -y build-essential git wget oracle-java8-jdk autoconf automake libtool curl make g++ unzip &&
  export BAZEL_VERSION=0.8.0 && \
  wget https://github.com/bazelbuild/bazel/archive/$BAZEL_VERSION.zip && \
  unzip $BAZEL_VERSION.zip && \
  rm $BAZEL_VERSION.zip && \
  cd bazel-$BAZEL_VERSION && \
  sed -i 's/-Isrc/-I. -Ithird_party\/googleapis -Isrc/' scripts/bootstrap/compile.sh && \
  sed -Ei 's/-classpath/-J-Xmx800M \0/' scripts/bootstrap/compile.sh && \
  sed -i 's/option php_namespace.*$//' third_party/googleapis/google/longrunning/operations.proto && \
  cp \
    third_party/pprof/profile.proto \
    third_party/googleapis/google/devtools/remoteexecution/v1test/remote_execution.proto \
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

# https://github.com/bazelbuild/bazel/issues/3174
# WARNING: /tmp/bazel_k4wE9AzC/out/external/bazel_tools/WORKSPACE:1: Workspace name in /tmp/bazel_k4wE9AzC/out/external/bazel_tools/WORKSPACE (@io_bazel) does not match the name given in the repository's definition (@bazel_tools); this will cause a build error in future versions
# ERROR: /home/pi/bazel-0.8.0/src/java_tools/buildjar/java/com/google/devtools/build/buildjar/BUILD:144:12: in srcs attribute of bootstrap_java_library rule //src/java_tools/buildjar/java/com/google/devtools/build/buildjar:skylark-deps: '//:bootstrap-derived-java-srcs' does not produce any bootstrap_java_library srcs files (expected .java)
# ERROR: Analysis of target '//src:bazel' failed; build aborted: Analysis of target '//src/java_tools/buildjar/java/com/google/devtools/build/buildjar:skylark-deps' failed; build aborted
# INFO: Elapsed time: 19.893s
# FAILED: Build did NOT complete successfully (60 packages loaded)



#   apt-get install protobuf-compiler libprotobuf-dev libprotobuf-java libprotoc-dev && \
#   export GRPC_VERSION=1.6.1 && \
#   export GRPC_BRANCH=v1.6.x && \