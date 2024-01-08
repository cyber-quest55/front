import { useScreenHook } from '@/hooks/screen';
import { useTabsHook } from '@/hooks/tabs';
import { GetPivotModelProps } from '@/models/pivot';
import { GetPivotHistoryModelProps } from '@/models/pivot-history';
import { GetPivotInformationModelProps } from '@/models/pivot-information';
import { GetPivotReportModelProps } from '@/models/pivot-report';
import {
  SelectedDeviceModelProps,
  setDeviceClose,
  setSelectedDevice,
} from '@/models/selected-device';
import { DeviceType } from '@/utils/enum/device-type';
import { G2, Line, Pie } from '@ant-design/plots';
import { ProCard, ProSkeleton, StatisticCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max';
import { Col, Modal, Row } from 'antd';
import { useState } from 'react';
import { connect } from 'umi';
import DeviceMapsRender from '../DeviceMapsRender';
import DevicePanelContainer from '../DevicePanel/DevicePanelContainer';
import SkeletonList from '../Skeletons/List';
import SkeletonPieChart from '../Skeletons/PieChart';
import SkeletonStatistic from '../Skeletons/Statistic';
import PivotEventTable from '../Tables/PivotEventTable';
import PivotOperationTable from '../Tables/PivotOperationTable';

const { Statistic } = StatisticCard;

const GetPivotPressureComparative = {
  comparison_pressure_by_angles: {
    '0': { water_pressure: 2.457777777777778 },
    '1': { water_pressure: 2.443589743589744 },
    '2': { water_pressure: 2.457777777777778 },
    '3': { water_pressure: 2.443589743589744 },
    '4': { water_pressure: 2.452464872588712 },
    '5': { water_pressure: 2.4622687941573393 },
    '6': { water_pressure: 2.464512383900929 },
    '7': { water_pressure: 2.4825435729847496 },
    '8': { water_pressure: 2.500925925925926 },
    '9': { water_pressure: 2.5342592592592594 },
    '10': { water_pressure: 2.5387254901960787 },
    '11': { water_pressure: 2.5477941176470593 },
    '12': { water_pressure: 2.5686274509803924 },
    '13': { water_pressure: 2.58109243697479 },
    '14': { water_pressure: 2.599107142857143 },
    '15': { water_pressure: 2.599107142857143 },
    '16': { water_pressure: 2.612132352941176 },
    '17': { water_pressure: 2.610049019607843 },
    '18': { water_pressure: 2.61671568627451 },
    '19': { water_pressure: 2.6219444444444444 },
    '20': { water_pressure: 2.62562091503268 },
    '21': { water_pressure: 2.6252042483660136 },
    '22': { water_pressure: 2.626593137254902 },
    '23': { water_pressure: 2.636698717948718 },
    '24': { water_pressure: 2.639337606837607 },
    '25': { water_pressure: 2.64017094017094 },
    '26': { water_pressure: 2.6305555555555555 },
    '27': { water_pressure: 2.6300000000000003 },
    '28': { water_pressure: 2.627083333333333 },
    '29': { water_pressure: 2.6282738095238094 },
    '30': { water_pressure: 2.62827380952381 },
    '31': { water_pressure: 2.626190476190476 },
    '32': { water_pressure: 2.626470588235294 },
    '33': { water_pressure: 2.6276610644257703 },
    '34': { water_pressure: 2.6263452749520866 },
    '35': { water_pressure: 2.618624686716792 },
    '36': { water_pressure: 2.604656432748538 },
    '37': { water_pressure: 2.599490740740741 },
    '38': { water_pressure: 2.5934858387799564 },
    '39': { water_pressure: 2.588671023965142 },
    '40': { water_pressure: 2.5868191721132896 },
    '41': { water_pressure: 2.5824074074074077 },
    '42': { water_pressure: 2.5833333333333335 },
    '43': { water_pressure: 2.575 },
    '44': { water_pressure: 2.566666666666667 },
    '45': { water_pressure: 2.5694444444444446 },
    '46': { water_pressure: 2.560130718954248 },
    '47': { water_pressure: 2.5590196078431373 },
    '48': { water_pressure: 2.54703130374957 },
    '49': { water_pressure: 2.543249791144528 },
    '50': { water_pressure: 2.539458941471325 },
    '51': { water_pressure: 2.5281139122315595 },
    '52': { water_pressure: 2.5273202614379087 },
    '53': { water_pressure: 2.5244444444444443 },
    '54': { water_pressure: 2.5133333333333336 },
    '55': { water_pressure: 2.502222222222222 },
    '56': { water_pressure: 2.4776470588235298 },
    '57': { water_pressure: 2.475424836601307 },
    '58': { water_pressure: 2.4558169934640524 },
    '59': { water_pressure: 2.449281045751634 },
    '60': { water_pressure: 2.445889232886137 },
    '61': { water_pressure: 2.4410526315789474 },
    '62': { water_pressure: 2.4397454420364633 },
    '63': { water_pressure: 2.42239651416122 },
    '64': { water_pressure: 2.4201742919389977 },
    '65': { water_pressure: 2.402037037037037 },
    '66': { water_pressure: 2.396111111111111 },
    '67': { water_pressure: 2.371797385620915 },
    '68': { water_pressure: 2.3690196078431374 },
    '69': { water_pressure: 2.3594771241830066 },
    '70': { water_pressure: 2.3562908496732025 },
    '71': { water_pressure: 2.3445949432404536 },
    '72': { water_pressure: 2.3313596491228066 },
    '73': { water_pressure: 2.3267027863777088 },
    '74': { water_pressure: 2.3185574229691874 },
    '75': { water_pressure: 2.3141456582633055 },
    '76': { water_pressure: 2.304548135043491 },
    '77': { water_pressure: 2.2923632610939113 },
    '78': { water_pressure: 2.2817750257997935 },
    '79': { water_pressure: 2.2761220043572985 },
    '80': { water_pressure: 2.274814814814815 },
    '81': { water_pressure: 2.258564814814815 },
    '82': { water_pressure: 2.251937134502924 },
    '83': { water_pressure: 2.2452704678362574 },
    '84': { water_pressure: 2.250409356725146 },
    '85': { water_pressure: 2.248888888888889 },
    '86': { water_pressure: 2.251851851851852 },
    '87': { water_pressure: 2.252962962962963 },
    '88': { water_pressure: 2.248148148148148 },
    '89': { water_pressure: 2.256712962962963 },
    '90': { water_pressure: 2.252546296296296 },
    '91': { water_pressure: 2.2624999999999997 },
    '92': { water_pressure: 2.252083333333333 },
    '93': { water_pressure: 2.263657407407407 },
    '94': { water_pressure: 2.2594907407407407 },
    '95': { water_pressure: 2.2672685185185184 },
    '96': { water_pressure: 2.270277777777778 },
    '97': { water_pressure: 2.275057189542484 },
    '98': { water_pressure: 2.2817238562091506 },
    '99': { water_pressure: 2.283807189542484 },
    '100': { water_pressure: 2.2917592592592593 },
    '101': { water_pressure: 2.2939814814814814 },
    '102': { water_pressure: 2.3016569200779724 },
    '103': { water_pressure: 2.301425438596491 },
    '104': { water_pressure: 2.2992032163742686 },
    '105': { water_pressure: 2.30125 },
    '106': { water_pressure: 2.3033333333333332 },
    '107': { water_pressure: 2.305555555555556 },
    '108': { water_pressure: 2.2937499999999997 },
    '109': { water_pressure: 2.3065705128205125 },
    '110': { water_pressure: 2.3183352187028654 },
    '111': { water_pressure: 2.332428355957768 },
    '112': { water_pressure: 2.343417366946779 },
    '113': { water_pressure: 2.3420693277310924 },
    '114': { water_pressure: 2.352174908424908 },
    '115': { water_pressure: 2.3579950142450143 },
    '116': { water_pressure: 2.3788283475783474 },
    '117': { water_pressure: 2.389451058201058 },
    '118': { water_pressure: 2.398710317460317 },
    '119': { water_pressure: 2.407936507936508 },
    '120': { water_pressure: 2.4205415499533145 },
    '121': { water_pressure: 2.423874883286648 },
    '122': { water_pressure: 2.4262558356676003 },
    '123': { water_pressure: 2.4321381886087767 },
    '124': { water_pressure: 2.4330532212885156 },
    '125': { water_pressure: 2.442279411764706 },
    '126': { water_pressure: 2.440458683473389 },
    '127': { water_pressure: 2.450654761904762 },
    '128': { water_pressure: 2.443669467787115 },
    '129': { water_pressure: 2.4495424836601303 },
    '130': { water_pressure: 2.4425054466230933 },
    '131': { water_pressure: 2.4569312169312165 },
    '132': { water_pressure: 2.464794464794465 },
    '133': { water_pressure: 2.4734001292824823 },
    '134': { water_pressure: 2.472209653092006 },
    '135': { water_pressure: 2.460294117647059 },
    '136': { water_pressure: 2.463725490196078 },
    '137': { water_pressure: 2.467296918767507 },
    '138': { water_pressure: 2.481776556776557 },
    '139': { water_pressure: 2.4952380952380953 },
    '140': { water_pressure: 2.492857142857143 },
    '141': { water_pressure: 2.495763125763126 },
    '142': { water_pressure: 2.493015873015873 },
    '143': { water_pressure: 2.5052869352869354 },
    '144': { water_pressure: 2.5152014652014656 },
    '145': { water_pressure: 2.5217094017094017 },
    '146': { water_pressure: 2.5165811965811966 },
    '147': { water_pressure: 2.526837606837607 },
    '148': { water_pressure: 2.517948717948718 },
    '149': { water_pressure: 2.5227106227106226 },
    '150': { water_pressure: 2.5238095238095237 },
    '151': { water_pressure: 2.5285714285714285 },
    '152': { water_pressure: 2.532142857142857 },
    '153': { water_pressure: 2.525 },
    '154': { water_pressure: 2.5226190476190475 },
    '155': { water_pressure: 2.5309523809523813 },
    '156': { water_pressure: 2.530812324929972 },
    '157': { water_pressure: 2.5438159879336353 },
    '158': { water_pressure: 2.5374057315233784 },
    '159': { water_pressure: 2.5423076923076926 },
    '160': { water_pressure: 2.5531135531135534 },
    '161': { water_pressure: 2.556746031746032 },
    '162': { water_pressure: 2.5534126984126986 },
    '163': { water_pressure: 2.542777777777778 },
    '164': { water_pressure: 2.544040404040404 },
    '165': { water_pressure: 2.5428282828282827 },
    '166': { water_pressure: 2.5503496503496503 },
    '167': { water_pressure: 2.5608391608391607 },
    '168': { water_pressure: 2.574908424908425 },
    '169': { water_pressure: 2.5740537240537242 },
    '170': { water_pressure: 2.575685425685426 },
    '171': { water_pressure: 2.575135975135975 },
    '172': { water_pressure: 2.5743423243423242 },
    '173': { water_pressure: 2.5752747252747255 },
    '174': { water_pressure: 2.575824175824176 },
    '175': { water_pressure: 2.5723443223443225 },
    '176': { water_pressure: 2.5620879120879123 },
    '177': { water_pressure: 2.5664529914529917 },
    '178': { water_pressure: 2.5818376068376065 },
    '179': { water_pressure: 2.586111111111111 },
    '180': { water_pressure: 2.577777777777778 },
    '181': { water_pressure: 2.572649572649573 },
    '182': { water_pressure: 2.5793162393162397 },
    '183': { water_pressure: 2.5852991452991456 },
    '184': { water_pressure: 2.5832844932844936 },
    '185': { water_pressure: 2.5826007326007328 },
    '186': { water_pressure: 2.58495115995116 },
    '187': { water_pressure: 2.5778083028083025 },
    '188': { water_pressure: 2.570115995115995 },
    '189': { water_pressure: 2.56007326007326 },
    '190': { water_pressure: 2.56007326007326 },
    '191': { water_pressure: 2.552380952380952 },
    '192': { water_pressure: 2.5485347985347984 },
    '193': { water_pressure: 2.537179487179487 },
    '194': { water_pressure: 2.53974358974359 },
    '195': { water_pressure: 2.5326007326007325 },
    '196': { water_pressure: 2.5368131868131867 },
    '197': { water_pressure: 2.5305194805194806 },
    '198': { water_pressure: 2.5261238761238762 },
    '199': { water_pressure: 2.51977466977467 },
    '200': { water_pressure: 2.510683760683761 },
    '201': { water_pressure: 2.5077777777777777 },
    '202': { water_pressure: 2.5093650793650792 },
    '203': { water_pressure: 2.507281746031746 },
    '204': { water_pressure: 2.5122023809523806 },
    '205': { water_pressure: 2.502281746031746 },
    '206': { water_pressure: 2.4966727716727717 },
    '207': { water_pressure: 2.4844017094017095 },
    '208': { water_pressure: 2.4794871794871796 },
    '209': { water_pressure: 2.484798534798535 },
    '210': { water_pressure: 2.478815628815629 },
    '211': { water_pressure: 2.482063492063492 },
    '212': { water_pressure: 2.4606349206349205 },
    '213': { water_pressure: 2.455079365079365 },
    '214': { water_pressure: 2.4404761904761902 },
    '215': { water_pressure: 2.4499999999999997 },
    '216': { water_pressure: 2.4488888888888893 },
    '217': { water_pressure: 2.4387698412698415 },
    '218': { water_pressure: 2.435106837606838 },
    '219': { water_pressure: 2.42724358974359 },
    '220': { water_pressure: 2.435576923076923 },
    '221': { water_pressure: 2.4262529137529136 },
    '222': { water_pressure: 2.427449494949495 },
    '223': { water_pressure: 2.423838383838384 },
    '224': { water_pressure: 2.4273015873015873 },
    '225': { water_pressure: 2.4239682539682534 },
    '226': { water_pressure: 2.4195238095238096 },
    '227': { water_pressure: 2.4028571428571426 },
    '228': { water_pressure: 2.404444444444444 },
    '229': { water_pressure: 2.4022222222222225 },
    '230': { water_pressure: 2.411216931216931 },
    '231': { water_pressure: 2.3996296296296293 },
    '232': { water_pressure: 2.4029629629629627 },
    '233': { water_pressure: 2.4029629629629627 },
    '234': { water_pressure: 2.4051851851851853 },
    '235': { water_pressure: 2.397065527065527 },
    '236': { water_pressure: 2.3952136752136752 },
    '237': { water_pressure: 2.4057692307692307 },
    '238': { water_pressure: 2.4107142857142856 },
    '239': { water_pressure: 2.412468671679198 },
    '240': { water_pressure: 2.413939259914492 },
    '241': { water_pressure: 2.4210821170573493 },
    '242': { water_pressure: 2.4172443977591036 },
    '243': { water_pressure: 2.427048319327731 },
    '244': { water_pressure: 2.427941176470588 },
    '245': { water_pressure: 2.43891339869281 },
    '246': { water_pressure: 2.4443055555555553 },
    '247': { water_pressure: 2.471984126984127 },
    '248': { water_pressure: 2.4964285714285714 },
    '249': { water_pressure: 2.5142857142857142 },
    '250': { water_pressure: 2.516931216931217 },
    '251': { water_pressure: 2.5323158323158323 },
    '252': { water_pressure: 2.5365175129881012 },
    '253': { water_pressure: 2.5362529627235513 },
    '254': { water_pressure: 2.543785014005602 },
    '255': { water_pressure: 2.551628151260504 },
    '256': { water_pressure: 2.5778186274509807 },
    '257': { water_pressure: 2.5815686274509804 },
    '258': { water_pressure: 2.589166666666667 },
    '259': { water_pressure: 2.5870833333333336 },
    '260': { water_pressure: 2.59375 },
    '261': { water_pressure: 2.600138888888889 },
    '262': { water_pressure: 2.6133333333333333 },
    '263': { water_pressure: 2.6152941176470588 },
    '264': { water_pressure: 2.617833800186741 },
    '265': { water_pressure: 2.61297268907563 },
    '266': { water_pressure: 2.6176785714285713 },
    '267': { water_pressure: 2.62125 },
    '268': { water_pressure: 2.6283333333333334 },
    '269': { water_pressure: 2.625833333333334 },
    '270': { water_pressure: 2.628026315789474 },
    '271': { water_pressure: 2.6258040935672518 },
    '272': { water_pressure: 2.6403874269005847 },
    '273': { water_pressure: 2.6454166666666663 },
    '274': { water_pressure: 2.6462103174603175 },
    '275': { water_pressure: 2.6399603174603175 },
    '276': { water_pressure: 2.6377380952380953 },
    '277': { water_pressure: 2.636944444444444 },
    '278': { water_pressure: 2.6431944444444446 },
    '279': { water_pressure: 2.6553513071895423 },
    '280': { water_pressure: 2.675490196078431 },
    '281': { water_pressure: 2.6757878151260504 },
    '282': { water_pressure: 2.681547619047619 },
    '283': { water_pressure: 2.6817791005291007 },
    '284': { water_pressure: 2.6827314814814813 },
    '285': { water_pressure: 2.6803703703703703 },
    '286': { water_pressure: 2.6733333333333333 },
    '287': { water_pressure: 2.6768627450980387 },
    '288': { water_pressure: 2.67922385620915 },
    '289': { water_pressure: 2.677001633986928 },
    '290': { water_pressure: 2.6826388888888886 },
    '291': { water_pressure: 2.6669444444444443 },
    '292': { water_pressure: 2.667529239766082 },
    '293': { water_pressure: 2.665813553491572 },
    '294': { water_pressure: 2.67109133126935 },
    '295': { water_pressure: 2.6649509803921574 },
    '296': { water_pressure: 2.6663888888888887 },
    '297': { water_pressure: 2.6651633986928105 },
    '298': { water_pressure: 2.670718954248366 },
    '299': { water_pressure: 2.6480800653594776 },
    '300': { water_pressure: 2.638888888888889 },
    '301': { water_pressure: 2.6203703703703702 },
    '302': { water_pressure: 2.6219635076252725 },
    '303': { water_pressure: 2.6157135076252724 },
    '304': { water_pressure: 2.6231209150326795 },
    '305': { water_pressure: 2.6102777777777777 },
    '306': { water_pressure: 2.608333333333334 },
    '307': { water_pressure: 2.597222222222222 },
    '308': { water_pressure: 2.593888888888889 },
    '309': { water_pressure: 2.5872222222222225 },
    '310': { water_pressure: 2.5605555555555557 },
    '311': { water_pressure: 2.550138888888889 },
    '312': { water_pressure: 2.539768518518519 },
    '313': { water_pressure: 2.5569113756613757 },
    '314': { water_pressure: 2.57010582010582 },
    '315': { water_pressure: 2.5644078144078146 },
    '316': { water_pressure: 2.5582453494218202 },
    '317': { water_pressure: 2.5388009049773754 },
    '318': { water_pressure: 2.5301470588235295 },
    '319': { water_pressure: 2.5180555555555553 },
    '320': { water_pressure: 2.516388888888889 },
    '321': { water_pressure: 2.517777777777778 },
    '322': { water_pressure: 2.5163888888888892 },
    '323': { water_pressure: 2.515277777777778 },
    '324': { water_pressure: 2.515277777777778 },
    '325': { water_pressure: 2.515032679738562 },
    '326': { water_pressure: 2.50359477124183 },
    '327': { water_pressure: 2.4901960784313726 },
    '328': { water_pressure: 2.480392156862745 },
    '329': { water_pressure: 2.4840522875816995 },
    '330': { water_pressure: 2.4718954248366014 },
    '331': { water_pressure: 2.4600000000000004 },
    '332': { water_pressure: 2.4455555555555555 },
    '333': { water_pressure: 2.443986928104575 },
    '334': { water_pressure: 2.445098039215686 },
    '335': { water_pressure: 2.4480392156862743 },
    '336': { water_pressure: 2.4466911764705883 },
    '337': { water_pressure: 2.456214985994398 },
    '338': { water_pressure: 2.4491071428571427 },
    '339': { water_pressure: 2.456234335839599 },
    '340': { water_pressure: 2.4398477812177504 },
    '341': { water_pressure: 2.4295700034399723 },
    '342': { water_pressure: 2.4209150326797384 },
    '343': { water_pressure: 2.4133333333333336 },
    '344': { water_pressure: 2.4162393162393165 },
    '345': { water_pressure: 2.4198504273504273 },
    '346': { water_pressure: 2.427628205128205 },
    '347': { water_pressure: 2.4308333333333336 },
    '348': { water_pressure: 2.423888888888889 },
    '349': { water_pressure: 2.418650793650794 },
    '350': { water_pressure: 2.4055555555555554 },
    '351': { water_pressure: 2.405128205128205 },
    '352': { water_pressure: 2.4142551892551896 },
    '353': { water_pressure: 2.4123504273504275 },
    '354': { water_pressure: 2.4123504273504275 },
    '355': { water_pressure: 2.403223443223443 },
    '356': { water_pressure: 2.4165567765567766 },
    '357': { water_pressure: 2.4153501400560224 },
    '358': { water_pressure: 2.41281045751634 },
    '359': { water_pressure: 2.4218300653594773 },
  },
  current_pressure_by_angle: {
    '0': { water_pressure: 2.527272727272727 },
    '1': { water_pressure: 2.533333333333333 },
    '2': { water_pressure: 2.527272727272727 },
    '3': { water_pressure: 2.533333333333333 },
    '4': { water_pressure: 2.536363636363636 },
    '5': { water_pressure: 2.5325757575757577 },
    '6': { water_pressure: 2.5337878787878787 },
    '7': { water_pressure: 2.5355555555555553 },
    '8': { water_pressure: 2.541111111111111 },
    '9': { water_pressure: 2.5477777777777777 },
    '10': { water_pressure: 2.544145299145299 },
    '11': { water_pressure: 2.5524786324786324 },
    '12': { water_pressure: 2.559145299145299 },
    '13': { water_pressure: 2.5610101010101007 },
    '14': { water_pressure: 2.566060606060606 },
    '15': { water_pressure: 2.56969696969697 },
    '16': { water_pressure: 2.5909090909090913 },
    '17': { water_pressure: 2.591841491841492 },
    '18': { water_pressure: 2.601538461538462 },
    '19': { water_pressure: 2.6106293706293706 },
    '20': { water_pressure: 2.6224242424242425 },
    '21': { water_pressure: 2.624848484848485 },
    '22': { water_pressure: 2.6157575757575757 },
    '23': { water_pressure: 2.621212121212121 },
    '24': { water_pressure: 2.6204545454545456 },
    '25': { water_pressure: 2.6265151515151515 },
    '26': { water_pressure: 2.6174242424242427 },
    '27': { water_pressure: 2.6151515151515152 },
    '28': { water_pressure: 2.6181818181818186 },
    '29': { water_pressure: 2.6272727272727274 },
    '30': { water_pressure: 2.632323232323232 },
    '31': { water_pressure: 2.626936026936027 },
    '32': { water_pressure: 2.626936026936027 },
    '33': { water_pressure: 2.6258249158249156 },
    '34': { water_pressure: 2.6304545454545454 },
    '35': { water_pressure: 2.622037037037037 },
    '36': { water_pressure: 2.619179894179894 },
    '37': { water_pressure: 2.6164021164021167 },
    '38': { water_pressure: 2.616865079365079 },
    '39': { water_pressure: 2.6097222222222225 },
    '40': { water_pressure: 2.6078703703703705 },
    '41': { water_pressure: 2.6003703703703707 },
    '42': { water_pressure: 2.596666666666667 },
    '43': { water_pressure: 2.592962962962963 },
    '44': { water_pressure: 2.592592592592593 },
    '45': { water_pressure: 2.592592592592593 },
    '46': { water_pressure: 2.5892592592592596 },
    '47': { water_pressure: 2.5882010582010584 },
    '48': { water_pressure: 2.5785714285714287 },
    '49': { water_pressure: 2.5744973544973546 },
    '50': { water_pressure: 2.564973544973545 },
    '51': { water_pressure: 2.554064454064454 },
    '52': { water_pressure: 2.5364718614718615 },
    '53': { water_pressure: 2.525757575757576 },
    '54': { water_pressure: 2.5233333333333334 },
    '55': { water_pressure: 2.5102380952380954 },
    '56': { water_pressure: 2.487089947089947 },
    '57': { water_pressure: 2.473015873015873 },
    '58': { water_pressure: 2.456565656565657 },
    '59': { water_pressure: 2.444107744107744 },
    '60': { water_pressure: 2.424848484848485 },
    '61': { water_pressure: 2.421818181818182 },
    '62': { water_pressure: 2.4194612794612795 },
    '63': { water_pressure: 2.421127946127946 },
    '64': { water_pressure: 2.4194444444444443 },
    '65': { water_pressure: 2.412962962962963 },
    '66': { water_pressure: 2.3962962962962964 },
    '67': { water_pressure: 2.369444444444444 },
    '68': { water_pressure: 2.351388888888889 },
    '69': { water_pressure: 2.3324494949494947 },
    '70': { water_pressure: 2.326893939393939 },
    '71': { water_pressure: 2.318097643097643 },
    '72': { water_pressure: 2.3087037037037037 },
    '73': { water_pressure: 2.2892592592592593 },
    '74': { water_pressure: 2.27040404040404 },
    '75': { water_pressure: 2.253737373737374 },
    '76': { water_pressure: 2.2315151515151515 },
    '77': { water_pressure: 2.228148148148148 },
    '78': { water_pressure: 2.214814814814815 },
    '79': { water_pressure: 2.224814814814815 },
    '80': { water_pressure: 2.21 },
    '81': { water_pressure: 2.2127777777777777 },
    '82': { water_pressure: 2.196111111111111 },
    '83': { water_pressure: 2.192777777777778 },
    '84': { water_pressure: 2.184444444444445 },
    '85': { water_pressure: 2.1811111111111114 },
    '86': { water_pressure: 2.1777777777777776 },
    '87': { water_pressure: 2.176666666666667 },
    '88': { water_pressure: 2.19 },
    '89': { water_pressure: 2.193636363636364 },
    '90': { water_pressure: 2.196969696969697 },
    '91': { water_pressure: 2.1862289562289563 },
    '92': { water_pressure: 2.1983501683501685 },
    '93': { water_pressure: 2.2077441077441082 },
    '94': { water_pressure: 2.2114478114478113 },
    '95': { water_pressure: 2.2084175084175084 },
    '96': { water_pressure: 2.199023569023569 },
    '97': { water_pressure: 2.2027272727272726 },
    '98': { water_pressure: 2.2 },
    '99': { water_pressure: 2.21 },
    '100': { water_pressure: 2.223333333333333 },
    '101': { water_pressure: 2.232121212121212 },
    '102': { water_pressure: 2.232861952861953 },
    '103': { water_pressure: 2.2286195286195287 },
    '104': { water_pressure: 2.233164983164983 },
    '105': { water_pressure: 2.2524242424242424 },
    '106': { water_pressure: 2.27 },
    '107': { water_pressure: 2.274545454545455 },
    '108': { water_pressure: 2.27010101010101 },
    '109': { water_pressure: 2.27979797979798 },
    '110': { water_pressure: 2.299326599326599 },
    '111': { water_pressure: 2.317104377104377 },
    '112': { water_pressure: 2.314074074074074 },
    '113': { water_pressure: 2.3177777777777777 },
    '114': { water_pressure: 2.3222222222222224 },
    '115': { water_pressure: 2.3373737373737375 },
    '116': { water_pressure: 2.342929292929293 },
    '117': { water_pressure: 2.3503367003367006 },
    '118': { water_pressure: 2.3551851851851855 },
    '119': { water_pressure: 2.3585185185185185 },
    '120': { water_pressure: 2.3608333333333333 },
    '121': { water_pressure: 2.3652777777777776 },
    '122': { water_pressure: 2.376230158730159 },
    '123': { water_pressure: 2.3865079365079365 },
    '124': { water_pressure: 2.395396825396825 },
    '125': { water_pressure: 2.397777777777778 },
    '126': { water_pressure: 2.3911111111111114 },
    '127': { water_pressure: 2.3911111111111114 },
    '128': { water_pressure: 2.393071895424837 },
    '129': { water_pressure: 2.397794117647059 },
    '130': { water_pressure: 2.402922322775264 },
    '131': { water_pressure: 2.409850427350427 },
    '132': { water_pressure: 2.4238210155857214 },
    '133': { water_pressure: 2.4207761437908495 },
    '134': { water_pressure: 2.422143665158371 },
    '135': { water_pressure: 2.423450854700855 },
    '136': { water_pressure: 2.4380341880341883 },
    '137': { water_pressure: 2.442063492063492 },
    '138': { water_pressure: 2.454481792717087 },
    '139': { water_pressure: 2.4497198879551823 },
    '140': { water_pressure: 2.4548786181139124 },
    '141': { water_pressure: 2.4503968253968256 },
    '142': { water_pressure: 2.453876678876679 },
    '143': { water_pressure: 2.453876678876679 },
    '144': { water_pressure: 2.450384615384616 },
    '145': { water_pressure: 2.4600000000000004 },
    '146': { water_pressure: 2.4766666666666666 },
    '147': { water_pressure: 2.4944444444444445 },
    '148': { water_pressure: 2.5027777777777778 },
    '149': { water_pressure: 2.4952380952380953 },
    '150': { water_pressure: 2.5003663003663004 },
    '151': { water_pressure: 2.4943056943056945 },
    '152': { water_pressure: 2.5014485514485516 },
    '153': { water_pressure: 2.5018759018759016 },
    '154': { water_pressure: 2.507936507936508 },
    '155': { water_pressure: 2.5055555555555555 },
    '156': { water_pressure: 2.505128205128205 },
    '157': { water_pressure: 2.5106837606837606 },
    '158': { water_pressure: 2.515811965811966 },
    '159': { water_pressure: 2.5183760683760688 },
    '160': { water_pressure: 2.5217094017094017 },
    '161': { water_pressure: 2.5242735042735043 },
    '162': { water_pressure: 2.5242735042735043 },
    '163': { water_pressure: 2.5335664335664334 },
    '164': { water_pressure: 2.536985236985237 },
    '165': { water_pressure: 2.5395493395493394 },
    '166': { water_pressure: 2.534188034188034 },
    '167': { water_pressure: 2.53974358974359 },
    '168': { water_pressure: 2.548534798534799 },
    '169': { water_pressure: 2.556926406926407 },
    '170': { water_pressure: 2.5610930735930735 },
    '171': { water_pressure: 2.562558275058275 },
    '172': { water_pressure: 2.563568376068376 },
    '173': { water_pressure: 2.5677350427350425 },
    '174': { water_pressure: 2.5662698412698415 },
    '175': { water_pressure: 2.5718253968253966 },
    '176': { water_pressure: 2.56990231990232 },
    '177': { water_pressure: 2.5641880341880343 },
    '178': { water_pressure: 2.551794871794872 },
    '179': { water_pressure: 2.546899766899767 },
    '180': { water_pressure: 2.5487179487179485 },
    '181': { water_pressure: 2.55 },
    '182': { water_pressure: 2.554040404040404 },
    '183': { water_pressure: 2.5527777777777776 },
    '184': { water_pressure: 2.559188034188034 },
    '185': { water_pressure: 2.550299145299145 },
    '186': { water_pressure: 2.5485314685314684 },
    '187': { water_pressure: 2.5387878787878786 },
    '188': { water_pressure: 2.5365656565656565 },
    '189': { water_pressure: 2.527474747474747 },
    '190': { water_pressure: 2.5274747474747477 },
    '191': { water_pressure: 2.522424242424242 },
    '192': { water_pressure: 2.524949494949495 },
    '193': { water_pressure: 2.511616161616162 },
    '194': { water_pressure: 2.5055555555555555 },
    '195': { water_pressure: 2.506060606060606 },
    '196': { water_pressure: 2.503282828282828 },
    '197': { water_pressure: 2.506986531986532 },
    '198': { water_pressure: 2.4948653198653203 },
    '199': { water_pressure: 2.492087542087542 },
    '200': { water_pressure: 2.4846801346801346 },
    '201': { water_pressure: 2.4881766381766384 },
    '202': { water_pressure: 2.4846412846412846 },
    '203': { water_pressure: 2.4792540792540794 },
    '204': { water_pressure: 2.4762626262626264 },
    '205': { water_pressure: 2.485353535353535 },
    '206': { water_pressure: 2.4899999999999998 },
    '207': { water_pressure: 2.493333333333333 },
    '208': { water_pressure: 2.486190476190476 },
    '209': { water_pressure: 2.4776719576719572 },
    '210': { water_pressure: 2.463227513227513 },
    '211': { water_pressure: 2.448148148148148 },
    '212': { water_pressure: 2.4473856209150324 },
    '213': { water_pressure: 2.4373856209150326 },
    '214': { water_pressure: 2.4373856209150326 },
    '215': { water_pressure: 2.430277777777778 },
    '216': { water_pressure: 2.4307539682539683 },
    '217': { water_pressure: 2.422023809523809 },
    '218': { water_pressure: 2.4134453781512604 },
    '219': { water_pressure: 2.4104691876750697 },
    '220': { water_pressure: 2.4018382352941177 },
    '221': { water_pressure: 2.3979166666666667 },
    '222': { water_pressure: 2.3913690476190474 },
    '223': { water_pressure: 2.4015406162464985 },
    '224': { water_pressure: 2.404104718810601 },
    '225': { water_pressure: 2.3953745600804424 },
    '226': { water_pressure: 2.3914529914529914 },
    '227': { water_pressure: 2.3855555555555554 },
    '228': { water_pressure: 2.3904166666666664 },
    '229': { water_pressure: 2.384861111111111 },
    '230': { water_pressure: 2.3810515873015876 },
    '231': { water_pressure: 2.3812409812409814 },
    '232': { water_pressure: 2.3725108225108227 },
    '233': { water_pressure: 2.371961371961372 },
    '234': { water_pressure: 2.362870462870463 },
    '235': { water_pressure: 2.372027972027972 },
    '236': { water_pressure: 2.372577422577422 },
    '237': { water_pressure: 2.3793956043956044 },
    '238': { water_pressure: 2.3873015873015873 },
    '239': { water_pressure: 2.397008547008547 },
    '240': { water_pressure: 2.397008547008547 },
    '241': { water_pressure: 2.3993589743589747 },
    '242': { water_pressure: 2.405128205128205 },
    '243': { water_pressure: 2.4267948717948715 },
    '244': { water_pressure: 2.433787878787879 },
    '245': { water_pressure: 2.398371212121212 },
    '246': { water_pressure: 2.407260101010101 },
    '247': { water_pressure: 2.4189484126984127 },
    '248': { water_pressure: 2.4733044733044736 },
    '249': { water_pressure: 2.4483044733044736 },
    '250': { water_pressure: 2.4578282828282827 },
    '251': { water_pressure: 2.4615079365079366 },
    '252': { water_pressure: 2.5 },
    '253': { water_pressure: 2.5076923076923077 },
    '254': { water_pressure: 2.523962148962149 },
    '255': { water_pressure: 2.542094017094017 },
    '256': { water_pressure: 2.547222222222222 },
    '257': { water_pressure: 2.5589743589743588 },
    '258': { water_pressure: 2.562271062271062 },
    '259': { water_pressure: 2.573692973692974 },
    '260': { water_pressure: 2.576940836940837 },
    '261': { water_pressure: 2.5753535353535355 },
    '262': { water_pressure: 2.5802777777777783 },
    '263': { water_pressure: 2.5770299145299145 },
    '264': { water_pressure: 2.5790501165501163 },
    '265': { water_pressure: 2.580835830835831 },
    '266': { water_pressure: 2.5885281385281385 },
    '267': { water_pressure: 2.59484126984127 },
    '268': { water_pressure: 2.5927777777777776 },
    '269': { water_pressure: 2.5900000000000003 },
    '270': { water_pressure: 2.5903968253968253 },
    '271': { water_pressure: 2.59484126984127 },
    '272': { water_pressure: 2.608730158730159 },
    '273': { water_pressure: 2.611111111111111 },
    '274': { water_pressure: 2.606666666666667 },
    '275': { water_pressure: 2.607676767676768 },
    '276': { water_pressure: 2.6153690753690753 },
    '277': { water_pressure: 2.6281468531468533 },
    '278': { water_pressure: 2.6255494505494505 },
    '279': { water_pressure: 2.6281135531135535 },
    '280': { water_pressure: 2.637557997557998 },
    '281': { water_pressure: 2.6419230769230775 },
    '282': { water_pressure: 2.6427777777777783 },
    '283': { water_pressure: 2.6392857142857142 },
    '284': { water_pressure: 2.642063492063492 },
    '285': { water_pressure: 2.649134199134199 },
    '286': { water_pressure: 2.651515151515152 },
    '287': { water_pressure: 2.6553613053613057 },
    '288': { water_pressure: 2.655128205128205 },
    '289': { water_pressure: 2.6523504273504277 },
    '290': { water_pressure: 2.646123321123321 },
    '291': { water_pressure: 2.6372655122655124 },
    '292': { water_pressure: 2.632265512265512 },
    '293': { water_pressure: 2.626313131313131 },
    '294': { water_pressure: 2.619786324786325 },
    '295': { water_pressure: 2.6192307692307693 },
    '296': { water_pressure: 2.626282051282051 },
    '297': { water_pressure: 2.633974358974359 },
    '298': { water_pressure: 2.6311965811965816 },
    '299': { water_pressure: 2.622954822954823 },
    '300': { water_pressure: 2.6182539682539683 },
    '301': { water_pressure: 2.6055555555555556 },
    '302': { water_pressure: 2.590079365079365 },
    '303': { water_pressure: 2.580079365079365 },
    '304': { water_pressure: 2.5824603174603173 },
    '305': { water_pressure: 2.582460317460318 },
    '306': { water_pressure: 2.57478354978355 },
    '307': { water_pressure: 2.5670454545454544 },
    '308': { water_pressure: 2.5632575757575755 },
    '309': { water_pressure: 2.564267676767677 },
    '310': { water_pressure: 2.5624819624819626 },
    '311': { water_pressure: 2.554090354090354 },
    '312': { water_pressure: 2.5363125763125765 },
    '313': { water_pressure: 2.5283760683760685 },
    '314': { water_pressure: 2.517936507936508 },
    '315': { water_pressure: 2.5246031746031745 },
    '316': { water_pressure: 2.5134920634920634 },
    '317': { water_pressure: 2.5085470085470085 },
    '318': { water_pressure: 2.489102564102564 },
    '319': { water_pressure: 2.483974358974359 },
    '320': { water_pressure: 2.4793956043956045 },
    '321': { water_pressure: 2.4800366300366297 },
    '322': { water_pressure: 2.474053724053724 },
    '323': { water_pressure: 2.4735042735042736 },
    '324': { water_pressure: 2.470940170940171 },
    '325': { water_pressure: 2.473717948717949 },
    '326': { water_pressure: 2.4786324786324787 },
    '327': { water_pressure: 2.4833333333333334 },
    '328': { water_pressure: 2.485 },
    '329': { water_pressure: 2.4811111111111113 },
    '330': { water_pressure: 2.483636363636364 },
    '331': { water_pressure: 2.487922077922078 },
    '332': { water_pressure: 2.4874458874458876 },
    '333': { water_pressure: 2.4793650793650794 },
    '334': { water_pressure: 2.4706349206349207 },
    '335': { water_pressure: 2.464957264957265 },
    '336': { water_pressure: 2.467735042735043 },
    '337': { water_pressure: 2.460897435897436 },
    '338': { water_pressure: 2.4532051282051284 },
    '339': { water_pressure: 2.453846153846154 },
    '340': { water_pressure: 2.451794871794872 },
    '341': { water_pressure: 2.4589743589743587 },
    '342': { water_pressure: 2.4533333333333336 },
    '343': { water_pressure: 2.46 },
    '344': { water_pressure: 2.4566666666666666 },
    '345': { water_pressure: 2.46 },
    '346': { water_pressure: 2.465925925925926 },
    '347': { water_pressure: 2.4725925925925925 },
    '348': { water_pressure: 2.474900284900285 },
    '349': { water_pressure: 2.474900284900285 },
    '350': { water_pressure: 2.481869981869982 },
    '351': { water_pressure: 2.4895622895622895 },
    '352': { water_pressure: 2.4969696969696966 },
    '353': { water_pressure: 2.5 },
    '354': { water_pressure: 2.4972222222222222 },
    '355': { water_pressure: 2.503282828282828 },
    '356': { water_pressure: 2.5066161616161615 },
    '357': { water_pressure: 2.516060606060606 },
    '358': { water_pressure: 2.519090909090909 },
    '359': { water_pressure: 2.524090909090909 },
  },
};

const failureTitle: any = {
  1: 'Falta de pressão',
  2: 'Queda de energia',
  3: 'Desalinhado',
  4: 'Oscilação de energia',
};

type Props = {
  pivot: GetPivotModelProps;
  pivotReport: GetPivotReportModelProps;
  pivotHistory: GetPivotHistoryModelProps;
  pivotInformation: GetPivotInformationModelProps;
  selectedDevice: SelectedDeviceModelProps;
  setSelectedDevice: typeof setSelectedDevice;
  setDeviceClose: typeof setDeviceClose;
};

const PivotReport: React.FC<Props> = (props) => {
  const G = G2.getEngine('canvas');
  const { md, xxl } = useScreenHook();
  const { tab, setTab } = useTabsHook('tab1');
  const intl = useIntl();

  const [option, setOption] = useState<undefined | number>(undefined);
  const energyConsumption = props.pivotReport.result.energy_consumption;

  const data = [
    {
      type: intl.formatMessage({
        id: 'component.pivot.voltage.chart.legend.1',
      }),
      value: parseInt(props.pivotReport.result?.energy_consumption?.ponta?.hours.toString()),
    },
    {
      type: intl.formatMessage({
        id: 'component.pivot.voltage.chart.legend.2',
      }),
      value: parseInt(
        props.pivotReport.result?.energy_consumption?.fora_de_ponta?.hours?.toString(),
      ),
    },
    {
      type: intl.formatMessage({
        id: 'component.pivot.voltage.chart.legend.3',
      }),
      value: parseInt(props.pivotReport.result?.energy_consumption?.reduzido?.hours.toString()),
      color: 'red',
    },
  ];

  const generalClassName = useEmotionCss(({ token }) => {
    return {
      '.ant-pro-card-title ': {
        width: '100%',
      },
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 110px)',
      },
    };
  });

  const className = useEmotionCss(() => {
    return {
      '.ant-pro-card-title ': {
        width: '100%',
      },
    };
  });

  const classNameTableProCard = useEmotionCss(() => {
    return {
      '.ant-pro-card-body': {
        paddingInline: '4px',
      },
    };
  });

  const getComparative = (): any[] => {
    const newList: any = [];
    const pressures = GetPivotPressureComparative;

    Object.values(pressures.comparison_pressure_by_angles).forEach((element, index) => {
      newList.push({
        angle: index,
        value: element.water_pressure,
        name: intl.formatMessage({
          id: 'component.pivot.pressure.chart.tooltip.label.1',
        }),
      });
    });
    Object.values(pressures.current_pressure_by_angle).forEach((element, index) => {
      newList.push({
        angle: index,
        value: element.water_pressure,
        name: intl.formatMessage({
          id: 'component.pivot.pressure.chart.tooltip.label.2',
        }),
      });
    });
    return newList;
  };

  const classNamePieChart = useEmotionCss(({ token }) => {
    return {
      '.g2-html-annotation': {
        color: `${token.colorText} !important`,
      },
    };
  });
  return (
    <>
      <Modal
        width={1020}
        title={option !== undefined ? failureTitle[option] : failureTitle[1]}
        onCancel={() => setOption(undefined)}
        open={option ? true : false}
        destroyOnClose
      >
        <Row>
          <Col xs={24} md={12} style={{ height: 360 }}>
            <DeviceMapsRender height={400} />
          </Col>
          <Col xs={24} md={12}></Col>
        </Row>
      </Modal>
      <ProCard
        className={generalClassName}
        ghost
        style={{ marginBlockStart: 8 }}
        gutter={[16, 16]}
        wrap
      >
        <ProCard ghost colSpan={{ xs: 24, md: 8, xxl: 5 }} style={{ height: 275 }}>
          <DeviceMapsRender height={275} />
        </ProCard>
        <ProCard colSpan={{ xs: 24, md: 16, xxl: 9 }} style={{ height: md ? 275 : '100%' }}>
          <DevicePanelContainer type={DeviceType.Pivot} />
        </ProCard>
        <ProCard split={md ? 'vertical' : 'horizontal'} colSpan={{ xs: 24, md: 24, xxl: 10 }} wrap>
          <ProCard
            split={xxl ? 'horizontal' : md ? 'vertical' : 'horizontal'}
            colSpan={{ xs: 24, md: 12, xxl: 12 }}
          >
            <StatisticCard
              loading={props.pivotReport.loading}
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(1)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: intl.formatMessage({
                  id: 'component.pivot.unexpectedstops.1',
                }),
                value: props.pivotReport.result?.unexpected_stops?.lack_of_pressure,
                description: (
                  <Statistic
                    className={className}
                    title={intl.formatMessage({
                      id: 'component.pivot.unexpectedstops.5',
                    })}
                    value="8.04%"
                    trend="down"
                  />
                ),
              }}
            />
            <StatisticCard
              loading={props.pivotReport.loading}
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(2)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: intl.formatMessage({
                  id: 'component.pivot.unexpectedstops.2',
                }),
                value: props.pivotReport.result?.unexpected_stops?.energy_blackot,
                description: (
                  <Statistic
                    className={className}
                    title={intl.formatMessage({
                      id: 'component.pivot.unexpectedstops.5',
                    })}
                    value="8.04%"
                    trend="down"
                  />
                ),
              }}
            />
          </ProCard>
          <ProCard
            split={xxl ? 'horizontal' : md ? 'vertical' : 'horizontal'}
            colSpan={{ xs: 24, md: 12, xxl: 12 }}
          >
            <StatisticCard
              loading={props.pivotReport.loading}
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(3)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: intl.formatMessage({
                  id: 'component.pivot.unexpectedstops.3',
                }),
                value: props.pivotReport.result?.unexpected_stops?.misalignment,
                description: (
                  <Statistic
                    className={className}
                    title={intl.formatMessage({
                      id: 'component.pivot.unexpectedstops.5',
                    })}
                    value="8.04%"
                    trend="down"
                  />
                ),
              }}
            />
            <StatisticCard
              loading={props.pivotReport.loading}
              bodyStyle={{ cursor: 'pointer' }}
              onClick={() => setOption(4)}
              style={{ height: 'calc(275px / 2)' }}
              statistic={{
                title: intl.formatMessage({
                  id: 'component.pivot.unexpectedstops.4',
                }),
                value: props.pivotReport.result?.unexpected_stops?.power_surge,
                description: (
                  <Statistic
                    className={className}
                    title={intl.formatMessage({
                      id: 'component.pivot.unexpectedstops.5',
                    })}
                    value="8.04%"
                    trend="down"
                  />
                ),
              }}
            />
          </ProCard>
        </ProCard>
        <ProCard
          title={intl.formatMessage({
            id: 'component.pivot.voltage.title',
          })}
          split={md ? 'horizontal' : 'horizontal'}
          headerBordered
          style={{ minHeight: 450 }}
          colSpan={{ xs: 24, lg: 12 }}
        >
          <ProCard split="horizontal" colSpan={{ xs: 24, lg: 24 }}>
            <ProCard split={md ? 'vertical' : 'horizontal'}>
              <ProCard split={'horizontal'} wrap>
                <StatisticCard
                  loading={props.pivotReport.loading}
                  onClick={() => {}}
                  statistic={{
                    title: intl.formatMessage({
                      id: 'component.pivot.voltage.label.1',
                    }),
                    value: props.pivotReport.result?.flow?.total_m3h.toFixed(2),
                    suffix: 'm³',
                  }}
                />

                <StatisticCard
                  loading={props.pivotReport.loading}
                  statistic={{
                    title: intl.formatMessage({
                      id: 'component.pivot.voltage.label.3',
                    }),
                    value: props.pivotReport.result?.hours_count?.wet_total_hours.toFixed(3),
                    suffix: 'h',
                  }}
                />
              </ProCard>
              <ProCard split={'horizontal'} wrap>
                <StatisticCard
                  loading={props.pivotReport.loading}
                  statistic={{
                    title: intl.formatMessage({
                      id: 'component.pivot.voltage.label.2',
                    }),
                    value: '99.000,31',
                    suffix: 'm³',
                  }}
                />
                <StatisticCard
                  loading={props.pivotReport.loading}
                  statistic={{
                    title: intl.formatMessage({
                      id: 'component.pivot.voltage.label.4',
                    }),
                    value: '150,03',
                    suffix: 'h',
                  }}
                />
              </ProCard>
            </ProCard>

            <StatisticCard
              loading={props.pivotReport.loading && <SkeletonPieChart />}
              style={{ width: '100%' }}
              title={intl.formatMessage({
                id: 'component.pivot.voltage.label.5',
              })}
              chart={
                <Pie
                  appendPadding={10}
                  data={data}
                  angleField="value"
                  colorField="type"
                  radius={0.8}
                  legend={false}
                  autoFit
                  color={({ type }) => {
                    if (
                      type ===
                      intl.formatMessage({
                        id: 'component.pivot.voltage.chart.legend.1',
                      })
                    ) {
                      return '#ff4d4f';
                    } else if (
                      type ===
                      intl.formatMessage({
                        id: 'component.pivot.voltage.chart.legend.2',
                      })
                    ) {
                      return '#4169E1';
                    }
                    return '#40E0D0';
                  }}
                  label={{
                    type: 'spider',
                    labelHeight: 40,
                    formatter: (data, mappingData) => {
                      const group = new G.Group({});
                      group.addShape({
                        type: 'circle',
                        attrs: {
                          x: 0,
                          y: 0,
                          width: 40,
                          height: 50,
                          r: 5,
                          fill: mappingData.color,
                        },
                      });
                      group.addShape({
                        type: 'text',
                        attrs: {
                          x: 10,
                          y: 8,
                          text: `${data.type}`,
                          fill: mappingData.color,
                        },
                      });

                      return group;
                    },
                  }}
                  interactions={[
                    {
                      type: 'element-selected',
                    },
                    {
                      type: 'element-active',
                    },
                  ]}
                />
              }
            />
          </ProCard>

          <ProCard
            split="horizontal"
            colSpan={{ xs: 24, lg: 24 }}
            style={{ height: md ? 350 : '100%' }}
          >
            <StatisticCard
              loading={props.pivotReport.loading && <SkeletonPieChart />}
              colSpan={{ xs: 24, lg: 24 }}
              style={{ width: '100%' }}
              title={intl.formatMessage({
                id: 'component.pivot.voltage.label.6',
              })}
              chart={
                <Pie
                  className={classNamePieChart}
                  height={275}
                  appendPadding={10}
                  data={data}
                  angleField="value"
                  colorField="type"
                  radius={1}
                  legend={{
                    position: 'right',
                    layout: 'vertical',
                  }}
                  autoFit
                  innerRadius={0.6}
                  statistic={{
                    title: false,
                    content: {
                      style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: '16px',
                      },
                      content: intl.formatMessage(
                        {
                          id: 'component.pivot.voltage.label.11',
                        },
                        {
                          value: `R$ ${(
                            energyConsumption?.fora_de_ponta.total +
                            energyConsumption?.ponta.total +
                            energyConsumption?.reduzido.total
                          ).toFixed(2)}`,
                        },
                      ),
                    },
                  }}
                  color={({ type }) => {
                    if (
                      type ===
                      intl.formatMessage({
                        id: 'component.pivot.voltage.chart.legend.1',
                      })
                    ) {
                      return '#ff4d4f';
                    } else if (
                      type ===
                      intl.formatMessage({
                        id: 'component.pivot.voltage.chart.legend.2',
                      })
                    ) {
                      return '#4169E1';
                    }
                    return '#40E0D0';
                  }}
                  label={{
                    type: 'inner',
                    offset: '-50%',
                    content: '{value}',
                    style: {
                      textAlign: 'center',
                      fontSize: 13,
                    },
                  }}
                  interactions={[
                    {
                      type: 'element-selected',
                    },
                    {
                      type: 'element-active',
                    },
                  ]}
                />
              }
            />
            <ProCard
              colSpan={{ xs: 24, lg: 24 }}
              wrap
              split={md ? 'vertical' : 'horizontal'}
              style={{ height: md ? 350 : '100%' }}
            >
              <StatisticCard
                loading={props.pivotReport.loading}
                title={intl.formatMessage({
                  id: 'component.pivot.voltage.label.5',
                })}
                colSpan={{ xs: 24, lg: 16 }}
                style={{ width: '100%' }}
                chart={
                  <Line
                    legend={{
                      position: 'top',
                    }}
                    tooltip={{
                      formatter: (datum) => {
                        return {
                          name: intl.formatMessage({
                            id: 'component.pivot.voltage.label.12',
                          }),
                          value: `${parseFloat(datum.scales).toFixed(2)}(V)`,
                        };
                      },
                    }}
                    height={260}
                    data={
                      props.pivotReport.result?.voltage_array
                        ? props.pivotReport.result?.voltage_array?.map((item) => {
                            return {
                              Date: new Date(item.date).toISOString().split('T')[0],
                              scales: item.voltage,
                            };
                          })
                        : []
                    }
                    padding="auto"
                    xField="Date"
                    yField="scales"
                    yAxis={{
                      label: {
                        formatter: (v) => `${parseInt(v)}V`,
                      },
                    }}
                    xAxis={{
                      tickCount: 5,
                    }}
                    slider={false}
                  />
                }
              ></StatisticCard>
              <ProCard split="vertical" colSpan={{ xs: 24, lg: 8 }}>
                <ProCard split="horizontal">
                  <ProCard split="horizontal">
                    <StatisticCard
                      loading={props.pivotReport.loading && <SkeletonStatistic />}
                      statistic={{
                        title: intl.formatMessage({
                          id: 'component.pivot.voltage.label.8',
                        }),
                        value: props.pivotReport.result?.voltage_min
                          ? props.pivotReport.result?.voltage_min[0]
                          : 0,
                        suffix: 'V',
                      }}
                    />
                  </ProCard>
                  <ProCard split="horizontal">
                    <StatisticCard
                      loading={props.pivotReport.loading && <SkeletonStatistic />}
                      statistic={{
                        title: intl.formatMessage({
                          id: 'component.pivot.voltage.label.9',
                        }),
                        value: props.pivotReport.result?.voltage_med
                          ? props.pivotReport.result?.voltage_med[0]
                          : 0,
                        suffix: 'V',
                      }}
                    />
                  </ProCard>
                  <ProCard split="horizontal">
                    <StatisticCard
                      loading={props.pivotReport.loading && <SkeletonStatistic />}
                      statistic={{
                        title: intl.formatMessage({
                          id: 'component.pivot.voltage.label.10',
                        }),
                        value: props.pivotReport.result?.voltage_max
                          ? props.pivotReport.result?.voltage_max[0]
                          : 0,
                        suffix: 'V',
                      }}
                    />
                  </ProCard>
                </ProCard>
              </ProCard>
            </ProCard>
          </ProCard>
        </ProCard>
        <ProCard colSpan={{ xs: 24, lg: 12 }} wrap ghost className={classNameTableProCard}>
          <ProCard
            loading={props.pivotHistory.loading && <ProSkeleton type="list" />}
            style={{ minHeight: 1032 }}
            title={intl.formatMessage({
              id: 'component.pivot.tab.history.title',
            })}
            tabs={
              props.pivotHistory.loading
                ? undefined
                : {
                    tabPosition: 'top',
                    activeKey: tab,
                    items: [
                      {
                        label: intl.formatMessage({
                          id: 'component.pivot.tab.history.event',
                        }),
                        key: 'tab1',

                        children: <PivotEventTable />,
                      },
                      {
                        label: intl.formatMessage({
                          id: 'component.pivot.tab.history.operations',
                        }),
                        key: 'tab2',
                        children: <PivotOperationTable />,
                      },
                    ],
                    onChange: (key) => {
                      setTab(key);
                    },
                  }
            }
            colSpan={{ xs: 24, md: 24 }}
          ></ProCard>

          <StatisticCard
            loading={props.pivotReport.loading && <SkeletonList size={12} rows={13} p={3} />}
            style={{ marginTop: 16 }}
            title={intl.formatMessage({
              id: 'component.pivot.pressure.label.1',
            })}
            chart={
              <Line
                tooltip={{
                  title: intl.formatMessage({
                    id: 'component.pivot.pressure.chart.tooltip.label.5',
                  }),
                  formatter: (datum) => {
                    return {
                      name: datum.name,
                      value: `${parseFloat(datum.value).toFixed(2)} bar`,
                    };
                  },
                }}
                data={getComparative()}
                xField="angle"
                height={320}
                yField="value"
                seriesField="name"
                yAxis={{
                  label: {
                    formatter: (v) => `${parseFloat(v).toFixed(1)} bar`,
                  },
                }}
                legend={false}
                smooth={true}
                // @TODO 后续会换一种动画方式
                animation={{
                  appear: {
                    animation: 'path-in',
                    duration: 5000,
                  },
                }}
              />
            }
            colSpan={{ xs: 24, md: 24 }}
          />
        </ProCard>

        <StatisticCard
          title={intl.formatMessage({
            id: 'component.pivot.pressure.label.2',
          })}
          chart={
            <Line
              height={320}
              tooltip={{
                title: intl.formatMessage({
                  id: 'component.pivot.pressure.chart.tooltip.label.4',
                }),
                formatter: (datum) => {
                  return {
                    name: intl.formatMessage(
                      {
                        id: 'component.pivot.pressure.chart.tooltip.label.3',
                      },
                      { value: datum.Ângulo },
                    ),
                    value: `${parseFloat(datum.value).toFixed(2)} bar`,
                  };
                },
              }}
              data={
                props.pivotReport.result?.water_blade?.by_angle
                  ? props.pivotReport.result?.water_blade?.by_angle.map((item, index) => {
                      return {
                        Ângulo: index + 1,
                        value: item,
                      };
                    })
                  : []
              }
              padding="auto"
              xField="Ângulo"
              yField="value"
              xAxis={{
                tickCount: 5,
              }}
              slider={false}
            />
          }
          colSpan={{ xs: 24, lg: 24 }}
        />
      </ProCard>
    </>
  );
};

const mapStateToProps = ({
  pivot,
  pivotById,
  pivotReport,
  pivotHistory,
  pivotInformation,
  selectedDevice,
}: any) => ({
  pivot,
  pivotById,
  pivotReport,
  pivotHistory,
  pivotInformation,
  selectedDevice,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedDevice: (props: any) => dispatch(setSelectedDevice(props)),
  setDeviceClose: () => dispatch(setDeviceClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PivotReport);
