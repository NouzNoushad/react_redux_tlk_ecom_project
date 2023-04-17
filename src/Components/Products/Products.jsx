import { useEffect, useReducer, useState } from 'react';
import { Card, Col, Row, Container,Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/cartSlice';
import { getProducts } from '../../Redux/productSlice';

const Products = () => {

	let dispatch = useDispatch()
	const { loading, products, error} = useSelector((state) => state.products)

	const handleAddToCart = (product) => {

		const productAddToCart = {
			"name": product.name, "image": product.image, "price": product.price, "description": product.description
		}
		dispatch(addToCart(productAddToCart))
	}

	useEffect(() => {
		dispatch(getProducts())
	}, [])

	return ( 
		<Container className='my-4'>
			<Row xs={1} md={3} className="g-4">
				{loading ? (<div className='mt-4'>Loading...</div>) : null}
				{ error ? {error} : null}
				{products.length ? products.map((product) => (
				<Col key={product.id}>
					<Card>
						<Card.Img variant="top" src={`/images/${product.image}`} height="100%"/>
						<Card.Body>
								<Card.Title>{product.name}</Card.Title>
								<p className='text-danger mb-0'>{`$${product.price}`}</p>
								<p>{product.description}</p>
								<Button className='bg-dark border-0 float-end' onClick={() => handleAddToCart(product)}>Add To Cart</Button>
						</Card.Body>
					</Card>
				</Col>
				)) : null}
				
			</Row>
		</Container>
		
	 );
}
 
export default Products;