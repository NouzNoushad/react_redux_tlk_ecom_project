import { useEffect, useReducer } from 'react';
import { Card, Col, Row, Container,Button } from 'react-bootstrap';

const initialState = {
	loading: true,
	error: '',
	products: []
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				error: '',
				products: action.payload
			}
		case 'FETCH_FAILURE':
			return {
				loading: false,
				error: 'something went wrong',
				products: []
			}
		default:
			return state
	}
}

const Products = () => {

	const [product, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		const url = 'http://localhost:5000/products'
		fetch(url)
			.then(res => {
				if (!res.ok) {
					throw Error('could not fetch users data');
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
	}, [])

	const handleAddToCart = (product) => {
	
		const image = product['image']
		const name = product['name']
		const price = product['price'].toString()
		const description = product['description']

		const addProduct = {  "image" : image, "name" : name, "price": price, "description" : description }
		
		fetch('http://localhost:8000/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(addProduct)
		}).then(() => {
			console.log('Your Product has saved Successfully');
			
		}).catch(err => console.log(err))
	}

	return ( 
		<Container className='my-4'>
			<Row xs={1} md={3} className="g-4">
				{product.loading ? 'loading...' : product.products.map((product, idx) => (
				<Col key={product['id']}>
					<Card>
						<Card.Img variant="top" src={`/images/${product['image']}`} height="100%"/>
						<Card.Body>
								<Card.Title>{product['name']}</Card.Title>
								<p className='text-danger mb-0'>{`$${product['price']}`}</p>
								<p>{product['description']}</p>
								<Button className='bg-dark border-0 float-end' onClick={() => handleAddToCart(product)}>Add To Cart</Button>
						</Card.Body>
							
					</Card>
				</Col>
				))}
				{product.error ? product.error : null}
			</Row>
		</Container>
		
	 );
}
 
export default Products;