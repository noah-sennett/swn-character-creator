'use strict'

$(document).ready(function () {



    $("button").click(function(){
	fillOutSheetPage1();
// 	$("#character_sheet").show();
// 	$("#character_sheet_img2").hide();
//         $("#character_sheet").printThis({
//             debug: false,             
//             importCSS: false,            
//             importStyle: false,         
//             printContainer: true,      
// 	    loadCSS: "https://noah-sennett.github.io/swn-character-creator/stylesheet.css",
// //	    loadCSS: "/home/noah/js_projects/swn-character-creator/stylesheet.css",
//             pageTitle: "",             
//             removeInline: false,    
//             printDelay: 3000,      
//             header: null,        
//             footer: null,            
//             base: false ,              
//             formValues: true,          
//             canvas: false,              
//             doctypeString: "",      
//             removeScripts: false,       
//             copyTagClasses: false,
// 	    afterPrint: function(){
// 		$("#character_sheet_img").hide();
// 		$("#character_sheet_img2").show();
// 		fillOutSheetPage2();
// 		$("#character_sheet").printThis({
// 		    debug: false,             
// 		    importCSS: false,            
// 		    importStyle: false,         
// 		    printContainer: true,      
// 		    loadCSS: "https://noah-sennett.github.io/swn-character-creator/stylesheet.css",
// 		    //	    loadCSS: "/home/noah/js_projects/swn-character-creator/stylesheet.css",
// 		    pageTitle: "",             
// 		    removeInline: false,    
// 		    printDelay: 3000,      
// 		    header: null,        
// 		    footer: null,            
// 		    base: false ,              
// 		    formValues: true,          
// 		    canvas: false,              
// 		    doctypeString: "",      
// 		    removeScripts: false,       
// 		    copyTagClasses: false,
// 		    afterPrint: function(){$("#character_sheet").hide();}
// 		});
// 	    }
// 	});

    });             

    
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

    $( "#tabs" ).tabs({
	activate : function (event, ui) {
            var active = $('#tabs').tabs('option', 'active');
	    var elemId = ["foci","combat_foci","noncombat_foci"][active];
	    displayFoci($('#'+elemId).val());
	}
    });

    $( "#psionics_tabs" ).tabs();

    var box1active = false;
    var box2active =false;
    
    $("#rollAttrsButton").on("click",function(){
	
	if(!box1active){
	    $(this).children(".topLayer").animate({
		height:40
	    },500);
	    $("#rollAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#rollAttrsText").hide("blind",{},500);
	}
	
	if(box2active){
	    $("#fixAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#fixAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#fixAttrsText").show("blind",{},500);
	}
	
	box1active = true;
	box2active = false;
	
	
    });
    
    $("#fixAttrsButton").on("click",function(){
	
	if(!box2active){
	    $(this).children(".topLayer").animate({
		height:40
	    },500);
	    $("#fixAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#fixAttrsText").hide("blind",{},500);
	}
	
	if(box1active){
	    $("#rollAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#rollAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#rollAttrsText").show("blind",{},500);
	}
	
	box1active = false;
	box2active = true;
	
	
    });
    
    $("#rollAttrsTopLayer").on("click",function(){
	attrs.forEach(rollAttr);hideAttrSelects();show14Attr();resetTemps();
    });

    $("#fixAttrsTopLayer").on("click",function(){
	attrs.forEach(resetAttr);hide14Attr();showAttrSelects();resetTemps();
    });

    var box3active = false;
    var box4active =false;
    
    $("#rollSkillsButton").on("click",function(){
	
	if(!box3active){
	    $(this).children(".topLayer").animate({
		height:40
	    },500);
	    $("#rollSkillsHeader").toggleClass("persistentText-default-skill persistentText-active-skill",500)
	    $("#rollSkillsText").hide("blind",{},500);
	}
	
	if(box4active){
	    $("#pickSkillsButton").children(".topLayer").animate({
		height:320
	    },500);
	    $("#pickSkillsHeader").toggleClass("persistentText-default-skill persistentText-active-skill",500)
	    $("#pickSkillsText").show("blind",{},500);
	}
	
	box3active = true;
	box4active = false;
	
	
    });
    
    $("#pickSkillsButton").on("click",function(){
	
	if(!box4active){
	    $(this).children(".topLayer").animate({
		height:40
	    },500);
	    $("#pickSkillsHeader").toggleClass("persistentText-default-skill persistentText-active-skill",500)
	    $("#pickSkillsText").hide("blind",{},500);
	}
	
	if(box3active){
	    $("#rollSkillsButton").children(".topLayer").animate({
		height:320
	    },500);
	    $("#rollSkillsHeader").toggleClass("persistentText-default-skill persistentText-active-skill",500)
	    $("#rollSkillsText").show("blind",{},500);
	}
	
	box3active = false;
	box4active = true;
	
	
    });
    
    $("#rollSkillsTopLayer").on("click",function(){
	showGrowthButtons();
    });

    $("#pickSkillsTopLayer").on("click",function(){
	hideGrowthButtons();
	enableLearningChoices();
    });

    var box5active = false;
    
    $("#rollHPButton").on("click",function(){
	
	if(!box5active){
	    $(this).children(".topLayer").animate({
		height:40
	    },500);
	    $("#rollHPHeader").toggleClass("persistentText-default-hp persistentText-active-hp",500)
	    $("#rollHPText").hide("blind",{},500);
	}
	
	box5active = true;
    });

    $("#rollHPTopLayer").on("click",function(){
	rollHP();
	totalHP();
    });

//    $('#name_mirror').addClass("ui-widget");;
    $("#backgrounds_mirror").selectmenu({width:124.5}).selectmenu("menuWidget").addClass("overflow");
    $("#class_mirror").selectmenu({width:174});
    $("#14attrList").selectmenu({width:120});
    $("select[id*='_select']").selectmenu({width:50});
//    $("select[id*='foci']").selectmenu({width:200}).selectmenu("menuWidget").addClass("overflow");
    
    $("select[id*='mirror']").on("selectmenuchange",function(){
	updateFromMirrors(this.id);
    });

    $("#14attrList").on("selectmenuchange",function(){
	attrTo14(this.value);
    });

    $("select[id*='_select']").on("selectmenuchange",function(){
	var attribute = (this.id).slice(0,-7);
	setAttr(attribute,this.value);
	updateAttrSelects(attribute,this.value);
	$("select[id*='_select']").selectmenu("refresh");
    });

    // $("select[id*='foci']").on("selectmenuchange",function(){
    // 	tabulateFoci(); displayFoci(this.value); isolateFoci(); updateSkills();
    // 	$("select[id*='foci']").selectmenu("refresh");
    // });

    $("#growth_button").on("click",function(){
	if ($("#growth_button").attr("class")=="topLayer") rollGrowth();
    });

    $("#learning_button").on("click",function(){
	if ($("#learning_button").attr("class")=="topLayer") rollLearning();
    });
						      
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
var picked_foci = [];

var learning_choice_index = [];

var class_hp_bonus = 0;
var foci_hp_bonus = 0;
var foci_effort_bonus = 0;

function rollDie(sides=6){
    return 1+Math.floor(sides*Math.random());
}

function rollAttr(attrname){
    let attrElem = document.getElementById(attrname+'_attr');
    let total = rollDie(6)+rollDie(6)+rollDie(6);
    attrBases[attrs.indexOf(attrname)] = total;
    attrElem.innerHTML=total + attrBonuses[attrs.indexOf(attrname)];
    updateMod(attrname,total);    
}

function updateMod(attrname){
    let total = parseInt(document.getElementById(attrname+'_attr').innerHTML);
    let modElem = document.getElementById(attrname+'_mod');
    modElem.innerHTML= displayMod(total);

    if(attrname=="constitution"){
	var elemConMod = document.getElementById('constitution_hp_bonus');
	elemConMod.value = computeMod(total);
	totalHP();
    }
    computeEffort();
    updateSavingThrows();
}

function updateSavingThrows(){
    var strength = parseInt(document.getElementById('strength_attr').innerHTML);
    var dexterity = parseInt(document.getElementById('dexterity_attr').innerHTML);
    var constitution = parseInt(document.getElementById('constitution_attr').innerHTML);
    var intelligence = parseInt(document.getElementById('intelligence_attr').innerHTML);
    var wisdom = parseInt(document.getElementById('wisdom_attr').innerHTML);
    var charisma = parseInt(document.getElementById('charisma_attr').innerHTML);
    
    var elemPhysical = document.getElementById("physical_saving_throw");
    var elemMental = document.getElementById("mental_saving_throw");
    var elemEvasion = document.getElementById("evasion_saving_throw");
    
    elemPhysical.innerHTML = 15-computeMod(Math.max(strength,constitution));
    elemEvasion.innerHTML = 15-computeMod(Math.max(dexterity,intelligence));
    elemMental.innerHTML = 15-computeMod(Math.max(wisdom,charisma));
}

function displayMod(roll){
    if (roll == ""|| isNaN(roll)) return "+0";
    if (roll >= 18) return "+2";
    if (roll >= 14) return "+1";
    if (roll >= 8) return "+0";
    if (roll >= 4) return "\u2212"+"1";
    return "\u2212"+"2";
}

function computeMod(roll){
    if (roll == "" || isNaN(roll)) return 0;
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
	    attrElem.innerHTML= parseInt(newValue) + attrBonuses[ind];
	}
	else{
	    attrElem.innerHTML= newValue;
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
    
    elemBackgroundDescription.innerHTML = "";
    
    if (background!=""){

	background_skills.push(backgrounds[background]["free_skill"].slice(0,-2).toLowerCase());
	
	var quickSkills = backgrounds[background]["quick_skills"];

	var elemHeading = document.createElement("h2");
	var elemDescription = document.createElement("span");
	var elemFreeSkill = document.createElement("p");
	var elemQuickSkills = document.createElement("p");


	
	elemHeading.innerHTML = backgrounds[background]["name"];
	elemDescription.innerHTML = backgrounds[background]["description"];
	elemFreeSkill.innerHTML = "<strong>Free Skill</strong>: "+quickSkills[0];
	elemQuickSkills.innerHTML = "<strong>Quick Skills</strong>: "+quickSkills[0]+", "+quickSkills[1]+", "+quickSkills[2];

	elemBackgroundDescription.appendChild(elemHeading);
	elemBackgroundDescription.appendChild(elemDescription);
	elemBackgroundDescription.appendChild(elemFreeSkill);
	elemBackgroundDescription.appendChild(elemQuickSkills);
	
    }
    showGrowthButtons();
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

	lbl0.setAttribute("class","mod");
	lbl1.setAttribute("class","mod");
	lbl2.setAttribute("class","mod");
	lbl3.setAttribute("class","mod");
	lbl4.setAttribute("class","mod");

	
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

	    skillTotal.setAttribute("class","mod");
	    
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
		skillTotal.setAttribute("id",skillKey+'_total');
//		skillName.setAttribute("class","tooltip");
		
		//		node = document.createTextNode(skills[skillKey]["name"]);
		node = document.createElement('span');
		node.innerHTML = skills[skillKey]["name"];
		node.setAttribute("class","tooltip");
		
		tooltipNode = document.createElement('span');
		tooltipNode.innerHTML = skills[skillKey]["description"];
		switch(j){
		case 0:
		    tooltipNode.setAttribute("class","tooltiptext leftcolumn");
		    break;
		case 1:
		    tooltipNode.setAttribute("class","tooltiptext middlecolumn");
		    break;
		case 2:
		    tooltipNode.setAttribute("class","tooltiptext rightcolumn");
		    break;		    
		}
		
		skillName.appendChild(node);
		node.appendChild(tooltipNode);
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
		skillBlock.setAttribute("class","heading");
		var psychicLabel = document.createElement("div");
		psychicLabel.innerHTML = "Psychic";
		psychicLabel.setAttribute("style","text-align: center; font-style:italic;");
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
		    if ((getPsychicDisciplines().length > 0) && (skill!=getPsychicDisciplines()[0] && Class.includes("_psy"))){
			alert("Partial Psychics can only learn one discipline");
			break;	
		    }
		    if (usePsychicSkill()){		
			elemBoxes[i].checked=true;
			picked_skills.push(skill);
			var anyPsychic = displayTechniques(skill);
			$('#psionics_tabs').tabs("option","active",psionic_disciplines.indexOf(skill));
			displayTechniquesTabs(anyPsychic);
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
			var anyPsychic = false;
			var index = 0;
    			for(var discipline of psionic_disciplines){
			    anyPsychic = (displayTechniques(discipline) || anyPsychic);
			    if (!anyPsychic) index++;
			}
			if(anyPsychic) $('#psionics_tabs').tabs("option","active",index);
			displayTechniquesTabs(anyPsychic);
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
    computeEffort();
    
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
    elem1.setAttribute("class","topLayer");
    elem2.setAttribute("class","topLayer");
    

    updateSkills();
    

}

function hideGrowthButtons(){
    let elem1=document.getElementById("growth_button");
    let elem2=document.getElementById("learning_button");
//    elem1.style.display= 'none';
//    elem2.style.display= 'none';
    
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
	elemGrowthButton.setAttribute("class","deactivated");
	elemLearningButton.setAttribute("class","deactivated");
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
	elemGrowthButton.setAttribute("class","deactivated");
	elemLearningButton.setAttribute("class","deactivated");
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
	    width: 440,
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
	    width: 430,
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
	if((key!="psychic_training")&&(key!="wild_psychic_talent")){
	    if(type == "combat" || type == "both") elem2.add(option2);
	    if(type == "noncombat" || type == "both") elem3.add(option3);
	}
    }
}

function countAppearances(elem, array){
    var count = 0;
    for (var item of array){
	if (item == elem) count++;
    }
    return count;
}

function displayFoci(focus) {
    let elemFociDescription = document.getElementById("foci_description");
    
    elemFociDescription.innerHTML = "";
    
    if(focus!=""){
	
	elemFociDescription.innerHTML = "<h2>"+foci[focus]["name"]+"</h2>"+foci[focus]["description"];

	var elemFocusLevel1 = document.createElement("p");
	var elemFocusLevel2 = document.createElement("p");

	elemFocusLevel2.setAttribute("id","focus_level_2");
	if(countAppearances(focus,picked_foci)>1){
	    elemFocusLevel2.setAttribute("style","opacity:1.");
	}
	else{
	    elemFocusLevel2.setAttribute("style","opacity:0.5");
	}

	if(foci[focus]["level1"] != "")	elemFocusLevel1.innerHTML = '<strong>Level 1</strong>: '+foci[focus]["level1"];
	if(foci[focus]["level2"] != "")	elemFocusLevel2.innerHTML = '<strong>Level 2</strong>: '+foci[focus]["level2"];

	elemFociDescription.appendChild(elemFocusLevel1);
	elemFociDescription.appendChild(elemFocusLevel2);
    }
}

function tabulateFoci(){
    var elemFoci = document.getElementById("foci");
    var elemCombatFoci = document.getElementById("combat_foci");
    var elemNonCombatFoci = document.getElementById("noncombat_foci");

    var fociOption = elemFoci.options[elemFoci.selectedIndex];
    var combatFociOption = elemCombatFoci.options[elemCombatFoci.selectedIndex];
    var nonCombatFociOption = elemNonCombatFoci.options[elemNonCombatFoci.selectedIndex];

    var elemClass = document.getElementById("class");
    var Class = elemClass.value;

    foci_skills=[];
    picked_skills=[];
    picked_foci=[];
    
    if(fociOption.value!=""){
	foci_skills.push(foci[fociOption.value]["skill"]);
	picked_foci.push(fociOption.value);
    }

    if(combatFociOption.value !=""){
	if((Class=="warrior"||Class=="war_exp") || Class=="war_psy"){

	    picked_foci.push(combatFociOption.value);

	    if(combatFociOption.value!=fociOption.value){
		foci_skills.push(foci[combatFociOption.value]["skill"]);
	    }    
	}
    }

    if(nonCombatFociOption.value !=""){
	if(Class=="expert" || Class=="exp_psy"){

	    picked_foci.push(nonCombatFociOption.value);
	    
	    if(nonCombatFociOption.value!=fociOption.value){
		foci_skills.push(foci[nonCombatFociOption.value]["skill"]);
	    }
	}
	else if (Class=="war_exp"){
	    picked_foci.push(nonCombatFociOption.value);
	    if(nonCombatFociOption.value!=fociOption.value && nonCombatFociOption.value!=combatFociOption.value){
		foci_skills.push(foci[nonCombatFociOption.value]["skill"]);
	    }
	}
    }

    if (picked_foci.includes("die_hard")){
	foci_hp_bonus = 2;
    }
    else{
	foci_hp_bonus = 0;
    }

    if (picked_foci.includes("psychic_training")){
	foci_effort_bonus = 1;
    }
    else{
	foci_effort_bonus = 0;
    }
    
    var elemClassBonus = document.getElementById('class_hp_bonus');
    elemClassBonus.value = combineHPBonuses(class_hp_bonus,foci_hp_bonus);
	
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

    var anyPsychic = false;
    
    for(var discipline of psionic_disciplines) anyPsychic = (displayTechniques(discipline) || anyPsychic);    
    displayTechniquesTabs(anyPsychic);
}

function updateMirrors(id){

    var elem = document.getElementById(id);
    var elemMirror = document.getElementById(id+'_mirror');

    if (elem.tagName=="SELECT"){
	elemMirror.selectedIndex = elem.selectedIndex;
	$('#'+id+'_mirror').selectmenu().val(elem.value);
	$('#'+id+'_mirror').selectmenu("refresh");
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
	//	elem.selectedIndex = elemMirror.selectedIndex;
	elem.value = $('#'+idMirror).selectmenu().val();
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
    var elemAttackBonus = document.getElementById('attack_bonus');
    
    var Class = elemClass.value;

    restrictFoci(Class);
    
    var elemClassDescription = document.getElementById("class_description");
    elemClassDescription.innerHTML = "";
    if (Class==""){
	class_skills=[];
	hideCombatFoci();
	hideNonCombatFoci();
	class_hp_bonus = 0;
	elemClassBonus.value = combineHPBonuses(class_hp_bonus,foci_hp_bonus);
	elemAttackBonus.innerHTML = "+0";

	$('#tabs').tabs('option', 'active',0) ;
    }
    else{
	var elemClassName = document.createElement("h2")
	elemClassName.innerHTML = classes[Class]["name"];

	var elemClassDescriptionText = document.createElement("p");
	elemClassDescriptionText.innerHTML = classes[Class]["description"];

	elemClassDescription.appendChild(elemClassName);
	elemClassDescription.appendChild(elemClassDescriptionText);

	var elemAbilities;
	
	var abilities = classes[Class]["abilities"];
	
	if (Class.indexOf("_")==-1){
	    elemAbilities = document.createElement("ul");
	    
	    var elemAbilitiesTitle = document.createElement("h4");
	    elemAbilitiesTitle.innerHTML = "Class Abilities";
	    elemClassDescription.appendChild(elemAbilitiesTitle);
	    
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

	var elemHPTitle = document.createElement("h4");
	elemHPTitle.innerHTML = "Hit Points and Attack Bonus";

	var elemHP = document.createElement("p");
	elemHP.innerHTML = classes[Class]["hp"];

	elemClassDescription.appendChild(elemAbilities);
	elemClassDescription.appendChild(elemHPTitle);
	elemClassDescription.appendChild(elemHP);

	if(Class=="psychic"){
	    class_skills=["any psychic","any psychic"];
	    hideCombatFoci();
	    hideNonCombatFoci();
	    class_hp_bonus = 0;
	    elemClassBonus.value = combineHPBonuses(class_hp_bonus,foci_hp_bonus);
	    elemAttackBonus.innerHTML = "+0";
	    
            $('#tabs').tabs('option', 'active',0);
	    
	}
	else if(Class=="warrior"){
	    class_skills=[];
	    showCombatFoci();
	    hideNonCombatFoci();
	    class_hp_bonus = 2;
	    elemClassBonus.value = combineHPBonuses(class_hp_bonus,foci_hp_bonus);
	    elemAttackBonus.innerHTML = "+1";

	    if($('#tabs').tabs('option', 'active')==2) $('#tabs').tabs('option', 'active',1) ;
	}
	else if(Class=="expert"){
	    class_skills=[];
	    hideCombatFoci();
	    showNonCombatFoci();
	    class_hp_bonus = 0;
	    elemClassBonus.value = combineHPBonuses(class_hp_bonus,foci_hp_bonus);
	    elemAttackBonus.innerHTML = "+0";

	    if($('#tabs').tabs('option', 'active')==1) $('#tabs').tabs('option', 'active',2) ;
	}
	else if(Class=="war_exp"){
	    class_skills=[];
	    showCombatFoci();
	    showNonCombatFoci();
	    class_hp_bonus = 2;
	    elemClassBonus.value = combineHPBonuses(class_hp_bonus,foci_hp_bonus);
	    elemAttackBonus.innerHTML = "+1";
	}
	else if(Class=="war_psy"){
	    class_skills=["any psychic"];
	    showCombatFoci();
	    hideNonCombatFoci();
	    class_hp_bonus = 2;
	    elemClassBonus.value = combineHPBonuses(class_hp_bonus,foci_hp_bonus);
	    elemAttackBonus.innerHTML = "+1";

	    if($('#tabs').tabs('option', 'active')==2) $('#tabs').tabs('option', 'active',1) ;
	}
	else if(Class=="exp_psy"){
	    class_skills=["any psychic"];
	    hideCombatFoci();
	    showNonCombatFoci();
	    class_hp_bonus = 0;
	    elemClassBonus.value = combineHPBonuses(class_hp_bonus,foci_hp_bonus);
	    elemAttackBonus.innerHTML = "+0";

	    if($('#tabs').tabs('option', 'active')==1) $('#tabs').tabs('option', 'active',2) ;
	}
    }
    totalHP();
    computeEffort();
}

function combineHPBonuses(class_bonus, foci_bonus){
    var tot=parseInt(class_bonus)+parseInt(foci_bonus);
    if (tot==0) return "";
    return tot;
}

function restrictFoci(Class){

    if((Class=="psychic")||(Class=="war_psy")||(Class=="exp_psy")){
	restrictFociPsychic();
    }
    else if((Class=="expert")||(Class=="warrior")||(Class=="war_exp")){
	restrictFociNonPsychic();
    }
    else{
	unrestrictFoci();
    }
    
    
}

function isolateFoci(){  
    var elemFoci = document.getElementById("foci");
    var elemCombatFoci = document.getElementById("combat_foci");
    var elemNonCombatFoci = document.getElementById("noncombat_foci");

    var fociOption = elemFoci.options[elemFoci.selectedIndex];
    var combatFociOption = elemCombatFoci.options[elemCombatFoci.selectedIndex];
    var nonCombatFociOption = elemNonCombatFoci.options[elemNonCombatFoci.selectedIndex];
    
    for (var opt of elemFoci.options){
	if((opt.value==combatFociOption.value && opt.value==nonCombatFociOption.value) &&(opt.value != "")){
	    opt.disabled="true";
	}
	else{
	    opt.removeAttribute("disabled");
	}
    }
    for (var opt of elemCombatFoci.options){
	if((opt.value==fociOption.value && opt.value==nonCombatFociOption.value) &&(opt.value != "")){
	    opt.disabled="true";
	}
	else{
	    opt.removeAttribute("disabled");
	}
    }
    for (var opt of elemNonCombatFoci.options){
	if((opt.value==combatFociOption.value && opt.value==fociOption.value) &&(opt.value != "")){
	    opt.disabled="true";
	}
	else{
	    opt.removeAttribute("disabled");
	}
    }

    var elemClass = document.getElementById("class");
    restrictFoci(elemClass.value);

}

function showCombatFoci(){
    var elem = document.getElementById("combat_foci_tab");
    elem.style.display = "inline";
}

function hideCombatFoci(){
    var elem = document.getElementById("combat_foci_tab");
    elem.selectedIndex = 0;
    elem.style.display = "none";
    isolateFoci();
}

function showNonCombatFoci(){
    var elem = document.getElementById("noncombat_foci_tab");
    elem.style.display = "inline";

}

function hideNonCombatFoci(){
    var elem = document.getElementById("noncombat_foci_tab");
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
	
	elemCoreName.innerHTML = psionics[discipline]["core"]["name"];
	elemCoreDescription.innerHTML = psionics[discipline]["core"]["description"];
	elemCoreLevel0.innerHTML = "<strong>Level-0:</strong> "+psionics[discipline]["core"]["level0"];
	elemCoreLevel1.innerHTML = "<strong>Level-1:</strong> "+psionics[discipline]["core"]["level1"];

	elemCoreName.setAttribute("id",discipline+'_core_name');
	elemCoreDescription.setAttribute("id",discipline+'_core_description_text');
	elemCoreLevel0.setAttribute("id",discipline+'_core_level0_text');
	elemCoreLevel1.setAttribute("id",discipline+'_core_level1_text');

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

    var elemTab = document.getElementById(discipline+'_tab');
    
    var elemHeading = document.getElementById(discipline+'_heading');
    var elemCoreHeading = document.getElementById(discipline+'_core_heading');
    var elemCoreText = document.getElementById(discipline+'_core_description');
    var elemCoreLevel1Text = document.getElementById(discipline+'_core_level1_text');
    var elemLevel1 = document.getElementById(discipline+'_level1');
    var elemLevel1Heading = document.getElementById(discipline+'_level1_heading');
    var elemLevel1Text = document.getElementById(discipline+'_level1_description');


    elemTab.style.display = 'none';
    elemCoreHeading.style.display = 'none';
    elemHeading.style.display = 'none';
    elemCoreText.style.display = 'none';
    elemLevel1.style.display = 'none';
    elemLevel1Text.style.display = 'none';
    elemLevel1Heading.style.display = 'none';

    if (elemRankBox0.checked){
	elemTab.style.display = 'block';
	elemHeading.style.display = 'inline';
	elemCoreHeading.style.display = 'block';
	elemCoreText.style.display = 'block';
	elemCoreLevel1Text.style.opacity = '0.5';
	if(elemRankBox1.checked){
	    elemLevel1.style.display = 'block';
	    elemLevel1Heading.style.display = 'inline-block';
	    elemLevel1Text.style.display = 'block';
	    elemCoreLevel1Text.style.opacity = '1';
	}
	return true;
    }
    return false;
}

function displayTechniquesTabs(anyPsychic){
    var elem = document.getElementById("psionics_tabs");
    var elem2 = document.getElementById("psionics_instruction");

    if (anyPsychic){
	elem.style.display = "block";
	elem2.style.display = "none";
    }
    else{
	elem.style.display = "none";
	elem2.style.display = "block";
    }
}

function displayTechniqueInfo(discipline, technique){
    var elemLevel1Text = document.getElementById(discipline+'_level1_description');
    if (technique == ""){
	elemLevel1Text.innerHTML = "";
    }
    else{
	elemLevel1Text.innerHTML = "<h4>"+technique+"</h4>"+psionics[discipline]["level1"][technique];
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

    var elemMirror1 = document.getElementById('hp_mirror1');
    var elemMirror2 = document.getElementById('hp_mirror2');

    var roll = 0;
    var con = 0;
    var bonus = 0;

    if (elemRoll.value!="") roll=parseInt(elemRoll.value);
    if (elemConMod.value!="") con=parseInt(elemConMod.value);
    if (elemClassBonus.value!="") bonus=parseInt(elemClassBonus.value);
    
    if((elemRoll.value!="" || elemConMod.value!="") || elemClassBonus.value!=""){
	elemTotal.value = Math.max(roll+con+bonus,1);
	elemMirror1.innerHTML = Math.max(roll+con+bonus,1);
	elemMirror2.innerHTML = Math.max(roll+con+bonus,1);
    }
    else{
	elemTotal.value = "";
	elemMirror1.innerHTML = "";
	elemMirror2.innerHTML = "";
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

    var optionSpacer = document.createElement("option");
    optionSpacer.setAttribute("disabled","true");
    optionSpacer.text = "";
    optionSpacer.value = "";
    elem.add(optionSpacer);
    
    var option = document.createElement("option");
    option.text = "Custom";
    option.value = "custom";
    elem.add(option);
    
}

function displayEquipmentPackage(Package){
    var elemEquipmentPackageDescription = document.getElementById("equipment_packages_description")

    var packageList = document.createElement("ul")

    elemEquipmentPackageDescription.innerHTML = "";
    
    if (Package != ""){
	if(Package == "custom"){
	    var elemItem = document.createElement("li");
	    elemItem.innerHTML = (rollDie(6)+rollDie(6))*100+" credits";
	    packageList.appendChild(elemItem);
	}
	else{
	    for (var item of packages[Package]["items"]){
		var elemItem = document.createElement("li");
		elemItem.innerHTML = item;
		packageList.appendChild(elemItem);
	    }
	}
    }
    

    elemEquipmentPackageDescription.appendChild(packageList);
}

function restrictFociPsychic(){

    var elemFoci = document.getElementById('foci');
    var elemCombatFoci = document.getElementById('combat_foci');
    var elemNonCombatFoci = document.getElementById('noncombat_foci');

    var fociOption = elemFoci.options[elemFoci.selectedIndex];
    var combatFociOption = elemCombatFoci.options[elemCombatFoci.selectedIndex];
    var nonCombatFociOption = elemNonCombatFoci.options[elemNonCombatFoci.selectedIndex];
    
//    $("#elemFoci").selectmenu("destroy");
    
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("wild_psychic_talent")].disabled="disabled";
    
    if(elemFoci.selectedIndex == optionsToValueArray(elemFoci.options).indexOf("wild_psychic_talent")){
	elemFoci.selectedIndex = 0;
	displayFoci("");
	
	while(foci_skills.indexOf("any psychic") > -1){
	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
	}
    }

//    $("#elemFoci").selectmenu("refresh");
//    $("#elemFoci").selectmenu();

    // if((combatFociOption.value!="psychic_training") || (nonCombatFociOption.value!="psychic_training")){
    // 	elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    // }
    // elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("wild_psychic_talent")].disabled="true";

    // if(elemFoci.selectedIndex == optionsToValueArray(elemFoci.options).indexOf("wild_psychic_talent")){
    // 	elemFoci.selectedIndex = 0;

    // 	while(foci_skills.indexOf("any psychic") > -1){
    // 	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
    // 	}
	
    // }
    
    // if((fociOption.value!="psychic_training") || (nonCombatFociOption.value!="psychic_training")){
    // 	elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    // }
    // elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("wild_psychic_talent")].disabled="true";

    // if(elemCombatFoci.selectedIndex == optionsToValueArray(elemCombatFoci.options).indexOf("wild_psychic_talent")){
    // 	elemCombatFoci.selectedIndex = 0;
    // 	while(foci_skills.indexOf("any psychic") > -1){
    // 	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
    // 	}

    // }

    // if((fociOption.value!="psychic_training") || (combatFociOption.value!="psychic_training")){
    // 	elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    // }
    // elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("wild_psychic_talent")].disabled="true";

    // if(elemNonCombatFoci.selectedIndex == optionsToValueArray(elemNonCombatFoci.options).indexOf("wild_psychic_talent")){
    // 	elemNonCombatFoci.selectedIndex = 0;
    // 	while(foci_skills.indexOf("any psychic") > -1){
    // 	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
    // 	}

    // }

}

function restrictFociNonPsychic(){

    var elemFoci = document.getElementById('foci');
    var elemCombatFoci = document.getElementById('combat_foci');
    var elemNonCombatFoci = document.getElementById('noncombat_foci');

    var fociOption = elemFoci.options[elemFoci.selectedIndex];
    var combatFociOption = elemCombatFoci.options[elemCombatFoci.selectedIndex];
    var nonCombatFociOption = elemNonCombatFoci.options[elemNonCombatFoci.selectedIndex];

    //$("#elemFoci").selectmenu("destroy");
    
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("psychic_training")].disabled="disabled";

    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");
        
    if(elemFoci.selectedIndex == optionsToValueArray(elemFoci.options).indexOf("psychic_training")){
	elemFoci.selectedIndex = 0;
	displayFoci("");
	
	while(foci_skills.indexOf("any psychic") > -1){
	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
	}
    }

//    $("#elemFoci").selectmenu("refresh");
//    $("#elemFoci").selectmenu();
    
    // elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("psychic_training")].disabled="true";
    // if((fociOption.value!="wild_psychic_talent") || (nonCombatFociOption.value!="wild_psychic_talent")){
    // 	elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");
    // }

    // if(elemCombatFoci.selectedIndex == optionsToValueArray(elemCombatFoci.options).indexOf("psychic_training")){
    // 	elemCombatFoci.selectedIndex = 0;
    // 	while(foci_skills.indexOf("any psychic") > -1){
    // 	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
    // 	}
    // }
    
    // elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("psychic_training")].disabled="true";
    // if((fociOption.value!="wild_psychic_talent") || (combatFociOption.value!="wild_psychic_talent")){
    // 	elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");
    // }

    // if(elemNonCombatFoci.selectedIndex == optionsToValueArray(elemNonCombatFoci.options).indexOf("psychic_training")){
    // 	elemNonCombatFoci.selectedIndex = 0;
    // 	while(foci_skills.indexOf("any psychic") > -1){
    // 	    foci_skills.splice(foci_skills.indexOf("any psychic"),1);
    // 	}
    // }

}

function unrestrictFoci(){

    var elemFoci = document.getElementById('foci');
    var elemCombatFoci = document.getElementById('combat_foci');
    var elemNonCombatFoci = document.getElementById('noncombat_foci');

    //    $("#elemFoci").selectmenu("destroy");
    
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    elemFoci.options[optionsToValueArray(elemFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");
    
    // elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    // elemCombatFoci.options[optionsToValueArray(elemCombatFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");
    
    // elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("psychic_training")].removeAttribute("disabled");
    // elemNonCombatFoci.options[optionsToValueArray(elemNonCombatFoci.options).indexOf("wild_psychic_talent")].removeAttribute("disabled");

//    $("#elemFoci").selectmenu();

}

function computeEffort(){
    var elemEffort = document.getElementById("effort");
    var elemCon = document.getElementById("constitution_attr");
    var elemWis = document.getElementById("wisdom_attr");
    var elemClass = document.getElementById("class");

    var maxEffort = 0;
    var maxPsychicSkill=0;
    
    for (var discipline of psionic_disciplines){
	if($("#"+discipline+"_total").html()!=""){
	    maxPsychicSkill= Math.max(maxPsychicSkill,parseInt($("#"+discipline+"_total").html()));
	}
    }

    if(elemClass.value.includes("psy")){
	maxEffort = Math.max(1,1 + maxPsychicSkill + foci_effort_bonus + computeMod(Math.max(parseInt(elemCon.innerHTML),parseInt(elemWis.innerHTML))));
    }
    else if(picked_foci.includes("wild_psychic_talent")){
	maxEffort = 1;
    }
	    
    
    elemEffort.innerHTML = maxEffort;
}

function fillOutSheetPage1(){
    var elem = document.getElementById("character_sheet");  
    $("#character_sheet p").remove();
    $("#character_sheet #form_portrait").remove();
    
    
    var name = document.createElement("p");
    var background = document.createElement("p");
    var Class  = document.createElement("p");
    var subclass  = document.createElement("p");
    var level = document.createElement("p");
    var homeworld = document.createElement("p");
    var employer = document.createElement("p");
    var species = document.createElement("p");
    var hp = document.createElement("p");
    var strain = document.createElement("p");
    var physical = document.createElement("p");
    var mental = document.createElement("p");
    var evasion = document.createElement("p");
    var strength = document.createElement("p");
    var dexterity = document.createElement("p");
    var constitution = document.createElement("p");
    var intelligence = document.createElement("p");
    var wisdom  = document.createElement("p");
    var charisma  = document.createElement("p");
    var effort = document.createElement("p");
    var BAB = document.createElement("p");
    var strength_mod = document.createElement("p");
    var dexterity_mod = document.createElement("p");
    var constitution_mod = document.createElement("p");
    var intelligence_mod = document.createElement("p");
    var wisdom_mod = document.createElement("p");
    var charisma_mod = document.createElement("p");
    var foci1 = document.createElement("p");
    var foci1_level = document.createElement("p");
    var foci2 = document.createElement("p");
    var foci2_level = document.createElement("p");
    var foci3 = document.createElement("p");
    var foci3_level = document.createElement("p");
    var administer = document.createElement("p");
    var connect = document.createElement("p");
    var exert = document.createElement("p");
    var fix = document.createElement("p");
    var heal = document.createElement("p");
    var know = document.createElement("p");
    var lead = document.createElement("p");
    var notice  = document.createElement("p");
    var perform = document.createElement("p");
    var pilot = document.createElement("p");
    var program = document.createElement("p");
    var punch = document.createElement("p");
    var shoot = document.createElement("p");
    var sneak = document.createElement("p");
    var stab = document.createElement("p");
    var survive = document.createElement("p");
    var talk = document.createElement("p");
    var trade = document.createElement("p");
    var work = document.createElement("p");
    var biopsionics = document.createElement("p");
    var metapsionics = document.createElement("p");
    var precognition = document.createElement("p");
    var telekinesis = document.createElement("p");
    var telepathy = document.createElement("p");
    var teleportation = document.createElement("p");
    var weapon1_name  = document.createElement("p");
    var weapon1_bonus  = document.createElement("p");
    var weapon1_damage = document.createElement("p");
    var weapon1_shock  = document.createElement("p");
    var weapon2_name  = document.createElement("p");
    var weapon2_bonus  = document.createElement("p");
    var weapon2_damage = document.createElement("p");
    var weapon2_shock  = document.createElement("p");
    var armor1_name = document.createElement("p");
    var armor1_AC  = document.createElement("p");
    var armor2_name = document.createElement("p");
    var armor2_AC = document.createElement("p");
    var credits =  document.createElement("p");
    var technique = document.createElement("p");

    var portrait = document.createElement("img");


    var skillElements = [administer, connect, exert, fix, heal, know, lead, notice, perform, pilot, program, punch, shoot, sneak, stab, survive, talk, trade, work, biopsionics, metapsionics, precognition, telekinesis, telepathy, teleportation];
    
    var formElements = [name, background, Class, subclass, level, homeworld, employer, species, hp, strain, physical, evasion, mental, strength, dexterity, constitution, intelligence, wisdom, charisma, effort, BAB, strength_mod, dexterity_mod, constitution_mod, intelligence_mod, wisdom_mod, charisma_mod, foci1, foci2, foci3, foci1_level, foci2_level, foci3_level, weapon1_name, weapon1_bonus, weapon1_damage, weapon1_shock, weapon2_name, weapon2_bonus, weapon2_damage, weapon2_shock, armor1_name, armor1_AC, armor2_name, armor2_AC,credits, technique].concat(skillElements);
    
    for (var element of formElements){
	element.setAttribute("class","formText");
	element.setAttribute("id","form_element_"+formElements.indexOf(element));
	elem.appendChild(element);
    }

    elem.appendChild(portrait);
    
    name.innerHTML = $("#name").val();
    background.innerHTML = $("#backgrounds_mirror option:selected").text();

    if($("#class_mirror option:selected").text().includes("/")){
	Class.innerHTML = "Adventurer";
	subclass.innerHTML = ($("#class_mirror option:selected").text()+" ").slice(4,-1);
	
    }
    else{
	Class.innerHTML = $("#class_mirror option:selected").text();
	subclass.innerHTML = "";
    }

    level.innerHTML="1";
    homeworld.innerHTML = $("#homeworld").val();
    employer.innerHTML = $("#employer").val();
    species.innerHTML = $("#species").val();
    hp.innerHTML = $("#hp_mirror1").html();
    strain.innerHTML = $("#constitution_attr").html();
    physical.innerHTML = $("#physical_saving_throw").html();
    evasion.innerHTML = $("#evasion_saving_throw").html();
    mental.innerHTML = $("#mental_saving_throw").html();
    strength.innerHTML = $("#strength_attr").html();
    strength_mod.innerHTML = $("#strength_mod").html();
    dexterity.innerHTML = $("#dexterity_attr").html();
    dexterity_mod.innerHTML = $("#dexterity_mod").html();
    constitution.innerHTML = $("#constitution_attr").html();
    constitution_mod.innerHTML = $("#constitution_mod").html();
    intelligence.innerHTML = $("#intelligence_attr").html();
    intelligence_mod.innerHTML = $("#intelligence_mod").html();
    wisdom.innerHTML = $("#wisdom_attr").html();
    wisdom_mod.innerHTML = $("#wisdom_mod").html();
    charisma.innerHTML = $("#charisma_attr").html();
    charisma_mod.innerHTML = $("#charisma_mod").html();
    effort.innerHTML = $("#effort").html();
    BAB.innerHTML = $("#attack_bonus").html();

    var fociElems = [foci1, foci2, foci3];
    var fociLevelElems = [foci1_level, foci2_level, foci3_level];
    var usedFoci = [];
    var sorted_picks = picked_foci;
    sorted_picks.sort();
    for (var i =0; i< 3; i++){
	if(i< sorted_picks.length){
	    if(usedFoci.includes(sorted_picks[i])){
		fociElems[i].innerHTML = "<strong>"+foci[sorted_picks[i]]["name"]+":</strong> "+foci[sorted_picks[i]]["level2abbreviated"];
		fociLevelElems[i].innerHTML = "2";
	    }
	    else{
		fociElems[i].innerHTML = "<strong>"+foci[sorted_picks[i]]["name"]+":</strong> "+foci[sorted_picks[i]]["level1abbreviated"];
		fociLevelElems[i].innerHTML = "1";
	    }
	    usedFoci.push(sorted_picks[i]);
	}
	else{
	    fociElems[i].innerHTML = "";
	    fociLevelElems[i].innerHTML = "";
	}
    }  
    
    var skillKeys = Object.keys(skills);
    
    var zippedSkills = skillElements.map(function(e, i) {
	return [e, skillKeys[i]];
    });

    for (var zip of zippedSkills){
    	zip[0].innerHTML = $("#"+zip[1]+"_total").html();
    }


    var strengthMod = computeMod(parseInt(strength.innerHTML));
    var dexterityMod = computeMod(parseInt(dexterity.innerHTML));
    var attackMod = parseInt(($("#attack_bonus").html()).slice(1,2));
    
    var melee_bonus = attackMod+strengthMod;
    var ranged_bonus = attackMod+dexterityMod;

    var maxMod = Math.max(strengthMod,dexterityMod);
    
    switch($("#equipment_packages").val()){
    case "barbarian":
    	weapon1_name.innerHTML = "Spear";
	weapon2_name.innerHTML = "Knife";

	weapon1_damage.innerHTML = "1d6"+displayBonus((1+maxMod));
	weapon1_bonus.innerHTML = displayBonus((attackMod+maxMod+skillToAttackBonus(stab.innerHTML)));
	weapon1_shock.innerHTML = "Shock: "+(2+maxMod)+"/AC13";
    	weapon2_damage.innerHTML = "1d4"+displayBonus(maxMod);
	weapon2_bonus.innerHTML = displayBonus((attackMod+maxMod+skillToAttackBonus(stab.innerHTML)));
	weapon2_shock.innerHTML = "Shock: "+(1+maxMod)+"/AC15";

	armor1_name.innerHTML = "Primitive hide armor w/ shield";
	armor2_name.innerHTML = "Primitive hide armor";
	
	armor1_AC.innerHTML = 14+dexterityMod;
	armor2_AC.innerHTML = 13+dexterityMod;

	credits.innerHTML = 500+" credits";
	break;
    case "blade":
    	weapon1_name.innerHTML = "Monoblade sword";
	weapon2_name.innerHTML = "Thermal knife";

	weapon1_damage.innerHTML = "1d8"+displayBonus((1+maxMod));
	weapon1_bonus.innerHTML = displayBonus((attackMod+maxMod+skillToAttackBonus(stab.innerHTML)));
	weapon1_shock.innerHTML = "Shock: "+(2+maxMod)+"/AC13";
    	weapon2_damage.innerHTML = "1d6"+displayBonus(maxMod);
	weapon2_bonus.innerHTML = displayBonus((attackMod+maxMod+skillToAttackBonus(stab.innerHTML)));
	weapon2_shock.innerHTML = "Shock: "+(1+maxMod)+"/AC15";

	armor1_name.innerHTML = "Woven body armor";
	armor2_name.innerHTML = "Secure clothing";
	
	armor1_AC.innerHTML = 15+dexterityMod;
	armor2_AC.innerHTML = 13+dexterityMod;

	credits.innerHTML = 50+" credits";
	break;
    case "thief":
    	weapon1_name.innerHTML = "Laser pistol";
	weapon2_name.innerHTML = "Monoblade knife";

	weapon1_damage.innerHTML = "1d6"+displayBonus((dexterityMod));
	weapon1_bonus.innerHTML = displayBonus((1+ranged_bonus+skillToAttackBonus(shoot.innerHTML)));
	weapon1_shock.innerHTML = "";
    	weapon2_damage.innerHTML = "1d6"+displayBonus(maxMod);
	weapon2_bonus.innerHTML = displayBonus((attackMod+maxMod+skillToAttackBonus(stab.innerHTML)));
	weapon2_shock.innerHTML = "Shock: "+(1+maxMod)+"/AC15";

	armor1_name.innerHTML = "Armored undersuit";
	armor2_name.innerHTML = "";
	
	armor1_AC.innerHTML = 13+dexterityMod;
	armor2_AC.innerHTML = "";

	credits.innerHTML = 25+" credits";
	break;
    case "hacker":
    	weapon1_name.innerHTML = "Laser pistol";
	weapon2_name.innerHTML = "";

	weapon1_damage.innerHTML = "1d6"+displayBonus((dexterityMod));
	weapon1_bonus.innerHTML = displayBonus((1+ranged_bonus+skillToAttackBonus(shoot.innerHTML)));
	weapon1_shock.innerHTML = "";
    	weapon2_damage.innerHTML = "";
	weapon2_bonus.innerHTML = "";
	weapon2_shock.innerHTML = "";
	
	armor1_name.innerHTML = "Secure clothing";
	armor2_name.innerHTML = "";
	
	armor1_AC.innerHTML = 13+dexterityMod;
	armor2_AC.innerHTML = "";

	credits.innerHTML = 100+" credits";
	break;
    case "gunslinger":
    	weapon1_name.innerHTML = "Laser pistol";
	weapon2_name.innerHTML = "Monoblade knife";

	weapon1_damage.innerHTML = "1d6"+displayBonus((dexterityMod));
	weapon1_bonus.innerHTML = displayBonus((1+ranged_bonus+skillToAttackBonus(shoot.innerHTML)));
	weapon1_shock.innerHTML = "";
    	weapon2_damage.innerHTML = "1d6"+displayBonus(maxMod);
	weapon2_bonus.innerHTML = displayBonus((attackMod+maxMod+skillToAttackBonus(stab.innerHTML)));
	weapon2_shock.innerHTML = "Shock: "+(1+maxMod)+"/AC15";
	
	armor1_name.innerHTML = "Armored undersuit";
	armor2_name.innerHTML = "";
	
	armor1_AC.innerHTML = 13+dexterityMod;
	armor2_AC.innerHTML = "";

	credits.innerHTML = 100+" credits";
	break;
    case "soldier":
    	weapon1_name.innerHTML = "Combat rifle";
	weapon2_name.innerHTML = "Knife";

	weapon1_damage.innerHTML = "1d12"+displayBonus((dexterityMod));
	weapon1_bonus.innerHTML = displayBonus((ranged_bonus+skillToAttackBonus(shoot.innerHTML)));
	weapon1_shock.innerHTML = "";
    	weapon2_damage.innerHTML = "1d4"+displayBonus(maxMod);
	weapon2_bonus.innerHTML = displayBonus((attackMod+maxMod+skillToAttackBonus(stab.innerHTML)));
	weapon2_shock.innerHTML = "Shock: "+(1+maxMod)+"/AC15";
	
	armor1_name.innerHTML = "Woven body armor";
	armor2_name.innerHTML = "";
	
	armor1_AC.innerHTML = 15+dexterityMod;
	armor2_AC.innerHTML = "";

	credits.innerHTML = 100+" credits";
	break;
    case "scout":
    	weapon1_name.innerHTML = "Laser rifle";
	weapon2_name.innerHTML = "Knife";

	weapon1_damage.innerHTML = "1d10"+displayBonus((dexterityMod));
	weapon1_bonus.innerHTML = displayBonus((1+ranged_bonus+skillToAttackBonus(shoot.innerHTML)));
	weapon1_shock.innerHTML = "";
    	weapon2_damage.innerHTML = "1d4"+displayBonus(maxMod);
	weapon2_bonus.innerHTML = displayBonus((attackMod+maxMod+skillToAttackBonus(stab.innerHTML)));
	weapon2_shock.innerHTML = "Shock: "+(1+maxMod)+"/AC15";

	armor1_name.innerHTML = "Armored vacc suit";
	armor2_name.innerHTML = "";
	
	armor1_AC.innerHTML = 13+dexterityMod;
	armor2_AC.innerHTML = "";

	credits.innerHTML = 25+" credits";
	break;
    case "medic":
    	weapon1_name.innerHTML = "Laser pistol";
	weapon2_name.innerHTML = "";

	weapon1_damage.innerHTML = "1d6"+displayBonus((dexterityMod));
	weapon1_bonus.innerHTML = displayBonus((1+ranged_bonus+skillToAttackBonus(shoot.innerHTML)));
	weapon1_shock.innerHTML = "";
    	weapon2_damage.innerHTML = "";
	weapon2_bonus.innerHTML = "";
	weapon2_shock.innerHTML = "";
	
	armor1_name.innerHTML = "Secure clothing";
	armor2_name.innerHTML = "";
	
	armor1_AC.innerHTML = 13+dexterityMod;
	armor2_AC.innerHTML = "";

	credits.innerHTML = 25+" credits";
	break;
    case "civilian":
    	weapon1_name.innerHTML = "";
	weapon2_name.innerHTML = "";

	weapon1_damage.innerHTML = "";
	weapon1_bonus.innerHTML = "";
	weapon1_shock.innerHTML = "";
    	weapon2_damage.innerHTML = "";
	weapon2_bonus.innerHTML = "";
	weapon2_shock.innerHTML = "";
		
	armor1_name.innerHTML = "Secure clothing";
	armor2_name.innerHTML = "";
	
	armor1_AC.innerHTML = 13+dexterityMod;
	armor2_AC.innerHTML = "";

	credits.innerHTML = 700+" credits";
	break;
    case "technician":
    	weapon1_name.innerHTML = "Laser pistol";
	weapon2_name.innerHTML = "Monoblade knife";
	
	weapon1_damage.innerHTML = "1d6"+displayBonus((dexterityMod));
	weapon1_bonus.innerHTML = displayBonus((1+ranged_bonus+skillToAttackBonus(shoot.innerHTML)));
	weapon1_shock.innerHTML = "";
    	weapon2_damage.innerHTML = "1d6"+displayBonus(maxMod);
	weapon2_bonus.innerHTML = displayBonus((attackMod+maxMod+skillToAttackBonus(stab.innerHTML)));
	weapon2_shock.innerHTML = "Shock: "+(1+maxMod)+"/AC15";
		
	armor1_name.innerHTML = "Armored undersuit";
	armor2_name.innerHTML = "";
	
	armor1_AC.innerHTML = 13+dexterityMod;
	armor2_AC.innerHTML = "";

	credits.innerHTML = 200+" credits";
	break;
    case "custom":
    	weapon1_name.innerHTML = "";
	weapon2_name.innerHTML = "";

	weapon1_damage.innerHTML = "";
	weapon1_bonus.innerHTML = "";
	weapon1_shock.innerHTML = "";
    	weapon2_damage.innerHTML = "";
	weapon2_bonus.innerHTML = "";
	weapon2_shock.innerHTML = "";
		
	armor1_name.innerHTML = "";
	armor2_name.innerHTML = "";
	
	armor1_AC.innerHTML = "";
	armor2_AC.innerHTML = "";

	credits.innerHTML = $("#equipment_packages_description ul li").html();
	break;
    default:
    	weapon1_name.innerHTML = "";
    	weapon2_name.innerHTML = "";

    	weapon1_damage.innerHTML = "";
    	weapon1_bonus.innerHTML = "";
    	weapon1_shock.innerHTML = "";
    	weapon2_damage.innerHTML = "";
    	weapon2_bonus.innerHTML = "";
    	weapon2_shock.innerHTML = "";

    	armor1_name.innerHTML = "";
    	armor2_name.innerHTML = "";
	
    	armor1_AC.innerHTML = "";
    	armor2_AC.innerHTML = "";

    	credits.innerHTML = "";
    	break;
    }


    var technique_text = "";
    
    for(var discipline of psionic_disciplines){
	var elemRankBox0 = document.getElementById(discipline+'_rank_box_0');
	var elemRankBox1 = document.getElementById(discipline+'_rank_box_1');

	if (elemRankBox1.checked){
	    technique_text +="<strong><i>"+psionics[discipline]["name"]+"</i></strong><br><strong>"+psionics[discipline]["core"]["name"]+"</strong>: "+psionics[discipline]["core"]["descriptionabbreviated"]+"<br><i>Level-0</i>: "+psionics[discipline]["core"]["level0abbreviated"]+"<br><i>Level-1</i>: "+psionics[discipline]["core"]["level1abbreviated"]+"<br><br>";

	    var level1technique = $("#"+discipline+"_level1").val();
	    if(level1technique != null) {
		technique_text+="<strong>"+level1technique+"</strong>: "+psionics[discipline]["level1abbreviated"][level1technique]+"<br><br>";
	    }
	    
	}
	else if (elemRankBox0.checked){
	    technique_text+="<strong><i>"+psionics[discipline]["name"]+"</i></strong><br><strong>"+psionics[discipline]["core"]["name"]+"</strong>: "+psionics[discipline]["core"]["descriptionabbreviated"]+"<br><i>Level-0</i>: "+psionics[discipline]["core"]["level0abbreviated"]+"<br><br>";
	}

    }


    technique.innerHTML = technique_text;

    portrait.setAttribute("id","form_portrait");
    portrait.src = $("#portrait_holder").attr("src");
    portrait.setAttribute("style","max-height:253px; max-width:236px; height:auto; width:auto;left:5px;top:82px;position:absolute;");
    centerPortrait(portrait);
    
    positionElement(name,105,17);
    positionElement(background,345,56);
    positionElement(Class,344,186);
    positionElement(subclass,265,216);
    positionElement(level,326,276);
    positionElement(homeworld,105,327);
    positionElement(employer,105,366);
    positionElement(species,105,405);
    positionElement(hp, 1168,28);
    positionElement(strain, 1168,185);
    positionElement(physical, 976, 354);
    positionElement(evasion, 1056, 354);
    positionElement(mental, 1138, 354);
    positionElement(strength, 1305, 82);
    positionElement(strength_mod, 1344, 82);
    positionElement(dexterity, 1280, 134);
    positionElement(dexterity_mod, 1319, 134);
    positionElement(constitution, 1305, 185);
    positionElement(constitution_mod, 1344, 185);
    positionElement(intelligence, 1280, 237);
    positionElement(intelligence_mod, 1319, 237);
    positionElement(wisdom, 1305, 289);
    positionElement(wisdom_mod, 1344, 289);
    positionElement(charisma, 1280, 341);
    positionElement(charisma_mod, 1319, 341);
    positionElement(effort, 1370, 936);
    positionElement(BAB,595,302);
    positionElement(foci1, 482, 396,"font-size:18px;width:405px;");
    positionElement(foci1_level, 903, 407);
    positionElement(foci2, 482, 461,"font-size:18px;width:405px;");
    positionElement(foci2_level, 903, 472);
    positionElement(foci3, 482, 526,"font-size:18px;width:405px;");
    positionElement(foci3_level, 903, 537);

    for (var fociElem of fociElems){
	shrinkText(fociElem, 55, formElements);
    }
    

    positionElement(administer, 598, 17);
    positionElement(connect, 598, 42);
    positionElement(exert, 598, 68);
    positionElement(fix, 598, 94);
    positionElement(heal, 598, 120);
    positionElement(know, 598, 146);
    positionElement(lead, 598, 172);
    positionElement(notice, 598, 198);
    positionElement(perform, 598, 224);

    positionElement(pilot, 754, 17);
    positionElement(program, 754, 42);
    positionElement(punch, 754, 68);
    positionElement(shoot, 754, 94);
    positionElement(sneak, 754, 120);
    positionElement(stab, 754, 146);
    positionElement(survive, 754, 172);
    positionElement(talk, 754, 198);
    positionElement(trade, 754, 224);

    positionElement(work, 910, 17);
    positionElement(biopsionics, 910, 42);
    positionElement(metapsionics, 910, 68);
    positionElement(precognition, 910, 94);
    positionElement(telekinesis, 910, 120);
    positionElement(telepathy, 910, 146);
    positionElement(teleportation, 910, 172);

    for (var elem of skillElements){
	centerElement(elem, formElements);
    }
    
    positionElement(weapon1_name, 80, 485);
    positionElement(weapon2_name, 80, 550);

    positionElement(weapon1_bonus,350,495);
    positionElement(weapon2_bonus,350,560);
    centerElement(weapon1_bonus,formElements);
    centerElement(weapon2_bonus,formElements);

    positionElement(weapon1_damage,385, 495);
    positionElement(weapon2_damage,385, 560);

    positionElement(weapon1_shock,370,530,"font-size:14px;");
    positionElement(weapon2_shock,370,595,"font-size:14px;");

    positionElement(armor1_name, 80, 847);
    positionElement(armor2_name, 80, 912);

    positionElement(armor1_AC, 440, 858);
    positionElement(armor2_AC, 440, 923);
    centerElement(armor1_AC,formElements);
    centerElement(armor2_AC,formElements);

    positionElement(credits , 490, 978);

    positionElement(technique, 944, 610,"font-size:17px;width:450px;");
    shrinkText(technique,330,formElements);
    
}

function fillOutSheetPage2(){
    var elem = document.getElementById("character_sheet");  
    $("#character_sheet p").remove();

    var goals = document.createElement("p");
    var notes = document.createElement("p");
    var stowedEquipment1 = document.createElement("p");
    var stowedEquipment2 = document.createElement("p");
    var stowedEquipment3 = document.createElement("p");
    var stowedEquipment4 = document.createElement("p");
    var stowedEquipment5 = document.createElement("p");
    var stowedEquipment6 = document.createElement("p");
    var stowedEquipment7 = document.createElement("p");
    var stowedEquipment8 = document.createElement("p");
    var stowedEquipment9 = document.createElement("p");
    var stowedEquipment10 = document.createElement("p");
    var stowedEquipment11 = document.createElement("p");
    var stowedEquipment12 = document.createElement("p");
    var stowedEquipment13 = document.createElement("p");
    var stowedEquipment14 = document.createElement("p");
    var stowedEquipment15 = document.createElement("p");
    var stowedEquipment16 = document.createElement("p");
    var stowedEquipment17 = document.createElement("p");
    var stowedEquipment18 = document.createElement("p");
    var encumberance1 = document.createElement("p");
    var encumberance2 = document.createElement("p");
    var encumberance3 = document.createElement("p");
    var encumberance4 = document.createElement("p");
    var encumberance5 = document.createElement("p");
    var encumberance6 = document.createElement("p");
    var encumberance7 = document.createElement("p");
    var encumberance8 = document.createElement("p");
    var encumberance9 = document.createElement("p");
    var encumberance10 = document.createElement("p");
    var encumberance11 = document.createElement("p");
    var encumberance12 = document.createElement("p");
    var encumberance13 = document.createElement("p");
    var encumberance14 = document.createElement("p");
    var encumberance15 = document.createElement("p");
    var encumberance16 = document.createElement("p");
    var encumberance17 = document.createElement("p");
    var encumberance18 = document.createElement("p");
    var otherEquipment1 = document.createElement("p");
    var otherEquipment2 = document.createElement("p");
    var otherEquipment3 = document.createElement("p");
    var otherEquipment4 = document.createElement("p");
    var otherEquipment5 = document.createElement("p");

    var encumberanceElements = [encumberance1, encumberance2, encumberance3, encumberance4, encumberance5, encumberance6, encumberance7, encumberance8, encumberance9, encumberance10, encumberance11, encumberance12, encumberance13, encumberance14, encumberance15, encumberance16, encumberance17, encumberance18];
    var formElements = [goals, notes, stowedEquipment1, stowedEquipment2, stowedEquipment3, stowedEquipment4, stowedEquipment5, stowedEquipment6, stowedEquipment7, stowedEquipment8, stowedEquipment9, stowedEquipment10, stowedEquipment11, stowedEquipment12, stowedEquipment13, stowedEquipment14, stowedEquipment15, stowedEquipment16, stowedEquipment17, stowedEquipment18, otherEquipment1, otherEquipment1, otherEquipment2, otherEquipment3, otherEquipment4, otherEquipment5].concat(encumberanceElements);


    for (var element of formElements){
	element.setAttribute("class","formText");
	element.setAttribute("id","form_element_"+formElements.indexOf(element));
	elem.appendChild(element);
    }


    goals.innerHTML = $("#goals").val();
    notes.innerHTML = $("#notes").val();
    
    switch($("#equipment_packages").val()){
    case "barbarian":
    	stowedEquipment1.innerHTML = "Spear";
	stowedEquipment2.innerHTML = "Primitive hide armor";
	stowedEquipment3.innerHTML = "Primitive shield";
	stowedEquipment4.innerHTML = "Knife";
	stowedEquipment5.innerHTML = "Backpack (TL0)";
	stowedEquipment6.innerHTML = "7 days rations";
	stowedEquipment7.innerHTML = "20m rope";

	encumberance1.innerHTML = "1";
	encumberance2.innerHTML = "1";
	encumberance3.innerHTML = "2";
	encumberance4.innerHTML = "1";
	encumberance5.innerHTML = "1";
	encumberance6.innerHTML = "3";
	encumberance7.innerHTML = "2";
	
	break;
    case "blade":
	stowedEquipment1.innerHTML = "Monoblade sword";
	stowedEquipment2.innerHTML = "Woven body armor";
	stowedEquipment3.innerHTML = "Secure clothing";
	stowedEquipment4.innerHTML = "Thermal knife";
	stowedEquipment5.innerHTML = "Backpack (TL0)";
	stowedEquipment6.innerHTML = "Lazarus patch";

	encumberance1.innerHTML = "1";
	encumberance2.innerHTML = "2";
	encumberance3.innerHTML = "1";
	encumberance4.innerHTML = "1";
	encumberance5.innerHTML = "1";
	encumberance6.innerHTML = "1";

	otherEquipment1.innerHTML = "Compad";
	
	break;
    case "thief":
	stowedEquipment1.innerHTML = "Laser pistol";
	stowedEquipment2.innerHTML = "Armored undersuit";
	stowedEquipment3.innerHTML = "Monoblade knife";
	stowedEquipment4.innerHTML = "Climbing harness";
	stowedEquipment5.innerHTML = "Low-light goggles";
	stowedEquipment6.innerHTML = "2 type A cells";
	stowedEquipment7.innerHTML = "Backpack (TL0)";
	stowedEquipment8.innerHTML = "Metatool";

	encumberance1.innerHTML = "1";
	encumberance2.innerHTML = "0";
	encumberance3.innerHTML = "1";
	encumberance4.innerHTML = "1";
	encumberance5.innerHTML = "1";
	encumberance6.innerHTML = "1";
	encumberance7.innerHTML = "1";
	encumberance8.innerHTML = "1";

	otherEquipment1.innerHTML = "Compad";
	break;
    case "hacker":
	stowedEquipment1.innerHTML = "Laser pistol";
	stowedEquipment2.innerHTML = "Secure clothing";
	stowedEquipment3.innerHTML = "Postech toolkit";
	stowedEquipment4.innerHTML = "3 units of spare parts";
	stowedEquipment5.innerHTML = "2 type A cells";
	stowedEquipment6.innerHTML = "Dataslab";
	stowedEquipment7.innerHTML = "Metatool";

	encumberance1.innerHTML = "1";
	encumberance2.innerHTML = "1";
	encumberance3.innerHTML = "3";
	encumberance4.innerHTML = "1";
	encumberance5.innerHTML = "1";
	encumberance6.innerHTML = "1";
	encumberance7.innerHTML = "1";

	otherEquipment1.innerHTML = "2 line shunts";
	break;
    case "gunslinger":
	stowedEquipment1.innerHTML = "Laser pistol";
	stowedEquipment2.innerHTML = "Armored undersuit";
	stowedEquipment3.innerHTML = "Monoblade knife";
	stowedEquipment4.innerHTML = "8 type A cells";
	stowedEquipment5.innerHTML = "Backpack (TL0)";

	encumberance1.innerHTML = "1";
	encumberance2.innerHTML = "0";
	encumberance3.innerHTML = "1";
	encumberance4.innerHTML = "3";
	encumberance5.innerHTML = "1";

	otherEquipment1.innerHTML = "Compad";
	break;
    case "soldier":
	stowedEquipment1.innerHTML = "Combat rifle";
	stowedEquipment2.innerHTML = "Woven body armor";
	stowedEquipment3.innerHTML = "Knife";
	stowedEquipment4.innerHTML = "80 rounds ammo";
	stowedEquipment5.innerHTML = "Backpack (TL0)";

	encumberance1.innerHTML = "2";
	encumberance2.innerHTML = "2";
	encumberance3.innerHTML = "1";
	encumberance4.innerHTML = "2";
	encumberance5.innerHTML = "1";

	otherEquipment1.innerHTML = "Compad";

	break;
    case "scout":
	stowedEquipment1.innerHTML = "Laser rifle";
	stowedEquipment2.innerHTML = "Armored vacc suit";
	stowedEquipment3.innerHTML = "Knife";
	stowedEquipment4.innerHTML = "Survey scanner";
	stowedEquipment5.innerHTML = "Binoculars (TL3)";
	stowedEquipment6.innerHTML = "8 type A cells";
	stowedEquipment7.innerHTML = "Backpack (TL0)";

	encumberance1.innerHTML = "2";
	encumberance2.innerHTML = "2";
	encumberance3.innerHTML = "1";
	encumberance4.innerHTML = "1";
	encumberance5.innerHTML = "1";
	encumberance6.innerHTML = "3";
	encumberance7.innerHTML = "1";

	otherEquipment1.innerHTML = "Compad";
	break;
    case "medic":
	stowedEquipment1.innerHTML = "Laser pistol";
	stowedEquipment2.innerHTML = "Secure clothing";
	stowedEquipment3.innerHTML = "4 Lazarus patches";
	stowedEquipment4.innerHTML = "Backpack (TL0)";
	stowedEquipment5.innerHTML = "Medkit";
	stowedEquipment6.innerHTML = "Bioscanner";

	encumberance1.innerHTML = "1";
	encumberance2.innerHTML = "1";
	encumberance3.innerHTML = "2";
	encumberance4.innerHTML = "1";
	encumberance5.innerHTML = "2";
	encumberance6.innerHTML = "1";

	otherEquipment1.innerHTML = "2 doses of Lift";
	otherEquipment2.innerHTML = "Compad";

	break;
    case "civilian":
	stowedEquipment1.innerHTML = "Secure clothing";

	encumberance1.innerHTML = "1";

	otherEquipment1.innerHTML = "Compad";
	break;
    case "technician":
	stowedEquipment1.innerHTML = "Laser pistol";
	stowedEquipment2.innerHTML = "Armored undersuit";
	stowedEquipment3.innerHTML = "Monoblade knife";
	stowedEquipment4.innerHTML = "Postech toolkit";
	stowedEquipment5.innerHTML = "6 units of spare parts";
	stowedEquipment6.innerHTML = "4 type A cells";
	stowedEquipment7.innerHTML = "Backpack (TL0)";
	stowedEquipment8.innerHTML = "Dataslab";
	stowedEquipment9.innerHTML = "Metatool";

	encumberance1.innerHTML = "1";
	encumberance2.innerHTML = "0";
	encumberance3.innerHTML = "1";
	encumberance4.innerHTML = "3";
	encumberance5.innerHTML = "2";
	encumberance6.innerHTML = "2";
	encumberance7.innerHTML = "1";
	encumberance8.innerHTML = "1";
	encumberance9.innerHTML = "1";


	break;
    case "custom":
	break;
    default:
    	break;
    }

    positionElement(goals,944, 840, "font-size:18px;width:450px;");
    shrinkText(goals, 200, formElements);

    positionElement(notes,482, 10, "font-size:18px;width:450px;");
    shrinkText(notes, 280, formElements);

    positionElement(stowedEquipment1, 5, 5);
    positionElement(stowedEquipment2, 5, 31);
    positionElement(stowedEquipment3, 5, 57);
    positionElement(stowedEquipment4, 5, 83);
    positionElement(stowedEquipment5, 5, 109);
    positionElement(stowedEquipment6, 5, 135);
    positionElement(stowedEquipment7, 5, 161);
    positionElement(stowedEquipment8, 5, 187);
    positionElement(stowedEquipment9, 5, 213);
    positionElement(stowedEquipment10, 5, 239);
    positionElement(stowedEquipment11, 5, 265);
    positionElement(stowedEquipment12, 5, 291);
    positionElement(stowedEquipment13, 5, 317);
    positionElement(stowedEquipment14, 5, 343);
    positionElement(stowedEquipment15, 5, 369);
    positionElement(stowedEquipment16, 5, 395);
    positionElement(stowedEquipment17, 5, 421);
    positionElement(stowedEquipment18, 5, 447);

    positionElement(encumberance1, 446, 5);
    positionElement(encumberance2, 446, 31);
    positionElement(encumberance3, 446, 57);
    positionElement(encumberance4, 446, 83);
    positionElement(encumberance5, 446, 109);
    positionElement(encumberance6, 446, 135);
    positionElement(encumberance7, 446, 161);
    positionElement(encumberance8, 446, 187);
    positionElement(encumberance9, 446, 213);
    positionElement(encumberance10, 446, 239);
    positionElement(encumberance11, 446, 265);
    positionElement(encumberance12, 446, 291);
    positionElement(encumberance13, 446, 317);
    positionElement(encumberance14, 446, 343);
    positionElement(encumberance15, 446, 369);
    positionElement(encumberance16, 446, 395);
    positionElement(encumberance17, 446, 421);
    positionElement(encumberance18, 446, 447);

    for (var element of encumberanceElements){
	centerElement(element, formElements);
    }

    positionElement(otherEquipment1, 5, 511);
    positionElement(otherEquipment2, 5, 537);
    positionElement(otherEquipment3, 5, 563);
    positionElement(otherEquipment4, 5, 589);
    positionElement(otherEquipment5, 5, 615);
    
}


function positionElement(elem,left,top,existingstyle=""){
    elem.setAttribute("style",existingstyle+"left:"+left+"px;top:"+top+"px;");
}

function shrinkText(elem, maxHeight, formElements){
    var currFontSize = parseInt((elem.style.fontSize).slice(0,-2));
    var currTop = parseInt((elem.style.top).slice(0,-2));

    while (($("#form_element_"+formElements.indexOf(elem)).height()>maxHeight)&& currFontSize>1){
	currFontSize--;
	currTop++;
	elem.style.fontSize = currFontSize+"px";
	elem.style.top = currTop+"px";
    }
    
}

  
function skillToAttackBonus(skillVal){
    if (skillVal=="") return -1;
    return parseInt(skillVal);
}

function displayBonus(val){
    if (val <0) return "\u2212"+(-1*val);
    return "+"+val
}

function centerElement(elem,formElements){
    elem.style.left = (parseInt(elem.style.left.slice(0,-2))-($("#form_element_"+formElements.indexOf(elem)).width())/2)+"px";
}

function centerPortrait(portrait){
    portrait.style.left = (parseInt(portrait.style.left.slice(0,-2))+(236-portrait.clientWidth)/2)+"px";
    portrait.style.top = (parseInt(portrait.style.top.slice(0,-2))+(253-portrait.clientHeight)/2)+"px";
}
