#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''
cat conll | conll/conllu2json.py
'''
import sys
import codecs
import json

def parse(content):
    nodess = []
    for group in content.split('\n\n'):
      group = group.strip()
      if group == '':
          continue
      nodes = []
      nodess.append(nodes)
      for line in group.split('\n'):
          cells = line.split('\t')

          def get_cell(i):
              if i >= len(cells):
                  print('Bad index in "%s" (i = %d, len = %d)' % (line, i, len(cells)))
                  sys.exit(1)
              value = cells[i]
              return None if value == '_' else value

          # http://universaldependencies.org/format.html
          node = {}

          def set_prop(name, value):
            if value != None:
              node[name] = value
          
          # Word index, integer starting at 1 for each new sentence; may be a range for multiword tokens; may be a decimal number for empty nodes.
          set_prop('id', get_cell(0))
          # Word form or punctuation symbol.
          set_prop('form', get_cell(1))
          # Lemma or stem of word form.
          set_prop('lemma', get_cell(2))
          # Universal part-of-speech tag.
          set_prop('upostag', get_cell(3))
          # Language-specific part-of-speech tag; underscore if not available.
          set_prop('xpostag', get_cell(4))
          # List of morphological features from the universal feature inventory or from a defined language-specific extension; underscore if not available.
          set_prop('feats', get_cell(5))
          # Head of the current word, which is either a value of ID or zero (0).
          set_prop('head', int(get_cell(6)))
          # Universal dependency relation to the HEAD (root iff HEAD = 0) or a defined language-specific subtype of one.
          set_prop('deprel', get_cell(7))
          # Enhanced dependency graph in the form of a list of head-deprel pairs.
          set_prop('deps', get_cell(8))
          # Any other annotation.
          set_prop('misc', get_cell(9))

          nodes.append(node)
    head_node = None
    for node in nodes:
        head = node['head']
        if head == 0:
          root_node = node
        elif head > len(nodes):
          print('ERROR: ' + json.dumps(node))
        else:
          # print('head: %d, nodes.len = %d' % (head, len(nodes)))
          head_node = nodes[head - 1]
          if 'children' in head_node:
            siblings = head_node['children']
          else:
            siblings = head_node['children'] = []
          siblings.append(node)
    return head_node

def main():
    UTF8Reader = codecs.getreader('utf8')
    content = UTF8Reader(sys.stdin).read()
    print(json.dumps(parse(content), ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()