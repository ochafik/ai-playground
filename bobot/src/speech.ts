export type Config = {
  grammars: {[key: string]: number};
  lang: string;
  onRecognition(_: {text: string|null, isFinal: boolean, recognition: Recognition}): void;
  onSpeak(_: {text: string, lang: string, recognition: any}): void;
  actions: [RegExp, Action][];
}

export type Action = (_: {match: RegExpMatchArray, isFinal: boolean, recognition: Recognition}) => (boolean|void);


export interface Recognition {
  start(): void;
  stop(): void;
  pause(): void;
  resume(): void;
  speak(text: string, lang?: string): void;

  grammars: any; //SpeechGrammarList
  maxAlternatives: number;
  interimResults: boolean;
  lang: string;
  onstart(): void;
  onerror(event: any): void;
  onend(): void;
  onnomatch(event: any): void;
  onresult(event: any): void;
  onsoundstart(): void;
}

export function init(config: Config) {
  var SpeechRecognition = (<any>window).SpeechRecognition ||
                          (<any>window).webkitSpeechRecognition ||
                          (<any>window).mozSpeechRecognition ||
                          (<any>window).msSpeechRecognition ||
                          (<any>window).oSpeechRecognition;
  var SpeechGrammarList = (<any>window).SpeechGrammarList ||
                          (<any>window).webkitSpeechGrammarList ||
                          (<any>window).mozSpeechGrammarList ||
                          (<any>window).msSpeechGrammarList ||
                          (<any>window).oSpeechGrammarList;

  var recognition = Object.assign(new SpeechRecognition(), <Recognition>{
    lang: config.lang || 'en-US',
    maxAlternatives: 5,
    interimResults: true,
    // Note: some other codebases have `continuous: window.location.protocol === 'http:'`
    grammars: (() => {
      const list = new SpeechGrammarList();
      for (const grammar of Object.keys(config.grammars)) {
        const weight = config.grammars[grammar];
        list.addFromString(grammar, weight);
      }
      return list;
    })(),

    onstart() {
      console.log('started');
    },
    onerror(event: any) {
      console.log('error: ' + event.error);
      // this.stop();
      // this.start();
    },
    onend() {
      console.log('ended');
      if (!paused) {
        recognition.start();
      }
    },
    speak(text: string, lang?: string) {
      this.pause();
      config.onSpeak({text, lang: lang || this.lang, recognition});

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(Object.assign(new SpeechSynthesisUtterance(), <Partial<SpeechSynthesisUtterance>> {
        ended: false,

        lang: lang || recognition.lang,
        pitch: 2,
        rate: 1.2,
        text,
        volume: 1,
        onstart(e) {
          console.log('Speaking: ' + text);
          setTimeout(() => {
            this.onend(new Event('ended'));
          }, 3000);
        },
        onerror(e) {
          this.onend(e);
        },
        onend(e) {
          if ((<any>this).ended) return;
          (<any>this).ended = true;
          if (event) {
            console.log('Finished in ' + (<any>event).elapsedTime + ' seconds.');
          }
          recognition.resume();
        }
      }));
    },
    pause() {
      paused = true;
      this.stop();
    },
    resume() {
      paused = false;
      this.start();
    },
    onnomatch(event) {
      console.log('No match: ' + JSON.stringify(event));
      config.onRecognition({text: null, isFinal: true, recognition: this});
    },
    onresult(event) {
      let SpeechRecognitionResult = event.results[event.resultIndex];
      let results = [];
      let isFinal = false;
      for (let k = 0; k<SpeechRecognitionResult.length; k++) {
        const result = SpeechRecognitionResult[k].transcript.trim();;
        const confidence = SpeechRecognitionResult[k].confidence;
        console.log(`RESULT: ${result} (${confidence})`);
        if (SpeechRecognitionResult.isFinal){
          isFinal = true;
          results[k] = result;
        } else if (k == 0) {
          results[k] = result;
        }
      }

      console.log('Results(final = ' + isFinal + '): ' + JSON.stringify(results));

      if (isFinal) {
        const normalizedResults = results.map(r => r.trim().toLowerCase());

        for (const result of results) {
          console.log('Trying to match: ' + result)
          for (const [regex, action] of config.actions) {
            const match = regex.exec(result);
            if (match != null) {
              console.log('Matched: ' + regex)
              config.onRecognition({text: result, isFinal, recognition: this});

              if (action({match, isFinal, recognition}) !== false) {
                return;
              }
            } else {
              console.log('Did not match: ' + regex)
            }
          }
        }
        config.onRecognition({text: null, isFinal, recognition: this});
      } else {
        config.onRecognition({text: results[0], isFinal, recognition: this});
      }
    },
    onsoundstart() {
      console.log('Some sound is being received');
    }
  });

  var paused = false;
  recognition.start();

  // console.log(window.speechSynthesis.getVoices());
}