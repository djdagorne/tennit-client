import React from 'react'
import './Footer.css'
import 'font-awesome/css/font-awesome.min.css'

function Footer() {
	return (
		<>
			<a target='_blank' rel="noopener noreferrer" href="mailto:dj.dagorne@gmail.com"><span alt="email me here" className="text-shadow fas fa-envelope-square 2x"></span></a>
			<a target='_blank' rel="noopener noreferrer" href="https://github.com/djdagorne"><span alt="check my github here" className="text-shadow fab fa-github-square 2x"></span></a>
			<a target='_blank' rel="noopener noreferrer" href="https://www.linkedin.com/in/dexter-dagorne-81461a18a/"><span alt="check my linkedin here" className="text-shadow fab fa-linkedin 2x"></span></a>
		</>
	)
}

export default Footer