import React, { useEffect, useState } from "react";
import Link from "next/link";

const Recipes = (props) => {
	const { page, limit, category } = props;
	// const category = props.category || "";

	const [recipes, setRecipes] = useState([]);
	useEffect(async () => {
		const response = await fetch(
			`http://localhost:3000/api/recipes?page=${page}&limit=${limit}`
		);
		const jsonData = await response.json();
		setRecipes(jsonData.items);
	}, []);

	const displayData = recipes.map((item, i) => {
		return (
			<div key={i} className="contents">
				<Link href={`/${item.id}`}>
					<div
						style={{
							maxHeight: "250px",
							maxWidth: "250px",
							aspectRatio: "1/1",
						}}
						className="col-span-1 bg-gray-200"
					>
						<div className="relative border-2 border-gray-400 rounded">
							{!item.thumbnail ? (
								<img
									src="/thumbnail.png"
									width="100%"
									height="100%"
								></img>
							) : (
								<img
									src={item.thumbnail}
									alt="No Image"
									width="100%"
									height="100%"
								></img>
							)}
						</div>
						<div className="relative pl-4 py-2 -mt-10 bg-dark font-medium rounded-b ">
							{item.name}
						</div>
					</div>
				</Link>
			</div>
		);
	});
	return (
		<div className="">
			<div className="grid grid-cols-2 md:grid-cols-6 gap-2 overflow-x-hidden mx-2">
				{displayData}
			</div>
		</div>
	);
};

export default Recipes;
