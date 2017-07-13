var mysql = require('mysql');
var con = mysql.createConnection({
    host     : 'localhost',
    port     : '8889',
    user     : 'root',
    password : 'root',
    database : 'bd_news_DB'
  });


module.exports = con;

// var SingletonCRUD = (function(){  
//   SingletonClass() {}  
//   SingletonClass.prototype = {  
//      constructor: SingletonClass,  
//      ajax: function(url, data success ){  
//     $.ajax({  
//       type: "post"  
//           dataType:"json",  
//           url: url,  
//           data: data,  
//           success: success,  
//           error: function(){  
//         alert("新增出现异步，请得新增加或联系技术管理员");  
//       }  
//        });  
//      },  
//      add: function( data ) {  
//     this.ajax("http://www.csdn.net/", data, function( result ){  
//         if ( result.status ) { alert("新增成功！") } else {  alert("新增失败") }  
//     });   
//      }，  
//     remove: function( data ) {  
//     this.ajax("http://www.csdn.net/", data, function( result ){  
//         if ( result.status ) { alert("删除成功！") } else {  alert("删除失败") }  
//     });  
//      }  
//   }  
  
//   var singleton = null;  
  
//   return {  
//     getInstance: function() {  
//       if (singleton == null) {  
//     singleton = new singletonClass();  
//       } else {  
//     return singleton;  
//       }  
//     }  
//   }  
// })(); 