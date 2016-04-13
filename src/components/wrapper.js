var Link = require("react-router").Link;
var React = require('react');

var Wrapper = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <h2>Super dnw app!</h2>
				<Link to={"/"}>Home</Link>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Wrapper;