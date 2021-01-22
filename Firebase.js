var firebaseConfig = {
    apiKey: "AIzaSyBkp0dmP5jLcvPwgMQYNpIK6BmBIGmfaQo",
    authDomain: "chat-9bd07.firebaseapp.com",
    databaseURL: "https://chat-9bd07.firebaseio.com",
    projectId: "chat-9bd07",
    storageBucket: "chat-9bd07.appspot.com",
    messagingSenderId: "1096211615371",
    appId: "1:1096211615371:web:cdc5492dcfb9805788ce8e",
    measurementId: "G-2P3BBHFQFN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  var myName = prompt("Digite seu nome").toUpperCase();
  var number = prompt("Digite seu número de telefone", "(00) 90000-0000");
  var body= document.getElementById("body");
  if(myName == "" || number == "" || number.length < 8){
    body.style.display = "none"
    Swal.fire({
      title: 'Erro!',
      text: 'Você precisa preencher o necessário',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    setTimeout(function(){
      window.close(this);
    },3000)
  }

  function sendMessage(){
    var message = document.getElementById("messaage").value;
    firebase.database().ref("messages").push().set({
      "Sender": myName,
      "Message": message,
      "Number": number
    });
    return false;
  }
  
  firebase.database().ref("messages").on("child_added", function (snapshot){
    var html = "";
    html += "<li id='message-" + snapshot.key + "'>";
    html += "<img src='Images/person-male.png' style='width:20px;height:20px;float:right;'/>";
    if(snapshot.val().Sender == myName){
      html = "<li style='background:#F8C128' id='message-" + snapshot.key + "'>";
      html += "<button id='btn_delete' style='cursor: pointer; outline:0' data-id='" + snapshot.key + "'onclick='deleteMessage(this);'>";
       html += "Apagar";
      html += "</button>";
      
  }
      html += "<strong>" + snapshot.val().Sender + ": " + "</strong>" + "<font size=3px>" + snapshot.val().Message + "</font>";
    html += "</li>";
    
    document.getElementById("messages").innerHTML += html;
  });

function deleteMessage(self){
  var messageId = self.getAttribute("data-id");
  firebase.database().ref("messages").child(messageId).remove();
};
firebase.database().ref("messages").on("child_removed", function (snapshot){
  document.getElementById("message-" + snapshot.key).innerHTML = "<center>" + "⚠ " + "<i>" + "<font size=2%>" + "Esta mensagem foi apagada" + "</font>" + "</i>" + "</center>";
});