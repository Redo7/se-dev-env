const useRelativeTime = (timestamp: number) => {
	const now = Date.now();
	const elapsed = now - timestamp;

	const msPerSecond = 1000;
	const msPerMinute = 60 * msPerSecond;
	const msPerHour = 60 * msPerMinute;
	const msPerDay = 24 * msPerHour;
	const msPerMonth = 30 * msPerDay;
	const msPerYear = 365 * msPerDay;

	const absElapsed = Math.abs(elapsed);

	let value: number;
	let unit: string;

	if (absElapsed < msPerMinute) {
		value = Math.round(absElapsed / msPerSecond);
		unit = 'second';
	} else if (absElapsed < msPerHour) {
		value = Math.round(absElapsed / msPerMinute);
		unit = 'minute';
	} else if (absElapsed < msPerDay) {
		value = Math.round(absElapsed / msPerHour);
		unit = 'hour';
	} else if (absElapsed < msPerMonth) {
		value = Math.round(absElapsed / msPerDay);
		unit = 'day';
	} else if (absElapsed < msPerYear) {
		value = Math.round(absElapsed / msPerMonth);
		unit = 'month';
	} else {
		value = Math.round(absElapsed / msPerYear);
		unit = 'year';
	}

	if (value !== 1) unit += 's';

	if (elapsed >= 0) {
		return `${value} ${unit} ago`;
	} else {
		return `in ${value} ${unit}`;
	}
};

export default useRelativeTime;
