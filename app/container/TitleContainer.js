import React, { PropTypes } from 'react';
import {connect} from 'redux/react';
import {bindActionCreators} from 'redux';
import Title from './../components/Title';
import HtmlHeaderActions from './../actions/HtmlHeaderActions';

@connect(state => ({
    title: state.HtmlHeaderStore[0].title
}))
export default class TitleContainer {
    static propTypes = {
        title: PropTypes.string
    };

    render() {
        return (<Title title={this.props.title} />);
    }
}