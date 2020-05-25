'use strict'

$(document).ready(function () {
    $(".dialog_window").dialog({
	autoOpen: false,
	closeOnEscape: false,
	modal: true,
	dialogClass: 'no-close',
});

    $( ".accordion" ).accordion({
	collapsible: true,
	active:false,
	heightStyle: "content"
    });

    $("input[type=radio]" ).checkboxradio({
	icon:false
    });

    $( "#tabs" ).tabs();
    
});

const attrs = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];

const psionic_disciplines = ["biopsionics","metapsionics","precognition","telekinesis","telepathy","teleportation"];

var tempAttr="";
var tempAttrScore="";

var tempSelections=["", "", "", "", "", ""];

var remainingRolls=3;

var combat_skill_bank = 0;
var noncombat_skill_bank = 0;
var psychic_skill_bank = 0;
var any_skill_bank = 1;

var combat_skill_remaining = 0;
var noncombat_skill_remaining = 0;
var psychic_skill_remaining = 0;
var any_skill_remaining = 1;

var background_skills = [];
var foci_skills = [];
var growth_skills = [];
var learning_skills = [];
var class_skills = [];

var class_foci = [];

var attrBonuses = [0,0,0,0,0,0];
var attrBases = ["","","","","",""];

var picked_skills = [];

var learning_choice_index = [];

function rollDie(sides=6){
    return 1+Math.floor(sides*Math.random());
}

function rollAttr(attrname){
    let attrElem = document.getElementById(attrname+'_attr');
    let total = rollDie(6)+rollDie(6)+rollDie(6);
    attrBases[attrs.indexOf(attrname)] = total;
    attrElem.value=total + attrBonuses[attrs.indexOf(attrname)];
    updateMod(attrname,total);    
}

function updateMod(attrname){
    let total = document.getElementById(attrname+'_attr').value;
    let modElem = document.getElementById(attrname+'_mod');
    modElem.innerHTML= displayMod(total);

    if(attrname=="constitution"){
	var elemConMod = document.getElementById('constitution_hp_bonus');
	elemConMod.value = computeMod(total);
	totalHP();
    }
}

function displayMod(roll){
    if (roll == "") return "+0";
    if (roll >= 18) return "+2";
    if (roll >= 14) return "+1";
    if (roll >= 8) return "+0";
    if (roll >= 4) return "\u2212"+"1";
    return "\u2212"+"2";
}

function computeMod(roll){
    if (roll == "") return 0;
    if (roll >= 18) return 2;
    if (roll >= 14) return 1;
    if (roll >= 8) return 0;
    if (roll >= 4) return -1;
    return -2;
}

function setAttr(attrname, newValue){
    if (attrs.includes(attrname)){
	let attrElem = document.getElementById(attrname+'_attr');
	var ind=attrs.indexOf(attrname);
	attrBases[ind] = newValue;
	if(newValue !=""){
	    attrElem.value= parseInt(newValue) + attrBonuses[ind];
	}
	else{
	    attrElem.value= newValue;
	}
	updateMod(attrname, newValue);
    }
}

function checkAttr(attrname){
    var ind=attrs.indexOf(attrname);
    setAttr(attrname, attrBases[ind]);
}

function resetAttr(attrname){
    setAttr(attrname,"");
}

function attrTo14(attrname){
    if (tempAttr != ""){
//	var oldInd=attrs.indexOf(tempAttr);
//	let oldElem = document.getElementById(tempAttr+'_attr');
	setAttr(tempAttr, tempAttrScore);
    }
    let newElem = document.getElementById(attrname+'_attr');
    tempAttr=attrname;
    if (tempAttr != ""){
	var ind=attrs.indexOf(attrname);
	tempAttrScore = attrBases[ind];
	setAttr(attrname, 14);
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
    $(".attrSelects").show();
}

function hideAttrSelects(){
    $(".attrSelects").hide();
}

function showSubclasses(){
    let elem=document.getElementById("adventurer_subclass");
    elem.style.display= 'inline-block';
    
    let elem2=document.getElementById("adventurer_subclass_mirror");
    elem2.style.display= 'inline-block';

}

function hideSubclasses(){
    let elem=document.getElementById("adventurer_subclass");
    elem.style.display= 'none';

    let elem2=document.getElementById("adventurer_subclass_mirror");
    elem2.style.display= 'none';
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

let fociURL = 'https://noah-sennett.github.io/swn-character-creator/js/foci.json';
var foci;

let classURL = 'https://noah-sennett.github.io/swn-character-creator/js/class.json';
var classes;

let psionicsURL = 'https://noah-sennett.github.io/swn-character-creator/js/psionics.json';
var psionics;

let packagesURL = 'https://noah-sennett.github.io/swn-character-creator/js/equipment_packages.json';
var packages;


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
    let elem2 = document.getElementById("backgrounds_mirror");

    var backgroundKeys=Object.keys(backgrounds);
    
    for (var key of backgroundKeys) {
	var option = document.createElement("option");
	option.text = backgrounds[key]["name"];
	option.value = key;
	elem.add(option);
	
	var option2 = document.createElement("option");
	option2.text = backgrounds[key]["name"];
	option2.value = key;
	elem2.add(option2);

    }

}

function displayBackground(background) {
    let elemBackgroundDescription = document.getElementById("background_description");

    background_skills = [];
    learning_skills = [];
    growth_skills = [];

    picked_skills = [];

    attrBonuses = [0,0,0,0,0,0];
    
    if (background==""){
	elemBackgroundDescription.innerHTML = "";
    }
    else{

	background_skills.push(backgrounds[background]["free_skill"].slice(0,-2).toLowerCase());
	
	var quickSkills = backgrounds[background]["quick_skills"];

	var elemDescription = document.createElement("span");
	var elemFreeSkill = document.createElement("p");
	var elemQuickSkills = document.createElement("p");

	elemDescription.innerHTML = backgrounds[background]["description"];
	elemFreeSkill.innerHTML = "<strong>Free Skill</strong>: "+quickSkills[0];
	elemQuickSkills.innerHTML = "<strong>Quick Skills</strong>: "+quickSkills[0]+", "+quickSkills[1]+", "+quickSkills[2];

	elemBackgroundDescription.appendChild(elemDescription);
	elemBackgroundDescription.appendChild(elemFreeSkill);
	elemBackgroundDescription.appendChild(elemQuickSkills);
	
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
	    option.value = opt.toLowerCase();
	    if (option.value=="any skill") option.setAttribute("disabled","true");
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
	    option.value = opt.toLowerCase();
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
    var topRow = document.getElementById('topRowRight'); 
    var tbl  = document.createElement('div');
    tbl.setAttribute("class","skillTable");

    for(var j = 0; j < 3; j++){
	var skillBlock = document.createElement('div');
	skillBlock.setAttribute("class","skillBlock");
	skillBlock.setAttribute("style","margin-bottom:0px");
	
	var skillName = document.createElement('div');
	var skillRank = document.createElement('div');
	var skillTotal = document.createElement('div');

	skillRank.setAttribute("style","display:grid; grid-template-columns: repeat(5,1fr);");
	
	var lbl0=document.createElement('div');
	var lbl1=document.createElement('div');
	var lbl2=document.createElement('div');
	var lbl3=document.createElement('div');
	var lbl4=document.createElement('div');

	lbl0.innerHTML = "0";
	lbl1.innerHTML = "1";
	lbl2.innerHTML = "2";
	lbl3.innerHTML = "3";
	lbl4.innerHTML = "4";	

	skillRank.appendChild(lbl0);
	skillRank.appendChild(lbl1);
	skillRank.appendChild(lbl2);
	skillRank.appendChild(lbl3);
	skillRank.appendChild(lbl4);
	
	skillBlock.appendChild(skillName);
	skillBlock.appendChild(skillRank);
	skillBlock.appendChild(skillTotal);
	
	tbl.appendChild(skillBlock);
    }

    var skillKeys=Object.keys(skills);

    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 3; j++){
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
		    var checkboxLabel = document.createElement('label');
		    checkboxLabel.setAttribute("class","checkbox-label");
		    
		    box.setAttribute("type","checkbox");
		    box.setAttribute("id",skillKey+'_rank_box_'+parseInt(boxes.indexOf(box)));
		    box.setAttribute("onchange","updateSkillBoxes(this.id);");
		    checkboxLabel.append(box);
		    
		    var innerSpan=document.createElement('span');
		    var innerSpanUnderlay=document.createElement('span');

		    if(skills[skillKey]["psychic"]){
			innerSpan.setAttribute("class","checkbox-custom checkbox-purple");
		    }
		    else if(skills[skillKey]["combat"]){
			innerSpan.setAttribute("class","checkbox-custom checkbox-red");
		    }
		    else{
			innerSpan.setAttribute("class","checkbox-custom checkbox-green");
		    }

		    innerSpanUnderlay.setAttribute("class","checkbox-custom underlay");

		    checkboxLabel.append(innerSpanUnderlay);
		    checkboxLabel.append(innerSpan);
		    skillRank.append(checkboxLabel);
		}
		
		var tot=document.createTextNode("");
		
		skillTotal.append(tot);

		skillBlock.appendChild(skillName);
		skillBlock.appendChild(skillRank);
		skillBlock.appendChild(skillTotal);

		skillBlock.setAttribute("id",skillKey+'_box');

	    }
	    else if(i==2 && j==2){
		skillBlock.removeAttribute("class");
		var psychicLabel = document.createElement("div");
		psychicLabel.innerHTML = "Psychic";
		psychicLabel.setAttribute("style","text-align: center; font-style:italic; font-weight:bold;");
		skillBlock.appendChild(psychicLabel);
	    }
	    
	    
	    tbl.appendChild(skillBlock);
            
        }
    }
    var elemSkillBank = document.getElementById("skill_bank");
    topRow.insertBefore(tbl,elemSkillBank);
}


function updateSkillBoxes(boxID){
    var idPrefix = boxID.slice(0,-1);
    var idSuffix = parseInt(boxID.charAt(boxID.length-1));
    var skill = boxID.slice(0,-11);
    var isCombat = skills[skill]["combat"];
    var isPsychic = skills[skill]["psychic"];

    var elemBox0 = document.getElementById(idPrefix+'0');
    var elemBox1 = document.getElementById(idPrefix+'1');
    var elemBox2 = document.getElementById(idPrefix+'2');
    var elemBox3 = document.getElementById(idPrefix+'3');
    var elemBox4 = document.getElementById(idPrefix+'4');

    var elemClass = document.getElementById("class");
    var Class = elemClass.options[elemClass.selectedIndex].value;
    
    var elemBoxes = [elemBox0, elemBox1, elemBox2, elemBox3, elemBox4];

    if (elemBoxes[idSuffix].checked){
	elemBoxes[idSuffix].checked=false;

	for (var i = 0; i<=idSuffix; i++){
	    if(i>=2){
		alert("No skills can be advanced above Skill Level-1 at first level")
		break
	    }
	    if(!(elemBoxes[i].checked)){
		if (isPsychic){
		    if ((getPsychicDisciplines().length > 0) && (skill!=getPsychicDisciplines()[0] && Class == "adventurer")){
			alert("Partial Psychics can only learn one discipline");
			break;	
		    }
		    if (usePsychicSkill()){		
			elemBoxes[i].checked=true;
			picked_skills.push(skill);
			displayTechniques(skill);
		    }
		    else{
			alert("Out of psychic skill points!");
			break;
		    }
		}
		else if (isCombat){
		    if (useCombatSkill() || useAnySkill()){
			elemBoxes[i].checked=true;
			picked_skills.push(skill);
		    }
		    else{
			alert("Out of combat skill points!");
			break;
		    }
		}
		else{
		    if (useNonCombatSkill() || useAnySkill()){
			elemBoxes[i].checked=true;
			picked_skills.push(skill);
		    }
		    else{
			alert("Out of noncombat skill points!");
			break;
		    }
		}
	    }
	}
	
    }
    else{
	elemBoxes[idSuffix].checked=true;
	for (var i = 4; i >= idSuffix; i--){
	    if(elemBoxes[i].checked){
		elemBoxes[i].checked=false;
		var ind = picked_skills.indexOf(skill);
		picked_skills.splice(ind,1);
		if(isPsychic){
		    if(psychic_skill_remaining < psychic_skill_bank){
			addPsychicSkill();
			psychic_skill_bank--;
			displayTechniques(skill);
		    }
		    else{
			alert("Something went wrong!");
		    }
		}
		else if(isCombat){
		    if(combat_skill_remaining < combat_skill_bank){
			addCombatSkill();
			combat_skill_bank--;
		    }
		    else if(any_skill_remaining < any_skill_bank){
			addAnySkill();
			any_skill_bank--;
		    }
		    else{
			alert("Something went wrong!");
		    }
		}
		else{
		    if(noncombat_skill_remaining < noncombat_skill_bank){
			addNonCombatSkill();
			noncombat_skill_bank--;
		    }
		    else if(any_skill_remaining < any_skill_bank){
			addAnySkill();
			any_skill_bank--;
		    }
		    else{
			alert("Something went wrong!");
		    }	    
		}
	    }
	}
    }
    updateSkillTotal(skill);
    
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

    attrBonuses = [0,0,0,0,0,0];
    
    growth_skills = [];
    learning_skills = [];
    
    let elemLearning=document.getElementById("learning");
    elemLearning.setAttribute("disabled","true");
    
    
    remainingRolls = 3;
    elem1.removeAttribute("disabled")
    elem2.removeAttribute("disabled")
    

    updateSkills();
    

}

function hideGrowthButtons(){
    let elem1=document.getElementById("growth_button");
    let elem2=document.getElementById("learning_button");
    elem1.style.display= 'none';
    elem2.style.display= 'none';
    
    resetSelect(document.getElementById("growth"));
    resetSelect(document.getElementById("learning"));

    attrBonuses = [0,0,0,0,0,0];
    
    growth_skills = [];
    learning_skills = [];

    updateSkills();
    
}

function enableLearningChoices(){
    let elemLearning=document.getElementById("learning");
    elemLearning.removeAttribute("disabled");

    for (var opt of elemLearning.options){
	if (opt.value == "any skill"){
	    opt.setAttribute("disabled","true")
	}
    }

    learning_choice_index = [];
    $("#learning option").off("mousedown");
    $("#learning option").mousedown(function(e) {
	e.preventDefault();
	if(!(this.selected)){
	    this.selected=true;
	    learning_choice_index.push(Array.from(elemLearning.options).indexOf(this));
	    if (learning_choice_index.length>2){
		(Array.from(elemLearning.options))[learning_choice_index.shift()].selected=false;
	    }
	}
	else if(this.selected){
	    this.selected=false;
	    var ind = learning_choice_index.indexOf(Array.from(elemLearning.options).indexOf(this));
	    learning_choice_index.splice(ind,1);
	}

	var temp =($("#learning").val());

	if(temp==null) temp=[];

	if (learning_skills.includes("stab")){
	    temp[temp.indexOf("stab or shoot")] = "stab" 
	}
	if (learning_skills.includes("shoot")){
	    temp[temp.indexOf("stab or shoot")] = "shoot" 
	}
	
	learning_skills = temp;

	updateSkills();
	return false;
    });

}


function rollGrowth(){
    let roll = rollDie(6);
    let elem = document.getElementById("growth");
    let elem2 = document.getElementById("learning");
    elem.options[roll-1].selected = "true";
    
    var skill=elem.options[roll-1].value.toLowerCase();
    growth_skills.push(skill);
    
    updateSkills();
    
    
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
    learning_skills.push(skill);

    updateSkills();
    
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
    if (((skill.indexOf(" ") == -1)&&(skill.indexOf(",") == -1))&&(skill != "")){
	var elemBox0 = document.getElementById(skill+'_rank_box_0');
	var elemBox1 = document.getElementById(skill+'_rank_box_1');
	
	if (elemBox1.checked){
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
    else if (skill == "any skill"){
	addAnySkill();
	
    }
    else if (skill == "any combat"){
	addCombatSkill();
    } 
    else if (skill == "any noncombat"){
	addNonCombatSkill();
    }
    else if (skill == "any psychic"){
	addPsychicSkill();
    }
    else if (skill == "+1 any stat"){
	$('#anystat_dialog').dialog( "option", "width", 825 );
	$('#anystat_dialog').dialog({
	    buttons: [{
		text: "Submit",
		click: function(){
		    var ind=growth_skills.indexOf("+1 any stat");
		    var stat=$("input[name=anystat]:checked").val();
		    if(stat != undefined){
			attrBonuses[attrs.indexOf(stat)]++;
			growth_skills[ind]=stat+' +1';
			$("input[name=anystat]").prop("checked",false).change();
			for (var attr of attrs) checkAttr(attr);
			$(this).dialog("close");
		    }
		}
	    }]
	}).dialog("open");
    }
    else if (skill == "+2 physical"){
	$('#physstat_dialog').dialog({
	    buttons: [{
		text: "Submit",
		click: function(){
		    var ind=growth_skills.indexOf("+2 physical");
		    var stat1=$("input[name=physstat1]:checked").val();
		    var stat2=$("input[name=physstat2]:checked").val();
		    if((stat1 != undefined)&&(stat2 !=undefined)){
			attrBonuses[attrs.indexOf(stat1)]++;
			attrBonuses[attrs.indexOf(stat2)]++;
			growth_skills[ind]=stat1+' +1 '+stat2+' +1 ';
			$("input[name=physstat1]").prop("checked",false).change();
			$("input[name=physstat2]").prop("checked",false).change();
			for (var attr of attrs) checkAttr(attr);
			$(this).dialog("close");
		    }
		}
	    }]
	}).dialog("open");
    }
    else if (skill == "+2 mental"){
	$('#mentstat_dialog').dialog({
	    buttons: [{
		text: "Submit",
		click: function(){
		    var ind=growth_skills.indexOf("+2 mental");
		    var stat1=$("input[name=mentstat1]:checked").val();
		    var stat2=$("input[name=mentstat2]:checked").val();
		    if((stat1 != undefined)&&(stat2 !=undefined)){
			attrBonuses[attrs.indexOf(stat1)]++;
			attrBonuses[attrs.indexOf(stat2)]++;
			growth_skills[ind]=stat1+' +1 '+stat2+' +1';
			$("input[name=mentstat1]").prop("checked",false).change();
			$("input[name=mentstat2]").prop("checked",false).change();
			for (var attr of attrs) checkAttr(attr);
			$(this).dialog("close");
		    }
		}
	    }]
	}).dialog("open");
	
    }
    else if (skill == "punch or stab"){
	$('#punchstab_dialog').dialog({
	    buttons: [{
		text: "Submit",
		click: function(){
		    var ind=foci_skills.indexOf("punch or stab");
		    var choice=$("input[name=punchstab]:checked").val();
		    if(choice != undefined){
			foci_skills[ind]=choice;
			$("input[name=punchstab]").prop("checked",false).change();
			incrementSkill(choice);
			$(this).dialog("close");
		    }
		}
	    }]
	}).dialog("open");
	
    }
    else if (skill == "stab or shoot"){
	$('#stabshoot_dialog').dialog({
	    buttons: [{
		text: "Submit",
		click: function(){
		    var ind=learning_skills.indexOf("stab or shoot");
		    var choice=$("input[name=stabshoot]:checked").val();
		    if(choice != undefined){
			learning_skills[ind]=choice;
			$("input[name=stabshoot]").prop("checked",false).change();
			incrementSkill(choice);
			$(this).dialog("close");
		    }
		}
	    }]
	}).dialog("open");
	
    }

}

function addAnySkill(){
    any_skill_bank++;
    any_skill_remaining++;
    var elem = document.getElementById("skill_bank");
    var fillerElem = document.getElementById("bank_filler");
    var elemSkillDot = document.createElement("div");
    var elemSkillDotBox = document.createElement("div");

    elemSkillDot.setAttribute("class","bluedot");
    elemSkillDotBox.setAttribute("class","dotbox");
    elemSkillDotBox.setAttribute("style","height:"+window.getComputedStyle(elem).getPropertyValue('line-height'));

    var tooltipNode = document.createElement('span');
    tooltipNode.setAttribute("class","tooltiptext");
    tooltipNode.innerHTML = "Allocate this to any non-psychic skill by clicking a box above.";


    var oldStyle = elem.style.gridTemplateColumns;
    elem.style.gridTemplateColumns=oldStyle.slice(0,-4)+' fit-content(200px) '+oldStyle.slice(-4);

    elemSkillDotBox.appendChild(elemSkillDot);
    elemSkillDotBox.appendChild(tooltipNode);
    
    elem.insertBefore(elemSkillDotBox,fillerElem);
}

function addCombatSkill(){
    combat_skill_bank++;
    combat_skill_remaining++;
    var elem = document.getElementById("skill_bank");
    var fillerElem = document.getElementById("bank_filler");
    var elemSkillDot = document.createElement("div");
    var elemSkillDotBox = document.createElement("div");
    elemSkillDot.setAttribute("class","reddot");
    elemSkillDotBox.setAttribute("class","dotbox");
    elemSkillDotBox.setAttribute("style","height:"+window.getComputedStyle(elem).getPropertyValue('line-height'));

    var tooltipNode = document.createElement('span');
    tooltipNode.setAttribute("class","tooltiptext");
    tooltipNode.innerHTML = "Allocate this to any combat skill by clicking a box above.";

    var oldStyle = elem.style.gridTemplateColumns;
    elem.style.gridTemplateColumns=oldStyle.slice(0,-4)+' fit-content(200px) '+oldStyle.slice(-4);
    
    elemSkillDotBox.appendChild(elemSkillDot);
    elemSkillDotBox.appendChild(tooltipNode);
    
    elem.insertBefore(elemSkillDotBox,fillerElem);

}


function addNonCombatSkill(){
    noncombat_skill_bank++;
    noncombat_skill_remaining++;
    var elem = document.getElementById("skill_bank");
    var fillerElem = document.getElementById("bank_filler");
    var elemSkillDot = document.createElement("div");
    var elemSkillDotBox = document.createElement("div");
    elemSkillDot.setAttribute("class","greendot");
    elemSkillDotBox.setAttribute("class","dotbox");
    elemSkillDotBox.setAttribute("style","height:"+window.getComputedStyle(elem).getPropertyValue('line-height'));

    var tooltipNode = document.createElement('span');
    tooltipNode.setAttribute("class","tooltiptext");
    tooltipNode.innerHTML = "Allocate this to any noncombat skill by clicking a box above.";

    
    var oldStyle = elem.style.gridTemplateColumns;
    elem.style.gridTemplateColumns=oldStyle.slice(0,-4)+' fit-content(200px) '+oldStyle.slice(-4);


    elemSkillDotBox.appendChild(elemSkillDot);
    elemSkillDotBox.appendChild(tooltipNode);
    
    elem.insertBefore(elemSkillDotBox,fillerElem);
}

function addPsychicSkill(){
    psychic_skill_bank++;
    psychic_skill_remaining++;
    var elem = document.getElementById("skill_bank");
    var fillerElem = document.getElementById("bank_filler");
    var elemSkillDot = document.createElement("div");
    var elemSkillDotBox = document.createElement("div");
    elemSkillDot.setAttribute("class","purpledot");
    elemSkillDotBox.setAttribute("class","dotbox");
    elemSkillDotBox.setAttribute("style","height:"+window.getComputedStyle(elem).getPropertyValue('line-height'));

    var tooltipNode = document.createElement('span');
    tooltipNode.setAttribute("class","tooltiptext");
    tooltipNode.innerHTML = "Allocate this to any psychic skill by clicking a box above.";

    
    var oldStyle = elem.style.gridTemplateColumns;
    elem.style.gridTemplateColumns=oldStyle.slice(0,-4)+' fit-content(200px) '+oldStyle.slice(-4);
    
    elemSkillDotBox.appendChild(elemSkillDot);
    elemSkillDotBox.appendChild(tooltipNode);
    
    elem.insertBefore(elemSkillDotBox,fillerElem);

}

function useAnySkill(){

    var blueDots = document.getElementsByClassName("bluedot");
    if (blueDots.length>0){
	any_skill_remaining--;
	blueDots[0].parentElement.remove();
	
	var elem = document.getElementById("skill_bank");
	var oldStyle = elem.style.gridTemplateColumns;
	elem.setAttribute("style","grid-template-columns:"+oldStyle.slice(0,-23)+oldStyle.slice(-4)+";");

	return true;
    }
    else{
	return false;
    }
}

function useCombatSkill(){

    var redDots = document.getElementsByClassName("reddot");
    if (redDots.length>0){
	combat_skill_remaining--;
	redDots[0].parentElement.remove();

	var elem = document.getElementById("skill_bank");
	var oldStyle = elem.style.gridTemplateColumns;
	elem.setAttribute("style","grid-template-columns:"+oldStyle.slice(0,-23)+oldStyle.slice(-4)+";");

	return true;
    }
    else{
	return false;
    }
}

function useNonCombatSkill(){

    var greenDots = document.getElementsByClassName("greendot");
    if (greenDots.length>0){
	noncombat_skill_remaining--;
	greenDots[0].parentElement.remove();

	var elem = document.getElementById("skill_bank");
	var oldStyle = elem.style.gridTemplateColumns;
	elem.setAttribute("style","grid-template-columns:"+oldStyle.slice(0,-23)+oldStyle.slice(-4)+";");
	
	return true;
    }
    else{
	return false;
    }
}

function usePsychicSkill(){

    var purpleDots = document.getElementsByClassName("purpledot");
    if (purpleDots.length>0){
	psychic_skill_remaining--;
	purpleDots[0].parentElement.remove();

	var elem = document.getElementById("skill_bank");
	var oldStyle = elem.style.gridTemplateColumns;
	elem.setAttribute("style","grid-template-columns:"+oldStyle.slice(0,-23)+oldStyle.slice(-4)+";");

	
	return true;
    }
    else{
	return false;
    }
}


function removeSkillDots(){
    
    var redDots = document.getElementsByClassName("reddot");
    while (redDots.length>0) redDots[0].parentElement.remove();
    combat_skill_bank=0;
    combat_skill_remaining=0;

    var greenDots = document.getElementsByClassName("greendot");
    while (greenDots.length>0) greenDots[0].parentElement.remove();
    noncombat_skill_bank=0;
    noncombat_skill_remaining=0;

    var purpleDots = document.getElementsByClassName("purpledot");
    while (purpleDots.length>0) purpleDots[0].parentElement.remove();
    psychic_skill_bank=0;
    psychic_skill_remaining=0;

    var elem = document.getElementById("skill_bank");
    elem.setAttribute("style","grid-template-columns:fit-content(200px) 1fr;");

    var blueDots = document.getElementsByClassName("bluedot");
    while (blueDots.length>0) blueDots[0].parentElement.remove();
    any_skill_bank=0;
    any_skill_remaining=0;
    
    addAnySkill();//Guaranteed free-skill

}

function loadFoci(){
    let request = new XMLHttpRequest();
    request.open('GET', fociURL);

    request.responseType = 'json';


    request.onload = function() {
	foci = request.response;
	populateFociList(foci);
    }

    request.send();
}

function populateFociList(foci) {
    let elem = document.getElementById("foci");
    let elem2 = document.getElementById("combat_foci");
    let elem3 = document.getElementById("noncombat_foci");
    
    var fociKeys=Object.keys(foci);
    
    for (var key of fociKeys) {
	var option = document.createElement("option");
	var option2 = document.createElement("option");
	var option3 = document.createElement("option");

	option.text = foci[key]["name"];
	option2.text = foci[key]["name"];
	option3.text = foci[key]["name"];

	option.value = key;
	option2.value = key;
	option3.value = key;

	var type = foci[key]["type"];
	
	elem.add(option);
	if(type == "combat" || type == "both") elem2.add(option2);
	if(type == "noncombat" || type == "both") elem3.add(option3);
    }
}

function displayFoci(focus) {
    let elemFociDescription = document.getElementById("foci_description");

    foci_skills=[];
    picked_skills=[];
    
    elemFociDescription.innerHTML = "";
    
    if(focus!=""){

	foci_skills.push(foci[focus]["skill"]);
	
	elemFociDescription.innerHTML = foci[focus]["description"]

	var elemFocusLevel1 = document.createElement("p");
	var elemFocusLevel2 = document.createElement("p");

	if(foci[focus]["level1"] != "")	elemFocusLevel1.innerHTML = '<strong>Level 1</strong>: '+foci[focus]["level1"];
	if(foci[focus]["level2"] != "")	elemFocusLevel2.innerHTML = '<strong>Level 2</strong>: '+foci[focus]["level2"];

	elemFociDescription.appendChild(elemFocusLevel1);
	elemFociDescription.appendChild(elemFocusLevel2);
    }
}


function updateSkills(){
    var allInputs = document.getElementsByTagName("input");
    for (var input of allInputs){
	if(input.type=="checkbox"){
	    input.disabled=false;
	    input.checked=false;
	}
    }

    removeSkillDots();
    
    if (skills == null) return; //In case this function is run before skills have been loaded
    
    var skillKeys = Object.keys(skills);
    for (var skillKey of skillKeys){
	var elem = document.getElementById(skillKey+'_total');
	elem.innerHTML="";
    }    

    var total_skills = background_skills.concat(foci_skills,learning_skills,growth_skills,class_skills);
    
    for (var skill of total_skills) incrementSkill(skill);

    for (var attr of attrs) checkAttr(attr);

    for(var discipline of psionic_disciplines) displayTechniques(discipline);
}

function updateMirrors(id){

    var elem = document.getElementById(id);
    var elemMirror = document.getElementById(id+'_mirror');

    if (elem.tagName=="SELECT"){
	elemMirror.selectedIndex = elem.selectedIndex;
    }
    else if(elem.tagName=="INPUT"){
	elemMirror.value = elem.value;
    }
    
}

function updateFromMirrors(idMirror){

    var id = idMirror.slice(0,-7);
    
    var elem = document.getElementById(id);
    var elemMirror = document.getElementById(idMirror);

    if (elem.tagName=="SELECT"){
	elem.selectedIndex = elemMirror.selectedIndex;
	$('#'+id).trigger('change');
    }
    else if(elem.tagName=="INPUT"){
	elem.value = elemMirror.value;
    }
    
}

function loadClasses(){
    let request = new XMLHttpRequest();
    request.open('GET', classURL);

    request.responseType = 'json';


    request.onload = function() {
	classes = request.response;
    }

    request.send();
}

function optionsToValueArray(options){
    var arr = [];
    for(var opt of options){
	arr.push(opt.value);
    }
    return arr;
}

function displayClass() {
    var elemClass = document.getElementById("class");
    
    var elemClassBonus = document.getElementById('class_hp_bonus');

    
    var Class = elemClass.value;
    
    let elemClassDescription = document.getElementById("class_description");
    if (Class==""){
	elemClassDescription.innerHTML = "";
	class_skills=[];
	hideCombatFoci();
	hideNonCombatFoci();
	elemClassBonus.value = "";

	unrestrictFoci();
    }
    else{
	elemClassDescription.innerHTML = classes[Class]["description"];

	var elemAbilities;
	
	var abilities = classes[Class]["abilities"];
	
	if (Class!="adventurer"){
	    elemAbilities = document.createElement("ul");
	    
	    for (var ability of abilities){
		var elemAbility = document.createElement("li");
		elemAbility.innerHTML = ability;
		elemAbilities.appendChild(elemAbility);
	    }
	}
	else{
	    elemAbilities = document.createElement("p");
	    var keys=Object.keys(abilities);
	    for (var key of keys){
		var elemPartialClass = document.createElement("h3");
		var elemPartialClassAbility = document.createElement("p");
		elemPartialClass.innerHTML = key;
		elemPartialClassAbility.innerHTML = abilities[key];
		elemAbilities.appendChild(elemPartialClass);
		elemAbilities.appendChild(elemPartialClassAbility);
	    }
	}
	
	elemClassDescription.appendChild(elemAbilities);

	if(Class=="psychic"){
	    class_skills=["any psychic","any psychic"];
	    hideCombatFoci();
	    hideNonCombatFoci();
	    elemClassBonus.value = "";

	    restrictFociPsychic();
	    
	}
	else if(Class=="warrior"){
	    class_skills=[];
	    showCombatFoci();
	    hideNonCombatFoci();
	    elemClassBonus.value = 2;

	    restrictFociNonPsychic();
	}
	else if(Class=="expert"){
	    class_skills=[];
	    hideCombatFoci();
	    showNonCombatFoci();
	    elemClassBonus.value = "";

	    restrictFociNonPsychic();
	}
	else if(Class=="war_exp"){
	    class_skills=[];
	    showCombatFoci();
	    showNonCombatFoci();
	    elemClassBonus.value = 2;
	    
	    restrictFociNonPsychic();
	}
	else if(Class=="war_psy"){
		class_skills=["any psychic"];
		showCombatFoci();
		hideNonCombatFoci();
		elemClassBonus.value = 2;

		restrictFociPsychic();
	}
	else if(Class=="exp_psy"){
	    class_skills=["any psychic"];
	    hideCombatFoci();
	    showNonCombatFoci();
	    elemClassBonus.value = "";
	    
	    restrictFociPsychic();
	    
	}
    }
    totalHP();
}

function isolateFoci(){  
    var elemFoci = document.getElementById("foci");
    var elemCombatFoci = document.getElementById("combat_foci");
    var elemNonCombatFoci = document.getElementById("noncombat_foci");

    var fociOption = elemFoci.options[elemFoci.selectedIndex];
    var combatFociOption = elemCombatFoci.options[elemCombatFoci.selectedIndex];
    var nonCombatFociOption = elemNonCombatFoci.options[elemNonCombatFoci.selectedIndex];
    
    for (var opt of elemFoci.options){
	if((opt.value==combatFociOption.value || opt.value==nonCombatFociOption.value) &&(opt.value != "")){
	    opt.disabled="true";
	}
	else{
	    opt.removeAttribute("disabled");
	}
    }
    for (var opt of elemCombatFoci.options){
	if((opt.value==fociOption.value || opt.value==nonCombatFociOption.value) &&(opt.value != "")){
	    opt.disabled="true";
	}
	else{
	    opt.removeAttribute("disabled");
	}
    }
    for (var opt of elemNonCombatFoci.options){
	if((opt.value==combatFociOption.value || opt.value==fociOption.value) &&(opt.value != "")){
	    opt.disabled="true";
	}
	else{
	    opt.removeAttribute("disabled");
	}
    }    
}

function showCombatFoci(){
    var elem = document.getElementById("combat_foci");
    elem.style.display = "inline";
}

function hideCombatFoci(){
    var elem = document.getElementById("combat_foci");
    elem.selectedIndex = 0;
    elem.style.display = "none";
    isolateFoci();

}

function showNonCombatFoci(){
    var elem = document.getElementById("noncombat_foci");
    elem.style.display = "inline";

}

function hideNonCombatFoci(){
    var elem = document.getElementById("noncombat_foci");
    elem.selectedIndex = 0;
    elem.style.display = "none";
    isolateFoci();

}

function loadPsionics(){
    let request = new XMLHttpRequest();
    request.open('GET', psionicsURL);

    request.responseType = 'json';


    request.onload = function() {
	psionics = request.response;
	populatePsionicsList(psionics);
    }

    request.send();
}


function populatePsionicsList(psionics) {
    for (var discipline of psionic_disciplines){
	var elemCoreText = document.getElementById(discipline+'_core_description');
	var elemLevel1 = document.getElementById(discipline+'_level1');
	var elemLevel1Text = document.getElementById(discipline+'_level1_description');
	
	var elemCoreName = document.createElement("h4");
	var elemCoreDescription = document.createElement("p");
	var elemCoreLevel0 = document.createElement("p");
	var elemCoreLevel1 = document.createElement("p");
	
	elemCoreName.innerHTML = "Core Technique\u2014"+psionics[discipline]["core"]["name"];
	elemCoreDescription.innerHTML = psionics[discipline]["core"]["description"];
	elemCoreLevel0.innerHTML = "<strong>Level-0:</strong> "+psionics[discipline]["core"]["level0"];
	elemCoreLevel1.innerHTML = "<strong>Level-1:</strong> "+psionics[discipline]["core"]["level1"];

	elemCoreText.appendChild(elemCoreName);
	elemCoreText.appendChild(elemCoreDescription);
	elemCoreText.appendChild(elemCoreLevel0);
	elemCoreText.appendChild(elemCoreLevel1);

	var level1Keys = Object.keys(psionics[discipline]["level1"]);

	for (var technique of level1Keys){
	    var option = document.createElement("option")
	    option.text = technique;
	    option.value = technique;
	    elemLevel1.add(option);
	}
    }
}

function displayTechniques(discipline){
    var elemRankBox0 = document.getElementById(discipline+'_rank_box_0');
    var elemRankBox1 = document.getElementById(discipline+'_rank_box_1');
    
    var elemCoreText = document.getElementById(discipline+'_core_description');
    var elemLevel1 = document.getElementById(discipline+'_level1');
    var elemLevel1Text = document.getElementById(discipline+'_level1_description');

    elemCoreText.style.display = 'none';
    elemLevel1.style.display = 'none';
    elemLevel1Text.style.display = 'none';

    if (elemRankBox0.checked){
	elemCoreText.style.display = 'block';
	if(elemRankBox1.checked){
	    elemLevel1.style.display = 'block';
	    elemLevel1Text.style.display = 'block';
	}
    }    
}

function displayTechniqueInfo(discipline, technique){
    var elemLevel1Text = document.getElementById(discipline+'_level1_description');
    if (technique == ""){
	elemLevel1Text.innerHTML = "";
    }
    else{
	elemLevel1Text.innerHTML = psionics[discipline]["level1"][technique];
    }
    
}

function getPsychicDisciplines(){
    var knownDisciplines = [];

    for (var discipline of psionic_disciplines){
	var elemRankBox0 = document.getElementById(discipline+'_rank_box_0');
	if (elemRankBox0.checked) knownDisciplines.push(discipline);
    }
    
    return knownDisciplines;
}

function rollHP(){
    var elemRoll = document.getElementById('hp_roll');
    elemRoll.value = rollDie(6);
}

function totalHP(){
    
    var elemRoll = document.getElementById('hp_roll');
    var elemConMod = document.getElementById('constitution_hp_bonus');
    var elemClassBonus = document.getElementById('class_hp_bonus');
    var elemTotal = document.getElementById('hp_total');

    var roll = 0;
    var con = 0;
    var bonus = 0;

    if (elemRoll.value!="") roll=parseInt(elemRoll.value);
    if (elemConMod.value!="") con=parseInt(elemConMod.value);
    if (elemClassBonus.value!="") bonus=parseInt(elemClassBonus.value);
    
    if((elemRoll.value!="" || elemConMod.value!="") || elemClassBonus.value!=""){
	elemTotal.value = Math.max(roll+con+bonus,1);
    }
    else{
	elemTotal.value = "";
    }
}

function loadPackages(){
    let request = new XMLHttpRequest();
    request.open('GET', packagesURL);

    request.responseType = 'json';


    request.onload = function() {
	packages = request.response;
	populatePackagesList(packages);
    }

    request.send();
}

function populatePackagesList(packages) {
    let elem = document.getElementById("equipment_packages");

    var packageKeys=Object.keys(packages);
    
    for (var key of packageKeys) {
	var option = document.createElement("option");
	option.text = packages[key]["name"];
	option.value = key;
	elem.add(option);
    }
    
}

function displayEquipmentPackage(Package){
    var elemEquipmentPackageDescription = document.getElementById("equipment_packages_description")

    var packageList = document.createElement("ul")

    elemEquipmentPackageDescription.innerHTML = "";
    
    if (Package != ""){
	for (var item of packages[Package]["items"]){
	    var elemItem = document.createElement("li");
	    elemItem.innerHTML = item;
	    packageList.appendChild(elemItem);
	}
    }
    

    elemEquipmentPackageDescription.appendChild(packageList);
}

function restrictFociPsychic(){

    var elemFoci = document.getElementById('foci');
    var elemCombatFoci = document.getElementById('combat_foci');
    var elemNonCombatFoci = document.getElementById('noncombat_foci');
    
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("wild_psychic_talent")].disabled="true";

    if(elemFoci.selectedIndex == optionsToValueArray(elemFoci.options).indexOf("wild_psychic_talent")){
	elemFoci.selectedIndex = 0;

	while(foci_skills.indexOf("any psychic") > -1){
	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
	}
	
    }
    
    elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("wild_psychic_talent")].disabled="true";

    if(elemCombatFoci.selectedIndex == optionsToValueArray(elemCombatFoci.options).indexOf("wild_psychic_talent")){
	elemCombatFoci.selectedIndex = 0;
	while(foci_skills.indexOf("any psychic") > -1){
	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
	}

    }
    
    elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("wild_psychic_talent")].disabled="true";

    if(elemNonCombatFoci.selectedIndex == optionsToValueArray(elemNonCombatFoci.options).indexOf("wild_psychic_talent")){
	elemNonCombatFoci.selectedIndex = 0;
	while(foci_skills.indexOf("any psychic") > -1){
	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
	}

    }

}

function restrictFociNonPsychic(){

    var elemFoci = document.getElementById('foci');
    var elemCombatFoci = document.getElementById('combat_foci');
    var elemNonCombatFoci = document.getElementById('noncombat_foci');
    
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("psychic_training")].disabled="true";
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");

    if(elemFoci.selectedIndex == optionsToValueArray(elemFoci.options).indexOf("psychic_training")){
	elemFoci.selectedIndex = 0;
	while(foci_skills.indexOf("any psychic") > -1){
	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
	}
    }
    
    elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("psychic_training")].disabled="true";
    elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");

    if(elemCombatFoci.selectedIndex == optionsToValueArray(elemCombatFoci.options).indexOf("psychic_training")){
	elemCombatFoci.selectedIndex = 0;
	while(foci_skills.indexOf("any psychic") > -1){
	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
	}
    }
    
    elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("psychic_training")].disabled="true";
    elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");

    if(elemNonCombatFoci.selectedIndex == optionsToValueArray(elemNonCombatFoci.options).indexOf("psychic_training")){
	elemNonCombatFoci.selectedIndex = 0;
	while(foci_skills.indexOf("any psychic") > -1){
	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
	}
    }

}

function unrestrictFoci(){

    var elemFoci = document.getElementById('foci');
    var elemCombatFoci = document.getElementById('combat_foci');
    var elemNonCombatFoci = document.getElementById('noncombat_foci');
    
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");
    
    elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");
    
    elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");

}
