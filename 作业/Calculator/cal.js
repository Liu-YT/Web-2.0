var output_show = ""; //the show of the screen
var flag = 0; //如果flag为1，说明此事的显示是之前的结果，否则不是
var totalButton = document.getElementsByTagName('button');

window.onload = function() {
  for(var i = 0; i < totalButton.length; i++) {
      var tmp = totalButton[i].value;
      totalButton[i].onclick = (function(tmp,i){
            return function(){
              changeStyle(i);
              CalculationOperate(tmp,i);
              window.setTimeout(resetStyle,500,i);
            }
        })(tmp,i);
  }
}

function resetStyle(index) {
  totalButton[index].className = 'old';
}

function changeStyle(index) {
  if(totalButton[index].value != "CE")
    totalButton[index].className = "new";
  else totalButton[index].className = "special_new";
}

function CalculationOperate(tmp) {
  if(output_show == "0")  output_show = '';
  /*logic operation*/
  if(tmp == "=") Eval(output_show),flag = 1;
  else if(tmp == "CE") output_show = '';
  else if(tmp == "←" && output_show.length != 0 && flag == 0) output_show = output_show.substr(0,output_show.length-1);
  else if(tmp == "←" && output_show.length != 0 && flag == 1) output_show = '', flag = 0;
  else if(tmp == "←" && output_show.length == 0) output_show = '0';
  else if(tmp == '.' && output_show.length == 0)  output_show = '0.';
  else if(tmp == '(' && output_show.length == 0)  output_show = '(';
  else if((tmp < '0' || tmp > '9') && flag == 1 && output_show.length != 0) output_show += tmp, flag = 0;
  else if((tmp >= '0' && tmp <= '9') && flag == 1)  output_show = tmp, flag = 0;
  else if((tmp < '0' || tmp > '9') && output_show.length == 0) output_show = '0';
  else if((output_show[output_show.length-1] < '0' || output_show[output_show.length-1] > '9') && (tmp < '0' || tmp > '9') && tmp != '(' && tmp != ')' ) output_show = output_show.substr(0,output_show.length-1) + tmp;
  else  output_show += tmp, flag = 0;

  if(output_show.length == 0) output_show = '0';
  document.getElementById('output_field').value = output_show;
}

function Eval(Calculation_formula) {
  try{
    if(Calculation_formula.length == 0) Calculation_formula = '0';
    //去掉数字前面无效的0
    for(var i = 1; i <= Calculation_formula.length-1; i++)
      if(Calculation_formula[i] == '0' && Calculation_formula[i+1] >= '0' && Calculation_formula[i+1] <= '9')
        Calculation_formula = Calculation_formula.slice(0,i) + Calculation_formula.slice(i+1,Calculation_formula.length);
    output_show = eval(Calculation_formula);
    if(output_show == "Infinity" || isNaN(output_show)) {
      alert("0 can't be a divisor!");
      output_show = '0';
    }
  }
  catch(exception){
    alert(output_show+" is invalid input!Please check it!");
    output_show = '0';
  }
}
