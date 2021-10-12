import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import moment from "moment";

import { get_profile } from "../actions/user";

import { Message } from "./Message";

export const Profile = () => {
	const dispatch = useDispatch();
	const { userId } = useParams();
	const [profile, setProfile] = useState({});
	const [recipes, setRecipes] = useState([{}]);
	useEffect(() => {
		dispatch(get_profile(userId)).then((res) => {
			setProfile(res);
			setRecipes(res.recipes);
		});
	}, []);
	const displayRecipes = recipes.map((recipe, i) => {
		return (
			<div key={i}>
				<Link to={`/${recipe.id}`}>{recipe.name}</Link>
			</div>
		);
	});
	return (
		<div>
			<center>
				<Message />
				<div className="mx-4 pb-4 text-xl">{profile.fullName}</div>
				<div className="mx-4 pb-4 text-lg">Recipes</div>

				<div>{displayRecipes}</div>
			</center>
		</div>
	);
};
