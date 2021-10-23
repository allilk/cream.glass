import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import moment from "moment";
import ReactMarkdown from "react-markdown";

import { Ingredients } from "./Ingredients";
import { Message } from "../Message";
import { Header } from "./Header";
import { LoadingIcon } from "../Loading";

import { get_recipe } from "../../actions/recipe";

export const Recipe = () => {
	const { recipeId } = useParams();

	const dispatch = useDispatch();
	// const { user: currentUser } = useSelector((state) => state.auth);
	const [Data, setData] = useState({
		name: "",
		image: "",
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
		dispatch(get_recipe(recipeId)).then((res) => {
			setData({ ...res });
			setIngredients(res.ingredients);
		});
	}, []);
	const displayData = (
		<div className="">
			<Header
				createdBy={Data.details.created_by._id}
				recipeId={recipeId}
			/>
			<center>
				<img src={Data.image} />
			</center>
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
	return (
		<>
			<Message />
			<div>{Data.name.length > 1 ? displayData : <LoadingIcon />}</div>
		</>
	);
};
