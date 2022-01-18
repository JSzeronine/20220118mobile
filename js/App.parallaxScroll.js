/*

1. transition이 필요한 tag에 class 추가
- .js-move-obj

2. data type 설정
preset type (transition preset)
- data-trans-props="preset-opacity" (opacity 0 -> 1)
- data-trans-props="preset-y" (opacity 0 -> 1, translateY 100 -> 0)

custom type
- data-trans-props="opacity,scale,x,y" (필요한 props 입력)
- data-trans-value="0, 0.5, 0, 100" (props 입력 순서와 같도록 from 값 입력)

* inline-style을 사용한 tag에 사용 불가


99.etc
js-move-obj class 가지고 있으면 js-init-stage 붙여줌 - 화면에 등장시에 on-stage 붙여줌
클래스로 transition 구현 시 트랜지션 시작값(.js-init-stage) 트랜지션 끝값(.on-stage) 입력

*/

( function(){
    var parallaxScroll = ( function(){

        // 사용불가한 브라우저나 환경 처리
        var isTrans = true;

        var viewPt = 0.3;
        var option = {threshold: [0, viewPt, 1]};
        var observer = new IntersectionObserver(function(entries, observer) {

            Array.prototype.slice.call(entries).forEach(function(entry){

                if (entry.intersectionRatio >= 0.9) {
                    entry.target.classList.add('on-stage');
                    entry.target.removeAttribute("style")
                    observer.unobserve(entry.target);

                } else if (entry.intersectionRatio > viewPt) {
                    entry.target.classList.add('on-stage');
                    entry.target.removeAttribute("style")
                } else {

                }
            })
        }, option );


        function Init(){
            if(!isTrans) return;

            var boxElList = document.querySelectorAll('.js-move-obj');

            Array.prototype.slice.call(boxElList).forEach(function(el) {
                el.classList.add('js-init-stage');
                observer.observe(el);

                //check type
                var props = String(el.dataset.transProps);
                var value = String(el.dataset.transValue);
                if(props.indexOf("preset-") != -1){
                    //preset type
                    if(props.indexOf("opacity") != -1){
                        el.style.opacity = 0;
                    } else if(props.indexOf("y") != -1){
                        el.style.opacity = 0;
                        el.style.transform = "translate3d(0,40px,0)";
                    }



                } else {
                    //custom type
                    var propsArr = props.split(",");
                    var valueArr = value.split(",");
                    var transformStr = "";

                    for(var i=0 ; i<propsArr.length ; i++){
                        if(propsArr[i] == "opacity"){
                            el.style.opacity = valueArr[i];
                        }
                        if(propsArr[i] == "scale"){
                            transformStr += " scale("+valueArr[i]+")";
                        }
                        if(propsArr[i] == "x"){
                            transformStr += " translateX("+valueArr[i]+"px)";
                        }
                        if(propsArr[i] == "y"){
                            transformStr += " translateY("+valueArr[i]+"px)";
                        }
                        el.style.transform = transformStr;
                    }
                }
            })
        }

        return{
            Init : Init
        }

    })();

    $( document ).ready( function(){
        App.parallaxScroll = parallaxScroll;
        App.parallaxScroll.Init();
    });

})();