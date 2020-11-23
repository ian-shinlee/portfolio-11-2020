/*전역 변수*/
var ui_pops;
var swiper_2depth;
var history_swiper_2depth;
var swiper_menubar;
var orderbox_on = false; //주문하기 메뉴 온오프
var opt_scroll; //주문하기 스크롤 플러그인
is_iphone = false;
var side_bar_action;

/* 디바이스 버전 체크 */
var ua = navigator.userAgent.toLocaleLowerCase(),
    app_ver = 0,
    isGinger = false,
    isIcs = false,
    isJellyBean = false,
    isLowAndroid = false;

if(ua.indexOf('android') > -1) {
	is_iphone = false;
    app_ver = ua.substring(ua.indexOf('android') + 7);
    app_ver = app_ver.substring(0, app_ver.indexOf(";"));
    app_ver = app_ver.replace(/^\s*/, ""); // 앞 공백 제거
    app_ver = app_ver.replace(/\s*$/, ""); // 뒤 공백 제거
    app_ver = Number(app_ver.substr(0,3));
}

if(app_ver && app_ver < 3) isGinger = true;
if(app_ver && app_ver >= 4 && app_ver < 4.1) isIcs = true;
if(app_ver && app_ver >= 4.1 && app_ver < 4.4) isJellyBean = true;
if(app_ver > 0 && app_ver < 4.4) isLowAndroid = true;

if (navigator.userAgent.match("iPhone") != null) {
	is_iphone = true;
}

/* document ready */
$(function(){
	$('input[type=text]').each(function(){
		if($(this).is(':visible')) $(this).attr('autocomplete','off');
	}); // 운영과 동일하게 추가함

	$(document).ajaxStart(function(){
		$('.loading_wrap').css('display','block');
	}).ajaxStop(function(){
    	$('.loading_wrap').css('display','none');
    });
    
    if(isIcs){
    	$('#side_menu').css('overflow-y','scroll');//아이스크림샌드위치 버전 메뉴슬라이드 모션감 개선
    	$('.onair_goods_list').addClass('and_low');
    }
    
	/*사이드메뉴 관련*/
	try{		
		var sidemenu_iscroll = new IScroll('.sidemenu_iscroll',{
			mouseWheel: true//, click: true //  2017-09-21 운영과 동일하게 수정
		});		
		$('#side_menu .sidemenu_iscroll>div').css('padding-bottom',$('#side_menu .top_wrap').height()+46);
	}
	catch(e){
	}
	
	side_bar_action = {
			init : function(){
			    if(isIcs){
			    	$('#side_menu').css('overflow-y','scroll');//아이스크림샌드위치 버전 메뉴슬라이드 모션감 개선
			    	$('.onair_goods_list').addClass('and_low');
			    }
			    
				/*사이드메뉴 관련*/
				try{
					var sidemenu_iscroll = new IScroll('.sidemenu_iscroll',{
						mouseWheel: true//, click: true //  2017-09-21 운영과 동일하게 수정
					});					
					$('#side_menu .sidemenu_iscroll>div').css('padding-bottom',$('#side_menu .top_wrap').height()+$('.guest_have_wrap').height()+45);
				}
				catch(e){
				}
				
				if(isIcs){
					$('.btn_side').on('click',function(e){
						$('body').addClass('sidemenu_open');
						$('.deem').css('height','100%');
						/* 2019-06-03 바닥 스크롤 고정 */
						//$(document).bind('touchmove', function(e){e.preventDefault();});
						$('#container').css({'overflow':'hidden', 'height': $(window).height() - 56 + 'px'});
						$('#container').on('scroll touchmove mousewheel', function(e){
							e.preventDefault();
							e.stopPropagation();
							return false;
							}
						);
						sidemenu_iscroll.refresh();
						e.preventDefault();
						$('#side_menu .xbtn,.deem').one('click',function(e){
							$('body').removeClass('sidemenu_open');
							setTimeout(function(){$('.deem').css('height','0');},500);
							/* 2019-06-03 바닥 스크롤 고정 제거 */
							//$(document).unbind('touchmove');
							$('#container').css({'overflow':'', 'height':''});
							$('#container').off('scroll touchmove mousewheel');
							e.preventDefault();
						});
					});
				}
				else{
					$('.btn_side').on('click',function(e){
						$('body').addClass('sidemenu_open');
						$('.deem').css('height','100%');
						/* 2019-06-03 바닥 스크롤 고정 */
						//$(document).bind('touchmove', function(e){e.preventDefault();});
						$('#container').css({'overflow':'hidden', 'height': $(window).height() - 56 + 'px'});
						$('#container').on('scroll touchmove mousewheel', function(e){
							e.preventDefault();
							e.stopPropagation();
							return false;
							}
						);
						sidemenu_iscroll.refresh();
						e.preventDefault();
						$('#side_menu .xbtn,.deem').one('click',function(e){
							$('body').removeClass('sidemenu_open');
							setTimeout(function(){$('.deem').css('height','0');},400);
							/* 2019-06-03 바닥 스크롤 고정 제거 */
							//$(document).unbind('touchmove');
							$('#container').css({'overflow':'', 'height':''});
							$('#container').off('scroll touchmove mousewheel');
							e.preventDefault();
						});
					});
				}
			},
			history_swiper : function () {
				history_swiper_2depth = new Swiper('.history_view_list', {
			        pagination: '.swiper-pagination',
			        slidesPerView: 'auto',
			        paginationClickable: true,
			        freeMode: true
			    });
			}
	}
	
	/* 2016.06.21 검색 개편으로 클릭 이벤트 해제  */
	/*$('.header_top .btn_search').click(function() {
		if(ua.indexOf('android') > -1) {
			$('.search_area').css('position','fixed');
		}else{
			$('body').scrollTop(0);
			$('.search_area').css('position','absolute');
		}
		
		$('body').addClass('search_area_open');
		$('.deem').css('height','100%');
		$('.form_search input').focus();
		$(document).bind('touchmove', function(e){e.preventDefault();});
		$('.search_close,.deem').one('click',function(e){
			$('body').removeClass('search_area_open');
			
			$('.form_search input').focusout();
			$('.deem').css('height','0');
			e.preventDefault();
			$(document).unbind('touchmove');
		});
	});*/
	
	$(window).resize(function() {
		sub_pop_wrap_resize();
	});
	//카테고리 전체보기 사이즈 조절
	function sub_pop_wrap_resize(){
		$('.sub_pop_wrap .cont').css('max-height',$(window).height()-50);
	}
	sub_pop_wrap_resize();
	//카테고리 전체보기 팝업 제어
	$('.more.bt_mds').click(function() {
		$('body').addClass('layerpop_open');
		$('.deem').css('height','100%');
		$('.sub_pop_wrap.mds').addClass('on');
		$('.contents').css('position','absolute');
		//$(document).bind('touchmove', function(e){e.preventDefault();});
		$('.mds .xbt,.deem').one('click',function(e){
			$('body').removeClass('layerpop_open');
			$('.contents').css('position','relative');
			$('.sub_pop_wrap.mds').removeClass('on');
			$('.deem').css('height','0');
			//e.preventDefault();
			//$(document).unbind('touchmove');
		});
	});
	
	//간편전화주문 열고닫기 
	// 2016.06.15 수정(도서산간추가배송비 팝업에 영향주지 않도록 수정)
	$('.ui-pop-btn').click(function() {
		if($(this).data('pop-id') == 'pop_telOrder'){//로그아웃일때만
			var popTelOrder = $('#pop_telOrder'),
				popWrap = popTelOrder.parents('.popup_wrap'),
				lyDim = popWrap.find('.layer_dim');
			popWrap.css('display','block');
			lyDim.css('display','block');
			popTelOrder.css('display','block');
			popTelOrder.find('#pop_close, .layer_close a').one('click', function(event) {
				popWrap.css('display','none');
				lyDim.css('display','none');
				popTelOrder.css('display','none');
			});
		}
	});	
	ui_pops ={close: function(){//간편전화주문 등록처리후 닫기 - 메인쪽 스크립트코드에서 호출
		var popTelOrder = $('#pop_telOrder'),
			popWrap = popTelOrder.parents('.popup_wrap');
		popWrap.css('display','none');
		popWrap.find('.layer_dim').css('display','none');
		popTelOrder.css('display','none');
    }};
	
	//하단 카테고리 팝업 열고닫기
	/*  2016-09-21 개발에서 요청하여 주석처리함
	var blp_open_bt_active = false;
	$('.blp_open_bt').click(function() {
		if(!blp_open_bt_active){
			blp_open_bt_active = true;
			var temp_active = $(this).parents('ul').find('a.on');
			var blp_open_bt = $(this);
			
			temp_active.removeClass('on');
			blp_open_bt.addClass('on');
			
			$('body').addClass('bottom_layerpop_open');
			$('#actionBar').css('z-index','60');
			$('.deem').css('height','100%');
			$(document).bind('touchmove', function(e){e.preventDefault();});
			$('.foot_category_wrap .xbtn,.deem').one('click',function(e){
				if(blp_open_bt_active){
					blp_open_bt_active = false;
					temp_active.addClass('on');
					blp_open_bt.removeClass('on');
					
					
					$('body').removeClass('bottom_layerpop_open');
					setTimeout(function(){
						$('.deem').css('height','0');
						$('#actionBar').css('z-index','40');
					},400);
					$(document).unbind('touchmove');
					e.preventDefault();
				}
			});
		}else{
			$('.foot_category_wrap .xbtn,.deem').click();
		}
	});
	*/
	history_swiper_2depth = new Swiper('.history_view_list', {
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        paginationClickable: true,
        freeMode: true
    });
	
	/*키패드 올라왔을때 서브상단 header 안보이게, 하단 actionBar 안보이게*/
	var temp_placeholder = '';
	var actionbar_out_delay;
	$('input[type="text"],input[type="number"],input[type="password"],input[type="tel"],input[type="search"],textarea,select').focusin(function() { //검색 input 추가
		clearTimeout(actionbar_out_delay);
		$('#actionBar,.floating_top,.floating_chatbot').addClass('disabled'); /* 2019-06-25 챗봇 아이콘 추가 */
		if($('header').attr('id') != 'mainHeader'){
			$('header').css('position','relative');
			$('.contents').css('padding-top','0');			
		}
		temp_placeholder = $(this).attr('placeholder');//아이폰 placeholder가 깜박이는 버그 수정
		$('.bottom_layerpop').css('display','none');//인풋진입시 fixed 포지션이 풀려서 의도치않게 보여지는 버그 수정
	});
	$('input[type="text"],input[type="number"],input[type="password"],input[type="tel"],input[type="search"],textarea,select').focusout(function() {  //검색 input 추가
		actionbar_out_delay = setTimeout(function(){
			$('#actionBar,.floating_top,.floating_chatbot').removeClass('disabled'); /* 2019-06-25 챗봇 아이콘 추가 */
		},500);
		if($('header').attr('id') != 'mainHeader'){
			$('header').css('position','fixed'); //$('.contents:not(".nofix")').css('padding-top','51px'); // 2017-04-10  검색 페이지 예외처리			
			$('.contents').css('padding-top','51px');
		}
		$(this).attr('placeholder',temp_placeholder);//아이폰 placeholder가 깜박이는 버그 수정
		$('.bottom_layerpop').css('display','block');//인풋진입시 fixed 포지션이 풀려서 의도치않게 보여지는 버그 수정
	});
	
	//아이폰 placeholder가 깜박이는 버그 수정
	$('input[type="text"],input[type="number"],input[type="password"],input[type="tel"],textarea,select').on('keydown',function(){
		if($(this).text()){
			temp_placeholder = $(this).attr('placeholder');
			$(this).attr('placeholder','');
		}
		else{
			$(this).attr('placeholder',temp_placeholder);
		}
	});
	
	/*메인팝업 iscroll 적용 */
	try{
		var mainpopScroll = new IScroll('.ds_pop_wrap', {
			bounce:false,
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true//, click: true, //  2017-09-21 운영과 동일하게 수정  //2017-03-10 개발 요청으로 추가 onBeforeScrollStart:function(e){e.preventDefault(); setTimeout(function(){ mainpopScroll.refresh(); },0);}  //2017-09-21 운영과 동일하게 없앰
		});
				
		function pop_resize(){
			if($('.ds_pop_wrap').css('display') != 'none'){
				var pop_h_temp = 0;
				$('.ds_pop_wrap .ds_pop img').each(function(index) {
					var pop_h = $(this).height()+Number($(this).parents('.ds_pop').css('padding-top').replace('px',''))+Number($(this).parents('.ds_pop').css('padding-bottom').replace('px',''));
					if(pop_h_temp < pop_h){
						pop_h_temp = pop_h;
					}
					else{
						pop_h_temp;
					}
				});
				if(pop_h_temp < $(window).height()){
					pop_h_temp = $(window).height();
					$('.ds_pop_wrap>div').css('height',pop_h_temp);
				}
				else{
					$('.ds_pop_wrap>div').css('height',pop_h_temp+100);
				}
				$('.ds_pop_wrap').height($(window).height());
				mainpopScroll.refresh();
			}
		}
		$(window).resize(function() {
			pop_resize();
		});
		pop_resize();
		$('.ds_pop_wrap img').load(function() {
			pop_resize();
		});
	}
	catch(e){
		
	}
	/*메인팝업 iscroll 적용 */

	
	
	/* input 폼의 x버튼 삭제기능 start */
	$('.form_idpw2 input').bind('focusin focusout keyup', function(event) {
		var xbt = $(this).parents('.form_idpw2').find('.icon_del2');
	 	 if($(this).val()){
	 	 	xbt.css('visibility','visible');
	 	 }
	 	 else{
	 	 	xbt.css('visibility','hidden');
	 	 }
	});
	$('.form_idpw2 .icon_del2').click(function() {
		var this_input = $(this).parents('.form_idpw2').find('input'); 
		this_input.val('');
		this_input.focus();
		return false;
	});
	
	/*디바이스 최소높이값*/
	//가로 세로 모드
	var rotate;
	var mheight;
	jQuery(window).height() > jQuery(window).width() ? rotate = 'h' : rotate = 'w'; //가로세로 같으면 똥된다.
	if(!jQuery('#contents').hasClass('no_minheight')){
		jQuery('#contents').css('min-height', jQuery(window).height() - 56 + 'px'); // actionbar height : 63  
	}
	mheight = jQuery(window).height();
	
	/*이전/뒤로 스크롤 유지*/
	$(window).scrollTop(parseInt($(window).scrollTop()));
	
	/* 플로팅 위로 버튼 */
	var float_chatbot = jQuery('.floating_chatbot');
	var float_topBtn = jQuery('.floating_top').hide(), enableFloating = true;
	if(!isGinger) float_topBtn.css({'position':'fixed', 'bottom':'70px'}); /* 2019-06-25 챗봇 아이콘 추가 */
	jQuery(window).scroll(function(){
	    if(enableFloating) {
	        var sct = parseInt(jQuery(window).scrollTop());
	        var url = location.href;
	        //jQuery(window).scrollTop(sct); //이전/뒤로가기 스크롤 유지
	        if (sct > 50) {
	            float_topBtn.show();
	            if(isGinger) {
	                //if(goods.optionBox.active) float_topBtn.css('top', sct + jQuery(window).height() - 120 + 'px');
	                //else float_topBtn.css('top', sct + jQuery(window).height() - 50 + 'px');
	            }
	            float_chatbot.addClass('up'); /* 2019-06-25 챗봇 아이콘 추가 */
	        } else {
	            float_topBtn.hide();
	            float_chatbot.removeClass('up'); /* 2019-06-25 챗봇 아이콘 추가 */
	        }
	    };
	});
	float_topBtn.on('click', function(){ jQuery('html, body').animate({'scrollTop': 0}, 300); });
	
	/* 챗봇 버튼 */
	var start_chatbotBtn = jQuery('.start_chatbot').hide(), enableFloating = true;
	if(!isGinger) start_chatbotBtn.css({'position':'fixed', 'bottom':'88px'});
	jQuery(window).scroll(function(){
	    if(enableFloating) {
	        var sct = parseInt(jQuery(window).scrollTop());
	        var url = location.href;
	        if (sct > 50) {
	        	start_chatbotBtn.show();
	        } else {
//	        	start_chatbotBtn.hide();
	        	if(!isGinger) start_chatbotBtn.css({'position':'fixed', 'bottom':'88px'});
	        }
	    };
	});
	start_chatbotBtn.on('click', function(){ jQuery('html, body').animate({'scrollTop': 0}, 300); });
	
	/* 방송중 바로가기 버튼 */
	var onair_linkBtn = jQuery('.btn_onair_link').hide(), enableFloating = true;
    if(!isGinger) onair_linkBtn.css({'position':'fixed', 'bottom':'64px'}); // 앱일 경우 'bottom':'0px'  
    jQuery(window).scroll(function(){
        if(enableFloating) {
            var sct = parseInt(jQuery(window).scrollTop());
            var url = location.href;
           
            if (sct > 50) {
            	onair_linkBtn.show();
                if(isGinger) {
                   
                }
            } else {
            	onair_linkBtn.hide();
            }
        };
    });
    
	
	/*resize*/
	//resize 핸들러 등록 - resizeLists.push(this.resizeHandler);
	var btop = $('#wrap').height()-$(window).scrollTop()+$(window).height() - 56;
	var resizeLists = [];
	jQuery(window).on('resize', function(){
		var rotate_m; //가로 세로 모드
		var mheight_m;
		var mht_abeighs;
		var btop_m = $(window).scrollTop()+$(window).height-56;
		jQuery(window).height() > jQuery(window).width() ? rotate_m = 'h' : rotate_m = 'w';
		mheight_m = jQuery(window).height();
		mheight_abs = Math.abs(mheight - mheight_m);
		if(!jQuery('#contents').hasClass('no_minheight')){
			if(rotate != rotate_m){ // 가로세로 변환될때
				jQuery('#contents').css('min-height', jQuery(window).height() - 56 + 'px');
				rotate = rotate_m;
				mheight = jQuery(window).height();
			}else if (mheight_abs > 74 ){ //모바일 주소표시줄 보다 클때 
				jQuery('#contents').css('min-height', jQuery(window).height() - 56 + 'px');
				rotate = rotate_m;
				mheight = jQuery(window).height();
			}
		}
	    resizeLists.forEach(function(element, index){ element.call(); });
	    //$('.bottom_option_box').css('top',(btop_m) + 'px');
	});
	
	/* 카테고리 swipe */
	$('#wrap').show();
	
	if($('.top_category_wrap.swiper_2depth').length>0){
		var tcw_delay
		var subId = $('.top_category_wrap.swiper_2depth .swiper-wrapper .swiper-slide a').index($('.top_category_wrap.swiper_2depth .swiper-wrapper .swiper-slide a.current'));
		swiper_2depth = new Swiper('.top_category_wrap.swiper_2depth', {
			initialSlide : subId,
	        slidesPerView: "auto",
	        slidesPerGroup: 4,
	        nextButton: '.swiper-button-next',
        	prevButton: '.swiper-button-prev',
        	freeMode: true,
        	onInit : function(){
        		/*$('.top_category_wrap li').css('visibility','visible');*/
	        }
	    });
	}
	if($('.gnb.swiper_2depth').length>0){
		var subId = $('.gnb.swiper_2depth .swiper-wrapper .swiper-slide a').index($('.gnb.swiper_2depth .swiper-wrapper .swiper-slide a.current')),
			grpVal = subId>2 ? 1 : 3;
		// 2016.06.28 그라데이션 영역에 텍스트 가려지는 현상 수정
		var gnbSlide = $('.gnb.swiper_2depth .swiper-wrapper .swiper-slide'),
			len = gnbSlide.length - 3;
		var isUpdate = 'false';
		if(subId>2 && subId<len) {
			// gnbSlide.eq(subId).css('margin-left','10px');
			isUpdate = 'true';
		}
		swiper_2depth = new Swiper('.gnb.swiper_2depth', {
			initialSlide : subId,
	        slidesPerView: "auto",
	        nextButton: '.gnb .gra_next',
        	prevButton: '.gnb .gra_prev',
	        slidesPerGroup: grpVal,
        	freeMode: true,
	        onInit : function(swiper){
	        	if(isUpdate == 'true') {
	        		/*$('.gnb li').css('visibility','visible');*/
		        	swiper.translate = swiper.translate + 15;
		        	swiper.update(swiper.translate);
	        	}
	        }
	    });
	}

	/*동의하기 토글*/
	if($('.nomem_agree .agree_box').length>0){
		$('.nomem_agree .agree_box .btn').each(function(){$(this).find('span').eq(1).hide();});
		$('.nomem_agree .agree_scroll').hide();
		$('.nomem_agree .agree_box .btn button').click(function(){
			$(this).parent().parent().find('span').toggle();
			$(this).parent().parent().next().toggle();
		});
	}
		
	/*#공통 공통토글*/
	if($('#ui_toggle').length>0){
		//상품상세,고객센터_faq,1:1문의내역,마이쇼핑_나의상품평,나의Q&A
		$(document).on('click', '#ui_toggle > div > div[class$=_tit]', function(){
			if ($(this).attr('active')!='off')
				$(this).parent().siblings().removeClass('active');

			$(this).parent().toggleClass('active');
		});
	}
		
	/*상품상세 이미지 스와이프*/  //2017-08-29 주석처리
	/*if($('.swiper-goodsdetail').length>0)
	var swipe_rgoodsdetail = new Swiper('.swiper-goodsdetail', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        bulletActiveClass : 'active',
        paginationBulletRender: function (index, className) {
        	// return '<a data-slide-index="'+index+'" class="' + className + '">'+'</a>'; 2015-06-03 2015-06-03 삭제
			// swiper.min.js 파일 소스 추가 : if(g.params.paginationBulletRender() == 'innerHtml') {g.bullets=g.paginationContainer.find("."+g.params.bulletClass); return;} 
        	return 'innerHtml'; // js가 아닌 html파일에 하드코딩할때 사용 
        },
        onInit : function(){
        	$('.swiper-pagination.swiper-pagination-clickable').css('position','relative');
        }
	});*/
			
	//상품상세 혜택가 토글
	$('.price_benefit .icon_qmark').click(function(){
		 $(this).closest('.price_benefit').toggleClass('open');
	});
		
	//#공통 상품상세 탭 내용 초기화   
	$('.ui_tab').children('div:gt(0)').hide();
	//상품상세 탭
	$('.ui_tab :first-child a').click(function(index){
		var idx = $(this).closest('ul').find('a').index(this); //인덱스 번호
		var parent = $(this).closest('div'); //부모
		var type = $(this).attr('ui-type');
		if(type!="ajax"){
			parent.children('div').hide();
			parent.children('div').eq(idx).show();
		}
		parent.children('ul').find('a').removeClass('current');
		$(this).toggleClass('current');
	});
	$('#ui_tab').children('div:gt(0)').hide();
	$('#ui_tab :first-child a').click(function(index){
		var idx = $(this).closest('ul').find('a').index(this); //인덱스 번호
		var parent = $(this).closest('div'); //부모
		var type = $(this).attr('ui-type');
		if(type!="ajax"){
			parent.children('div').hide();
			parent.children('div').eq(idx).show();
		}
		parent.children('ul').find('a').removeClass('current');
		$(this).toggleClass('current');
		// 2017-02-09 : 개발요청으로 추가, 4줄 
		jQuery('.search_step1').show();
        jQuery('.search_step2').hide();
        jQuery('.search_step1 .result').hide();
        jQuery(".result.type02").empty();
	});
	
	//#공통 상품상세 탭 내용 초기화
	$('#ui_tab_pay').children('div.tab_pay_cont:gt(0)').hide();
	
	//주문결제 신용카드, ssgmoney 탭
	$('#ui_tab_pay :first-child a').click(function(index){
		var idx = $(this).closest('ul').find('a').index(this); //인덱스 번호
		var parent = $(this).closest('div'); //부모
		var type = $(this).attr('ui-type');
		if(type!="ajax"){
			parent.children('div.tab_pay_cont').hide();
			parent.children('div.tab_pay_cont').eq(idx).show();
		}
		parent.children('ul').find('a').removeClass('current');
		$(this).toggleClass('current');
	});
	//결제방법 안내 부분이 열려있을 경우 상위 탭 클릭하면 닫힘
	$('.pay_option .pay_tab a,#ui_tab_pay .tab_group a').click(function() {
		 $('.tab_pay_cont .onoff_wrap').each(function(index) {
			if($(this).hasClass('on')){
				$(this).find('.onoff_bt').click();
			}
		 });
	});
	
	//주문결제쪽 현금영수증 발급신청 부분, 개인소득공제 사업자지출증빙 select 컨트롤  
	$('.cash_paper_chk_wrap').change(function() {
		var chks = $(this).find('#cash_paper_chk').is(':checked');
		if(chks){
			$(this).parent().find('.cash_paper_wrap').css('display','block');
		}
		else{
			$(this).parent().find('.cash_paper_wrap').css('display','none');
		}
	});
	$('.pay_sel_wrap .form_check input').change(function() {
		var idx = $(this).filter(':checked').parent().index();
		$(this).parents('.cash_paper_wrap').find('.pay_sel_cont>li').removeClass('on');
		$(this).parents('.cash_paper_wrap').find('.pay_sel_cont>li:eq('+idx+')').addClass('on');
	});
	$('.num_opt_select').change(function() {
		var idx = $(this).find('option:selected').index();
		$(this).parent().find('.num_box').css('display','none');
		$(this).parent().find('.num_box:eq('+idx+')').css('display','block');
	});
	
	/* 2016-09-30 : 개발요청으로 주석처리
	//기획전이나 카테고리에서 탭이나 콤보박스 클릭시 scrollTop 상단으로 이동
	$('.plan_wrap .combo_wrap').on('click', function(event) {
		var top = $('.plan_wrap .combo_wrap').offset().top - $('#mainHeader').height();
		//console.log(top);
		$(document).scrollTop(top);
	});
	$('.plan_wrap .tab_a').on('click', function(event) {
		var top = $('.plan_wrap .tab_a').offset().top - $('#mainHeader').height();
		//console.log(top);
		$(document).scrollTop(top);
	});
	
	$('.category .combo_wrap').on('click', function(event) {
		var top = $('.category .combo_wrap').offset().top - $('.sub_header').height();
		//console.log(top);
		$(document).scrollTop(top);
	});  */
	
	

	//주문하기 슬라이드다운
	$('.bottom_option_box .opt_select_wrap').css('display','blcok');
	var opt_wrap_h = $('.bottom_option_box .opt_select_wrap').height();//옵션바 세로크기
	$('.bottom_option_box .opt_select_wrap').css('transform','translate(0,'+opt_wrap_h+'px)');//옵션바 세로가 유동적이므로 계산해서 처리
	$('.bottom_option_box .opt_before button[type=button]').on('click',function(touchEvent){
		$('.opt_before').toggle();
		$('.bottom_option_box .opt_select_wrap').css('transform','translate(0,0)');
		//$('.bottom_option_box .opt_select_wrap').slideDown();
		orderbox_on = true;
		//주문하기 슬라이드업
		$('.opt_select_wrap .opt_drop_btn span').one('click', function(event) {
			if(orderbox_on){
				opt_wrap_h = $('.bottom_option_box .opt_select_wrap').height();
				$('.bottom_option_box .opt_select_wrap').css('transform','translate(0,'+opt_wrap_h+'px)');//옵션바 세로가 유동적이므로 계산해서 처리
				$('.opt_before').toggle();
				//$('.bottom_option_box .opt_select_wrap').slideUp(function(){$('.opt_before').toggle();});
				orderbox_on = false;
			}
		});
	});
	
	
	//주문하기 포커스 아이폰 오류
	
	if(is_iphone == true) {
		$('.bottom_option_box input, .bottom_option_box select').focusin(function() {
			$(this).parents('.bottom_option_box').css({'position' : 'absolute', 'bottom' : '0'});
		}).focusout(function() {
			$(this).parents('.bottom_option_box').css({'position' : 'fixed', 'bottom' : '0px'});
		});
	}

	
	// 2019-02-14 별점 수정
	$('.comment_score').find('.star').on('click', function(){
		
		var $this = $(this);
		var $thisNum = $this.index();
		var $curr = $this.parents('li');		
		var $stars = $curr.find('.star');
		var $dataName =$curr.attr('data-name');	               
		var $val = $thisNum;
		
		if( !$this.hasClass('half') ){
			$stars.removeClass('full half').slice(0, $thisNum).addClass('full');
			$this.addClass('half');
			$val = $thisNum - 0.5;
		}else{
			$this.removeClass('half');
			$val = $thisNum;		
		}

		$('input[name="'+$dataName+'"]').val($val);
		
	});
	
	/*
	//별점
	$('.comment_score ul li .star').css('cursor','pointer');
	$('input[group="stars"]').each(function(){
		var vName = $(this).attr('name');
		var vValue = $(this).val();
		var vStar = $('.comment_score ul li[data-name="'+vName+'"] .star');
		vStar.removeClass('active');
		vStar.slice(0,vValue).addClass('active');
	});
	$('.comment_score ul li .star').click(function(){
		var dataName = $(this).parent().attr('data-name');
		var vIndex = $(this).index();
		var broTher = $(this).parent().find('.star');
		broTher.removeClass('active');
		broTher.slice(0,vIndex).addClass('active');
		$('input[name="'+dataName+'"]').val(vIndex);
	});
	*/
	

	/*공통 onoff 모듈*/
	/*$('.onoff_bt').click(function() {
		var onoff_wrap = $(this).parents('.onoff_wrap');
		var onoff_bt = $(this);
		
		if(onoff_wrap.hasClass('on')){
			onoff_wrap.removeClass('on');
			onoff_bt.text(onoff_bt.data('temptxt'));
		}
		else{
			onoff_wrap.addClass('on');
			onoff_bt.attr('data-temptxt',onoff_bt.text());
			onoff_bt.text(onoff_bt.data('opentext'));
		}    
		onoff_wrap.find('.onoff_cont').toggle();
		return false;
	});*/


	/*공통 onoff 모듈*/
	$('.onoff_bt').click(function() {	
		if ( $('.onairlist_type_a.view_type1').length > 0 ){return false} //2017-12-04 편성표/tv쇼핑만 사용
		var onoff_wrap = $(this).parents('.onoff_wrap');
		var onoff_bt = $(this);
		
		if(onoff_wrap.hasClass('on')){
			onoff_wrap.removeClass('on');
			onoff_bt.text(onoff_bt.data('temptxt'));
		}
		else{
			onoff_wrap.addClass('on');
			onoff_bt.attr('data-temptxt',onoff_bt.text());
			onoff_bt.text(onoff_bt.data('opentext'));
		}    
		onoff_wrap.find('.onoff_cont').toggle();
		return false;
	});
	
	
	/*주문결제쪽 onoff_bt 버튼 한번 클릭시 tip_wrap 사라지게*/
	$('.discount_box.onoff_wrap').each(function(index) { 
		var onoff_bt = $(this).find('.onoff_bt'); 
	  	var tip_wrap = $(this).find('.tip_wrap.oneview');
	  	onoff_bt.click(function() {
  			tip_wrap.css('display','none');
  		});
	});
	
	/*공용 탭*/
	$('.ds_tab').each(function(index) {
      var root = $(this);
      var start_idx = Number($(this).data('startidx'))-1;
	  $(this).find('.tab_ui a').click(function() {
	  	var idx = $(this).parents('li').index();
	  	root.find('.tab_cont>li').removeClass('on');
	  	root.find('.tab_ui>li').removeClass('on');
	  	$(this).parents('li').addClass('on');
	  	root.find('.tab_cont>li:eq('+idx+')').addClass('on');
	  	$(this).trigger('ds_tab_click',[idx]);
	  });
	  
	  $(this).find('.tab_ui>li:eq('+start_idx+') a').click();
	});
	
	
	//.공통 우편번호찾기 토글
	$('.form_post_search').hide();
	$('.form_address button[type=button]:contains("우편번호찾기")').on('click',function(){
		if($(this).hasClass('btnType1_h40')){
			$(this).removeClass('btnType1_h40');
			$(this).addClass('btnType4_h40');
		}else{
			$(this).removeClass('btnType4_h40');
			$(this).addClass('btnType1_h40');
		}
		$(this).closest('.form_address').next('div.form_post_search').toggle();
	});

	// 2016-12-28 공통 우편번호찾기 토글
	$('.form_address2 button[type=button]:contains("주소검색")').on('click',function(){
		if($(this).hasClass('btnType1_h40')){
			$(this).removeClass('btnType1_h40');
			$(this).addClass('btnType4_h40');
		}else{
			$(this).removeClass('btnType4_h40');
			$(this).addClass('btnType1_h40');
		}
		//$(this).closest('.form_address2').next('div.form_post_search').toggle(); 2017-02-09 : 개발요청으로 주석처리
	});

	
	//.공통 옵션변경 토글
	$('dd div.change_wrap').hide();
	$('dd button[type=button]:contains("옵션변경")').on('click',function(){
		if($(this).hasClass('btnType1_h40')){
			$(this).removeClass('btnType1_h40');
			$(this).addClass('btnType4_h40');
		}else{
			$(this).removeClass('btnType4_h40');
			$(this).addClass('btnType1_h40');
		}
		$(this).closest('dd').find('div.change_wrap').toggle();
	});
	
	
	//.공통 버튼 토글
	$('#ui_button_hidden').hide();
	$('#ui_button').on('click',function(){
		if($(this).hasClass('btnType1_h40')){
			$(this).removeClass('btnType1_h40');
			$(this).addClass('btnType4_h40');
		}else{
			$(this).removeClass('btnType4_h40');
			$(this).addClass('btnType1_h40');
		}
		$('#ui_button_hidden').toggle();
	});
	
	//공통 ids 온오프 버튼 
	$('div[ids=ui_button_onoff] button:even').hide();
	$('div[ids=ui_button_onoff]').prev().show();
	$('div[ids=ui_button_onoff] button').on('click',function(){
		$(this).hide().siblings().show();
		$(this).parent().prev().toggle();
	});
	
	
	/*편성표 onair*/
	if($("#wrap #onair").length>0){
		$('#wrap').hide();
		setTimeout(onAir,200);
	}	
	
});

//커스텀 콤보박스 컨트롤 start
var ds_select_before;
var plan_swiper;
$(document).ready(function() {
	$('.ds_select').each(function(index) {
	  var ds_select = $(this);
	  var title = $(this).find('.title');
	  var select_cont =  $(this).find('.select_cont');
	  var onetouch_idx = 1;
	  var temp_viewtype = $('.select_cont .cont li:eq(0) a').attr('class');
	  var view_li = 50;/*화면에 보여질 콤보박스의 li 갯수. 나머지는 스크롤*/
	  
	  
	  var max_height = $(this).find('.select_cont li').height() * view_li;
	  $(this).find('.select_cont').css('max-height',max_height+6);/*콤보박스 cont 의 max-height 설정*/
	  
	  title.on('click', function(event) {
	  	if(ds_select.hasClass('onetouch')){
	  		var onetouch_idx_max = ds_select.find('.select_cont .cont li').length;
	  		
	  		if(onetouch_idx_max <= onetouch_idx){
	  			onetouch_idx = 1;
	  		}
	  		else{
	  			onetouch_idx++;
	  		}
	  		var current_item = ds_select.find('.select_cont .cont li:eq('+(onetouch_idx-1)+')');
	  		title.empty();
			title.append(current_item.html());
			var al = current_item.find('a').attr('class');
			
			$('.onair_goods_list.type_al .goods_list').removeClass(temp_viewtype);
			$('.onair_goods_list.type_al .goods_list').addClass(al);
			temp_viewtype = al;
			if(ds_select_before){
				ds_select_before.removeClass('open');
				ds_select_before = ds_select;
			}
			//setCookie("viewType",al);
	  	}
	  	else{
	  	  if(ds_select.hasClass('open')){
			ds_select.removeClass('open');
			ds_select_before = "";
	  	  }
	  	  else{
	  	  	ds_select.addClass('open');
		  	  if(ds_select_before){
		  		ds_select_before.removeClass('open');
		  	  }
			ds_select_before = ds_select;
	  	  }
	  	}
	  });
	});
	$('.ds_select.type_txt li a').on('click', function(event) {
		var li = $(this).parent('li');
		var ds_select = $(this).parents('.ds_select');
		ds_select.find('.title').text(li.find('a').text()); 
		ds_select.find('li').removeClass('on');
		li.addClass('on');
		ds_select.removeClass('open');
		ds_select_before = "";
		var sel_id =  $(this).attr('id');
		$(this).trigger('ds_select_click',[sel_id]);
	});
	$('.ds_select.type_icon .select_cont .cont li').on('click', function(event){
		var al = $(this).find('a').attr('class');
		var title = $(this).parents('.ds_select.type_icon').find('.title');
		var title_temp = title.html();
		title.empty();
		title.append($(this).html());
		
		$(this).parents('.ds_select.type_icon').removeClass('open');
		ds_select_before = "";
		
		$(this).empty();
		$(this).append(title_temp);
		$('.onair_goods_list.type_al .goods_list').removeClass('view_type1');
		$('.onair_goods_list.type_al .goods_list').removeClass('view_type2');
		$('.onair_goods_list.type_al .goods_list').removeClass('view_type3');
		$('.onair_goods_list.type_al .goods_list').addClass(al);
		
	});
	plan_swiper = new Swiper('.plan_swiper', {
		nextButton: '.plan_swiper .btn_next',
    	prevButton: '.plan_swiper .btn_prev',
        pagination: '.pagination',
        paginationClickable: true,
        bulletActiveClass : 'active',
        paginationBulletRender: function (index, className) {
        	/* return '<a data-slide-index="'+index+'" class="' + className + '">'+'</a>'; 2015-06-03 2015-06-03 삭제*/
			/* swiper.min.js 파일 소스 추가 : if(g.params.paginationBulletRender() == 'innerHtml') {g.bullets=g.paginationContainer.find("."+g.params.bulletClass); return;} */
        	return 'innerHtml'; /* js가 아닌 html파일에 하드코딩할때 사용 */
        },
        onInit : function(){
        	$('.swiper-pagination.swiper-pagination-clickable').css('position','relative');
        }
    });
    
    $('.plan .plan_title_wrap .banner_wrap .bt_updown,.banner_wrap .custom_bt_updown').on('click',function() {
    	var plan = $(this).parents('.plan_title_wrap');
    	if(plan.hasClass('on')){
    		$(document).scrollTop(0);
	  		plan.removeClass('on');
	  	}
	  	else{
	  		plan.addClass('on');
	  	}
	});
	
	if($('.mds_swiper').length > 0){
		var li_num = $('.mds_swiper .swiper-wrapper li').length;
		if(li_num <= 1){ //mds추천이 한개일때
			$(document).ready(function() {
		    	var sw = $(window).width();
			    $(window).resize(function() {//스크롤시 리사이즈 이벤트 발생으로 초기화되는거 방지
			    	if($(window).width() != sw){
				    	set_swiper();
				    	sw = $(window).width();
			    	}
			    });
			    function set_swiper(){
			    	var screen_w = $(window).width();
			    	var li_width = (screen_w * 90) / 100;
			    	var padding = (screen_w * 5) / 100;
			    	$('.mds_swiper .swiper-wrapper').css('padding-left',padding);
			    	$('.mds_swiper .swiper-wrapper').css('width',li_width);
			    	$('.mds_swiper').css('visibility','visible');
			    }
			    set_swiper();
		    });
		}
		else if(li_num == 2){//mds추천이 두개일때
			var mds_swiper;
			mds_swiper = new Swiper('.mds_swiper', {
		        pagination: '.pagination',
		        nextButton: '.mds_wrap .next',
	    		prevButton: '.mds_wrap .prev',
		        spaceBetween: 9,
		        bulletActiveClass : 'active',
		        onInit : function(){
        			$('.mds_swiper').css('visibility','visible');
	        	},
		        paginationBulletRender: function (index, className) {
		        	/* return '<a data-slide-index="'+index+'" class="' + className + '">'+'</a>'; 2015-06-03 2015-06-03 삭제*/
					/* swiper.min.js 파일 소스 추가 : if(g.params.paginationBulletRender() == 'innerHtml') {g.bullets=g.paginationContainer.find("."+g.params.bulletClass); return;} */
		        	return 'innerHtml'; /* js가 아닌 html파일에 하드코딩할때 사용 */
		        }
		    });
		    
		    $(document).ready(function() {
		    	var sw = $(window).width();
			    $(window).resize(function() {//스크롤시 리사이즈 이벤트 발생으로 초기화되는거 방지
			    	if($(window).width() != sw){
				    	set_swiper();
				    	sw = $(window).width();
			    	}
			    });
			    function set_swiper(){
			    	var screen_w = $(window).width();
			    	var li_width = (screen_w * 90) / 100;
			    	var padding = (screen_w * 5) / 100;
			    	$('.mds_swiper .swiper-wrapper').css('padding-left',padding);
			    	$('.mds_swiper .swiper-slider').css('width',li_width);
			    	mds_swiper.params.width = li_width;
			    	mds_swiper.init();
			    }
			    set_swiper();
		    });
		}
		else if(li_num > 2){//mds추천이 3개 이상부터
			var mds_swiper;
			mds_swiper = new Swiper('.mds_swiper', {
		        pagination: '.pagination',
		        nextButton: '.mds_wrap .next',
	    		prevButton: '.mds_wrap .prev',
		        slidesPerView: 3,
		        spaceBetween: 9,
		        paginationClickable: true,
		        loop:true,
		        bulletActiveClass : 'active',
		        onInit : function(){
        			$('.mds_swiper').css('visibility','visible');
	        	},
		        paginationBulletRender: function (index, className) {
		        	/* return '<a data-slide-index="'+index+'" class="' + className + '">'+'</a>'; 2015-06-03 2015-06-03 삭제*/
					/* swiper.min.js 파일 소스 추가 : if(g.params.paginationBulletRender() == 'innerHtml') {g.bullets=g.paginationContainer.find("."+g.params.bulletClass); return;} */
		        	return 'innerHtml'; /* js가 아닌 html파일에 하드코딩할때 사용 */
		        }
		    });
		    
		    $(document).ready(function() {
		    	var sw = $(window).width();
			    $(window).resize(function() {//스크롤시 리사이즈 이벤트 발생으로 초기화되는거 방지
			    	if($(window).width() != sw){
				    	set_swiper();
				    	sw = $(window).width();
			    	}
			    });
			    function set_swiper(){
			    	var screen_w = $(window).width();
			    	var li_width = (screen_w * 90) / 100;
			    	var padding = (screen_w * 5) / 100;
			    	$('.mds_swiper .swiper-wrapper').css('padding-left',padding);
			    	$('.mds_swiper .swiper-wrapper').css('margin-left',-(li_width));
			    	mds_swiper.params.width = li_width*3;
			    	mds_swiper.init();
			    }
			    set_swiper();
		    });
			
		}
		
		
		
		
	}
});

//기획전에서 컨텐츠영역으로 스크롤 이동시키는거
function plan_go_cont(){
	$('html, body').animate({'scrollTop': $('.banner_wrap').height() + 15});
}
function go_scroll(v){//해당 객체위치로 스크롤 이동
	$('html, body').animate({'scrollTop': $(v).offset().top - $('header').height()});
}

/*편성표 온에어 바로가기*/
function onAir(){
	$('#wrap').show();
	var offset = $('#onair').offset().top - 106;
	$(window).scrollTop(offset); 
}

/*하단 액션바 5초후 안보이게 start*/
try{
	$(window).load(function() {
		//alert('start1');
		if($('#wrap').hasClass('tv_boardcast')){
			var actionBaronoff = setTimeout(function(){$('#actionBar,.floating_top,.floating_chatbot,.bottom_ficon').addClass('off')}, 5000); /* 2019-06-25 챗봇 아이콘 추가 */
			var actionBaronoff_dis = setTimeout(function(){$('#actionBar,.floating_top,.floating_chatbot').addClass('disabled')}, 6000); /* 2019-06-25 챗봇 아이콘 추가 */
			var actionBar_s_delay = setTimeout(function(){
				$(document).scroll(function() {
					if(!$('#actionBar').hasClass('off')){
						clearTimeout(actionBaronoff);
						clearTimeout(actionBaronoff_dis);
					}
					else{
						clearTimeout(actionBar_s_delay);
						$('#actionBar,.floating_top,.floating_chatbot').removeClass('disabled'); /* 2019-06-25 챗봇 아이콘 추가 */
						$('#actionBar,.floating_top,.floating_chatbot,.bottom_ficon').removeClass('off'); /* 2019-06-25 챗봇 아이콘 추가 */
					}
				});
			}, 1000);
			$('.blp_open_bt').click(function() {
				if(!$('#actionBar').hasClass('off')){
					clearTimeout(actionBaronoff);
					clearTimeout(actionBaronoff_dis);
				}
			});
		}
	});
}
catch(e){
	
}
/*iscroll_wrap 클래스에 iscroll 기능 자동 할당, 주의 : iscroll기능을 사용하지 않을시 iscroll_wrap 클래스네임은 사용하지 말것*/
var auto_iscroll_arr = [];
$(document).ready(function() {
	var autoiscroll_idx=0;
	$('.iscroll_wrap').each(function(index) {
		autoiscroll_idx++;
		var iscroll_id = 'iscroll_'+autoiscroll_idx;
	    $(this).css('overflow','hidden');
	    $(this).attr('id',iscroll_id);
		var auto_iscroll = new IScroll('#'+iscroll_id, {
			bounce:false,
			scrollbars: true,
			mouseWheel: true,
			shrinkScrollbars: 'scale',
			scrollbarHide: false,
			scrollbars: 'custom'//, click: true //  2017-09-21 운영과 동일하게 수정
		});
		auto_iscroll_arr.push(auto_iscroll);
	});
});

/* 카드 청구 할인 2016.06.14
/* cardTipCtrl
 * @param item : Element, '.cardTip_item, .goods_card'
 */
var cardTipCtrl = function(item){
	// cardTip Item Show/hide
	var isActive = 'active';
	if(item.hasClass(isActive)){
		item.removeClass(isActive);
	} else {	
		jQuery('.cardTip_item.active, .goods_card.active').removeClass(isActive);
		item.addClass(isActive);
	};
	// popup > close button > click
	if(item.find('.cardTip_popup')) {
		item.find('.cardTip_popup .btn_pop_close').click(function(e){
			e.preventDefault();
			item.removeClass(isActive);
		});
	};
};


/* 상단 배너 - 메인헤더, 상품상세만 노출 2016-09-20 */
var topBannerCtr = {
	open : function(){
		topBnr = true;
		var elem = "<div class='header_banner'><div class='guide_app'><span class='msg'>앱 설치 후 혜택 받으세요!</span><a href='javascript:' class='btn_download'>다운로드</a><span class='btn_close'><a href='javascript:'>닫기</a></span></div></div>"		
		if ($('#mainHeader').length){
			$('#mainHeader').prepend(elem);
			$('#container').addClass('with_top_banner').addClass('onlyMain');
		} else if ( $('.goods_details').length ){
			$('#container').prepend(elem);
			$('#container').addClass('with_top_banner').addClass('onlyDetail');
		}
		$('.header_banner .btn_close').click(function(){
			topBannerCtr.remove();			
		});	
	},
	remove : function(){
		topBnr = false;
		$('.header_banner').remove();
		$('#container').removeClass('with_top_banner');
	}
}
//topBannerCtr.open();	

/* 좌측메뉴 웹 확인용
$(document).ready(function() {
	$('.btn_side').on('click',function(e){
		$('body').addClass('sidemenu_open');
		$('.deem').css('height','100%');
		$(document).bind('touchmove', function(e){e.preventDefault();});
		sidemenu_iscroll.refresh();
		e.preventDefault();
		$('#side_menu .xbtn,.deem').one('click',function(e){
			$('body').removeClass('sidemenu_open');
			setTimeout(function(){$('.deem').css('height','0');},400);
			$(document).unbind('touchmove');
			e.preventDefault();
		});
	});
})
*/

$(document).ready(function() {
	ssgTV_handler();
})
// ssgtv 좌측메뉴 & sort, 좋아요 
function ssgTV_handler(){
	$('.ssgtv .btn_side2').on('click',function(e){
		$('body').addClass('sidemenu_open');
		$('.deem').css('height','100%');
		/* 2019-06-03 바닥 스크롤 고정 */
		//$(document).bind('touchmove', function(e){e.preventDefault();});
		$('#container').css({'overflow':'hidden', 'height':'0'});
		$('#container').on('scroll touchmove mousewheel', function(e){
			e.preventDefault();
			e.stopPropagation();
			return false;
			}
		);
		sidemenu_iscroll.refresh();
		e.preventDefault();		
	});
	
	$('.sort a').each(function(){
		$(this).click(function(){
			$('.sort a').removeClass('on');
			$(this).addClass('on');
		});
	});

	$('.ssgtv_view_area .ssgtv_tit a').click(function(){  
	  if ( $(this).hasClass('open') ){
	   $(this).removeClass('open');
	   $('.ssgtv_txts_tail').hide();
	  } else {
	   $(this).addClass('open');
	   $('.ssgtv_txts_tail').show();
	  }
	 });

	 $('.ssgtv #side_menu .xbtn, .ssgtv .deem').on('click',function(e){
		$('body').removeClass('sidemenu_open');
		setTimeout(function(){$('.deem').css('height','0');},500);
		/* 2019-06-03 바닥 스크롤 고정 제거 */
		//$(document).unbind('touchmove');
		$('#container').css({'overflow':'', 'height':''});
		$('#container').off('scroll touchmove mousewheel');
		e.preventDefault();
	});

	/*
	$('.ssgtv_sns .good a').click(function(){		
		if ( $(this).hasClass('on') ){
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}
	});
	*/
}
