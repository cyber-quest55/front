type InputObject = { [key: string]: APIModels.PowerRange[] };

const defaultDayTranslations = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
]

type GroupedConfig = {
    daysOfWeek: string[];
    timeRanges: APIModels.PowerRange[];
};

function getDayOfWeek(key: number, translations: string[] = defaultDayTranslations): string {
	const daysOfWeek = translations;
	return daysOfWeek[key];
}

function getPowerRanges(inputObject: InputObject, translations: string[] = defaultDayTranslations): GroupedConfig[] {
	const groupedConfigs: GroupedConfig[] = [];
	const groupsMap = new Map<string, GroupedConfig>();

	Object.keys(inputObject).forEach((key) => {
			const timeRanges = inputObject[key];

			const serializedTimeRanges = JSON.stringify(timeRanges);

			if (groupsMap.has(serializedTimeRanges)) {
					const existingGroup = groupsMap.get(serializedTimeRanges)!;
					existingGroup.daysOfWeek.push(getDayOfWeek(Number(key),translations));
			} else {
					const newGroup: GroupedConfig = {
							daysOfWeek: [getDayOfWeek(Number(key), translations)],
							timeRanges: timeRanges,
					};
					groupsMap.set(serializedTimeRanges, newGroup);
			}
	});

	groupedConfigs.push(...groupsMap.values());
	return groupedConfigs;
}

export { getDayOfWeek, getPowerRanges }
