type InputObject = { [key: string]: APIModels.PowerRange[] };

type GroupedConfig = {
    daysOfWeek: string[];
    timeRanges: APIModels.PowerRange[];
};

function getDayOfWeek(key: number): string {
	const daysOfWeek = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday'
	];
	return daysOfWeek[key];
}

function getPowerRanges(inputObject: InputObject): GroupedConfig[] {
	const groupedConfigs: GroupedConfig[] = [];
	const groupsMap = new Map<string, GroupedConfig>();

	Object.keys(inputObject).forEach((key) => {
			const timeRanges = inputObject[key];

			const serializedTimeRanges = JSON.stringify(timeRanges);

			if (groupsMap.has(serializedTimeRanges)) {
					const existingGroup = groupsMap.get(serializedTimeRanges)!;
					existingGroup.daysOfWeek.push(getDayOfWeek(Number(key)));
			} else {
					const newGroup: GroupedConfig = {
							daysOfWeek: [getDayOfWeek(Number(key))],
							timeRanges: timeRanges,
					};
					groupsMap.set(serializedTimeRanges, newGroup);
			}
	});

	groupedConfigs.push(...groupsMap.values());
	return groupedConfigs;
}

export { getDayOfWeek, getPowerRanges }
