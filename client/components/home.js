import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import {Link} from 'react-router';

let $ = window.$, ScrollMagic = window.ScrollMagic, TweenMax = window.TweenMax, Circ = window.Circ, Linear = window.Linear, TimelineMax = window.TimelineMax, TweenPlugin = window.TweenPlugin;

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    handleLinkClick(event) {

        for (var i = 0; i < this.scenes.length; i++) {
            this.scenes[i].reverse(false);
        }

        var section = event.target.getAttribute('data-section');
        var animations;

        switch (section) {
            case '2':
                animations = {
                    leftHide: [this._inputGrow, this._inputValuesRight],
                    rightHide: [this._inputValuesLeft],
                };
                break;
            case '3':
                animations = {
                    leftHide: [this._inputCreating],
                    rightHide: [this._inputOffering],
                };
                break;
            case '4':
                animations = {
                    leftHide: [this._inputSustaining],
                    rightHide: [],
                };
                break;
        }

        this.props.dispatchTransition({
            type: 'home_content',
            column: event.target.getAttribute('data-animate-line'),
            target: event.target,
            animations: animations,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.setScenes(nextProps.transition.scrollScenesEnabled);
        return false;
    }

    setScenes(enabled) {
        this.scenes && this.scenes.forEach(scene => { scene && scene.enabled(enabled); });
    }

    componentWillUnmount() {

        for (let i = 0; i < this.scenes.length; i++) {
            if (this.scenes[i]) {
                this.scenes[i].destroy();
                this.scenes[i] = null;
            }
        }

        for (let i = 0; i < this.timeLines.length; i++) {
            this.timeLines[i] = null;
        }

        this.controller.destroy();
        this.controller = null;
    }

    componentDidMount() {

        var gradients = ['#d6cb26', '#68bc45', '#1895a3', '#4f2063', '#c80786', '#ed2f2e'];
        var _this = this;
        var controller = new ScrollMagic.Controller();
        this.controller = controller;
        var timeLines = this.timeLines = [];
        var scenes = this.scenes = [];

        TweenPlugin.activate(['colorProps']);

        function hideLeft(elems) {
            for (var i = 0; i < elems.length; i++) {
                timeLines.push(TweenMax.set(elems[i], { x: '-100%', ease: Linear.easeNone }));
            }
        }
        function hideRight(elems) {
            for (var i = 0; i < elems.length; i++) {
                timeLines.push(TweenMax.set(elems[i], { x: '+100%', ease: Linear.easeNone }));
            }
        }
        function updateGradientBackground(gr) {
            timeLines.push(TweenMax.set('article.page-home > .gradient', { background: 'linear-gradient(45deg, ' + gr.color0 + ' 0%, ' + gr.color1 + ' 100%)' }));
        }
        function animateGradientColors(fromGrad, toGrad) {
            var anim = TweenMax.to(fromGrad, 1, { colorProps: toGrad, ease: Linear.easeNone, onUpdate: updateGradientBackground, onUpdateParams: [fromGrad] });
            timeLines.push(anim);
            return anim;
        }
        function pinSections(sections) {
            for (var i = 0; i < sections.length; i++) {
                scenes.push(new ScrollMagic.Scene({ triggerElement: sections[i], triggerHook: 'onLeave' }).setPin(sections[i]).addTo(controller));
            }
        }
        function moveLeft(elem) {
            // var t = TweenMax.to(elem, 0.6, { x: '-100%', ease: Power4.easeIn });
            var t = TweenMax.to(elem, 0.6, { x: '-100%' });
            timeLines.push(t);
            return t;
        }
        function moveRight(elem) {
            //var t = TweenMax.to(elem, 0.6, { x: '+100%', ease: Power4.easeIn });
            var t = TweenMax.to(elem, 0.6, { x: '+100%' });
            timeLines.push(t);
            return t;
        }
        function moveToInitial(elem) {
            var t = TweenMax.to(elem, 0.8, { x: '0%' });
            timeLines.push(t);
            return t;
        }
        function hideImg(elem) {
            var t = TweenMax.to(elem, 0.8, { opacity: 0 });
            timeLines.push(t);
            return t;
        }
        function hideImgInstant(elem) {

            console.log('hide img instasnt for ', elem);

            var t = TweenMax.set(elem, { opacity: 0 });
            timeLines.push(t);
            return t;
        }
        function showImg(elem) {
            var t = TweenMax.to(elem, 0.8, { opacity: 1 });
            timeLines.push(t);
            return t;
        }
        function hideSlide(elem) {
            var t = TweenMax.to(elem, 0.1, { display: 'none' });
            timeLines.push(t);
            return t;
        }
        function showSlide(elem) {
            var t = TweenMax.to(elem, 0.1, { display: 'block' });
            timeLines.push(t);
            return t;
        }


        hideSlide(this._section2c);
        hideSlide(this._section3c);
        hideSlide(this._section4c);


        hideImgInstant(_this._img2);
        hideImgInstant(_this._img3);
        hideImgInstant(_this._img4);

        hideLeft([this._inputGrow, this._inputValuesRight, this._inputCreating, this._inputSustaining]);
        hideRight([this._inputValuesLeft, this._inputOffering]);

        pinSections([this._section1, this._section2, this._section3, this._section4]);
        pinSections([this._section1b, this._section2b, this._section3b, this._section4b]);
        pinSections([this._section1c, this._section2c, this._section3c, this._section4c]);

        //gradient animations
        var slide1GrTr = animateGradientColors({ color0: gradients[0], color1: gradients[1] }, { color0: gradients[1], color1: gradients[2] });
        var slide2GrTr = animateGradientColors({ color0: gradients[1], color1: gradients[2] }, { color0: gradients[2], color1: gradients[3] });
        var slide3GrTr = animateGradientColors({ color0: gradients[2], color1: gradients[3] }, { color0: gradients[3], color1: gradients[4] });

        //scenes
        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide1GrTr));
        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide2GrTr));
        scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', duration: '100%' }).addTo(controller).setTween(slide3GrTr));


        var animationType = getParameterByName('an', this.props.location.search);
        switch (animationType) {
            case '2':
                console.log(2);
                animation2.bind(this)();
                break;
            case '3':
                console.log(3);
                animation3.bind(this)();
                break;
            case '4':
                console.log(4);
                animation4.bind(this)();
                break;
            case '5':
                    console.log(5);
                    animation5.bind(this)();
                    break;
            default:
                console.log(1);
                animation1.bind(this)();
                break;
        }

        function animation1() {
            // change behaviour of controller to animate scroll instead of jump
            controller.scrollTo(function (newpos) {
                var t = TweenMax.to(window, 0.5, { scrollTo: { y: newpos } });
                timeLines.push(t);
                return t;
            });

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', offset: 10 })
                //.addIndicators({name:'0'})
                .addTo(controller)
                .setTween(
                new TimelineMax()
                    .add(TweenMax.to(this._scrollHint, 0.3, { transformOrigin: '50% 50%', y: '+10', ease: Circ.easeOut }))
                    .add(TweenMax.to(this._scrollHint, 0.3, { transformOrigin: '50% 50%', y: '0', ease: Circ.easeIn }))
                ));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '80%', offset: 150 })
                .addTo(controller)
                //.addIndicators({name:'1'})
                .on('end', function (event) {
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(this);
                    }
                })
                .setTween(
                new TimelineMax()
                    .add([moveLeft(this._inputCreate), moveRight(this._inputSoftware), hideImg(this._img1)])
                    .add(hideSlide(this._section1c))
                    .add(showSlide(this._section2c))
                    .add([
                        moveToInitial(_this._inputGrow),
                        moveToInitial(_this._inputValuesLeft),
                        moveToInitial(_this._inputValuesRight),
                        showImg(this._img2)])

                ));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '5%', offset: 130 })
                .addTo(controller)
                //.addIndicators({name:'2'})
                .on('end', function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section2);
                    }
                }));

            //section2
            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 150, duration: '80%' })
                .addTo(controller)
                //.addIndicators({name:'2oe'})
                .setTween(new TimelineMax()
                    .add([
                        moveLeft(_this._inputGrow),
                        moveRight(_this._inputValuesLeft),
                        moveLeft(_this._inputValuesRight),
                    ])
                    .add(hideSlide(this._section2c))
                    .add(showSlide(this._section3c))
                    .set({}, {}, .4)
                    .add([
                        moveToInitial(_this._inputCreating),
                        moveToInitial(_this._inputOffering),
                    ])
                    .add(hideImg(this._img2))
                    .add(showImg(this._img3))
                )
                .on('end', function (event) {
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(this);
                    }
                }));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', duration: '6%', offset: 130 }).addTo(controller)
                .on('end', function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section3);
                    }
                }));

            //section3
            var section3 = new TimelineMax()
                .add([
                    moveLeft(_this._inputCreating),
                    moveRight(_this._inputOffering),
                ])
                .add(hideSlide(this._section3c))
                .add(showSlide(this._section4c))
                .set({}, {}, .4)
                .add([
                    moveToInitial(_this._inputSustaining),
                ])
                .add(hideImg(this._img3))
                .add(showImg(this._img4));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 150, duration: '80%' })
                .addTo(controller)
                //.addIndicators({name:'3oe'})
                .setTween(section3)
                .on('end', function (event) {
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(this);
                    }
                }));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', duration: '5%', offset: 150 }).addTo(controller)
                .on('end', function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section4);
                    }
                }));
        }

        function animation2() {
            // change behaviour of controller to animate scroll instead of jump
            controller.scrollTo(function (newpos) {
                var t = TweenMax.to(window, 0.5, { scrollTo: { y: newpos } })
                timeLines.push(t);
                return t;
            });

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', offset: 10 })
                //.addIndicators({name:'0'})
                .addTo(controller)
                .setTween(
                new TimelineMax()
                    .add(TweenMax.to(this._scrollHint, 0.3, { transformOrigin: "50% 50%", y: '+10', ease: Circ.easeOut }))
                    .add(TweenMax.to(this._scrollHint, 0.3, { transformOrigin: "50% 50%", y: '0', ease: Circ.easeIn }))
                ));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '80%', offset: 150 })
                .addTo(controller)
                //.addIndicators({name:'1'})
                .on("end", function (event) {
                    if (event.scrollDirection == 'REVERSE') {
                        //controller.scrollTo(this);
                    }
                })
                .setTween(
                new TimelineMax()
                    .add([moveLeft(this._inputCreate), moveRight(this._inputSoftware), hideImg(this._img1)])
                    .add(hideSlide(this._section1c))
                    .add(showSlide(this._section2c))
                    .add([
                        moveToInitial(_this._inputGrow),
                        moveToInitial(_this._inputValuesLeft),
                        moveToInitial(_this._inputValuesRight),
                        showImg(this._img2)])

                ));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '5%', offset: 130 })
                .addTo(controller)
                //.addIndicators({name:'2'})
                .on("end", function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                        //controller.scrollTo(_this._section2);
                    }
                }));

            //section2
            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 150, duration: '80%' })
                .addTo(controller)
                //.addIndicators({name:'2oe'})
                .setTween(new TimelineMax()
                    .add([
                        moveLeft(_this._inputGrow),
                        moveRight(_this._inputValuesLeft),
                        moveLeft(_this._inputValuesRight)
                    ])
                    .add(hideSlide(this._section2c))
                    .add(showSlide(this._section3c))
                    .set({}, {}, .4)
                    .add([
                        moveToInitial(_this._inputCreating),
                        moveToInitial(_this._inputOffering),
                    ])
                    .add(hideImg(this._img2))
                    .add(showImg(this._img3))
                )
                .on("end", function (event) {
                    if (event.scrollDirection == 'REVERSE') {
                       // controller.scrollTo(this);
                    }
                }));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', duration: '6%', offset: 130 }).addTo(controller)
                .on("end", function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                        //controller.scrollTo(_this._section3);
                    }
                }));

            //section3
            var section3 = new TimelineMax()
                .add([
                    moveLeft(_this._inputCreating),
                    moveRight(_this._inputOffering),
                ])
                .add(hideSlide(this._section3c))
                .add(showSlide(this._section4c))
                .set({}, {}, .4)
                .add([
                    moveToInitial(_this._inputSustaining),
                ])
                .add(hideImg(this._img3))
                .add(showImg(this._img4));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 150, duration: "80%" })
                .addTo(controller)
                //.addIndicators({name:'3oe'})
                .setTween(section3)
                .on("end", function (event) {
                    if (event.scrollDirection == 'REVERSE') {
                       // controller.scrollTo(this);
                    }
                }));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', duration: '5%', offset: 150 }).addTo(controller)
                .on("end", function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                        //controller.scrollTo(_this._section4);
                    }
                }));
        }

        function animation3() {
            // change behaviour of controller to animate scroll instead of jump
            controller.scrollTo(function (newpos) {
                var t = TweenMax.to(window, 0.5, { scrollTo: { y: newpos } })
                timeLines.push(t);
                return t;
            });

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', offset: 10 })
                //.addIndicators({name:'0'})
                .addTo(controller)
                .setTween(
                new TimelineMax()
                    .add(TweenMax.to(this._scrollHint, 0.3, { transformOrigin: "50% 50%", y: '+10', ease: Circ.easeOut }))
                    .add(TweenMax.to(this._scrollHint, 0.3, { transformOrigin: "50% 50%", y: '0', ease: Circ.easeIn }))
                ));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '95%', offset: 150 })
                .addTo(controller)
                //.addIndicators({name:'1'})
                .on("end", function (event) {
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(this);
                    }
                })
                .setTween(
                new TimelineMax()
                    .add([moveLeft(this._inputCreate), moveRight(this._inputSoftware), hideImg(this._img1)])
                    .add(hideSlide(this._section1c))
                    .add(showSlide(this._section2c))
                    .add([
                        moveToInitial(_this._inputGrow),
                        moveToInitial(_this._inputValuesLeft),
                        moveToInitial(_this._inputValuesRight),
                        showImg(this._img2)])

                ));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '20%', offset: 130 })
                .addTo(controller)
                //.addIndicators({name:'2'})
                .on("end", function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section2);
                    }
                }));

            //section2
            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 120, duration: '95%' })
                .addTo(controller)
                //.addIndicators({name:'2oe'})
                .setTween(new TimelineMax()
                    .add([
                        moveLeft(_this._inputGrow),
                        moveRight(_this._inputValuesLeft),
                        moveLeft(_this._inputValuesRight)
                    ])
                    .add(hideSlide(this._section2c))
                    .add(showSlide(this._section3c))
                    .set({}, {}, .4)
                    .add([
                        moveToInitial(_this._inputCreating),
                        moveToInitial(_this._inputOffering),
                    ])
                    .add(hideImg(this._img2))
                    .add(showImg(this._img3))
                )
                .on("end", function (event) {
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(this);
                    }
                }));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', duration: '20%', offset: 130 }).addTo(controller)
                .on("end", function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section3);
                    }
                }));

            //section3
            var section3 = new TimelineMax()
                .add([
                    moveLeft(_this._inputCreating),
                    moveRight(_this._inputOffering),
                ])
                .add(hideSlide(this._section3c))
                .add(showSlide(this._section4c))
                .set({}, {}, .4)
                .add([
                    moveToInitial(_this._inputSustaining),
                ])
                .add(hideImg(this._img3))
                .add(showImg(this._img4));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 150, duration: "80%" })
                .addTo(controller)
                //.addIndicators({name:'3oe'})
                .setTween(section3)
                .on("end", function (event) {
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(this);
                    }
                }));

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', duration: '25%', offset: 150 }).addTo(controller)
                .on("end", function (event) {
                    if (event.scrollDirection == 'FORWARD') {
                       controller.scrollTo(_this._section4);
                    }
                }));
        }

        function animation4() {
            // change behaviour of controller to animate scroll instead of jump
            controller.scrollTo(function (newpos) {
                var t = TweenMax.to(window, 0.5, { scrollTo: { y: newpos } });
                timeLines.push(t);
                return t;
            });

            let scene1 = new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: 100, offset: -100 })
                // .addIndicators({name:'0'})
                .addTo(controller)
                .setTween(
                    TweenMax.fromTo(this._scrollHint, .75, { y: '0' }, { y: '+6', ease: Circ.easeInOut, repeat: -1, yoyo: true })
                );
            scenes.push(scene1);

            let t0 = new Date().getTime(), flag = true;
            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '98%', offset: 0 })
                .addTo(controller)
                // .addIndicators({name:'1'})
                .on('start', (event) => {
                    if (flag) {
                        let t1 = new Date().getTime();
                        if (t1 - t0 < 100) {
                            // console.warn('blocked scroll 1', t1-t0);
                            return false;
                        } else {
                            // console.warn('released scroll 1');
                            flag = false;
                        }
                    }
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section2);
                        if (scene1) {
                            scene1.destroy();
                            scene1 = null;
                        }
                    }
                })
                .on('end', (event) => {
                    hideImgInstant(_this._scrollHintContainer);
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(0);
                    }
                })
                .setTween(new TimelineMax()
                    .add([
                        moveLeft(this._inputCreate),
                        moveRight(this._inputSoftware),
                        hideImg(this._img1),
                    ])
                    .add(hideSlide(this._section1c))
                    .add(showSlide(this._section2c))
                    .add([
                        moveToInitial(this._inputGrow),
                        moveToInitial(this._inputValuesLeft),
                        moveToInitial(this._inputValuesRight),
                        showImg(this._img2),
                    ])
                ));

            //section2
            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 10, duration: '94%' })
                .addTo(controller)
                // .addIndicators({name:'2'})
                .setTween(new TimelineMax()
                    .add([
                        moveLeft(this._inputGrow),
                        moveRight(this._inputValuesLeft),
                        moveLeft(this._inputValuesRight),
                        hideImg(this._img2),
                    ])
                    .add(hideSlide(this._section2c))
                    .add(showSlide(this._section3c))
                    .add([
                        moveToInitial(this._inputCreating),
                        moveToInitial(this._inputOffering),
                        showImg(this._img3),
                    ])
                )
                .on('start', (event) => {
                    if (flag) {
                        let t1 = new Date().getTime();
                        if (t1 - t0 < 100) {
                            // console.warn('blocked scroll 2', t1-t0);
                            return false;
                        } else {
                            // console.warn('released scroll 2');
                            flag = false;
                        }
                    }
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section3);
                    }
                })
                .on('end', (event) => {
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(_this._section2);
                    }
                }));

            //section3
            var section3 = new TimelineMax()
                .add([
                    moveLeft(this._inputCreating),
                    moveRight(this._inputOffering),
                    hideImg(this._img3),
                ])
                .add(hideSlide(this._section3c))
                .add(showSlide(this._section4c))
                .add([
                    moveToInitial(this._inputSustaining),
                    showImg(this._img4),
                ]);

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 10, duration: '97%' })
                .addTo(controller)
                //.addIndicators({name:'3oe'})
                .setTween(section3)
                .on('start', (event) => {
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section4);
                    }
                })
                .on('end', (event) => {
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(_this._section3);
                    }
                }));
        }

        function animation5() {

return;

            // change behaviour of controller to animate scroll instead of jump
            controller.scrollTo(function (newpos) {
                var t = TweenMax.to(window, 0.5, { scrollTo: { y: newpos } });
                timeLines.push(t);
                return t;
            });

            let scene1 = new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: 100, offset: -100 })
                // .addIndicators({name:'0'})
                .addTo(controller)
                .setTween(
                    TweenMax.fromTo(this._scrollHint, .75, { y: '0' }, { y: '+6', ease: Circ.easeInOut, repeat: -1, yoyo: true })
                );
            scenes.push(scene1);

            let t0 = new Date().getTime(), flag = true;
            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', duration: '98%', offset: 0 })
                .addTo(controller)
                // .addIndicators({name:'1'})
                .on('start', (event) => {
                    if (flag) {
                        let t1 = new Date().getTime();
                        if (t1 - t0 < 100) {
                            // console.warn('blocked scroll 1', t1-t0);
                            return false;
                        } else {
                            // console.warn('released scroll 1');
                            flag = false;
                        }
                    }
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section2);
                        if (scene1) {
                            scene1.destroy();
                            scene1 = null;
                        }
                    }
                })
                .on('end', (event) => {
                    hideImgInstant(_this._scrollHintContainer);
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(0);
                    }
                })
                .setTween(new TimelineMax()
                    .add([
                        moveLeft(this._inputCreate),
                        moveRight(this._inputSoftware),
                        hideImg(this._img1),
                    ])
                    .add(hideSlide(this._section1c))
                    .add(showSlide(this._section2c))
                    .add([
                        moveToInitial(this._inputGrow),
                        moveToInitial(this._inputValuesLeft),
                        moveToInitial(this._inputValuesRight),
                        showImg(this._img2),
                    ])
                ));

            //section2
            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 10, duration: '94%' })
                .addTo(controller)
                // .addIndicators({name:'2'})
                .setTween(new TimelineMax()
                    .add([
                        moveLeft(this._inputGrow),
                        moveRight(this._inputValuesLeft),
                        moveLeft(this._inputValuesRight),
                        hideImg(this._img2),
                    ])
                    .add(hideSlide(this._section2c))
                    .add(showSlide(this._section3c))
                    .add([
                        moveToInitial(this._inputCreating),
                        moveToInitial(this._inputOffering),
                        showImg(this._img3),
                    ])
                )
                .on('start', (event) => {
                    if (flag) {
                        let t1 = new Date().getTime();
                        if (t1 - t0 < 100) {
                            // console.warn('blocked scroll 2', t1-t0);
                            return false;
                        } else {
                            // console.warn('released scroll 2');
                            flag = false;
                        }
                    }
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section3);
                    }
                })
                .on('end', (event) => {
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(_this._section2);
                    }
                }));

            //section3
            var section3 = new TimelineMax()
                .add([
                    moveLeft(this._inputCreating),
                    moveRight(this._inputOffering),
                    hideImg(this._img3),
                ])
                .add(hideSlide(this._section3c))
                .add(showSlide(this._section4c))
                .add([
                    moveToInitial(this._inputSustaining),
                    showImg(this._img4),
                ]);

            scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 10, duration: '97%' })
                .addTo(controller)
                //.addIndicators({name:'3oe'})
                .setTween(section3)
                .on('start', (event) => {
                    if (event.scrollDirection == 'FORWARD') {
                        controller.scrollTo(_this._section4);
                    }
                })
                .on('end', (event) => {
                    if (event.scrollDirection == 'REVERSE') {
                        controller.scrollTo(_this._section3);
                    }
                }));
        }

    }



    render() {
        //const s = this.props.strings;
        return (
            <article className="page page-home">
                <Header stationary />

                <section className="slide slide-1 background" ref={(c) => this._section1b = c}>
                    <div ref={(c) => this._img1 = c} className="image"><div className="img" /></div>
                </section>
                <section className="slide slide-2 background" ref={(c) => this._section2b = c}>
                    <div ref={(c) => this._img2 = c} className="image"><div className="img" /></div>
                </section>
                <section className="slide slide-3 background" ref={(c) => this._section3b = c}>
                    <div ref={(c) => this._img3 = c} className="image"><div className="img" /></div>
                </section>
                <section className="slide slide-4 background" ref={(c) => this._section4b = c}>
                    <div ref={(c) => this._img4 = c} className="image"><div className="img" /></div>
                </section>

                <div className="gradient" />

                <section className="slide slide-1 content"  ref={(c) => this._section1c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputSoftware = c}>{'Software Innovators Happily Together'}</h1></div>
                    <div className="text-2">
                        <h2 ref={(c) => this._inputCreate = c}>
                            Create a truly remarkable working environment
                            and deliver high quality, innovative software
                            products and services
                        </h2>
                    </div>

                    <div className="scroll-hint" ref={(c) => this._scrollHintContainer = c}>
                        <span ref={(c) => this._scrollHint = c}>
                            <i className="ncs-chevron-thin-down"></i>
                        </span>
                        <p>{'Find out more'}</p>
                    </div>
                </section>

                <section className="slide slide-2 content"  ref={(c) => this._section2c = c}>
                    <div className="text-1">
                        <h1 ref={(c) => this._inputGrow = c}>
                            Grow an outstanding
                            working environment driven
                            by <Link to="/about" data-animate-line="3" data-section="2" onClick={this.handleLinkClick}>our culture</Link>
                        </h1>
                    </div>
                    <div className="text-2">
                        <div className="text-content" ref={(c) => this._inputValuesLeft = c}>
                            <h2>HAPPINESS</h2>
                            <h2>TRUST</h2>
                            <h2>PROFESSIONALISM</h2>
                            <h2>ADAPTABILITY</h2>
                        </div>
                    </div>
                    <div className="text-3">
                        <div className="text-content" ref={(c) => this._inputValuesRight = c}>
                            <h2>PASSION</h2>
                            <h2>PURPOSE</h2>
                            <h2>COMMUNICATION</h2>
                            <h2>INNOVATION</h2>
                        </div>
                    </div>
                </section>

                <section className="slide slide-3 content" ref={(c) => this._section3c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputOffering = c}>Offering highest quality by constantly improving our <Link to="/about" data-animate-line="3" data-section="3" onClick={this.handleLinkClick}>skills and processes</Link></h1></div>
                    <div className="text-2"><h1 ref={(c) => this._inputCreating = c}>Creating <Link to="/portfolio/sfb" data-animate-line="5" data-section="3" onClick={this.handleLinkClick}>high impact software solutions</Link> that help business succeed
                    </h1></div>
                </section>

                <section className="slide slide-4 content"  ref={(c) => this._section4c = c}>
                    <div className="text-1"><h1 ref={(c) => this._inputSustaining = c} >Sustaining <Link to="/about" data-animate-line="3" data-section="4" onClick={this.handleLinkClick}>learning and innovation</Link> as a part day to day activity.</h1></div>
                </section>

                <section className="slide slide-1v" ref={(c) => this._section1 = c}></section>
                <section className="slide slide-2v" ref={(c) => this._section2 = c}></section>
                <section className="slide slide-3v" ref={(c) => this._section3 = c}></section>
                <section className="slide slide-4v" ref={(c) => this._section4 = c}></section>
            </article>
        );
    }
}

Home.propTypes = {
    strings: PropTypes.object.isRequired,
};

Home.defaultProps = {
    strings: {
        welcome: 'WELCOME MESSAGE',
    },
};

export default Home;


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function tests() {
    // //section1
    // var section1 = new TimelineMax();
    // section1.add([
    //     moveRight(_this._inputSoftware),
    //     moveLeft(_this._inputCreate)]);
    // section1.set({}, {}, .4);
    // section1.add([
    //     moveToInitial(_this._inputGrow),
    //     moveToInitial(_this._inputValuesLeft),
    //     moveToInitial(_this._inputValuesRight),]);

    // scenes.push(new ScrollMagic.Scene({ triggerElement: this._section1, triggerHook: 'onLeave', offset: 250 })
    //     .addTo(controller)
    //     //.on("progress", function (event) { if (event.scrollDirection == 'FORWARD') { controller.scrollTo(_this._section2); } })
    //     .setTween(section1));

    // //section2
    // var section2 = new TimelineMax();
    // section2.add([
    //     moveLeft(_this._inputGrow),
    //     moveRight(_this._inputValuesLeft),
    //     moveLeft(_this._inputValuesRight)
    // ]);
    // section2.set({}, {}, .4);
    // section2.add([
    //     moveToInitial(_this._inputCreating),
    //     moveToInitial(_this._inputOffering),
    // ]);

    // scenes.push(new ScrollMagic.Scene({ triggerElement: this._section2, triggerHook: 'onLeave', offset: 150, })
    //     .addTo(controller)
    //     //.on("progress", function (event) { if (event.scrollDirection == 'FORWARD') { controller.scrollTo(_this._section3); } })
    //     .setTween(section2));

    // //section3
    // var section3 = new TimelineMax();
    // section3.add([
    //     moveLeft(_this._inputCreating),
    //     moveRight(_this._inputOffering),
    // ]);
    // section3.set({}, {}, .4);
    // section3.add([
    //     moveToInitial(_this._inputSustaining),
    // ]);

    // scenes.push(new ScrollMagic.Scene({ triggerElement: this._section3, triggerHook: 'onLeave', offset: 150, })
    //     .addTo(controller)
    //     //.on("progress", function (event) { if (event.scrollDirection == 'FORWARD') { controller.scrollTo(_this._section4); } })
    //     .setTween(section3));
}
