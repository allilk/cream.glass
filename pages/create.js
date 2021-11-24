import React, { useState } from "react";
import { getSession } from "next-auth/client";
import Router from "next/router";

export const getServerSideProps = async (context) => {
	return {
		props: {
			session: await getSession(context),
		},
	};
};

const Create = ({ session }) => {
	if (!session && process.browser) Router.push("/");

	const [recipe, setRecipe] = useState({
		name: "",
		description: "",
		category: "soft_drinks",
		ingredients: [],
		steps: [],
	});

	const handleChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;
		setRecipe({
			...recipe,
			[key]: value,
		});
	};

	// Ingredient array stuff
	const [ingredient, setIngredient] = useState({
		name: "",
		amount: 1,
		measure: "tsp",
	});

	const handleIngredient = (event) => {
		const key = event.target.name;
		const value = event.target.value;
		setIngredient({ ...ingredient, [key]: value });
	};

	const handleAdd = (event) => {
		event.preventDefault();

		if (ingredient) {
			setRecipe({
				...recipe,
				ingredients: [
					...recipe.ingredients,
					{
						name: ingredient.name,
						amount: ingredient.amount,
						measure: ingredient.measure,
					},
				],
			});
		}
	};

	const handleDel = (i) => {
		setRecipe({
			...recipe,
			ingredients: recipe.ingredients.filter((val, index) => {
				return index != i;
			}),
		});
	};

	const fileSelected = (event) => {
		const file = event.target.files[0];
		setRecipe({ ...recipe, image: file });
	};

	// Submit function
	const submitRecipe = async (event) => {
		event.preventDefault();

		const newRecipe = await fetch("http://localhost:3000/api/recipes", {
			method: "POST",
			body: JSON.stringify(recipe),
		});
		const resp = await newRecipe.json();
		console.log(resp);
		Router.push("/" + resp.item.id);
	};

	const items = recipe.ingredients.map((item, i) => {
		return (
			<div
				key={i}
				className="flex border-2 border-red-500 bg-white hover:border-red-700"
			>
				<input
					className="flex-none w-8 bg-red-500 hover:bg-red-700 text-white md:text-center items-baseline text-lg"
					type="submit"
					onClick={(event) => {
						event.preventDefault();
						handleDel(i);
					}}
					value="x"
				/>

				<div className="flex-grow p-2">
					{item.amount} {item.measure} of {item.name}
				</div>
			</div>
		);
	});
	return (
		<>
			<div>
				<div className="border-2 border-blue-300 p-4 mx-4 md:mx-32 ">
					<div className="text-4xl tracking-widest text-center">
						CREATE NEW RECIPE
					</div>
					<br />
					<div className="text-sm grid grid-cols-2 grid-rows-8 space-y-2 md:space-y-0 gap-2">
						<form className="contents" onSubmit={submitRecipe}>
							<div className="md:row-span-3 col-span-full md:col-span-1">
								<div className="h-full border-2 border-black">
									<input
										onChange={fileSelected}
										type="file"
										name="image"
										accept="image/*"
									/>
								</div>
							</div>
							<div className="row-span-1 col-span-full md:col-span-1">
								<div className="mb-2">Name</div>
								<div className="border-2 p-2 border-black bg-white">
									<input
										name="name"
										onChange={handleChange}
										className="w-full"
										type="text"
										required
									></input>
								</div>
							</div>
							<div className="row-span-2 col-span-full md:col-span-1 ">
								<div className="mb-2">Steps</div>
								<div className="border-2 border-black ">
									<textarea
										name="steps"
										onChange={handleChange}
										rows="7"
										className="p-2 w-full"
										required
									></textarea>
								</div>
								<div className="text-xs -mt-0 underline text-gray-500 my-4">
									This field supports markdown!
								</div>
							</div>
							<div className="row-span-3 col-span-full md:col-start-2 md:col-span-1">
								<div className="mb-2">Category</div>
								<div className="border-2 p-2 border-black bg-white">
									<select
										name="category"
										onChange={handleChange}
										className="w-full"
										required
									>
										<option value="soft_drinks">
											Soft Drinks
										</option>
										<option value="juice">Juice</option>
										<option value="tea">Tea</option>
										<option value="coffee">Coffee</option>
										<option value="shake">Shake</option>
										<option value="cider">Cider</option>
										<option value="beer">Beer</option>
										<option value="wine">Wine</option>
										<option value="cocktails">
											Cocktails
										</option>
									</select>
								</div>
							</div>

							<div className="md:-mt-6 row-span-3 col-span-full md:col-start-1 md:col-span-1">
								<div className="mb-2">Ingredients</div>
								<div className="flex border-2 border-black mb-2">
									<input
										id="ingredients"
										className="flex-none border-2 border-black w-8 bg-black hover:bg-gray-700 text-white md:text-center items-baseline text-xl cursor-pointer"
										type="submit"
										onClick={handleAdd}
										value="+"
									/>
									<div className="contents">
										<select
											name="amount"
											onChange={handleIngredient}
											value={ingredient.amount}
										>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
										</select>
										<select
											name="measure"
											onChange={handleIngredient}
											value={ingredient.measure}
										>
											<option value="tsp">tsp</option>
											<option value="Tbsp">Tbsp</option>
											<option value="cups">cups</option>
											<option value="oz">oz</option>
											<option value="pint">pint</option>
											<option value="quart">quart</option>
											<option value="scoop">scoop</option>
										</select>
										<input
											name="name"
											value={ingredient.name}
											className="flex-grow p-2"
											onChange={handleIngredient}
											type="text"
											required
										></input>
									</div>
								</div>
								<div className="overscroll-auto space-y-2">
									{items}
								</div>
							</div>
							<div className="row-span-3 col-span-full md:col-start-2 md:col-span-1">
								<div className="mb-2">
									Does this drink contain alcohol?
								</div>
								<div className="border-2 p-2 border-black bg-white">
									<select
										name="alcoholic"
										onChange={handleChange}
										className="w-full"
										required
									>
										<option value="false">No</option>
										<option value="true">Yes</option>
									</select>
								</div>
							</div>
							<div className="col-span-full">
								<center>
									<input
										type="submit"
										className=" rounded-full font-semibold w-1/2 py-2 my-4 bg-blue-300 hover:bg-blue-500 cursor-pointer"
										value="CREATE"
									/>
								</center>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Create;
