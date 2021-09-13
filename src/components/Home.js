import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_all } from "../actions/recipe";

export const Home = () => {
	const dispatch = useDispatch();
	const [recipes, setRecipes] = useState([{}]);
	const [errorMsg, setError] = useState("");

	useEffect(() => {
		dispatch(get_all(1, 5)).then((res) => {
			setRecipes([...res]);
		});
	}, []);

	const displayData = recipes.map((item, i) => {
		return (
			<div key={i} className="contents ">
				<Link to={`/r/${item.id}`}>
					<div className="col-span-1 h-32 bg-blue-400 transition duration-500 hover:bg-blue-500 rounded-md transition ease-in-out transform hover:-translate-y-1 hover:scale-105">
						<div className="h-4/5"></div>
						<div className="h-1/5 bg-white rounded-b-md">
							{item.title}
						</div>
					</div>
				</Link>
			</div>
		);
	});
	const loadingIcon = (
		<div>
			<center>
				<br />
				<div className="lds-ripple">
					<div />
					<div />
				</div>
			</center>
		</div>
	);
	return (
		<div className="">
			<div className="block space-y-0 ">
				<div className="pt-4">
					<div className="mx-4 pb-4 text-lg">Recently Added</div>
					<center>
						<div className="mx-4 gap-2 grid grid-cols-1 md:grid-cols-5">
							{errorMsg}
							<div className={!errorMsg ? "contents" : "hidden"}>
								{displayData ? displayData : loadingIcon}
							</div>
						</div>
					</center>
				</div>
			</div>
		</div>
	);
};
