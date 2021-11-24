import { useRouter } from "next/router";

import { getAll } from "../../helpers/recipes";
import Recipe from "../../components/Recipe";
import Message from "../../components/Message";

import convertName from "../../components/helpers/format";

const Category = ({ recipes }) => {
	const router = useRouter();
	const { categoryId } = router.query;

	return (
		<>
			<div className="mx-4 pt-4">
				<div className="pb-4 text-lg font-semibold noselect">
					{convertName(categoryId)}
				</div>
				<Message />
				<div className="grid grid-cols-2 md:grid-cols-6 gap-2 overflow-x-hidden mx-2">
					{recipes.map((item, i) => {
						return (
							<div key={i} className="contents">
								<Recipe item={item} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (context) => {
	const {
		params: { categoryId },
	} = context;

	const recipes = await getAll(1, 20, categoryId);

	return {
		props: { recipes: JSON.parse(JSON.stringify(recipes)) },
	};
};

export default Category;
