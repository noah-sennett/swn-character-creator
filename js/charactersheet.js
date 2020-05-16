'use strict'

// https://noah-sennett.github.io/swn-character-creator/js/backgrounds.json

const attrs = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];

var tempAttr="";
var tempAttrScore="";

var tempSelections=["", "", "", "", "", ""];


function rollDie(sides=6){
    return 1+Math.floor(sides*Math.random());
}

function rollAttr(attrname){
    let attrElem = document.getElementById(attrname+'_attr');
    let total = rollDie(6)+rollDie(6)+rollDie(6);
    attrElem.value=total;
    updateMod(attrname,total);    
}

function updateMod(attrname){
    let total = document.getElementById(attrname+'_attr').value;
    let modElem = document.getElementById(attrname+'_mod');
    modElem.innerHTML=computeMod(total);
}

function computeMod(roll){
    if (roll == "") return "+0";
    if (roll == 18) return "+2";
    if (roll >= 14) return "+1";
    if (roll >= 8) return "+0";
    if (roll >= 4) return "\u2212"+"1";
    return "\u2212"+"2";
}

function setAttr(attrname, newValue){
    if (attrs.includes(attrname)){
	let attrElem = document.getElementById(attrname+'_attr');
	attrElem.value= newValue;
	updateMod(attrname, newValue);
    }
}

function resetAttr(attrname){
    setAttr(attrname,"");
}

function attrTo14(attrname){
    if (tempAttr != ""){
	let oldElem = document.getElementById(tempAttr+'_attr');
	oldElem.value = tempAttrScore;
	updateMod(tempAttr);
    }
    let newElem = document.getElementById(attrname+'_attr');
    tempAttr=attrname;
    if (tempAttr != ""){
    tempAttrScore = newElem.value;
	newElem.value = 14;
	updateMod(attrname);
    }
    else{
	tempAttrScore="";
    }
}

function updateAttrSelects(attrname, value){
    let oldOption = tempSelections[attrs.indexOf(attrname)];
    addAttrOtherSelects(attrname, oldOption);
    removeAttrOtherSelects(attrname, value);
    tempSelections[attrs.indexOf(attrname)] = value;
    attrs.forEach(verifySelectedIndex);
}

function addAttrOtherSelects(attrname,value){
    if (value != ""){
	for (var i=0; i<attrs.length;i++){
	    if (attrname != attrs[i]){
		addAttrSelectOption(attrs[i], value);
	    }
	}
    }
}

function removeAttrOtherSelects(attrname, value){
    if (value != ""){
	for (var i=0; i<attrs.length;i++){
	    if (attrname != attrs[i]){
		removeAttrSelectOption(attrs[i], value);
	    }
	}
    }
}

function addAttrSelectOption(attrname, value){
    let selectElem = document.getElementById(attrname+'_select');
    var option = document.createElement("option");
    option.text = value;
    selectElem.add(option);
    sortSelect(selectElem);
}

function removeAttrSelectOption(attrname, value){
    let selectElem = document.getElementById(attrname+'_select');
    let ind = indexMatchingText(selectElem.options, value);
    if (typeof ind !== 'undefined') selectElem.remove(ind);
}

function indexMatchingText(ele, text) {
    for (var i=0; i<ele.length;i++) {
        if (ele[i].value == text){
            return i;
        }
    }
    return undefined;
}

function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].value;
        tmpAry[i][1] = selElem.options[i].text;
    }
    tmpAry.sort(function (a,b){
	return parseInt(b[0]) - parseInt(a[0]);});
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][1], tmpAry[i][0]);
        selElem.options[i] = op;
    }
    return;
}

function verifySelectedIndex(attrname){
    let selectElem = document.getElementById(attrname+'_select');
    let currSelection = tempSelections[attrs.indexOf(attrname)];
    let ind = indexMatchingText(selectElem.options, currSelection);
    selectElem.selectedIndex = ind;
}

function show14Attr(){
    let elem=document.getElementById("14attr");
    elem.style.display= 'inline-block';
}

function hide14Attr(){
    let elem=document.getElementById("14attr");
    elem.style.display= 'none';
}

function showAttrSelects(){
    let elem=document.getElementById("attr_selects");
    elem.style.display= 'grid';
}

function hideAttrSelects(){
    let elem=document.getElementById("attr_selects");
    elem.style.display= 'none';
}

function showSubclasses(){
    let elem=document.getElementById("adventurer_subclass");
    elem.style.display= 'inline-block';
}

function hideSubclasses(){
    let elem=document.getElementById("adventurer_subclass");
    elem.style.display= 'none';
}

function resetTemps(){
    for (var i =0; i<attrs.length; i++){
	updateAttrSelects(attrs[i],"");
    }

    var attr14Select = document.getElementById("14attrList");
    attr14Select.selectedIndex = "0";
    
    tempAttr="";
    tempAttrScore=""
    tempSelections=["", "", "", "", "", ""];
}


//let backgroundURL = 'https://noah-sennett.github.io/swn-character-creator/js/backgrounds.json';
let backgroundURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';

function loadBackgrounds(){
    let request = new XMLHttpRequest();
    request.open('GET', backgroundURL);

    request.responseType = 'json';


    request.onload = function() {
	const backgrounds = request.response;
	alert(backgrounds);
	populateBackgroundList(backgrounds);
    }

    request.send();
}

function populateBackgroundList(backgrounds) {
    let elem = document.getElementById("backgrounds");

//    for (var i=0; i<backgrounds.length; i++) {
	var option = document.createElement("option");
	option.text = backgrounds["barbarian"]["name"];
	elem.add(option);
  //  }

}

