const selected=document.getElementById('selected-image');
let reader=new FileReader();

document.getElementById('image').onchange=function(e){
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=function(){
        selected.src=reader.result;
    }

}
