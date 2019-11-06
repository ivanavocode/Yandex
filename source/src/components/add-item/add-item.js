import './add-item.css';
import React, { Component } from 'react';

export default class AddItem extends Component {

    state = {
        value: '',
    }
    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
      }
    
      handleSubmit = (event) => {
        event.preventDefault();
        const { value } = this.state;
        this.setState({ value: '' });
        const cb = this.props.onItemAdded || (() => {});
        cb(value);

      }

    render() {
       const { value } = this.state;
        return (
        <form onSubmit={this.handleSubmit} className="Form-route">
                <input type="text"  value={value} onChange={this.handleChange} />
            {/* <button type="submit">Добавить</button> */}
        </form>

        )
    }
}