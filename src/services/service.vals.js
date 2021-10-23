let API_URL = "https://api.cream.glass";
if (process.env.NODE_ENV !== "production") {
	API_URL = "http://192.168.86.32:3030";
}

export { API_URL };
