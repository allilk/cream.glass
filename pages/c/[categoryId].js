import { useRouter } from "next/router";

import Recipes from "../../components/recipe/Recipes";
import Message from "../../components/Message";

import convertName from "../../components/helpers/format";

const Category = (params) => {
	const router = useRouter();
	const { categoryId } = router.query;

	return (
		<div className="mx-4 pt-4">
			<div className="pb-4 text-lg font-semibold noselect">
				{convertName(categoryId)}
			</div>
			<Message />
			<Recipes from={1} to={20} category={categoryId} />
		</div>
	);
};

// export const getStaticProps = async (context) => {
// 	const {
// 		params: { categoryId },
// 	} = context;

// 	return { props: { categoryId } };
// };

export default Category;
