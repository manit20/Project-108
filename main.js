Webcam.set({
    height: 300,
    width: 350,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XEAI28OR-/model.json', Model_Loaded);

function Model_Loaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    var speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        prediction = results[0].label
        speak();
        if(results[0].label == "Clapping"){
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128079;";
        }
        if(results[0].label == "Punch"){
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9994;";
        }
        if(results[0].label == "Beautiful"){
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
        }
        if(results[0].label == "Yo"){
            document.getElementById("result_object_gesture_icon").innerHTML = "&#129304;";
        }
        if(results[0].label == "Cheese"){
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
        }
    }
}