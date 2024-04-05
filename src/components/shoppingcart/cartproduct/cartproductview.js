import React, { Component } from 'react';
import './cartproductstyle.css';

export default class CartProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1 ,// Assume the initial quantity is 1, adjust as needed
			increaseButtonEnabled: true
        };
    }

	incrementQuantity = () => {
        const { quantity } = this.state;
        if (quantity < 10) {
            const newQuantity = quantity + 1;
            this.setState({ quantity: newQuantity });
			this.setState({increaseButtonEnabled: true})
            this.props.setProductQuantityToCart(this.props.product.id, newQuantity);
        } else {
			this.setState({increaseButtonEnabled: false})
            alert('Cannot add more than 10 items.');
        }
    }

    decrementQuantity = () => {
		this.setState({increaseButtonEnabled: true})
        const newQuantity = Math.max(1, this.state.quantity - 1);
        this.setState({ quantity: newQuantity });
        this.props.setProductQuantityToCart(this.props.product.id, newQuantity);
    }

    render() {
        return (
            <div id='cartProductContainer'>
                <div id='cartImgContainer'>
                    <img id='cartImg' src={this.props.product.thumbnail} alt={this.props.product.title}/>
                </div>
                <div id='cartProductTitleAndPrice'>
                    <p id='cartProductTitle'>{this.props.product.title}</p>
                    <p id='cartProductPrice'>${this.props.product.price}</p>
                </div>
                <div id="quantityContainer">
                    <button onClick={this.decrementQuantity} disabled={this.state.quantity <= 1}>-</button>
                    <p id='cartProductQuantity'>{this.state.quantity}</p>
                    <button onClick={this.incrementQuantity} disabled={!this.state.increaseButtonEnabled} >+</button>
                </div>
                <div id="removeCartProduct">
                    <span id='removeCartProductIcon' onClick={() => this.props.productRemoveHandler(this.props.product.id)}>
                        <i className="fa fa-times"></i>
                    </span>
                </div>
            </div>
        );
    }
}
