import React, { useEffect, useState } from "react";
import { getRecipe } from "./getRecipe";
// import { useSelector } from "react-redux";
import { Ingredients } from "./Ingredients";
import moment from "moment";

export const RenderRecipe = (x) => {
	const identifier = x.match.params.slug;
	// const { user: currentUser } = useSelector((state) => state.auth);
	const [Data, setData] = useState({
		title: "",
		steps: "",
		details: {
			created_by: "",
			created: "",
			updated_by: "",
			updated_last: "",
		},
	});
	const [ingredients, setIngredients] = useState([{}]);

	useEffect(() => {
		getRecipe(identifier)
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
					<center>
						<div className="text-gray-500 text-sm my-2 ">
							<div className="inline">Created </div>
							<div
								className={
									Data.details.created ? "inline" : "hidden"
								}
							>
								{moment(Data.details.created).format(
									"MMMM Do YYYY @ h:mm:ss a"
								)}
							</div>
						</div>

						<hr className="w-5/6 md:w-2/3" />
					</center>
					<br />
					<Ingredients arr={ingredients} />
					<br />
					<center>
						<hr className="w-5/6 md:w-2/3" />
					</center>
					<br />
					<div id="steps" className="text-center">
						<div className="text-xl  mb-6 md:mb-0 md:mb-2">
							Steps
						</div>
						<div className="">{Data.steps}</div>
					</div>
				</div>
			</div>
		</>
	);
};
