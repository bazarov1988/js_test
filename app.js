var isValid = true;
var result = {};
function reverseStr(str) {
    return str.split("").reverse().join("");
}
function addSpase(str){
    return str.split("").join(" ");
}
function getAsciiStr(str){
    var result = [];
    var prevVal = '';
    var repeat = 1;
    for (var i = 0; i < str.length; i++) {
        if(prevVal==str[i]){
            repeat++;
        } else {
            if(repeat>1){
                result[result.length-1] = result[result.length-1]+'x'+repeat;
                repeat = 1;
            }
            prevVal = str[i];
            result.push(str.charCodeAt(i));
        }
    }
    return result.join(" + ");
}
function getFactorNumbers(value){

    if(value<0){
        value = value*(-1);
        for (var i=value;i>=0;i--){
            if (value % i == 0 && i!=value){
                return i*-1;
            }
        }
    } else if(value==0||value==1){
        return 1;
    } else {
        for (var i=value;i>=0;i--){
            if (value % i == 0 && i!=value){
                return i;
            }
        }
    }
}
function getDayOfWeek(value){
    var curr = new Date;
    var results = [];
    for(var i =1;i<=6;i++){
        results.push(new Date(curr.setDate(curr.getDate() - curr.getDay()+(value-1)+(i>1?7:0))));
    }
    return results;
}

function checkColor(control){
    if(control.value==''){
        document.getElementById('color_info').style.display = 'none';
    } else {
        document.getElementById('color_info').style.display = 'block';
        document.getElementById('color_box').style.backgroundColor = control.value;
        document.getElementById('color_hex').innerHTML= control.value;
    }
}

function getColor(){
    return document.getElementById('favoriteColor').value;
}

function changeColor(){
    checkColor(document.getElementById('favoriteColor'));
    validateColor();
}

function validateFN(){
    if(document.getElementById('firstName').value!=''){
        document.getElementById('firstNameError').innerHTML = '';
        result.FirstName = addSpase(document.getElementById('firstName').value);
        drawResults();
    } else {
        document.getElementById('firstNameResult').innerHTML = '';
        document.getElementById('firstNameError').innerHTML = 'Name can not be blank';
        isValid = false;
    }
}

function validateLN(){
    if(document.getElementById('lastName').value!=''){
        document.getElementById('lastNameError').innerHTML = '';
        result.LastName = reverseStr(document.getElementById('lastName').value);
        drawResults();
    } else {
        isValid = false;
        document.getElementById('lastNameResult').innerHTML = '';
        document.getElementById('lastNameError').innerHTML = 'Last Name can not be blank';
    }

}
function validateFood(){
    if(document.getElementById('favoriteFood').value!=''){
        document.getElementById('favoriteFoodError').innerHTML = '';
        result.Food = getAsciiStr(document.getElementById('favoriteFood').value);
        drawResults();
    } else {
        document.getElementById('favoriteFoodResult').innerHTML = '';
        document.getElementById('favoriteFoodError').innerHTML = 'Food can not be blank';
        isValid = false;
    }
}
function validateNumber(){
    if(document.getElementById('favoriteNumber').value!=''&&!isNaN(parseInt(document.getElementById('favoriteNumber').value))){
        document.getElementById('favoriteNumberError').innerHTML = '';
        result.Number = getFactorNumbers(document.getElementById('favoriteNumber').value);
        drawResults();
    } else {
        document.getElementById('favoriteNumberResult').innerHTML = '';
        document.getElementById('favoriteNumberError').innerHTML = 'Number can not be blank and must be a number';
        return false;
    }
}
function validateDay(){
    if(document.getElementById('favoriteDay').value!=''){
        document.getElementById('favoriteDayError').innerHTML = '';
        result.DayOfWeek = getDayOfWeek(document.getElementById('favoriteDay').value);
        drawResults();
    } else {
        document.getElementById('favoriteDayResult').innerHTML = '';
        document.getElementById('favoriteDayError').innerHTML = 'Day of Week can not be blank';
        isValid = false;
    }
}

function validateColor(){
    if(document.getElementById('favoriteColor').value!=''){
        document.getElementById('favoriteColorError').innerHTML = '';
        result.Color = getColor();
        drawResults();
    } else {
        document.getElementById('favoriteColorError').innerHTML = 'Color can not be blank';
        isValid = false;
    }
}

function drawResults(){
    if(typeof result.FirstName!='undefined') document.getElementById('firstNameResult').innerHTML = result.FirstName;
    if(typeof result.LastName!='undefined') document.getElementById('lastNameResult').innerHTML = result.LastName;
    if(typeof result.Food!='undefined') document.getElementById('favoriteFoodResult').innerHTML = result.Food;
    if(typeof result.Number!='undefined') document.getElementById('favoriteNumberResult').innerHTML = result.Number;
    if(typeof result.DayOfWeek!='undefined') document.getElementById('favoriteDayResult').innerHTML = result.DayOfWeek.join(' <br /> ');
    checkColor(document.getElementById('favoriteColor'));
    return true;
}
function validateForm(){
    validateFN();
    validateLN();
    validateColor();
    validateDay();
    validateFood();
    validateNumber();
}

window.onload=function() {
    document.getElementById('test_form').onsubmit=function(e) {
        e.preventDefault();
        validateForm();
        if(isValid){
            console.log(result);
            drawResults();
        } else {
            alert('Data is Invalid')
        }
    }
}