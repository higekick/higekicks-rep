var linkControl = {
     oldLinkData: null,
     newLinkData: null,
     linkUpdateData: null,
     casePos: '0',
     caseSynonym: '',
     caseAntonym: '',
      
     loadLinkWord: function(id){
         $(".accordion-container").find("ul").empty();
         oldLinkData= new LinkObjects();
          linkUpdateData= new Array();
        	$.get( "php/getLinkWord.php",
                {data: id},
                function(data,textStatus,xhr){
                  if (textStatus === "success"){
                    for(var i=0; i<data.length; i++){
                         var linkItem = new LinkItem(data[i].id, data[i].word, data[i].voc_division); 
			if (linkItem.id !== id){
				// 自分以外を入れる
                        	oldLinkData.pushItem(linkItem);
			} else {
				// 自分の時にSynonymの番号を判断
				// part of speechは常に0
				casePos    = '0';
				caseSynonym= linkItem.type;
				caseAntonym= (caseSynonym === '1')? '2' : '1'; 
			}
                    }    
                    for(var i=0; i< oldLinkData.linkItems.length; i++){
                        var linkItem = oldLinkData.linkItems[i];
                        var liString ="<li id='" + linkItem.id + "' class='ui-state-default'>" + linkItem.word + "</li>";
                        var whichContainer="";
                        switch (linkItem.type){
                                case casePos:
                                    whichContainer = "#partofspeech-container";
                                break;
                                case caseSynonym:
                                    whichContainer = "#synonym-container";
                                break;
                                case caseAntonym:
                                    whichContainer = "#antonym-container";
                                break;
                        }
                    	$(".accordion-container" + whichContainer).find("ul").append(liString);
                    } //for roop end                        
                  } else {
                        $("#comfirmationDlg").find("p#comment").append("xhr.status: " + xhr.status + 
                                                             "<br>xhr.statusText: " + xhr.statusText +
                                                             "<br>status: " + status +
                                                             "<br>error: " + errorThrown );
                        $("#comfirmationDlg").find("p#comment").append(xhr.responseText); 
                  }
                } // function end
            , "json").then(function(){
					            // accordionの開閉 制御
					      			$(".wordlink-accordion").each(function(){
					    					if($(this).find(".accordion-container").find("li").size() == 0){
													$(this).accordion( "option", "active", false );
												}else{
													$(this).accordion( "option", "active", 0 );
												}
					      			})
					      })
     },
     
     updateLinkWord: function(thisId){
			newLinkData= new LinkObjects();
			$(".accordion-container").each(function(){
				var liList = $(this).find("li");
				var type = 0;
				if ($(this).attr('id') === "partofspeech"){
					type = 0;
				} else if ($(this).attr('id') === "synonym-container"){
					type = 1;
				} else if ($(this).attr('id') === "antonym-container"){
					type = 2;
				}                       
				liList.each(function(){
					var linkItem = new LinkItem($(this).attr('id'),$(this).text(),type);
					newLinkData.pushItem(linkItem);
				}) // list roop end
      		}) // accordion roop end
      		
      	var updateItems = new Array();
      	//insert
      	for (var i=0; i<newLinkData.linkItems.length; i++){
					var isThereLinkItem = oldLinkData.isThereLinkItem(newLinkData.linkItems[i]);
					if (!isThereLinkItem){
						var insItem = {upType: "insert",
													 id: newLinkData.linkItems[i].id,
													 type: newLinkData.linkItems[i].type
													};
						updateItems.push(insItem);
					}
				}
				//delete
				for (var i=0; i<oldLinkData.linkItems.length; i++){
					var isThereLinkItem = newLinkData.isThereLinkItem(oldLinkData.linkItems[i]);
					if (!isThereLinkItem){
						var insItem = {upType: "delete",
													 id: oldLinkData.linkItems[i].id,
													 type: oldLinkData.linkItems[i].type
													};
						updateItems.push(insItem);
					}
				}
				
      	if (updateItems.length){
					for (var i=0; i<updateItems.length; i++){
						alert(updateItems[i].upType + ": " + updateItems[i].id + ": " + updateItems[i].type);
					}
					// 最後に主単語自体を入れる
					var thisWord = {upType: "thisWord",
													 id: thisId,
													 type: "thisWord"
													};
					updateItems.push(thisWord);								
					//insAndDelLinkWord(updateItems);
				}
    },
    insAndDelLinkWord: function(items){
			$("#comfirmationDlg").find("p#comment").append("updating link word...");
			$.post( "php/insertLinkword.php",
				{data: items},
				function(data,textStatus,xhr){
					if (textStatus === "success"){
    			}else{
					}
				} // function end
        , "json") // post end
    },
    openCreateLink: function(){
			$("#create-newlink-accordion").toggle("slow").accordion( "option", "active", 0 );
			$("#vocabulary-list").html(util.getloadImg());
			var loadTblRequestParams = {
				tblHeaders : ["id" , "word" , "meaning"],
				tblColumns : ["id" , "word" , "meaning"],
				tblId : "popup-vocabulary-list"
			}
			var loadPopUpTblRequest = $.get( "php/loadVocTable.php",
					  {data: loadTblRequestParams},
						function(result){
							$("#create-newlink-container").html(result);
						}
	        	, "html"); // get end
      loadPopUpTblRequest.then(function(){
				// テーブルのhtml構築後にdataTableに変換
      		$("#popup-vocabulary-list").dataTable({   "bPaginate": false,
																								    "bLengthChange": false,
																								    "bFilter": false,
																								    "bSort": false,
																								    "bInfo": false,
																								    "bAutoWidth": true,
																								    "bJQueryUI": true
																								});
      })
		}
 };