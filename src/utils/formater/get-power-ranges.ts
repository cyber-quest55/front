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

export type GroupedConfig = {
    daysOfWeek: string[];
    timeRanges: APIModels.PowerRange[];
};

function getDayIndex(
	day: string,
	translations: string[] = defaultDayTranslations
): number {
	const daysOfWeek = translations;
	return daysOfWeek.indexOf(day);
}

function getAvailableDayIndices(
	groupedConfigs: GroupedConfig[],
	translations: string[] = defaultDayTranslations
): number[] {
	const allDayIndicesSet: Set<number> = new Set([0, 1, 2, 3, 4, 5, 6]);

	groupedConfigs.forEach((group) => {
			group.daysOfWeek.forEach((day) => {
					const dayIndex = getDayIndex(day, translations);
					allDayIndicesSet.delete(dayIndex);
			});
	});

	return Array.from(allDayIndicesSet);
}

function getDayOfWeek(
	key: number,
	translations: string[] = defaultDayTranslations
): string {
	const daysOfWeek = translations;
	return daysOfWeek[key];
}

function getPowerRanges(
	inputObject: InputObject,
	translations: string[] = defaultDayTranslations
): GroupedConfig[] {
	const groupedConfigs: GroupedConfig[] = [];
	const groupsMap = new Map<string, GroupedConfig>();

	Object.keys(inputObject).forEach((key) => {
			const timeRanges = inputObject[key];

			const serializedTimeRanges = JSON.stringify(timeRanges);

			if (groupsMap.has(serializedTimeRanges)) {
					const existingGroup = groupsMap.get(serializedTimeRanges)!;
					existingGroup.daysOfWeek.push(getDayOfWeek(Number(key), translations));
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

export {
	getAvailableDayIndices,
	getDayOfWeek,
	getPowerRanges,
}
