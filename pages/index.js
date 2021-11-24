import Link from "next/link";
import useSWR, { SWRConfig } from "swr";

import Message from "../components/Message";
import convertName from "../components/helpers/format";

import { getAll } from "../helpers/recipes";
import { getCategories } from "../helpers/categories";

const Home = ({ recipes, categories }) => {
	return (
		<div className="">
			<div className="block mx-4">
				<div className="pt-4">
					<Message />
					<div className="pb-4 text-lg font-semibold noselect">
						Categories
					</div>
					<div className="grid grid-cols-3 md:grid-cols-9 gap-2 mx-2 noselect text-center">
						{categories.map((item, i) => {
							return (
								<div key={i} className="contents">
									<Link href={`/c/${item.name}`}>
										<div className="col-span-1 bg-dark rounded py-2">
											{convertName(item.name)}
										</div>
									</Link>
								</div>
							);
						})}
					</div>

					<br />
					<div className="pb-4 text-lg font-semibold noselect">
						Recently Added
					</div>
					<div className="grid grid-cols-2 md:grid-cols-6 gap-2 overflow-x-hidden mx-2">
						{recipes.map((item, i) => {
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
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticProps = async () => {
	const recipes = await getAll();
	const categories = await getCategories();

	return {
		props: {
			recipes: JSON.parse(JSON.stringify(recipes)),
			categories: JSON.parse(JSON.stringify(categories)),
		},
	};
};

export default Home;
