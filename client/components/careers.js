import React, { PropTypes, Component } from 'react';
import Lorem from './lorem';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import { Link } from 'react-router';

class Careers extends Component {


     constructor(props) {
        super(props);
        this.handleCareerDetailsClick = this.handleCareerDetailsClick.bind(this);
    }

    handleCareerDetailsClick(event) {
          this.props.transition({
              type: 'content',
              column: 6,
              target: event.target,
          });        
    }

    render() {
        return (
            <article className="page-careers">
                <Header title={'Careers'} />
                <section className="content">
                    <div className="spacer-100" />
                    <div className="row">
                        <div className="large-6 large-offset-3 columns">
                            <h1>Backend developer</h1>
                            <h3>Full time</h3>
                            <Link to="/careers/backend" onClick={this.handleCareerDetailsClick}><i className="ncs-chevron-with-circle-right"></i></Link>

                        </div>
                        <div className="large-6 columns">
                            <h1>Quality Assurance</h1>
                            <h3>Full time</h3>
                            <Link to="/careers/qualityassurance" onClick={this.handleCareerDetailsClick}><i className="ncs-chevron-with-circle-right"></i></Link>
                        </div>
                    </div>
                    <div className="spacer-60" />
                    <div className="row"></div>
                    <div className="spacer-100" />
                </section>
                <Footer />
            </article>
        );
    }
}

Careers.propTypes = {
    strings: PropTypes.object.isRequired,
};

Careers.defaultProps = {
    strings: {
    },
};

export default Careers;