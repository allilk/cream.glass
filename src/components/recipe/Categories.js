import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_categories } from "../../actions/recipe";

export const Categories = () => {
	const dispatch = useDispatch();
	const [categories, setCat] = useState([{}]);
	const convertName = (name) => {
		if (name) {
			return (
				name.charAt(0).toUpperCase() + name.slice(1).replace("_", " ")
			);
		}
	};
	useEffect(() => {
		dispatch(get_categories())
			.then((res) => {
				setCat(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const displayData = categories.map((item, i) => {
		const formattedName = convertName(item.name);
		return (
			<div key={i} className="contents">
				<Link to={`/c/${item.name}`}>
					<div className="col-span-1 bg-white rounded-md py-2">
						{formattedName}
					</div>
				</Link>
			</div>
		);
	});
	return (
		<>
			<div className="grid grid-cols-3 md:grid-cols-9 gap-1 mx-4">
				{displayData}
			</div>
		</>
	);
};
