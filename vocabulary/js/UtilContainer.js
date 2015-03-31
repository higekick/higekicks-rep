// utilContainer 
var util = {
	msg: {
		
		
	},
	dialog: {
		nothingsSelected: '<div title="Nothing is selected" id="nothingsSelected">'
                    	+ ' <p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span> '
             		      + ' You need to select any vocabulary from table</p></div> '
	},
	getHash: function(key,value){
		  var h = {};
  		h[key] = value;
  		return h;
	},
	printProperties: function(obj){
		var properties = '';
    for (var prop in obj){
        properties += prop + "=" + obj[prop] + "\n";
    }
    alert(properties);
	},
	getloadImg: function(){ return "<img src='images/loading.gif' alt='loading...'>";}
}