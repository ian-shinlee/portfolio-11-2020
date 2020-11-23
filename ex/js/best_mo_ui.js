$(function () {
    var doScroll = true, // 타페이지 이동 swipe와 페이지 내 swipe 분리하기 위한 변수값
        sortSwiper;
    window.toplist = new Array();
    window.bestUi = {
            init:function(){
                $('.best_content .sort_bx').length && this.sortFunc(); // 카테고리 swipe
                $('.best_content .sec_wrap section').length && this.bestSecTopList(); // 각 offset().top 값 배열에 담기
                $('.best_content .sort_bx .swiper-slide').length && this.bestClickSwipe(); // 카테고리 클릭시
                $('.header_banner .btn_close a').length && this.bestSecTopReset(); // 새로고침 혹은 상단 배너를 끌 때 offset().top 재설정
                $('.prd_list .btn_zzim').length && this.zzim(); // 찜버튼 클릭시
            },
            sortFunc:function(){
                // set swiper
                sortSwiper = new Swiper('.best_content .sort_bx', {
                    slidesPerView: 'auto',
                    updateOnWindowResize:true,
                    preventClicks: true,
                    on: {
                        touchStart : function(event) {
                            doScroll = false;
                            if (typeof window.Android != "undefined") {
                                window.Android.onTouch(event.type);
                            }
                        },
                        touchEnd : function(event) {
                            doScroll = true;
                            if (typeof window.Android != "undefined") {
                                window.Android.onTouch(event.type);
                            }
                        }
                    }
                });

                // scroll function: 공통GNB, 베스트 카테고리 고정
                var $sortbx = $('.best_content .sort_bx'),
                    $bestSec = $('.sec_wrap section'),
                    pre_pos; // 이전 스크롤 위치(초기값은 현재와 동일)
                $(window).scroll(function () {
                    bestScFunc();
                    if ( doScroll == false ) return
                });
                function bestScFunc(){
                    var sc = $(document).scrollTop(),
                        headerHeight = $('header nav').outerHeight() + $('.header_banner').outerHeight() + $sortbx.outerHeight();
                    if (sc == 0) {
                        bestUi.afterTop();
                    }
                    if ( sc >= $bestSec.eq(0).offset().top - headerHeight ) {
                        $sortbx.addClass('fixed');
                        if( $('header').hasClass('bnr')){
                            $sortbx.addClass('bnr');
                        } else {
                            $sortbx.removeClass('bnr');
                        }
                        
                        if (sc > pre_pos) { // scroll ↓
                            bestUi.bestScDown();
                        } else if (sc < pre_pos) { // scroll ↑
                            bestUi.bestScUp();
                        }
                        pre_pos = sc; 
                    } else {
                        $sortbx.removeClass('fixed');
                    }
                }
                bestScFunc();
    
                $(window).resize(function(){ //page resizing: 가로/세로모드 변경할 경우
                    toplist = [];
                    bestUi.bestSecTopList();
                });
            },
            bestSecTopList:function(){ // create Array: 각 offset().top 값 배열에 담기
                $('.sec_wrap section').each(function () {
                    toplist[toplist.length] = [ $(this).offset().top, $(this).height(), $(this).attr('id')]; 
                })
                bestUi.setActivediv();
            },
            bestSecTopReset:function(){ // 새로고침 혹은 상단 배너를 끌 때 offset().top 재설정
                $('.header_banner .btn_close a').on('click', function(e) {
                    e.preventDefault();
                    $('header').removeClass('bnr');
                    toplist = [];
                    bestUi.bestSecTopList();
                });
            },
            bestScUp:function(){ // scroll ↑
                var sc = $(window).scrollTop(),
                    $slide = $('.best_content .sort_bx .swiper-slide'),
                    aNum = $('.best_content .sort_bx .active').index(),
                    fixedHeight = $('header nav').outerHeight() + $('.best_content .sort_bx').outerHeight() + $('.header_banner').outerHeight();
                if (toplist[0][0] - fixedHeight <= sc) {
                    if (sc < toplist[aNum][0] - fixedHeight) { // 이전 섹션으로 넘어갔을 때
                        $slide.eq(aNum - 1).addClass('active').siblings().removeClass('active');
                        bestUi.bestMoveSwipe();
                    }
                }
            },
            bestScDown:function(){  // scroll ↓
                var sc = $(window).scrollTop(),
                    $slide = $('.best_content .sort_bx .swiper-slide'),
                    aNum = $('.best_content .sort_bx .active').index(),
                    fixedHeight = $('header nav').outerHeight() + $('.best_content .sort_bx').outerHeight() + $('.header_banner').outerHeight();
                if (toplist[0][0] - fixedHeight <= sc) {
                    if (sc > (toplist[aNum][0] + toplist[aNum][1] - fixedHeight)) { // 다음 섹션으로 넘어갔을 때
                        $slide.eq(aNum + 1).addClass('active').siblings().removeClass('active');
                        bestUi.bestMoveSwipe();
                    }
                }
            },
            bestClickSwipe: function () { // 카테고리 클릭시
                $('.best_content .sort_bx .swiper-slide').click(function (e) {
                    e.preventDefault();
                    var $this = $(this),
                        fixedHeight = $('header nav').outerHeight() + $('.best_content .sort_bx').outerHeight() + $('.header_banner').outerHeight();
                    $this.addClass('active').siblings().removeClass('active');
                    if ($this.index() != 0) { fixedHeight = fixedHeight - 10/*10 = bdt height*/; }
                    var secTop = toplist[$this.index()][0] - fixedHeight;
                    $('html, body').scrollTop(secTop);
                    bestUi.bestMoveSwipe();
                });
            },
            bestMoveSwipe:function(){ // 활성화될 swipe li 가 화면 밖에 있을 경우, swipe 위치 이동
                var $active = $('.best_content .sort_bx .active');
                if ($active.offset().left < 6) {
                    sortSwiper.slideTo($active.index(), 300, false);
                } else if ($active.offset().left + $active.width() > $(window).width()) {
                    var sliNum = Math.floor($(window).width() / 78) - 1;
                    sortSwiper.slideTo($active.index() - sliNum, 300, false);
                }
            },
            setActivediv:function (){ // 활성화된 섹션 찾아 swipe에 active 값 추가
                var sc = $(document).scrollTop(),
                    fixedHeight = $('header nav').outerHeight() + $('.best_content .sort_bx').outerHeight() + $('.header_banner').outerHeight();
                if (toplist[0][0] - fixedHeight < sc) {
                    var filtedArray = toplist.filter(function(ele){
                        return sc + fixedHeight - ele[0] >= 0;
                    });
                    var activeSection = filtedArray.pop(),
                        activeLi = $('.best_content .sort_bx a[href=#'+activeSection[2]+']').parent('.swiper-slide');
                    activeLi.addClass('active').siblings().removeClass('active');
                    sortSwiper.slideTo( $(activeLi).index(), 0, false);
                }
            },
            afterTop:function(){ // app의 경우 top버튼을 눌렀을 때 afterTop()이 실행되어야 함.
                $('.sort_bx .swiper-slide:eq(0)').addClass('active').siblings().removeClass('active');
                sortSwiper.slideTo( 0, 0, false);
            },
            zzim:function(){ // 찜 버튼 클릭시
                $('.prd_list .btn_zzim').click(function(){
                    $(this).toggleClass('active');
                });
            },
        }
        bestUi.init();
    });