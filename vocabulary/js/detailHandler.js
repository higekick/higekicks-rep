$(document).ready(function () {    
    onReadySetButtons();
    onReadySetLabels();
    onReadySetDraggableTable();
    onReadyWordFamilyAccordion();
    
    isAnyItemChanged = false;
    iconCheck = '<p><span class="ui-icon ui-icon-circle-check" style="float: left; margin: 0 7px 20px 0;"></span></p>';
    var cmtCancelDlg= '<div title="Sure to cancel?" id="cancelDlg">'
                    + ' <p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span> '
                    + ' Some data are modified. Are you sure to cancel?</p></div> ';
 
    var cmtDeleteDlg= '<div title="Sure to delete?" id="deleteDlg">'
                    + ' <p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span> '
                    + ' You are trying to delete this vocabulary. Are you sure to delete?</p></div> ';
    
    var cmtUpdateDlg= '<div title="Sure to update?" id="updateDlg">'
                    + iconCheck
                    + ' Some data are modified. Are you sure to update?</p></div> ';
    
    var comfirmationDlg= '<div id="comfirmationDlg">'
                    + ' <div id="contents"> ' 
                    + iconCheck
                    + '<p id="comment"> </p><div></div> ';
     
    /*
    単語項目変更時チェック
    */
    // new Array()だとAjaxのデータとして渡らない。new Objectならいく。
    // ajaxのデータはおそらく、Array型は渡すことができず、Objectで宣言する必要がある。
    // × changedDataObj = new Object();
    changedDataObj = new Object();
    $(".word-item").change(function () {
			isAnyItemChanged = true;
		//	var changeItem = util.getHash($(this).attr("colname"),$(this).val());
		//	changedDataObj.push(changeItem);
			changedDataObj[$(this).attr("colname")] = $(this).val();
    });
    
//    //changeフラグリセット
//    $(".word-item").change(function () {
//			isAnyItemChanged = false;
//    });
    
    //確認ダイアログ
    $(comfirmationDlg).dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            'OK' : function(){
                $(this).dialog("close");
            }
        }
    })
    
    //cancel時ダイアログ
    $(cmtCancelDlg).dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            'Yes(cancel)': function(){
            $("#dialog-div").dialog("close");
            $(this).dialog("close");
            },
            'No': function(){
            $(this).dialog("close");
            }
        }
    })

    //delete時ダイアログ
    $(cmtDeleteDlg).dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            'Yes(delete)': function(){
										var deferred = $.Deferred();
										deferred
											.then(function() {
                    		return editControl.delete($("#dialog-div").attr("vocid"));
                    	})
                    	.then(function() {
												loadTable();
											})
                    deferred.resolve();//処理スタート
                    $("#dialog-div").dialog("close");
                    $(this).dialog("close");
                    
            },
            'No': function(){
                $(this).dialog("close");   
            }
        }
    })
    
    //update時ダイアログ
    $(cmtUpdateDlg).dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            'Yes(update)': function(){
							$("#comfirmationDlg").dialog("option", "title", "Updating data...");
            	$("#comfirmationDlg").find("p#comment").html("<img src='images/loading.gif' alt='loading...'>");
            	$("#comfirmationDlg").dialog("open");
										var result;
                    //linkControl.updateLinkWord($("#dialog-div").attr("vocid"));
                    
                    if (Object.keys(changedDataObj).length > 0){
                    	changedDataObj['id'] = $("#dialog-div").attr("vocid");
                    	result = editControl.update($("#dialog-div").attr("vocid"), changedDataObj);
                    }
                    
                    $("#comfirmationDlg").dialog("option", "title", "Update Successfully done!");
                    
                    $("#dialog-div").dialog("close");
                    $(this).dialog("close");
            },
            'No': function(){
                $(this).dialog("close");
            }
        }
    })
    
    
});　//document ready end

 var iconCheck = "";
                        
 var isAnyItemChanged = false;
 var changedDataObj;

 function onReadySetDraggableTable(){
     $('table#vocabulary tbody tr td.voc-name').draggable({
         cursor: "move", helper: "clone", zIndex: 999 });
     $('table#vocabulary tbody tr td.voc-name').disableSelection();
     var acContainer = $(".wordlink-accordion div.accordion-container");
     $( acContainer  ).droppable({
          accept: ".voc-name",
          activeClass: "ui-state-default",
          hoverClass: "ui-state-highlight",
          drop: function( event, ui ) {
			// ul.draggable つかむことができる対象の元のエレメントのこと
			// ul.draggable 実際に掴んでいるもの
          $(this).find("ul").append("<li id='" + ui.draggable.attr('id') + "' class='ui-state-default'>" + ui.helper.text() + "</li>").show( "slow" );
          isAnyItemChanged = true;
         }
     });
 }

 function onReadyWordFamilyAccordion(){
    $(".wordlink-accordion").accordion({heightStyle: "content",  collapsible: true });
    $("#create-newlink-accordion").hide();
 }

 function onReadySetLabels(){
    //vocラベルを押下した時
    $('#name-text-label').click(function() {
    $('#name-text-label').css( 'display', 'none');
    $('#name-text')
        .val( $( '#name-text-label').text())
        .css( 'display', '')
        .focus();
    });
    
    //vocテキストからフォーカス外れた時
    $('#name-text').blur(function() {
    $('#name-text').css( 'display', 'none');
    $('#name-text-label')
        .text($('#name-text').val())
        .css( 'display', '');
    }); 
     
 };

 function onReadySetButtons(){
        
        // content 効かない 26/11/2013
        var toolTip = $("#add-link-button").tooltip({
                        disabled: true,
                        content: "add related vocabulary to click the word from the table."
        							});
        $( ".rich-buttons#add-link-button" ).button({
				icons: {
				primary: "ui-icon-circle-plus"
				},
				text: true
			}).click(function() {
               if ($(this).hasClass("ui-state-highlight") === false ){
                  $(this).addClass("ui-state-highlight");
                  toolTip.tooltip("option", { disabled: false });
                  toolTip.tooltip("open");
                  
                } else {
                  $(this).removeClass("ui-state-highlight");
                  toolTip.tooltip("option", { disabled: true });
                }
                linkControl.openCreateLink();
            });
     
     		var isAllPaneClosed = true;
        $("#open-allpane").button({
					icons: {
						primary: "ui-icon-folder-open"
					},
					text: true
				}).click(function(){
						if (isAllPaneClosed == true){
							//open
            	$(".wordlink-accordion").accordion( "option", "active", 0 );
            	isAllPaneClosed = false;
            	$("#open-allpane span").text("close all pane");
            }
            else{
							//close
							$(".wordlink-accordion").accordion( "option", "active", false );
							isAllPaneClosed = true;
							$("#open-allpane span").text("open all pane");
						}
        });
     
     	$("#delete-link-button").button({
				icons: {
					primary: "ui-icon-trash"
					},
				text: true
			}).click(function(){
				  if ($(".accordion-container li").hasClass("ui-state-highlight")){
            $(".accordion-container li.ui-state-highlight").remove();
            isAnyItemChanged = true;
          }
        });
        var addButtonTooltip = $(".ui-state-highlight#add-link-button").tooltip();
        
        $(".accordion-container").delegate("li","click", function(){
            if ($(this).hasClass("ui-state-default")){
                $(".accordion-container li.ui-state-highlight").removeClass("ui-state-highlight").addClass("ui-state-default");
                $(this).removeClass("ui-state-default").addClass("ui-state-highlight");
            }else{
                $(this).removeClass("ui-state-highlight").addClass("ui-state-default");
            }
        });
     
//        $( ".rich-buttons#add-link-button" ).addClass("");     
        //モード別ダイアログボタン設定
        if ($("#dialog-div").hasClass("register") === true){
            
            $("#name-text-label").css('display', 'none');
        //add register button
        $( "#dialog-div" ).dialog("option", "title", "register new vocabulary");
        $( "#dialog-div" ).dialog("option", "buttons", 
							[{ text: "register", click: function(){
								 var fromForm = new Object();
			 					   fromForm.name = $("#name-text").val();
                                    fromForm.pos = $("#pos-select").val();
			 					   fromForm.meaning = $("#meaning-text").val();
			 					   fromForm.example = $("#example-text").val();
                                fromForm.source = $("#source-text").val();
                 var deferred = $.Deferred();
  							 	deferred
  							 	.then(function(){
								 		return editControl.register(fromForm);
                	})
                	.then(function(){
                 		loadTable();
                 	});
                 	deferred.resolve();
                 $(this).dialog("close");                
								}
							 },
               { text: "Cancel", click: function(){
                                 $(this).dialog("close");
                                }
               }
              ]);
       
    } else if ($("#dialog-div").hasClass("detail") === true){
        //単語詳細ダイアログのready
        $("#voc-name-label").css('display', 'none');
        $("#name-text").css('display', 'none');
        
        $("#dialog-div").dialog( "option", "buttons",
				    [{ text: "Update", click: function(){
                       if(isAnyItemChanged === true){    
					        $("#updateDlg").dialog("open");
					    }else{
                            $("#comfirmationDlg").dialog("option", "title", "You do not need to update");
                            $("#comfirmationDlg").find("p#comment").text("Nothing is changed.");
                            $("#comfirmationDlg").dialog("open");
                        }    
					}},
                     { text: "Delete", click: function(){
					   $("#deleteDlg").dialog("open");
					}},
                     { text: "Cancel", click: function(){
                        if(isAnyItemChanged === true){    
					        $("#cancelDlg").dialog("open");
					    }else{
                            $(this).dialog("close");
                        }
                    }}    
                    ])
   }
 };

    /*
    登録、更新、削除等コントロールオブジェクト
    */
	var editControl = {
		register : function(retrieve){
            $("#comfirmationDlg").dialog("option", "title", "Registering data...");
            $("#comfirmationDlg").find("p#comment").html("<img src='images/loading.gif' alt='loading...'>");
            $("#comfirmationDlg").dialog("open");
      var deferred = $.Deferred();      
			var request = $.ajax({
			url: "php/registerExec.php",
			type: "POST",
			data: {voc_name : retrieve.name,
				    voc_pos : retrieve.pos,
				    voc_meaning: retrieve.meaning,
				    voc_example: retrieve.example,
				    voc_source: retrieve.source},
            dataType: "json"
			}).done(function( data ){
              if (data.result === "success"){
                $("#comfirmationDlg").dialog("option", "title", "Register done");
                $("#comfirmationDlg").find("p#comment").text("Register successfuly done.");
              }else if (data.result === "failed"){
                $("#comfirmationDlg").dialog("option", "title", "Register failed");
                $("#comfirmationDlg").find("p#comment").text(data.message);
              }
         deferred.resolve();
			}).fail(function(xhr,status,errorThrown){
				$("#comfirmationDlg").dialog("option", "title", "Register failed");
                $("#comfirmationDlg").find("p#comment").html("xhr.status: " + xhr.status + 
                                                             "<br>xhr.statusText: " + xhr.statusText +
                                                             "<br>status: " + status +
                                                             "<br>error: " + errorThrown );
                $("#comfirmationDlg").find("p#comment").append(xhr.responseText);
			}).always(function(data){
				if( console && console.log ) {
					console.log(data);
				}
			}).complete(function(data){
            });
      return deferred;
		},

		delete : function(voc_id){
        
      $("#comfirmationDlg").dialog("option", "title", "Deleating data...");
      $("#comfirmationDlg").find("p#comment").html("<img src='images/loading.gif' alt='loading...'>");
      $("#comfirmationDlg").dialog("open");
      
      var deferred = $.Deferred();  
      var result = false;
			var request = $.ajax({
			url: "php/deleteExec.php",
			type: "POST",
			data: {id : voc_id}
			}).done(function( data ){
                $("#comfirmationDlg").dialog("option", "title", "Delete done!");
                $("#comfirmationDlg").find("p#comment").text("delete successfuly done.");
                deferred.resolve();
			}).fail(function(){
				alert('delete failed');
				deferred.reject();
			}).always(function(data){
				if( console && console.log ) {
					console.log(data);
				}
			});
		return deferred;	
            // This one so COOL!!!
//		      if (!(request.status==200 && request.readyState==4)){
//			     that.html("<img src='images/loading.gif' alt='loading...'>");
//		      }
		},

		update : function(voc_id, updDt){
			//util.printProperties(updDt);
			var result = false;
			
			$("#comfirmationDlg").find("p#comment").append("updating basic information...");
			var adata="abcd";
			ajaxParam=updDt;
			var request = $.ajax({url: "php/updExecute.php",
							type: "POST",
							data: {updateData: ajaxParam},
							dataType: "json"
			}).done(function(data){
                    if (data.result === "success"){
											   $("#comfirmationDlg").find("p#comment").text(data.message);
                         result = true;           
		            		}else if (data.result === "failed"){
                        $("#comfirmationDlg").dialog("option", "title", "Update failed");
                        $("#comfirmationDlg").find("p#comment").text(data.message);
                    }
      }).fail(function(xhr,status,errorThrown){
                        $("#comfirmationDlg").dialog("option", "title", "Update failed");
                        $("#comfirmationDlg").find("p#comment").html("xhr.status: " + xhr.status + 
                                                             "<br>xhr.statusText: " + xhr.statusText +
                                                             "<br>status: " + status +
                                                             "<br>error: " + errorThrown );
                        $("#comfirmationDlg").find("p#comment").append(xhr.responseText);
                        result = false;
    	}).complete(function(){return result;});
    }
	};//editControl end
	
	var loadTable = function(){
			$("#table-listing-area").html(util.getloadImg());
			var deferred = $.Deferred();
  		deferred.then(function() {
	  		  //ここで処理が止まる
	      	var d = $.Deferred();
					$.get( "php/loadVocTable.php",
						function(result){
							$("#table-listing-area").html(result);
							//処理が解決した事を通知すると、次のステップに進む。
	      			d.resolve();
						}
	        	, "html"); // get end
	      	return d;
      }).then(function(){
				// テーブルのhtml構築後にdataTableに変換
      		setDataTable();
      })
    	return deferred.resolve(); //処理スタート  
	};
	
	var setDataTable = function(){
		// 元ページのonReadyメソッド使用
		onReadySet.initTable();
	};
