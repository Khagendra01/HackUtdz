import { AiOutlineHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai"
import { BiMessageSquareDetail } from "react-icons/bi"
import { Link } from "react-router-dom"

export const Navbar = () => {
	const menuItems = [
		{ title: "Home", icon: <AiOutlineHome size={24} />, path: "/" },
		{ title: "Banking", icon: <AiOutlineUser size={24} />, path: "/banking" },
		{
			title: "Messages",
			icon: <BiMessageSquareDetail size={24} />,
			path: "/messages",
		},
		{
			title: "Settings",
			icon: <AiOutlineSetting size={24} />,
			path: "/settings",
		},
	]

	return (
		<div className="fixed left-0 top-0 h-screen z-10">
			<div className="h-full bg-white shadow-2xl w-20 hover:w-64 transition-all duration-300">
				<div className="p-4">
					<nav>
						<ul className="flex flex-col gap-4">
							{menuItems.map((item, index) => (
								<li key={index}>
									<Link
										to={item.path}
										className="flex items-center gap-4 text-gray-700 hover:text-black hover:bg-gray-100 p-3 rounded-lg transition-colors duration-200"
									>
										<span className="min-w-[24px]">{item.icon}</span>
										<span className="whitespace-nowrap overflow-hidden">
											{item.title}
										</span>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Navbar
