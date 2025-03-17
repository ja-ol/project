$(function() {
    var SHOW_DECISION_MAP = new Map();
    
    $('li.need_decision').each(function(index, item) {
        var mno = -1;
        for(const c of item.classList) {
            var mpos = c.indexOf("menu_");
            if(mpos != -1) {
                var darr = c.split("_");
                mno = parseInt(darr[1]);                
            }
        }
        
        if(mno != -1) {
            var decisionUrl = $(item).data('decisionUrl');
            //console.log(decisionUrl, mno);
            if(decisionUrl && decisionUrl.indexOf("/common/decision_voter/") == 0) {
                var v = SHOW_DECISION_MAP.get(mno);// expect get Set
                if(v) { 
                      v.add(decisionUrl);  SHOW_DECISION_MAP.set(mno, v); 
                } 
                else { 
                    v = new Set();
                    v.add(decisionUrl);
                    SHOW_DECISION_MAP.set(mno, v); 
                }
            }
        }
        
    });
    
    for (const [key, value] of SHOW_DECISION_MAP) {
          //console.log(key, value);          
      
          for(const url of value) {
              $.ajax({
                type : "POST",
                url : url,
                data    : {'menu_no' : key},
                cache : true, 
                async: true,
                dataType : "json",
                error:function(request, status, error){
                    //console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                },
                success : function(json_data){
                   //console.log(json_data);
                   if(json_data.result == "true") {
                       $('li.need_decision.menu_' + json_data.menu_no).show();
                   }
                }
             });
        }
    }    
});