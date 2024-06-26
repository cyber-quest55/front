import React, { useRef, useState } from 'react';
import { Button, CalendarPicker, CalendarPickerRef, } from 'antd-mobile';
import { CalendarOutline, LeftOutline, RightOutline } from 'antd-mobile-icons';
import { useScreenHook } from '@/hooks/screen';
import { ProFormDateTimeRangePicker, } from '@ant-design/pro-components';
import dayjs, { Dayjs } from 'dayjs';
import { rangePresets } from '@/utils/presets/RangePicker';
import { useIntl } from '@umijs/max';
import { Flex } from 'antd';
import { useMount } from 'ahooks';

type Props = {
    onConfirm?: (range: [Dayjs, Dayjs]) => void;
    title?: string;
    max?: Date;
    selectedDate: [Dayjs, Dayjs]
    format?: string;
}


const MobileRangePicker: React.FC<Props> = ({ onConfirm, selectedDate }) => {
    const { md } = useScreenHook()
    const [visible, setVisible] = useState(false);
    const [internalDate, setInternalDate] = useState<[Date, Date]>([selectedDate[0].toDate(), selectedDate[1].toDate()])
    const [rangeDate, setRangeDate] = useState<{ year: number, month: number } | undefined>()

    const intl = useIntl();
    const ref1 = useRef<CalendarPickerRef>(null)

    const handleConfirmInternal = (value: [Dayjs, Dayjs]) => {
        if (onConfirm)
            onConfirm(value);
        setVisible(false);
    };

    const superSetOnConfirm = (val: [Date, Date] | null) => {
        if (val)
            handleConfirmInternal([dayjs(val[0]), dayjs(val[1])])
    }

    const onClose = () => {
        setVisible(false)
    }

    const decrementYear = () => {
        if (ref1 && ref1.current) {
            ref1?.current.jumpTo(page => {
                const newPage = ({
                    year: page.year - 1,
                    month: page.month,
                })
                setRangeDate(newPage)

                return newPage
            })
        }
    }

    const decrementMonth = () => {
        if (ref1 && ref1.current) {
            ref1?.current.jumpTo(page => {
                const newPage = ({
                    year: page.year,
                    month: page.month - 1,
                })
                if (newPage.month === 0)
                    setRangeDate({ year: newPage.year - 1, month: 12 })
                else
                    setRangeDate(newPage)
                return newPage
            })
        }
    }

    const incrementYear = () => {
        if (ref1 && ref1.current) {
            ref1?.current.jumpTo(page => {
                const newPage = ({
                    year: page.year + 1,
                    month: page.month,
                })
                setRangeDate(newPage)
                return newPage
            })
        }
    }

    const incrementMonth = () => {
        if (ref1 && ref1.current) {
            ref1?.current.jumpTo(page => {
                const newPage = ({
                    year: page.year,
                    month: page.month + 1,
                })
                if (newPage.month > 12)
                    setRangeDate({ year: newPage.year + 1, month: 1 })
                else
                    setRangeDate(newPage)
                return newPage
            })
        }
    }

    useMount(() => {
        setRangeDate({ year: selectedDate[0].get('year'), month: selectedDate[0].get('month') })
    })

    const RenderTitle: React.FC<any> = ({ }) => {
        return <Flex gap={16} justify='center' >
            <svg height="1em" viewBox="0 0 44 44" color="#1677ff" onClick={decrementYear}>
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                    <g transform="translate(-24.000000, -22.000000)">
                        <g transform="translate(24.000000, 22.000000)">
                            <rect x={0} y={0} width={44} height={44} />
                            <g
                                transform="translate(7.000000, 4.000000)"
                                fill="currentColor"
                                fillRule="nonzero"
                            >
                                <path d="M19.4833058,2.71985611 L3.53051139,17.0699744 C3.0173831,17.5315665 2.97522952,18.3220903 3.43630803,18.8357433 L3.43630796,18.8357432 C3.46601289,18.8688164 3.49745845,18.9002801 3.53051133,18.9300007 L19.4833057,33.2801611 C20.1234001,33.8559077 20.1759552,34.8420707 19.6007967,35.4827774 C19.0256382,36.1235263 18.0404824,36.1761351 17.400388,35.6003885 L1.44759367,21.2502703 L1.4475933,21.25027 C1.33208743,21.1463692 1.22220259,21.036372 1.11840792,20.920748 C-0.49302969,19.1256817 -0.345639536,16.3628317 1.4475933,14.7497465 L17.4003877,0.399628282 C18.0404821,-0.176160428 19.0256378,-0.123509422 19.6007963,0.517239417 C20.1759548,1.1579461 20.1233997,2.14410915 19.4833053,2.7198557 L19.4833058,2.71985611 Z" />
                                <path d="M19.5305114,17.0699744 C19.0173831,17.5315665 18.9752295,18.3220903 19.436308,18.8357433 C19.4660129,18.8688164 19.4974585,18.9002801 19.5305113,18.9300007 L29.4833057,27.2801611 C30.1234001,27.8559077 30.1759552,28.8420707 29.6007967,29.4827774 C29.0256382,30.1235263 28.0404824,30.1761351 27.400388,29.6003885 L17.4475937,21.2502703 C17.3320874,21.1463692 17.2222026,21.036372 17.1184079,20.920748 C15.5069703,19.1256817 15.6543605,16.3628317 17.4475933,14.7497465 L27.4003877,6.39962828 C28.0404821,5.82383957 29.0256378,5.87649058 29.6007963,6.51723942 C30.1759548,7.1579461 30.1233997,8.14410915 29.4833053,8.7198557 L19.5305114,17.0699744 Z" />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <LeftOutline color="#1677ff" onClick={decrementMonth} />
            {<>{rangeDate && `${rangeDate.year}-${rangeDate.month < 10? '0': ''}${rangeDate.month}`}</>}
            <RightOutline color="#1677ff" onClick={incrementMonth} />
            <svg height="1em" viewBox="0 0 44 44" style={{ transform: "rotate(180deg)" }} color="#1677ff" onClick={incrementYear}>
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                    <g transform="translate(-24.000000, -22.000000)">
                        <g transform="translate(24.000000, 22.000000)">
                            <rect x={0} y={0} width={44} height={44} />
                            <g
                                transform="translate(7.000000, 4.000000)"
                                fill="currentColor"
                                fillRule="nonzero"
                            >
                                <path d="M19.4833058,2.71985611 L3.53051139,17.0699744 C3.0173831,17.5315665 2.97522952,18.3220903 3.43630803,18.8357433 L3.43630796,18.8357432 C3.46601289,18.8688164 3.49745845,18.9002801 3.53051133,18.9300007 L19.4833057,33.2801611 C20.1234001,33.8559077 20.1759552,34.8420707 19.6007967,35.4827774 C19.0256382,36.1235263 18.0404824,36.1761351 17.400388,35.6003885 L1.44759367,21.2502703 L1.4475933,21.25027 C1.33208743,21.1463692 1.22220259,21.036372 1.11840792,20.920748 C-0.49302969,19.1256817 -0.345639536,16.3628317 1.4475933,14.7497465 L17.4003877,0.399628282 C18.0404821,-0.176160428 19.0256378,-0.123509422 19.6007963,0.517239417 C20.1759548,1.1579461 20.1233997,2.14410915 19.4833053,2.7198557 L19.4833058,2.71985611 Z" />
                                <path d="M19.5305114,17.0699744 C19.0173831,17.5315665 18.9752295,18.3220903 19.436308,18.8357433 C19.4660129,18.8688164 19.4974585,18.9002801 19.5305113,18.9300007 L29.4833057,27.2801611 C30.1234001,27.8559077 30.1759552,28.8420707 29.6007967,29.4827774 C29.0256382,30.1235263 28.0404824,30.1761351 27.400388,29.6003885 L17.4475937,21.2502703 C17.3320874,21.1463692 17.2222026,21.036372 17.1184079,20.920748 C15.5069703,19.1256817 15.6543605,16.3628317 17.4475933,14.7497465 L27.4003877,6.39962828 C28.0404821,5.82383957 29.0256378,5.87649058 29.6007963,6.51723942 C30.1759548,7.1579461 30.1233997,8.14410915 29.4833053,8.7198557 L19.5305114,17.0699744 Z" />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>

        </Flex>
    }

    return (
        <>
            {!md ? <> <Button
                shape='rounded'
                onClick={() => {
                    setVisible(true);
                }}
            >
                <CalendarOutline />
            </Button>
                <CalendarPicker
                    ref={ref1}
                    title={<RenderTitle />}
                    visible={visible}
                    onClose={onClose}
                    closeOnMaskClick={false}
                    selectionMode='range'
                    confirmText={intl.formatMessage({
                        id: 'component.datepiker.oktext',
                    })}
                    onConfirm={superSetOnConfirm}
                    renderTop={() => ' '}
                    value={internalDate}
                    onChange={(val) => {
                        if (val)
                            setInternalDate(val)
                    }}
                    renderBottom={() => null}
                />
            </> : <ProFormDateTimeRangePicker
                initialValue={selectedDate}
                formItemProps={{ noStyle: true, style: { width: 260 } }}
                fieldProps={{
                    style: { width: 260 },
                    value: selectedDate as any,
                    presets: rangePresets,
                    onChange: handleConfirmInternal,
                    allowClear: false,
                    format: 'DD/MM/YYYY',
                    defaultValue: selectedDate as any
                }}
            />}

        </>
    );
};

export default MobileRangePicker;
