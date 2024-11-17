import React, { useEffect, useState } from "react"
import Navbar from "../../Componenets/Navbar/Navbar"
import "./Banking.css"
import axios from "axios"

export const Banking = () => {
	const [messages, setMessages] = useState([])
	const [input, setInput] = useState("")
	const [response, setResponse] = useState("")
	const [inputAtBottom, setInputAtBottom] = useState(false) // Tracks input box position

	const handleSendMessage = () => {
		if (input.trim()) {
			setMessages((prev) => [...prev, input])
			setInput("")
			setInputAtBottom(true) // Move input box to the bottom
		}
		callAPI()
	}

	const callAPI = async () => {
		try {
			const response = await fetch("http://172.20.10.2:8000/api/askagent/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_msg: input,
					last5: "",
				}),
			})
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			data = await response.json()
			console.log(data)
		} catch (e) {
			console.log("error ", e)
		}
	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && input.trim()) {
			setMessages((prev) => [...prev, input]) // Add new message
			setInput("") // Clear input
			setInputAtBottom(true)
		}
	}

	const handleButtonClick = (question) => {
		setInput(question) // Move input box to the top
	}

	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<main className="flex-1 overflow-auto">
				<div className="p-8">
					<h1 className="text-4xl mb-4">
						Learn <strong>Banking</strong>
					</h1>
					<p className="mb-6">
						Your personalized hub for financial insights, trends, and advice
						tailored to help you make smarter money decisions.
					</p>
					<hr className="mb-12" />
					{inputAtBottom && (
						<div className="flex flex-col-reverse overflow-y-auto h-96 border border-gray-300 rounded-lg p-4">
							{messages.map((message, index) => (
								<div
									key={index}
									className="bg-blue-100 p-3 rounded-md shadow-sm mb-4 max-w-lg self-end"
								>
									{message}
								</div>
							))}
						</div>
					)}
				</div>
				{!inputAtBottom && (
					<div>
						<h1 className="text-center text-3xl font-bold">
							What would you like to ask about banking?
						</h1>
					</div>
				)}
				<div
					className={`${
						inputAtBottom ? "mt-auto" : "mt-8"
					} flex justify-center items-center transition-all duration-500`}
				>
					<div className="flex gap-2 items-center p-4 w-full max-w-xl">
						<input
							type="text"
							className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm"
							placeholder="Type your question here..."
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<button
							onClick={handleSendMessage}
							className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
						>
							Send
						</button>
					</div>
				</div>
				{!inputAtBottom && (
					<div className="w-full h-16 flex justify-center items-center space-x-4">
						<button
							className="rounded-full bg-gray-100 px-4 py-2 border"
							onClick={() => handleButtonClick("How do savings accounts work?")}
						>
							How do savings accounts work?
						</button>
						<button
							className="rounded-full bg-gray-100 px-4 py-2 border"
							onClick={() => handleButtonClick("What are mutual funds?")}
						>
							What are mutual funds?
						</button>
						<button
							className="rounded-full bg-gray-100 px-4 py-2 border"
							onClick={() =>
								handleButtonClick("What are the best ways to save money?")
							}
						>
							What are the best ways to save money?
						</button>
					</div>
				)}
			</main>

			{/* Input box dynamically positioned */}
		</div>
	)
}
