class Sound {

  constructor(context) {
    this.context = context;
  }

  init() {
    this.oscillator = this.context.createOscillator();
    this.gainNode = this.context.createGain();

    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = 'sine';
  }

  play(value, time) {
    this.init();

    this.oscillator.frequency.value = value;
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
            
    this.oscillator.start(time);
    //this.stop(time);

  }

  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
    this.oscillator.stop(time + 1);
  }

  playNote(character) {
    var notes=[261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 370, 392, 415.30, 440, 466.16, 493.88, 246.94];
    var lowNotes=[130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185, 196, 207.65, 220, 233.08, 246.94];
    var highNotes=[523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880, 932.33, 987.77];
    var iScissors=0;
    var iPaper=0;
    var iRock=0;
    var C=0;
    var CSharp=1;
    var D=2;
    var DSharp=3;
    var E=4;
    var F=5;
    var FSharp=6;
    var G=7;
    var GSharp=8;
    var A=9;
    var BFlat=10;
    var B=11;
    var B3=12;
    var indexesScissors=[C, D, DSharp, G, C, D, DSharp, G, D, E, F, A, D, E, F, A, E, FSharp, G, B, BFlat, FSharp, F, E, C];
    var lengthsScissors=[500, 500, 500, 700, 400, 400, 400, 550, 300, 300, 300, 400, 200, 200, 200, 300, 150, 150, 150, 300, 500, 200, 200, 200, 500];
    var indexesPaper=[C, E, D, F, E, G, A, B, A, B, G, A, F, G, E, F, D, E, C, D, B3, C];
    var lengthsPaper=[200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200];
    var indexesRock=[C, D, DSharp, C, D, DSharp, E, F, FSharp, E, F, FSharp, G, A, BFlat, G, A, BFlat, BFlat, A, G, F, E, D, C];
    var lengthsRock=[400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400];
    let now=this.context.currentTime;
    if(character=0) {         //scissors
      this.play(highNotes[indexesScissors[iScissors]], now);
      setTimeout(function(){  
        this.stop(now); 
        if(iScissors+1<indexScissors.length){
          this.playNote(0);
        }
      }, lengthsScissors[iScissors]);
    }
    if(character=1) {         //paper
      this.play(notes[indexesPaper[iPaper]], now);
      setTimeout(function(){ 
        this.stop(now); 
        if(iPaper+1<indexesPaper.length){
          this.playNote(1);
        }
      }, lengthsPaper[iPaper]);
    }
    if(character=2) {         //rock
      this.play(lowNotes[indexesRock[iRock]], now);
      setTimeout(function(){ 
        this.stop(now); 
        if(iRock+1<indexesRock.length){
          this.playNote(2);
        }
      }, lengthsRock[iRock]);
    }
  }
}