var App = {};

var Common = ( function(){
    var _w;
    function Init(){
        _w = $( window );

        createFooter();
    }

    function createFooter(){
        $( ".footer-btn-up" ).on( "click", function(){
            TweenMax.to( $( "html, body" ), 0.75, { scrollTop: 0, ease:Expo.easeOut });
        })
    }

    return{
        Init : Init
    }


})();

$( document ).ready( function(){
    App.Common = Common;
    App.Common.Init();
});


