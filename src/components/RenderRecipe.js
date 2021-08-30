import React, { useEffect, useState } from "react";
import { getRecipe } from "./recipe/getRecipe";
import { useSelector } from "react-redux";
import { Ingredients } from "./Ingredients";

export const RenderRecipe = (x) => {
	const identifier = x.match.params.slug;
	const { user: currentUser } = useSelector((state) => state.auth);
	const [Data, setData] = useState({
		title: "",
		steps: "",
		details: {
			created: "",
			updated_last: "",
		},
	});
	const [ingredients, setIngredients] = useState([{}]);

	useEffect(() => {
		getRecipe(identifier, currentUser.token)
			.then((res) => {
				setData({ ...res.data });
				setIngredients(res.data.ingredients);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<div>
				<div className="">
					<div id="title" className="my-4 text-4xl text-center">
						{Data.title}
					</div>
					{/* <div>Created: {Data.details.created}</div> */}
					<center>
						<hr className="w-5/6 md:w-2/3" />
					</center>
					<br />
					<Ingredients arr={ingredients} />
					<br />
					<center>
						<hr className="w-5/6 md:w-2/3" />
					</center>
					<br />
					<div id="steps" className="">
						<div className="text-xl text-center mb-6 md:mb-0">
							Steps
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
