
import './header.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
	return ( 
		<div id="header">
			<Navbar bg="dark" expand="md" variant='dark'>
				<Container>
				<Navbar.Brand href="#">ABC Company</Navbar.Brand>
				<Navbar.Toggle />
					<Navbar.Collapse >
						<Nav className="ms-auto my-2 my-lg-0">
								<Nav.Link href="/">Home</Nav.Link>
								<Nav.Link href="/cart">Cart</Nav.Link>
								<Nav.Link href='/signup'>Sign Up</Nav.Link>
								<Nav.Link href='/login'>Login</Nav.Link>
						</Nav>
				</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
 
export default Header;