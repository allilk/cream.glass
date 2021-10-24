import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { get_all } from "../../actions/recipe";

import { LoadingIcon } from "../Loading";

import thumbnail from "../../thumbnail.png";

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
					<div
						style={{
							maxHeight: "250px",
							maxWidth: "250px",
							aspectRatio: "1/1",
						}}
						className="col-span-1 bg-gray-200"
					>
						<div className="relative border-2 border-gray-400 rounded">
							{!item.thumbnail ? (
								<img
									src={thumbnail}
									width="100%"
									height="100%"
								></img>
							) : (
								<img
									src={item.thumbnail}
									alt="No Image"
									width="100%"
									height="100%"
								></img>
							)}
						</div>
						<div className="relative pl-4 py-2 -mt-10 bg-dark font-medium rounded-b ">
							{item.name}
						</div>
					</div>
				</Link>
			</div>
		);
	});
	return (
		<div className="">
			<div className="grid grid-cols-2 md:grid-cols-6 gap-2 overflow-x-hidden mx-2">
				{displayData ? displayData : <LoadingIcon />}
			</div>
		</div>
	);
};
