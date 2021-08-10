status="";
objects=[];

function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
}

function draw(){

image (video,0,0,600,500);
if(status !=""){

        Objectdetector.detect(video,gotResult);
      
        for (i = 0 ; i<objects.length; i++ ){

          document.getElementById("status").innerHTML= "status : object detected";
         
          fill("red");
         
          percent= floor(objects[i].confidence * 100);
          text(objects[i].label + " "+ percent+ " % ", objects[i].x, objects[i].y);
          noFill();

          stroke("red");

          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height + 15);

          if(objects[i].label==on){

        video.stop();
        Objectdetector.detect(gotResult);

        document.getElementById("object_status").innerHTML=on+" found";

        sound=window.speechSynthesis;
        say=new SpeechSynthesisUtterance(on+"found");
        sound.speak(say);
        }
        else{
  
            document.getElementById("object_status").innerHTML= on+"not found";

        }
        }


    }

}

function start(){

Objectdetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="detecting objects";
on=document.getElementById("objname").value;
}

function modelLoaded(){

console.log("modelloaded");
status=true;

}

function gotResult(error,results){
if(error){

console.log(error)

}

else{
console.log(results);
objects=results;


}


}