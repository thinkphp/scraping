//show me love to the Singleton
var usersgroupbadge = function() {

        var config = {

             badgeID: 'usersgroupbadge',

             linkID: 'usersgrouplink',

             headerText: 'Latest Topics',

             amount: 10,

             styled: true
        }; 

        var badge = document.getElementById(config.badgeID);

        var link = document.getElementById(config.linkID);

        function init(o) {

            if(o && o.headerText) {

               config.headerText = o.headerText; 
            }

            if(o && o.amount) {

               config.amount = o.amount;
            } 

            if(o && typeof o.styled != undefined) {

               config.styled = o.styled;
            }

            if(badge && link) {

                var href = link.getAttribute('href');

                var root = 'http://query.yahooapis.com/v1/public/yql?q='; 

                var yql = 'select title,link,description from rss where url="'+ href +'" limit '+ config.amount; 

                var url = root + encodeURIComponent(yql) + '&format=json&diagnostics=false&callback=usersgroupbadge.seed';

                    loadScript(url,function(){loadStyle('styled.css');});
            }  

        };

        function loadScript(url, callback){

                 var script = document.createElement("script")

                     script.type = "text/javascript";

                     if (script.readyState){  //IE

                          script.onreadystatechange = function(){

                            if (script.readyState == "loaded" ||

                                     script.readyState == "complete"){

                                          script.onreadystatechange = null;

                                          callback();
                             }
                     };

                  } else {  //Others

                         script.onload = function(){

                         callback();
                  };
                  }

                  script.src = url;
                  document.getElementsByTagName("head")[0].appendChild(script);

          };//end function loadScript

        function loadStyle(url, callback){

                 var link = document.createElement("link")

                     link.type = "text/css";

                     link.rel = "stylesheet";

                     if (link.readyState){  //IE
                          link.onreadystatechange = function(){

                            if (link.readyState == "loaded" ||

                                     link.readyState == "complete"){

                                          link.onreadystatechange = null;

                                          callback();
                             }
                     };

                  } else {  //Others

                         link.onload = function(){

                         callback();
                  };
                  }

                  link.href = url;

                  document.getElementsByTagName("head")[0].appendChild(link);

          };//end function loadStyle

        function seed(o) {

                 var out = '<h4>'+config.headerText+'</h4><ul>';  

                     if(o.query && o.query.results && o.query.results.item) {

                          var all = Math.min(o.query.results.item.length,config.amount);

                              for(var i=0;i<all;i++) {

                                      var curr = o.query.results.item[i];

                                      out += '<li><strong><a href="'+curr.link+'">'+curr.title+'</a></strong><p>'+curr.description+'</p></li>';
                              }      

                          out += '</ul>';

                          badge.innerHTML += out;
                     }

        };

 return {init: init,seed: seed}; 

}();//do EXEC