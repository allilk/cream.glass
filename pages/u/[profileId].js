// import Link from "next/link";
// import moment from "moment";

const Profile = (props) => {
	const { user: profile } = props;
	return (
		<div>
			<div className="mx-4 pb-4 text-xl">{profile.name}</div>
		</div>
	);
};

export const getStaticProps = async (context) => {
	const {
		params: { profileId },
	} = context;

	const response = await fetch(
		`http://localhost:3000/api/user/profile/${profileId}`
	);
	const profile = await response.json();

	return {
		props: {
			...profile,
		},
	};
};

export const getStaticPaths = async () => {
	const response = await fetch("http://localhost:3000/api/user/profile");
	const profiles = await response.json();

	const paths = profiles.users.map((profile) => ({
		params: { profileId: profile.id },
	}));
	return { paths, fallback: false };
};

export default Profile;
