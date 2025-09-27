const useLocaleDate = (timestamp: number) => {
	const date = new Date(timestamp);
	const month = date.toLocaleString('default', { month: 'long' });
	return `${month} ${day(date.getDay())} ${date.getFullYear()}`;
};

const day = (d: number) => {
	if (d > 3 && d < 21) return d + 'th';
	switch (d % 10) {
		case 1:
			return d + 'st';
		case 2:
			return d + 'nd';
		case 3:
			return d + 'rd';
		default:
			return d + 'th';
	}
};

export default useLocaleDate;
