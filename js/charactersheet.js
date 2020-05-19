'use strict'

 $(document).ready(function () {
     $('.dialog').dialog({
         autoOpen: false,
         title: 'Basic Dialog',
	 buttons: [{
	     text: "Done",
	     click: function(){
		 $(this).dialog("close");
	     }
	 }
		  ]
     });
//     $('#contactUs').click(function () {
//         $('#dialog').dialog('open');
//     });
 });

const attrs = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];

var tempAttr="";
var tempAttrScore="";

var tempSelections=["", "", "", "", "", ""];

var remainingRolls=3;

var combat_skill_bank = 0;
var noncombat_skill_bank = 0;
var psychic_skill_bank = 0;
var any_skill_bank = 0;

var combat_skill_remaining = 0;
var noncombat_skill_remaining = 0;
var psychic_skill_remaining = 0;
var any_skill_remaining = 0;


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

let backgroundURL = 'https://noah-sennett.github.io/swn-character-creator/js/backgrounds.json';
var backgrounds;

let skillURL = 'https://noah-sennett.github.io/swn-character-creator/js/skill.json';
var skills;

function loadBackgrounds(){
    let request = new XMLHttpRequest();
    request.open('GET', backgroundURL);

    request.responseType = 'json';


    request.onload = function() {
	backgrounds = request.response;
	populateBackgroundList(backgrounds);
    }

    request.send();
}

function populateBackgroundList(backgrounds) {
    let elem = document.getElementById("backgrounds");

    var backgroundKeys=Object.keys(backgrounds);
    
    for (var key of backgroundKeys) {
	var option = document.createElement("option");
	option.text = backgrounds[key]["name"];
	option.value = key;
	elem.add(option);
    }

}

function displayBackground(background) {
    let elemFreeSkill = document.getElementById("free_skill");
    let elemBackgroundDescription = document.getElementById("background_description");

    if (background==""){
	elemFreeSkill.innerHTML = "";
	elemBackgroundDescription.innerHTML = "";
    }
    else{
	elemFreeSkill.innerHTML = backgrounds[background]["free_skill"];
	elemBackgroundDescription.innerHTML = backgrounds[background]["description"];
    }
}

function populateLearning(background){
    let elemLearning = document.getElementById("learning");
    while(elemLearning.options.length>0){
	elemLearning.remove(0);
    }
    
    if (background!=""){
	var learningOptions = backgrounds[background]["learning"];
	for (var opt of learningOptions){
	    var option = document.createElement("option");
	    option.text = opt;
	    option.value = opt;
	    elemLearning.add(option);
	}
    }
}

function populateGrowth(background){
    let elemGrowth = document.getElementById("growth");
    while(elemGrowth.options.length>0){
	elemGrowth.remove(0);
    }
    
    if (background!=""){
	var growthOptions = backgrounds[background]["growth"];
	for (var opt of growthOptions){
	    var option = document.createElement("option");
	    option.text = opt;
	    option.value = opt;
	    elemGrowth.add(option);
	}
    }
}

function loadSkills(){
    let request = new XMLHttpRequest();
    request.open('GET', skillURL);

    request.responseType = 'json';


    request.onload = function() {
	skills = request.response;
	generateSkillTable(skills);
    }

    request.send();
}


function generateSkillTable(skills){
    var body = document.body; 
    var tbl  = document.createElement('table');
    tbl.style.width  = '600px';
    tbl.style.border = '1px solid black';

    var skillKeys=Object.keys(skills);

    for(var i = 0; i < 9; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 3; j++){
            var td = tr.insertCell();
	    var skillBlock = document.createElement('div');
	    skillBlock.setAttribute("class","skillBlock");
	    
	    var skillName = document.createElement('div');
	    var skillRank = document.createElement('div');
	    var skillTotal = document.createElement('div');

	    var skillKey;
	    var node;
	    var tooltipNode;
	    
	    if (j < 2 || i==0){
		skillKey = skillKeys[i+j*9];
	    }
	    else{
		skillKey = skillKeys[i-2+j*9];
	    }
	    
	    if ((j<2||i==0)|| i>2){
			    
		skillName.setAttribute("id",skillKey+'_label');
		skillName.setAttribute("class","tooltip");
		skillTotal.setAttribute("id",skillKey+'_total');

		node = document.createTextNode(skills[skillKey]["name"]);

		tooltipNode = document.createElement('span');
		tooltipNode.setAttribute("class","tooltiptext");
		tooltipNode.innerHTML = skills[skillKey]["description"];

		skillName.appendChild(node);
		skillName.appendChild(tooltipNode);
	    }
	    else{
		node = document.createTextNode("");
		skillName.appendChild(node);
	    }
	    
  
	    if ((j<2||i==0)|| i>2){
		
		var box0=document.createElement('input');
		var box1=document.createElement('input');
		var box2=document.createElement('input');
		var box3=document.createElement('input');
		var box4=document.createElement('input');

		var boxes = [box0, box1, box2, box3, box4];

		for (var box of boxes){
		    box.setAttribute("type","checkbox");
		    box.setAttribute("id",skillKey+'_rank_box_'+parseInt(boxes.indexOf(box)));
		    box.setAttribute("onchange","updateSkillBoxes(this.id);");
		    skillRank.append(box);
		}
		
		var tot=document.createTextNode("");
		
		skillTotal.append(tot);
	    }

	    
	    skillBlock.appendChild(skillName);
	    skillBlock.appendChild(skillRank);
	    skillBlock.appendChild(skillTotal);

	    skillBlock.setAttribute("id",skillKey+'_box');
	    
            td.appendChild(skillBlock);
	    //                td.style.border = '1px solid black';
        
        }
    }
    body.appendChild(tbl);
}

function updateSkillBoxes(boxID){
    var idPrefix = boxID.slice(0,-1);
    var idSuffix = boxID.charAt(boxID.length-1);

    var elemBox0 = document.getElementById(idPrefix+'0');
    var elemBox1 = document.getElementById(idPrefix+'1');
    var elemBox2 = document.getElementById(idPrefix+'2');
    var elemBox3 = document.getElementById(idPrefix+'3');
    var elemBox4 = document.getElementById(idPrefix+'4');

    
    var elemBoxes = [elemBox0, elemBox1, elemBox2, elemBox3, elemBox4];
    
    if (elemBoxes[parseInt(idSuffix)].checked){
	if (elemBox4.checked) elemBox3.checked=true;
	if (elemBox3.checked) elemBox2.checked=true;
	if (elemBox2.checked) elemBox1.checked=true;
	if (elemBox1.checked) elemBox0.checked=true;
	
    }
    else{
	if (!(elemBox0.checked)) elemBox1.checked=false;
	if (!(elemBox1.checked)) elemBox2.checked=false;
	if (!(elemBox2.checked)) elemBox3.checked=false;
	if (!(elemBox3.checked)) elemBox4.checked=false;

	
    }
    updateSkillTotal(boxID.slice(0,-11));
    
}

function updateSkillTotal(skill) {
    
    var elemTotal = document.getElementById(skill+'_total');

    var elemBox0 = document.getElementById(skill+'_rank_box_0');
    var elemBox1 = document.getElementById(skill+'_rank_box_1');
    var elemBox2 = document.getElementById(skill+'_rank_box_2');
    var elemBox3 = document.getElementById(skill+'_rank_box_3');
    var elemBox4 = document.getElementById(skill+'_rank_box_4');

    if (elemBox4.checked) elemTotal.innerHTML = "4";
    if (!(elemBox4.checked)) elemTotal.innerHTML = "3";
    if (!(elemBox3.checked)) elemTotal.innerHTML = "2";
    if (!(elemBox2.checked)) elemTotal.innerHTML = "1";
    if (!(elemBox1.checked)) elemTotal.innerHTML = "0";
    if (!(elemBox0.checked)) elemTotal.innerHTML = "";
    
}

function fixFreeSkill(background){
    var allInputs = document.getElementsByTagName("input");
    for (var input of allInputs){
	input.disabled=false;
	input.checked=false;
    }

    if (skills == null) return; //In case this function is run before skills have been loaded
	
    var skillKeys = Object.keys(skills);
    for (var skillKey of skillKeys){
	var elem = document.getElementById(skillKey+'_total');
	elem.innerHTML="";
    }
    
    
    if (background != ""){
	var freeSkill = backgrounds[background]["free_skill"].slice(0,-2).toLowerCase();
	var elemBox0 = document.getElementById(freeSkill+'_rank_box_0');
	var elemTotal = document.getElementById(freeSkill+'_total');
	elemBox0.checked=true;
	elemBox0.disabled=true;
	elemTotal.innerHTML = "0";
    }
}

function resetSelect(elem){
    for (var option of elem.options){
	option.selected=false;
    }
}

function showGrowthButtons(){
    let elem1=document.getElementById("growth_button");
    let elem2=document.getElementById("learning_button");
    elem1.style.display= 'inline';
    elem2.style.display= 'inline';

    resetSelect(document.getElementById("growth"));
    resetSelect(document.getElementById("learning"));

    let elemLearning=document.getElementById("learning");
    elemLearning.setAttribute("disabled","true");

    
    remainingRolls = 3;
    elem1.removeAttribute("disabled")
    elem2.removeAttribute("disabled")
    
    fixFreeSkill(document.getElementById("backgrounds").value);

    removeSkillDots();
}

function hideGrowthButtons(){
    let elem1=document.getElementById("growth_button");
    let elem2=document.getElementById("learning_button");
    elem1.style.display= 'none';
    elem2.style.display= 'none';

    resetSelect(document.getElementById("growth"));
    resetSelect(document.getElementById("learning"));

    fixFreeSkill(document.getElementById("backgrounds").value);

    removeSkillDots();
}

function enableLearningChoices(){
    let elemLearning=document.getElementById("learning");
    elemLearning.removeAttribute("disabled");
}

var popUpAnyStat = $('<div class="dialog">Strength<input type="radio" name="anystat"><br>Dexterity<input type="radio" name="anystat"><br>Constitution<input type="radio" name="anystat"><br>Intelligence<input type="radio" name="anystat"><br>Wisdom<input type="radio" name="anystat"><br>Charisma<input type="radio" name="anystat"></div>');
var popUpPhysicalStat = $('<div class="dialog">Strength<input type="radio" name="physstat1"><input type="radio" name="physstat2"><br>Dexterity<input type="radio" name="physstat1"><input type="radio" name="physstat2"><br>Constitution<input type="radio" name="physstat1"><input type="radio" name="physstat2"></div>');
var popUpMentalStat = $('<div>Intelligence<input type="radio" name="mentstat1"><input type="radio" name="mentstat2"><br>Wisdom<input type="radio" name="mentstat1"><input type="radio" name="mentstat2"><br>Charisma<input type="radio" name="mentstat1"><input type="radio" name="mentstat2"></div>');


function rollGrowth(){
    let roll = rollDie(6);
    let elem = document.getElementById("growth");
    let elem2 = document.getElementById("learning");
    elem.options[roll-1].selected = "true";

    var selection = elem.options[roll-1].value.toLowerCase();

    if (selection.indexOf(" ")==-1) incrementSkill(selection);
    
    if (selection == "any skill"){
	addAnySkill();
    }
    
    if (selection == "+1 any stat"){
	popUpAnyStat.dialog();
//	alert($("input[name=anystat]:checked").val());
    }
    
    if (selection == "+2 physical"){
	popUpPhysicalStat.dialog();
//	alert($("input[name=physstat1]:checked").val());
//	alert($("input[name=physstat2]:checked").val());	
    }
    
    if (selection == "+2 mental"){
	popUpMentalStat.dialog();
//	alert($("input[name=mentstat1]:checked").val());
//	alert($("input[name=mentstat2]:checked").val());	

    }

    
    remainingRolls--;
    if (remainingRolls==0){
	let elemGrowthButton = document.getElementById("growth_button");
	let elemLearningButton = document.getElementById("learning_button");
	elemGrowthButton.setAttribute("disabled","true");
	elemLearningButton.setAttribute("disabled","true");
    }
}

function rollLearning(){
    let roll = rollDie(8);
    let elem = document.getElementById("learning");
    elem.options[roll-1].selected = "true";

    var skill=elem.options[roll-1].value.toLowerCase();
    if (skill.indexOf(" ")==-1){
	incrementSkill(skill);
    }
    
    if (skill == "any combat") addCombatSkill();
	
    
    remainingRolls--;
    if (remainingRolls==0){
	let elemGrowthButton = document.getElementById("growth_button");
	let elemLearningButton = document.getElementById("learning_button");
	elemGrowthButton.setAttribute("disabled","true");
	elemLearningButton.setAttribute("disabled","true");
    }   
}


function enableSkillChoiceButtons(background){
    let elemPick=document.getElementById("pick_skill");
    let elemRoll=document.getElementById("roll_skill");

    if (background==""){
	elemPick.setAttribute("disabled","true");
	elemRoll.setAttribute("disabled","true");
    }
    else{
	elemPick.removeAttribute("disabled");
	elemRoll.removeAttribute("disabled");
    }
}

function incrementSkill(skill){
    
    var elemBox0 = document.getElementById(skill+'_rank_box_0');
    var elemBox1 = document.getElementById(skill+'_rank_box_1');

    if (elemBox1.checked){
	any_skill_bank++;
	any_skill_remaining++;
	addAnySkill();
    }
    else{
	if(elemBox0.checked){
	    elemBox1.checked=true;
	    elemBox1.disabled=true;
	}
	else{
	    elemBox0.checked=true;
	    elemBox0.disabled=true;
	}
    }
    updateSkillTotal(skill);
}

function addAnySkill(){
    any_skill_bank++;
    any_skill_remaining++;
    var elem = document.getElementById("skill_bank");
    var elemSkillDot = document.createElement("span");
    elemSkillDot.setAttribute("class","bluedot");

    elem.appendChild(elemSkillDot);
}

function addCombatSkill(){
    combat_skill_bank++;
    combat_skill_remaining++;
    var elem = document.getElementById("skill_bank");
    var elemSkillDot = document.createElement("span");
    elemSkillDot.setAttribute("class","reddot");

    elem.appendChild(elemSkillDot);
}


function addNonCombatSkill(){
    noncombat_skill_bank++;
    noncombat_skill_remaining++;
    var elem = document.getElementById("skill_bank");
    var elemSkillDot = document.createElement("span");
    elemSkillDot.setAttribute("class","greendot");

    elem.appendChild(elemSkillDot);
}

function addPsychicSkill(){
    psychic_skill_bank++;
    psychic_skill_remaining++;
    var elem = document.getElementById("skill_bank");
    var elemSkillDot = document.createElement("span");
    elemSkillDot.setAttribute("class","purpledot");

    elem.appendChild(elemSkillDot);
}


function removeSkillDots(){
    var blueDots = document.getElementsByClassName("bluedot");
    for (var dot of blueDots) dot.remove();
    any_skill_bank=0;
    any_skill_remaining=0;
    
    var redDots = document.getElementsByClassName("reddot");
    for (var dot of redDots) dot.remove();
    combat_skill_bank=0;
    combat_skill_remaining=0;

    var greenDots = document.getElementsByClassName("greendot");
    for (var dot of greenDots) dot.remove();
    noncombat_skill_bank=0;
    noncombat_skill_remaining=0;

    var purpleDots = document.getElementsByClassName("purpledot");
    for (var dot of purpleDots) dot.remove();
    psychic_skill_bank=0;
    psychic_skill_remaining=0;
}

