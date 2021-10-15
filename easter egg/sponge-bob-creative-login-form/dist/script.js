var xx = 0;	  
var $div = $(".lefteye");
var $div1 = $(".righteye");

function oi() {
	  var uf = document.getElementById('user');
	xx = uf.selectionEnd;
	if(xx>34) {xx=34;}
  $div.velocity({
    paddingLeft: xx/1.5 + "px"
  }, {
    duration: 3, 
    easing: "easeInQuad"
  });
  
  $div1.velocity({
    paddingLeft: xx/1.5 + "px"
  }, {
    duration: 3, 
    easing: "easeInQuad"
  });
  
  if ( uf.selectionEnd >34 )
  {
	    $div.velocity({
    paddingLeft: 21 + "px"
  }, {
    duration: 3, 
    easing: "easeInQuad"
  });
  $div1.velocity({
    paddingLeft: 21 + "px"
  }, {
    duration: 3, 
    easing: "easeInQuad"
  });
  }
  }

function onf(){
	$div.velocity({
    left: "102px",
	paddingTop: "11px",
	paddingLeft: xx/1.5 + "px"

  }, {
    duration: 200, 
    easing: "easeInQuad"
  });
  
  $div1.velocity({
    left: "164px",
	paddingTop: "11px",
	paddingLeft: xx/1.5 + "px"

  }, {
    duration: 200, 
    easing: "easeInQuad"
  });
  
}
function onb(){
	
	$div.velocity({
    left: "110px",
	paddingTop: "0",
	paddingLeft: "0"
  }, {
    duration: 200, 
    easing: "easeInQuad"
  });
  
  	$div1.velocity({
    left: "174px",
	paddingTop: "0",
	paddingLeft: "0"
  }, {
    duration: 200, 
    easing: "easeInQuad"
  });
}

function onfp(){
	$div.velocity({
    top:"60px",
	left:"120px"

  }, {
    duration: 200, 
    easing: "easeInQuad"
  });
  
  $div1.velocity({
    top:"60px",
	left:"160px"

  }, {
    duration: 200, 
    easing: "easeInQuad"
  });
  
}

function onbp(){
	$div.velocity({
    top:"75px",
	left:"110px"

  }, {
    duration: 200, 
    easing: "easeInQuad"
  });
  
  $div1.velocity({
    top:"75px",
	left:"174px"

  }, {
    duration: 200, 
    easing: "easeInQuad"
  });
  
}