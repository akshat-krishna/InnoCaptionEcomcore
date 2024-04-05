import React, {Component} from 'react';
import './shoppingcartstyle.css';
import CartProduct from './cartproduct/cartproductview';

export default class ShoppingCart extends Component {
	constructor(props) {
        super(props);
        this.state = {
            orderPlaced: false
        };
    }

	getCartStyle = () => {
		return this.props.isShowShoppingCart ? {right: '0px'} : {};
	}

	handlePlaceOrder = () => {
        this.setState({ orderPlaced: true });
    }

    continueShopping = () => {
        this.setState({ orderPlaced: false });
		this.props.continueHandler()
    }

	renderEmptyCart = () => {
		return(
			<div id='emptyCart'>
				<i
					id='shoppingBagIcon'
					className='fa fa-shopping-basket'
				></i>
				<p id='emptyCartText'>Empty Cart</p>
			</div>
		);
	}

	generateCart = () => {
		let cart = this.props.cart;
		let cartItems = [];
		for (let index in cart) {
			cartItems.push(
				<div key={index}>
					<CartProduct
						product={cart[index].product}
						quantity={cart[index].quantity}
						productRemoveHandler={this.props.productRemoveHandler}
						setProductQuantityToCart={this.props.setProductQuantityToCart}
					/>
				</div>
			);
		}
		if (cartItems.length > 0) {
			return cartItems;
		}
		return this.renderEmptyCart();
	}

	getTotalOrderPrice = () => {
		let price = 0;
		let cart = this.props.cart;
		for (let index in cart) {
			price += cart[index].product.price * cart[index].quantity;
		}
		return price;
	}

	render() {
		if (this.state.orderPlaced) {
			return (
				<div id='cartContainer' style={this.getCartStyle()}>
					<div id='cart'>
                		<p>Your order has been placed!</p>
                		<button id='continue'  onClick={this.continueShopping}>Continue Shopping</button>
					</div>
            </div>
			)
            // return this.renderOrderDialog();
        }
		return (
			<div id='cartContainer' style={this.getCartStyle()}>
				<div id='cart'>
					{this.generateCart()}
				</div>
				<div id='orderButtonContainer'>
					<div id='orderButton' onClick={this.handlePlaceOrder}>
						<div id='placeOrder'>Place Order</div>
					<div id='orderPrice'>${this.getTotalOrderPrice()}</div>
					</div>
				</div>
			</div>
		);
	}
}