import Recipes from "../components/recipe/Recipes";
import Categories from "../components/recipe/Categories";
import Message from "../components/Message";

const Home = () => {
	return (
		<div className="">
			<div className="block mx-4">
				<div className="pt-4">
					<Message />

					<div className="pb-4 text-lg font-semibold noselect">
						Categories
					</div>

					<Categories />

					<br />
					<div className="pb-4 text-lg font-semibold noselect">
						Recently Added
					</div>
					<Recipes page={1} limit={6} />
				</div>
			</div>
		</div>
	);
};

export default Home;
