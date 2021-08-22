
const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image for gain in speed
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.85, // confidence threshold for predictions.
};




const video1 = document.querySelector('#videoElement');
const audio = document.querySelector('#player');
let model;

/* handTrack.startVideo(video1).then(status => {
    if (status) {
      const constraints = {'video': true};
      const stream = navigator.mediaDevices.getUserMedia(constraints);
      video1.srcObject = stream;
      setInterval(runDetection,200);
    }
  }); */

handTrack.startVideo(video1).then(status => {
    if (status) {
       navigator.getUserMedia({video:{}}, stream => {
      video1.srcObject = stream;
      setInterval(runDetection,1000);
    }, 
    err => console.log)
    }
  });


function runDetection(){
   model.detect(video1).then (predictions => {
      if (predictions.length != 0){
       let hand1 = predictions[0].bbox;
       let x = hand1[0];
       let y = hand1[1];  
       if (predictions[0].label == 'closed'){
       console.log(hand1);
       console.log(predictions[0].label);
       audio.src = "./drum-roll-sound-effect.mp3";
       audio.play();
       }
       if (predictions[0].label == 'point'){
        console.log(hand1);
        console.log(predictions[0].label);
        audio.src = "./funny-birthday-party-horn.mp3";

       audio.play();
      }
      if (predictions[0].label == 'point' && x < 100){
        console.log(hand1);
        console.log(predictions[0].label);
        audio.src = "./Cow-moo-sound.mp3";

       audio.play();
      }

      
      }
      
      //audio.play();
    });
}

handTrack.load(modelParams)
  .then(lmodel => {
    model = lmodel;
  })

