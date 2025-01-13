const GetYearMonth = (dateParam) => {
	const date = new Date(dateParam);
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default GetYearMonth;
