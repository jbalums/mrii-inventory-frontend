import React from "react";

const HomeHeader = () => {
	return (
		<nav
			className="flex flex-row flex-nowrap items-center justify-between mt-0 py-4 px-6 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-800"
			id="desktop-menu"
		>
			{/* logo */}
			<a className="flex items-center py-2 mr-4 text-xl" href="../index.html">
				<h2 className="text-2xl font-semibold text-gray-200 px-4 max-h-9 overflow-hidden">
					{/* <img class="inline-block w-7 h-auto ltr:mr-2 rtl:ml-2 -mt-1" src="../src/img/logo.png"> */}
					<img
						src="/logo-white.png"
						alt="logo"
						className="inline-block h-7 ltr:mr-2 rtl:ml-2 -mt-1"
					/>
				</h2>
			</a>
			{/* menu */}
			<ul className="flex ltr:ml-auto rtl:mr-auto mt-2 mt-0">
				{/* Customizer (Only for demo purpose) */}
				<li x-data="{ open: false }" className="relative">
					<a
						href="javascript:;"
						className="block py-3 px-4 flex text-sm rounded-full focus:outline-none"
						aria-controls="mobile-canvas"
						aria-expanded="false"
					>
						<span className="sr-only">Customizer</span>
						<svg
							className="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
							<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
						</svg>
					</a>
					<div
						className="fixed w-full h-full inset-0 z-50"
						id="mobile-canvas"
						style={{ display: "none" }}
					>
						<span className="fixed bg-gray-900 bg-opacity-70 w-full h-full inset-x-0 top-0" />
						<nav
							id="mobile-nav"
							className="flex flex-col ltr:right-0 rtl:left-0 w-72 fixed top-0 bg-white dark:bg-gray-800 h-full overflow-auto z-40 scrollbars show"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="navbartoggle"
							style={{ display: "none" }}
						>
							<div className="p-6 bg-indigo-500 text-gray-100 border-b border-gray-200 dark:border-gray-700">
								<div className="flex flex-row justify-between">
									<h3 className="text-md font-bold">Customizer</h3>
									<button type="button" className="inline-block w-4 h-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											className="inline-block text-gray-100 bi bi-x-lg"
											viewBox="0 0 16 16"
											id="x-lg"
										>
											<path d="M1.293 1.293a1 1 0 011.414 0L8 6.586l5.293-5.293a1 1 0 111.414 1.414L9.414 8l5.293 5.293a1 1 0 01-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 01-1.414-1.414L6.586 8 1.293 2.707a1 1 0 010-1.414z" />
										</svg>
										{/* <i class="fas fa-times"></i> */}
									</button>
								</div>
							</div>
							<div className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">
								<p className="text-base text-semibold">Color Scheme</p>
								<div className="flex flex-row">
									<div className="relative inline-block w-8 py-3 mt-0.5 ltr:mr-3 rtl:ml-3 align-middle select-none transition duration-200 ease-in">
										<input
											type="checkbox"
											name="lightdark"
											id="lightdark"
											className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white dark:bg-gray-900 border-2 dark:border-gray-700 appearance-none cursor-pointer"
										/>
										<label
											htmlFor="lightdark"
											className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
										/>
									</div>
									<p className="text-sm text-gray-500 self-center">
										Light and Dark
									</p>
								</div>
							</div>
							<div className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">
								<p className="text-base text-semibold">Sidebar Color</p>
								<div className="flex flex-row">
									<div className="relative inline-block w-8 py-3 mt-0.5 ltr:mr-3 rtl:ml-3 align-middle select-none transition duration-200 ease-in">
										<input
											type="checkbox"
											name="sidecolor"
											id="sidecolor"
											className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white dark:bg-gray-900 border-2 dark:border-gray-700 appearance-none cursor-pointer"
										/>
										<label
											htmlFor="sidecolor"
											className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
										/>
									</div>
									<p className="text-sm text-gray-500 self-center">
										Light and Dark
									</p>
								</div>
							</div>
							<div className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">
								<p className="text-base text-semibold">Direction</p>
								<div className="flex flex-row">
									<div className="relative inline-block w-8 py-3 mt-0.5 ltr:mr-3 rtl:ml-3 align-middle select-none transition duration-200 ease-in">
										<input
											type="checkbox"
											name="rtlmode"
											id="rtlmode"
											className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white dark:bg-gray-900 border-2 dark:border-gray-700 appearance-none cursor-pointer"
										/>
										<label
											htmlFor="rtlmode"
											className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer"
										/>
									</div>
									<p className="text-sm text-gray-500 self-center">
										LTR and RTL
									</p>
								</div>
							</div>
							<div className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">
								<p className="text-base text-semibold">Layout</p>
								<div className="relative mb-3">
									<a
										href="../index.html"
										className="inline-block py-2 px-2.5 mt-2 rounded text-sm text-gray-500 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-20 dark:hover:bg-opacity-60 hover:text-indigo-500 hover:bg-gray-200 self-center"
									>
										Default
									</a>
									<a
										href="../layout-compact.html"
										className="inline-block py-2 px-2.5 mt-2 rounded text-sm text-gray-500 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-20 dark:hover:bg-opacity-60 hover:text-indigo-500 hover:bg-gray-200 self-center"
									>
										Compact
									</a>
									<a
										href="../layout-topnav.html"
										className="inline-block py-2 px-2.5 mt-2 rounded text-sm text-gray-500 bg-gray-100 dark:bg-gray-900 dark:bg-opacity-20 dark:hover:bg-opacity-60 hover:text-indigo-500 hover:bg-gray-200 self-center"
									>
										Topnav
									</a>
								</div>
							</div>
							<div
								id="customcolor"
								className="py-3 px-6 border-b border-gray-200 dark:border-gray-700"
							>
								<p className="text-base text-semibold">Primary Color</p>
								<div className="relative my-3">
									<div
										id="custred"
										title="red"
										className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-red-500 hover:opacity-90 rounded-full cursor-pointer"
									/>
									<div
										id="custyellow"
										title="yellow"
										className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-yellow-500 hover:opacity-90 rounded-full cursor-pointer"
									/>
									<div
										id="custgreen"
										title="green"
										className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-green-500 hover:opacity-90 rounded-full cursor-pointer"
									/>
									<div
										id="custblue"
										title="blue"
										className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-blue-500 hover:opacity-90 rounded-full cursor-pointer"
									/>
									<div
										id="custpurple"
										title="purple"
										className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-purple-500 hover:opacity-90 rounded-full cursor-pointer"
									/>
									<div
										id="custpink"
										title="pink"
										className="inline-block p-3 ltr:mr-1.5 rtl:ml-1.5 bg-pink-500 hover:opacity-90 rounded-full cursor-pointer"
									/>
									<div
										id="custindigo"
										title="reset color"
										className="inline-block cursor-pointer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={16}
											height={16}
											fill="currentColor"
											className="bi bi-arrow-counterclockwise"
											viewBox="0 0 16 16"
										>
											<path
												fillRule="evenodd"
												d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
											/>
											<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
										</svg>
									</div>
								</div>
							</div>
							<div className="pt-6 px-6">
								<div className="flex justify-between items-center relative bg-yellow-100 text-yellow-900 p-3 rounded-lg mb-4">
									<div>
										How to apply? please read the documentation on{" "}
										<a
											href="docs/customize.html"
											className="underline font-semibold"
										>
											Customize page
										</a>
									</div>
									<button type="button">
										<span className="text-2xl">×</span>
									</button>
								</div>
							</div>
						</nav>
					</div>
				</li>
				{/* End Customizer (Only for demo purpose) */}
				<li className="relative">
					<a
						href="login-basic.html"
						className="block py-3 px-4 flex hover:text-indigo-500 focus:outline-none"
					>
						<div className="relative inline-block">Login</div>
					</a>
				</li>
				<li className="relative">
					<a
						href="register-basic.html"
						className="block py-3 px-4 flex hover:text-indigo-500 focus:outline-none"
					>
						<div className="relative inline-block">Register</div>
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default HomeHeader;
