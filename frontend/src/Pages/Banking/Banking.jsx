import React, { useEffect, useState } from "react";
import Navbar from "../../Componenets/Navbar/Navbar";
import "./Banking.css";

export const Banking = () => {


	return (
		<div>
			<Navbar />
			<main>
			<h1 className="text-center text-3xl font-bold mb-4">Featured Graphs</h1>
				<div className="flex flex-wrap justify-center">
					<div className="graph-container w-full md:w-1/2 p-2">
						<div className="embed-container" style={{ width: "100%", maxWidth: "1200px"}}>
							<iframe
								src="https://fred.stlouisfed.org/graph/graph-landing.php?g=1Bo4a&width=670&height=475"
								style={{
									width: "100%", // Adjust to occupy full width of the container
									height: "550px", // Customize height to your needs
									overflow: "hidden",
									border: 0,
								}}
								allowtransparency="true"
								loading="lazy"
							/>
						</div>
					</div>
					<div className="graph-container w-full md:w-1/2 p-2">
						<div className="embed-container" style={{ width: "100%", maxWidth: "1200px"}}>
							<iframe
								src="https://fred.stlouisfed.org/graph/graph-landing.php?g=1Bo6Z&width=670&height=475"
								style={{
									width: "100%", // Adjust to occupy full width of the container
									height: "550px", // Customize height to your needs
									overflow: "hidden",
									border: 0,
								}}
								allowtransparency="true"
								loading="lazy"
							/>
						</div>
					</div>
				</div>
				
			</main>
		</div>
	);
	
};
