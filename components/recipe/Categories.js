import React, { useEffect, useState } from "react";
import Link from "next/link";

import convertName from "../helpers/format";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	useEffect(async () => {
		const response = await fetch("http://localhost:3000/api/categories");
		const jsonData = await response.json();
		setCategories(jsonData.items);
	}, []);

	const displayData = categories.map((item, i) => {
		const formattedName = convertName(item.name);
		return (
			<div key={i} className="contents">
				<Link href={`/c/${item.name}`}>
					<div className="col-span-1 bg-dark rounded py-2">
						{formattedName}
					</div>
				</Link>
			</div>
		);
	});

	return (
		<div className="grid grid-cols-3 md:grid-cols-9 gap-2 mx-2 noselect text-center">
			{displayData}
		</div>
	);
};

export default Categories;
