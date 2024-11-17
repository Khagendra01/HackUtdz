import React, { useEffect, useState } from "react"
import Navbar from "../../Componenets/Navbar/Navbar"
import "./Banking.css"
import MortageRatesChart from "./MortageRatesChart"
import CommunityBankSentimentIndex from "./CommunityBankSentimentIndex"

export const Banking = () => {
	return (
		<div>
			<Navbar />
			<main>
				<h1 className="text-center text-3xl font-bold mb-4">Featured Graphs</h1>
				<div className="flex flex-wrap justify-center">
					<div className="graph-container w-full md:w-1/2 p-2">
						<div
							className="embed-container"
							style={{ width: "100%", maxWidth: "1200px" }}
						>
							<MortageRatesChart />
						</div>
					</div>
					<div
						className="graph-container w-full md:w-1/2 p-2"
						style={{ background: "#FFFAF1" }}
					>
						<div
							className="embed-container"
							style={{
								width: "100%",
								maxWidth: "1200px",
							}}
						>
							<CommunityBankSentimentIndex />
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}
