var Calculator = {
handleInput: function(key){
  $("#preview").append(key);
},

previewContent: function(){
  return $('#preview').html();
},

clear: function(){
  $("#preview").html("");
  $("#result").html("0");
},

deleteLastChar: function(){
  var preview = Calculator.previewContent();
  var newPreview = preview.slice(0, -1);
  $('#preview').html(newPreview);
},

handleZero: function(){
  if(Calculator.previewContent() != "0"){
    Calculator.handleInput("0");
  }
},

handleDot: function(){
  var pattern = /[^\+\-\*\/\%\^]*$/;
  var latestNumber = Calculator.previewContent().match(pattern)[0];
  if(latestNumber.indexOf('.')==-1){
    Calculator.handleInput('.');
  }
},

evaluateResult:function(){
  var result = eval(Calculator.previewContent());
  $("#preview").html("");
  $("#result").html(result);
},

handleOperator: function(key){
  var lastChar = Calculator.previewContent().slice(-1);
  if(["+", "-", "*", "/", "%", "^"].indexOf(lastChar) != -1){
    Calculator.deleteLastChar();
  }
  if((Calculator.previewContent() != "") || (key == "-")){
    Calculator.handleInput(key);
  }
  if((Calculator.previewContent() == "") && ($('#result').html() != "")){
    var prev = $('#result').html();
    $("#preview").append(prev);
    $("#preview").append(key);
  }
},

handleGenericInput: function(key){
  if(key == "0"){
    Calculator.handleZero();
  }
  else if(key == "DEL"){
    Calculator.deleteLastChar();
  }
  else if(key =="."){
    Calculator.handleDot();
  }
  else if(key== "="){
    Calculator.evaluateResult();
  }
  else{
    Calculator.handleInput(key);
  }
},

bindKeys: function(){
  $(document).bind('keyup', '0', function() {Calculator.handleZero()});
  $(document).bind('keyup', '1', function() {Calculator.handleInput("1")});
  $(document).bind('keyup', '2', function() {Calculator.handleInput("2")});
  $(document).bind('keyup', '3', function() {Calculator.handleInput("3")});
  $(document).bind('keyup', '4', function() {Calculator.handleInput("4")});
  $(document).bind('keyup', '5', function() {Calculator.handleInput("5")});
  $(document).bind('keyup', '6', function() {Calculator.handleInput("6")});
  $(document).bind('keyup', '7', function() {Calculator.handleInput("7")});
  $(document).bind('keyup', '8', function() {Calculator.handleInput("8")});
  $(document).bind('keyup', '9', function() {Calculator.handleInput("9")});
  $(document).bind('keyup', '.', function() {Calculator.handleDot(".")});
  $(document).bind('keyup', 'return', function() {Calculator.evaluateResult()});
  $(document).bind('keyup', 'backspace', function() {Calculator.deleteLastChar()});
  $(document).bind('keyup', 'del', function() {Calculator.deleteLastChar()});
  $(document).bind('keyup', 'esc', function() {Calculator.clear()});
  $(document).bind('keyup', '+', function() {Calculator.handleOperator("+")});
  $(document).bind('keyup', '-', function() {Calculator.handleOperator("-")});
  $(document).bind('keyup', '*', function() {Calculator.handleOperator("*")});
  $(document).bind('keyup', '/', function() {Calculator.handleOperator("/")});
  $(document).bind('keyup', '%', function() {Calculator.handleOperator("%")});
  $(document).bind('keyup', '^', function() {Calculator.handleOperator("^")});
},

init: function() {
  $('.number').click(function(){
    var key = $(this).html();
    Calculator.handleGenericInput(key);
  });
  $('.operator').click(function(){
    var key2 = $(this).html();
    Calculator.handleOperator(key2);
  });
  $('.clear').click(function(){
    Calculator.clear();
  });
  Calculator.bindKeys();
}
};

$(document).ready(function() {
  Calculator.init();
});
