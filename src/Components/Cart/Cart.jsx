import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useReducer } from 'react';
import './cart.css'
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts, removeFromCart } from "../../Redux/actions";

const Cart = () => {

	let dispatch = useDispatch()
	const { cartItems } = useSelector(state => state.carts)

	useEffect(() => {
		dispatch(getCartProducts())
	}, [])

	const priceList = cartItems.map((cart) => Number(cart.price))
	const total = priceList.length ? priceList.reduce((prev, curr) => prev + curr) : 0

	const handleDeleteCart = (cartItem) => {
		const id = cartItem.id
		dispatch(removeFromCart(id))
	}

	return ( 
		<Container className="my-4">
			<Row className="d-flex align-items-center">
				<Col>
					<h1>Cart</h1>
				</Col>
				<Col >
					<p className="side-title float-end m-0">Total <span className="text-success">{cartItems.length}</span> Items in your Cart</p>
				</Col>
			</Row>
			{cartItems.length ? cartItems.map((cartItem, idx) => {
					
					return (
					<Row className="my-2">
						<Col key={cartItem.id} className="cart-container d-md-flex justify-content-between align-items-center p-2 gap-3 mx-3">
								<img src={`/images/${cartItem.image}`} className="cart-image"/>
								<div className="cart-content">
									<Card.Title>{cartItem.name}</Card.Title>
									<p className='text-danger mb-0'>{`$${cartItem.price}`}</p>
									<p>{cartItem.description}</p>
								</div>
								<button className="btn btn-sm btn-danger" onClick={() => handleDeleteCart(cartItem)}>Delete</button>
							</Col>
							
						</Row>
				)
				}): (<div className='mt-4'>Loading...</div>)}
			
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