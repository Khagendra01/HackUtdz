import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Componenets/Navbar/Navbar";
import "./Banking.css";

export const Banking = () => {
	const [messages, setMessages] = useState([]);
	const [randomQuestions, setRandomQuestions] = useState([]);
	const [input, setInput] = useState("");
	const [inputAtBottom, setInputAtBottom] = useState(false); // Tracks input box position
	const [citations, setCitations] = useState([]);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollTo({
			top: messagesEndRef.current.scrollHeight,
			behavior: "smooth",
		});
	};

	const randomizeQuestions = () => {
		const questions = [
			"What is the primary role of banks in the economy?",
			"How do banks facilitate the transmission of monetary policy?",
			"What are the main sources of income for banks?",
			"How do banks manage the risk of bank runs?",
			"What regulatory measures are in place to ensure bank safety and soundness?",
			"How do central banks influence the money supply?",
			"What types of financial products do banks typically offer?",
			"How do banks act as intermediaries between savers and borrowers?",
			"What is the significance of a bank's return on assets?",
			"How do banks support wealth management and financial planning services?",
		];

		// Select 3 random questions
		const randomQuestion = questions
			.sort(() => 0.5 - Math.random())
			.slice(0, 3);
		//save all 3 questions
		setRandomQuestions(randomQuestion);
	};

	useEffect(() => {
		randomizeQuestions();
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = () => {
		if (input.trim()) {
			// Add user message
			setMessages((prev) => [...prev, { text: input, sender: "user" }]);
			setInput("");
			setInputAtBottom(true); // Move input box to the bottom

			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			const raw = JSON.stringify({
				user_msg: input,
				last5: messages
					.slice(-5) // Get the last 5 messages
					.map((msg) =>
						msg.sender === "user" ? `User: ${msg.text}` : `AI: ${msg.text}`
					) // Format each message
					.join("\n"), // Join them into a single string with line breaks
			});

			const requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow",
			};

			fetch("http://172.20.10.2:8000/api/askagent/", requestOptions)
				.then((response) => response.json())
				.then((result) => {
					// Ensure ai_msg is present in the response
					if (result && result.ai_msg) {
						setMessages((prev) => [
							...prev,
							{
								text: result.ai_msg,
								sender: "ai",
								citations: result.citation || [],
							},
						]);
					}
					console.log(result);
				})
				.catch((error) => console.error("Error:", error));
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && input.trim()) {
			handleSendMessage();
		}
	};

	const handleButtonClick = (question) => {
		setInput(question); // Move input box to the top
	};

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
						<div
							className="flex flex-col overflow-y-auto h-96 border border-gray-300 rounded-lg p-4"
							ref={messagesEndRef}
						>
							{messages.map((message, index) => (
								<div
									key={index}
									className={`p-3 rounded-md shadow-sm mb-4 max-w-lg ${
										message.sender === "user"
											? "bg-blue-100 self-end"
											: "bg-gray-100 self-start"
									}`}
								>
									{message.text}
									{message.citations?.length > 0 && (
										<div className="mt-2 text-sm text-gray-600">
											<strong>Citations:</strong>
											<ul className="list-disc list-inside overflow-auto">
												{message.citations.map((citation, i) => (
													<li key={i}>{citation}</li>
												))}
											</ul>
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
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
							onClick={() => handleButtonClick(`${randomQuestions[0]}`)}
						>
							{randomQuestions[0]}
						</button>
						<button
							className="rounded-full bg-gray-100 px-4 py-2 border"
							onClick={() => handleButtonClick(`${randomQuestions[1]}`)}
						>
							{randomQuestions[1]}
						</button>
						<button
							className="rounded-full bg-gray-100 px-4 py-2 border"
							onClick={() => handleButtonClick(`${randomQuestions[2]}`)}
						>
							{randomQuestions[2]}
						</button>
					</div>
				)}
			</main>
		</div>
	);
};
