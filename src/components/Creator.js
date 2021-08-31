import React, { useRef, useState } from "react";

export const Creator = () => {
	let ingredientVal;
	const initialValue = [];
	const [ingredients, setIngredients] = useState(initialValue);
	const onChangeVal = (e) => {
		ingredientVal = e.target.value;
	};
	const handleAdd = (e) => {
		e.preventDefault();
		if (ingredientVal) {
			setIngredients([...ingredients, ingredientVal]);
		}
	};
	const handleDel = (i) => {
		setIngredients(
			ingredients.filter((val, index) => {
				return index != i;
			})
		);
	};
	const items = ingredients.map((item, i) => {
		return (
			<div className="flex border-2 border-red-500 hover:border-red-700">
				<input
					className="rounded-none flex-none w-8 bg-red-500 hover:bg-red-700 text-white md:text-center items-baseline text-lg"
					type="submit"
					onClick={() => {
						handleDel(i);
					}}
					value="x"
				/>

				<div className="rounded-none flex-grow p-2">
					<div key={i}>{item}</div>
				</div>
			</div>
		);
	});
	return (
		<>
			<div>
				<br />
				<div className="border-2 border-blue-300 p-4 mx-4 md:mx-32 ">
					<div className="text-4xl tracking-widest text-center">
						CREATE NEW RECIPE
					</div>
					<br />
					<div className="text-sm grid grid-cols-2 grid-rows-8 space-y-2 md:space-y-0 gap-2">
						<div className="md:row-span-3 col-span-full md:col-span-1">
							<div className="h-full border-2 border-black">
								<div className="">image</div>
							</div>
						</div>
						<div className="row-span-1 col-span-full md:col-span-1">
							<div className="mb-2">Name</div>
							<div className="border-2 p-2 border-black">
								<input className="w-full" type="text"></input>
							</div>
						</div>
						<div className="row-span-2 col-span-full md:col-span-1 ">
							<div className="mb-2">Description</div>
							<div className="border-2 border-black ">
								<textarea
									rows="7"
									className="p-2 w-full"
								></textarea>
							</div>
						</div>
						<div className="row-span-auto col-span-full md:col-start-1 md:col-span-1">
							<div className="mb-2">Ingredients</div>
							<div className="flex border-2 border-black mb-2">
								<form className="contents ">
									<input
										className="rounded-noneflex-none border-2 border-black w-8 bg-black hover:bg-gray-700 text-white md:text-center items-baseline text-xl"
										type="submit"
										onClick={handleAdd}
										value="+"
									/>
									<div className="rounded-none contents">
										<input
											className="flex-grow p-2"
											onChange={onChangeVal}
											type="text"
											required
										></input>
									</div>
								</form>
							</div>
							<div className="overscroll-auto space-y-2">
								{items}
							</div>
						</div>
						<div className="col-span-full">
							<center>
								<input
									type="submit"
									className=" rounded-full font-semibold w-1/2 py-2 my-4 bg-blue-300 hover:bg-blue-500 "
									value="CREATE"
								/>
							</center>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
