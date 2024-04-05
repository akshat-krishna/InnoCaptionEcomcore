import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './sidebarstyle.css';
import ApiConnector from '../../api/apiconnector';
import ApiEndpoints from '../../api/apiendpoints';
import CategorySkeleton from '../skeleton/category/categoryskeletonview';

export default class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	getSidebarStyle = () => {
		return !this.props.isShowSidebar ? {left: '-200px'} : {};
	}

	getCategoryLink = (category) => (category != null && category.length > 0 && category !== 'undefined') ? `/c/${category}`:'';

	categorySuccessHandler = (categories) => {
		this.state.categories.push("All")
		this.setState({categories: categories});
	}

	erorHandler = (error) => {console.error(error)} 

	componentDidMount() {
		ApiConnector.sendRequest(
			ApiEndpoints.CATEGORY_URL,
			this.categorySuccessHandler,
			this.errorHandler
		);
	}

	render() {
		return (
			<div id='sideBarContainer' style={this.getSidebarStyle()}>
				<div id='sideBarHeader'>Categories</div>
				<div id='sideBarBody'>
					{this.state.categories.length > 1 ?
						<ul>
							<Link key={null} to={this.getCategoryLink()} >
									<li onClick={() => this.props.selectCategoryHandler()}>All Categories</li>
							</Link>
							{this.state.categories.map((category) => (
								<Link key={category} to={this.getCategoryLink(category)} >
									<li onClick={() => this.props.selectCategoryHandler({category})}>{category}</li>
								</Link>
							))}
						</ul>
						:
						<CategorySkeleton />
					}
				</div>
			</div>
		);
	}
}