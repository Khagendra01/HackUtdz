import React from "react";
import { Navbar } from "../../Componenets/Navbar/Navbar";
import "./Home.css";
import BitcoinChart from "./graphs/BitcoinChart";
import EthereumChart from "./graphs/EthereumChart";
import CommunityBankSentimentIndex from "./graphs/CommunityBankSentimentIndex";
import MortageRatesChart from "./graphs/MortageRatesChart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Slider settings
const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true, // Enable autoplay
	autoplaySpeed: 4000, // Auto scroll every 3 seconds (3000ms)
};

export const Home = () => {
	return (
		<div>
			<Navbar />
			<main className="homepage">
				<div className="hero mb-8">
					<h1 className="text-4xl mb-4 ml-4 mt-4">
						Your Gateway to <strong>Smarter Financial Decisions</strong>
					</h1>
					<p className="ml-4">
						Explore banking, investing, and cryptocurrencies with guidance from
						our AI assistant.
					</p>
				</div>
				<hr className="mb-12" />
				{/* <div className="ml-4 text-3xl">Navigate to...</div>
				<div className="flex justify-end items-center w-full h-20 text-lg px-6 mb-6 space-x-24">
					<a
						href="#bankingSection"
						className="border border-white rounded-full px-4 py-3 transition-all hover:underline"
					>
						Banking
					</a>
					<a
						href="#cryptoSection"
						className="border border-white rounded-full px-4 py-3 transition-all hover:underline"
					>
						Crypto
					</a>
					<a
						href="#fraudSection"
						className="border border-white rounded-full px-4 py-3 transition-all hover:underline"
					>
						Fraud Detection
					</a>
					<a
						href="#investmentSection"
						className="border border-white rounded-full px-4 py-3 transition-all hover:underline"
					>
						Investments
					</a>
				</div> */}
				<div className="flex flex-col space-y-6">
					<a id="bankingSection" href="/banking" className="mt-16">
						<button
							type="submit"
							className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
						>
							Explore Banking
							<svg
								className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
								viewBox="0 0 16 19"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
									className="fill-gray-800 group-hover:fill-gray-800"
								></path>
							</svg>
						</button>
					</a>
					<Slider {...settings}>
						<CommunityBankSentimentIndex />
						<MortageRatesChart />
					</Slider>
					<hr className="mb-6" />
					<a id="cryptoSection" href="/crypto" className="mt-10">
						<button
							type="submit"
							className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
						>
							Explore Crypto
							<svg
								className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
								viewBox="0 0 16 19"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
									className="fill-gray-800 group-hover:fill-gray-800"
								></path>
							</svg>
						</button>
					</a>
					<Slider {...settings}>
						<BitcoinChart />
						<EthereumChart />
					</Slider>
					<hr className="mb-6" />
					<a id="fraudSection" href="/fraddetection" className="mt-10">
						<button
							type="submit"
							className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
						>
							Explore Fraud Detection
							<svg
								className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
								viewBox="0 0 16 19"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
									className="fill-gray-800 group-hover:fill-gray-800"
								></path>
							</svg>
						</button>
					</a>
					<Slider {...settings}>
						<BitcoinChart />
						<EthereumChart />
					</Slider>
					<hr className="mb-6" />
					<a id="investmentSection" href="/investment" className="mt-10">
						<button
							type="submit"
							className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
						>
							Explore Investments
							<svg
								className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
								viewBox="0 0 16 19"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
									className="fill-gray-800 group-hover:fill-gray-800"
								></path>
							</svg>
						</button>
					</a>
					<Slider {...settings}>
						<BitcoinChart />
						<EthereumChart />
					</Slider>
				</div>
			</main>
		</div>
	);
};
