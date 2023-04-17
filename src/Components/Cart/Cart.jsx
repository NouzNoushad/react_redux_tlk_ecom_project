import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useReducer } from 'react';
import './cart.css'
import { deleteFromCart, getCartProducts } from "../../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {

	let dispatch = useDispatch()
	const { loading, carts, error } = useSelector(state => state.cart)

	useEffect(() => {
		dispatch(getCartProducts())
	}, [])

	let total;
	if (carts.length > 0) {
		const priceList = carts.map((cart) => Number(cart.price))
		total = priceList.reduce((prev, curr) => prev + curr)
	} else {
		total = 0
	}

	const handleDeleteCart = (id) => {
		dispatch(deleteFromCart(id))
		dispatch(getCartProducts())
	}

	return ( 
		<Container className="my-4">
			<Row className="d-flex align-items-center">
				<Col>
					<h1>Cart</h1>
				</Col>
				<Col >
					<p className="side-title float-end m-0">Total <span className="text-success">{carts.length}</span> Items in your Cart</p>
				</Col>
			</Row>
			{loading ? (<div className='mt-4'>Loading...</div>) : null}
			{ error ? {error} : null}
			{carts.length > 0 ? carts.map((cartItem, idx) => {
					
					return (
					<Row className="my-2" key={cartItem.id}>
						<Col  className="cart-container d-md-flex justify-content-between align-items-center p-2 gap-3 mx-3">
								<img src={`/images/${cartItem.image}`} className="cart-image"/>
								<div className="cart-content">
									<Card.Title>{cartItem.name}</Card.Title>
									<p className='text-danger mb-0'>{`$${cartItem.price}`}</p>
									<p>{cartItem.description}</p>
								</div>
								<button className="btn btn-sm btn-danger" onClick={() => handleDeleteCart(cartItem.id)}>Delete</button>
							</Col>
							
						</Row>
				)
				}): null}
			
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