var navSwiper;
$(function () {
    var commonUi = {
        init:function(){
            $('header nav').length && this.navSwiperFunc(); // gnb swipe setting && fixed
            $('.header_banner .btn_close a').length && this.closeDownBanner(); // app 설치배너 삭제
            this.toTopFunc(); // top btn
            this.jsTab(); // tab btn
            $('footer dl dt').length && this.footerToggle(); // footer toggle btn
            $('.action_banner .ac_close').length && this.actionBclose(); // action 배너 삭제
        },
        navSwiperFunc:function(){
            // swipe
            navSwiper = new Swiper('header nav', {
                slidesPerView: 'auto',
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                spaceBetween: 0,
                
                onTouchStart : function(swiper, event) {
                    if (typeof window.Android != "undefined") {
                        window.Android.onTouch(event.type);
                    }
                },
                onTouchEnd : function(swiper, event) {
                    if (typeof window.Android != "undefined") {
                            window.Android.onTouch(event.type);
                    }
                }
            })

            // fix
            var navOffsetTop = $('header nav').offset().top - $('.header_banner').outerHeight();
            $(window).scroll(function () {
                scFunction();
            });
            function scFunction(){
                var sc = $(document).scrollTop();
                if (sc >= navOffsetTop) {
                    $('header nav').addClass('fixed');
                } else {
                    if($('body').hasClass('layer_on')) {
                        $('header nav').addClass('fixed');
                    } else {
                        $('header nav').removeClass('fixed');
                    }
                }
            }
            scFunction();
        },
        closeDownBanner:function(){ // app 설치배너 삭제
            if(! ($('#wrap').hasClass('best') || $('#wrap').hasClass('main')) ){
                $('.header_banner .btn_close a').on('click', function (e) {
                    $('header').removeClass('bnr');
                    var bannerCode = "web_popup1",
                        currentDate   = new Date(),
                        tomorrowDate  = new Date();
                    tomorrowDate.setDate(tomorrowDate.getDate()+1);
                    tomorrowDate.setHours(0,0,0,0);
                    setCookie(bannerCode,"Y", tomorrowDate - currentDate);
                    e.preventDefault();
                });
            }
        },
        toTopFunc:function(){ // top btn
            var float_topBtn = jQuery('.floating_top').hide(), enableFloating = true;
            float_topBtn.css({ 'position': 'fixed', 'bottom': '70px' });
            jQuery(window).scroll(function(){
                if (enableFloating) {
                    var sct = parseInt(jQuery(window).scrollTop());
                    if (sct > 50) {
                        float_topBtn.show();
                        $('.floating_chatbot').addClass('up');
                    } else {
                        float_topBtn.hide();
                        $('.floating_chatbot').removeClass('up');
                    }
                };
            });
            float_topBtn.on('click', function(){ 
                jQuery('html, body').animate({ 'scrollTop': 0 }, 0); 
            });
        },
        jsTab:function(){ // tab btn
            $(document).on('click', '[data-click="tab"]', function(e){
                e.preventDefault();
                var thisTab = $(this),
                    thisContents = $('#' + $(this).attr('href'));
                thisTab.parent().addClass('active').siblings().removeClass('active');
                thisContents.addClass('active').siblings().removeClass('active');
            });
        },
        jsPlanTab:function(){  // jsPlanTab 추가 by developer
            $(document).on('click', '[data-click="plantab"]', function(e){
            //e.preventDefault();
            e.stopImmediatePropagation();
                var thisTab = $(this),
                thisContents = $('#' + $(this).attr('data-tab'));
                thisTab.parent().addClass('active').siblings().removeClass('active');
                thisContents.addClass('active').siblings().removeClass('active');
            });
        },
        footerToggle:function(){ // footer toggle btn
            $('footer dl dt').click(function(){
                $(this).toggleClass('on');
            })
        },
        actionBclose:function(){ // action 배너 삭제
            $('.action_banner .ac_close').click(function(){
                var acBanner = $(this).parent('.action_banner');
                acBanner.fadeOut(200, function(){
                    acBanner.removeClass('active');
                });
            })
        }
        
    }
    // 공통 레이어 팝업
    window.hcLayer = {
        init:function(){
            this.closeBtnEvent();
        },
        closeBtnEvent:function(){
            $(document).on('click', '[data-dismiss="modal"]', function(e){
                e.preventDefault();
                var thisLayer;
                $(this).closest('.layer').length ? thisLayer = $(this).closest('.layer') : thisLayer = $(this).closest('.full_layer');
                hcLayer.hideEvent(thisLayer);
                $("#wrap").css("top", 0);
            })
        },
        show : function (target, url, text) {
            var showLayer = $('#' + target);
            posY = $(window).scrollTop();
            $('body').addClass('layer_on');
            $("#wrap").css("top", -posY);
            if ("" != url) {
                $('#url_ok').attr('href', url);
            }
            
            if ("" != text) { // 특정 텍스트 받아서 팝업 노출
                $('.layer_body').text(text);
            }
            if (showLayer.attr('appFlag')) {
                commonAppFuctionCall("fn_didShowLayerPopup", true);
            }
            showLayer.attr("tabindex", 0).show().focus();
            if (showLayer.find('.pop_iscroll')) {
                try {
                    var pop_iscroll = new IScroll('#' + target + ' .pop_iscroll', {mouseWheel: true});
                } catch (e) {
                    console.log('pop_iscroll 실패');
                }
            }
        },
        hide:function(target){
            var hideLayer = $('#' + target);
            this.hideEvent(hideLayer);
        },
        hideEvent:function(target){
            target.attr("tabindex",-1).hide();
            $('body').removeClass('layer_on');
            if(posY != null) {
                $(window).scrollTop(posY);
            }
            posY = null;
        }
    }
    commonUi.init();
    hcLayer.init();
});


// 퍼블전용
// gnb check
function gnbCurrentCheck() {
	var sPageURL = window.location.pathname;
    sPageURL += "?viewType";
	$(function () {
        jQuery('#swiperId > li > a').each(function(index) {
            if(sPageURL == jQuery(this).attr('linkId')){
                jQuery(this).parents('li').addClass('swiper-slide-thumb-active');
                var activeNum = jQuery(this).parents('li').index();
                navSwiper.slideTo(activeNum-1);
                return false;
            }
        });
    });
}
//햄버거메뉴 영역 확인용
function getSideBar(){ 
    side_bar_action.init();
    side_bar_action.history_swiper();
    history_swiper_2depth.init();
    jQuery('.btn_side').trigger('click');
}