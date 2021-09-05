import React, { useEffect, useState } from "react";
import { getAll } from "./recipe/getRecipe";
import { Link } from "react-router-dom";

export const Home = () => {
	const [recipes, setRecipes] = useState([{}]);
	const [errorMsg, setError] = useState("");
	useEffect(() => {
		getAll(1, 5)
			.then((res) => {
				setRecipes([...res.data]);
			})
			.catch((err) => {
				setError("No data available.");
			});
	}, []);
	const displayData = recipes.map((item, i) => {
		return (
			<div key={i} className="contents">
				<Link to={`/r/${item.id}`}>
					<div className="col-span-1 h-32 bg-blue-400 transition duration-400 hover:bg-blue-500">
						<div className="h-4/5"></div>
						<div className="h-1/5 bg-white">{item.title}</div>
					</div>
				</Link>
			</div>
		);
	});

	return (
		<div className="">
			<div className="block space-y-0 ">
				{/* <div className="h-56 md:h-64">
					<center>
						<img className="w-full h-full"></img>
					</center>
				</div> */}
				<div className="pt-4">
					<div className="mx-4 pb-4 text-lg">Recently Added</div>
					<center>
						<div className="mx-4 gap-2 grid grid-cols-1 md:grid-cols-5">
							{errorMsg ? errorMsg : displayData}
						</div>
					</center>
				</div>
			</div>
		</div>
	);
};
