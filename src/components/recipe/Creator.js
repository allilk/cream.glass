import React, { useState } from "react";
import { Message } from "../Message";
import { Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { add_recipe } from "../../actions/recipe";

export const Creator = (props) => {
	let ingredientVal,
		measureVal = "cups",
		amountVal = "1";

	const { user: currentUser } = useSelector((state) => state.auth);
	if (!currentUser) {
		return <Redirect to="/login" />;
	}
	const token = currentUser.token;

	const [ingredients, setIngredients] = useState([]);
	const [name, setName] = useState("");
	const [desc, setDescription] = useState("");
	const [steps, setSteps] = useState("");

	const dispatch = useDispatch();

	const onChangeVal = (e) => {
		ingredientVal = e.target.value;
	};
	const onChangeMeasure = (e) => {
		measureVal = e.target.value;
	};
	const onChangeAmount = (e) => {
		amountVal = e.target.value;
	};
	const onChangeName = (e) => {
		setName(e.target.value);
	};
	const onChangeDesc = (e) => {
		setDescription(e.target.value);
	};
	const onChangeSteps = (e) => {
		setSteps(e.target.value);
	};
	const handleAdd = (e) => {
		e.preventDefault();
		if (ingredientVal) {
			setIngredients([
				...ingredients,
				{
					amount: `${amountVal} ${measureVal}`,
					name: ingredientVal,
				},
			]);
		}
	};
	const handleDel = (i) => {
		setIngredients(
			ingredients.filter((val, index) => {
				return index != i;
			})
		);
	};
	const handleRecipe = (e) => {
		e.preventDefault();

		dispatch(
			add_recipe({ title: name, steps: desc, ingredients }, token)
		).then((x) => {
			props.history.push(`/r/${x.id}`);
			window.location.reload();
		});
	};
	const items = ingredients.map((item, i) => {
		return (
			<div className="flex border-2 border-red-500 bg-white hover:border-red-700">
				<input
					className="flex-none w-8 bg-red-500 hover:bg-red-700 text-white md:text-center items-baseline text-lg"
					type="submit"
					onClick={() => {
						handleDel(i);
					}}
					value="x"
				/>

				<div key={i} className="flex-grow p-2">
					{item.amount} of {item.name}
				</div>
			</div>
		);
	});
	return (
		<>
			<div>
				<Message />

				<div className="border-2 border-blue-300 p-4 mx-4 md:mx-32 ">
					<div className="text-4xl tracking-widest text-center">
						CREATE NEW RECIPE
					</div>
					<br />
					<div className="text-sm grid grid-cols-2 grid-rows-8 space-y-2 md:space-y-0 gap-2">
						<form className="contents" onSubmit={handleRecipe}>
							<div className="md:row-span-3 col-span-full md:col-span-1">
								<div className="h-full border-2 border-black">
									<div className="">image</div>
								</div>
							</div>
							<div className="row-span-1 col-span-full md:col-span-1">
								<div className="mb-2">Name</div>
								<div className="border-2 p-2 border-black bg-white">
									<input
										onChange={onChangeName}
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
										onChange={onChangeDesc}
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
									<input
										// onChange={}
										className="w-full"
										type="text"
										required
									></input>
								</div>
							</div>
							<div className="md:-mt-6 row-span-3 col-span-full md:col-start-1 md:col-span-1">
								<div className="mb-2">Ingredients</div>
								<div className="flex border-2 border-black mb-2">
									<input
										className="flex-none border-2 border-black w-8 bg-black hover:bg-gray-700 text-white md:text-center items-baseline text-xl"
										type="submit"
										onClick={handleAdd}
										value="+"
									/>
									<div className="contents">
										<select onChange={onChangeAmount}>
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
										<select onChange={onChangeMeasure}>
											<option value="tsp">tsp</option>
											<option value="Tbsp">Tbsp</option>
											<option value="cups">cups</option>
											<option value="oz">oz</option>
											<option value="pint">pint</option>
											<option value="quart">quart</option>
											<option value="scoop">scoop</option>
										</select>
										<input
											className="flex-grow p-2"
											onChange={onChangeVal}
											type="text"
											required
										></input>
									</div>
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
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
