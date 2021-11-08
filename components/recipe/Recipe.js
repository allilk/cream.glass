import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import moment from "moment";
import ReactMarkdown from "react-markdown";

import { Ingredients } from "./Ingredients";
import { Message } from "../Message";
import { Header } from "./Header";
import { LoadingIcon } from "../Loading";
import thumbnail from "../../thumbnail.png";

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
		<div className="mt-6 inline-grid grid-cols-1 md:grid-cols-5 w-full overflow-x-hidden mx-4 ">
			<Header
				createdBy={Data.details.created_by._id}
				recipeId={recipeId}
			/>
			<div
				style={{
					maxHeight: "250px",
					maxWidth: "250px",
					aspectRatio: "1/1",
				}}
				className="bg-gray-200 col-span-1 mx-auto mb-4"
			>
				<div className="relative border-2 border-gray-400 rounded ">
					{!Data.image ? (
						<img src={thumbnail} width="100%" height="100%"></img>
					) : (
						<img
							className="mx-auto block"
							src={Data.image}
							alt="No Image"
							style={{
								maxHeight: "250px",
								maxWidth: "250px",
								aspectRatio: "1/1",
							}}
						></img>
					)}
				</div>
			</div>

			<div id="name" className="col-span-1 md:col-span-4">
				<div className="text-4xl ">
					<b>{Data.name}</b>
				</div>
				<div className="text-gray-500 text-sm my-2 mx-4">
					<div className="inline">Created </div>
					<div className={Data.details.created ? "inline" : "hidden"}>
						{moment(Data.details.created).format(
							"MMMM Do YYYY @ h:mm:ss a"
						)}{" "}
						by{" "}
					</div>

					<Link to={`/u/${Data.details.created_by.id}`}>
						<b>{Data.details.created_by.fullName}</b>
					</Link>
				</div>

				<div className="my-2">
					<Ingredients arr={ingredients} />
				</div>
				<div id="steps" className="md:mx-0">
					<div className="text-xl mb-2">Steps</div>
					<div className="mx-4 text-left prose-sm">
						<ReactMarkdown
							skipHtml="true"
							className="text-sm w-11/12"
						>
							{Data.steps}
						</ReactMarkdown>
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<>
			<div className="overflow-x-hidden">
				<Message />
				<div>
					{Data.name.length > 1 ? displayData : <LoadingIcon />}
				</div>
			</div>
		</>
	);
};
