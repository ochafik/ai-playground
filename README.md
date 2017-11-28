Simple wrapper around the [tensorflow/syntaxnet](https://hub.docker.com/r/tensorflow/syntaxnet/)
Docker image with auto-download of the
[Parsey Universal](https://github.com/tensorflow/models/blob/master/research/syntaxnet/g3doc/universal.md)
language models.

(Assumes you have docker installed.)

# Usage

See .

```bash
echo "Le chat dont je me suis séparé a beaucoup grandi." | ./parse.sh French
echo "Me llamo Oliver y me gustan las heladas." | ./parse.sh Spanish
```