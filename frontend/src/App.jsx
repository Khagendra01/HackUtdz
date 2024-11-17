import React from "react"
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom"
import {
	Home,
	Banking,
	Crypto,
	FraudDetection,
	Investment,
} from "./Pages/index"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/banking" element={<Banking />} />
				<Route path="/crypto" element={<Crypto />} />
				<Route path="/frauddetection" element={<FraudDetection />} />
				<Route path="/investment" element={<Investment />} />
			</Routes>
		</Router>
	)
}

export default App
