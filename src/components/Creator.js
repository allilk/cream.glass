import React, { useRef } from "react";

export const Creator = () => {
	let ingredientVal = useRef();
	let ingredientArr = [""];
	const getVal = (e) => {
		console.log(e.target.value);
	};
	return (
		<>
			<div>
				<center>
					<br />
					<div className="border-2 border-blue-300 p-4 mx-4 md:mx-32 ">
						<div className="my-4 text-4xl mb-6 tracking-widest text-center">
							CREATE NEW RECIPE
						</div>
						<div className="grid grid-rows-6 grid-cols-5 h-full gap-4 mb-16">
							<div className="mb-2 row-span-2 md:row-span-4 md:row-start-1 col-start-1 col-span-full md:col-span-2">
								<div className="text-left text-sm mb-1">
									Image
								</div>
								<div className="border-2 border-black h-full w-full">
									<img></img>
								</div>
							</div>
							<div className="text-left text-sm row-span-1 col-span-full md:row-start-1 md:col-span-3">
								<div className="mb-1">Name</div>
								<input
									className="border-2 p-2 border-black w-full"
									type="text"
								></input>
							</div>
							<div className="text-left text-sm row-span-2 col-span-full md:row-start-2 md:col-span-3 md:mt-0">
								<div className="mb-1">Description</div>
								<div className="">
									<textarea
										rows="7"
										className="border-2 border-black w-full"
									></textarea>
								</div>
							</div>
							<div className="text-left text-sm row-span-1 col-span-full md:row-start-5 md:col-span-auto mt-10 md:mt-0">
								<div className="mb-1">Ingredients</div>
								<div className="grid grid-cols-12">
									<input
										className="col-span-1 border-2 border-black md:px-4 bg-black hover:bg-gray-700 text-white md:text-center items-baseline text-xl"
										type="submit"
										onClick={() => {
											ingredientArr = [
												...ingredientArr,
												ingredientArr,
											];
											console.log(ingredientVal);
										}}
										value="+"
									/>
									<div className="col-start-2 col-span-11">
										<input
											className="border-2 p-2 border-black w-full"
											type="text"
											ref={getVal()}
										></input>
									</div>
								</div>
							</div>

							<br />
						</div>
						<input
							type="submit"
							className=" bottom-0 rounded-full font-semibold px-32 py-2 bg-blue-300 hover:bg-blue-500 "
							value="CREATE"
						/>
					</div>
				</center>
			</div>
		</>
	);
};
