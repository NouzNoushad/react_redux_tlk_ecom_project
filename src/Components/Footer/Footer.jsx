import { Container, Row, Col } from "react-bootstrap";
import "./footer.css"

const Footer = () => {
	return ( 
		<div id="footer" className="bg-dark text-light">
			<Container>
			<Row className="py-3">
				<Col md={8}>
					<small className="m-0">Copyright 2023 ABC Company.inc All rights are reserved</small>
				</Col>
				<Col md={4} >
					<ul className="footer-links m-0">
						<li><a href="">Privacy policy</a></li>
						<li><a href="">Terms of Use</a></li>
					</ul>
				</Col>
			</Row>
		</Container>
		</div>
		
	 );
}
 
export default Footer;