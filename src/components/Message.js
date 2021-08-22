import React from "react";
import { useSelector } from "react-redux";

export const Message = () => {
	const { message } = useSelector((state) => state.message);
	return (
		<div>
			<center>
				<div className={message ? "" : "hidden"}>
					<div className="relative my-4 top-0  rounded w-5/6 md:w-1/4 bg-red-200 p-2">
						{message}
					</div>
				</div>
				<br className={message ? "hidden" : ""} />
			</center>
		</div>
	);
};
