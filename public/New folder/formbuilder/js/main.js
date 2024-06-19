$(document).ready(function(){
    //updatePageOrder();
	$(".btnclose").on("click", function() {
     $('.modal').modal('hide');
  })
});





function addElement(pageid,elementtype,datatypeid,elementdata){
    if( elementdata ){
        
    }else{
        if( elementtype == 'multisignature' && $(".questType_20").length > 0 ){
            showFormAlert();
            return;
        }
    }
    
    therAreas = therAreasMain;
    cogLevels = cogLevelsMain;
    qstatus = qstatusMain;
    
    if( elementdata ){
        therAreas = elementdata.therAreas;
        cogLevels = elementdata.cogLevels;
        qstatus = elementdata.qstatus;
    }
    
    $(".add-element-"+pageid).hide();
    var typeHTML = getTypeHTML(elementtype,pageid,datatypeid,elementdata);
    
    if( elementdata ){
        $("#question_"+elementdata.questionDets.question_bank_uuid).hide();
        //$(typeHTML).insertAfter($("#question_"+elementdata.questionDets.question_bank_uuid));
        $("#form-page-"+pageid).children('.page-content').append(typeHTML);
        
        $("#question_code_"+pageid).attr('readonly',true);
        
        if( moduleurl == 'formbuilder' ){

            $("#question_code_"+pageid).attr('readonly',true);

        }
        //getPageQuestions(1,elementdata.questionDets.question_bank_uuid);
    }else{
        $("#form-page-"+pageid).children('.page-content').append(typeHTML);
        
        getAutomatedQuestionID(pageid);
        
        //$("#questionname_"+pageid).focus();
        $('html, body').animate({
            scrollTop: $("#fake-element-"+pageid).offset().top
            //scrollTop: $("#questionname_"+pageid).offset().top
            //scrollTop: $("#questionname_"+pageid).offset().top
        });
    }
    if( elementtype == 'ranking' ){
        var rowID = 'row_'+pageid;
        attachSortable(rowID);
        var colID = 'column_'+pageid;
        attachSortable(colID);
    }else{
        attachSortable(pageid);
    }
	
    /*if( elementdata ){
		var logicData = elementdata.questionDets.logic;
		var sublogicData = elementdata.questionDets.sublogic;
	
		if( logicData ){
			$.each(logicData, function (i, elem) {
				$("#logic-page_"+elem.choiceid).val(elem.page);
				$("#logic-page_"+elem.choiceid).change();
			});

			setTimeout(function(){
				$.each(logicData, function (i, elem) {
					//$("#logic-pquestion_"+elem.choiceid).val(elem.question);
                    $('#logic-pquestion_'+elem.choiceid+' option[value='+elem.question+']').attr('selected','selected');
				});
			},2000);

		}
        
        if( sublogicData ){
			if( sublogicData.enableshowhide ){
                $("#enableshowhide_"+pageid).attr('checked',true);
                $("#showhidediv_"+elementdata.questionDets.questionid).show();
            }
            if( sublogicData.choice != '' ){
                $("#sublogic-page_"+elementdata.questionDets.questionid).val(sublogicData.choice);
            }
		}
        
        if( elementdata.questionDets.datasourceid != 0 ){
            $("#datasource_"+pageid).val(elementdata.questionDets.datasourceid);
        }
        
        if( elementdata.questionDets.adjustlayout == 1 ){
            $("#pageelement_"+pageid).find("#questionwidth_"+pageid).val(elementdata.questionDets.questionwidth);
        }
	}*/
    //if( elementtype == 'statictext' ){
        initiateEditor(pageid);
    //}
    validateElement(pageid);
    //updateQuestionOrder(pageid);
}

function addSubElement(pageid,questionid,elementtype,datatypeid,elementdata){
    //$(".add-element-"+pageid).hide();
    var typeHTML = getTypeHTML(elementtype,pageid,datatypeid,elementdata);
    
    if( elementdata ){
        $("#question_"+elementdata.questionDets.question_bank_uuid).hide();
        $(typeHTML).insertAfter($("#question_"+elementdata.questionDets.question_bank_uuid));
        therAreas = elementdata.therAreas;
        cogLevels = elementdata.cogLevels;
        qstatus = elementdata.qstatus;
        
    }else{
        var questID = $(".page-content").find("[data-elementid='" + questionid + "']").attr('id'); 
        //console.log( questID );
        //console.log( $('.subof_'+questionid).length );
        if( $('.subof_'+questionid).length > 0 ){
            $(typeHTML).insertAfter($('.subof_'+questionid).last());
        }else{
            $(typeHTML).insertAfter($("#"+questID));
        }
        
        $("#form-div_"+pageid).append('<input type="hidden" name="subof" value="'+questionid+'"/>');
        //$('<li class="nav-item"><a class="nav-link" id="nav-logic" href="javascript:void(0);">LOGIC</a></li>').insertAfter($("#question-options_"+pageid));
    }
    if( elementdata ){
		var logicData = elementdata.questionDets.logic;
	
		if( logicData ){
			$.each(logicData, function (i, elem) {
				$("#logic-page_"+elem.choiceid).val(elem.page);
				$("#logic-page_"+elem.choiceid).trigger('change');
			});

			setTimeout(function(){
				$.each(logicData, function (i, elem) {
					$("#logic-pquestion_"+elem.choiceid).val(elem.question);
				});
			},500);

		}
        
        if( elementdata.questionDets.adjustlayout == 1 ){
            $("#pageelement_"+pageid).find("#questionwidth_"+pageid).val(elementdata.questionDets.questionwidth);
        }
	}
    //if( elementtype == 'statictext' ){
        initiateEditor(pageid);
    //}
    validateElement(pageid);
}

function initiateEditor(pageid){
    tinymce.remove();
      tinymce.init({
          selector: '#questionname_'+pageid,
          menubar: false,
          paste_as_text: true,
          paste_auto_cleanup_on_paste : true,
          paste_remove_styles: true,
          paste_remove_styles_if_webkit: true,
          paste_strip_class_attributes: true,
          height: 200,
          plugins: 'searchreplace autolink directionality visualblocks visualchars fullscreen image link media charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern',
          toolbar1: 'formatselect | fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
          image_advtab: true,
          setup: function (ed) {
              ed.on('change', function(e) {
                    $("#questionname_"+pageid).val(ed.getContent());
                    $("#questionname_"+pageid).html(ed.getContent());
                    $("#questionname_"+pageid).valid();
               });
               ed.on('keyup', function(e) {
                   $("#questionname_"+pageid).val(ed.getContent());
                   $("#questionname_"+pageid).html(ed.getContent());
                   $("#questionname_"+pageid).valid();
               });
          }
     });
}

function getTypeHTML(elementtype,pageid,datatypeid,elementdata){
    //var qHTML = '<div id="fake-element-'+pageid+'" class="fake-element mb-4"><form name="pageelement_'+pageid+'" id="pageelement_'+pageid+'"> ';
    var qHTML = '<div id="fake-element-'+pageid+'" class="fake-element mb-4">';
    var elementValue = elementkey = sign1Text = sign2Text = witnessText = qCodeValue = descValue = scoredYesSel = scoredNoSel = displayMYSel = displayMNSel = '';
    var elemChoiceCnt = elemRowCnt = elemColCnt = 2;
    var authorValue = authorname;
    var reqMsg = 'This question requires an answer.';
    var isReq = logicClick = moveClick = otherchecked = adjustLayout = questWidth = witnessStyle = enableWitness = fillByEntUser = adjustFontSize = questFontSize = '';
    var otherlabel = 'Other';
    var showMove = 1;
    var showLogic = 0;
    if( elementtype == 'singlechoice' || elementtype == 'multiplechoice' || elementtype == 'dropdown' ){
        showLogic = 1;
    }
    if( elementdata ){
        elementValue = elementdata.questionDets.question_stem;
        authorValue = elementdata.questionDets.author;
        qCodeValue = elementdata.questionDets.question_code;
        descValue = ( elementdata.questionDets.description != '' && elementdata.questionDets.description != null ) ? elementdata.questionDets.description : '';
        elemChoiceCnt = elementdata.questionDets.totalchoices;
        elemRowCnt = elementdata.questionDets.totalrows;
        elemColCnt = elementdata.questionDets.totalcolumns;
        elementkey = elementdata.questionDets.question_bank_uuid;
        scoredYesSel = ( elementdata.questionDets.is_scored == '1' ) ? 'checked' : '';
        scoredNoSel = ( elementdata.questionDets.is_scored == '0' ) ? 'checked' : '';
        displayMYSel = ( elementdata.questionDets.display_as_matrix == '1' ) ? 'checked' : '';
        displayMNSel = ( elementdata.questionDets.display_as_matrix == '0' ) ? 'checked' : '';
        /*reqMsg = ( elementdata.questionDets.requiredmessage != '') ? elementdata.questionDets.requiredmessage : reqMsg;
        isReq = ( elementdata.questionDets.isrequired == '1') ? 'checked' : '';
        logicClick = 'onclick="changeElementSettings(\'logic\')"';*/
        moveClick = 'onclick="changeElementSettings(\'move\')"';
        /*otherlabel = (elementdata.questionDets.addotheroption=='1') ? elementdata.questionDets.otheroptionlabel :'Other';
        otherchecked = (elementdata.questionDets.addotheroption=='1') ? 'checked' : '';
        if( elementdata.questionDets.subof != 0 ){
            showMove = 0;
            showLogic = 1;
        }
        adjustLayout = ( elementdata.questionDets.adjustlayout == '1') ? 'checked' : '';
        questWidth = ( elementdata.questionDets.adjustlayout == '1') ? '' : 'display:none;';
        sign1Text = elementdata.questionDets.signature1_text;
        sign2Text = elementdata.questionDets.signature2_text;
        enableWitness = ( elementdata.questionDets.enablewitness == '1') ? 'checked' : '';
        witnessText = elementdata.questionDets.witness_text;
        witnessStyle = ( elementdata.questionDets.enablewitness == '1') ? '' : 'display:none;';
        fillByEntUser = (elementdata.questionDets.orguser_filling=='1') ? 'checked' : '';
        adjustFontSize = ( elementdata.questionDets.options.adjust_fontsize == 'on') ? 'checked' : '';
        questFontSize = ( elementdata.questionDets.options.adjust_fontsize == 'on') ? '' : 'display:none;';*/
    }
    
    qHTML +='<ul class="">';
             /* '<li class="nav-item">'+
                '<a class="nav-link active" id="nav-edit" href="javascript:void(0);" onclick="changeElementSettings(\'edit\')">EDIT</a>'+
              '</li>';
               '<li class="nav-item" id="question-options_'+pageid+'">'+
                '<a class="nav-link" id="nav-options" href="javascript:void(0);" onclick="changeElementSettings(\'options\')">OPTIONS</a>'+
              '</li>';
                if( showLogic == 1 ){
              qHTML += '<li class="nav-item">'+
                '<a class="nav-link" id="nav-logic" href="javascript:void(0);" '+logicClick+'>LOGIC</a>'+
              '</li>';
                }
        if( showMove == 1 ){
	 	     qHTML += '<li class="nav-item">'+
                '<a class="nav-link" id="nav-move" href="javascript:void(0);" '+moveClick+'>QUESTION ORDER</a>'+
              '</li>';
        }*/
    qHTML +=  '</ul>';

    qHTML +='<div class="fake-element-wrapper">';

    qHTML +='<div class="fake-element-edit fake-attributes" style="display:block;">';
    if( elementtype == 'statictext' ){
        qHTML += '<div class="form-group"><textarea class="form-control" placeholder="Enter your text" name="question" id="questionname_'+pageid+'" />'+elementValue+'</textarea></div>';
    }else{
        qHTML += '<div class="form-group" id="form-div_'+pageid+'">'+
            '<div class="row">'+
                '<div class="col-12 col-md-12 mb-3">'+
                    '<div class="form-group">'+
                        '<label for="questionname_'+pageid+'">Question Stem<span class="red">*</span></label>'+
                        '<textarea class="form-control" name="question" id="questionname_'+pageid+'" >'+elementValue+'</textarea>'+
                    '</div>'+
                '</div>';
        
                if( moduleurl != 'test' && moduleurl != 'evaluation' ){
                    qHTML += '<div class="col-12 col-lg-4 col-xl-3 mb-3">'+
                        '<div class="form-group">'+
                            '<label for="question_code_'+pageid+'">Question ID<span class="red">*</span></label>'+
                            '<input type="text" class="form-control" placeholder="Enter Question ID" name="question_code" id="question_code_'+pageid+'" value="'+qCodeValue+'"  />'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-12 col-lg-4 col-xl-3 mb-3">'+
                        '<div class="form-group">'+
                            '<label for="event_type_id_'+pageid+'">Therapeutic Area<span class="red">*</span></label>'+
                            '<select class="form-control" name="event_type_id" id="event_type_id_'+pageid+'">'+therAreas+'</select>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-12 col-lg-4 col-xl-3 mb-3">'+
                        '<div class="form-group">'+
                            '<label for="author_'+pageid+'">Author<span class="red">*</span></label>'+
                            '<input type="text" class="form-control" placeholder="Enter author" name="author" id="author_'+pageid+'" value="'+authorValue+'" />'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-12 col-lg-4 col-xl-3 mb-3">'+
                        '<div class="form-group">'+
                            '<label for="cognitive_level_'+pageid+'">Cognitive Level<span class="red">*</span></label>'+
                            '<select class="form-control" name="cognitive_level_id" id="cognitive_level_'+pageid+'">'+cogLevels+'</select>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-12 col-lg-4 col-xl-3 mb-3">'+
                        '<div class="form-group">'+
                            '<label for="status_'+pageid+'">Status<span class="red">*</span></label>'+
                            '<select class="form-control" name="status" id="status_'+pageid+'">'+qstatus+'</select>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-12 col-lg-4 col-xl-3 mb-3">'+
                        '<div class="form-group">'+
                            '<label for="password">Is Scored<span class="red">*</span></label>'+
                            '<div class="invite-check mt-2 d-flex">'+
                                '<div class="form-check mr-3 ps-0">'+
                                    '<input class="form-radio-input" type="radio" name="scored" value="1" '+scoredYesSel+' > Yes'+
                                '</div>'+
                                '<div class="form-check">'+
                                    '<input class="form-radio-input" type="radio" name="scored" value="0" '+scoredNoSel+' > No'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    /*'<div class="col-12 col-lg-4 col-xl-3 mb-3">'+
                        '<div class="form-group">'+
                            '<label for="password">Display as Matrix<span class="red">*</span></label>'+
                            '<div class="invite-check mt-2 d-flex">'+
                                '<div class="form-check mr-3 ps-0">'+
                                    '<input class="form-radio-input" type="radio" name="displayasmatrix" value="1" '+displayMYSel+' > Yes'+
                                '</div>'+
                                '<div class="form-check">'+
                                    '<input class="form-radio-input" type="radio" name="displayasmatrix" value="0" '+displayMNSel+' > No'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+*/
                    '<div class="col-12 mb-3">'+
                        '<div class="form-group">'+
                            '<label for="password">Description</label>'+
                            '<textarea class="form-control" name="description">'+descValue+'</textarea>'+
                        '</div>'+
                    '</div>'+
                '</div>';
            }
        
        if( elementtype == 'singlechoice' ){
			qHTML += '<div style="border-radius: 6px;border: none;background: #ecf8f8;" class="col-12 p-3 dragcls_'+pageid+'"> ';
            var i;
            for (i = 1; i <= elemChoiceCnt; i++) {
                var choiceValue = choiceHiddenHTML = choiceSel = '';
                if( elementdata ){
                    choiceValue = elementdata.questionDets.choices[i].answer;
                    choiceHiddenHTML = '<input type="hidden" name="choices['+i+'][choicekey]" value="'+elementdata.questionDets.choices[i].id+'"/>';
                    choiceSel = ( elementdata.questionDets.choices[i].correct_answer == 1 ) ? 'checked' : '';
                }
              qHTML += '<div class="row multisort_drag choices_'+pageid+'" id="form-choice_'+pageid+'_'+i+'"><div class="col-8"><div class="form-group mt-2 form-check element-choices-'+pageid+'"><input type="radio" disabled class="form-check-input" style="margin-top: 12px;"><input type="text" class="form-control choice-inps pl-2" placeholder="Enter your choice" name="choices['+i+'][choice]" value="'+choiceValue+'" >'+choiceHiddenHTML+'</div></div><div class="col-2 text-center"><div class="form-group mt-3"><label class=""><div class="form-check px-2"><input class="form-radio-input" type="radio" name="rightanswer" value="'+i+'" '+choiceSel+' ></div></label><label for="rightanswer">Right Answer</label></div></div><div class="col-2 text-right"><a class="btn btn-sm btn-outline-secondary mt-2 icondrag btn-drag" style="margin-right: 2px;"><i class="fas fa-bars"></i></a><a href="javascript:void(0)" onclick="addChoice(\''+pageid+'\',\''+elementtype+'\')" style="margin-right: 2px;" class="btn btn-sm btn-outline-primary mt-2 btn-drag"><i class="fa fa-plus"></i></a><a href="javascript:void(0)" onclick="removeChoice(\''+pageid+'\',\''+i+'\')" class="btn btn-sm btn-outline-danger mt-2 btn-drag"><i class="fa fa-minus"></i></a></div></div>';
            }
			 qHTML += '<div class="col-9 tcr errordiv" id="righterror_'+pageid+'"></div><div class="col-3"></div></div>';
			
        }
        
        if( elementtype == 'multiplechoice' ){
			qHTML += '<div class="col-12 dragcls_'+pageid+' px-3"> ';
            var i;
            for (i = 1; i <= elemChoiceCnt; i++) {
                var choiceValue = choiceHiddenHTML = choiceSel = '';
                if( elementdata ){
                    choiceValue = elementdata.questionDets.choices[i].answer;
                    choiceHiddenHTML = '<input type="hidden" name="choices['+i+'][choicekey]" value="'+elementdata.questionDets.choices[i].id+'"/>';
                    choiceSel = ( elementdata.questionDets.choices[i].correct_answer == 1 ) ? 'checked' : '';
                }
              qHTML += '<div class="row align-items-center choices_'+pageid+'" id="form-choice_'+pageid+'_'+i+'"><div class="col-8"><div class="form-group mt-2 form-check element-choices-'+pageid+'"><input type="checkbox" disabled class="form-check-input" style="margin-top: 12px;"><input type="text" class="form-control choice-inps pl-2" placeholder="Enter your choice" name="choices['+i+'][choice]" value="'+choiceValue+'" >'+choiceHiddenHTML+'</div></div><div class="col-2 text-center"><div class="form-group mt-3"><label class=""><div class="form-check px-2"><input class="form-radio-input" type="radio" name="rightanswer" value="'+i+'" '+choiceSel+' ></div></label><label for="rightanswer">Right Answer</label></div></div><div class="col-2 text-right"><a class="btn btn-sm btn-outline-secondary mt-2 icondrag btn-drag" style="margin-right: 2px;"><i class="fas fa-bars"></i></a><a href="javascript:void(0)" onclick="addChoice(\''+pageid+'\',\''+elementtype+'\')" style="margin-right: 2px;" class="btn btn-sm btn-outline-primary mt-2 btn-drag"><i class="fa fa-plus"></i></a><a href="javascript:void(0)" onclick="removeChoice(\''+pageid+'\',\''+i+'\')" class="btn btn-sm btn-outline-danger mt-2 btn-drag"><i class="fa fa-minus"></i></a></div></div>';
            }
			 qHTML += '<div class="col-9 tr errordiv" id="righterror_'+pageid+'"></div><div class="col-3"></div></div>';
        }
        
        if( elementtype == 'dropdown' ){
            var i;
			qHTML += '<div class="col-12 dragcls_'+pageid+'"> ';
            for (i = 1; i <= elemChoiceCnt; i++) {
                var choiceValue = choiceHiddenHTML = '';
                if( elementdata ){
                    choiceValue = elementdata.questionDets.choices[i].choice;
                    choiceHiddenHTML = '<input type="hidden" name="choices['+i+'][choicekey]" value="'+elementdata.questionDets.choices[i].choicekey+'"/>';
                }
              qHTML += '<div class="row choices_'+pageid+'" id="form-choice_'+pageid+'_'+i+'"><div class="col-9"><div class="form-group mt-2 element-choices-'+pageid+'"><input type="text" class="form-control" placeholder="Enter your choice" name="choices['+i+'][choice]" value="'+choiceValue+'" >'+choiceHiddenHTML+'</div></div><div class="col-3 text-right"><a class="btn btn-sm btn-outline-secondary mt-2 icondrag btn-drag" style="margin-right: 2px;"><i class="fas fa-bars"></i></a><a href="javascript:void(0)" onclick="addChoice(\''+pageid+'\',\''+elementtype+'\')" style="margin-right: 2px;" class="btn btn-sm btn-outline-primary mt-2 btn-drag"><i class="fa fa-plus"></i></a><a href="javascript:void(0)" onclick="removeChoice(\''+pageid+'\',\''+i+'\')" class="btn btn-sm btn-outline-danger mt-2 btn-drag"><i class="fa fa-minus"></i></a></div></div>';
            }
			qHTML += '<div class="col-9 tr errordiv" id="righterror_'+pageid+'"></div><div class="col-3"></div></div>';
        }
        
        if( elementtype == 'multisignature' ){
            qHTML += '<div class="mt-3 col-6"><label class="form-label">Signature 1 Text</label><input type="text" class="form-control" name="signature1_text" id="signature1_text_'+pageid+'" value="'+sign1Text+'" /></div>';
            
            qHTML += '<div class="row">';
            qHTML += '<div class="mt-3 col-6"><label class="form-label">Signature 2 Text</label><input type="text" class="form-control" name="signature2_text" id="signature2_text_'+pageid+'" value="'+sign2Text+'" /></div>';
            qHTML += '<div class="mt-3 col-6"><label class="form-label">Signature 2 Default Signer</label><select class="form-control" name="default_second_signing" id="default_second_signing_'+pageid+'"><option value="">--Choose--</option></select></div>';
            qHTML += '</div>';
          
            getOrgUsers(pageid,elementkey);
            
            qHTML += '<div class="form-check mt-3"><input class="form-check-input" type="checkbox" name="enablewitness" id="enablewitness_'+pageid+'" '+enableWitness+' onclick="showWitness(\''+pageid+'\')" ><label class="form-check-label">Enable Witness</label></div>';
            
            qHTML += '<div style="'+witnessStyle+'" class="mt-3 col-6" id="witness_'+pageid+'"><label class="form-label">Witness Text</label><input type="text" class="form-control" name="witness_text" id="witness_text_'+pageid+'" value="'+witnessText+'" /></div>';
        }
        
        if( elementtype == 'ranking' ){
            var rankType = 'row';
			qHTML += '<div style="border-radius: 6px;border: none;background: #ecf8f8;" class="p-3 col-12 dragcls_'+rankType+'_'+pageid+'"><div class="col-12"><strong>Row Choices</strong></div> ';
            var i;
            for (i = 1; i <= elemRowCnt; i++) {
                var choiceValue = choiceHiddenHTML = choiceSel = '';
                if( elementdata ){
                    choiceValue = elementdata.questionDets.matrixRows[i].answer;
                    choiceHiddenHTML = '<input type="hidden" name="rowchoices['+i+'][choicekey]" value="'+elementdata.questionDets.matrixRows[i].id+'"/>';
                    //choiceSel = ( elementdata.questionDets.matrixRows[i].correct_answer == 1 ) ? 'checked' : '';
                }
              qHTML += '<div class="row multisort_drag choices_'+rankType+'_'+pageid+'" id="form-choice_'+rankType+'_'+pageid+'_'+i+'"><div class="col-10"><div class="form-group mt-2 form-check element-choices-'+pageid+'"><input type="radio" disabled class="form-check-input" style="margin-top: 12px;"><input type="text" class="form-control choice-inps pl-2" placeholder="Enter your choice" name="rowchoices['+i+'][choice]" value="'+choiceValue+'" >'+choiceHiddenHTML+'</div></div>';
                
              /*qHTML += '<div class="col-2 text-center"><div class="form-group"><label for="rightanswer">Right Answer</label><label class=""><div class="form-check pl-2"><input class="form-radio-input" type="radio" name="rightanswer" value="'+i+'" '+choiceSel+' ></div></label></div></div>';*/
                
              qHTML += '<div class="col-2 text-right"><a class="btn btn-sm btn-outline-secondary mt-2 icondrag btn-drag" style="margin-right: 2px;"><i class="fas fa-bars"></i></a><a href="javascript:void(0)" onclick="addChoice(\''+pageid+'\',\''+elementtype+'\',\''+rankType+'\')" style="margin-right: 2px;" class="btn btn-sm btn-outline-primary mt-2 btn-drag"><i class="fa fa-plus"></i></a><a href="javascript:void(0)" onclick="removeChoice(\''+pageid+'\',\''+i+'\',\''+rankType+'\')" class="btn btn-sm btn-outline-danger mt-2 btn-drag"><i class="fa fa-minus"></i></a></div></div>';
            }
			 qHTML += '<div class="col-9 tr errordiv" id="righterror_'+rankType+'_'+pageid+'"></div><div class="col-3"></div></div>';
            
            
            var rankType = 'column';
			qHTML += '<div style="border-radius: 6px;border: none;background: #ecf8f8;" class="p-3 col-12 dragcls_'+rankType+'_'+pageid+'"><div class="col-12"><strong>Column Choices</strong></div> ';
            var i;
            for (i = 1; i <= elemColCnt; i++) {
                var choiceValue = choiceHiddenHTML = choiceSel = '';
                if( elementdata ){
                    choiceValue = elementdata.questionDets.matrixColumns[i].answer;
                    choiceHiddenHTML = '<input type="hidden" name="columnchoices['+i+'][choicekey]" value="'+elementdata.questionDets.matrixColumns[i].id+'"/>';
                    choiceSel = ( elementdata.questionDets.matrixColumns[i].correct_answer == 1 ) ? 'checked' : '';
                }
              qHTML += '<div class="row multisort_drag choices_'+rankType+'_'+pageid+'" id="form-choice_'+rankType+'_'+pageid+'_'+i+'"><div class="col-10"><div class="form-group mt-2 form-check element-choices-'+pageid+'"><input type="radio" disabled class="form-check-input" style="margin-top: 12px;"><input type="text" class="form-control choice-inps pl-2" placeholder="Enter your choice" name="columnchoices['+i+'][choice]" value="'+choiceValue+'" >'+choiceHiddenHTML+'</div></div>';
                
              /*qHTML += '<div class="col-2 text-center"><div class="form-group"><label for="rightanswer">Right Answer</label><label class=""><div class="form-check pl-2"><input class="form-radio-input" type="radio" name="rightanswer" value="'+i+'" '+choiceSel+' ></div></label></div></div>';*/
            
              qHTML += '<div class="col-2 text-right"><a class="btn btn-sm btn-outline-secondary mt-2 icondrag btn-drag" style="margin-right: 2px;"><i class="fas fa-bars"></i></a><a href="javascript:void(0)" onclick="addChoice(\''+pageid+'\',\''+elementtype+'\',\''+rankType+'\')" style="margin-right: 2px;" class="btn btn-sm btn-outline-primary mt-2 btn-drag"><i class="fa fa-plus"></i></a><a href="javascript:void(0)" onclick="removeChoice(\''+pageid+'\',\''+i+'\',\''+rankType+'\')" class="btn btn-sm btn-outline-danger mt-2 btn-drag"><i class="fa fa-minus"></i></a></div></div>';
            }
			 qHTML += '<div class="col-9 tr errordiv" id="righterror_'+rankType+'_'+pageid+'"></div><div class="col-3"></div></div>';
			
        }
        
        qHTML += '</div>';
        
    }
    qHTML += '</div>';


    qHTML +='<div class="fake-element-options fake-attributes" id="fake-options_'+pageid+'" style="display:none;">';
    qHTML += '<div class="form-check"><input class="form-check-input" type="checkbox" name="isrequired" id="isrequired_'+pageid+'" '+isReq+' ><label class="form-check-label">Require an Answer to This Question</label></div>';
    qHTML += '<div class="mt-3"><label class="form-label">Display this error message when this question is not answered.</label><textarea class="form-control" style="min-height: 100px;" name="requiredmessage">'+reqMsg+'</textarea></div>';
    
    qHTML += '<div class="form-check mt-3"><input class="form-check-input" type="checkbox" name="adjustlayout" id="adjustlayout_'+pageid+'" '+adjustLayout+' onclick="showQuestionLayout(\''+pageid+'\')" ><label class="form-check-label">Adjust Question Layout</label><a class="popover-trigger">? <span class="pop-content">Question layout will be adjusted if the screen size permits.</span></a></div>';
    qHTML += '<div class="mt-3 form-group" style="'+questWidth+'" id="quest-layout_'+pageid+'"><label class="form-label">Question Width</label><select class="form-control" name="questionwidth" id="questionwidth_'+pageid+'"><option value="">--Choose--</option><option value="15%">15%</option><option value="25%">25%</option><option value="50%">50%</option><option value="75%">75%</option><option value="100%">100%</option></select></div>';
    
    
    if( elementtype == 'singletext' || elementtype == 'longtext' || elementtype == 'datepicker' ){
        qHTML += '<div class="mt-3"><label class="form-label">Data Source</label><select class="form-control" name="datasource" id="datasource_'+pageid+'"><option value="">--Choose--</option><option value="1">Full Name</option><option value="2">First Name</option><option value="3">Last Name</option><option value="4">Email</option><option value="5">Date of birth</option><option value="14">Age</option><option value="7">Address</option><option value="8">City</option><option value="9">State</option><option value="10">Zip</option><option value="11">Phone</option><option value="13">Today\'s Date</option></select></div>';
    }
	 /*if( elementtype == 'singlechoice' || elementtype == 'multiplechoice' || elementtype == 'dropdown' ){
			qHTML += '<div class="form-check mt-3"><input class="form-check-input" type="checkbox" name="otheroption" id="otheroption_'+pageid+'" '+otherchecked+' ><label class="form-check-label">Add other option</label><input type="text" class="form-control" placeholder="Other" name="otheroptionvalue" value="'+otherlabel+'" ></div>';
	 }*/
    /*if( elementtype == 'singletext' || elementtype == 'longtext' || elementtype == 'datepicker' || elementtype == 'singlechoice' || elementtype == 'multiplechoice' || elementtype == 'dropdown' ){
        qHTML += '<div class="form-check mt-3"><input class="form-check-input" type="checkbox" name="orguser_filling" id="orguser_filling_'+pageid+'" '+fillByEntUser+' ><label class="form-check-label">To be filled by Enterprise User</label><br/><span style="font-size: 12px;">This form cannot be attached to open registration if this is enabled.</span></div>';
    }*/
    
    /*if( elementtype != 'statictext' ){
        qHTML += '<div class="form-check mt-3"><input class="form-check-input" type="checkbox" name="options[adjust_fontsize]" id="adjust_fontsize_'+pageid+'" '+adjustFontSize+' onclick="showDependant(\''+pageid+'\',\'fontsize\')" ><label class="form-check-label">Adjust Font Size</label><a class="popover-trigger">? <span class="pop-content">Font size is applicable only for question title.</span></a></div>';
        qHTML += '<div class="mt-3 form-group" style="'+questFontSize+'" id="options-fontsize_'+pageid+'"><label class="form-label">Font Size</label><select class="form-control additional-inps" data-parentdata="fontsize" name="options[font-size]" id="fontsize_'+pageid+'"><option value="">--Choose--</option>';
        
        var f;
        for (f = 10; f <= 20; f++) {
            var sizeValue = sizeSelected = '';
            if( elementdata ){
                sizeValue = elementdata.questionDets.options['font-size'];
                var toCheckVal = f+'px';
                if( sizeValue == toCheckVal ){
                    sizeSelected = 'selected';
                }
            }
          qHTML += '<option '+sizeSelected+' value="'+f+'px">'+f+'px</option>';
        }
        qHTML += '</select></div>';
    }*/
    
    qHTML += '</div>';
 	qHTML +='<div class="fake-element-move fake-attributes" style="display:none;">';
    qHTML += '<label>Move this question to ...</label>';
	var pageSelection = '<div class="form-check"><label class="form-check-label">Page</label><select name="move['+pageid+'][page]" class="form-control choice-logic_'+pageid+'" id="logic-page_'+elementkey+'" onchange="getPageQuestions(this, \''+pageid+'\', \''+elementkey+'\')"><option value="">Choose Page</option>';
	 		if( elementdata ){
                $.each(elementdata.pages, function (pi, pelem) {
                    pageSelection += '<option value="'+pelem.pageid+'">'+pelem.logictitle+'</option>';
                });
			}
                pageSelection += '</select></div>';
	
	var pageSelection1 = '<div class="form-check pl-0"><label class="form-check-label">Position</label><select name="move['+pageid+'][position]" class="form-control choice-logic_'+pageid+'" id="logic-position_'+elementkey+'" ><option value="after">After</option><option value="before">Before</option>';
               
                pageSelection1+= '</select></div>';
	qHTML +='<div class="col-12 pl-0"><div class="row"><div class="col-4"><div class="form-group ">'+pageSelection1+'</div></div><div class="col-4"><div class="form-group"><div class="form-check"><label class="form-check-label">Question</label><select name="move['+pageid+'][question]" class="form-control all-logic-quest_'+pageid+'" id="logic-pquestion_'+elementkey+'"></select></div></div></div><input type="hidden" name="act" value="move" /></div>';
	qHTML +='</div>';
    qHTML += '</div>';


    if( elementdata ){
        /*if( elementdata.questionDets.subof != 0 ){
            qHTML +='<div class="fake-element-logic fake-attributes" style="display:none;">';
            qHTML += '<div class="form-check"><input class="form-check-input" type="checkbox" name="sublogic[enableshowhide]" onclick="enableShowHide(this,\''+elementdata.questionDets.questionid+'\')" id="enableshowhide_'+pageid+'" ><label class="form-check-label">Enable Show/Hide</label></div>';
            qHTML += '<div class="row" style="display:none;" id="showhidediv_'+elementdata.questionDets.questionid+'"><div class="col-12"><p>Show if parent choice is ...</p></div>';
            
            qHTML += '<div class="col-12"><select name="sublogic[choice]" class="form-control choice-logic_'+elementdata.questionDets.questionid+'" id="sublogic-page_'+elementdata.questionDets.questionid+'"><option value="">--Choose--</option>';
            $.each(elementdata.parentchoices, function (i, elem) {
                qHTML += '<option value="'+elem.choiceid+'">'+elem.choice+'</option>';
            });

            qHTML += '</select></div></div>';
        }else{*/
            /*if( elementtype == 'singlechoice' || elementtype == 'multiplechoice' || elementtype == 'dropdown' ){
                qHTML +='<div class="fake-element-logic fake-attributes" style="display:none;">';
                qHTML += '<div class="row"><div class="col-4"><p>If answer is ...</p></div><div class="col-6"><p>Then skip to ...</p></div><div class="col-2"><a href="javascript:void(0)" onclick="clearLogic(\''+pageid+'\',\'all\')" style="float: right;">Clear All</a></div></div>';

                $.each(elementdata.questionDets.choices, function (i, elem) {
                    var pageSelection = '<select name="logic['+elem.choiceid+'][page]" class="form-control choice-logic_'+pageid+'" id="logic-page_'+elem.choiceid+'" onchange="getPageQuestions(this, \''+elem.pageid+'\', \''+elem.choiceid+'\')"><option value="">Choose Page</option>';
                    $.each(elementdata.pages, function (pi, pelem) {
                        pageSelection += '<option value="'+pelem.pageid+'">'+pelem.logictitle+'</option>';
                    });
                    pageSelection += '</select>';

                    qHTML += '<div class="row mb-2"><div class="col-4"><p>'+elem.choice+'</p></div>'+
                            '<div class="col-6"><div class="row"><div class="col-6"><div class="form-group ">'+pageSelection+'</div></div><div class="col-6"><div class="form-group"><select name="logic['+elem.choiceid+'][question]" class="form-control all-logic-quest_'+pageid+'" id="logic-pquestion_'+elem.choiceid+'"></select></div></div></div></div>'+
                            '<div class="col-2" style=""><a style="float: right;" href="javascript:void(0)" onclick="clearLogic(\''+pageid+'\',\''+elem.choiceid+'\')">Clear</a></div><input type="hidden" name="logic['+elem.choiceid+'][choiceid]" value="'+elem.choiceid+'" /></div>';
                });

                qHTML += '</div>';
            }*/
        //}
    }

    qHTML +='</div><!-- Fake Wrapper Close -->';    
    
    //qHTML += '<div class="qstn-btn pb-3"><div class="col-12"><input type="hidden" name="questionkey" id="questionkey" value="'+elementkey+'" /><button type="button" onclick="cancelElement(\''+pageid+'\',\''+elementkey+'\')" class="btn btn-sm btn-outline-secondary mb-2 mr-2">Cancel</button><button type="button" class="btn btn-primary mb-2 py-1" id="savebtn_'+pageid+'" onclick="saveElement(\''+pageid+'\',\''+elementtype+'\',\''+datatypeid+'\',\''+elementkey+'\')">Save</button></div></div>';
    //qHTML += '<input type="hidden" name="questionkey" id="questionkey" value="'+elementkey+'" /><form></div>';
    qHTML += '<input type="hidden" name="questionkey" id="questionkey" value="'+elementkey+'" /></div>';
    
    return qHTML;
    
}

function getOrgUsers(pageid,questkey){
    $.post(ajaxurl+moduleurl+"/getallorgusers",{
        act     : 'getusers',
        questionkey : ( questkey ) ? questkey : ''
    },function (data){
        if( data.success ){
            $("#default_second_signing_"+pageid).html(data.orguserhtml);
        }
    },'json');
}

function cancelElement(pageid,questionkey){
    $("#fake-element-"+pageid).remove();
    $(".add-element-"+pageid).show();
    if( questionkey ){
        $("#question_"+questionkey).show();
    }
}

function validateElement(pageid){
    var remoteURL = ajaxurl+moduleurl+"/checkquestioncodeexists";
    $("#pageelement_"+pageid).validate({
        ignore : [],
        rules: {
            question : 'required',
            question_code : {
                required : true,
                remote: {
                    
                    url:  remoteURL,
                    data: {
                        'questionkey' : $("#pageelement_"+pageid).find('#questionkey').val(),
                        '_token': token
                    },
                    type: "post"
                }
            },
            event_type_id : 'required',
            author : 'required',
            cognitive_level_id : 'required',
            status : 'required',
            scored : 'required',
            //displayasmatrix : 'required',
            rightanswer : {
                required: {
                    depends: function () { return ($("input[name='scored']:checked").val() == '1');  }
                }
            },
            /*requiredmessage : {
                required: {
                    depends: function () { return $("#isrequired_"+pageid).is(":checked");  }
                }
            },
            'sublogic[choice]' : {
                required: {
                    depends: function () { return $("#enableshowhide_"+pageid).is(":checked");  }
                }
            },
            questionwidth : {
                required: {
                    depends: function () { return $("#adjustlayout_"+pageid).is(":checked");  }
                }
            },
            signature1_text : 'required',
            signature2_text : 'required',
            default_second_signing : 'required',
            witness_text : {
                required: {
                    depends: function () { return $("#enablewitness_"+pageid).is(":checked");  }
                }
            },*/
        },
        messages: {
            question : 'Please enter a question.',
            question_code : {
                required: 'Please enter Question ID.',
                remote: 'This Question ID already exists.'
            },
            event_type_id : 'Please select therapeutic area.',
            author : 'Please enter author name.',
            cognitive_level_id : 'Please select cognitive level.',
            status : 'Please select status.',
            scored : 'Please select yes/no.',
            //displayasmatrix : 'Please select yes/no.',
            rightanswer : 'Please select a right answer.',
            /*requiredmessage : 'Please enter an error message.',
            'sublogic[choice]' : 'Please select a value.',
            questionwidth : 'Please select a width.',
            signature1_text : 'Please enter signature 1 text.',
            signature2_text : 'Please enter signature 2 text.',
            default_second_signing : 'Please select default second signer.',
            witness_text : 'Please enter signature 2 text.',*/
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") == "scored" || element.attr("name") == "displayasmatrix") {
                error.insertAfter(element.parent().parent().parent('div'));
            }else if (element.attr("name") == "rightanswer") {
                error.appendTo($("#righterror_"+pageid));
            } else if (element.attr("name") == "question") {
                error.appendTo(element.parent('div'));
            } else {
                error.insertAfter(element)
            }
        }
    });
}

function saveElement(pageid,elementtype,datatypeid,questionkey){
    if( $("#pageelement_"+pageid).find('.additional-inps').length > 0){
        $("#pageelement_"+pageid).find('.additional-inps').each(function(){
            $(this).rules('add', {
                required: {
                    depends: function() {
                        return $('#adjust_'+$(this).attr('data-parentdata')+'_'+pageid).is(":checked");
                    }
                },
                messages: {
                    required: "Please select a value.",
                }
            });
        })
    }
    
    if( $("#pageelement_"+pageid).find('.choice-inps').length > 0){
        $("#pageelement_"+pageid).find('.choice-inps').each(function(){
            $(this).rules('add', {
                required: true,
                messages: {
                    required: "Please enter a value.",
                }
            });
        })
    }
    
    if( $("#pageelement_"+pageid).valid() ){
        if( questionkey ){
            
        }else{
            getAutomatedQuestionID(pageid);
        }
        $("#savebtn").attr('disabled','disabled');
        $("#pageelement_"+pageid).submit();
        
        /*$("#savebtn_"+pageid).attr('disabled','disabled');
        if( questionkey ){
            $.post(ajaxurl+moduleurl+"/"+questionkey+"/updatequestion",{
                act          : 'update',
                formdata     : $("#pageelement_"+pageid).serialize(),
                "_token"     : token
            },function (data){
                if( data.success ){
                    //var actualHTML = getActualHTML(pageid,elementtype);

                    $("#question_"+questionkey).replaceWith(data.elementhtml);
                    $("#fake-element-"+pageid).remove();
                    $(".add-element-"+pageid).show();
					swal('Question updated successfully.','','success');
                }
				if(data.move){
					// updateQuestionOrder(data.pageid);
					window.location.reload();
				}
            },'json');
        }else{
            getAutomatedQuestionID(pageid);
            
            $.post(ajaxurl+moduleurl+"/createquestion",{
                act          : 'create',
                datatypeid   : datatypeid,
                formdata     : $("#pageelement_"+pageid).serialize(),
                pageid       : pageid,
                "_token"     : token
            },function (data){
                if( data.success ){
                    //var actualHTML = getActualHTML(pageid,elementtype);
                    swal('Question added successfully.','','success');
                    updateQuestionOrder(pageid);
                    $(data.elementhtml).insertAfter("#fake-element-"+pageid);
                    $("#fake-element-"+pageid).remove();
                    $(".add-element-"+pageid).show();

                }
            },'json');
        }*/
    }
}

function getActualHTML(pageid,elementtype){
    var actHTML = '<div class="row mb-2 pb-2 pt-2 form-element"><div class="col-12"><p>'+$("#questionname_"+pageid).val()+'</p>';
    if( elementtype == 'singletext' ){
        actHTML += '<div class="form-group"><input type="text" class="form-control" disabled></div>';
    }
    
    if( elementtype == 'singlechoice' && $(".element-choices-"+pageid).length > 0 ){
        $(".element-choices-"+pageid).each(function(){
            actHTML += '<div class="form-check"><input class="form-check-input" type="radio" disabled style="margin-top: 12px;"><label class="form-check-label">'+$(this).find("input[type=text]").val()+'</label></div>';
        });
    }
    
    if( elementtype == 'multiplechoice' && $(".element-choices-"+pageid).length > 0 ){
        $(".element-choices-"+pageid).each(function(){
            actHTML += '<div class="form-check"><input class="form-check-input" type="checkbox" disabled><label class="form-check-label">'+$(this).find("input[type=text]").val()+'</label></div>';
        });
    }
    
    if( elementtype == 'dropdown' && $(".element-choices-"+pageid).length > 0 ){
        actHTML += '<div class="form-group"><select class="form-control">';
        $(".element-choices-"+pageid).each(function(){
            actHTML += '<option>'+$(this).find("input[type=text]").val()+'</option>';
        });
        
        actHTML += "</select></div>";
    }
    
    actHTML += '</div></div>';
    
    return actHTML;
}


function changeElementSettings(type){
    $(".fake-element .nav-link").removeClass('active');
    $(".fake-attributes").hide();
    $(".fake-element-"+type).show();
    $("#nav-"+type).addClass('active');
    
}

function addPage(ths){
    $.post(ajaxurl+moduleurl+"/createpage",{
        act          : 'create',
        formkey      : formkey
    },function (data){
        if( data.success ){
            $(data.pagehtml).insertAfter($(ths).parent().parent('div'));
            updatePageOrder();
        }
    },'json');    
}

function updatePageOrder(){
    var pagesArray = [];
    var pagecnt = 1;
    $(".all-pages").each(function(){
        pagesArray[pagecnt - 1] = $(this).attr('data-pageid');
        pagecnt++;
    });
    
    $.post(ajaxurl+moduleurl+"/updatepageorder",{
        act     : 'updateorder',
        formkey : formkey,
        pages   : pagesArray
    },function (data){
        if( data.success ){
            
        }
    },'json');
}

function addChoice(pageid,elementtype,rankType){
    var choiceHTML = '';
    
    var choiceCount = 0;
    var choiceLenID = ( elementtype == 'ranking' ) ? 'choices_'+rankType+'_'+pageid : 'choices_'+pageid;
    if( $("."+choiceLenID).length > 0 ){
        var lastChoiceID = $("."+choiceLenID).last().attr('id').split('_');
        choiceCount = ( elementtype == 'ranking' ) ? lastChoiceID[3] : lastChoiceID[2];
    }
    choiceCount++;
    
    if( elementtype == 'singlechoice' ){
        choiceHTML += '<div class="row align-items-center choices_'+pageid+'" id="form-choice_'+pageid+'_'+choiceCount+'"><div class="col-8"><div class="form-group mt-2 form-check element-choices-'+pageid+'"><input type="radio" disabled class="form-check-input" style="margin-top: 12px;"><input type="text" class="form-control choice-inps" placeholder="Enter your choice" name="choices['+choiceCount+'][choice]"></div></div><div class="col-2 text-center"><div class="form-group mt-3"><label class=""><div class="form-check px-2"><input class="form-radio-input" type="radio" name="rightanswer" value="'+choiceCount+'"></div></label><label class="right-text" for="rightanswer">Right Answer</label></div></div><div class="col-2 text-right"><a class="btn btn-sm btn-outline-secondary mt-2 icondrag btn-drag" style="margin-right: 2px;"><i class="fas fa-bars"></i></a><a href="javascript:void(0)" onclick="addChoice(\''+pageid+'\',\''+elementtype+'\')" style="margin-right: 2px;" class="btn btn-sm btn-outline-primary mt-2 btn-drag"><i class="fa fa-plus"></i></a><a href="javascript:void(0)" onclick="removeChoice(\''+pageid+'\',\''+choiceCount+'\')" class="btn btn-sm btn-outline-danger mt-2 btn-drag"><i class="fa fa-minus"></i></a></div></div>';
    }
    
    if( elementtype == 'multiplechoice' ){
        choiceHTML += '<div class="row align-items-center choices_'+pageid+'" id="form-choice_'+pageid+'_'+choiceCount+'"><div class="col-8"><div class="form-group mt-2 form-check element-choices-'+pageid+'"><input type="checkbox" disabled class="form-check-input" style="margin-top: 12px;"><input type="text" class="form-control choice-inps pl-2" placeholder="Enter your choice" name="choices['+choiceCount+'][choice]"></div></div><div class="col-2 text-center"><div class="form-group mt-3"><label class=""><div class="form-check px-2"><input class="form-radio-input" type="radio" name="rightanswer" value="'+choiceCount+'"></div></label><label for="rightanswer">Right Answer</label></div></div><div class="col-2 text-right"><a class="btn btn-sm btn-outline-secondary mt-2 icondrag btn-drag" style="margin-right: 2px;"><i class="fas fa-bars"></i></a><a href="javascript:void(0)" onclick="addChoice(\''+pageid+'\',\''+elementtype+'\')" style="margin-right: 2px;" class="btn btn-sm btn-outline-primary mt-2 btn-drag"><i class="fa fa-plus"></i></a><a href="javascript:void(0)" onclick="removeChoice(\''+pageid+'\',\''+choiceCount+'\')" class="btn btn-sm btn-outline-danger mt-2 btn-drag"><i class="fa fa-minus"></i></a></div></div>';
    }

    if( elementtype == 'dropdown' ){
        choiceHTML += '<div class="row choices_'+pageid+'" id="form-choice_'+pageid+'_'+choiceCount+'"><div class="col-9"><div class="form-group mt-2 element-choices-'+pageid+'"><input type="text" class="form-control choice-inps" placeholder="Enter your choice" name="choices['+choiceCount+'][choice]" ></div></div><div class="col-3 text-right"><a class="btn btn-sm btn-outline-secondary mt-2 icondrag btn-drag" style="margin-right: 2px;"><i class="fas fa-bars"></i></a><a href="javascript:void(0)" onclick="addChoice(\''+pageid+'\',\''+elementtype+'\')" style="margin-right: 2px;" class="btn btn-sm btn-outline-primary mt-2 btn-drag"><i class="fa fa-plus"></i></a><a href="javascript:void(0)" onclick="removeChoice(\''+pageid+'\',\''+choiceCount+'\')" class="btn btn-sm btn-outline-danger mt-2 btn-drag"><i class="fa fa-minus"></i></a></div></div>';
    }
    if( elementtype == 'ranking' ){
        choiceHTML += '<div class="row align-items-center choices_'+rankType+'_'+pageid+'" id="form-choice_'+rankType+'_'+pageid+'_'+choiceCount+'"><div class="col-10"><div class="form-group mt-2 form-check element-choices-'+pageid+'"><input type="radio" disabled class="form-check-input" style="margin-top: 12px;"><input type="text" class="form-control choice-inps" placeholder="Enter your choice" name="'+rankType+'choices['+choiceCount+'][choice]"></div></div>';
        
        /*choiceHTML += '<div class="col-2 text-center"><div class="form-group"><label for="rightanswer">Right Answer</label><label class=""><div class="form-check pl-2"><input class="form-radio-input" type="radio" name="rightanswer" value="'+choiceCount+'"></div></label></div></div>';*/
        
        choiceHTML += '<div class="col-2 text-right"><a class="btn btn-sm btn-outline-secondary mt-2 icondrag btn-drag" style="margin-right: 2px;"><i class="fas fa-bars"></i></a><a href="javascript:void(0)" onclick="addChoice(\''+pageid+'\',\''+elementtype+'\',\''+rankType+'\')" style="margin-right: 2px;" class="btn btn-sm btn-outline-primary mt-2 btn-drag"><i class="fa fa-plus"></i></a><a href="javascript:void(0)" onclick="removeChoice(\''+pageid+'\',\''+choiceCount+'\',\''+rankType+'\')" class="btn btn-sm btn-outline-danger mt-2 btn-drag"><i class="fa fa-minus"></i></a></div></div>';
    }
	//$(".dragcls_"+pageid).append(choiceHTML);
    if( elementtype == 'ranking' ){
	   $(choiceHTML).insertBefore('#righterror_'+rankType+'_'+pageid);
    }else{
        $(choiceHTML).insertBefore('#righterror_'+pageid);
    }
   	//$("#form-div_"+pageid).append(choiceHTML);
   
}

function removeChoice(pageid,choicecnt,ranktype){
    var remConfirm = 1;
    if( ranktype ){
        if( $(".choices_"+ranktype+'_'+pageid).length < 3 ){
            remConfirm = 0;
        }
    }else{
        if( $(".choices_"+pageid).length < 3 ){
            remConfirm = 0;
        }
    }
    
    if( remConfirm == 1 ){
        swal({
            title: "Are you sure you want to remove this value?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "OK",
            closeOnConfirm: true,
            showLoaderOnConfirm: false
        },function(){
            if( ranktype ){
                $("#form-choice_"+ranktype+'_'+pageid+'_'+choicecnt).remove();
            }else{
                $("#form-choice_"+pageid+'_'+choicecnt).remove();
            }
        });
    }else{
        swal('Atleast two choices are required.','','error');
    }
}

function editQuestion(questionkey){
    $.post(ajaxurl+moduleurl+"/getquestion",{
        act          : 'details',
        questionkey  : questionkey,
        "_token"     : token
    },function (data){
        if( data.success ){
            // $(data.elementhtml).insertAfter("#fake-element-"+data.questionDets.page_id);
            $("#fake-element-"+data.questionDets.page_id).remove();
            $(".add-element-"+data.questionDets.page_id).show();
            //updateQuestionOrder(data.questionDets.page_id);
            addElement(data.questionDets.page_id,data.dataTypeDets.slug_name,data.dataTypeDets.id,data)
        }
    },'json');
	
}

function updateQuestionOrder(pageid){
    var questArray = [];
    var questcnt = 1;
    //$(".page-questions_"+pageid).each(function(){
    $(".all-questions").each(function(){
        questArray[questcnt - 1] = $(this).attr('data-elementid');
        questcnt++;
    });
    
    $.post(ajaxurl+moduleurl+"/updatequestionorder",{
        act       : 'updateorder',
        pageid    : pageid,
        questions : questArray,
        "_token"     : token
    },function (data){
        if( data.success ){
            
        }
    },'json');
}

function getPageQuestions(pageid,choiceid){
    $("#logic-pquestion_"+choiceid).html('');
    //if( $(ths).val() != '' ){
        $.post(ajaxurl+moduleurl+"/"+formkey+"/getpagequestions",{
            act       : 'getquestions',
            pageid    : pageid,
            exceptquesid    : choiceid,
            "_token"     : token
        },function (data){
            if( data.success ){
                var pqHTML = '';
                if( data.questions.length > 0 ){
                    $.each(data.questions, function (i, elem) {
                        pqHTML += '<option value="'+elem.id+'">'+elem.question+'</option>';
                    });
                }
                
                $("#logic-pquestion_"+choiceid).html(pqHTML);
            }
        },'json');
    //}
}

function getAutomatedQuestionID(pageid){
    $.post(ajaxurl+moduleurl+"/getquestioncode",{
        act       : 'getquestcode',
        pageid    : pageid,
        "_token"     : token
    },function (data){
        if( data.success ){
            $("#question_code_"+pageid).val(data.questioncode);

            $("#question_code_"+pageid).attr('readonly',true);

        }
    },'json');
}

function clearLogic(pageid,cleartype){
    if( cleartype == 'all' ){
        $(".choice-logic_"+pageid).val('');
        $(".all-logic-quest_"+pageid).html('');
    }else{
        $("#logic-page_"+cleartype).val('');
        $("#logic-pquestion_"+cleartype).html('');
    }
}

function clearSubLogic(pageid,cleartype){
    if( cleartype == 'all' ){
        $(".choice-logic_"+pageid).val('');
        $(".all-logic-quest_"+pageid).html('');
    }else{
        $("#sublogic-page_"+cleartype).val('');
    }
}

function enableShowHide(ths,questid){
    $("#showhidediv_"+questid).hide();
    $("#sublogic-page_"+questid).val('');
    if( $(ths).is(':checked') ){
        $("#showhidediv_"+questid).show();
    }
}

function showQuestionLayout(pageid){
    $("#pageelement_"+pageid).find("#quest-layout_"+pageid).hide();
    if( $("#pageelement_"+pageid).find("#adjustlayout_"+pageid).is(":checked") ){
        $("#pageelement_"+pageid).find("#quest-layout_"+pageid).show();
    }
}

function showWitness(pageid){
    $("#pageelement_"+pageid).find("#witness_"+pageid).hide();
    if( $("#pageelement_"+pageid).find("#enablewitness_"+pageid).is(":checked") ){
        $("#pageelement_"+pageid).find("#witness_"+pageid).show();
    }
}

function showDependant(pageid,typeid){
    $("#pageelement_"+pageid).find("#options-"+typeid+"_"+pageid).hide();
    $("#pageelement_"+pageid).find("#"+typeid+"_"+pageid).val('');
    if( $("#pageelement_"+pageid).find("#adjust_"+typeid+"_"+pageid).is(":checked") ){
        $("#pageelement_"+pageid).find("#options-"+typeid+"_"+pageid).show();
    }
}


function attachSortable(pageid){
	$(".dragcls_"+pageid).sortable({
		start: function(e, ui) {
			ui.placeholder.css("visibility", "visible");
		},
		update: function(event, ui) {
		}
	});
}