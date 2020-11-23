
(function(){
    var ui = {
        init:function(){
            ui.setList();
        },
        setList:function(){

            // create list
            setlistfunc(code, "code");
            setlistfunc(works, "works");

            function setlistfunc(works, place){
                works.map(
                    function(works){
                        return (
                            works.tsplit = works.title.split("")
                        )
                    }
                );
                for ( var i in works ) {
                    var link = works[i].link !== "" ? works[i].link + '" target="_blank' : "javascript:void(0)",
                        message = (works[i].message == "") ? "" : '<span class="tooltip">'+ works[i].message +'</span>',
                        work = '<li><a href="'+ link +'" class="work_title"><div class="txt_wrap"><div class="txt_basic"></div><div class="txt_show"></div>'+ message +'</div></a></li>';
                    $('.'+place+'').append(work);
                    for ( var j in works[i].tsplit) {
                        var jnum = parseInt(j) ;
                        var words = works[i].tsplit[j] === " " ? ('<span class="space">'+ works[i].tsplit[j] + '</span>') : ('<span class="s'+jnum+' reveal">'+ works[i].tsplit[j] + '</span>');
                        $('.'+place+' li:eq('+i+')').find('.txt_basic').append(words);
                        $('.'+place+' li:eq('+i+')').find('.txt_show').append(words);
                    }
                };
            }

            // tooltip mouse action
            $('.con .txt_wrap').mouseenter(function(){
                if ( !$(this).hasClass('hover') ) {
                    $(this).addClass('hover');
                    var tool = $(this).children('.tooltip');
                    toolfunc(tool);
                } 
            })
            function toolfunc(tool) {
                $(window).mousemove(function(e){
                    var mouse_x = e.pageX - 10,
                        mouse_y = e.pageY + 26 - $(window).scrollTop();
                    tool.css({'left':mouse_x,'top':mouse_y})
                })
            }
            $('.con .txt_wrap').mouseleave(function(){
                if ( $(this).hasClass('hover') ) { 
                    $(this).removeClass('hover');
                }
                
            })
        }
    }

    ui.init();
}())


