import User from "../../models/user";

const Profile = ({ profile }) => {
	return (
		<div>
			<div className="mx-4 pb-4 text-xl">{profile.name}</div>
		</div>
	);
};

export const getServerSideProps = async (context) => {
	const {
		params: { profileId },
	} = context;

	const profile = await User.findOne({ id: profileId })
		.select("-hash_password -email -__v -refreshToken -_id")
		.populate(
			"recipes",
			"-ingredients -steps -details.created_by -_id -__v"
		);

	return {
		props: { profile: JSON.parse(JSON.stringify(profile)) },
	};
};

export default Profile;
