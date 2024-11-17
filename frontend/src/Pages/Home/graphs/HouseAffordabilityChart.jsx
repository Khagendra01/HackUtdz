import React, { useEffect, useState } from "react"
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts"
import Papa from "papaparse"

const HouseAffordabilityChart = () => {
	const [data, setData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/HOUSE.csv")
			const csvData = await response.text()

			Papa.parse(csvData, {
				header: true,
				skipEmptyLines: true,
				dynamicTyping: true,
				complete: (result) => {
					const formattedData = result.data.map((row) => ({
						date: row.DATE,
						HAI: row.FIXHAI,
					}))
					setData(formattedData)
				},
			})
		}
		fetchData()
	}, [])

	return (
		<div style={{ textAlign: "center" }}>
			<h2>Housing Affordability Index</h2>
			{Array.isArray(data) && data.length > 0 ? (
				<ResponsiveContainer className="pb-4" width="95%" height={400}>
					<LineChart data={data}>
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<XAxis
							dataKey="date"
							label={{ value: "Date", position: "insideBottom", offset: -5 }}
							tickFormatter={(tick) => tick.split("-").slice(1).join("-")} // Show only month and day
						/>
						<YAxis
							label={{
								value: "House Affordability Index (HAI)",
								angle: -90,
								position: "insideLeft",
							}}
						/>
						<Tooltip />
						<Line
							type="monotone"
							dataKey="HAI"
							stroke="#1a73e8"
							strokeWidth={2}
							dot={{ stroke: "#ff5722", strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			) : (
				<p>Loading data...</p>
			)}
		</div>
	)
}

export default HouseAffordabilityChart
