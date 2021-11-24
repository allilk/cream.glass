import Link from "next/link";

const Recipe = ({ item }) => {
	return (
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
							onError={(this.src = "/thumbnail.png")}
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
	);
};

export default Recipe;
