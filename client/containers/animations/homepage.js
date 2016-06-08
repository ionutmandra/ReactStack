import dom from 'react-dom';
import _ from 'lodash';

let $ = window.$, $window = $(window), $body = $('body'), TweenMax = window.TweenMax, TimelineLite = window.TimelineLite, Power3 = window.Power3, TweenPlugin = window.TweenPlugin;

////
//    APPEAR - first time load
//////////////////////////////
    
export function appear(ref, callback) {
    let container = dom.findDOMNode(ref), $container = $(container);
    let image = $container.find('.slide-1.background .img')[0];
    image && TweenMax.set(image, { scale: 1.4 });
    TweenMax.set(container, { opacity: 0 });
    new TimelineLite({ onComplete: callback })
        .add(_.filter([
            image && TweenMax.to(image, 1, { scale: 1, ease: Power3.easeOut }),
            TweenMax.to(container, 1, { opacity: 1, ease: Power3.easeOut }),
        ]));
}
    
////
//    ENTER - navigation after first load
/////////////////////////////////////////

export function enter_header(ref, callback, transition) {
    if (!transition.column || !transition.target) {
        return callback();
    }
    
    //Setup
    let container = dom.findDOMNode(ref), $container = $(container).addClass('detach-header');
    console.warn('extractDOMElements', ref, container);
    let elements = {
        container: container,
        image: $container.find('.slide-1.background .img')[0],
        text1: $container.find('.slide-1.content .text-1 h1')[0],
        text2: $container.find('.slide-1.content .text-2 h2')[0],
        textBottom: $container.find('.slide-1.content .scroll-hint p')[0],
        gradient: $container.find('> .gradient')[0],
    };
    let $target = $(transition.target).addClass('hover line');
    let grid = document.getElementById('page-grid'), $grid = $(grid);
    let $baseLine = $grid.find('li:nth-child(' + transition.column + ')'), left = $baseLine.offset().left;
    let line = $grid.find('.navigation-line')[0];
    let width = $window.width();
    let position = left * 100 / width;
    var arr1 = [0, 100 - position, 0, position];
    var arr2 = Object.assign([0, 0, 0, 0], { ease: Power3.easeIn, onUpdate: () => {
        TweenMax.set(elements.container, { webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    }});
    $window.scrollTop(0);
    $body.css('overflow', 'hidden');
    
    //Initial state
    TweenPlugin.activate(['scrollTo', 'CSSPlugin']);
    TweenMax.set(elements.container, { zIndex: 2, opacity: 1, webkitClipPath: 'inset(' + arr1[0] + '% ' + arr1[1] + '% ' + arr1[2] + '% ' + arr1[3] + '%)' });
    TweenMax.set(line, { left: left, opacity: 1, height: 0 });
    elements.text1 && TweenMax.set(elements.text1, { x: '100%' });
    elements.text2 && TweenMax.set(elements.text2, { x: '-100%' });
    elements.textBottom && TweenMax.set(elements.textBottom, { y: '200%' });
    elements.image && TweenMax.set(elements.image, { scale: 1.4 });
    
    //Animation
    new TimelineLite({
        onComplete: () => { callback(); $body.css('overflow', 'visible'); $container.removeClass('detach-header'); }})
        .set({}, {}, .6) //wait for leaving page to hide content
        .add(_.filter([
            TweenMax.to(line, .6, { height: '100%', ease: Power3.easeIn, onComplete: () => { $target.removeClass('line'); TweenMax.set(line, { opacity: 0 }); }}),
        ]))
        .add(_.filter([
            TweenMax.to(arr1, .6, arr2),
            elements.text1 && TweenMax.to(elements.text1, .6, { x: '0%', ease: Power3.easeOut, delay: .5 }),
            elements.text2 && TweenMax.to(elements.text2, .6, { x: '0%', ease: Power3.easeOut, delay: .5 }),
            elements.textBottom && TweenMax.to(elements.textBottom, .6, { y: '0%', ease: Power3.easeOut, delay: .5 }),
        ]));
}

////
//    LEAVE - page unload
/////////////////////////
export function leave_header(ref, callback, transition) {
    let container = dom.findDOMNode(ref), $container = $(container).addClass('detach-header'), height = $window.height(), fullHeight = height * 4, scroll = $window.scrollTop();
    let slide = '.slide-' + Math.round((fullHeight - scroll) / fullHeight);
    let elements = {
        image: $container.find(slide + '.background .img')[0],
        text1: $container.find(slide + '.content .text-1 h1')[0],
        text2: $container.find(slide + '.content .text-2 h2')[0],
        textBottom: $container.find(slide + '.content .scroll-hint p')[0],
        gradient: $container.find('> .gradient')[0],
    };
    console.warn('extractDOMElements', ref, container, height, fullHeight, scroll, slide, elements);
    
    //Setup
    
    //Initial state
    TweenMax.set(container, { zIndex: 1 });
    
    //Animation
    new TimelineLite({ onComplete: () => { callback(); $container.removeClass('detach-header'); }})
        .add(_.filter([
            elements.image && TweenMax.to(elements.image, 1.65, { scale: 1.4, ease: Power3.easeIn, delay: .15 }),
            elements.text1 && TweenMax.to(elements.text1, .3, { x: '100%' }),
            elements.text2 && TweenMax.to(elements.text2, .3, { x: '-100%' }),
            elements.textBottom && TweenMax.to(elements.textBottom, .3, { y: '200%' }),
        ]));
}    

////
//    PRIVATE UTILITY FUNCTIONS
///////////////////////////////

function extractDOMElements(ref) {
    let container = dom.findDOMNode(ref), $container = $(container);
    console.warn('extract', ref, container);
    return {
        container: container,
        image: $container.find('.slide-1.background .img')[0],
        text1: $container.find('.slide-1.content .text-1 h1')[0],
        text2: $container.find('.slide-1.content .text-2 h2')[0],
        textBottom: $container.find('.slide-1.content .scroll-hint p')[0],
        gradient: $container.find('> .gradient')[0],
    };
}