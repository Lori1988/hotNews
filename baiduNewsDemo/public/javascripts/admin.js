define(function(){
// $('.form_date').datetimepicker({
//         language:  'fr',
//         weekStart: 1,
//         todayBtn:  1,
// 		autoclose: 1,
// 		todayHighlight: 1,
// 		startView: 2,
// 		minView: 2,
// 		forceParse: 0
// });

var isOK = 1;
var jsonD= {};

//
function clearAllNews(){
	$('table tbody').empty();
	// $("table tbody").html("");
}
// 
function getNewsList(){
	$.ajax({
		url:'/admin/getNewsList',
		type:"post",
		data:{},
		success:function(jsonData){

			console.log("获取到所有数据");
			console.log(jsonData);

			if (jsonData.state === '0') {

				alert(jsonData.message);
				//
				clearAllNews();
				getNewListRender(jsonData.message);
			}

		},
		error:function(err){
			console.log("错误");
			console.log(err);
		}
	});
}
getNewsList();


//<!--数据验证-->
// $("form").bootstrapValidator({
//     message:'This value is not valid',
// //            定义未通过验证的状态图标
//     feedbackIcons: {/*输入框不同状态，显示图片的样式*/
//         valid: 'glyphicon glyphicon-ok',
//         invalid: 'glyphicon glyphicon-remove',
//         validating: 'glyphicon glyphicon-refresh'
//     },
// //            字段验证
//     fields:{
// //                用户名
//         title:{
//             message:'用户名非法',
//             validators:{
// //                        非空
//                 notEmpty:{
//                     message:'用户名不能为空'
//                 },
// //                        限制字符串长度
//                 stringLength:{
//                     min:3,
//                     max:20,
//                     message:'用户名长度必须位于3到20之间'
//                 },
// //                        基于正则表达是的验证
//                 regexp:{
//                     regexp:/^[a-zA-Z0-9_\.]+$/,
//                     message:'用户名由数字字母下划线和.组成'
//                 }
//             }
//         },

// //                密码
//         content:{
//             message:'密码非法',
//             validators:{
//                 notEmpty:{
//                     message:'密码不能为空'
//                 },
// //                        限制字符串长度
//                 stringLength:{
//                     min:3,
//                     max:20,
//                     message:'密码长度必须位于3到20之间'
//                 },
// //                        相同性检测
//                 identical:{
// //                            需要验证的field
//                     field:'password',
//                     message:'两次密码输入不一致'
//                 },
// //                        基于正则表达是的验证
//                 regexp:{
//                     regexp:/^[a-zA-Z0-9_\.]+$/,
//                     message:'密码由数字字母下划线和.组成'
//                 }
//             }
//         }
//     }
// });



function getNewListRender(arr){
	var num = 0;
	$(arr).each(function(index, element) {
		num++;
		$('<tr nid="'+element.nid+'">'
		  +'<td>'+num+'</td>'
	      +'<td>'+element.ntitle+'</td>'
          +'<td>'+element.ndate+'</td>'
          +'<td><a href="javascript:;" onclick="removeRow(this)" >删除</a></td>'
	      +'</tr>').appendTo('.bd-newsTable tbody');
    });

   //  $(".tcdPageCode").createPage({
   //      pageCount:arr.length,
   //      current:1,
   //      backFn:function(p){
   //          console.log(p);

   //          //发送请求
			// $.ajax({
			// 	url:'/admin/getNewsListByPage',
			// 	type:'post',
			// 	data:{page:p,count:3},
			// 	success:function(data){
			// 		//第p页
					
			// 	},
			// 	error:function(err){
			// 		console.log(err);
			// 	}

			// })
   //      }
   //  });
}

 function newsTagChange(){
    var oSelect = document.getElementById("bd-news-tag");
    var grade = oSelect.options[oSelect.selectedIndex].grade;
    var tagName = oSelect.options[oSelect.selectedIndex].text();
    alert(tagName);
    alert(grade);
}
//
$('#surePost').click(function(e){

	$('#myModal').modal('hide');
	console.log("1111111");
	if (isOK==0) {
		console.log("233333333",jsonD);
		updateNews(e,jsonD.nid);
	}else{
		var title = $('#bd-news-title').val(); 
	var content = $('#bd-news-content').val();
	var newslink = $('#bd-news-imglink').val();
	var source = $('#bd-news-source').val();
	var date = $('#bd-news-date').val();
	// var newsTag = $('#bd-news-tag').val();
	var newsTag = $('#bd-news-tag option:selected').val();

	e.preventDefault();
	e.stopPropagation();
	var jsonData = { title:title,content:content,newslink:newslink,source:source,date:date,newsTag:newsTag };
	$.ajax({
		url:'/admin/submitNews',
		type:"post",
		data:jsonData,
		success:function(data){

			console.log(data);

			if (data.state === '0') {

				$('#bd-news-imglink').val('');
				$('#bd-news-content').val('');
				$('#bd-news-title').val('');
				$('#bd-news-source').val('');
				$('#bd-news-date').val('');
				$('#bd-news-tag option:selected').val('推荐');

				alert(data.message);
				//
				getNewsList();
			}

		},
		error:function(err){
			console.log(err);
		}
	});
	}
	
})
// 
$('#postBtn').click(function(e){

	// $('#myModal').on('shown.bs.modal', function () {
	//   $('#myInput').focus()
	// })

	$('#myModal').modal('hide');
	
});


//
$('.bd-newsTable').on('click','a',function (e){
		e.preventDefault();
		e.stopPropagation();
		var nid=$(this).parent().parent().attr('nid');
		console.log("删除 获取评论ID",nid);
		$.ajax({
			url:'/admin/deleteNews',
			type:'post',
			data:{
				act:'del',
				nid:nid
			},
			success:function(data){

				console.log(data);

				if (data.state === '0') {

					alert(data.message);

					//
					getNewsList();

				}

			},
			error:function(err){
				console.log(err);
			}
		});
});

//改
function updateNews(e,nid){
	console.log('-----------',nid);
	var title = $('#bd-news-title').val(); 
	var content = $('#bd-news-content').val();
	var newslink = $('#bd-news-imglink').val();
	var source = $('#bd-news-source').val();
	var date = $('#bd-news-date').val();
	// var newsTag = $('#bd-news-tag').val();
	var newsTag = $('#bd-news-tag option:selected').val();

	e.preventDefault();
	e.stopPropagation();
	var jsonData = { nid:nid,title:title,content:content,newslink:newslink,source:source,date:date,newsTag:newsTag };
	$.ajax({
		url:'/admin/updateNewsInfo',
		type:"post",
		data:jsonData,
		success:function(data){

			console.log(data);

			if (data.state === '0') {

				isOK = 1;
				jsonD = {};
				//
				$('#bd-news-imglink').val('');
				$('#bd-news-content').val('');
				$('#bd-news-title').val('');
				$('#bd-news-source').val('');
				$('#bd-news-date').val('');
				$('#bd-news-tag option:selected').val('推荐');

				alert(data.message);
				//
				getNewsList();
			}

		},
		error:function(err){
			console.log(err);
		}
	});
}

//查
$('.bd-newsTable').on('click','td',function (e){
	e.preventDefault();
	e.stopPropagation();
	var nid=$(this).parent().attr('nid');
	console.log("查询 获取评论ID",nid);
	$.ajax({
		url:'/admin/getNewsInfo',
		type:'post',
		data:{
			act:'select',
			nid:nid
		},
		success:function(data){

			console.log("获取当前选中评论",data);

			if (data.state === '0') {
				isOK = 0;
				alert(data.message);
				jsonD =  data.message;
				$('#bd-news-imglink').val(jsonD.nimg);
				$('#bd-news-content').val(jsonD.ncontent);
				$('#bd-news-title').val(jsonD.ntitle);
				$('#bd-news-source').val(jsonD.nfrom);
				$('#bd-news-date').val(jsonD.ndate);
				$('#bd-news-tag option:selected').val(jsonD.ntag);
			}

		},
		error:function(err){
			console.log(err);
		}
	});
});
return 2;

})