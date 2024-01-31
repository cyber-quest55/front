const colors = ['#1d39c4', '#d3adf7', '#e6fffb', '#ffa39e', '#b7eb8f'];

export const getSegmentsInPivot = (pivot: APIModels.PivotInformation): {
  name: string;
  plantingType: string;
  begin: string;
  end: string;
  plantingDate: string;
  harvestDate: string;
  color: string;
  id: string;
}[] => { 
    const newData = [];

    for (let i = 0; i < pivot?.controllerconfig?.content?.segments?.length; i++) {
      const segment = pivot?.controllerconfig?.content?.segments[i];
      const group = pivot?.controllerconfig?.segments_crop[i];

      newData.push({
        name: group.name,
        plantingType: group.segment_type,
        begin: segment.angle_start,
        end: segment.angle_end,
        plantingDate: group.crop_plant_date,
        harvestDate: group.crop_harvest_date,
        color: colors[i],
        id: `key-table-segment-${i}`,
      } as any);
    }
    return newData
}