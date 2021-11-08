import React from "react";
import { useSelector } from "react-redux";

export const LoadingIcon = () => {
	const { message } = useSelector((state) => state.message);
	return message ? (
		""
	) : (
		<div className="text-center">
			<div className="lds-ripple">
				<div />
				<div />
			</div>
		</div>
	);
};
