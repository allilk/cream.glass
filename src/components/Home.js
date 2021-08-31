import React, { useEffect, useState } from "react";
import { getAll } from "./recipe/getRecipe";
import { Link } from "react-router-dom";

export const Home = () => {
	const [recipes, setRecipes] = useState([{}]);
	useEffect(() => {
		getAll(1, 10)
			.then((res) => {
				setRecipes([...res.data]);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const displayData = recipes.map((item, i) => {
		return (
			<div key={i} className="contents">
				<Link to={`/r/${item.id}`}>
					<div className="col-span-1 h-24 md:h-48 bg-blue-400 transition duration-400 hover:bg-blue-500">
						{item.title}
					</div>
				</Link>
			</div>
		);
	});
	return (
		<div>
			<div className="block space-y-0">
				<div className="h-56 md:h-64">
					<center>
						<img className="w-full h-full"></img>
					</center>
				</div>
				<div className="pt-4 h-full bg-blue-300">
					<center>
						<div className="mx-4 gap-2 grid grid-cols-3 md:grid-cols-5">
							{displayData}
						</div>
					</center>
				</div>
			</div>
		</div>
	);
};
