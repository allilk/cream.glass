import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { delete_recipe } from "../../actions/recipe";

export const Header = (props) => {
	const dispatch = useDispatch();
	const { createdBy, recipeId } = props;
	const { user: currentUser } = useSelector((state) => state.auth);

	const editRecipe = () => {};

	const deleteRecipe = () => {
		dispatch(delete_recipe(recipeId, currentUser.accessToken)).then(() => {
			window.location.replace("/");
		});
	};

	if (currentUser && currentUser._id == createdBy) {
		return (
			<div className="mt-2 mx-2 space-x-1 text-right">
				<button
					onClick={editRecipe}
					className="align-middle bg-blue-500 hover:bg-blue-700  w-20 py-1 text-white rounded-md"
				>
					Edit
				</button>
				<button
					onClick={deleteRecipe}
					className="align-middle bg-red-500 hover:bg-red-700 w-20 py-1 text-white rounded-md"
				>
					Delete
				</button>
			</div>
		);
	}
	return "";
};
