function dlt(){
    if(document.getElementById('messaage').value!="") {
    document.getElementById('messaage').value="";
    }
}
    
function tlfn(){
  document.getElementById("messaage").value="Quer me ligar? " + "<br>" + "<strong>" + "<a href=tel:'number.value'>" + number + "</a>" + "</strong>";
  document.getElementById("btn").click();
  document.getElementById("messaage").value="";
}
    
function final(){
  setTimeout(function(){
    document.getElementById("img_trash").click();
    document.getElementById("messaage").focus();
  });
}
