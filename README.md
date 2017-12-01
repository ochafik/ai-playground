[Live BoBot](https://rawgit.com/ochafik/ai-playground/master/bobot/build/index.html) (chrome speech <-> text experiment)

# AI papers

## NLP

- [SyntaxNet](https://github.com/tensorflow/models/tree/master/research/syntaxnet): [DRAGNN: A Transition-based Framework for Dynamically Connected Neural Networks]() ([pdf](https://arxiv.org/pdf/1703.04474.pdf)) ([my playground](https://github.com/ochafik/parsey-universal-playground))

- [Universal dependencies notation](http://universaldependencies.org/u/dep/all.html)
- [Stanford CoreNLP](http://corenlp.run/) (bad for french lemma)
- [UPenn TreeBank Part of speech notation](https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html)
- [CoNLL-U Format](http://universaldependencies.org/format.html)

## Text

- [Swivel](https://github.com/tensorflow/models/tree/master/research/swivel) (word embeddings, [pdf](https://arxiv.org/pdf/1602.02215.pdf))
- [Text summarization model](https://github.com/tensorflow/models/tree/master/research/textsum)
- [Skip-thought Vectors](https://github.com/tensorflow/models/tree/master/research/skip_thoughts) (sentence encoder, [pdf](https://papers.nips.cc/paper/5950-skip-thought-vectors.pdf))

## Computer vision

- [Cognitive Mapping and Planning for Visual Navigation](https://sites.google.com/view/cognitive-mapping-and-planning/)
- [Object Detection API](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md)
  And [model trained on Open Images](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/detection_model_zoo.md)

## Database querying

- [Module networks for question answering on knowledge graph](https://github.com/tensorflow/models/tree/master/research/qa_kg) ([pdf](https://arxiv.org/pdf/1704.05526.pdf))
- [LEARNING A NATURAL LANGUAGE INTERFACE WITH NEURAL PROGRAMMER](https://openreview.net/pdf?id=ry2YOrcge) (learning how to query databases with NLP)

## Ontologies

- FactForge: live open-data repository queriable in SPARQL
  http://ldsr.ontotext.com/about
- FREya: NLP -> SPARQL
  https://sites.google.com/site/naturallanguageinterfaces/freya/demos
  
# Parsey Universal

Simple wrapper around the [tensorflow/syntaxnet](https://hub.docker.com/r/tensorflow/syntaxnet/)
Docker image with auto-download of the
[Parsey Universal](https://github.com/tensorflow/models/blob/master/research/syntaxnet/g3doc/universal.md)
language models.

See available languages [here](https://github.com/tensorflow/models/blob/master/research/syntaxnet/g3doc/universal.md).

```bash
# Assumes you have docker installed, see below

echo "There's just so much to discover and I don't know where to start." | ./parsey_universal.sh English
1 There's _ ADV RB  fPOS=PRON++PRP  4 advmod  _ _
2 just  _ ADV RB  fPOS=ADV++RB  4 advmod  _ _
3 so  _ ADV RB  fPOS=ADV++RB  4 advmod  _ _
4 much  _ ADJ JJ  Degree=Pos|fPOS=ADJ++JJ 0 ROOT  _ _
5 to  _ PART  TO  fPOS=PART++TO 6 mark  _ _
6 discover  _ VERB  VB  VerbForm=Inf|fPOS=VERB++VB  4 advcl _ _
7 and _ CONJ  CC  fPOS=CONJ++CC 4 cc  _ _
8 I _ PRON  PRP Case=Nom|Number=Sing|Person=1|PronType=Prs|fPOS=PRON++PRP 10  nsubj _ _
9 don't _ PART  RB  Mood=Ind|Tense=Pres|VerbForm=Fin|fPOS=AUX++VBP  10  advmod  _ _
10  know  _ VERB  VB  VerbForm=Inf|fPOS=VERB++VB  4 conj  _ _
11  where _ ADV WRB PronType=Int|fPOS=ADV++WRB  13  advmod  _ _
12  to  _ PART  TO  fPOS=PART++TO 13  mark  _ _
13  start.  _ VERB  VB  VerbForm=Inf|fPOS=VERB++VB  10  advcl _ _

echo "Le chat dont je me suis séparé a beaucoup grandi." | ./parsey_universal.sh French
1 Le  _ DET _ Definite=Def|Gender=Masc|Number=Sing|fPOS=DET++ 2 det _ _
2 chat  _ NOUN  _ Gender=Masc|Number=Sing|fPOS=NOUN++ 0 ROOT  _ _
3 dont  _ PRON  _ PronType=Rel|fPOS=PRON++  7 iobj  _ _
4 je  _ PRON  _ Number=Sing|Person=1|PronType=Prs|fPOS=PRON++ 7 nsubj _ _
5 me  _ PRON  _ Number=Sing|Person=1|PronType=Prs|fPOS=PRON++ 7 dobj  _ _
6 suis  _ AUX _ Mood=Ind|Number=Sing|Person=1|Tense=Pres|VerbForm=Fin|fPOS=AUX++  7 aux _ _
7 séparé  _ VERB  _ Gender=Masc|Number=Sing|Tense=Past|VerbForm=Part|fPOS=VERB++  2 acl:relcl _ _
8 a _ ADP _ fPOS=ADP++  10  case  _ _
9 beaucoup  _ ADV _ fPOS=ADV++  10  advmod  _ _
10  grandi. _ ADJ _ Gender=Masc|Number=Sing|fPOS=ADJ++  7 amod  _ _

echo "Me llamo Oliver y me gustan las heladas." | ./parsey_universal.sh Spanish
1 Me  _ PRON  _ Case=Acc,Dat|Number=Sing|Person=1|PrepCase=Npr|PronType=Prs|Reflex=Yes|fPOS=PRON++  2 iobj  _
2 llamo _ VERB  _ Mood=Ind|Number=Sing|Person=1|Tense=Pres|VerbForm=Fin|fPOS=VERB++ 0 ROOT  _ _
3 Oliver  _ PROPN _ fPOS=PROPN++  2 dobj  _ _
4 y _ CONJ  _ fPOS=CONJ++ 2 cc  _ _
5 me  _ PRON  _ Case=Acc,Dat|Number=Sing|Person=1|PrepCase=Npr|PronType=Prs|fPOS=PRON++ 6 iobj  _ _
6 gustan  _ VERB  _ Mood=Ind|Number=Plur|Person=3|Tense=Pres|VerbForm=Fin|fPOS=VERB++ 2 conj  _ _
7 las _ DET _ Definite=Def|Gender=Fem|Number=Plur|PronType=Art|fPOS=DET++ 8 det _ _
8 heladas.  _ NOUN  _ Gender=Fem|Number=Sing|fPOS=NOUN++  6 nsubj _ _
```

Run the Jupyter notebook:

```bash
docker run --rm -ti -p 8888:8888 tensorflow/syntaxnet

docker run --rm -ti -p 8888:8888 --entrypoint=/bin/bash \
  -v "$PWD:/data" \
  tensorflow/syntaxnet
bazel build -c opt syntaxnet:parser_eval
echo "This is a test" | syntaxnet/models/parsey_universal/parsey_universal.sh /data/models/parsey_universal/English
```

# Tensorflow, Docker & Raspberry Pi

- [Complete Tensorflow on RPi from scratch](https://github.com/ochafik/tensorflow-on-raspberry-pi)
  ([bazel](https://github.com/samjabrahams/tensorflow-on-raspberry-pi/blob/master/GUIDE.md#3-build-bazel))
- [Build Docker images for ARM](https://blog.hypriot.com/post/setup-simple-ci-pipeline-for-arm-images/)
- [Tensorflow Dockerfile](https://github.com/tensorflow/models/blob/master/research/syntaxnet/docker-devel/Dockerfile.min)

- [Install docker on Raspbian](https://howchoo.com/g/nmrlzmq1ymn/how-to-install-docker-on-your-raspberry-pi)

# Bazel on Raspberry Pi (Raspbian)

```bash
# https://docs.bazel.build/versions/master/install-compile-source.html
# sudo apt-get install build-essential openjdk-8-jdk python zip

export BAZEL_VERSION=0.8.0
export GRPC_VERSION=1.6.1
export GRPC_BRANCH=v1.6.x

sudo apt-get install protobuf-compiler libprotobuf-dev libprotobuf-java libprotoc-dev

# Download Bazel sources
wget https://github.com/bazelbuild/bazel/archive/$BAZEL_VERSION.zip
unzip $BAZEL_VERSION
rm $BAZEL_VERSION
pushd bazel-$BAZEL_VERSION

# Adjust some sources

# Filed https://github.com/bazelbuild/bazel/pull/4187
sed -i 's/-Isrc/-I. -Isrc/' scripts/bootstrap/compile.sh
ln -s ../googleapis/google

# TODO(ochafik): File this (from https://github.com/samjabrahams/tensorflow-on-raspberry-pi/blob/master/GUIDE.md#3-build-bazel)
sed -Ei 's/-classpath/-J-Xmx800M \0/' scripts/bootstrap/compile.sh

# Raspbian ships with protoc 3.0.0 but this option was introduced in 3.4.x
# (see https://github.com/grpc/grpc/pull/11886)
sed -i 's/option php_namespace.*$//' third_party/googleapis/google/longrunning/operations.proto

# TODO(ochafik): Send PR with https://github.com/bazelbuild/bazel/compare/master...ochafik:patch-2
cp \
  third_party/pprof/profile.proto \
  third_party/googleapis/google/devtools/remoteexecution/v1test/remote_execution.proto \
  third_party/googleapis/google/devtools/build/v1/*.proto \
  third_party/googleapis/google/api/*.proto \
  third_party/googleapis/google/rpc/*.proto \
  third_party/googleapis/google/longrunning/*.proto \
  third_party/googleapis/google/bytestream/*.proto \
  third_party/googleapis/google/watcher/v1/*.proto \
  src/main/protobuf

# Build GRPC_JAVA_PLUGIN
pushd third_party/grpc/compiler/src/java_plugin/cpp
  gcc -w -I/usr/include -lprotoc java_generator.cpp java_plugin.cpp -o protoc-gen-grpc-java
  export GRPC_JAVA_PLUGIN="$PWD/protoc-gen-grpc-java"
popd

export PROTOC=`which protoc`
bash ./compile.sh
popd



# TODO(ochafik):
# - Cleanup Maven cache
# - Try https://github.com/bazelbuild/bazel/blob/master/third_party/grpc/README.bazel.md

# Build protoc-gen-grpc-java
(
  git clone -b "$GRPC_BRANCH" https://github.com/grpc/grpc-java.git --depth=1
  cd grpc-java/compiler

  sed -Ei 's/"(aarch_64|ppcle_64)"/"linux_arm-v7"/g' build.gradle
  export CPPFLAGS=-I/usr/include
  ../gradlew java_pluginExecutable
  sudo cp build/exe/java_plugin/protoc-gen-grpc-java /usr/bin/protoc-gen-grpc-java-$GRPC_VERSION
  sudo ln -s /usr/bin/protoc-gen-grpc-java-$GRPC_VERSION /usr/bin/protoc-gen-grpc-java
  echo "Can reclaim space with: rm -fR $PWD/grpc-java"
)
export GRPC_JAVA_PLUGIN=`which protoc-gen-grpc-java`

mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get \
    -Dartifact=io.grpc:grpc-protobuf:$GRPC_VERSION
  # mvn org.apache.maven.plugins:maven-dependency-plugin:2.8:get \
  #   -Dartifact=io.grpc:grpc-stub:$GRPC_VERSION
sed -i "s/-Isrc/-I$(echo $PWD/../googleapis | sed 's/\//\\\//g') -Isrc/" scripts/bootstrap/compile.sh



WARNING: /tmp/bazel_k4wE9AzC/out/external/bazel_tools/WORKSPACE:1: Workspace name in /tmp/bazel_k4wE9AzC/out/external/bazel_tools/WORKSPACE (@io_bazel) does not match the name given in the repository's definition (@bazel_tools); this will cause a build error in future versions
ERROR: /home/pi/bazel-0.8.0/src/java_tools/buildjar/java/com/google/devtools/build/buildjar/BUILD:144:12: in srcs attribute of bootstrap_java_library rule //src/java_tools/buildjar/java/com/google/devtools/build/buildjar:skylark-deps: '//:bootstrap-derived-java-srcs' does not produce any bootstrap_java_library srcs files (expected .java)
ERROR: Analysis of target '//src:bazel' failed; build aborted: Analysis of target '//src/java_tools/buildjar/java/com/google/devtools/build/buildjar:skylark-deps' failed; build aborted
INFO: Elapsed time: 19.893s
FAILED: Build did NOT complete successfully (60 packages loaded)

  
```


