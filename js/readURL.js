'use strict'

function readURLParams(){

    readURLParam('name','name');
    readURLParam('name','name_mirror');
    readURLParam('employer','employer');
    readURLParam('homeworld','homeworld');
    readURLParam('species','species');

    readURLBackgroundParams();

    readURLAttributeParams();

    readURLHPParams();

    readURLFociParams();

    readURLClassParams();

    readURLSkillParams();
    
    readURLTechniqueParams();
    
    readURLEquipmentParams();

}

function readURLParam(param, elemName){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has(param)){
	$('#'+elemName).val(decodeURI(urlParams.get(param)));
    }
}

function readURLClassParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has('class')){
	$('#class_mirror').selectmenu().val(urlParams.get('class'));
	$('#class_mirror').selectmenu("refresh");
	$('#class_mirror').trigger('change');
    }
}
      

function readURLBackgroundParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has('background')){
	$('#backgrounds_mirror').selectmenu().val(urlParams.get('background'));
	$('#backgrounds_mirror').selectmenu("refresh");
	$('#backgrounds_mirror').trigger('change');
    }
}

function readURLAttributeParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    for (var attr of attrs){
        if (urlParams.has(attr)){
	    $('#'+attr+'_attr').html(urlParams.get(attr));

	    var ind=attrs.indexOf(attr);
	    attrBases[ind]=urlParams.get(attr);

	    updateMod(attr);
	    updateStatus1();
	}
    }
}

function readURLHPParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    if(urlParams.has('hp')){
	$("#rollHPTopLayer").click();
	$('#hp_roll').val(parseInt(urlParams.get('hp')));
    }

}

function readURLFociParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has('focus1')){
	$('#foci').val(urlParams.get('focus1'));
	$('#foci').trigger('change');
    }

    if(urlParams.has('focus2')){
	$('#combat_foci').val(urlParams.get('focus2'));
	$('#combat_foci').trigger('change');

    }

    if(urlParams.has('focus3')){
	$('#noncombat_foci').val(urlParams.get('focus3'));
	$('#noncombat_foci').trigger('change');
    }
}

function readURLTechniqueParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has('technique')){
	var technique = decodeURI(urlParams.get('technique'));
	for(var discipline of psionic_disciplines){
	    if(Object.keys(psionics[discipline]['level1']).includes(technique)){
		$('#'+discipline+'_level1').val(technique);
		$('#'+discipline+'_level1').trigger('change');
	    }
	}
    }
}

function readURLEquipmentParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has('equipment')){
	$('#equipment_packages').val(urlParams.get('equipment'));
	$('#equipment_packages').trigger('change');
    }
}

function readURLSkillParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has('learning')){
	var learningSkills = urlParams.getAll('learning');

	for (var skill of learningSkills){
	    learning_skills.push(decodeURI(skill));
	    remainingRolls--;

	}
    }

    if(urlParams.has('growth')){
	var growthSkills = urlParams.getAll('growth');

	for (var skill of growthSkills){
	    growth_skills.push(decodeURI(skill));
	    remainingRolls--;

	    var substrings = decodeURI(skill).split(" ");
	    for (var substring of substrings){
		var ind = attrs.indexOf(substring);
		if (ind !=-1){
		    attrBonuses[ind]++;
		}
	    }	    
	}
    }

    updateSkills();
    
    if(urlParams.has('picked')){
	
	var pickedSkills = urlParams.getAll('picked');

	for (var ind=0; ind<pickedSkills.length; ind++){

	    var skill=pickedSkills[ind];

	    incrementPickedSkill(skill);
	    
	    // if (ind == pickedSkills.indexOf(skill)){
	    // 	$('#'+skill+'_rank_box_0').prop( "checked", true );
	    // 	$('#'+skill+'_rank_box_0').trigger("change");
	    // }
	    // else{
	    // 	$('#'+skill+'_rank_box_1').prop( "checked", true );
	    // 	$('#'+skill+'_rank_box_1').trigger("change");
	    // }
	}
    }

}

