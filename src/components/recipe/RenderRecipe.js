import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Ingredients } from "./Ingredients";
import moment from "moment";
import { get_recipe } from "../../actions/recipe";
import { get_profile } from "../../actions/user";
import ReactMarkdown from "react-markdown";

export const RenderRecipe = (x) => {
	const identifier = x.match.params.slug;
	const dispatch = useDispatch();
	// const { user: currentUser } = useSelector((state) => state.auth);
	const [User, setUser] = useState("");
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
		dispatch(get_recipe(identifier))
			.then((res) => {
				dispatch(get_profile(res.data.details.created_by)).then(
					(res) => {
						setUser(res.fullName);
					}
				);
				setData({ ...res.data });
				setIngredients(res.data.ingredients);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const displayData = (
		<div className="">
			<div id="title" className="my-4 text-4xl text-center">
				{Data.title}
			</div>
			<center>
				<div className="text-gray-500 text-sm my-2 ">
					<div className="inline">Created </div>
					<div className={Data.details.created ? "inline" : "hidden"}>
						{moment(Data.details.created).format(
							"MMMM Do YYYY @ h:mm:ss a"
						)}{" "}
						by{" "}
					</div>

					<Link to={`/u/${Data.details.created_by}`}>{User}</Link>
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
				<div className="text-xl  mb-6 md:mb-0 md:mb-2">Steps</div>
				<div className="">
					<ReactMarkdown>{Data.steps}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
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
		<>
			<div>{Data.title.length > 1 ? displayData : loadingIcon}</div>
		</>
	);
};
