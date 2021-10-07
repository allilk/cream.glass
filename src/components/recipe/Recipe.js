import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import moment from "moment";
import ReactMarkdown from "react-markdown";

import { Ingredients } from "./Ingredients";
import { Message } from "../Message";

import { get_recipe } from "../../actions/recipe";

export const Recipe = (x) => {
	const identifier = x.match.params.slug;
	const dispatch = useDispatch();
	// const { user: currentUser } = useSelector((state) => state.auth);
	const [Data, setData] = useState({
		name: "",
		steps: "",
		details: {
			created_by: {
				_id: "",
				id: "",
				fullName: "",
			},
			created: "",
			updated_by: "",
			updated_last: "",
		},
	});
	const [ingredients, setIngredients] = useState([{}]);

	useEffect(() => {
		dispatch(get_recipe(identifier))
			.then((res) => {
				setData({ ...res });
				setIngredients(res.ingredients);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const displayData = (
		<div className="">
			<div id="name" className="my-4 text-4xl text-center">
				{Data.name}
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

					<Link to={`/u/${Data.details.created_by.id}`}>
						{Data.details.created_by.fullName}
					</Link>
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
			<Message />
			<div>{Data.name.length > 1 ? displayData : loadingIcon}</div>
		</>
	);
};