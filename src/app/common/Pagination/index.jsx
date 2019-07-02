import React, { Component } from 'react';

import './styles.scss';

class PaginationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 35,
            activeItem: 1
        }
    }

    componentWillMount() {
        this.setPropsToState(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setPropsToState(nextProps)
    }

    changePagination(index) {
        this.setState({
            ...this.state,
            activeItem: index
        }, () => {
            this.props.onPaginationChange(index);
        })
    }

    setPropsToState(props) {
        this.setState({
            ...this.state,
            count: props.count / 10 + (props.count % 10 === 0 ? 0 : 1)
        })
    }

    render() {

        const paginationItems =  [...Array(parseInt(this.state.count))].map((e, i) => 
            <li
            className={"pagination-item " + (i + 1 === this.state.activeItem ? 'active' : '')}
            key={i}
            onClick={ev => {this.changePagination(i+1)}}
        >{i + 1}</li>)

        return (
            <ul className='pagination-wrapper'>
                {paginationItems}
            </ul>
        )
    }
}

export default PaginationComponent;