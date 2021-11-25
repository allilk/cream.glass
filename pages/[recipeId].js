import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import useSWR, { SWRConfig } from "swr";
import ReactMarkdown from "react-markdown";
import moment from "moment";

import Ingredients from "../components/recipe/Ingredients";

import { getRecipe, getAll } from "../helpers/recipes";

export const getStaticPaths = async () => {
	const recipes = await getAll();
	const paths = recipes.map((recipe) => ({
		params: { recipeId: recipe.id },
	}));
	return { paths, fallback: "blocking" };
};
export const getStaticProps = async ({ params }) => {
	const { recipeId } = params;

	if (!recipeId) {
		return { props: {}, notFound: true };
	}
	let recipe;
	try {
		recipe = await getRecipe(recipeId);
	} catch (err) {}
	return recipe
		? {
				props: {
					fallback: {
						"/api/recipes/": JSON.parse(JSON.stringify(recipe)),
					},
				},
				revalidate: 60 * 30,
		  }
		: { props: {}, notFound: true };
};
const Recipe = () => {
	const {
		isFallback,
		query: { recipeId },
	} = useRouter();

	const fetcher = (url) =>
		fetch(url + `/${recipeId}`, {
			method: "GET",
			header: {
				"Content-Type": "applicaton/json",
			},
		}).then((res) => res.json());

	const { data: recipe } = useSWR("/api/recipes/", fetcher);

	return !recipe && isFallback ? (
		<div>Loading...</div>
	) : (
		<div className="overflow-x-hidden md:mx-0 mx-4">
			<Head>
				<title>{recipe.name}</title>
				<meta content={recipe.steps} name="og:description" />
				<meta
					content={recipe.image ? recipe.image : "/thumbnail.png"}
					name="og:image"
				/>
				<meta
					content={
						recipe.name + " by " + recipe.details.created_by.name
					}
					property="og:title"
				/>
			</Head>
			<div className="mt-6 inline-grid grid-cols-1 md:grid-cols-5 w-full">
				<div
					className="bg-gray-200 col-span-1 mx-auto mb-4"
					style={{
						maxHeight: "250px",
						maxWidth: "250px",
						aspectRatio: "1/1",
					}}
				>
					<div
						className="relative border-2 border-gray-400 rounded "
						style={{
							width: "250px",
							height: "250px",
						}}
					>
						{!recipe.image ? (
							<Image
								src="/thumbnail.png"
								layout="fill"
								objectFit="contain"
							></Image>
						) : (
							<Image
								className="mx-auto block"
								src={recipe.image}
								layout="fill"
								objectFit="contain"
								alt="No Image"
							></Image>
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
							<b>{recipe.details.created_by.name}</b>
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

export default function Page({ fallback }) {
	return (
		<SWRConfig value={{ fallback }}>
			<Recipe />
		</SWRConfig>
	);
}
