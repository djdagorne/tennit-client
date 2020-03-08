import React from 'react';
import './Footer.css';
import 'font-awesome/css/font-awesome.min.css';

function Footer(){
	return (
		<>
			<a aria-hidden="true"  className="text-shadow fas fa-envelope-square 2x" alt="email me here" target='_blank' rel="noopener noreferrer" href="mailto:dj.dagorne@gmail.com">
				<span hover="email me here" className="sr-only">email</span>
			</a>
			<a aria-hidden="true" className="text-shadow fab fa-github-square 2x" alt="check my github here" target='_blank' rel="noopener noreferrer" href="https://github.com/djdagorne">
				<span hover="check my github here" className="sr-only">github</span>
			</a>
			<a aria-hidden="true" className="text-shadow fab fa-linkedin 2x" alt="check my linkedin here" target='_blank' rel="noopener noreferrer" href="https://www.linkedin.com/in/dexter-dagorne-81461a18a/">
				<span hover="check my linkedin here" className="sr-only">linkedin</span>
			</a>
		</>
	)
}

export default Footer;