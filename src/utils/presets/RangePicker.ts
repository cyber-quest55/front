import { TimeRangePickerProps } from "antd";
import dayjs from "dayjs";
import { getIntl } from "@umijs/max";

const intl = getIntl()

export const rangePresets: TimeRangePickerProps['presets'] = [
    { label: intl.formatMessage({id: 'component.presets.rangepicker'}, { value: 7 }), value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: intl.formatMessage({id: 'component.presets.rangepicker'}, { value: 14 }), value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: intl.formatMessage({id: 'component.presets.rangepicker'}, { value: 30 }), value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: intl.formatMessage({id: 'component.presets.rangepicker'}, { value: 90 }), value: [dayjs().add(-90, 'd'), dayjs()] },
  ];