
require.config({

	baseUrl:'./javascripts',
	paths:{
		'jquery':['https://cdn.bootcss.com/jquery/3.2.1/jquery','./jquery'],
		'split':'./split',
		'admin':'./admin'

	}
})

require(['jquery','split','admin'],function($,Split,a){
	console.log(a)
	// console.log(student.name);
	// url:'http://127.0.0.1:3000/api/comments',
	$.ajax({
		url:'/admin/getNewsList',
		type:'post',
		success:function(data){
			if (data.state === '0') {

				console.log('requirejs-------',data.message,data.message.length);
				if (data.message.length) {
					// 
					var s = new Split({
						maxPage:data.message.length,
						single:3,
						container:'.bd-newsbody'
					});
				}
			}

		},
		error:function(err){
			console.log(err);
		}
	})

})


