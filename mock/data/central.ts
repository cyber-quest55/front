import Mock from 'mockjs';
import { defaulSuccessResponse, IResponse } from '../response';

export const GetCentralResponse: IResponse<API.GetCentralResponse> = Mock.mock({
  ...defaulSuccessResponse,
  data: {
    current: 0,
    pageSize: 10,
    total: 1000,
    list: {
      id: 133,
      users: [
        {
          username: 'douglas.pedrini',
          email: 'doug.pedrini@gmail.com',
          first_name: 'Douglas',
          last_name: 'Pedrini',
          id: 1937,
          profile_id: 1738,
          pending: false,
        },
        {
          username: 'j.palomo',
          email: 'j.palomo@bauer-at.com',
          first_name: 'Jean',
          last_name: 'Palomo',
          id: 2223,
          profile_id: 2025,
          pending: false,
        },
        {
          username: 'amilton.costa',
          email: 'amilton.costa@slcagricola.com.br',
          first_name: '',
          last_name: '',
          id: 209,
          profile_id: 206,
          pending: false,
        },
        {
          username: 'igorullmann',
          email: 'igor@irrigacerrado.com.br',
          first_name: 'Igor',
          last_name: 'Ullmann',
          id: 686,
          profile_id: 575,
          pending: false,
        },
        {
          username: 'andre.breda',
          email: 'a.breda@bauer-at.com',
          first_name: 'André Luís',
          last_name: 'Breda',
          id: 485,
          profile_id: 407,
          pending: false,
        },
        {
          username: 'marcelo.peglow',
          email: 'marcelo.peglow@gmail.com',
          first_name: 'Marcelo',
          last_name: '',
          id: 576,
          profile_id: 490,
          pending: false,
        },
        {
          username: 'hugo.silva',
          email: 'hugo@geopocosmt.com.br',
          first_name: 'Hugo',
          last_name: 'Franco da Silva',
          id: 1731,
          profile_id: 1532,
          pending: false,
        },
        {
          username: 'diego.andre',
          email: 'diegoandregoldschmidt@hotmail.com',
          first_name: 'Diego',
          last_name: '',
          id: 577,
          profile_id: 491,
          pending: false,
        },
        {
          username: 'flavio.oliveira',
          email: 'f.oliveira@bauer-at.com',
          first_name: 'Flávio',
          last_name: 'Oliveira',
          id: 128,
          profile_id: 125,
          pending: false,
        },
        {
          username: 'hugo.garcia',
          email: 'hugo.garcia@aquaagronegocios.com.br',
          first_name: 'Hugo',
          last_name: 'Garcia',
          id: 688,
          profile_id: 576,
          pending: false,
        },
        {
          username: 'w.campos',
          email: 'w.campos@idealirrigacao.com',
          first_name: 'Washington',
          last_name: 'Campos',
          id: 726,
          profile_id: 615,
          pending: false,
        },
        {
          username: 'willermarcondes.irricontrol',
          email: 'willer.marcondes@irricontrol.com.br',
          first_name: 'Willer',
          last_name: 'Marcondes',
          id: 638,
          profile_id: 549,
          pending: false,
        },
        {
          username: 'WarlenMoura',
          email: 'warlensantosmoura@gmail.com',
          first_name: 'Warlen',
          last_name: 'Santos',
          id: 574,
          profile_id: 527,
          pending: false,
        },
        {
          username: 'CristianWolfart',
          email: 'cewolfart@gmail.com',
          first_name: 'Cristian',
          last_name: 'Wolfart',
          id: 724,
          profile_id: 614,
          pending: false,
        },
        {
          username: 'hiago',
          email: 'hiago@idealirrigacao.com',
          first_name: 'Hiago',
          last_name: 'Paco Ramos',
          id: 974,
          profile_id: 816,
          pending: false,
        },
        {
          username: 'rodrigoottobeli',
          email: 'rodrigoottobeli12@gmail.com',
          first_name: 'Rodrigo ',
          last_name: 'Ottobeli',
          id: 879,
          profile_id: 749,
          pending: false,
        },
        {
          username: 'ericacarvalho',
          email: 'erica.carvalho@aquaagronegocios.com.br',
          first_name: 'Erica',
          last_name: 'Carvalho',
          id: 897,
          profile_id: 762,
          pending: false,
        },
        {
          username: 'beatriz.ramos',
          email: 'beatriz_13mt@hotmail.com',
          first_name: 'Beatriz',
          last_name: 'Ramos',
          id: 734,
          profile_id: 621,
          pending: false,
        },
        {
          username: 'automacao',
          email: 'automacao@irrigacerrado.com.br',
          first_name: 'Irriga',
          last_name: 'Cerrado',
          id: 1612,
          profile_id: 1412,
          pending: false,
        },
        {
          username: 'gustavomota',
          email: 'gustavo.mota_@hotmail.com',
          first_name: 'Gustavo ',
          last_name: 'Mota',
          id: 1181,
          profile_id: 980,
          pending: false,
        },
        {
          username: 'comercial01.pivonorte',
          email: 'comercial01@pivonorte.com.br',
          first_name: 'comercial01',
          last_name: 'pivonorte',
          id: 1016,
          profile_id: 840,
          pending: false,
        },
        {
          username: 'mkt.irricontrol',
          email: 'mkt@irricontrol.com.br',
          first_name: 'Marketing',
          last_name: 'Irricontrol',
          id: 1144,
          profile_id: 943,
          pending: false,
        },
        {
          username: 'anderson.irricontrol',
          email: 'anderson.rodrigues@irricontrol.com.br',
          first_name: 'Anderson',
          last_name: 'Rodrigues',
          id: 912,
          profile_id: 772,
          pending: false,
        },
        {
          username: 'schitter.bauer',
          email: 'a.schitter@bauer-at.com',
          first_name: 'Andreas',
          last_name: 'Schitter',
          id: 1359,
          profile_id: 1107,
          pending: false,
        },
        {
          username: 'sedimar.silva',
          email: 'sedimar.silva@slcagricola.com.br',
          first_name: '',
          last_name: '',
          id: 211,
          profile_id: 208,
          pending: false,
        },
        {
          username: 'edvanise.braga',
          email: 'edvanise.braga@irricontrol.com.br',
          first_name: 'Edvanise',
          last_name: 'Pereira',
          id: 1253,
          profile_id: 1020,
          pending: false,
        },
        {
          username: 'mauricio.prado',
          email: 'projetos@pivonorte.com.br',
          first_name: 'Maurício',
          last_name: 'Prado',
          id: 1301,
          profile_id: 1053,
          pending: false,
        },
        {
          username: 'naci202mento',
          email: 'naci202mento@gmail.com',
          first_name: 'Jefferson ',
          last_name: 'Nascimento ',
          id: 1146,
          profile_id: 944,
          pending: false,
        },
        {
          username: 'reginaldoibce',
          email: 'reginaldoibce@hotmail.com',
          first_name: 'Reginaldo',
          last_name: 'Brito',
          id: 1622,
          profile_id: 1422,
          pending: false,
        },
        {
          username: 'gilsonnenen27',
          email: 'gilsonnenen27@gmail.com',
          first_name: 'gilson',
          last_name: 'Da Silva Ferreira',
          id: 1654,
          profile_id: 1454,
          pending: false,
        },
        {
          username: 'valdeci.quirino15',
          email: 'valdeci.quirino15@gmail.com',
          first_name: 'Valdeci',
          last_name: 'Júnior',
          id: 2039,
          profile_id: 1840,
          pending: false,
        },
        {
          username: 'meirelesromulo98',
          email: 'meirelesromulo98@gmail.com',
          first_name: 'ROMULO ',
          last_name: 'MEIRELES ',
          id: 956,
          profile_id: 805,
          pending: false,
        },
        {
          username: 'paulo.birman',
          email: 'paulobirman@hotmail.com',
          first_name: 'Paulo',
          last_name: 'Birman',
          id: 777,
          profile_id: 654,
          pending: false,
        },
        {
          username: 'emanuelirrigacerrado',
          email: 'emanuelirrigacerrado@gmail.com',
          first_name: 'Emanuel ',
          last_name: 'Santos ',
          id: 1258,
          profile_id: 1024,
          pending: false,
        },
        {
          username: 'wesleyarraial77',
          email: 'wesleyarraial77@gmail.com',
          first_name: 'Wesley',
          last_name: 'Antonio da Paz',
          id: 52,
          profile_id: 50,
          pending: false,
        },
        {
          username: 'comercial02.pivonorte',
          email: 'comercial02@pivonorte.com.br',
          first_name: 'comercial02',
          last_name: 'pivonorte',
          id: 1017,
          profile_id: 841,
          pending: false,
        },
        {
          username: 'krispim_sa',
          email: 'krispim_sa@hotmail.com',
          first_name: 'Matheus',
          last_name: 'Crispim Paraíso Santos',
          id: 250,
          profile_id: 244,
          pending: false,
        },
        {
          username: 'mendesricardo928',
          email: 'mendesricardo928@gmail.com',
          first_name: 'Ricardo',
          last_name: 'Mendes Silva',
          id: 78,
          profile_id: 75,
          pending: false,
        },
      ],
      is_administrator: true,
      administrators: [
        {
          id: 209,
          username: 'amilton.costa',
          name: '',
          email: 'amilton.costa@slcagricola.com.br',
          pending: false,
        },
        {
          id: 52,
          username: 'wesleyarraial77',
          name: 'WesleyAntonio da Paz',
          email: 'wesleyarraial77@gmail.com',
          pending: false,
        },
        {
          id: 1181,
          username: 'gustavomota',
          name: 'Gustavo Mota',
          email: 'gustavo.mota_@hotmail.com',
          pending: false,
        },
      ],
      temporary_administrator: null,
      temp_admin_up_to: null,
      base: {
        id: 4834,
        type: 'base',
        created: '2022-10-19T09:21:05.173317-03:00',
        updated: '2022-11-03T09:47:01.903028-03:00',
        radio_id: '0013A20041F4BA07',
        taken: null,
      },
      temp_admin_set_at: null,
      created: '2020-11-10T15:02:07.272189-03:00',
      updated: '2023-05-19T08:57:20.549877-03:00',
      name: 'SLC Pamplona',
      old_name: 'SLC Pamplona',
      country: 'BR',
      state: 'GO',
      city: 'Cristalina',
      address: '-',
      postal_code: '73850000',
      phone: '36229343',
      location: '-16.227678,-47.627476',
      billing_date: 27,
      water_billing_date: 1,
      img: null,
      phone_chip_number: '',
      inicio_array: [],
      fim_array: [],
      tipo_horario_array: [],
      start_pivot_report_aggregate: 2,
      start_irpd_report_aggregate: 2,
      power_ranges: {
        '0': [
          { end: '06:00:00', type: 2, start: '00:00:00' },
          { end: '18:00:00', type: 1, start: '06:00:00' },
          { end: '21:00:00', type: 0, start: '18:00:00' },
          { end: '23:59:00', type: 2, start: '21:00:00' },
        ],
        '1': [
          { end: '06:00:00', type: 2, start: '00:00:00' },
          { end: '18:00:00', type: 1, start: '06:00:00' },
          { end: '21:00:00', type: 0, start: '18:00:00' },
          { end: '23:59:00', type: 2, start: '21:00:00' },
        ],
        '2': [
          { end: '06:00:00', type: 2, start: '00:00:00' },
          { end: '18:00:00', type: 1, start: '06:00:00' },
          { end: '21:00:00', type: 0, start: '18:00:00' },
          { end: '23:59:00', type: 2, start: '21:00:00' },
        ],
        '3': [
          { end: '06:00:00', type: 2, start: '00:00:00' },
          { end: '18:00:00', type: 1, start: '06:00:00' },
          { end: '21:00:00', type: 0, start: '18:00:00' },
          { end: '23:59:00', type: 2, start: '21:00:00' },
        ],
        '4': [
          { end: '06:00:00', type: 2, start: '00:00:00' },
          { end: '18:00:00', type: 1, start: '06:00:00' },
          { end: '21:00:00', type: 0, start: '18:00:00' },
          { end: '23:59:00', type: 2, start: '21:00:00' },
        ],
        '5': [
          { end: '06:00:00', type: 2, start: '00:00:00' },
          { end: '23:59:00', type: 1, start: '06:00:00' },
        ],
        '6': [
          { end: '06:00:00', type: 2, start: '00:00:00' },
          { end: '23:59:00', type: 1, start: '06:00:00' },
        ],
      },
      holidays_list: [
        { day: 1, month: 1 },
        { day: 1, month: 3 },
        { day: 2, month: 3 },
        { day: 8, month: 3 },
        { day: 10, month: 4 },
        { day: 14, month: 4 },
        { day: 15, month: 4 },
        { day: 16, month: 4 },
        { day: 17, month: 4 },
        { day: 19, month: 4 },
        { day: 21, month: 4 },
        { day: 22, month: 4 },
        { day: 1, month: 5 },
        { day: 8, month: 5 },
        { day: 12, month: 6 },
        { day: 16, month: 6 },
        { day: 24, month: 6 },
        { day: 7, month: 9 },
        { day: 12, month: 10 },
        { day: 12, month: 10 },
        { day: 2, month: 11 },
        { day: 2, month: 11 },
        { day: 15, month: 11 },
        { day: 15, month: 11 },
        { day: 25, month: 12 },
        { day: 25, month: 12 },
      ],
      timezone: 'America/Sao_Paulo',
      cliente: '',
      payment_status: 0,
      zendesk_organization_id: 1260955441429,
      first_operation_date: '2021-04-28T16:13:45.089894-03:00',
      administrator: 209,
      maintainer: null,
      reseller: null,
      read_users: [
        1937, 2223, 686, 485, 1731, 128, 688, 726, 638, 574, 724, 974, 879, 897, 734, 1612, 1181,
        1016, 1144, 912, 1359, 211, 1253, 1301, 1146, 1622, 1654, 2039, 956, 777, 1017,
      ],
      write_users: [
        1937, 2223, 686, 576, 1731, 577, 128, 688, 726, 638, 574, 724, 974, 879, 897, 734, 1612,
        1181, 1016, 1144, 912, 1359, 211, 1253, 1301, 1146, 1622, 1654, 2039, 956, 777, 52, 1017,
        78,
      ],
      sms_users: [],
      repeaters: [],
    },
  },
});
