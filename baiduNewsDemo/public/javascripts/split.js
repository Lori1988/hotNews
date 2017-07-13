define(['jquery'],function($){



	class Split{
		constructor(obj){
			console.log(obj.maxPage);

			this.init(obj)
		}
		init(obj){
			this.render(obj);
			this.bind(obj);
			
		}
		render(obj){

			var page = Math.ceil(obj.maxPage/obj.single);

			console.log(page);
			for(var i = 0;i<page;i++){
				$('<i>'+(i+1)+'</i>').appendTo(obj.container);
				// $('<li>').text(i+1).appendTo(obj.container);
			}
			$('i').eq(1).addClass('on');
		}

		bind(obj){

			$(obj.container).on('click','i',function(){
				console.log($(this).html());

				//发送请求
				// $.ajax({
				// 	url:'/admin/getNewsListByPage',
				// 	type:'post',
				// 	success:function(data){
				// 		//第n页

				// 	},
				// 	error:function(err){
				// 		console.log(err);
				// 	}

				// })
			})

		}

		
	}

	return Split;

})