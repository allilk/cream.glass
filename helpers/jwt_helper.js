import User from "../models/user";
import Token from "../models/token";

import JWT from "jsonwebtoken";

module.exports = {
	generateAccessToken: async (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {};
			const accessTokenSecret = process.env.ACCESS_SECRET;
			const options = {
				expiresIn: "1h",
				issuer: "cream.glass",
				audience: userId.toString(),
			};
			JWT.sign(payload, accessTokenSecret, options, (err, token) => {
				if (err) {
					console.log(err.message);
					reject(err);
					return;
				}
				resolve(token);
			});
		});
	},
	verifyAccessToken: (req, res, next) => {
		const accessTokenSecret = process.env.ACCESS_SECRET;
		const refreshTokenSecret = process.env.REFRESH_SECRET;

		if (!req.headers["authorization"])
			return res.status(401).send({
				message: "Unauthorized",
			});

		const authHeader = req.headers["authorization"];
		const bearerToken = authHeader.split(" ");
		const token = bearerToken[1];

		const { refreshToken } = req.body;

		Token.findOne({ token, type: "accessToken" }, (err, result) => {
			if (!result) {
				JWT.verify(token, accessTokenSecret, (err, payload) => {
					if (err) {
						if (refreshToken) {
							JWT.verify(
								refreshToken,
								refreshTokenSecret,
								async (err, payload) => {
									if (payload) {
										const newAccessToken =
											await module.exports.generateAccessToken(
												payload
											);
										// req.newAccessToken = newAccessToken;

										req.payload = {
											...payload,
											newAccessToken,
										};
										next();
									}
								}
							);
						} else {
							const message =
								err.name === "JsonWebTokenError"
									? "Unauthorized"
									: err.message;
							return res.status(401).send({
								message,
							});
						}
					}
					req.payload = payload;
					next();
				});
			} else {
				return res.status(401).send({
					message: "Unauthorized",
				});
			}
		});
	},
	generateRefreshToken: (userId) => {
		const refreshTokenSecret = process.env.REFRESH_SECRET;
		return new Promise((resolve, reject) => {
			const payload = {};
			const options = {
				expiresIn: "1y",
				issuer: "cream.glass",
				audience: userId.toString(),
			};
			JWT.sign(payload, refreshTokenSecret, options, (err, token) => {
				if (err) {
					console.log(err.message);
					reject(err);
				}
				resolve(token);
			});
		});
	},
	verifyRefreshToken: (refreshToken) => {
		const refreshTokenSecret = process.env.REFRESH_SECRET;
		return new Promise((resolve, reject) => {
			Token.findOne(
				{ token: refreshToken, type: "refreshToken" },
				(err, result) => {
					if (result) {
						reject(result);
					}
					JWT.verify(
						refreshToken,
						refreshTokenSecret,
						(err, payload) => {
							if (err) return reject(err);
							const userId = payload.aud;
							User.findById(userId, (err, user) => {
								if (err) {
									reject(err);
									return;
								}
								if (refreshToken === user.refreshToken)
									return resolve(userId);
								reject();
							});
						}
					);
				}
			);
		});
	},
};
