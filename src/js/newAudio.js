const urlEncryption = 'http://127.0.0.1:8000/encrypt-message/'
const urlDecryption = 'http://127.0.0.1:8000/decrypt-message/'
const urlEncode = "http://127.0.0.1:8000/Audio-Encode/";
const urlDecode = "http://127.0.0.1:8000/Audio-Least/";
const urlDecodeTwoLeast = "http://127.0.0.1:8000/Audio-two-Least/";


//uploading image
const myHeaders = new Headers();
myHeaders.append('Access-Control-Allow-Headers', "*")
myHeaders.append('Access-Control-Allow-Origin', "*")
myHeaders.append('content-type', 'application/json')
var base;
var audiobase;





const inpFile = document.querySelector(".file-upload-input")
const idk = document.getElementById("image-upload-wrap")
const fileUpload = document.getElementById("file-upload-content")
const text = document.getElementById("drag-text")
const encrypted_key = document.getElementById("encryptionKey")
const audio_result = document.getElementById("audioResult")
const technique = document.getElementById("techniqueChoosen")
const hideresult = document.getElementById("resultToHide")
const ResultText = document.getElementById("stegoText")
const btn = document.getElementById('btn_password');
const btn1 = document.getElementById('btn_password1');
const btn2 = document.getElementById('btn_password2');



var openFile = function(event) {
    var input = event.target; 
    var reader = new FileReader();
  
    reader.onload = function(){
  
      var arrayBuffer = reader.result;
  
  
      audiobase = btoa( arrayBuffer);
  
      console.log(arrayBuffer)
    };
  
    reader.readAsBinaryString(input.files[0]);
    $("#audio").attr("src", URL.createObjectURL(input.files[0]));
    document.getElementById("audio").load();

    text.style.display = "none";
    fileUpload.style.display = "block";
    $("#password").slideToggle();
    
  };


  function connect(audiobase,url){
    fetch(url,{
      method: 'POST',
      headers: myHeaders,
      body: audiobase,
    }
    ).then(function (response) {
      response.json().then(function(response){
        
        
        if(url == urlDecode){
          
          stegoText.innerHTML = response['data']
          
        }
        
        else if(url == urlEncode){
          hideresult.style.display = "none"
          technique.innerHTML = response
        }
        


      });
        
      
      // The API call was successful!
      console.log('success!', response);

    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }


  function decodeForDecrypt(audiobase,url){
    fetch(url,{
      method: 'POST',
      headers: myHeaders,
      body: audiobase,
    }
    ).then(function (response) {
      response.json().then(function(response){
        
        
          
        var encrText = response['data']
        var key= document.getElementById("key").value;
        var data2 = JSON.stringify({ "key": key, "encrypted_message": encrText});
        decryption(data2,urlDecryption);


      });
      console.log('success!', response);

    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }

   function decryption(data,url){
        fetch(url,{
          method: 'POST',
          headers: myHeaders,
          body: data,
        }
        ).then(function (response) {
          response.json().then(function(response){
            
            ResultText.innerHTML = response['message']
            
          });

        
      
      // The API call was successful!
      console.log('success!', response);

    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }
//click on tabs




var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}









function onEncodeClicked(){

    
    if(btn.innerHTML == 'Disable'){
      var originalText = document.getElementById("originalText").value;
      var data = JSON.stringify({ "name": audiobase, "text": originalText}); 
      connect(data,urlEncode);
      audio_result.src="temp.wav"
      audio_result.load();
      audio_result.style.display="block"

    }
    else{
        var originalText = document.getElementById("originalText").value;
        var data = JSON.stringify({ "text": originalText}); 
        var stegotext = encrypt(data, urlEncryption);
        console.log(stegotext);
        
    }
    
    
}


function onDecodeClicked(){
  if(btn1.innerHTML== 'Enable'){
          if(btn2.innerHTML == 'Disable'){
              var data = JSON.stringify({ "name": audiobase});
              decodeForDecrypt(data,urlDecode)
              }
          else if(btn2.innerHTML == 'Enable'){
              var data = JSON.stringify({ "name": audiobase});
              decodeForDecrypt(data,urlDecodeTwoLeast) 
              }

  } 
  else{
    if(btn2.innerHTML == 'Disable'){
      var data = JSON.stringify({ "name": audiobase});
      connect(data,urlDecode)
  }
    else if(btn2.innerHTML == 'Enable'){
      var data = JSON.stringify({ "name": audiobase});
      connect(data,urlDecodeTwoLeast) 
  }
}}


function decrypt(originalText){
  fetch(urlDecryption,{
    method: 'POST',
    headers: myHeaders,
    body: originalText,
  }
  ).then(function (response) {
    response.json().then(function (response){

      var encryptedText = response['message']


      encrypted_key.innerHTML = response['key']
      var data2 = JSON.stringify({ "name": audiobase, "text": encryptedText}); 
      connect(data2,urlEncode);
      audio_result.src="temp.wav"
      audio_result.load();
      audio_result.style.display="block"
    });
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
}


function encrypt(originalText, url){
    fetch(url,{
      method: 'POST',
      headers: myHeaders,
      body: originalText,
    }
    ).then(function (response) {
      response.json().then(function (response){

        var encryptedText = response['message']

  
        encrypted_key.innerHTML = response['key']
        var data2 = JSON.stringify({ "name": audiobase, "text": encryptedText}); 
        connect(data2,urlEncode);
        audio_result.src="temp.wav"
        audio_result.load();
        audio_result.style.display="block"
      });
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }


  function submitencode(){
    var text = document.getElementById("originalText").value;
  
    var audio = document.getElementById('audio');
    audio.src='sample.wav' 
    audio.load();
  
    var data = JSON.stringify({ "name": audiobase,"text" : text}); 
    connect(data);
  }
function onEnableClicked(clicked_id){
  y = document.getElementById(clicked_id)
  if(y.innerHTML == 'Enable'){
    y.innerHTML="Disable"
    y.style.backgroundColor="transparent"
    y.style.color="#a4b1cd"
}

else if(y.innerHTML == 'Disable'){
    y.innerHTML="Enable"
    y.style.backgroundColor="#00efe3"
    y.style.color="black"
}
 
    $("#password2").slideToggle();
}

function DesignSwap(clicked_id){
  x = document.getElementById(clicked_id)
  if(x.innerHTML == 'Enable'){
    x.innerHTML="Disable"
    x.style.backgroundColor="transparent"
    x.style.color="#a4b1cd"
}

else if(x.innerHTML == 'Disable'){
  x.innerHTML="Enable"
  x.style.backgroundColor="#00efe3"
  x.style.color="black"
}}
