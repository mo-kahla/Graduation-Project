//cnn upload image handle
const urlCnn = 'http://127.0.0.1:8000/cnn-encode/'
const myHeaders = new Headers();
myHeaders.append('Access-Control-Allow-Headers', "*")
myHeaders.append('Access-Control-Allow-Origin', "*")
myHeaders.append('content-type', 'application/json')



var baseCnn;

const inpFile1 = document.querySelector(".file-upload-input1")
const previewImage1 = document.getElementById("im11")
const fileUpload1 = document.getElementById("file-upload-content1")
const text1 = document.getElementById("drag-text1")
const rtext1 = document.getElementById("result_text")
const rtext2 = document.getElementById("result_text2")
const result11 = document.getElementById("result1")
const result22 = document.getElementById("result2")


inpFile1.addEventListener("change", function(){
  const file = this.files[0]

  if (file) {
    reader = new FileReader();
    previewImage1.style.display = "block";
    text1.style.display = "none"
    reader.addEventListener("load", function(){
      baseCnn = this.result;
      //data.append('img', JSON.stringify(base))
      console.log(baseCnn)
      previewImage1.setAttribute("src", this.result);

    });

    reader.readAsDataURL(file);

  }else{

    previewDefaultText.style.display = "null";
    previewImage.style.display = "null";
    previewImage.setAttribute("src", "");
  }

});

/************************************************************************************************************************ */

var baseCnn2;

const inpFile2 = document.querySelector(".file-upload-input2")
const previewImage2 = document.getElementById("im12")
const fileUpload2 = document.getElementById("file-upload-content2")
const text2 = document.getElementById("drag-text2")


inpFile2.addEventListener("change", function(){
  const file = this.files[0]

  if (file) {
    reader = new FileReader();
    previewImage2.style.display = "block";
    text2.style.display = "none"
    reader.addEventListener("load", function(){
      baseCnn2 = this.result;
      //data.append('img', JSON.stringify(base))
      console.log(baseCnn2)
      previewImage2.setAttribute("src", this.result);

    });

    reader.readAsDataURL(file);

  }else{

    previewDefaultText.style.display = "null";
    previewImage.style.display = "null";
    previewImage.setAttribute("src", "");
  }

});

function encodeHost(images, url){
  fetch(url,{
    method: 'POST',
    headers: myHeaders,
    body: images,
  }
  ).then(function (response) {
    response.json().then(function (response){
        // The API call was successful!
    x = response['encodedImage'];
    y = response['decodedImage'];
    console.log(x);
    result11.style.display = "block";
    result22.style.display = "block";
    rtext1.style.display = 'none';
    rtext2.style.display = 'none';
    result11.setAttribute("src", 'ENCODED_OUTPUT.png');
    result22.setAttribute("src", 'DECODED_OUTPUT.png');

    });
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
}


function onPredictClicked(){
  var data = JSON.stringify({ "host": baseCnn,"payload": baseCnn2});
  encodeHost(data,urlCnn)
}