//urls
const urlDecode = 'http://127.0.0.1:8000/image-decodeLeast/'
const urlEncode = 'http://127.0.0.1:8000/image-encode/'
const urlDecodeTwo = 'http://127.0.0.1:8000/image-decodeTwoLeast/'
const urlEncodeDct = 'http://127.0.0.1:8000/image-dct-encode/'
const urlDecodeDct = 'http://127.0.0.1:8000/image-dct-decode/'
const urlEncryption = 'http://127.0.0.1:8000/encrypt-message/'
const urlDecryption = 'http://127.0.0.1:8000/decrypt-message/'

const myHeaders = new Headers();
myHeaders.append('Access-Control-Allow-Headers', "*")
myHeaders.append('Access-Control-Allow-Origin', "*")
myHeaders.append('content-type', 'application/json')


var base;
const inpFile = document.querySelector(".file-upload-input")
const previewImage = document.getElementById("im1")
const fileUpload = document.getElementById("file-upload-content")
const text = document.getElementById("drag-text")

const inputMessage = document.getElementById("password")


inpFile.addEventListener("change", function(){
  const file = this.files[0]

  if (file) {
    reader = new FileReader();
    previewImage.style.display = "block";
    text.style.display = "none"
    reader.addEventListener("load", function(){
      base = this.result;
      //data.append('img', JSON.stringify(base))
      console.log(base)
      previewImage.setAttribute("src", this.result);
      //inputMessage.style.display = "block";
      $("#password").slideToggle();
  

    });

    reader.readAsDataURL(file);

  }else{

    previewDefaultText.style.display = "null";
    previewImage.style.display = "null";
    previewImage.setAttribute("src", "");
  }

});

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

function encode(baseImage, url){
    fetch(url,{
      method: 'POST',
      headers: myHeaders,
      body: baseImage,
    }
    ).then(function (response) {
      // The API call was successful!
      response.json().then(function(response){
        //psnrText.innerHTML = response['psnr']
        //mseText.innerHTML = response['mse']
        //document.getElementById("psnrText").innerHTML = response['psnr'];
        var resultText = document.getElementById("result-text");
        var mseText = document.getElementById("result-mse");
        var psnrText = document.getElementById("result-psnr");
        resultText.style.display = "none";
        psnrText.style.color = "#FFF";
        mseText.style.color = "#FFF";
        psnrText.innerHTML += response['psnr']
        mseText.innerHTML += response['mse']
      });
      
  
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  
  }

var encryptText;
var encryptionKey;

function encrypt(originalText, url){
  fetch(url,{
    method: 'POST',
    headers: myHeaders,
    body: originalText,
  }
  ).then(function (response) {
    response.json().then(function (response){
        // The API call was successful!
    console.log('success!', response.data);
    encryptText = response['message']
    //encryptionKey = response['key']
    var encodedData = JSON.stringify({ "img": base, "text": encryptText});
    encode(encodedData, urlEncodeDct);
    var showKey = document.getElementById("key")
    showKey.innerHTML = response['key']
    });
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
}

var btn_encrypt = document.getElementById("btn_password")

function onEncodeClicked(){

    if(btn_encrypt.innerHTML == "Enable"){
      var stegoText = document.getElementById("pass").value;
      var data = JSON.stringify({ "text": stegoText}); 
      encrypt(data, urlEncryption);
 
    }else{
      var stegoText = document.getElementById("pass").value;
      console.log(stegoText);
      var data = JSON.stringify({ "img": base, "text": stegoText});
      btn_encrypt = document.getElementById("btn_password");
      encode(data, urlEncodeDct);
    } 
}


function decode( baseImage, url){
    fetch(url,{
      method: 'POST',
      headers: myHeaders,
      body: baseImage,
    }
    ).then(function (response) {
      response.json().then(function (response){
          // The API call was successful!
      console.log('success!!!', response.data);
      //hossam = JSON.stringify(response);
      //console.log(response['data']);
      //console.log("this is "+hossam);
      console.log(response['data']);
        var resultText = document.getElementById("decoded_result");
        resultText.style.color = "#FFF";
        resultText.innerHTML = "Message:  " + response['data']
      });
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }
  
  function decode_decryption( baseImage, url){
    fetch(url,{
      method: 'POST',
      headers: myHeaders,
      body: baseImage,
    }
    ).then(function (response) {
      response.json().then(function (response){
          // The API call was successful!
      console.log('success!!!', response.data);
      var encrypted_message = response['data'];
      var insertedKey = document.getElementById("key_decode").value;
      console.log(insertedKey);
      console.log(encrypted_message);
      var data3 = JSON.stringify({"key": insertedKey, "encrypted_message": encrypted_message});
      console.log(data3);
      decrypt(data3, urlDecryption);
  
      });
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }
  
  function decrypt(data, url){
    fetch(url,{
      method: 'POST',
      headers: myHeaders,
      body: data,
    }
    ).then(function (response) {
      response.json().then(function (response){
          // The API call was successful!
      console.log('success!', response.data);
      });
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
  }
  
  
  
  
  var btn_gotKey = document.getElementById("btn_password1");

  function onDecodeClicked(){
    if(btn_gotKey.innerHTML == "Enable"){
        var data = JSON.stringify({ "img": base,});
        decode_decryption(data, urlDecodeDct)
      }else{
        var data = JSON.stringify({ "img": base,});
        //btn_encrypt = document.getElementById("btn_password");
        decode(data, urlDecodeDct);
      } 
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
    $("#password_decode").slideToggle();
  }