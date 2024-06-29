prediction_1 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

//create your model and store it in var classifier 
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/bPIExpmX1/model.json', modelLoaded);


//define function modelLoaded
function modelLoaded(){
  console.log('Model Loaded!');}
//define function check() 
function check() {
  img = document.getElementById('captured_image');
  classifier.classify(img, gotResults);
}

//define function gotResult(error, results)
function gotResult(error, results){
    if (error) {
      console.log(error);
    }else{
      if((results[0].confidence > 0.5) && (previous_result != results[0].label))
        {
          console.log(results);
          previoud_result = results[0].label;
          var synth = window.speechSynthesis;
          speak_data = 'Object detected is -'+results[0].label;
          var utterThis = new SpeechSynthesisUtterance(speak_data);
          synth.speak(utter_This);
  
          document.getElementById("result_object_name").innerHTML = results[0].label;
          document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        }
  }
  }