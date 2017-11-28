Simple wrapper around the [tensorflow/syntaxnet](https://hub.docker.com/r/tensorflow/syntaxnet/)
Docker image with auto-download of the
[Parsey Universal](https://github.com/tensorflow/models/blob/master/research/syntaxnet/g3doc/universal.md)
language models.

(Assumes you have docker installed.)

# Usage

See available languages [here](https://github.com/tensorflow/models/blob/master/research/syntaxnet/g3doc/universal.md).

```bash
echo "There's just so much to discover and I don't know where to start." | ./parse.sh English
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

echo "Le chat dont je me suis séparé a beaucoup grandi." | ./parse.sh French
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

echo "Me llamo Oliver y me gustan las heladas." | ./parse.sh Spanish
1 Me  _ PRON  _ Case=Acc,Dat|Number=Sing|Person=1|PrepCase=Npr|PronType=Prs|Reflex=Yes|fPOS=PRON++  2 iobj  _
2 llamo _ VERB  _ Mood=Ind|Number=Sing|Person=1|Tense=Pres|VerbForm=Fin|fPOS=VERB++ 0 ROOT  _ _
3 Oliver  _ PROPN _ fPOS=PROPN++  2 dobj  _ _
4 y _ CONJ  _ fPOS=CONJ++ 2 cc  _ _
5 me  _ PRON  _ Case=Acc,Dat|Number=Sing|Person=1|PrepCase=Npr|PronType=Prs|fPOS=PRON++ 6 iobj  _ _
6 gustan  _ VERB  _ Mood=Ind|Number=Plur|Person=3|Tense=Pres|VerbForm=Fin|fPOS=VERB++ 2 conj  _ _
7 las _ DET _ Definite=Def|Gender=Fem|Number=Plur|PronType=Art|fPOS=DET++ 8 det _ _
8 heladas.  _ NOUN  _ Gender=Fem|Number=Sing|fPOS=NOUN++  6 nsubj _ _


```