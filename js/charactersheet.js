'use strict'

$(document).ready(function () {
    
    $("#printButton").click(function(){
	fillOutCharacterSheet();
    });

    $("#shareButton").click(function(){
	generateExportURL();
	$( "#url_dialog" ).dialog( "open" );

    	$( "#url_dialog" ).focus();

	markText($('#url_span')[0]);	
	
    });

    $("#infoButton").click(function(){
	$( "#info_dialog" ).dialog( "open" );
    });

    $('#supportButton').click(function(){
	var win = window.open('https://www.buymeacoffee.com/swnPCbuilder', '_blank');
	if (win) {
	    //Browser has allowed it to be opened
	    win.focus();
	} else {
	    //Browser has blocked it
	    alert('Please allow popups for this website');
	}
    });
	

    $("#randomCharacterButton").click(function(){
	pickRandomName();
	pickRandomAttributes();
	pickRandomClass();
	pickRandomBackground();
	pickRandomEquipmentPackage();
	pickRandomSkills();
	$("#rollHPButton").click();
	$("#rollHPTopLayer").click();
	
	updateStatus1();
	updateStatus2();
	updateStatus3();
	updateStatus4();
	updateStatus5();
	updateStatus6();
	updateStatus7();
	updateStatus8();
	
    });

    
    $(".dialog_window").dialog({
	autoOpen: false,
	closeOnEscape: false,
	modal: true,
	dialogClass: 'no-close',
    });

    $("#url_dialog").dialog({
	autoOpen: false,
	modal: true,
	dialogClass: 'no-close',
	width: 800,
	position:{my:"right bottom", at:"right top-10", of:"#shareButton"},
	buttons: {
	    "Copy to Clipboard": function(){
		markText($('#url_span')[0]);
		document.execCommand("copy");
	    },
            "Close": function() {
		$( this ).dialog( "close" );}
	},
	show: {
	    effect: "blind",
	    direction: "down",
	    duration: 500	    
	},
	hide: {
	    effect: "blind",
	    direction: "down",
	    duration: 500	    
	}
    });

    $("#info_dialog").dialog({
	autoOpen: false,
	modal: true,
	dialogClass: 'no-close',
	width: 840,
	position:{my:"center bottom", at:"center bottom-48"},
	buttons: {
            "Close": function() {
		$( this ).dialog( "close" );}
	},
	show: {
	    effect: "blind",
	    direction: "down",
	    duration: 500	    
	},
	hide: {
	    effect: "blind",
	    direction: "down",
	    duration: 500	    
	}
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
    var box1vactive = false;
    var box2vactive = false;
    
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

	if(box1vactive){
	    $("#rollReorderAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#rollReorderAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#rollReorderAttrsText").show("blind",{},500);
	}
	
	if(box2vactive){
	    $("#manualAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#manualAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#manualAttrsText").show("blind",{},500);
	}
	
	box1active = true;
	box2active = false;
	box1vactive = false;
	box2vactive = false;
	
	
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

	if(box1vactive){
	    $("#rollReorderAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#rollReorderAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#rollReorderAttrsText").show("blind",{},500);
	}

	if(box2vactive){
	    $("#manualAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#manualAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#manualAttrsText").show("blind",{},500);
	}

	box1active = false;
	box2active = true;
	box1vactive = false;
	box2vactive = false;
	
	
    });

    $("#rollReorderAttrsButton").on("click",function(){
	
	if(!box1vactive){
	    $(this).children(".topLayer").animate({
		height:40
	    },500);
	    $("#rollReorderAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#rollReorderAttrsText").hide("blind",{},500);
	}
	
	if(box1active){
	    $("#rollAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#rollAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#rollAttrsText").show("blind",{},500);
	}
	
	if(box2active){
	    $("#fixAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#fixAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#fixAttrsText").show("blind",{},500);
	}
	
	if(box2vactive){
	    $("#manualAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#manualAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#manualAttrsText").show("blind",{},500);
	}
	
	box1active = false;
	box2active = false;
	box1vactive = true;
	box2vactive = false;
	
    });

        $("#manualAttrsButton").on("click",function(){
	
	if(!box2vactive){
	    $(this).children(".topLayer").animate({
		height:40
	    },500);
	    $("#manualAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#manualAttrsText").hide("blind",{},500);
	}
	
	if(box1active){
	    $("#rollAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#rollAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#rollAttrsText").show("blind",{},500);
	}
	
	if(box2active){
	    $("#fixAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#fixAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#fixAttrsText").show("blind",{},500);
	}
	
	if(box1vactive){
	    $("#rollReorderAttrsButton").children(".topLayer").animate({
		height:150
	    },500);
	    $("#rollReorderAttrsHeader").toggleClass("persistentText-default-attr persistentText-active-attr",500)
	    $("#rollReorderAttrsText").show("blind",{},500);
	}
	
	box1active = false;
	box2active = false;
	box1vactive = false;
	box2vactive = true;
	
    });

    
    $("#rollAttrsTopLayer").on("click",function(){
	attrs.forEach(rollAttr);show14Attr();hideAttrSelects();hideScoreSelects();hideAttrInputs();resetTemps();
	$("#14attrList").selectmenu("refresh");
	updateStatus1();
    });

    $("#fixAttrsTopLayer").on("click",function(){
	attrs.forEach(resetAttr);hide14Attr();showAttrSelects();hideScoreSelects();hideAttrInputs();resetTemps();
	$("select[id*='_select']").selectmenu("refresh");
	updateStatus1();
    });

    $("#rollReorderAttrsTopLayer").on("click",function(){
	attrs.forEach(resetAttr);hide14Attr();hideAttrSelects();showScoreSelects();hideAttrInputs();resetTemps();
	$("select[id*='_select']").selectmenu("refresh");
	generateScoreSelects();
	updateStatus1();
    });

    $("#manualAttrsTopLayer").on("click",function(){
	attrs.forEach(resetAttr);hide14Attr();hideAttrSelects();hideScoreSelects();showAttrInputs();resetTemps();
	$("select[id*='_select']").selectmenu("refresh");
	updateStatus1();
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
	updateStatus3();
    });

    $("#pickSkillsTopLayer").on("click",function(){
	hideGrowthButtons();
	enableLearningChoices();
	updateStatus3();
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
	updateStatus7();
    });

//    $('#name_mirror').addClass("ui-widget");;
    $("#backgrounds_mirror").selectmenu({width:124.5}).selectmenu("menuWidget").addClass("overflow");
    $("#class_mirror").selectmenu({width:174});
    $("#14attrList").selectmenu({width:120});
    $("#14scoreList").selectmenu({width:50});
    $("select[id*='_select']").selectmenu({width:50});
//    $("select[id*='foci']").selectmenu({width:200}).selectmenu("menuWidget").addClass("overflow");
    
    $("select[id*='mirror']").on("selectmenuchange",function(){
	updateFromMirrors(this.id);
    });

    $("#14attrList").on("selectmenuchange",function(){
	attrTo14(this.value);
	updateStatus1();
    });

    $("#14scoreList").on("selectmenuchange",function(){
	scoreTo14(this.value);
	updateStatus1();
    });

    $("select[id*='_select']").on("selectmenuchange",function(){
	var trimmedId = (this.id).slice(0,-7);
	if (attrs.indexOf(trimmedId) != -1){
	    var attribute = trimmedId;
	    setAttr(attribute,this.value);
	    updateAttrSelects(attribute,this.value);
	}
	else{
	    var attribute = trimmedId.slice(0,-6);
	    setAttr(attribute,this.value);
	    updateScoreSelects();
	}
	$("select[id*='_select']").selectmenu("refresh");    
	updateStatus1();
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

    loadJSON();

    
});

const attrs = ["strength","dexterity","constitution","intelligence","wisdom","charisma"];

const psionic_disciplines = ["biopsionics","metapsionics","precognition","telekinesis","telepathy","teleportation"];

var tempAttr="";
var tempAttrScore="";
var tempScoreIndex=0;

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
var technique_effort_bonus = 0;

var backgroundsDeferred = $.Deferred();
var skillsDeferred = $.Deferred();
var classesDeferred = $.Deferred();
var fociDeferred = $.Deferred();
var psionicsDeferred = $.Deferred();
var packagesDeferred = $.Deferred();

var punch_stab_choice = "";
var shoot_stab_choice = "";

/*
Load info from js/backgrounds.json js/class.json js/foci.json  js/psionics.json js/equipment_packages.json js/skill.json and store in corresponding Objects.

*/
function loadJSON(){
    loadBackgrounds();
    loadSkills();
    loadClasses();
    loadFoci();
    loadPsionics();
    loadPackages();
}

/*
Fill out character sheet with choices specified by string query parameters. This process requires the information from the js/*.json files to be properly loaded beforehand; Promises are used to ensure the asynchronous timing is ordered correctly.
*/
$.when( backgroundsDeferred, skillsDeferred, classesDeferred, fociDeferred, psionicsDeferred, packagesDeferred ).done(function ( v1, v2, v3, v4, v5, v6 ) {
    readURLParams();
});

/*The updateStatus methods control which icon is displayed on each tab depending on whether that section of character creation has been completed.*/
function updateStatus1(){
    var elemIcon = document.getElementById("accordion1StatusIcon");
    
    var elem = document.getElementById("14attrList");
    var elem2 = document.getElementById("14scoreList");

    var statsAssigned = true;
    var scoresAssigned = (elem2.value!="");
    var scoresEntered = true;
    
    for(var attr of attrs){
	var elemSelect = document.getElementById(attr+"_select");
	var elemScoreSelect = document.getElementById(attr+"_score_select");
	var elemScoreInput = document.getElementById(attr+"_attr_input");
	statsAssigned = statsAssigned && (elemSelect.value != "");
	scoresAssigned = scoresAssigned && (elemScoreSelect.value != "");
	scoresEntered = scoresEntered && (elemScoreInput.value != "");
    }

    var statsInURL = true;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    for(var attr of attrs){
	if (urlParams.has(attr)){
	    statsInURL = statsInURL && (parseInt(urlParams.get(attr))>=0);
	}
	else{
	    statsInURL = false;
	}
    }
    
    
    if(elem.value!=""||statsAssigned||scoresAssigned||scoresEntered||statsInURL){
	elemIcon.src = "assets/checkmark.png"
    }
    else{
	elemIcon.src= "assets/redx.png"
    }
    
}

function updateStatus2(){
    var elemIcon = document.getElementById("accordion2StatusIcon");
    
    var elem = document.getElementById("backgrounds");

    if(elem.value!=""){
	elemIcon.src = "assets/checkmark.png"
    }
    else{
	elemIcon.src= "assets/redx.png"
    }    	
}

function updateStatus3(){
    var elemIcon = document.getElementById("accordion3StatusIcon");

    elemIcon.src= "assets/redx.png"
    
    if(any_skill_remaining==0 && combat_skill_remaining==0 && noncombat_skill_remaining==0 && psychic_skill_remaining ==0){
	if(remainingRolls == 0 || learning_choice_index.length == 2){
	    elemIcon.src = "assets/checkmark.png"
	}
    }
}

function updateStatus4(){
    var elemIcon = document.getElementById("accordion4StatusIcon");
    
    var elem = document.getElementById("class");

    if(elem.value!=""){
	elemIcon.src = "assets/checkmark.png"
    }
    else{
	elemIcon.src= "assets/redx.png"
    }    	
}

function updateStatus5(){
    var elemIcon = document.getElementById("accordion5StatusIcon");
    
    var elemGeneralFoci = document.getElementById("foci");
    var elemCombatFoci = document.getElementById("combat_foci");
    var elemNonCombatFoci = document.getElementById("noncombat_foci");

    var elemClass = document.getElementById("class");


    elemIcon.src= "assets/redx.png";
    
    if(elemClass.value==""||elemClass.value=="psychic"){
	if(elemGeneralFoci.value!=""){
	    elemIcon.src = "assets/checkmark.png";
	}
    }
    else if(elemClass.value=="warrior"||elemClass.value=="war_psy"){
	if(elemGeneralFoci.value!="" && elemCombatFoci.value!=""){
	    elemIcon.src = "assets/checkmark.png";
	}
    }
    else if(elemClass.value=="expert"||elemClass.value=="exp_psy"){
	if(elemGeneralFoci.value!="" && elemNonCombatFoci.value!=""){
	    elemIcon.src = "assets/checkmark.png";
	}
    }
    else if(elemClass.value=="war_exp"){
	if(elemGeneralFoci.value!="" && elemCombatFoci.value!="" && elemNonCombatFoci.value!=""){
	    elemIcon.src = "assets/checkmark.png";
	}
    }
}

function updateStatus6(){
    var elemIcon = document.getElementById("accordion6StatusIcon");
    
    var psionicsChosen = true;
    
    for (var discipline of psionic_disciplines){
	var elem = document.getElementById(discipline+"_level1");	
	psionicsChosen = psionicsChosen && (elem.style.display == "none" || elem.value !="");
    }

    if(psionicsChosen){
	elemIcon.src = "assets/checkmark.png"
    }
    else{
	elemIcon.src= "assets/redx.png"
    }    	    
}


function updateStatus7(){
    var elemIcon = document.getElementById("accordion7StatusIcon");
    
    var elem = document.getElementById("hp_roll");

    if(elem.value!=""){
	elemIcon.src = "assets/checkmark.png"
    }
    else{
	elemIcon.src= "assets/redx.png"
    }    	
}

function updateStatus8(){
    var elemIcon = document.getElementById("accordion8StatusIcon");
    
    var elem = document.getElementById("equipment_packages");

    if(elem.value!=""){
	elemIcon.src = "assets/checkmark.png"
    }
    else{
	elemIcon.src= "assets/redx.png"
    }    	
}

function updateStatus9(){
    var elemIcon = document.getElementById("accordion9StatusIcon");
    
    var elemName = document.getElementById("name");
    var elemHomeworld = document.getElementById("homeworld");
    var elemEmployer = document.getElementById("employer");
    var elemSpecies = document.getElementById("species");

    var elemGoals = document.getElementById("goals");
    var elemNotes = document.getElementById("notes");

    if(elemName.value!="" && elemHomeworld.value!="" && elemEmployer.value!="" && elemSpecies.value!=""&&elemGoals.value!="" && elemNotes.value!=""){
	elemIcon.src = "assets/checkmark.png"
    }
    else{
	elemIcon.src= "assets/warning.png"
    }    	
}


function rollDie(sides=6){
    return 1+Math.floor(sides*Math.random());
}

function rollAttr(attrname){
    let attrElem = document.getElementById(attrname+'_attr');
    let attrInputElem = document.getElementById(attrname+'_attr_input');
    let total = rollDie(6)+rollDie(6)+rollDie(6);
    attrBases[attrs.indexOf(attrname)] = total;
    attrElem.innerHTML=total + attrBonuses[attrs.indexOf(attrname)];
    attrInputElem.value=total + attrBonuses[attrs.indexOf(attrname)];
    updateMod(attrname,total);    
}

function updateMod(attrname, total){
//    let total = parseInt(document.getElementById(attrname+'_attr').innerHTML);
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
	let attrInputElem = document.getElementById(attrname+'_attr_input');
	var ind=attrs.indexOf(attrname);
	attrBases[ind] = newValue;
	if(newValue !=""){
	    attrElem.innerHTML= parseInt(newValue) + attrBonuses[ind];
	    attrInputElem.value= parseInt(newValue) + attrBonuses[ind];
	}
	else{
	    attrElem.innerHTML= newValue;
	    attrInputElem.value= newValue;
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

function generateScoreSelects(){
    $('#14scoreList option').remove();
    $('#14scoreList').append($('<option/>', { 
        value: "",
        text : ""
    }));

    var totals = []
    for (var i = 0; i<6; i++){
	totals.push(rollDie(6)+rollDie(6)+rollDie(6));
    }
    totals.sort(function(a, b){return b-a});
    
    for (var i = 0; i<6; i++){
      	$('#14scoreList').append("<option value='"+totals[i]+"'>"+totals[i]+"</option>").selectmenu();
    }
    $('#14scoreList').selectmenu("refresh");
    
    var scoreSelectElem = document.getElementById('14scoreList');
    sortSelect(scoreSelectElem);

    for (var j = 1; j<7; j++){
    	for (var attr of attrs){
    	    var selectElem = document.getElementById(attr+'_score_select');
    	    selectElem.options[j].text = scoreSelectElem.options[j].text;
    	    selectElem.options[j].value = scoreSelectElem.options[j].value;
    	    $('#'+attr+'_score_select').selectmenu("refresh");
    	}
    }
}

function updateScoreSelects(){
    $("select[id*='_score_select'] option").removeAttr("disabled");
    
    for (var attrI of attrs){
	var ind = $('#'+attrI+'_score_select').prop("selectedIndex");
	for (var attrJ of attrs){
	    if (attrI != attrJ){
		var elem = document.getElementById(attrJ+'_score_select');
		if (ind != 0){
		    elem.options[ind].setAttribute("disabled","true");
		}
	    }
	}
    }
}

function resetScoreSelects(){
    $("select[id*='_score_select']").prop("selectedIndex",0);
    $("select[id*='_score_select'] option").removeAttr("disabled");
}

function scoreTo14(score){
    var scoreSelectElem = document.getElementById('14scoreList');
    var ind = $('#14scoreList').prop("selectedIndex");

    for (var attr of attrs){
	var selectElem = document.getElementById(attr+'_score_select');
	if(score != ""){
	    
	    if (tempScoreIndex != 0){
		selectElem.options[tempScoreIndex].text = scoreSelectElem.options[tempScoreIndex].text;
		selectElem.options[tempScoreIndex].value = scoreSelectElem.options[tempScoreIndex].value;
	    }
	    
	    selectElem.options[ind].text = 14;
	    selectElem.options[ind].value = 14;
	    
	}
	else{
	    if (tempScoreIndex != 0){
		selectElem.options[tempScoreIndex].text = scoreSelectElem.options[tempScoreIndex].text;
		selectElem.options[tempScoreIndex].value = scoreSelectElem.options[tempScoreIndex].value;
	    }
	}
	$('#'+attr+'_score_select').selectmenu('refresh');
	setAttr(attr, $('#'+attr+'_score_select').val());
    }
    tempScoreIndex = ind;
}


/*For random ability generation, set given attribute to 14. Which attribute has been chosen and its old value are saved in tempAttr and tempAttrScore, respectively; these are saved so that when the user chooses a different attribute to 14, the current attribute can be correctly reset.*/
function attrTo14(attrname){
    if (tempAttr != ""){
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

/*
For 'fixed' ability generation, when an attribute value is selected from the menu, remove it from the list of options for the other attributes. When an attribute value is changed, add the previous value back to the list of options for other attributes.
*/
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

/*
Method for sorting the attribute values in '#strength_select' , '#dexterity_select', etc. 
*/
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

function showScoreSelects(){
    $(".scoreSelects").show();
}

function hideScoreSelects(){
    $(".scoreSelects").hide();
}

function showAttrInputs(){
    for (var attr of attrs){
	$('#'+attr+'_attr').hide();
	$('#'+attr+'_attr_input').show();
    }
}

function hideAttrInputs(){
    for (var attr of attrs){
	$('#'+attr+'_attr').show();
	$('#'+attr+'_attr_input').hide();
    }

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

    resetScoreSelects();

    var attr14Select = document.getElementById("14attrList");
    attr14Select.selectedIndex = "0";
    
    tempAttr="";
    tempAttrScore="";
    tempScoreIndex=0;
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

    backgroundsDeferred.resolve();

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
		tooltipNode.setAttribute("id",skillKey+'_tooltip');
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
		    box.setAttribute("onchange","updateSkillBoxes(this.id);updateStatus3();");
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

    for (var key of skillKeys){
	var tooltipNode = document.getElementById(key+"_tooltip");
	if(tooltipNode.offsetWidth >520){
		    tooltipNode.style.width = "520px";
		    tooltipNode.style.whiteSpace = "normal";
	}
    }

    skillsDeferred.resolve();

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
		    if(any_skill_remaining < any_skill_bank){
			addAnySkill();
			any_skill_bank--;
		    }
		    else if(combat_skill_remaining < combat_skill_bank){
			addCombatSkill();
			combat_skill_bank--;
		    }
		    else{
			alert("Something went wrong!");
		    }
		}
		else{
		    if(any_skill_remaining < any_skill_bank){
			addAnySkill();
			any_skill_bank--;
		    }
		    else if(noncombat_skill_remaining < noncombat_skill_bank){
			addNonCombatSkill();
			noncombat_skill_bank--;
		    }
		    else{
			alert("Something went wrong!");
		    }	    
		}
	    }
	}
    }
    updateSkillTotal(skill);

    technique_effort_bonus = 0;
    if($("#metapsionics_total").html() == "1") technique_effort_bonus = 2;
	
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
    picked_skills = [];
    
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
    picked_skills = [];

    remainingRolls = 3;
    
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
    updateStatus3();
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
    updateStatus3();
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

function incrementPickedSkill(skill){
    if (((skill.indexOf(" ") == -1)&&(skill.indexOf(",") == -1))&&(skill != "")){
	var elemBox0 = document.getElementById(skill+'_rank_box_0');
	var elemBox1 = document.getElementById(skill+'_rank_box_1');
	
	if (elemBox1.checked){
	    return false;
	}
	else{
	    if(elemBox0.checked){
		$('#'+skill+'_rank_box_1').prop( "checked",true);
		$('#'+skill+'_rank_box_1').trigger("change");
	    }
	    else{
		$('#'+skill+'_rank_box_0').prop( "checked",true);
		$('#'+skill+'_rank_box_0').trigger("change");
	    }
	    return true;
	}
    }
}

function incrementFixedSkill(skill){
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
	if (punch_stab_choice == ""){
	    $('#punchstab_dialog').dialog({
		buttons: [{
		    text: "Submit",
		    click: function(){
			var ind=foci_skills.indexOf("punch or stab");
			var choice=$("input[name=punchstab]:checked").val();
			if(choice != undefined){
			    foci_skills[ind]=choice;
			    $("input[name=punchstab]").prop("checked",false).change();
			    incrementFixedSkill(choice);
			    punch_stab_choice = choice;
			    $(this).dialog("close");
			}
		    }
		}]
	    }).dialog("open");
	}
	else{
	    var ind=foci_skills.indexOf("punch or stab");
	    foci_skills[ind]=punch_stab_choice;
	    incrementFixedSkill(punch_stab_choice);
	}
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
			incrementFixedSkill(choice);
			shoot_stab_choice = choice;
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
    
    fociDeferred.resolve();
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
    if (!(picked_foci.includes("shocking_assault"))){
	punch_stab_choice = "";
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
    
    for (var skill of total_skills) incrementFixedSkill(skill);

    for (var attr of attrs) checkAttr(attr);

    var anyPsychic = false;
    
    for(var discipline of psionic_disciplines) anyPsychic = (displayTechniques(discipline) || anyPsychic);    
    displayTechniquesTabs(anyPsychic);

    updateStatus3();
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
	classesDeferred.resolve();

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
    
    psionicsDeferred.resolve();
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
	updateStatus6();
	return true;
    }
    updateStatus6();
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

    packagesDeferred.resolve();
    
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
	maxEffort = Math.max(1,1 + maxPsychicSkill + foci_effort_bonus + technique_effort_bonus + computeMod(Math.max(parseInt(elemCon.innerHTML),parseInt(elemWis.innerHTML))));
    }
    else if(picked_foci.includes("wild_psychic_talent")){
	maxEffort = 1;
    }
	    
    
    elemEffort.innerHTML = maxEffort;
}



function positionElement(elem,left,top,existingstyle=""){
    elem.setAttribute("style",existingstyle+"left:"+left+"px;top:"+top+"px;");
}

function shrinkText(elem, maxHeight, formElements){
    var currFontSize = parseInt((elem.style.fontSize).slice(0,-2));
    var currTop = parseInt((elem.style.top).slice(0,-2));

    while (($("#"+elem.id).height()>maxHeight)&& currFontSize>1){
	console.log(currFontSize);
	currFontSize--;
	currTop++;
	elem.style.fontSize = currFontSize+"px";
	elem.style.top = currTop+"px";
    }
    
}

  
function skillToAttackBonus(skillVal){
    if (skillVal=="") return -2;
    return parseInt(skillVal);
}

function displayBonus(val){
    if (val <0) return "\u2212"+(-1*val);
    return "+"+val
}

function centerElement(elem,formElements){
    elem.style.left = (parseInt(elem.style.left.slice(0,-2))-($("#"+elem.id).width())/2)+"px";
}

function centerPortrait(portrait){
    alert((223-portrait.clientWidth)/2);
    portrait.style.left = (parseInt(portrait.style.left.slice(0,-2))+(223-portrait.clientWidth)/2)+"px";
    portrait.style.top = (parseInt(portrait.style.top.slice(0,-2))+(240-portrait.clientHeight)/2)+"px";
}



function fillOutCharacterSheet(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/Fixed_Sheet.pdf', true);
    xhr.responseType = 'arraybuffer';
    
    var filled_pdf;
    var fields = {};

    fields['Name'] = [$("#name").val()];
    fields['Background'] = [$("#backgrounds_mirror option:selected").text()];

    if($("#class_mirror option:selected").text().includes("/")){
	fields['Class'] = ["Adventurer"];
	fields['Class Details'] = [($("#class_mirror option:selected").text()+" ").slice(4,-1)];
	
    }
    else{
	fields['Class'] = [$("#class_mirror option:selected").text()];
	fields['Class Details'] = [""];
    }

    fields['Level']=["1"];
    fields['Homeworld'] = [$("#homeworld").val()];
    fields['Employer'] = [$("#employer").val()];
    fields['Species'] = [$("#species").val()];
    fields['Max Hit Points'] = [$("#hp_mirror1").html()];
    fields['Max System Strain'] = [$("#constitution_attr").html()];
    fields['Physical Save'] = [$("#physical_saving_throw").html()];
    fields['Evasion Save'] = [$("#evasion_saving_throw").html()];
    fields['Mental Save'] = [$("#mental_saving_throw").html()];
    fields['Strength Score'] = [$("#strength_attr").html()];
    fields['Strength Mod'] = [$("#strength_mod").html()];
    fields['Dexterity Score'] = [$("#dexterity_attr").html()];
    fields['Dexterity Modifier'] = [$("#dexterity_mod").html()];
    fields['Constitution Score'] = [$("#constitution_attr").html()];
    fields['Constitution Modifier'] = [$("#constitution_mod").html()];
    fields['Intelligence Score'] = [$("#intelligence_attr").html()];
    fields['Intelligence Modifier'] = [$("#intelligence_mod").html()];
    fields['Wisdom Score'] = [$("#wisdom_attr").html()];
    fields['Wisdom Modifier'] = [$("#wisdom_mod").html()];
    fields['Charisma Score'] = [$("#charisma_attr").html()];
    fields['Charisma Modifier'] = [$("#charisma_mod").html()];
    fields['Max Effort'] = [$("#effort").html()];
    fields['Base Attack Bonus'] = [$("#attack_bonus").html()];

//    var fociElems = [foci1, foci2, foci3];
//    var fociLevelElems = [foci1_level, foci2_level, foci3_level];
    var usedFoci = [];
    var sorted_picks = picked_foci;
    sorted_picks.sort();
    for (var i =0; i< 3; i++){
    	if(i< sorted_picks.length){
    	    if(usedFoci.includes(sorted_picks[i])){
    		fields['Focus '+(i+1)] = [foci[sorted_picks[i]]["name"].toUpperCase()+": "+foci[sorted_picks[i]]["level2abbreviated"]];
    		fields['Focus '+(i+1)+' Level'] = ["2"];
    	    }
    	    else{
    		fields['Focus '+(i+1)] = [foci[sorted_picks[i]]["name"].toUpperCase()+": "+foci[sorted_picks[i]]["level1abbreviated"]];
    		fields['Focus '+(i+1)+' Level'] = ["1"];
    	    }
    	    usedFoci.push(sorted_picks[i]);
    	}
    	else{
    	    fields['Focus '+(i+1)] = [""];
    	    fields['Focus '+(i+1)+' Level'] = [""];
    	}
    }
    
    
    var skillKeys = Object.keys(skills);
    
    var zippedSkills = skillKeys.map(function(e, i) {
	return [skillKeys[i].charAt(0).toUpperCase()+skillKeys[i].slice(1), skillKeys[i]];
    });

    for (var zip of zippedSkills){
    	fields[zip[0] + ' Skill'] = [$("#"+zip[1]+"_total").html()];
    }


    var strengthMod = computeMod(parseInt($("#strength_attr").html()));
    var dexterityMod = computeMod(parseInt($("#dexterity_attr").html()));
    var attackMod = parseInt(($("#attack_bonus").html()).slice(1,2));
    
    var melee_bonus = attackMod+strengthMod;
    var ranged_bonus = attackMod+dexterityMod;

    var maxMod = Math.max(strengthMod,dexterityMod);

    var stab_bonus = 0;
    var shoot_bonus = 0;
    var shock_bonus = 0;
    var innate_AC = 0;
    var unarmed_base;
    var unarmed_shock;

   
    if(picked_foci.includes("armsman")) stab_bonus = parseInt(fields['Stab Skill'][0]);
    if(picked_foci.includes("gunslinger")) shoot_bonus = parseInt(fields['Shoot Skill'][0]);

    var count=0;
    for (var foci_choice of picked_foci){
	if (foci_choice=="shocking_assault") count++
    }

    if(count == 2) shock_bonus = 2;
    
    if(picked_foci.includes("unarmed_combatant")){
	switch(fields['Punch Skill'][0]){
	case "0":
	    unarmed_base = "1d6";
	    unarmed_shock = "";
	    break;
	case "1":
	    unarmed_base = "1d8";
	    unarmed_shock = "Shock: "+(1+maxMod+shock_bonus)+"/AC15";
	    break;
	}
    }
    else{
	unarmed_base = "1d2";
	unarmed_shock = "";
    }

    if(picked_foci.includes("ironhide")){
	innate_AC = 16;
    }
    else{
	innate_AC = 10;
    }
    
    switch($("#equipment_packages").val()){
    case "barbarian":
    	fields["Weapon 1"] = ["Spear"];
	fields["Weapon 2"] = ["Knife"];

	fields["Weapon Total Bonus 1"] = ["1d6"+displayBonus((1+maxMod+stab_bonus))];
	fields["Weapon Bonus 1"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Stab Skill"][0])))];
	fields["Weapon Shock 1"] = ["Shock: "+(2+maxMod+stab_bonus+shock_bonus)+"/AC13"];
    	fields["Weapon Total Bonus 2"] = ["1d4"+displayBonus(maxMod+stab_bonus)];
	fields["Weapon Bonus 2"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Stab Skill"][0])))];
	fields["Weapon Shock 2"] = ["Shock: "+(1+maxMod+stab_bonus+shock_bonus)+"/AC15"];

	fields['Armor 1'] = ["Primitive hide armor w/ shield"];
	fields['Armor 2'] = ["Primitive hide armor"];
	fields['Armor 3'] = ["Unarmored w/ shield"];
//	armor4_name.innerHTML = "Unarmored"
	
	fields['AC 1'] = [String(14+dexterityMod)];
	fields['AC 2'] = [String(13+dexterityMod)];
	fields['AC 3'] = [String(innate_AC+dexterityMod+1)];
//	armor4_AC.innerHTML = innate_AC+dexterityMod;

	fields['Credits'] = [500+" credits"];

	fields['Stowed Item 1'] = ["Spear"];
	fields['Stowed Item 2'] = ["Primitive hide armor"];
	fields['Stowed Item 3'] = ["Primitive shield"];
	fields['Stowed Item 4'] = ["Knife"];
	fields['Stowed Item 5'] = ["Backpack (TL0)"];
	fields['Stowed Item 6'] = ["7 days rations"];
	fields['Stowed Item 7'] = ["20m rope"];

	fields['Stowed Enc 1'] = ["1"];
	fields['Stowed Enc 2'] = ["1"];
	fields['Stowed Enc 3'] = ["2"];
	fields['Stowed Enc 4'] = ["1"];
	fields['Stowed Enc 5'] = ["1"];
	fields['Stowed Enc 6'] = ["3"];
	fields['Stowed Enc 7'] = ["2"];

	break;
    case "blade":
    	fields["Weapon 1"] = ["Monoblade sword"];
	fields["Weapon 2"] = ["Thermal knife"];

	fields["Weapon Total Bonus 1"] = ["1d8"+displayBonus((1+maxMod+stab_bonus))];
	fields["Weapon Bonus 1"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Stab Skill"][0])))];
	fields["Weapon Shock 1"] = ["Shock: "+(2+maxMod+stab_bonus+shock_bonus)+"/AC13"];
    	fields["Weapon Total Bonus 2"] = ["1d6"+displayBonus(maxMod+stab_bonus)];
	fields["Weapon Bonus 2"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Stab Skill"][0])))];
	fields["Weapon Shock 2"] = ["Shock: "+(1+maxMod+stab_bonus+shock_bonus)+"/AC15"];

	fields['Armor 1'] = ["Woven body armor"];
	fields['Armor 2'] = ["Secure clothing"];
	fields['Armor 3'] = ["Unarmored"];
	
	fields['AC 1'] = [String(15+dexterityMod)];
	fields['AC 2'] = [String(13+dexterityMod)];
	fields['AC 3'] = [String(innate_AC+dexterityMod)];

	fields['Credits'] = 50+" credits";

	fields['Stowed Item 1'] = ["Monoblade sword"];
	fields['Stowed Item 2'] = ["Woven body armor"];
	fields['Stowed Item 3'] = ["Secure clothing"];
	fields['Stowed Item 4'] = ["Thermal knife"];
	fields['Stowed Item 5'] = ["Backpack (TL0)"];
	fields['Stowed Item 6'] = ["Lazarus patch"];

	fields['Stowed Enc 1'] = ["1"];
	fields['Stowed Enc 2'] = ["2"];
	fields['Stowed Enc 3'] = ["1"];
	fields['Stowed Enc 4'] = ["1"];
	fields['Stowed Enc 5'] = ["1"];
	fields['Stowed Enc 6'] = ["1"];

	fields['Free Equipment 1'] = ["Compad"];

	break;
    case "thief":
    	fields["Weapon 1"] = ["Laser pistol"];
	fields["Weapon 2"] = ["Monoblade knife"];

	fields["Weapon Total Bonus 1"] = ["1d6"+displayBonus((dexterityMod+shoot_bonus))];
	fields["Weapon Bonus 1"] = [displayBonus((1+ranged_bonus+skillToAttackBonus(fields["Shoot Skill"][0])))];
	fields["Weapon Shock 1"] = [""];
    	fields["Weapon Total Bonus 2"] = ["1d6"+displayBonus(maxMod+stab_bonus)];
	fields["Weapon Bonus 2"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Stab Skill"][0])))];
	fields["Weapon Shock 2"] = ["Shock: "+(1+maxMod+stab_bonus+shock_bonus)+"/AC15"];
	
	fields['Standard Range 1'] = ["100"];
	fields['Max Range 1'] = ["300"];
	
	fields['Armor 1'] = ["Armored undersuit"];
	fields['Armor 2'] = ["Unarmored"];
	
	fields['AC 1'] = [String(13+dexterityMod)];
	fields['AC 2'] = [String(innate_AC+dexterityMod)];

	fields['Credits'] = [25+" credits"];

	fields['Stowed Item 1'] = ["Laser pistol"];
	fields['Stowed Item 2'] = ["Armored undersuit"];
	fields['Stowed Item 3'] = ["Monoblade knife"];
	fields['Stowed Item 4'] = ["Climbing harness"];
	fields['Stowed Item 5'] = ["Low-light goggles"];
	fields['Stowed Item 6'] = ["2 type A cells"];
	fields['Stowed Item 7'] = ["Backpack (TL0)"];
	fields['Stowed Item 8'] = ["Metatool"];

	fields['Stowed Enc 1'] = ["1"];
	fields['Stowed Enc 2'] = ["0"];
	fields['Stowed Enc 3'] = ["1"];
	fields['Stowed Enc 4'] = ["1"];
	fields['Stowed Enc 5'] = ["1"];
	fields['Stowed Enc 6'] = ["1"];
	fields['Stowed Enc 7'] = ["1"];
	fields['Stowed Enc 8'] = ["1"];

	fields['Free Equipment 1'] = ["Compad"];

	break;
    case "hacker":
    	fields["Weapon 1"] = ["Laser pistol"];
	fields["Weapon 2"] = [""];

	fields["Weapon Total Bonus 1"] = ["1d6"+displayBonus((dexterityMod+shoot_bonus))];
	fields["Weapon Bonus 1"] = [displayBonus((1+ranged_bonus+skillToAttackBonus(fields["Shoot Skill"][0])))];
	fields["Weapon Shock 1"] = [""];
    	fields["Weapon Total Bonus 2"] = [""];
	fields["Weapon Bonus 2"] = [""];
	fields["Weapon Shock 2"] = [""];

	fields['Standard Range 1'] = ["100"];
	fields['Max Range 1'] = ["300"];

	fields['Armor 1'] = ["Secure clothing"];
	fields['Armor 2'] = ["Unarmored"];
	
	fields['AC 1'] = [String(13+dexterityMod)];
	fields['AC 2'] = [String(innate_AC+dexterityMod)];

	fields['Credits'] = [100+" credits"];

	fields['Stowed Item 1'] = ["Laser pistol"];
	fields['Stowed Item 2'] = ["Secure clothing"];
	fields['Stowed Item 3'] = ["Postech toolkit"];
	fields['Stowed Item 4'] = ["3 units of spare parts"];
	fields['Stowed Item 5'] = ["2 type A cells"];
	fields['Stowed Item 6'] = ["Dataslab"];
	fields['Stowed Item 7'] = ["Metatool"];

	fields['Stowed Enc 1'] = ["1"];
	fields['Stowed Enc 2'] = ["1"];
	fields['Stowed Enc 3'] = ["3"];
	fields['Stowed Enc 4'] = ["1"];
	fields['Stowed Enc 5'] = ["1"];
	fields['Stowed Enc 6'] = ["1"];
	fields['Stowed Enc 7'] = ["1"];

	fields['Free Equipment 1'] = ["2 line shunts"];

	break;
    case "gunslinger":
    	fields["Weapon 1"] = ["Laser pistol"];
	fields["Weapon 2"] = ["Monoblade knife"];

	fields["Weapon Total Bonus 1"] = ["1d6"+displayBonus((dexterityMod+shoot_bonus))];
	fields["Weapon Bonus 1"] = [displayBonus((1+ranged_bonus+skillToAttackBonus(fields["Shoot Skill"][0])))];
	fields["Weapon Shock 1"] = [""];
    	fields["Weapon Total Bonus 2"] = ["1d6"+displayBonus(maxMod+stab_bonus)];
	fields["Weapon Bonus 2"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Stab Skill"][0])))];
	fields["Weapon Shock 2"] = ["Shock: "+(1+maxMod+stab_bonus+shock_bonus)+"/AC15"];
	
	fields['Armor 1'] = ["Armored undersuit"];
	fields['Armor 2'] = ["Unarmored"];

	fields['Standard Range 1'] = ["100"];
	fields['Max Range 1'] = ["300"];
	
	fields['AC 1'] = [String(13+dexterityMod)];
	fields['AC 2'] = [String(innate_AC+dexterityMod)];

	fields['Credits'] = [100+" credits"];

	fields['Stowed Item 1'] = ["Laser pistol"];
	fields['Stowed Item 2'] = ["Armored undersuit"];
	fields['Stowed Item 3'] = ["Monoblade knife"];
	fields['Stowed Item 4'] = ["8 type A cells"];
	fields['Stowed Item 5'] = ["Backpack (TL0)"];

	fields['Stowed Enc 1'] = ["1"];
	fields['Stowed Enc 2'] = ["0"];
	fields['Stowed Enc 3'] = ["1"];
	fields['Stowed Enc 4'] = ["3"];
	fields['Stowed Enc 5'] = ["1"];

	fields['Free Equipment 1'] = ["Compad"];

	break;
    case "soldier":
    	fields["Weapon 1"] = ["Combat rifle"];
	fields["Weapon 2"] = ["Knife"];

	fields["Weapon Total Bonus 1"] = ["1d12"+displayBonus((dexterityMod+shoot_bonus))];
	fields["Weapon Bonus 1"] = [displayBonus((ranged_bonus+skillToAttackBonus(fields["Shoot Skill"][0])))];
	fields["Weapon Shock 1"] = [""];
    	fields["Weapon Total Bonus 2"] = ["1d4"+displayBonus(maxMod+stab_bonus)];
	fields["Weapon Bonus 2"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Stab Skill"][0])))];
	fields["Weapon Shock 2"] = ["Shock: "+(1+maxMod+stab_bonus+shock_bonus)+"/AC15"];

	fields['Standard Range 1'] = ["100"];
	fields['Max Range 1'] = ["300"];

	fields['Armor 1'] = ["Woven body armor"];
	fields['Armor 2'] = ["Unarmored"];
	
	fields['AC 1'] = [String(15+dexterityMod)];
	fields['AC 2'] = [String(innate_AC+dexterityMod)];

	fields['Credits'] = [100+" credits"];

	fields['Stowed Item 1'] = ["Combat rifle"];
	fields['Stowed Item 2'] = ["Woven body armor"];
	fields['Stowed Item 3'] = ["Knife"];
	fields['Stowed Item 4'] = ["80 rounds ammo"];
	fields['Stowed Item 5'] = ["Backpack (TL0)"];

	fields['Stowed Enc 1'] = ["2"];
	fields['Stowed Enc 2'] = ["2"];
	fields['Stowed Enc 3'] = ["1"];
	fields['Stowed Enc 4'] = ["2"];
	fields['Stowed Enc 5'] = ["1"];

	fields['Free Equipment 1'] = ["Compad"];

	break;
    case "scout":
    	fields["Weapon 1"] = ["Laser rifle"];
	fields["Weapon 2"] = ["Knife"];

	fields["Weapon Total Bonus 1"] = ["1d10"+displayBonus((dexterityMod+shoot_bonus))];
	fields["Weapon Bonus 1"] = [displayBonus((1+ranged_bonus+skillToAttackBonus(fields["Shoot Skill"][0])))];
	fields["Weapon Shock 1"] = [""];
    	fields["Weapon Total Bonus 2"] = ["1d4"+displayBonus(maxMod+stab_bonus)];
	fields["Weapon Bonus 2"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Stab Skill"][0])))];
	fields["Weapon Shock 2"] = ["Shock: "+(1+maxMod+stab_bonus+shock_bonus)+"/AC15"];

	fields['Standard Range 1'] = ["300"];
	fields['Max Range 1'] = ["500"];

	fields['Armor 1'] = ["Armored vacc suit"];
	fields['Armor 2'] = ["Unarmored"];
	
	fields['AC 1'] = [String(13+dexterityMod)];
	fields['AC 2'] = [String(innate_AC+dexterityMod)];

	fields['Credits'] = [25+" credits"];

		fields['Stowed Item 1'] = ["Laser rifle"];
	fields['Stowed Item 2'] = ["Armored vacc suit"];
	fields['Stowed Item 3'] = ["Knife"];
	fields['Stowed Item 4'] = ["Survey scanner"];
	fields['Stowed Item 5'] = ["Binoculars (TL3)"];
	fields['Stowed Item 6'] = ["8 type A cells"];
	fields['Stowed Item 7'] = ["Backpack (TL0)"];

	fields['Stowed Enc 1'] = ["2"];
	fields['Stowed Enc 2'] = ["2"];
	fields['Stowed Enc 3'] = ["1"];
	fields['Stowed Enc 4'] = ["1"];
	fields['Stowed Enc 5'] = ["1"];
	fields['Stowed Enc 6'] = ["3"];
	fields['Stowed Enc 7'] = ["1"];

	fields['Free Equipment 1'] = ["Compad"];

	break;
    case "medic":
    	fields["Weapon 1"] = ["Laser pistol"];
	fields["Weapon 2"] = [""];

	fields["Weapon Total Bonus 1"] = ["1d6"+displayBonus((dexterityMod+shoot_bonus))];
	fields["Weapon Bonus 1"] = [displayBonus((1+ranged_bonus+skillToAttackBonus(fields["Shoot Skill"][0])))];
	fields["Weapon Shock 1"] = [""];
    	fields["Weapon Total Bonus 2"] = [""];
	fields["Weapon Bonus 2"] = [""];
	fields["Weapon Shock 2"] = [""];

	fields['Standard Range 1'] = ["100"];
	fields['Max Range 1'] = ["300"];
	
	fields['Armor 1'] = ["Secure clothing"];
	fields['Armor 2'] = ["Unarmored"];
	
	fields['AC 1'] = [String(13+dexterityMod)];
	fields['AC 2'] = [String(innate_AC+dexterityMod)];

	fields['Credits'] = [25+" credits"];

		fields['Stowed Item 1'] = ["Laser pistol"];
	fields['Stowed Item 2'] = ["Secure clothing"];
	fields['Stowed Item 3'] = ["4 Lazarus patches"];
	fields['Stowed Item 4'] = ["Backpack (TL0)"];
	fields['Stowed Item 5'] = ["Medkit"];
	fields['Stowed Item 6'] = ["Bioscanner"];

	fields['Stowed Enc 1'] = ["1"];
	fields['Stowed Enc 2'] = ["1"];
	fields['Stowed Enc 3'] = ["2"];
	fields['Stowed Enc 4'] = ["1"];
	fields['Stowed Enc 5'] = ["2"];
	fields['Stowed Enc 6'] = ["1"];

	fields['Free Equipment 1'] = ["2 doses of Lift"];
	fields['Free Equipment 2'] = ["Compad"];


	break;
    case "civilian":
    	fields["Weapon 1"] = [""];
	fields["Weapon 2"] = [""];

	fields["Weapon Total Bonus 1"] = [""];
	fields["Weapon Bonus 1"] = [""];
	fields["Weapon Shock 1"] = [""];
    	fields["Weapon Total Bonus 2"] = [""];
	fields["Weapon Bonus 2"] = [""];
	fields["Weapon Shock 2"] = [""];
		
	fields['Armor 1'] = ["Secure clothing"];
	fields['Armor 2'] = ["Unarmored"];
	
	fields['AC 1'] = [String(13+dexterityMod)];
	fields['AC 2'] = [String(innate_AC+dexterityMod)];

	fields['Credits'] = [700+" credits"];

	fields['Stowed Item 1'] = ["Secure clothing"];

	fields['Stowed Enc 1'] = ["1"];

	fields['Free Equipment 1'] = ["Compad"];

	break;
    case "technician":
    	fields["Weapon 1"] = ["Laser pistol"];
	fields["Weapon 2"] = ["Monoblade knife"];
	
	fields["Weapon Total Bonus 1"] = ["1d6"+displayBonus((dexterityMod+shoot_bonus))];
	fields["Weapon Bonus 1"] = [displayBonus((1+ranged_bonus+skillToAttackBonus(fields["Shoot Skill"][0])))];
	fields["Weapon Shock 1"] = [""];
    	fields["Weapon Total Bonus 2"] = ["1d6"+displayBonus(maxMod+stab_bonus)];
	fields["Weapon Bonus 2"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Stab Skill"][0])))];
	fields["Weapon Shock 2"] = ["Shock: "+(1+maxMod+stab_bonus+shock_bonus)+"/AC15"];
		
	fields['Standard Range 1'] = ["100"];
	fields['Max Range 1'] = ["300"];

	fields['Armor 1'] = ["Armored undersuit"];
	fields['Armor 2'] = ["Unarmored"];
	
	fields['AC 1'] = [String(13+dexterityMod)];
	fields['AC 2'] = [String(innate_AC+dexterityMod)];

	fields['Credits'] = [200+" credits"];
	
	fields['Stowed Item 1'] = ["Laser pistol"];
	fields['Stowed Item 2'] = ["Armored undersuit"];
	fields['Stowed Item 3'] = ["Monoblade knife"];
	fields['Stowed Item 4'] = ["Postech toolkit"];
	fields['Stowed Item 5'] = ["6 units of spare parts"];
	fields['Stowed Item 6'] = ["4 type A cells"];
	fields['Stowed Item 7'] = ["Backpack (TL0)"];
	fields['Stowed Item 8'] = ["Dataslab"];
	fields['Stowed Item 9'] = ["Metatool"];

	fields['Stowed Enc 1'] = ["1"];
	fields['Stowed Enc 2'] = ["0"];
	fields['Stowed Enc 3'] = ["1"];
	fields['Stowed Enc 4'] = ["3"];
	fields['Stowed Enc 5'] = ["2"];
	fields['Stowed Enc 6'] = ["2"];
	fields['Stowed Enc 7'] = ["1"];
	fields['Stowed Enc 8'] = ["1"];
	fields['Stowed Enc 9'] = ["1"];


	break;
    case "custom":
    	fields["Weapon 1"] = [""];
	fields["Weapon 2"] = [""];

	fields["Weapon Total Bonus 1"] = [""];
	fields["Weapon Bonus 1"] = [""];
	fields["Weapon Shock 1"] = [""];
    	fields["Weapon Total Bonus 2"] = [""];
	fields["Weapon Bonus 2"] = [""];
	fields["Weapon Shock 2"] = [""];
		
	fields['Armor 1'] = ["Unarmored"];
	fields['Armor 2'] = [""];
	
	fields['AC 1'] = [String(innate_AC+dexterityMod)];
	fields['AC 2'] = [""];

	fields['Credits'] = [$("#equipment_packages_description ul li").html()];
	break;
    default:
    	fields["Weapon 1"] = [""];
    	fields["Weapon 2"] = [""];

    	fields["Weapon Total Bonus 1"] = [""];
    	fields["Weapon Bonus 1"] = [""];
    	fields["Weapon Shock 1"] = [""];
    	fields["Weapon Total Bonus 2"] = [""];
    	fields["Weapon Bonus 2"] = [""];
    	fields["Weapon Shock 2"] = [""];

	fields['Armor 1'] = ["Unarmored"];
	fields['Armor 2'] = [""];
	
	fields['AC 1'] = [String(innate_AC+dexterityMod)];
	fields['AC 2'] = [""];

    	fields['Credits'] = [""];
    	break;
    }

    fields['Current Goals'] = [$("#goals").val()];
    fields['Notes to Remember'] = [$("#notes").val()];
   
    if(fields['Punch Skill'][0] !=""){    

	if((fields["Weapon 1"][0] !="")){

	    if(fields["Weapon 2"][0] !=""){
		
		fields['Weapon 3'] = ["Unarmed attack"];
		fields["Weapon Bonus 3"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Punch Skill"][0])))];
		fields['Weapon Total Bonus 3'] = [unarmed_base + displayBonus(maxMod+parseInt(fields['Punch Skill']))];
		fields["Weapon Shock 3"] = [unarmed_shock];
	    }
	    else{
		fields["Weapon 2"] = ["Unarmed attack"];
		fields["Weapon Bonus 2"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Punch Skill"][0])))];
		fields["Weapon Total Bonus 2"] = [unarmed_base + displayBonus(maxMod+parseInt(fields['Punch Skill']))];
		fields["Weapon Shock 2"] = [unarmed_shock];
	    }
	}
	else{
	    fields["Weapon 1"] = ["Unarmed attack"];
	    fields["Weapon Bonus 1"] = [displayBonus((attackMod+maxMod+skillToAttackBonus(fields["Punch Skill"][0])))];
	    fields["Weapon Total Bonus 1"] = [unarmed_base + displayBonus(maxMod+parseInt(fields['Punch Skill']))];
	    fields["Weapon Shock 1"] = [unarmed_shock];
	}
	
    }
    

    var technique_text = "";
    
    for(var discipline of psionic_disciplines){
	var elemRankBox0 = document.getElementById(discipline+'_rank_box_0');
	var elemRankBox1 = document.getElementById(discipline+'_rank_box_1');

	if (elemRankBox1.checked){
	    technique_text +=psionics[discipline]["name"].toUpperCase()+"\n"+psionics[discipline]["core"]["name"]+": "+psionics[discipline]["core"]["descriptionabbreviated"]+"\nLevel-0: "+psionics[discipline]["core"]["level0abbreviated"]+"\nLevel-1: "+psionics[discipline]["core"]["level1abbreviated"]+"\n\n";

	    var level1technique = $("#"+discipline+"_level1").val();
	    if(level1technique != null) {
		technique_text+=level1technique+": "+psionics[discipline]["level1abbreviated"][level1technique]+"\n\n";
	    }
	    
	}
	else if (elemRankBox0.checked){
	    technique_text+=psionics[discipline]["name"].toUpperCase()+"\n"+psionics[discipline]["core"]["name"]+": "+psionics[discipline]["core"]["descriptionabbreviated"]+"\nLevel-0: "+psionics[discipline]["core"]["level0abbreviated"]+"\n\n";
	}

    }

    fields['Technique 1'] = [technique_text];
    
    xhr.onload = function() {
	if (this.status == 200) {
	    filled_pdf = pdfform().transform(this.response, fields);
	    var blob = new Blob([filled_pdf], {type: 'application/pdf'});
	    var filename ='character_sheet.pdf';
	    if($("#name").val()!="") filename=$("#name").val()+"_character_sheet.pdf";
	    saveAs(blob, filename);
	} else {
	    alert('failed to load blank character sheet pdf (code: ' + this.status + ')');
	}
    };
    
    xhr.send();

}

/*
Roll random attributes (as if the #rollAttrsTopLayer was clicked), and then set the minimum rolled attribute to 14.
*/
function pickRandomAttributes(){
    $("#rollAttrsTopLayer").click();

    var attributeScores = [];
    for (var attr of attrs){
	attributeScores.push(parseInt($('#'+attr+'_attr').html()));
    }

    var minIndex = attributeScores.indexOf(Math.min.apply(Math,attributeScores));
    var elem = document.getElementById('14attrList');
    
    $('#14attrList').selectmenu().val(attrs[minIndex]);
    $('#14attrList').selectmenu("refresh");
    $('#14attrList').trigger('change');
}

/*
Choose a class randomly according to the following rates: Expert 25%, Psychic 25%, Warrior 25%, Expert/Psychic 8.33%, Expert/Warrior 8.33%, Psychic/Warrior 8.33%
*/
function pickRandomClass(){
    var roll = rollDie(12);
    var Class;
    if (roll <= 3){
	Class = "expert";
	pickRandomGeneralFocus();
	pickRandomNonCombatFocus();
    }
    else if(roll <= 6){
	Class = "psychic";
	pickRandomGeneralFocus();
    }
    else if(roll <= 9){
	Class = "warrior";
	pickRandomGeneralFocus();
	pickRandomCombatFocus();
    }
    else if(roll == 10){
	Class = "exp_psy";
	pickRandomGeneralFocus();
	pickRandomNonCombatFocus();
    }
    else if (roll == 11){
	Class = "war_exp";
	pickRandomGeneralFocus();
	pickRandomCombatFocus();
	pickRandomNonCombatFocus();
    }
    else if (roll == 12){
	Class = "war_psy";
	pickRandomGeneralFocus();
	pickRandomCombatFocus();
    }

    $('#class_mirror').selectmenu().val(Class);
    $('#class_mirror').selectmenu("refresh");
    document.getElementById("class").value = Class;
    $('#class').trigger('change');

}

/*Choose a random background.*/
function pickRandomBackground(){
    var backgroundKeys = Object.keys(backgrounds);
    var roll = rollDie(backgroundKeys.length-1);
    var background = backgroundKeys[roll-1];
    
    $('#backgrounds_mirror').selectmenu().val(background);
    $('#backgrounds_mirror').selectmenu("refresh");
    document.getElementById("backgrounds").value = background;
    $('#backgrounds').trigger('change');

    rollLearning();
    rollLearning();
    rollLearning();
}

/*Choose a random general focus. If the option is currently disabled (not eligible because of class or already selected twice), then reroll to pick a different random focus.*/
function pickRandomGeneralFocus(){

    var elem = document.getElementById("foci");
    var options = elem.options;
    var roll = rollDie(options.length-1);

    if(options[roll].hasAttribute("disabled")){
	pickRandomGeneralFocus();
    }
    else{
	elem.value = options[roll].value;
	$('#foci').trigger('change');
    }
}

/*Choose a random combat focus. If the option is currently disabled (not eligible because of class or already selected twice), then reroll to pick a different random focus.*/
function pickRandomCombatFocus(){

    var elem = document.getElementById("combat_foci");
    var options = elem.options;
    var roll = rollDie(options.length-1);

    if(options[roll].hasAttribute("disabled")){
	pickRandomCombatFocus();
    }
    else{
	elem.value = options[roll].value;
	$('#combat_foci').trigger('change');
    }    
}

/*Choose a random noncombat focus. If the option is currently disabled (not eligible because of class or already selected twice), then reroll to pick a different random focus.*/
function pickRandomNonCombatFocus(){

    var elem = document.getElementById("noncombat_foci");
    var options = elem.options;
    var roll = rollDie(options.length-1);

    if(options[roll].hasAttribute("disabled")){
	pickRandomNonCombatFocus();
    }
    else{
	elem.value = options[roll].value;
	$('#noncombat_foci').trigger('change');
    }       
}

function pickRandomEquipmentPackage(){
    var packageKeys = Object.keys(packages);
    var roll = rollDie(packageKeys.length);
    
    document.getElementById("equipment_packages").value = packageKeys[roll-1];
    $('#equipment_packages').trigger('change');
}

function pickRandomSkills(){

    while(combat_skill_remaining > 0){
	pickRandomCombatSkill();
//	useCombatSkill();
    }

    while(noncombat_skill_remaining > 0){
	pickRandomNonCombatSkill();
//	useNonCombatSkill();
    }
    while(psychic_skill_remaining > 0){
	pickRandomPsychicSkill();
//	usePsychicSkill();
    }
    while(any_skill_remaining > 0){
	pickRandomNonPsychicSkill();
//	useAnySkill();
    }
      
}

function pickRandomNonPsychicSkill(){
    var skillKeys = Object.keys(skills);

    var anySkills = [];
    for (var skillKey of skillKeys){
	if(!(skills[skillKey]["psychic"])) anySkills.push(skillKey);
    }

    var roll=rollDie(anySkills.length);
    var skill=anySkills[roll-1];

    incrementPickedSkill(skill);
    
    // if ($('#'+skill+'_rank_box_1').prop( "checked")){
    // }
    // else if ($('#'+skill+'_rank_box_0').prop( "checked")){
    // 	$('#'+skill+'_rank_box_1').prop( "checked",true);
    // 	$('#'+skill+'_rank_box_1').trigger("change");
    // }
    // else{
    // 	$('#'+skill+'_rank_box_0').prop( "checked", true );
    // 	$('#'+skill+'_rank_box_0').trigger("change");
    // }
    
    
//    incrementFixedSkill(anySkills[roll-1]);
}

function pickRandomCombatSkill(){
    var skillKeys = Object.keys(skills);

    var combatSkills = [];
    for (var skillKey of skillKeys){
//	console.log(skillKey);
	if(skills[skillKey]["combat"]) combatSkills.push(skillKey);
    }

    var roll=rollDie(combatSkills.length);
    var skill=combatSkills[roll-1];

    incrementPickedSkill(skill);
    
    // if ($('#'+skill+'_rank_box_1').prop( "checked")){
    // }
    // else if ($('#'+skill+'_rank_box_0').prop( "checked")){
    // 	$('#'+skill+'_rank_box_1').prop( "checked",true);
    // 	$('#'+skill+'_rank_box_1').trigger("change");
    // }
    // else{
    // 	$('#'+skill+'_rank_box_0').prop( "checked", true );
    // 	$('#'+skill+'_rank_box_0').trigger("change");
    // }

//    console.log(roll);
//    console.log(combatSkills[roll-1]);
//    incrementFixedSkill(combatSkills[roll-1]);
}

function pickRandomNonCombatSkill(){
    var skillKeys = Object.keys(skills);

    var nonCombatSkills = [];
    for (var skillKey of skillKeys){
//	console.log(skillKey);
	if(!(skills[skillKey]["combat"]||skills[skillKey]["psychic"])) nonCombatSkills.push(skillKey);
    }

    var roll=rollDie(nonCombatSkills.length);
    var skill=nonCombatSkills[roll-1];

    incrementPickedSkill(skill);
    
    // if ($('#'+skill+'_rank_box_1').prop( "checked")){
    // }
    // else if ($('#'+skill+'_rank_box_0').prop( "checked")){
    // 	$('#'+skill+'_rank_box_1').prop( "checked",true);
    // 	$('#'+skill+'_rank_box_1').trigger("change");
    // }
    // else{
    // 	$('#'+skill+'_rank_box_0').prop( "checked", true );
    // 	$('#'+skill+'_rank_box_0').trigger("change");
    // }

//    console.log(roll);
//    console.log(nonCombatSkills[roll-1]);
//    incrementFixedSkill(nonCombatSkills[roll-1]);
}

function pickRandomPsychicSkill(){
    var skillKeys = Object.keys(skills);

    var psychicSkills = [];
    for (var skillKey of skillKeys){
//	console.log(skillKey);
	if(skills[skillKey]["psychic"]) psychicSkills.push(skillKey);
    }

    var roll=rollDie(psychicSkills.length);
    var skill=psychicSkills[roll-1];

    incrementPickedSkill(skill);

    // if ($('#'+skill+'_rank_box_1').prop( "checked")){
    // }
    // else if ($('#'+skill+'_rank_box_0').prop( "checked")){
    // 	$('#'+skill+'_rank_box_1').prop( "checked",true);
    // 	$('#'+skill+'_rank_box_1').trigger("change");
    // }
    // else{
    // 	$('#'+skill+'_rank_box_0').prop( "checked", true );
    // 	$('#'+skill+'_rank_box_0').trigger("change");
    // }

//    console.log(roll);
//    console.log(psychicSkills[roll-1]);
//    incrementFixedSkill(psychicSkills[roll-1]);
}


function generateExportURL(){
    var name_string = (!($('#name').val()) || $('#name').val() == "") ? "" : ("name="+encodeURI($('#name').val())+"&");
    var background_string =  (!($('#backgrounds').val()) || $('#backgrounds').val() == "") ? "" : ("background="+$('#backgrounds').val()+"&");
    var class_string = (!($('#class').val()) || $('#class').val() == "") ? "" : ("class="+$('#class').val()+"&");
    var strength_string = (attrBases[0]=="") ? "" : "strength="+attrBases[0]+"&";
    var dexterity_string = (attrBases[1]=="") ? "" : "dexterity="+attrBases[1]+"&";
    var constitution_string = (attrBases[2]=="") ? "" : "constitution="+attrBases[2]+"&";
    var intelligence_string = (attrBases[3]=="") ? "" : "intelligence="+attrBases[3]+"&";
    var wisdom_string = (attrBases[4]=="") ? "" : "wisdom="+attrBases[4]+"&";
    var charisma_string = (attrBases[5]=="") ? "" : "charisma="+attrBases[5]+"&";
    var hp_string = (!($('#hp_roll').val()) || $('#hp_roll').val() == "") ? "" : ("hp="+$('#hp_roll').val()+"&");
    var equipment_string = (!($('#equipment_packages').val()) || $('#equipment_packages').val() == "") ? "" : ("equipment="+$('#equipment_packages').val()+"&");
    var homeworld_string = (!($('#homeworld').val()) || $('#homeworld').val() == "") ? "" : ("homeworld="+encodeURI($('#homeworld').val())+"&");
    var employer_string = (!($('#employer').val()) || $('#employer').val() == "") ? "" : ("employer="+encodeURI($('#employer').val())+"&");
    var species_string = (!($('#species').val()) || $('#species').val() == "") ? "" : ("species="+encodeURI($('#species').val())+"&");

    var growth_string="";
    for (var skill of growth_skills){
	growth_string+="growth="+encodeURI(skill)+"&" 
    }

    var learning_string="";
    for (var skill of learning_skills){
	learning_string+="learning="+encodeURI(skill)+"&" 
    }
    
    var picked_string="";
    for (var skill of picked_skills){
	picked_string+="picked="+skill+"&" 
    }

    var focus1_string;
    if ($('#foci').val() != ""){
	if ($('#foci').val() == "shocking_assault"){
	    focus1_string=("focus1=shocking_assault_"+punch_stab_choice.slice(0,2)+"&");
	}
	else{
	    focus1_string=("focus1="+$('#foci').val()+"&");
	}
    }
    else{
	focus1_string="";
    }

    var focus2_string;
    if($('#class').val() != null && $('#class').val().includes('war') && ($('#combat_foci').val() != "")){
	if ($('#combat_foci').val() == "shocking_assault"){
	    focus2_string=("focus2=shocking_assault_"+punch_stab_choice.slice(0,2)+"&");
	}
	else{
	    focus2_string=("focus2="+$('#combat_foci').val()+"&");
	}
    }
    else{
	focus2_string="";
    }
    
    var focus3_string;
    if($('#class').val() != null && $('#class').val().includes('exp') && ($('#noncombat_foci').val() != "")){
	focus3_string = ("focus3="+$('#noncombat_foci').val()+"&");
    }
    else{
	focus3_string="";
    }

    var technique_string="";
    for (var discipline of psionic_disciplines){
	if(picked_skills.indexOf(discipline)!=picked_skills.lastIndexOf(discipline)){
	    technique_string+="technique="+encodeURI($('#'+discipline+'_level1').val())+'&';
	}
    }

    var url="https://noah-sennett.github.io/swn-character-creator/?"+name_string+background_string+class_string+strength_string+dexterity_string+constitution_string+intelligence_string+wisdom_string+charisma_string+hp_string+equipment_string+homeworld_string+employer_string+species_string+growth_string+learning_string+picked_string+focus1_string+focus2_string+focus3_string+technique_string;

    url = url.slice(0,-1);
    
    $("#url_span").html(url);
}
    

function markText(el){
    var range, selection;
    
    if (document.body.createTextRange) {
	range = document.body.createTextRange();
	range.moveToElementText(el);
	range.select();
    } else if (window.getSelection) {
	selection = window.getSelection();
	range = document.createRange();
	range.selectNodeContents(el);
	selection.removeAllRanges();
	selection.addRange(range);
    }
}


/*Generate a random name using the Namey! random name generator https://namey.muffinlabs.com/*/
function pickRandomName(){
    namey.get({with_surname:true, callback:function(n) { $("#name").val(n[0]);$("#name_mirror").val(n[0]);}});
}


/** namey */
window.namey = {
    /**
     * API for namey random name generator.  There's two basic ways to use it.  First, just call namey.get with a callback:
     *
     * namey.get(function(n) { console.log(n); }); => ["John Clark"]
     *
     * The call returns an array because there's an option to request more than one random name. For example:
     *
     * namey.get({ count: 3, callback: function(n) { console.log(n); }}); ; => ["John Cook", "Ruth Fisher", "Donna Collins"]
     *
     * Here's the full list of parameters:
     * 
     * count -- how many names you would like (default: 1)
     *
     * type -- what sort of name you want 'female', 'male', 'surname', or leave blank if you want both genders
     *
     * with_surname -- true/false, if you want surnames with the first
     * name. If false, you'll just get first names.  Default is true.
     *
     * frequency -- 'common', 'rare', 'all' -- default is 'common'. This
     * picks a subset of names from the database -- common names are
     * names that occur frequently, rare is names that occur rarely.
     * 
     * min_freq/max_freq  -- specific values to get back a really
     * specific subset of the names db. values should be between 0 and
     * 100. You probably don't need this, but here's an example:
     * namey.get({ count: 3, min_freq: 30, max_freq: 50, callback: function(n) { console.log(n); }});
     * => ["Crystal Zimmerman", "Joshua Rivas", "Tina Bryan"]
     *
     * callback -- a function to do something with the data.  The data
     * passed in will be an array of names -- use them wisely.
     * 
     */
    get : function(options) {
	var callback;
	var tmp_params = {};
	var host = "namey.muffinlabs.com";
	//var host = window.location.host;
	var query;
	
	if ( typeof(options) == "function" ) {
	    callback = options;
	}
	else if ( typeof(options) == "object" ) {
	    callback = options.callback;
	    
	    if ( typeof(options.host) !== "undefined" ) {
		host = options.host;
	    }
	    
	    if ( typeof(options.count) == "undefined" ) {
		options.count = 1;
	    }
	    tmp_params.count = options.count;
	    
	    if ( typeof(options.type) != "undefined" && options.type != "both" ) {
		tmp_params.type = options.type;
	    };
	    
	    if ( options.type != "surname" && typeof(options.with_surname) != "undefined" ) {
		tmp_params.with_surname = options.with_surname;
	    }
	    if ( options.min_freq ) {
		tmp_params.min_freq = options.min_freq;
		tmp_params.max_freq = options.max_freq;
	    }
	    else if ( typeof(options.frequency) != "undefined" ) {
		tmp_params.frequency = options.frequency;
	    }
	}


	query = Object.keys(tmp_params)
            .map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(tmp_params[k]);
            })
            .join('&');
	
	window.fetch('https://namey.muffinlabs.com/name.json?' + query, { mode: 'cors' })
            .then(function(d) { return d.json(); })
            .then(function(d) {
	        if ( typeof(callback) == "function" ) {
		    callback(d);
	        }
	        else {
		    console.log(d);
	        }
	    });
    }
}
