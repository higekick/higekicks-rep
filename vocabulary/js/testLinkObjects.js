$(document).ready(function(){
    
    var linkObj = new LinkObjects("synonym");
    var linkItm = new LinkItem(2,"tempolary");
    var linkItm2 = new LinkItem(3,"buid");
    linkObj.pushItem(linkItm);
    linkObj.pushItem(linkItm2);
    
    for(var i=0; i< linkObj.linkItems.length; i++){
            $("#testArea").append(linkObj.linkItems[i].id + " " + linkObj.linkItems[i].word + "<br>");        
    }
    
    var linkItm3 = new LinkItem(3,"build");
    var linkItm4 = new LinkItem(4,"build");
    var linkItm5 = new LinkItem(2,"tempolary");    
    
    var result = linkObj.isThereLinkItem(linkItm3);
    var result2 = linkObj.isThereLinkItem(linkItm4);
    var result3 = linkObj.isThereLinkItem(linkItm5);
    
    $("#testArea").append(result + "<br>");
    $("#testArea").append(result2 + "<br>");
    $("#testArea").append(result3 + "<br>");
    
});