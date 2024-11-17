import React from "react"
import { Navbar } from "../../Componenets/Navbar/Navbar"
import "./Home.css"
import BitcoinChart from "./graphs/BitcoinChart"
import EthereumChart from "./graphs/EthereumChart"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

// Slider settings
const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true, // Enable autoplay
	autoplaySpeed: 4000, // Auto scroll every 3 seconds (3000ms)
}

export const Home = () => {
	return (
		<div>
			<Navbar />
			<main className="homepage">
				<div className="hero">
					<h1>Your Gateway to Smarter Financial Decisions</h1>
					<p>
						Explore banking, investing, and cryptocurrencies with guidance from
						our AI assistant.
					</p>
					<button>Get Started</button>
				</div>
				<div className="services">
					<h2>Discover Our Services</h2>
					<div className="services-grid">
						<div className="service-card">
							<h3>Banking</h3>
						</div>
					</div>
				</div>
				<Slider {...settings}>
					<BitcoinChart />
					<EthereumChart />
				</Slider>
			</main>
		</div>
	)
}
