let responseIndex = 3;

// Answer class
class Answer {
  constructor(q, x, y, imgtext, is_text) {
    this.q = q;
    this.x = x;
    this.y = y;
    this.imgtext = imgtext;
    this.is_text = is_text;

    if(!this.is_text) {
      this.img = loadImage('/images/'+this.imgtext);
    }

  }

  // Display the Response
  display(r) {

    if(r == this.q) {
      if(!this.is_text) {
        //console.log('not ok:'+ this.imgtext);
          image(this.img, this.x, this.y);
      }
    }
  }

  displayText(r) {

    if(r == this.q) {
      if(this.is_text) {
        //console.log('ok');
        fill(239, 173, 27);
        textSize(43);
        textFont('C-Medium');
        textLeading(60)
        text(this.imgtext+'!', this.x, this.y, 460);
        //
      }
    }

    

  }

}

let data = {}; // Global object to hold results from the loadJSON call
let answers = []; // Global array to hold all answer objects

// Put any asynchronous data loading in preload to complete before "setup" is run
function preload() {

  data = loadJSON('/js/data.json', function (data) { 
    loadData();
  });

}

function loadData(r) {
  let responseData = data['data'];
  let responseKey = data['key'];

  for (let i = 0; i < responseData.length; i++) {
    //console.log(i+'-------------------------------');
    $("#nav").append('<li><a id="'+i+'" href="#">'+i+'</a></li>');

    let response = responseData[i];
    //console.log(response);
    var res = Object.entries(response);

    for (const [question, answer] of res) {
      //console.log(`${question} and ${answer}`);
      let imgtext = '';
      let key = responseKey[question];
      let x = key['x'];
      let y = key['y'];
      let is_text = key['is_text'];

      if(is_text == true){
        //console.log(answer);
        imgtext = answer;
      } else {
        imgtext = key[answer];
        //console.log(imgtext);
      }

      //console.log(x)
      // Put object in array
      answers.push(new Answer(i, x, y, imgtext, is_text));
    }

  }

  $("#nav a").click(function() {
      responseIndex = $(this).attr('id');
      //console.log(responseIndex);
      clear();
      //loop();
      redraw();
      return false;
  });
  
}


function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('sketch');
}

function draw() {
  background(0);

  // Display all answers
  for (let i = 0; i < answers.length; i++) {
    answers[i].display(responseIndex);
    answers[i].displayText(responseIndex);
  }

  noLoop();

}


$(document).ready(function() {



});