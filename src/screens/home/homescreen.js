import React, {Component} from 'react';
import './homescreenstyle.css';
import Header from '../../components/header/headerview';
import SideBar from '../../components/sidebar/sidebarview';
import Body from '../../components/body/bodyview';
import ShoppingCart from '../../components/shoppingcart/shoppingcartview';
import ApiConnector from '../../api/apiconnector';
import ApiEndpoints from '../../api/apiendpoints';
import QueryParam from '../../api/apiqueryparams';

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowSidebar: true,
			isShowShoppingCart: false,
			products: {},
			cart: {},
			totalCartItem: 0
		}
	}

	toggleSidebar = () => {
		this.setState({isShowSidebar: !this.state.isShowSidebar});
	}

	toggleShoppingCart = () => {
		this.setState({isShowShoppingCart: !this.state.isShowShoppingCart});
	}

	productSuccessHandler = (products) => {
		this.setState({products: products});
	}

	errorHandler = (error) => {console.error(error)} //TODO:show error right below of header

	getCategory = (props) => {
		return props.match ? props.match.params.category : null;
	}

	getProductEndpoint = (searchKeyword) => {
		let endPoint = ApiEndpoints.PRODUCT_URL;
		if (searchKeyword) {
			return endPoint + QueryParam.SEARCH + '=' + searchKeyword;
		} else {
			return endPoint + QueryParam.LIMIT + '=0';
		}
	}

	getCategoryEndPoint = (category) => {
		let endPoint = ApiEndpoints.PRODUCT_URL;
		if (category != null && category.length > 0 && category !== 'undefined') {
			return endPoint + QueryParam.CATEGORY + category;
		} else {
			return endPoint + QueryParam.LIMIT + '=0';
		}
	}

	fetchProducts = (searchKeyword=null) => {
		ApiConnector.sendRequest(
			this.getProductEndpoint(searchKeyword),
			this.productSuccessHandler,
			this.errorHandler
		);
	}

	fetchProductsByCategory = (category=null) => {
		ApiConnector.sendRequest(
			this.getCategoryEndPoint(category),
			this.productSuccessHandler,
			this.errorHandler
		);
	}

	componentDidUpdate(prevProps) {
		let cat = this.getCategory(this.props);
		let prevCat = this.getCategory(prevProps);
		if (cat !== prevCat) {
			this.fetchProductsByCategory(cat);
		}
	}

	componentDidMount() {
		this.fetchProducts();
	}

	productSearchHandler = (searchKeyword) => {
		this.fetchProducts(searchKeyword);
	}

	getTotalCartItem = () => {
		return Object.values(this.state.cart).length;
	}

	addToCartHandler = (product) => {
		let cart = this.state.cart;
		cart[product.id] = {product: product, quantity: 1};
		this.setState({cart: cart, totalCartItem: this.getTotalCartItem()});
		if (!this.state.isShowShoppingCart){
			this.toggleShoppingCart()
		}
	}

	selectCategoryHandler = (category) => {
		this.fetchProductsByCategory(category!=null ? category.category : null)
	}

	setProductQuantityToCart = (productId, quantity) => {
		let cart = this.state.cart;
		cart[productId].quantity = quantity;
		this.setState({cart: cart});
	}

	productRemoveHandler = (productId) => {
		let cart = this.state.cart;
		delete cart[productId];
		this.setState({cart: cart, totalCartItem: this.getTotalCartItem()});
	}

	continueHandler = () => {
		if (this.state.isShowShoppingCart){
			this.toggleShoppingCart();
		}
		window.location.reload();
		window.location.href = 'http://localhost:3000'
	}

	render() {
		return (
			<React.Fragment>
				<Header
					toggleSidebar={this.toggleSidebar}
					toggleShoppingCart={this.toggleShoppingCart}
					totalCartItem={this.state.totalCartItem}
					productSearchHandler={this.productSearchHandler}
				/>
				<div id='bodyContainer'>
					<SideBar
						isShowSidebar={this.state.isShowSidebar}
						productSearchHandler={this.productSearchHandler}
						selectCategoryHandler={this.selectCategoryHandler}
					/>
					<Body
						products={this.state.products.products}
						addToCartHandler={this.addToCartHandler}
						isShowSidebar={this.state.isShowSidebar}
						isShowShoppingCart={this.state.isShowShoppingCart}
					/>
					<ShoppingCart
						isShowShoppingCart={this.state.isShowShoppingCart}
						cart={this.state.cart}
						products={this.state.products.products}
						setProductQuantityToCart={this.setProductQuantityToCart}
						productRemoveHandler={this.productRemoveHandler}
						continueHandler={this.continueHandler}
					/>
				</div>
			</React.Fragment>
		);
	}
}