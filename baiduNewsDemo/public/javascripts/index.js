// 
document.addEventListener('DOMContentLoaded',function (){
	console.log('lori-test');
	//
	;(function (win,doc){
		function changeSize(){
			doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*50+'px';
		}
		changeSize();
		win.addEventListener('resize',changeSize,false);
	})(window,document);

	//
	new Swiper('.swiper-container',{
		slidesPerView : 4,
    	slidesPerGroup : 1,
		// loop:true, 							//无限循环/无缝滚动
		// spaceBetween:10,					//间距
		// prevButton:'.swiper-button-prev',	//上一个
		// nextButton:'.swiper-button-next'	//下一个
	});

	//
	var oBox=document.querySelector('.banner');
	var oUl=document.querySelector('.imglist');
	var aLi=oUl.children;
	
	var x=0;
	var iNow=0;
	oUl.addEventListener('touchstart',function (ev){
		var oldX=ev.targetTouches[0].pageX-x;
		var downX=ev.targetTouches[0].pageX;
		
		function fnMove(ev){
			x=ev.targetTouches[0].pageX-oldX;
			oUl.style.left=x+'px';
		}
		function fnEnd(ev){
			document.removeEventListener('touchmove',fnMove,false);
			document.removeEventListener('touchend',fnEnd,false);
			document.title=iNow;
			var upX=ev.changedTouches[0].pageX;
			if(Math.abs(upX-downX)>20){
				if(downX>upX){
					iNow++;
					if(iNow==aLi.length)iNow=aLi.length-1;
				}else{
					iNow--;		
					if(iNow==-1)iNow=0;	
				}
			}
			x=-iNow*aLi[0].offsetWidth;
			oUl.style.left=x+'px';
			
		}
		
		document.addEventListener('touchmove',fnMove,false);
		document.addEventListener('touchend',fnEnd,false);
	},false);

	//
	function clearAllNews(){
		$('.jtb-treasureType-list ul').html("");
	}
	function getNewListRender(arr){

		$(arr).each(function(index, element) {

			$('<li nid="'+element.nid+'">'
				+'<div class="bd-newslist-img">'
					+'<img src="'+element.nimg+'" alt="图片" />'
				+'</div>'
				+'<div class="bd-newslist-content">'
					+'<h3>'+element.ntitle+'</h3>'
					+'<p>'+element.ndate+'</p>'
					+'<i class="fr"></i>'
				+'</div>'
			+'</li>').appendTo('.jtb-treasureType-list ul');
			
	    });
	}

	function getTagNews(tagname){
		$.ajax({
			url:'/getTagNews',
			type:"post",
			data:{tagname:tagname},
			success:function(jsonData){

				console.log("获取tagnews为",jsonData);

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
	getTagNews('推荐');
	//
	$('.bd-news-tags').on('click','a',function (e){
		e.preventDefault();
		e.stopPropagation();
		var tagname=$(this).text();
		console.log("获取tagname为",tagname);
		getTagNews(tagname);
	});




},false);



