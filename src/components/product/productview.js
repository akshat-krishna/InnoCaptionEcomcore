import React, {Component} from 'react';
import './productstyle.css';

export default class Product extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isAddedToCart: false
        };
    }

    addToCart = () => {
		if (!this.state.isAddedToCart) {
        	this.setState({ isAddedToCart: true });
		} else {
			this.showCartToast();
		}
		this.props.addToCartHandler(this.props.product);
    }

	showCartToast = () => {
		alert('You can change the quantity in the cart.');
	}

	render() {
		const buttonText = this.state.isAddedToCart ? 'Added to Cart' : 'Add to Cart';
        const buttonClass = this.state.isAddedToCart ? 'button-added' : 'button-add';
		return (
			<div id='productContainer'>
				<div id='productImageContainer'>
					<img id='productImage' src={this.props.product.thumbnail} alt={this.props.product.title}/>
				</div>
				<div id='productTitle'>
					<p>{this.props.product.title}</p>
				</div>
				<div className='priceContainer'>
                    <div id='productPrice'>
                        <p>${this.props.product.price}</p>
                    </div>
                    <div id='productDiscount'>
                        <p>{this.props.product.discountPercentage}% off</p>
                    </div>
                </div>
				<div>
					<button
						id={buttonClass}
						onClick={this.addToCart}
					>
						{buttonText}
					</button>
				</div>
			</div>
		);
	}
}