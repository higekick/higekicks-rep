var LinkObjects = function() {
//  this.type=type; 
  this.linkItems = new Array();
};

LinkObjects.prototype = {
    
    pushItem: function(linkItem){
        this.linkItems.push(linkItem);
    },
    removeItem: function(linkItem){
        
    },
    isThereLinkItem: function(linkItem){
        var result = false;   
        for(var i=0; i< this.linkItems.length; i++){
		//	alert(linkItem.id + " " + this.linkItems[i].id);
            if((linkItem.id == this.linkItems[i].id) && (linkItem.type == this.linkItems[i].type)){
                result=true;
            }
        }
        return result;
    }
}

var LinkItem = function(id, word, type){  
 this.id=id; 
 this.word=word;
 this.type=type;  //partofspeech,antonym,synonym  
}