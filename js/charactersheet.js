'use strict'

const attrs = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];

var tempAttr="";
var tempAttrScore=""

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
    if (roll == 18) return "+2";
    if (roll >= 14) return "+1";
    if (roll >= 8) return "+0";
    if (roll >= 4) return "\u2212"+"1";
    return "\u2212"+"2";
}

function attrTo14(attrname){
    if (tempAttr != ""){
	let oldElem = document.getElementById(tempAttr+'_attr');
	oldElem.value = tempAttrScore;
    }
    let newElem = document.getElementById(attrname+'_attr');
    tempAttr=attrname;
    tempAttrScore = newElem.value;
    newElem.value = 14;
//    alert(tempAttr);
}

function show14Attr(){
    let elem=document.getElementById("14attr");
    elem.style.display= 'inline-block';
}

function hide14Attr(){
    let elem=document.getElementById("14attr");
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
    tempAttr="";
    tempAttrScore=""
}
