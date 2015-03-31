$(document).ready(function(){
	onReadySet.initButton();
	onReadySet.initTable();
  onReadySet.initDialog();
  onReadySet.initDatePicker();  
}); // document ready end

    //var isDialogOpen = $( "#dialog-div" ).dialog( "isOpen" );
	var oTable;
	var onReadySet = {
		initButton: function(){
			$( "button#serchVoca" ).button({
				icons: {
				primary: "ui-icon-search"
				},
				text: false
			});
			$( ".rich-buttons#register-vocabulary" ).button({
				icons: {
				primary: "ui-icon-circle-plus"
				},
				text: true
			});
			$( ".rich-buttons#showDetail-vocabulary" ).button({
				icons: {
				primary: "ui-icon-note"
				},
				text: true
			});
			
			  //詳細ボタン
			$( "#showDetail-vocabulary" ).click(function() {
				if (oTable.$('tr.row_selected').length == 0){
					$("#nothingsSelected").dialog("open");
				}else{
					// ダイアログタイプ設定
		      $("#dialog-div").removeClass("register").addClass("detail");
					funcShowDetail();
				}
			});

    		//登録ボタン
			$( "#register-vocabulary" ).click(function() {
        var deferred = $.Deferred();
            deferred
                .then(function() {
                $("#dialog-div").removeClass("detail").addClass("register");
            })
                .then(function() {
                getFrame($("#dialog-div"));
            })
                .then(function() {
                $("#dialog-div").dialog("open");
            });
        deferred.resolve(); //処理スタート
				//initialize
				$(".word-item").val('');
			});
		},
		
		initTable: function(){
			
			$("table#vocabulary tbody tr :nth-child(2)").addClass('voc-name');
			
			// need to be after click, otherwise click event dosent work. 21/06/2013
			oTable = $( "table#vocabulary" ).dataTable({
					 "aLengthMenu": [[15, 50, -1], [20, 50, "All"]],
					 "iDisplayLength": 15,
					 "aaSorting": [[0,'desc']],
					 "bJQueryUI": true
	 				});				
			/* Add a click handler to the rows - this could be used as a callback */
    			$("table#vocabulary tbody").delegate("tr","click", function( e ) {
        			if ( $(this).hasClass('row_selected') ) {
            				$(this).removeClass('row_selected');
        			}
        			else {
            				oTable.$('tr.row_selected').removeClass('row_selected');
			            	$(this).addClass('row_selected');
			        }
			        
							if ($("#dialog-div").dialog("isOpen")){
									if($( ".rich-buttons#add-link-button" ).hasClass("ui-state-highlight")){  
                  }else{
                    funcShowDetail();
                  }
							}
   			 });
   		
   			
		},
		initDialog: function(){
			//登録、詳細ダイアログ　共通初期設定
    	$("#dialog-div").dialog({
				autoOpen: false,
				height: 600,
				width: 900,
				modal: false,
                beforeclose: function(event, ui){
                  //  $("#dialog-div").removeClass("opened")
                }
    	})
    	
    	//詳細ダイアログ押下時、何も選択されていない場合のダイアログ
     $(util.dialog.nothingsSelected).dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            'OK' : function(){
                $(this).dialog("close");
            }
        }
     })
		},
		initDatePicker: function(){
		//	$("#datepicker").datepicker();
		}
	};//onReadySet end
	
	var funcShowDetail = function(){
            var isDialogOpen = $( "#dialog-div" ).dialog( "isOpen" );
			var id = oTable.$('tr.row_selected').attr("id");
			$("#dialog-div").attr("vocid",id);
        
            //deffered効いているのかよくわからん　2013/11/18
            var dfd = $.Deferred();
                dfd.then(function(){
                    if (isDialogOpen === false){
                        getFrame($("#dialog-div"));
                    }
                }).then(function(){
                    setData($("#dialog-div"),id);
                }).then(function(data){
                    linkControl.loadLinkWord(id);
                //　↓ボキャブラリーの名前を取ってきたいけど、できない。    
                 $( "#dialog-div" ).dialog("option", "title", data);
                }).then(function(){
                    if (isDialogOpen === false){
                        $("#dialog-div").dialog("open");
                    }
                });
            dfd.resolve();
	};

	function getFrame(that){
		var request = $.ajax({
			url: "html/vocaburaly_detail.html",
			type: "GET",
			dataType: "html"
		}).done(function( data ){
			$(that).html("");
			$(that).html(data);
		}).fail(function(){
			alert("Fatal: reading fail!");
		}).always(function(data){
			if( console && console.log ) {
				console.log(data);
			}
		});
	}

	 function setData(that,voc_id){
        $("#loading-div").html("<img src='images/loading.gif' alt='loading...'>");
        $( "#dialog-div" ).dialog("option", "title", "loading...");
        $(".word-item").val("");
        $("#name-text-label").text(""); 
		var request = $.ajax({
			url: "php/getDetailData.php",
			type: "GET",
			data: {id : voc_id},
			dataType: "json",
		}).done(function( data ){
            $( "#dialog-div" ).dialog("option", "title", voc_id);
			$('#meaning-text').val(data.meaning);
			$('#pos-select').val(data.pos);
			//$('#name-text').val(data.word);
            $('#name-text-label').text(data.word);
            $('#example-text').val(data.example);
			$('#source-text').val(data.source);
            return data.word ;
		}).fail(function(data){
			alert("Fatal: reading fail(when getting ID)!" + data.word);
		}).always(function(data){
			if( console && console.log ) {
				console.log(data);
			}
		}).complete(function(){
            $("#loading-div").empty();
        });

		// This one so COOL!!!
//		if (!(request.status==200 && request.readyState==4)){
//			that.find("#loading-div").html("<img src='images/loading.gif' alt='loading...'>");
//		}
	};
