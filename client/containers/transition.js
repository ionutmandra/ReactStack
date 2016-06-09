import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import routePaths from '../../common/routePaths';
import * as animations_generic from './animations/generic';
import * as animations_homepage from './animations/homepage';
let $body = window.$('body');

let animations = { 
    generic: animations_generic, 
    homepage: animations_homepage, 
 };

const stateToProps = state => ({
    transition: state.transition,
});

export default (BaseComponent) => {
    BaseComponent.propTypes = {
        transition: PropTypes.object.isRequired,
    };

    BaseComponent = connect(stateToProps)(BaseComponent); 

    class TransitionComponent extends BaseComponent {
        componentWillAppear(callback) {
            $body.addClass('navigating');
            let animation = 'generic';
            this.props.route.path == routePaths.client.root && (animation = 'homepage');
            this.animation = animations[animation];
            
            this.animation.appear(this.refs.container, this.callback.bind(this, callback));
        }
        componentWillEnter(callback) {
            let transition = this._clone.props.transition;
            if (!transition || !transition.type) {
                return callback();
            }
            $body.addClass('navigating');
            let animation = 'generic';
            this.props.route.path == routePaths.client.root && (animation = 'homepage');
            this.animation = animations[animation];
            
            this.animation['enter_' + transition.type](this.refs.container, this.callback.bind(this, callback), transition);
        }
        componentWillLeave(callback) {
            let transition = this._clone.props.transition;
            if (!transition || !transition.type || !this.animation) {
                return callback();
            }
            $body.addClass('navigating');
            this.animation['leave_' + transition.type](this.refs.container, this.callback.bind(this, callback), transition);
        }
        callback(callback) {
            $body.removeClass('navigating');
            callback();
        }
        render() {
            return (this._clone = React.cloneElement(super.render(), { ref: 'container' }));
        }       
    }

    return TransitionComponent;
};