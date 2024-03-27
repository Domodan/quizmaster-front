import React from "react";
import styled from "styled-components";

const Footer = () => {
	return (
		<StyledFooter className="footer">
			<p>&copy; {new Date().getFullYear()} Negecoder, All rights reserved.</p>
			<p>Designed with 💝 by Negecoder</p>
		</StyledFooter>
	);
};

export default Footer;

// StyledFooter styled-component with CSS styles
const StyledFooter = styled.footer`
	background-color: rgba(38, 42, 69, 0.7);
	padding: 1.5rem 1.5rem;
	color: white;
	z-index: 1000;
	margin-top: 1rem;
	border-top: 1px solid rgb(59, 59, 59);
	width: 100vw;
	display: flex;
	justify-content: space-between;
	align-items: center;

	// Media query for responsiveness
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	// Dark mode styling
	body.dark-mode & {
		background-color: rgba(0, 0, 0, 0.7);
	}
`;
