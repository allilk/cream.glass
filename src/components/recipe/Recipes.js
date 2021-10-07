import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_all } from "../../actions/recipe";

export const Recipes = (props) => {
	const from = props.from;
	const to = props.to;
	const category = props.category || "";

	const dispatch = useDispatch();
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		dispatch(get_all(from, to, category)).then((res) => {
			setRecipes(res);
		});
	}, []);
	const displayData = recipes.map((item, i) => {
		return (
			<div key={i} className="contents ">
				<Link to={`/${item.id}`}>
					<div className="col-span-1 h-32 bg-blue-400 transition duration-500 hover:bg-blue-500 rounded-md transition ease-in-out transform hover:-translate-y-1 hover:scale-105">
						<div className="h-4/5"></div>
						<div className="h-1/5 bg-white rounded-b-md">
							{item.name}
						</div>
					</div>
				</Link>
			</div>
		);
	});
	return (
		<div>
			<center>
				<div className="mx-4 gap-2 grid grid-cols-1 md:grid-cols-5">
					{displayData}
				</div>
			</center>
		</div>
	);
};
