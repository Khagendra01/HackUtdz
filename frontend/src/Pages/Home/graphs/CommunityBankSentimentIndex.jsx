import React, { useEffect, useState } from "react"
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts"
import Papa from "papaparse"

const CommunityBankSentimentIndex = () => {
	const [data, setData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("/CBSICO.csv") // Update this with your actual CSV file path
			const csvData = await response.text()

			Papa.parse(csvData, {
				header: true,
				skipEmptyLines: true,
				dynamicTyping: true, // Automatically convert numbers
				complete: (result) => {
					console.log("Parsed Data:", result.data)
					const formattedData = result.data
						.filter((row) => row.DATE && row.CBSICO !== undefined) // Filter out invalid rows
						.map((row) => ({
							date: row.DATE,
							cbsico: parseFloat(row.CBSICO), // Ensure numerical conversion
						}))
					setData(formattedData)
				},
				error: (error) => {
					console.error("Error parsing CSV:", error)
				},
			})
		}

		fetchData()
	}, [])

	return (
		<div style={{ textAlign: "center" }}>
			<h2>CSBS Community Bank Sentiment Index</h2>
			{Array.isArray(data) && data.length > 0 ? (
				<ResponsiveContainer className="pb-4" width="95%" height={400}>
					<LineChart data={data}>
						<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
						<XAxis
							dataKey="date"
							label={{ value: "Date", position: "insideBottom", offset: -5 }}
							tickFormatter={(tick) => tick} // Show only month and day
						/>
						<YAxis
							label={{
								value: "CBSICO",
								angle: -90,
								position: "insideLeft",
							}}
							domain={["auto", "auto"]}
						/>
						<Tooltip />
						<Line
							type="monotone"
							dataKey="cbsico"
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

export default CommunityBankSentimentIndex
