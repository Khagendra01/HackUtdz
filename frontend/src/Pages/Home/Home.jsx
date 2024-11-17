import React from "react"
import { Navbar } from "../../Componenets/Navbar/Navbar"
import "./Home.css"

export const Home = () => {
	return (
		<div>
			<Navbar />
			<main className="homepage">
				<section className="hero">
					<h1>Your Gateway to Smarter Financial Decisions</h1>
					<p>
						Explore banking, investing, and cryptocurrencies with guidance from
						our AI assistant.
					</p>
					<button>Get Started</button>
				</section>

				<secions className="services">
					<h2>Discover Our Services</h2>
					<div className="services-grid">
						<div className="service-card">
							<h3>Banking</h3>
						</div>
					</div>
				</secions>
			</main>
		</div>
	)
}
