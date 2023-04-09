import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { loginSchema } from "../../Schema/login_schema";
import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"

const url = 'http://localhost:4000/users'

const initialState = {
	loading: true,
	error: '',
	users: []
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				error: '',
				users: action.payload
			}
		case 'FETCH_FAILURE':
			return {
				loading: false,
				error: 'something went wrong',
				users: []
			}
		default:
			return state
	}
}

const Login = () => {

	const navigate = useNavigate()

	const [usersList, dispatch] = useReducer(reducer, initialState)

	const fetchUsersData = (url) => {
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
	}

	useEffect(() => {
		fetchUsersData(url)
	}, [])

	const initialValues = {
		email: "",
		password: "",
	}

	const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues,
		validationSchema: loginSchema,
		onSubmit: (values, action) => {
			const isUser = usersList.users.filter((user) => user.email == values.email && user.password == values.password)
			if (isUser.length > 0) {
				navigate('/')
				action.resetForm()
			} else {
				console.log('Invalid User, please try again')
			}
		}
	})

	return ( 
		<Container id="login-section" className="my-4">
			<Row>
				<Col lg={6} className="m-auto">
					<Card className="bg-dark text-light">
						<Card.Body className="my-4">
							<h4>Login</h4>
							<Form onSubmit={handleSubmit}>
								
								<Form.Group className="mt-3 mb-2" >
									<Form.Label>Email address</Form.Label>
									<Form.Control id="form-input" type="text" name="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
									<small>{ touched.email && errors.email ? errors.email : null}</small>
								</Form.Group>
								<Form.Group className="mt-3 mb-2" >
									<Form.Label>Password</Form.Label>
									<Form.Control id="form-input" type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
									<small>{ touched.password && errors.password ? errors.password : null}</small>
								</Form.Group>
								
								<Button variant="light" type="submit" className="mt-3 float-end">
								Submit
								</Button>
							</Form>
						</Card.Body>
					</Card>
					
				</Col>
			</Row>
		</Container>
	 );
}
 
export default Login;