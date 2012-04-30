// var stats = new Stats();

// // Align top-left
// stats.getDomElement().style.position = 'absolute';
// stats.getDomElement().style.left = '0px';
// stats.getDomElement().style.top = '0px';

// document.body.appendChild( stats.getDomElement() );

// setInterval( function () {

//     stats.update();

// }, 1000 / 60 );

var leaders = [];

//hide jquery fading items
$("#points").hide();
$("#levelUp").hide();
$("#showStrikes").hide();

//Important variables

//CANVASES
var canvasTest = document.getElementById('canvasTest');
var ctxTest = canvasTest.getContext('2d');

var canvasBG = document.getElementById('canvasBG');
var ctxBG = canvasBG.getContext('2d');

var canvasBird = document.getElementById('canvasBird');
var ctxBird = canvasBird.getContext('2d');

var canvasLetters = document.getElementById('canvasLetters');
var ctxLetters = canvasLetters.getContext('2d');

ctxLetters.fillStyle = "hsla(0, 0%, 0%, 1)";
ctxLetters.font = "bold 20px Arial";

var canvasWordBoard = document.getElementById('canvasWordBoard');
var ctxWordBoard = canvasWordBoard.getContext('2d');

var canvasWords = document.getElementById('canvasWords');
var ctxWords = canvasWords.getContext('2d');
initWordStyle();

var canvasControls = document.getElementById('canvasControls');
var ctxControls = canvasControls.getContext('2d');
ctxControls.fillStyle = "hsla(0, 0%, 0%, 1)";
ctxControls.font = "bold 30px Arial";


var canvasCurrentWord = document.getElementById('canvasCurrentWord');
var ctxCurrentWord = canvasCurrentWord.getContext('2d');
ctxCurrentWord.fillStyle = "hsla(0, 0%, 0%, 1)";
ctxCurrentWord.font = "bold 25px Arial";

var canvasMenu = document.getElementById('canvasMenu');
var ctxMenu = canvasMenu.getContext('2d');
ctxMenu.fillStyle = "hsla(0, 0%, 0%, 1)";
ctxMenu.font = "bold 25px Cooper Black";




//END CANVASES


var gameWidth = canvasBG.width;
var gameHeight = canvasBG.height;


var isPlaying = false;
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.msRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            function(callback){
                              window.setTimeout(callback, 1000/60);
                            };


var imgSprite = new Image();
imgSprite.src = 'images/sprite.png';
imgSprite.addEventListener('load', init, false);



//SOUNDS
var soundPlaying = true;

var strikeSound = new Audio("sounds/buzz.wav"); // buffers automatically when created
var tweetSound = new Audio("sounds/coinCollect.wav"); // buffers automatically when created
var levelUpSound = new Audio("sounds/bllrring.wav"); // buffers automatically when created
var song = new Audio('sounds/background.wav'); 
song.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);




var burdie;
var game;
var bg;



//ctxMenu.fillRect(585,215,260,90);
var btnPlay = new Button(215, 845, 305, 585); //button on home screen to play

var btnHelp = new Button(335, 845, 425, 585); //button on home screen to play

var symbols = [];




//an array for the letter objects 
var letters = [];

var short_words = [];
var medium_words = [];
var long_words = [];
var super_long_words = [];



//End of important variables


var lettersToPoints = {};
lettersToPoints['A'] = 10;
lettersToPoints['B'] = 30;
lettersToPoints['C'] = 40;
lettersToPoints['D'] = 20;
lettersToPoints['E'] = 10;
lettersToPoints['F'] = 40;
lettersToPoints['G'] = 30;
lettersToPoints['H'] = 30;
lettersToPoints['I'] = 10;
lettersToPoints['J'] = 100;
lettersToPoints['K'] = 50;
lettersToPoints['L'] = 10;
lettersToPoints['M'] = 30;
lettersToPoints['N'] = 10;
lettersToPoints['O'] = 10;
lettersToPoints['P'] = 40;
lettersToPoints['Q'] = 100;
lettersToPoints['R'] = 10;
lettersToPoints['S'] = 10;
lettersToPoints['T'] = 10;
lettersToPoints['U'] = 20;
lettersToPoints['V'] = 50;
lettersToPoints['W'] = 40;
lettersToPoints['X'] = 100;
lettersToPoints['Y'] = 40;
lettersToPoints['Z'] = 100;




// MAIN FUNCTIONS

function init(){
  
  
  //playGame();
  
  drawMenu();
  document.addEventListener('click',mouseClicked,false);
}


function playGame(){
  
  short_words = [ 'APE', 'ARM', 'ARK', 'ANY', 'BOY', 'BOX', 'BAT', 'BIT', 'BUG', 'BUY', 'COW', 'CAP', 
  'CAB', 'COY', 'CAT', 'CAR', 'CAN', 'CUP', 'DOG', 'DUG', 'DIP', 'DIG', 'DOT', 'DOW', 'EAR', 'EAT', 
  'EVE', 'EMU', 'EYE', 'FIT', 'FOG', 'FUN', 'FIX', 'FIB', 'GOT', 'GET', 'GUT', 'GOB', 'GAB', 'GYM', 
  'HAD', 'HID', 'HOG', 'HEY', 'HOP', 'HIM', 'HEM', 'HUT', 'INN', 'INK', 'ION', 'ICE', 'IVY', 'JOB', 
  'JAG', 'JAB', 'JAM', 'JAW', 'JET', 'JOT', 'JOG', 'JOY', 'KIT', 'KIN', 'KID', 'KOI', 'LIP', 'LIT'];

  medium_words = ['LEG', 'LOG', 'LED', 'MOM', 'MIX', 'MEN', 'MIT', 'MET', 'MUD', 'MAY', 'NIP', 'NOW', 'NET', 'NEW', 
  'NUT', 'OAR', 'ORE', 'OAK', 'ODE', 'ODD', 'OIL', 'OUR', 'OWL', 'PET', 'PIT', 'PIN', 'PEN', 'PAY', 
  'PUT', 'POM', 'PEW', 'ROW', 'RED', 'RYE', 'RIG', 'RIM', 'SKI', 'SKY', 'SIT', 'SET', 'SIP', 'TIP', 
  'TOP', 'TUM', 'TEN', 'TRY', 'TOY', 'URN', 'USE', 'VUE', 'VET', 'VAN', 'VOW', 'WOW', 'WIN', 'WON', 
  'WHY', 'WET', 'WAS', 'YUM', 'YAK', 'YAM', 'YAY', 'YET', 'YES', 'ACRE', 'AXLE', 'AQUA', 'ATOM', 'AXES', 
  'BUZZ', 'BUFF', 'BASS', 'BLUE', 'BLOB', 'CORN', 'CASH', 'CHIP', 'CLUE', 'COIN', 'CHAT', 'CHAP', 'COIL', 
  'CROW', 'DEAL', 'DIME', 'DOME', 'DING', 'DEER', 'DEAR', 'DORM', 'EVER', 'EMIT', 'EURO', 'EGGS', 'FEEL', 'FLIP', 
  'FISH', 'FLEW', 'FIRM', 'FOOD', 'GOWN', 'GAIN', 'GRIN', 'GROW', 'GOOF', 'HOME', 'HONK', 'HOLY', 'HERO', 'HORN', 
  'INTO', 'ISLE', 'IRIS', 'JOKE', 'JUMP', 'JIVE', 'JUST', 'JOYS', 'KING', 'KELP', 'KEPT', 'KIWI', 'KNOB', 'LIME', 
  'LOVE', 'LUNG', 'LEAD', 'LUSH', 'MALE', 'MINE', 'MINT', 'MILE', 'MINK', 'MOVE', 'MOOD', 'NEON', 'NICE', 'NINE'];

  long_words = ['NAME', 'OPEN', 'OVEN', 'OVAL', 'OKAY', 'PATH', 'PARK', 'PINK', 'POKE', 'QUIZ', 'RIDE', 'RING', 'RICH', 'RIFF', 
  'SNOW', 'SURF', 'SHOW', 'SNIP', 'SINK', 'SALE', 'TENT', 'TURN', 'TUSK', 'TRUE', 'TUFF', 'TYPE', 'UNIT', 'UPON', 
  'VENT', 'VARY', 'VIBE', 'VINE', 'WIDE', 'WENT', 'WING', 'WEST', 'WELL', 'YOGA', 'ZOOM', 'ZING', 'ZOOS', 'ZONE', 
  'AMPLE', 'AMBER', 'ACUTE', 'ADAPT', 'ALOHA', 'ADORE', 'BUYER', 'BROWN', 'BESTS', 'BRAIN', 'BRIDE', 'BUNNY', 'CHAIR', 
  'CROWN', 'CHEAP', 'CLIFF', 'CHIRP', 'CUBED', 'DINGO', 'DISCO', 'DUETS', 'DUCKS', 'DRUMS', 'EQUAL', 'EMBER', 'ELITE', 
  'EAGER', 'EBONY', 'ENTER', 'ENJOY', 'FUNNY', 'FUZZY', 'FLIRT', 'FEAST', 'FRUIT', 'FLUFF', 'GREEN', 'GIVEN', 'GROVE', 
  'GUMMY', 'GOLFS', 'GRASS', 'HELLO', 'HONEY', 'HUNCH', 'HAPPY', 'HOBBY', 'HONOR', 'HOPES', 'HUMOR', 'IVORY', 'IGLOO', 
  'INNER', 'ICING', 'INPUT', 'JOLLY', 'JUMBO', 'JELLO', 'JEWEL', 'KOALA', 'KAYAK', 'LLAMA', 'LIVER', 'LIMBO', 'LAMPS', 
  'LIMOS', 'LOCAL', 'MARRY', 'MONEY', 'MEDIA', 'MELTY', 'MATCH', 'NIGHT', 'NAKED', 'NOBLE', 'NINJA', 'NIFTY', 'NICER'];

  super_long_words = ['NOVEL', 'OUGHT', 'OFFER', 'OCEAN', 'OTTER', 'ORCAS', 'PENNY', 'PROUD', 'PANTS', 'POLAR', 'PROMO', 'QUEEN', 'QUICK', 
  'QUIET', 'QUAIL', 'RELAY', 'RHINO', 'ROUND', 'RHYME', 'RIVER', 'SIXTY', 'SKUNK', 'STUFF', 'SPEND', 'SHIFT', 'THREE', 
  'TRUTH', 'THUMB', 'TODAY', 'TWEET', 'UNDER', 'USHER', 'UPPER', 'UNZIP', 'VOICE', 'VALUE', 'VERBS', 'VIBES', 'WOVEN', 
  'WEAVE', 'WHITE', 'WOOLY', 'XEROX', 'YOUNG', 'YUMMY', 'ZEBRA', 'APPEAR', 'ANIMAL', 'ARCHER', 'ADORNS', 'AMUSED', 
  'BEAVER', 'BUYING', 'BABOON', 'BATHED', 'BEEPED', 'CASTLE', 'CAMERA', 'CHEESE', 'CHARMS', 'CONVEX', 'DOLLAR', 'DAZZLE', 
  'DIDDLE', 'DREAMY', 'DIVING', 'EQUATE', 'EMPLOY', 'EASILY', 'EMBARK', 'EMBRYO', 'FELINE', 'FLOWER', 'FEMALE', 'FUTURE', 
  'FROTHY', 'GROUND', 'GIGGLE', 'GLEAMY', 'GOALIE', 'HEAVEN', 'HOORAY', 'HOTDOG', 'HOOPED', 'INDIGO', 'ICEMAN', 'ICONIC', 
  'INDEED', 'IGUANA', 'JOCKEY', 'JOLTED', 'JUMPED', 'JIGGLE', 'KITTEN', 'KISSES', 'KNIGHT', 'KINDLY', 'LIQUID', 'LEAGUE', 
  'LAUNCH', 'LOCKER', 'LUSHED', 'MATRIX', 'MARVEL', 'MIRROR', 'MUSCLE', 'MYSTIC', 'NICKEL', 'NACHOS', 'NATIVE', 'NEWTON', 
  'NEPHEW', 'ORANGE', 'OFFICE', 'OFFERS', 'OUTFIT', 'PENCIL', 'PLANET', 'PLEASE', 'PURPLE', 'QUOTES', 'QUACKS', 'RIBBON', 
  'REFILL', 'RENOWN', 'RIPPLE', 'SATURN', 'SHOWER', 'SILVER', 'SALMON', 'SCRIBE', 'SELLER', 'TINKLE', 'TANDEM', 'TEACUP', 
  'TONGUE', 'UMPIRE', 'UNVEIL', 'URGENT', 'UPLIFT', 'VIRTUE', 'VACUUM', 'VIKING', 'VORTEX', 'VIOLET', 'WINDOW', 'WONDER', 
  'WARMED', 'WEALTH', 'WHEATS', 'YELLOW', 'YODLED', 'YIPPEE', 'YOGURT', 'ZEALOT', 'ZOMBIE', 'ZONERS', 'ZODIAC', 'BALLOON', 
  'BELIEVE', 'BARGAIN', 'BIZARRE', 'FOREVER', 'GIRAFFE', 'KITCHEN', 'OCTAGON', 'OCTOPUS', 'PICTURE', 'QUARTER', 'TRUMPET', 
  'TIGHTEN', 'UNICORN', 'VICTORY', 'DAIQUIRI', 'FOOTBALL', 'GOODNESS', 'MOSQUITO', 'PURCHASE'];

  initSymbols();

  burdie = new Bird();
  game = new Game();
  bg = new Background();
  bg1 = new Background1();


  createLetters();
  drawBG();
  drawWordBoard();
  game.drawAllWords();
  drawCurrentWord();
  
  startLoop();
  drawControls();
  document.addEventListener('keydown',checkKeyDown,false);
  document.addEventListener('keyup',checkKeyUp,false);
}


function loop(){
  if(isPlaying){
    burdie.draw();
    bg.draw();
    bg1.draw();
    drawAllLetters();
    requestAnimationFrame(loop);
  }
}

function startLoop(){
  if(soundPlaying){
    song.play();
  }
  isPlaying = true;
  loop();
}

function stopLoop(){
  song.pause();
  isPlaying = false;
}

function drawMenu(){
  stopLoop();
  var srcX = gameWidth;
  var srcY = 766;
  var drawX = 0;
  var drawY = 0;

  ctxMenu.clearRect(0, 0, gameWidth, gameHeight);

  ctxMenu.drawImage(imgSprite,srcX,srcY,gameWidth,720,drawX,drawY,gameWidth,gameHeight);
  $.ajax({
    url: '/scores/',
    dataType: 'json',
    success: function(data) {
      leaders = data;
        var length = leaders.length;
        if(leaders.length >= 7) length = 7;
        for (var i = 0; i < length; i++) {
          ctxMenu.fillStyle = 'black';
          ctxMenu.fillText(leaders[i].name.substr(0,7), 250, 300+i*30);
          
          ctxMenu.fillStyle = 'green';
          ctxMenu.fillText(leaders[i].score, 390, 300+i*30);
        };
    }
  });




}

function drawBG(){
  ctxMenu.clearRect(0, 0, gameWidth, gameHeight);

  var srcX = 0;
  var srcY = 0;
  var drawX = 0;
  var drawY = 0;

  ctxBG.drawImage(imgSprite,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth,gameHeight);
}


function drawWordBoard(){
  var srcX = 0;
  var srcY = 834;


  var drawX = gameWidth - 200+20;
  var drawY = 10;
  ctxWordBoard.drawImage(imgSprite,srcX,srcY,200,187,drawX,drawY,180,120);
}


var btnPause = new Button(gameHeight-70, 80, gameHeight-30, 20);
var btnSound = new Button(gameHeight-70, 160, gameHeight-30, 100);

function drawControls(){
  ctxControls.clearRect(0, 0, gameWidth, gameHeight);
  var drawY = 65;

  //stripeyBG
  ctxControls.drawImage(imgSprite,0,1205,gameWidth,43,0,gameHeight-55,gameWidth+20,55);

  //strikes
  ctxControls.drawImage(imgSprite,0,1260,288,42,200,gameHeight-drawY,288,42);
  
  //play pause
  if(isPlaying){
    ctxControls.drawImage(imgSprite,60,1303,60,42,20,gameHeight-drawY,60,42);
  } else {
    ctxControls.drawImage(imgSprite,0,1303,60,42,20,gameHeight-drawY,60,42);
  }

  if(soundPlaying){
    ctxControls.drawImage(imgSprite,0,1346,60,42,100,gameHeight-drawY,60,42);
    
  } else {
    ctxControls.drawImage(imgSprite,60,1346,60,42,100,gameHeight-drawY,60,42);
  }
  
}


function drawStrikes(){
  //console.log('burdie strikes '+burdie.strikes);
  ctxControls.clearRect(0, 0, gameWidth, gameHeight);
  drawControls();
  for (var i = 0; i < burdie.strikes; i++) {
    ctxControls.drawImage(imgSprite,120,1303,24,27,(355+i*41),gameHeight-55,24,27);
  };
  
}

function drawCurrentWord(){

  clearCtxCurrentWord();
  
  ctxCurrentWord.drawImage(imgSprite, 0, 1060, 140, 40, 20, 10, 140, 40);
  ctxCurrentWord.drawImage(imgSprite, 0, 1020, 140, 40, 20, 50, 140, 40);

  ctxCurrentWord.fillText(game.level, 150, 40);
  ctxCurrentWord.fillText(burdie.score, 150, 80);
  
  drawStrikes();
}

function initSymbols(){
  for (var i = 0; i < short_words.length; i++) {
    for(var j = 0; j < short_words[i].length; j++){
      symbols.push(short_words[i][j]);
    }
  };
}


function clearCtxBG(){
  ctxBG.clearRect(0, 0, gameWidth, gameHeight);
}

function clearCtxTest(){
  ctxTest.clearRect(0, 0, gameWidth, gameHeight);
}

function clearCtxCurrentWord(){
  ctxCurrentWord.clearRect(0, 0, gameWidth, gameHeight);
}


// END OF MAIN FUNCTIONS



//Background functions

function Background(){
  this.srcX = 0;
  this.srcY = 0;
  this.drawX = 0;
  this.drawY = 0;
  this.width = 1024;
  this.height = 650;
  this.speed = 2;

}

Background.prototype.draw = function() {
  clearCtxBG();
  this.drawX -= this.speed;

  //drawFirstBG
  ctxBG.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,gameWidth,gameHeight);

  //console.log('backgroundX: '+this.drawX+' gameWidth: '+gameWidth);
  if(this.drawX <= gameWidth*-1){
    this.drawX = gameWidth;
  }
};

function Background1(){
  this.srcX = 0;
  this.srcY = 0;
  this.drawX = gameWidth;
  this.drawY = 0;
  this.width = 1024;
  this.height = 650;
  this.speed = 2;
}

Background1.prototype.draw = function() {
  //clearCtxBG();
  this.drawX -= this.speed;

  //drawSecondBG
  ctxBG.drawImage(imgSprite,this.srcX+gameWidth,this.srcY,this.width,this.height,this.drawX,this.drawY,gameWidth,gameHeight);

  //console.log('backgroundX: '+this.drawX+' gameWidth: '+gameWidth);
  if(this.drawX <= gameWidth*-1){
    this.drawX = gameWidth;
  }
};

//end background functions



//LEADERS


function Leader(name, score){
  this.name = name;
  this.score = score;
}



//END LEADERS









// Game


function Game(){
  this.level = 1;
  this.wordsPerLevel = 3;
  this.current_words = this.getWords();
  this.letter_speed = 2.5;
  this.bomb_speed = 3.5;

  //BUILD FREQUENCIES LOW TO HIGH, RANGE IS FROM FREQ ABOVE TO FREQ BELOW EX) .5 to 1 for letterHelp and Random Letter
  this.heartFrequency = 0.005;
  this.bombFrequency = 0.1;
  this.eggFrequency = 0.2;
  this.letterHelpFrequency = 0.5;
  this.randomLetterFrequency = 1;
  //end freq

  this.lastLetterX = gameWidth;
  this.totalLetters = 10; //The number of Letter objects to be recycled
}

Game.prototype.getWords = function() {
  var w = [];
  var index;
  var i = 0;
  while (i < this.wordsPerLevel){
    if(this.level <= 3){
      index = Math.floor(Math.random()*short_words.length);
      w.push(new Word(short_words[index]));
      short_words.splice(index, 1);
    } else if(this.level > 3 && this.level < 10){
      index = Math.floor(Math.random()*medium_words.length);
      w.push(new Word(medium_words[index]));
      medium_words.splice(index, 1);
    } else if(this.level >= 10 && this.level < 20){
      index = Math.floor(Math.random()*long_words.length);
      w.push(new Word(long_words[index]));
      long_words.splice(index, 1);
    } else {
      index = Math.floor(Math.random()*super_long_words.length);
      w.push(new Word(super_long_words[index]));
      super_long_words.splice(index, 1);
    }
    
    i++;
  };
  return w;
};


Game.prototype.drawAllWords = function(){
  clearCtxWords();
  for(var i = 0; i < this.current_words.length; i++){
    this.current_words[i].draw(i, this.current_words[i].completed);
  }
}

Game.prototype.calcCurrentWordIndex = function() {
    for(var i = 0; i < this.current_words.length; i++){
      if(this.current_words[i].completed){
        continue;
      } else {
        return i;
      }
    }
    return -1;
};

Game.prototype.getNeededLetter = function() {
  var i = this.calcCurrentWordIndex();
  var cWord = burdie.currentWord.join("");
  return this.current_words[i].word.substr(cWord.length, 1);
};

Game.prototype.checkCompletedWords = function(){
  
  var i = this.calcCurrentWordIndex();

  if(i >= 0 ){
    var cWord = burdie.currentWord.join("");
    var subWord = this.current_words[i].word.substr(0, cWord.length);
    var lastLetter = cWord.substr(cWord.length-1,1);

    //DEBUG
    //console.log("Current Word: "+cWord+" Compared To: "+this.current_words[i].word);
    
    if(cWord == this.current_words[i].word){ //word completed!!
      if(soundPlaying) tweetSound.play();

      burdie.updateScore(lettersToPoints[lastLetter]);
      //console.log("Got word! "+ cWord);
      this.current_words[i].completed = true;
      burdie.currentWord = [];
      
      burdie.updateScore(100);
      burdie.wordsSolved++;
    
    } else if(subWord == cWord && cWord.length > 0){ //have a valid subword

      //console.log("workin on a gooooood word: "+cWord);
      burdie.updateScore(lettersToPoints[lastLetter]);

      if(soundPlaying)  tweetSound.play();
    
    } else { //wrong letter

      burdie.incrementStrikes();

    }
    this.drawAllWords();
  } 
  //if the last word is completed level up
  if(game.current_words[game.current_words.length-1].completed) { 
    this.levelUp();
  }
}

Game.prototype.levelUp = function() {
  if(super_long_words.length < this.wordsPerLevel){
    $("#endGameDialog").dialog();
  } else {
    this.level++;
    burdie.updateScore(1000);
    this.increaseSpeed();
    this.current_words = this.getWords();
    this.drawAllWords();
    
    if(soundPlaying) levelUpSound.play();

    //NOTE: JQUERY IS SLOWING DOWN THE GAME WHEN THESE POP UP
    // $("#levelUp").html("LEVEL UP!<br/>"+game.level);
  
    // $("#levelUp").show();

    // $("#levelUp").fadeOut(1000);
  }
  
};

Game.prototype.updateBombFrequency = function() {
  //this.bombFrequency += .1;
};

Game.prototype.increaseSpeed = function() {
  this.letter_speed += Math.exp((-1*(this.level-2))/2);
  this.bomb_speed += .5;
};

// END Game













//WORD OBJECT

function Word(w){
  this.word = w;
  this.drawX = gameWidth - 160;
  this.drawY = 30;
  this.fromTop = 45;
  this.completed = false;
}

Word.prototype.draw = function(i, completed) {
  //var current_i = game.calcCurrentWordIndex();
  var cWord = burdie.currentWord.join("");
  var subWord = game.current_words[i].word.substr(0, cWord.length);
  var endWord = game.current_words[i].word.substr(cWord.length, game.current_words[i].word.length);
  var letterWidth = 15;

  if(this.completed){ //word has been completed

    ctxWords.fillStyle = "hsla(107,87%,32%, 0.35)";
    ctxWords.fillText(this.word, this.drawX, this.drawY*i+this.fromTop); //text, drawX, drawY

  } else if(!this.completed && cWord == subWord && game.calcCurrentWordIndex() == i) { //part of the word is correct
    
    ctxWords.fillStyle = "hsla(107,87%,32%, 1)";
    for (var j = 0; j < cWord.length; j++) {
      ctxWords.fillText(cWord[j], this.drawX + letterWidth * j, this.drawY*i+this.fromTop);
    };
    
    
    ctxWords.fillStyle = "#000";
    for (var j = 0; j < endWord.length; j++) {
      ctxWords.fillText(endWord[j], this.drawX + letterWidth * j + letterWidth * cWord.length, this.drawY*i+this.fromTop);
    };

  } else { //yet to get to word

    ctxWords.fillStyle = "#000";
    ctxWords.fillText(this.word, this.drawX, this.drawY*i+this.fromTop); //text, drawX, drawY
  }
};

function initWordStyle(){
  ctxWords.fillStyle = "hsla(0, 0%, 0%, 0.9)";
  ctxWords.font = "bold 25px Courier";
}

function clearCtxWords(){
  ctxWords.clearRect(0, 0, gameWidth, gameHeight);
}

//END OF WORD OBJECT













//BIRD OBJECT

function Bird(){
  this.srcX = 0;
  this.srcY = 766;
  this.width = 88;
  this.height = 68;
  this.speed = 6;
  this.drawX = 130;
  this.drawY = 110;
  this.isUpKey = false;
  this.isRightKey = false;
  this.isDownKey = false;
  this.isLeftKey = false;
  this.isSpaceBar = false;
  this.score = 0;

  this.drawState = 0;
  this.i = 0;

  this.currentWord = [];
  this.strikes = 0;
  this.score = 0;
  this.eggs = 0;
  this.hearts = 0;
  this.wordsSolved = 0;
}

Bird.prototype.updateDrawState = function() {
  if(this.i >= 20){
    this.i = 0;
  } else {
    this.i++;
    if(this.i % 4 == 0){
      this.drawState++;
    }
    
  } 
  this.srcX = this.width*(this.drawState%4);

};

Bird.prototype.draw = function(){
  clearCtxBird();

  this.updateDrawState();

  this.checkDirection();

  this.checkHitLetter();

 
  ctxBird.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Bird.prototype.checkDirection = function(){
  if(this.isUpKey && this.drawY >= 2){
    this.drawY -= this.speed;
  }
  if(this.isRightKey && this.drawX+this.width < gameWidth){
    this.drawX += this.speed;
  }
  if(this.isDownKey && this.drawY+this.height < gameHeight){
    this.drawY += this.speed;
  }
  if(this.isLeftKey && this.drawX > 0){
    this.drawX -= this.speed;
  }

  if(this.isSpaceBar){
    this.speed = 15;
  } else {
    this.speed = 6;
  }
};


Bird.prototype.checkHitLetter = function() {
  clearCtxTest();

  //DEBUG RECTANGLES
  //ctxTest.strokeRect(burdie.drawX,burdie.drawY,burdie.width,burdie.height);

  for(var i = 0; i < letters.length; i++){

    //DEBUG RECTANGLES
    //ctxTest.strokeRect(letters[i].drawX,letters[i].drawY,letters[i].width,letters[i].height);
    
    if(
        this.drawX + this.width >= letters[i].drawX && // right side of bird >= left side of letter
        this.drawY + this.height >= letters[i].drawY && // bottom of bird is lower than top of letter
        this.drawX <= letters[i].drawX + letters[i].width && // left of bird is less than right of letter
        this.drawY <= letters[i].drawY  + letters[i].height// top of bird above bottom of letter
      ){

      if(letters[i].symbol == 'BOMB'){
        this.incrementStrikes();
      } else if(letters[i].symbol == 'EGG') {
        if(soundPlaying) tweetSound.play();
        this.updateScore(100);
        this.eggs++;
        console.log('Egg!');
      } else if(letters[i].symbol == 'HEART') {
        if(soundPlaying) tweetSound.play();
        if(this.strikes <= 0){
          this.updateScore(100);
        } else {
          this.strikes--;
          drawStrikes();
          //console.log('decrease strikes');
        }
        this.hearts++;
        console.log('heart!');
      } else if(letters[i].symbol == ' ') {
        this.currentWord.push(game.getNeededLetter());
        game.checkCompletedWords();
      } else {
        this.currentWord.push(letters[i].symbol);
        game.checkCompletedWords();
        //console.log('currentWord:'+this.currentWord);
      }

      
      letters[i].recycle();
      drawCurrentWord();
      game.drawAllWords();
    }
  }
  
};


Bird.prototype.incrementStrikes = function() {
  
  if(soundPlaying) strikeSound.play();
  this.strikes++;
  this.currentWord = [];
  this.updateScore(-100);
  if(this.strikes >= 3){
    $("#points").hide();
    $("#showStrikes").hide();

    drawMenu();
    //var name = prompt("Three strikes and your out! Save your high score:", "My Name");
    $("#score_name").select();
    $("#endGameDialog").dialog();
    
  } else {
    // $("#showStrikes").html(this.getXStrikes());
    // $("#showStrikes").show();
    // $("#showStrikes").fadeOut(1000);
    drawStrikes();
  }
}

Bird.prototype.getXStrikes = function() {
  var s = '';
  for (var i = 0; i < this.strikes; i++) {
    s += 'X';
  };
  return s;
};

Bird.prototype.updateScore = function(points) {
  //console.log('update score!');
  
  //NOTE: JQUERY IS SLOWING THE GAME DOWN.. I THINK
  // if(points < 0){
  //   $("#points").css({color: "red"});
  //   $("#points").html(points+" POINTS");
  // } else {
  //   $("#points").css({color: "green"});
  //   $("#points").html("+"+points+" POINTS");
  // }
  
  // if(burdie.strikes < 3){ //prevent points from showing on the menu screen
  //   $("#points").show();
  // }
  

  // $("#points").fadeOut(1000);

  this.score += points;

  $("#endGamePoints").html(this.score); //update the points in the end game dialog

};

function clearCtxBird(){
  ctxBird.clearRect(0, 0, gameWidth, gameHeight);
}

//END OF BIRD OBJECT
























//LETTER OBJECT


function Letter(symb, x, y, i){
  this.symbol = symb;
  this.drawX = x;
  this.drawY = y;
  this.speed = game.letter_speed;
  this.width = 38;
  this.height = 38;
  this.srcX = 528;
  this.srcY = 766;
  this.i = i;
}

Letter.prototype.draw = function() {
  this.drawX -= this.speed;

  if(this.symbol == 'HEART'){
    ctxLetters.drawImage(imgSprite, this.srcX+this.width*3, this.srcY, this.width, this.height+20, this.drawX, this.drawY, this.width, this.height+20);
  } else if(this.symbol == 'BOMB'){
    ctxLetters.drawImage(imgSprite, this.srcX+this.width, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
  } else if(this.symbol == 'EGG') {
    ctxLetters.drawImage(imgSprite, this.srcX+this.width*2, this.srcY, this.width, this.height+20, this.drawX, this.drawY, this.width, this.height+20);
  } else {
    ctxLetters.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
    ctxLetters.fillText(this.symbol, this.drawX+11.5, this.drawY+25); //text, drawX, drawY
  }


  this.checkEscaped();
};


//create the letter objects and put them into the letters
function createLetters(){
  letters = [];
  for(var i = 0; i < game.totalLetters; i++){
    //choose random letter
    var s = chooseRandomSymbol();
    //assign x into consecutive 26 slots 
    var x = calcRandomX();
    //randomly choose y
    var y = calcRandomY();
    //add letters to letters

    letters.push(new Letter(s, x, y, i));
  }
}

function drawAllLetters(){
  clearCtxLetters();
  for(var i = 0; i < letters.length; i++){
    letters[i].draw();
  }
}

//This will help evenly distribute the letters based on their index
function calcRandomX(i){
  var x = game.lastLetterX + 150;
  if(i == 0) { // reset to original because we are on the last letter
    x = gameWidth + 150;
  }
  game.lastLetterX = x;
  return x;
}

//This creates a random y value within the height of the screen
function calcRandomY(){
  return Math.floor(Math.random()*(gameHeight-150)+50);
}

//this returns a random symbol (most likely letter for now) from the symbols array
function chooseRandomSymbol(){
  var wordLength = game.current_words.length;
  var randWord = Math.floor(Math.random()*wordLength);

  var letterLength = game.current_words[randWord].word.length;
  var randLetter = Math.floor(Math.random()*letterLength);

  return game.current_words[randWord].word[randLetter];
}

//This will choose a letter that is needed to complete a word
function chooseNeededLetter(){
  for (var i = 0; i < game.current_words.length; i++) {
    if(game.current_words[i].completed){
      continue;
    } else {
      var chance = Math.random();
      var firstNeeded = game.current_words[i].word.substr(burdie.currentWord.length, 1);
      
      if(chance > .5){ //50% chance you get the letter you need
        return firstNeeded;
      } else { //check if you can give the second next letter, if you can give it, otherwise give the next letter

        if(burdie.currentWord.length == game.current_words[i].word.length - 1){
          return firstNeeded;
        } else {
          return game.current_words[i].word.substr(burdie.currentWord.length+1, 1);
        }
      }
    }
  };
  return symbols[Math.floor(Math.random()*symbols.length)]; //all else fails (dont know why it would) return a random letter
}


//checks if the letter has escaped the screen and if it has recycle it
Letter.prototype.checkEscaped = function(){
  if(this.drawX + this.width + 50 <= 0){
    this.recycle();
  }
};

//reassigns a new symbol, and recalculates a x and a y
Letter.prototype.recycle = function(){
  
  var prob = Math.random();
  //console.log('New letter prob: '+prob)

  if(prob < game.heartFrequency){ //under .01 give heart
    this.symbol = 'HEART';
    this.speed = game.letter_speed;
  } else if(prob < game.bombFrequency){ //under .09 give bomb
    this.symbol = 'BOMB';
    this.speed = game.bomb_speed;
  } else if(prob >= game.bombFrequency && prob < game.eggFrequency) { //between .1 and .2 give egg
    this.symbol = 'EGG';
    this.speed = game.letter_speed;
  } else if(prob >= game.eggFrequency && prob < game.letterHelpFrequency){//between .2 and .5 give needed letter
    if(this.i == Math.floor(Math.random()*game.totalLetters)){
      this.symbol = ' ';
    } else {
      this.symbol = chooseNeededLetter(); //give them the letter they need
    }
    this.speed = game.letter_speed;
  } else {// give random letter
    this.symbol = chooseRandomSymbol(); //reassign the letter symbol to a random letter
    this.speed = game.letter_speed;
  }

  this.drawX = calcRandomX(this.i); 
  this.drawY = calcRandomY();

  
};


function clearCtxLetters(){
  ctxLetters.clearRect(0, 0, gameWidth, gameHeight)
}

//END LETTER OBJECT
















//BUTTON OBJECT
function Button(yT,xR,yB,xL){
  this.xLeft = xL;
  this.xRight = xR;
  this.yTop = yT;
  this.yBottom = yB;
}

Button.prototype.checkClicked = function() {
  return (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom)
};


//END OF BUTTON OBJECT




//EVENT FUNCTIONS

function mouseClicked(e){
  mouseX = e.pageX - canvasBG.offsetLeft;
  mouseY = e.pageY - canvasBG.offsetTop;
  if(btnPlay.checkClicked()) playGame();
  if(btnHelp.checkClicked()) window.location = 'help.html';
  if(btnPause.checkClicked()) {
    if(isPlaying){
      stopLoop(); 
      drawControls();
      drawCurrentWord();
    } else {
      startLoop(); 
      drawControls();
      drawCurrentWord();
    }
  }
  if(btnSound.checkClicked()) {
    if(isPlaying){
      if(soundPlaying){
        console.log("Stop Sound");
        soundPlaying = false;
        song.pause();
      } else {
        console.log("START Sound");
        song.play();
        soundPlaying = true;
      }
      drawControls();
    }
  }
}

function checkKeyDown(e){
  var keyID = e.keyCode || e.which;
  
  if(keyID === 38 || keyID === 87){//38 = uparrow, 87 = 'w'
    burdie.isUpKey = true;
    e.preventDefault(); //prevents user from scrolling down the webpage  
  }
  if(keyID === 39 || keyID == 68){//right arrow or d key
    burdie.isRightKey = true;
    e.preventDefault(); 
  }
  if(keyID === 40 || keyID === 83){//down arrow or s key
    burdie.isDownKey = true;
    e.preventDefault(); 
  }
  if(keyID === 37 || keyID === 65){//left arrow or a key
    burdie.isLeftKey = true;
    e.preventDefault(); 
  }
  if(keyID === 32){//spacebar
    burdie.isSpaceBar = true;
    e.preventDefault(); 
  }
}

function checkKeyUp(e){
  var keyID = e.keyCode || e.which;
  
  if(keyID === 38 || keyID === 87){//38 = uparrow, 87 = 'w'
    burdie.isUpKey = false;
    e.preventDefault(); //prevents user from scrolling down the webpage
  }
  if(keyID === 39 || keyID === 68){//right arrow or d key
    burdie.isRightKey = false;
    e.preventDefault(); 
  }
  if(keyID === 40 || keyID === 83){//down arrow or s key
    burdie.isDownKey = false;
    e.preventDefault(); 
  }
  if(keyID === 37 || keyID === 65){//left arrow or a key
   burdie.isLeftKey = false;
    e.preventDefault(); 
  }
  if(keyID === 32){//spacebar
    burdie.isSpaceBar = false;
    e.preventDefault(); 
  }
}


//listen for the submission of the game over form
$(document).ready(function() {
    $('#gameOverForm').submit(function() {
      var name = $('#score_name').val();
      if(name == ''){
          alert('Please enter a name');

      } else {
        $('#endGameDialog').dialog("close"); 
        var points = parseInt($("#user_points").val()) + burdie.score;
        var eggs = parseInt($("#user_eggs").val()) + burdie.eggs;
        var hearts = parseInt($("#user_hearts").val()) + burdie.hearts;
        var wordsSolved = parseInt($("#user_words_solved").val()) + burdie.wordsSolved;

        $.ajax({
          url: '/scores',
          type:'POST',
          dataType:'json',
          data:{score:{name:name, score:burdie.score, user_id:$("#user_id").val(), level:game.level}},
          success: function(data) {
            drawMenu();
          }
        });

        //if the user is logged in log their stats
        if($("#user_id").val()){
          $.ajax({
            url: '/users/'+$("#user_id").val(),
            type:'PUT',
            dataType:'json',
            data:{user:{id:$("#user_id").val(), points:points, eggs:eggs, hearts:hearts, words_solved:wordsSolved}},
            success: function(data) {
              drawMenu();
            }
          });
        }
        

      }
      return false;
    });
});

//END OF EVENT FUNCTIONS



