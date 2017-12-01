import {init, Action, Config} from './speech';

function action(regexp: RegExp, fn: Action): [RegExp, Action] {
  return [regexp, fn];
}

var config: Config = {
  grammars: {
    '#JSGF V1.0; grammar swearwords; public <color> = shit | crap {CRAP} ;': 1,
    '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;': 1,
  },
  lang: localStorage.lang || 'fr-FR',
  onRecognition({text, isFinal, recognition}) {
    const element = document.getElementById('result');
    if (element == null) throw 'No result element';
    if (text == null) {
      element.innerText = recognition.lang.startsWith('en')
          ? 'Please try again?'
          : 'Essayez encore';
      element.style.backgroundColor = 'red';
    } else {
      element.innerText = text;
      element.style.backgroundColor = isFinal ? 'green' : 'orange';
    }
  },
  onSpeak({text, lang, recognition}) {
    const element = document.getElementById('response');
    if (element == null) throw 'No response element';
    element.innerText = text;
  },      
  actions: [
    action(/^(switch to french|in french|en francés)$/i, ({match, isFinal, recognition}) => {
      recognition.lang = localStorage.lang = 'fr-FR';
      recognition.speak("Je t'écoute");
    }),
    action(/^en anglais|en inglés$/i, ({match, isFinal, recognition}) => {
      recognition.lang = localStorage.lang = 'en-US';
      recognition.speak('OK');
    }),
    action(/^en espagnol|in spanish$/i, ({match, isFinal, recognition}) => {
      recognition.lang = localStorage.lang = 'es';
      recognition.speak('Vale');
    }),
    action(/^(comment )?ça va$/i, ({recognition}) => {
      recognition.speak('Pas pire, et toi?');
    }),
    action(/^(pas pire|tres bien|ca va bien)$/i, ({recognition}) => {
      recognition.speak('Tant mieux!');
    }),
    action(/^(?:tu t'appelles|ton prénom (?:est|c'est)|(?:je|on|nous) t'appelle(?:rai?|rons)) ([^ ]+?)( ((à partir de )?maintenant|dorénavant))?$/i, ({match: [_, name], recognition}) => {
      name = name.trim();
      recognition.speak(`D'accord, je m'appelle ${name}.`);
      localStorage.givenName = name;
    }),
    action(/^salut\b(.+)?/i, ({match: [_, name], recognition}) => {
      if (name != null) {
        name = name.trim();
        recognition.speak(`Salut! Ah, donc je m'appelle ${name}?`);
        localStorage.givenName = name;
      } else {
        recognition.speak(`Salut, ça va?`);
      }
    }),
    action(/^((sais tu |dis moi |tu sais )?quelle heure (il est|est-il)|il est quelle heure)$/i, ({recognition}) => {
      const time = new Date(Date.now());
      recognition.speak(`Il est ${time.getHours() == 0 ? 'minuit' : time.getHours() == 12 ? 'midi' : time.getHours() + ' heure'} ${time.getMinutes() == 0 ? '' : '' + time.getMinutes()}`);
    }),
    action(/^(merci)$/i, ({recognition}) => {
      recognition.speak("De rien.");
    }),
    action(/^(stop(pe)?)$/i, ({recognition}) => {
      recognition.pause();
      recognition.speak("À plusse.");
    }),
    action(/^(je te remercie)$/i, ({recognition}) => {
      recognition.speak("Je t'en prie.");
    }),
    action(/^oublie ton nom$/i, ({recognition}) => {
      localStorage.givenName = null;;
      recognition.speak("D'accord.");
    }),
    action(/^(comment (tu t'appelles|t'appelles-tu)|(quel(le)? est|c'est quoi) ton nom|qui es-tu)$/i, ({recognition}) => {
      recognition.speak(localStorage.givenName == null ? 'Je ne sais pas' : `Je m'appelle ${localStorage.givenName}.`);
    }),
    // action(/^(?:(?:what(?: i|')s(?: a| the)?|qu'est-ce que c'est que(?: le| la| les)?|c'est quoi) (.*))$/i, ({match: [_, ...groups], recognition}) => {
    //   const first = groups.filter(g => g != null)[0].trim();
    //   wikipediaSearch(first, recognition.lang);
    //   recognition.speak(`Voici ce que Wikipédia dit à propos de "${first}".`);
    // }),
    action(/^(?:(?:what is (.*)|define (.*))|what does(?: (?:the word|the idiom|the preposition))? (.*) mean)$/i, ({match: [_, ...groups], recognition}) => {
      const first = groups.filter(g => g != null)[0].trim();
      wikipediaSearch(first, recognition.lang);
      // wiktionarySearch(first, recognition.lang);
      recognition.speak(`Here's the definition for "${first}".`);
    }),
    // action(/^(?:qu'est-ce (?:qu'on sait|que nous savons|que (?:tu|Wikipédia) (?:sai[st]|savons|connai[st]|connaissons|di[st])))/i],

    // action(/^(?:(?:qu'est-ce que c'est(?: que)?|c'est quoi|défini[rs]?|(?:(?:de quoi|que)? (?:sais-tu|sait-on|savons-nous|sait Wikipédia|(?:faut-il|dois-je|devrais?-je))? ?(?:savoir|connaître|apprendre|découvrir|se souvenir)|qu'est-ce (?:qu'on sait|que nous savons|que (?:tu|Wikipédia) (?:sai[st]|savons|connai[st]|connaissons|di[st])))) (?:sur|au sujet|a propos)|quelle est la définition|que (?:veut|veulent) dire)(?: (?:(?:du|le) mot|(?:du|le) verbe|(?:de )?l'adjectif|(?:de )?l'expression|(?:de )?la locution|(?:de )?la préposition|(?:de )?la conjonction de (?:coordination|subordination)) ?(?:des|du|de la|l'|le|la|un|une|les)? ?(.*))$/i, ({match: [_, ...groups], recognition}) => {

    action(/^(?:(?:quelle est la (?:définition|signification)|c'est quoi|(?:ouvre|lance|cherche)?(?: dans wikipédia| sur wikipédia)? ?(?:défini[str]?(?: moi)?\b|(?:la )?définition|(?:la )?signification)|que (?:veut dire|veulent dire|signifi(?:e|ent)|désign(?:e|ent))|(?:(?:que (?:faut-il|dois-je|devrais-je)? ?(?:savoir|apprendre|découvrir))|qu'est-ce qu(?:'il faut que je sache|e je dois (?:savoir|apprendre|connaître|découvrir))) (?:sur|a propos|au sujet)|qu'est-ce (?:que c'est )?(?:qu[e'])?) ?(?:(?:du |le |l')(?:mot|verbe))? ?(?:(?:du|de la|des?|l'|les?|la|une?)\b)? ?(.*))$/i, ({match: [_, ...groups], recognition}) => {

      console.log(groups);
      const first = groups.filter(g => g != null)[0].trim();
      wikipediaSearch(first, recognition.lang);
      // wiktionarySearch(first, recognition.lang);
      // recognition.speak(`Voici la définition de "${first}".`);
      recognition.speak('OK.');
    }),
    action(/^(?:(?:re)?cherche ?(?:(?:du |le |l')(?:mot|verbe))? ?(?:des|du|de la|l'|les?|la|une?)? ?(.*))$/i, ({match: [_, ...groups], recognition}) => {
      const first = groups.filter(g => g != null)[0].trim();
      googleSearch(first, recognition.lang);
      recognition.speak('OK.');
      // recognition.speak(`Voici la définition de "${first}".`);
    }),
    action(/.*/, ({match: [text], isFinal, recognition}) => {
      if (text == localStorage.givenName) {
        recognition.speak('Oui?');
        return;
      }
      if (!isFinal) return false;
      console.log('TEXT: ' + text)
      
      switch (recognition.lang.split(/[_-]/)[0]) {
        case 'en':
          text = text
            .replace(/motherfuker/gi, 'motherfucker')
            .replace(/f\*\*\*\*\*/gi, 'fucker')
            .replace(/b\*\*\*\*/gi, 'bitch');
          break;
        case 'fr':
          text = text
              .replace(/p\*\*\*/gi, 'pute');
          break;
      }

      recognition.speak(text
          .toLowerCase()
          .replace(/\btu me\b/g, "JE te")
          .replace(/\btu te\b/g, "JE me")
          .replace(/\btu es\b/g, "JE suis")
          .replace(/\btu seras\b/g, "JE serai")
          .replace(/\btu n'es\b/g, "JE ne suis")
          .replace(/\btu ne seras\b/g, "JE ne serai")
          .replace(/\bje suis\b/g, "TU es")
          .replace(/\bje serai\b/g, "TU seras")
          .replace(/\bje ne suis\b/g, "TU n'es"
          .replace(/\bje ne serai\b/g, "TU ne seras"))
          .replace(/\bje t'\b/g, "TU m'")
          .replace(/\bj'ai\b/g, "TU as")
          .replace(/\bje n'ai\b/g, "TU n'as")
          .replace(/\bj'aurai\b/g, "TU auras")
          .replace(/\bje n'aurai\b/g, "TU n'auras")
          .replace(/\bje l'aurai\b/g, "TU l'auras")
          .replace(/\bje ne l'aurai\b/g, "TU ne l'auras")
          .replace(/\bje vais\b/g, "TU vas")
          .replace(/\btu vas\b/g, "JE vais")
          .replace(/\btu as\b/g, "J'ai")
          .replace(/\btu auras\b/g, "J'aurai")
          .replace(/\btu n'as\b/g, "Je n'ai")
          .replace(/\btu n'auras\b/g, "Je n'aurai")
          .replace(/\btu\b/g, "JE")
          .replace(/\bje\b/g, "TU")
          .toLowerCase() + '?');
    })
  ]
};

// const articles = [/(?:de )?(?:le|la|les|du|des) |d'/]

function wikipediaSearch(query: string, lang: string) {
  lang = lang.split(/[_-]/)[0];
  setIframeContent(`https://${lang}.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`);
}

function wiktionarySearch(query: string, lang: string) {
  lang = lang.split(/[_-]/)[0];
  setIframeContent(`https://${lang}.wiktionary.org/wiki/Special:Search?search=${encodeURIComponent(query)}`);
}

function googleSearch(query: string, lang: string) {
  lang = lang.split(/[_-]/)[0];
  setIframeContent(`https://www.google.co.uk/search?q=${encodeURIComponent(query)}`);
}

function setIframeContent(src: string) {
  const element = <HTMLIFrameElement>document.getElementById('content');
  if (element == null) throw 'No content element';
  element.src = src;
}

// document.onload = () => init(config);
init(config);