import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useReducer } from 'react';
import './cart.css'

const url = 'http://localhost:8000/cart'

const initialState = {
	loading: true,
	error: '',
	cartItems: []
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				error: '',
				cartItems: action.payload
			}
		case 'FETCH_FAILURE':
			return {
				loading: false,
				error: 'something went wrong',
				cartItems: []
			}
		default:
			return state
	}
}

const Cart = () => {

	const [cart, dispatch] = useReducer(reducer, initialState)

	const fetchCartData = (url) => {
		fetch(url)
			.then(res => {
				if (!res.ok) {
					throw Error('could not fetch cart data');
				}
				return res.json();
			})
			.then(data => {
				dispatch({
					type: 'FETCH_SUCCESS',
					payload: data
				})
				
			}).catch(err => {
				dispatch({
							type: 'FETCH_FAILURE',
							
					})
			})
	}

	useEffect(() => {
		fetchCartData(url)
	}, [])

	let total = 0
	const priceList = cart.cartItems.map((cart) => Number(cart['price']))
	if (priceList.length == 0) {
		total = 0
	} else {
		total = priceList.reduce((prev, curr) => prev + curr)
	}

	const handleDeleteCart = (cartItem) => {
		const id = cartItem['id']
		const newCart = cart.cartItems.filter((cart) => cart['id'] != id)

		console.log(newCart)
		console.log(id)
		
		fetch(`${url}/${id}` , {
			method: 'DELETE',
		})
			.then(() => {
				dispatch({
					type: 'FETCH_SUCCESS',
					payload: newCart
				})
			console.log('Product removed from the Cart')
		})
	}

	return ( 
		<Container className="my-4">
			<Row className="d-flex align-items-center">
				<Col>
					<h1>Cart</h1>
				</Col>
				<Col >
					<p className="side-title float-end m-0">Total <span className="text-success">{cart.cartItems.length}</span> Items in your Cart</p>
				</Col>
			</Row>
			{cart.loading ? 'loading...' : cart.cartItems.map((cartItem, idx) => {
					
					return (
					<Row className="my-2">
						<Col key={cartItem['id']} className="cart-container d-md-flex justify-content-between align-items-center p-2 gap-3 mx-3">
								<img src={`/images/${cartItem['image']}`} className="cart-image"/>
								<div className="cart-content">
									<Card.Title>{cartItem['name']}</Card.Title>
									<p className='text-danger mb-0'>{`$${cartItem['price']}`}</p>
									<p>{cartItem['description']}</p>
								</div>
								<button className="btn btn-sm btn-danger" onClick={() => handleDeleteCart(cartItem)}>Delete</button>
							</Col>
							
						</Row>
				)
				})}
			{cart.error ? cart.error : null}
			
			<Row className="d-flex align-items-center sticky border border-dark mt-4 p-2 mx-2">
				<Col>
					<h1>Total</h1>
				</Col>
				<Col>
					<h3 className="float-end m-0 text-danger">{`$${total}`}</h3>
				</Col>
			</Row>
		</Container>

	);
}

export default Cart;