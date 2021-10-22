import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_all } from "../../actions/recipe";

export const Recipes = (props) => {
	const { from, to } = props;
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
			<div key={i} className="contents">
				<Link to={`/${item.id}`}>
					<div className="col-span-1 h-48 w-48 bg-gray-200 ">
						<div className="text-center border-2 border-gray-300 rounded">
							<img
								alt="No Image"
								width="250px"
								height="250px"
							></img>
						</div>
						<div className="pl-4 py-2 -mt-10 bg-dark font-medium rounded-b ">
							{item.name}
						</div>
					</div>
				</Link>
			</div>
		);
	});
	return (
		<div>
			<div className="grid grid-cols-2 md:grid-cols-7 place-items-center">
				{displayData}
			</div>
		</div>
	);
};
