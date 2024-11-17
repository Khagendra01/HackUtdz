import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Home, Banking } from "./Pages/index";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/banking" element={<Banking />} />
			</Routes>
		</Router>
	);
}

export default App;
