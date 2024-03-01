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
    daysOfWeek: DayOfWeek[];
    timeRanges: APIModels.PowerRange[];
};

type DayOfWeek = {
	label: string;
	value: number;
};


function getAvailableDayIndices(
  groupedConfigs: GroupedConfig[],
): number[] {
  const allDayIndicesSet: Set<number> = new Set([0, 1, 2, 3, 4, 5, 6]);

  groupedConfigs.forEach((group) => {
    group.daysOfWeek.forEach((day) => {
      allDayIndicesSet.delete(day.value);
    });
  });

  return Array.from(allDayIndicesSet);
}

function getDayOfWeek(
	key: number,
	translations: string[] = defaultDayTranslations
): DayOfWeek {
	const daysOfWeek = translations.map((t, i) => ({
		label: t,
		value: i,
	}));
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
