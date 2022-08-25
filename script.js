/*
\\\\\\\\\\\\\\\\\\\\ VARIABLES  //////////////////// 
*/
let textInput = document.querySelector(".text-input");
let textOutput = document.querySelector(".text-output");

let btnEncrypt =  document.querySelector(".encrypt"); 
let btnDecrypt = document.querySelector(".decrypt");

let btnCopy = document.querySelector(".copy");
// let btnPaste = document.querySelector(".paste");

let encryptionKey = [
  {
    "a": "ai",
    "e": "enter", 
    "i": "imes", 
    "o": "ober", 
    "u": "ufat"
  },
  {
    "ai": "a",
    "enter": "e", 
    "imes": "i", 
    "ober": "o", 
    "ufat": "u"
  }
];

/*
\\\\\\\\\\\\\\\\\\\\ FUNCTIONS //////////////////// 
*/

////////// Ecrypt //////////

function locateAndEncryptVowels(word) {
  let encryptedWord = "";

  for (let i = 0, n = word.length; i < n; i++) {
    switch(encryptionKey[0][word[i]]) {  
      case undefined:  
        encryptedWord += word[i];
        break;
      default: 
        encryptedWord += encryptionKey[0][word[i]];
        break;
    }
  }

  return encryptedWord;
}

function encryptMessage() { 
  showOutputs();

  let encryptedMessage = "";
  let words = textInput.value.split(" ");

  for (let i = 0, n = words.length; i < n; i++) {
    encryptedMessage += locateAndEncryptVowels(words[i]);
    encryptedMessage += " "; 
  }

  encryptedMessage = encryptedMessage.slice(0,-1);

  textInput.value = "";
  textOutput.value = encryptedMessage;
}

////////// Decrypt //////////

function detectEncryptedLetter(word, i) {
  for (let j = 0, n = encryptionKey[0][word[i]].length; j < n; j++) {
    if (encryptionKey[0][word[i]][j] !== word[i + j]) {
      return false;
    }
  }
  return true;
}

function locateAndDesencryptWords(word) {
  let decryptedWord = "";

  for (let i = 0, n = word.length; i < n; i++) {
    switch(encryptionKey[0][word[i]]) {  // 
      case undefined:  
        decryptedWord += word[i];
        break;
      default: 
                                                 // centinela
        if (detectEncryptedLetter(word, i) && ((word.length - i) >= (encryptionKey[0][word[i]].length))) {
          decryptedWord += encryptionKey[1][encryptionKey[0][word[i]]]; 
          i += encryptionKey[0][word[i]].length - 1; 
          break;
        }

        decryptedWord += word[i];
        break;     
    }
  }

  return decryptedWord;
}
 
function decryptMessage() {
  showOutputs();

  let decryptedMessage = "";
  let words = textInput.value.split(" ");

  for (let i = 0, n = words.length; i < n; i++) {
    decryptedMessage += locateAndDesencryptWords(words[i]);
    decryptedMessage += " ";
  }
  
  decryptedMessage = decryptedMessage.slice(0,-1);

  textInput.value = "";
  textOutput.value = decryptedMessage;
}


////////// Others //////////

function copyMessage() {  
  textOutput.select();
  navigator.clipboard.writeText(textOutput.value)
  textOutput.style.fontSize = "34px";
  textOutput.style.textAlign = "center";
  textOutput.value = "Texto Copiado";
}

// Prototipo paste
// function pasteMessage() { 
  // textInput.select();
  // navigator.clipboard.readText().then((clipText) => document.getElementById("textInput").innerText = clipText);
  // // textInput.value = navigator.clipboard.pasteText("copy");
  // // textInput.value = textOutput.value;
// }

function showOutputs() {
  document.getElementById("hide-presentation").style.display = 'none';
  document.getElementById("show-outputs").style.display = 'inherit';
  textOutput.style.fontSize = "20px";
  textOutput.style.textAlign = "left";
}

function reminder() {
    document.querySelector(".reminder").style.transition = "all 2s";
    document.querySelector(".reminder").style.color = "red";
    document.querySelector(".reminder").style.backgroundColor = "blue";
    document.querySelector(".reminder").style.transform = "scale(1.1,1.1)";
}

function noReminder() {
  document.querySelector(".reminder").style.transition = "all 2s";
  document.querySelector(".reminder").style.color = "#0a0a23";
  document.querySelector(".reminder").style.backgroundColor = "#FF0a0a";
  document.querySelector(".reminder").style.transform = "initial";
}

////////////////////////////////////////////////

/*
\\\\\\\\\\\\\\\\\\\\ MAIN //////////////////// 
*/

document.getElementById("show-outputs").style.display = 'none';
textInput.onmouseover =  reminder;
textInput.onmouseout =  noReminder;

// Ecrypt 

btnEncrypt.onclick=encryptMessage;

// Decrypt

btnDecrypt.onclick=decryptMessage;


// Copy & Paste

btnCopy.onclick = copyMessage;
// btnPaste.onclick = pasteMessage;
