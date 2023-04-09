import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import "./sign_up.css";
import { useFormik } from "formik";
import { signUpSchema } from "../../Schema/signup_schema";

const SignUp = () => {

	const initialValues = {
		name: "",
		email: "",
		password: "",
		confirm_password: ""
	}

	const saveToUsersList = (name, email, password) => {
		const users = { "name": name, "email": email, "password": password }
		console.log(users)
		
		fetch('http://localhost:4000/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(users)
		})
			.then(() => {
			console.log('User data has saved Successfully')
			})
			.catch((err) => {
			console.log('Failed to save user data')
		})
	}

	const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
		initialValues,
		validationSchema: signUpSchema,
		onSubmit: (values, action) => {
			console.log(values.name)
			saveToUsersList(values.name, values.email, values.password)
			action.resetForm()
		}
	})

	return ( 
		<Container id="signup-section" className="my-4">
			<Row>
				<Col lg={6} className="m-auto">
					<Card className="bg-dark text-light">
						<Card.Body className="my-4">
							<h4>Register</h4>
							<Form onSubmit={handleSubmit}>
								<Form.Group className="mt-3 mb-2" >
									<Form.Label>Name</Form.Label>
									<Form.Control id="form-input" type="name" name="name" placeholder="Enter name" value={values.name} onChange={handleChange } />
									<small>{touched.name && errors.name ? errors.name : null}</small>
								</Form.Group>
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
								<Form.Group className="mt-3 mb-2" >
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control id="form-input" type="password" name="confirm_password" placeholder="Confirm Password" value={values.confirm_password} onChange={handleChange} />
									<small>{ touched.confirm_password && errors.confirm_password ? errors.confirm_password : null}</small>
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
 
export default SignUp;