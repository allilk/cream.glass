import Link from "next/link";
import moment from "moment";
import ReactMarkdown from "react-markdown";

import Ingredients from "../components/recipe/Ingredients";

const Recipe = (props) => {
	const { item: recipe } = props;

	return (
		<div className="overflow-x-hidden md:mx-0 mx-4">
			<div className="mt-6 inline-grid grid-cols-1 md:grid-cols-5 w-full">
				<div
					style={{
						maxHeight: "250px",
						maxWidth: "250px",
						aspectRatio: "1/1",
					}}
					className="bg-gray-200 col-span-1 mx-auto mb-4"
				>
					<div className="relative border-2 border-gray-400 rounded ">
						{!recipe.image ? (
							<img
								src="/thumbnail.png"
								width="100%"
								height="100%"
							></img>
						) : (
							<img
								className="mx-auto block"
								src={recipe.image}
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
						<b>{recipe.name}</b>
					</div>
					<div className="text-gray-500 text-sm my-2 mx-4">
						<div className="inline">Created </div>
						<div
							className={
								recipe.details.created ? "inline" : "hidden"
							}
						>
							{moment(recipe.details.created).format(
								"MMMM Do YYYY @ h:mm:ss a"
							)}{" "}
							by{" "}
						</div>

						<Link href={`/u/${recipe.details.created_by.id}`}>
							<b>{recipe.details.created_by.fullName}</b>
						</Link>
					</div>

					<div className="my-2">
						<Ingredients arr={recipe.ingredients} />
					</div>
					<div id="steps" className="md:mx-0">
						<div className="text-xl mb-2">Steps</div>
						<div className="mx-4 text-left prose-sm">
							<ReactMarkdown className="text-sm w-11/12">
								{recipe.steps}
							</ReactMarkdown>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export const getStaticProps = async (context) => {
	const {
		params: { recipeId },
	} = context;

	const response = await fetch(
		`http://localhost:3000/api/recipes/${recipeId}`
	);
	const recipe = await response.json();

	return {
		props: {
			...recipe,
		},
	};
};

export const getStaticPaths = async () => {
	const response = await fetch("http://localhost:3000/api/recipes/");
	const recipes = await response.json();

	const paths = recipes.items.map((recipe) => ({
		params: { recipeId: recipe.id },
	}));
	return { paths, fallback: false };
};

export default Recipe;
