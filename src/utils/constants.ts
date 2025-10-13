/* eslint-disable @typescript-eslint/no-explicit-any */
import HomeIcon from '../assets/navIcons/HomeIcon';
import DepartmentIcon from '../assets/navIcons/DepartmentIcon';
import DutyIcon from '../assets/navIcons/DutyIcon';
import UnitIcon from '../assets/navIcons/UnitIcon';
import OrdersIcon from '../assets/navIcons/OrdersIcon';
import SickIcon from '../assets/navIcons/SickIcon';
import LeaveIcon from '../assets/navIcons/LeaveIcon';
import TrialIcon from '../assets/navIcons/TrialIcon';
import DisciplineIcon from '../assets/navIcons/DisciplineIcon';
import SignalIcon from '../assets/navIcons/SignalIcon';
import GuardIcon from '../assets/navIcons/GuardIcon';
import StaffIcon from '../assets/navIcons/StaffIcon';
import MailIcon from '../assets/navIcons/MailIcon';
// import ReturnsIcon from '../assets/navIcons/ReturnsIcon';
import AccommodationIcon from '../assets/navIcons/AccommodationIcon';
import MammyIcon from '../assets/navIcons/MammyIcon';
import LibraryIcon from '../assets/navIcons/LibraryIcon';
import EquipmentIcon from '../assets/navIcons/EquipmentIcon';
import VehicleIcon from '../assets/navIcons/VehicleIcon';
import ArmsIcon from '../assets/navIcons/ArmsIcon';
import UsersIcon from '../assets/navIcons/UsersIcon';
import type { NavigationItem } from './types';
import type { MainTableData } from './types/department';
import type { FormData } from './types/dutyReport';

export const navigationItems: NavigationItem[] = [
  {
    id: 'Home',
    label: 'Home',
    icon: HomeIcon,
    hasSubmenu: false,
    rout: '/home'
  },
  {
    id: 'Department File',
    label: 'Department File',
    icon: DepartmentIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/departmentFile/add' },
      { label: 'Department file list', action: 'list', rout: '/departmentFile/list' }
    ]
  },
  {
    id: 'Duty Report',
    label: 'Duty Report',
    icon: DutyIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/dutyReport/add' },
      { label: 'Daily Duty Report list', action: 'list', rout: '/dutyReport/list' }
    ]
  },
  {
    id: 'Unit Bible',
    label: 'Unit Bible',
    icon: UnitIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/unitBible/add' },
      { label: 'Unit Bible list', action: 'list', rout: '/unitBible/list' }
    ]
  },
  {
    id: 'Part 1 and Part 2 Orders',
    label: 'Part 1 and Part 2 Orders',
    icon: OrdersIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new Part 1 Order', action: 'add-part1', rout: '/order/add-new-p1' },
      { label: 'Add new Part 2 Order', action: 'add-part2', rout: '/order/add-new-p2' },
      { label: 'Part 1 Orders list', action: 'list-part1', rout: '/order/part-1-order-list' },
      { label: 'Part 2 Orders list', action: 'list-part2', rout: '/order/part-2-order-list' }
    ]
  },
  {
    id: 'Sick Report',
    label: 'Sick Report',
    icon: SickIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/sick-report/add' },
      { label: 'Sick Report list', action: 'list', rout: '/sick-report/list' }
    ]
  },
  {
    id: 'Leave/Pass',
    label: 'Leave/Pass',
    icon: LeaveIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/leave/add' },
      { label: 'Leave/Pass list', action: 'list', rout: '/leave/list' }
    ]
  },
  {
    id: 'Trial Form',
    label: 'Trial Form',
    icon: TrialIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/trial/add' },
      { label: 'Trial form list', action: 'list', rout: '/trial/list' }
    ]
  },
  {
    id: 'Discipline/Charge sheets',
    label: 'Discipline/Charge sheets',
    icon: DisciplineIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/discipline/add' },
      { label: 'Discipline/Charge Sheets list', action: 'list', rout: '/discipline/list' }
    ]
  },
  {
    id: 'Signal Form',
    label: 'Signal Form',
    icon: SignalIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/signal/add' },
      { label: 'Signal Form list', action: 'list', rout: '/signal/list' }
    ]
  },
  {
    id: 'Guard Room/Mess',
    label: 'Guard Room/Mess',
    icon: GuardIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/guard/add' },
      { label: 'Guard Room/Mess list', action: 'list', rout: '/guard/list' }
    ]
  },
  {
    id: 'Staff Nominal Roll',
    label: 'Staff Nominal Roll',
    icon: StaffIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/staff/add' },
      { label: 'Staff Nominal Roll list', action: 'list', rout: '/staff/list' }
    ]
  },
  {
    id: 'Mail Archiving system',
    label: 'Mail Archiving system',
    icon: MailIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/mail/add' },
      { label: 'Mail list', action: 'list', rout: '/mail/list' }
    ]
  },
  // {
  //   id: 'Returns',
  //   label: 'Returns',
  //   icon: ReturnsIcon,
  //   hasSubmenu: true,
  //   submenuItems: [
  //     { label: 'Add new', action: 'add' },
  //     { label: 'Returns list', action: 'list' }
  //   ]
  // },
  {
    id: 'Accommodation',
    label: 'Accommodation',
    icon: AccommodationIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/accommodation/add' },
      { label: 'Accommodation list', action: 'list', rout: '/accommodation/list' }
    ]
  },
  {
    id: 'Mammy Market',
    label: 'Mammy Market',
    icon: MammyIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/mammy/add' },
      { label: 'Shops list', action: 'list', rout: '/mammy/list' }
    ]
  },
  {
    id: 'Library/NA Books',
    label: 'Library/NA Books',
    icon: LibraryIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/library/add' },
      { label: 'Books list', action: 'list', rout: '/library/list' }
    ]
  },
  {
    id: 'Equipment/Machines In',
    label: 'Equipment/Machines In',
    icon: EquipmentIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/equipment/add' },
      { label: 'Equipment/Machines list', action: 'list', rout: '/equipment/list' }
    ]
  },
  {
    id: 'Vehicles Inventory',
    label: 'Vehicles Inventory',
    icon: VehicleIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/vehicle/add' },
      { label: 'Vehicles list', action: 'list', rout: '/vehicle/list' }
    ]
  },
  {
    id: 'Unit Arms', // unit-holding-arms
    label: 'Unit Arms',
    icon: ArmsIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/unit-holding-arms/add' },
      { label: 'Arms list', action: 'list', rout: '/unit-holding-arms/list' }
    ]
  },
  {
    id: 'Ammunitions', //ammunitions
    label: 'Ammunitions',
    icon: ArmsIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/ammunitions/add' },
      { label: 'Ammunition list', action: 'list', rout: '/ammunitions/list' }
    ]
  },
 
  {
    id: 'Users/Admins',
    label: 'Users/Admins',
    icon: UsersIcon,
    hasSubmenu: false,
    rout: '/user'
  }
];

export const sampleDepartmentData: MainTableData[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  fileNumber: '44 NARHK/G1/3001',
  fileTitle: "POSTING/APPT OFFER'S",
  attachment: true
}));

export const sampleDutyReportData: any[] = Array.from({ length: 50 }, (_, index) => ({
  no: `NA657880${index + 1}`,
  name: 'Yusufu amamya',
  timeReported: '08:00',
  timeFieldOfficer: '09:00',
  rank: 'Major',
  department: 'Orthopaedic'
}));

export const mockDutyReport: FormData = {
  dateCreated: '27/07/25',
  timeCreated: '1300 : 20sec',
  dutyOfficer: {
    pNo: '12345',
    rank: 'Captain',
    name: 'John Doe',
    department: 'Medical',
    timeReportedForDuty: '08:00',
    timeReportedFieldOfficer: '08:30',
    date: '27/07/25',
    signature: null,
    comments: 'All posts checked and in order.'
  },
  fieldOfficer: {
    pNo: '54321',
    rank: 'Major',
    name: 'Jane Smith',
    date: '27/07/25',
    signature: null,
    comments: 'No issues found.',
    recommendations: 'Continue current protocol.'
  },
  coAdmin: {
    pNo: '67890',
    rank: 'Lieutenant Colonel',
    name: 'Alex Brown',
    date: '27/07/25',
    signature: null,
    comments: 'Reviewed and approved.'
  },
  cmd: {
    pNo: '98765',
    rank: 'Colonel',
    name: 'Chris Green',
    date: '27/07/25',
    signature: null,
    comments: 'Well done.'
  },
  dutyPosts: [
    { id: 1, name: 'HOSPITAL ENTRANCE GATE', dayHours: '2', nightHours: '3' },
    { id: 2, name: 'LAFIYA DOLE GATE', dayHours: '1', nightHours: '2' },
    { id: 3, name: 'ARMOURY', dayHours: '1', nightHours: '1' },
    { id: 4, name: 'NO. 3 RACE COURSE', dayHours: '0', nightHours: '1' },
    { id: 5, name: 'CANTONMENT GATE', dayHours: '2', nightHours: '2' },
    { id: 6, name: 'MAMMY MARKET', dayHours: '1', nightHours: '1' },
    { id: 7, name: 'CATTLE RANCH', dayHours: '0', nightHours: '1' },
    { id: 8, name: 'A&E', dayHours: '1', nightHours: '0' },
    { id: 9, name: 'GUARD ROOM', dayHours: '2', nightHours: '2' }
  ]
};

export const sampleUserData: any[] = Array.from({ length: 50 }, (_, index) => ({
  name: 'Musa Ibrahim',
  email: `musa.ibrahim${index + 1}@example.com`,
  rank: 'Captain',
  role: index % 2 === 0 ? 'Admin' : 'User',
  status: index % 2 === 0 ? 'Active' : 'Inactive',
  dateCreated: `01/01/20${20 + (index % 4)}`
}));

export const sampleUnitBibleData: any[] = Array.from({ length: 50 }, (_, index) => ({
  no: index + 1,
  image: '/unitBible/images/image-1.svg',
  name: 'Sakara Taore',
  serviceNumber: `NA657880${index + 1}`,
  age: 30 + (index % 10),
  rank: 'Private',
  status: index % 2 === 0 ? 'Active' : 'Inactive',
  dateOfEnlistment: `01/01/20${20 + (index % 4)}`,
  corps: 'Infantry'
}));

export const sampleOrderData: any[] = Array.from({ length: 50 }, (_, index) => ({
  issueNo: 'O1/25',
  name: 'Sakara Taore',
  serviceNumber: `NA657880${index + 1}`,
  rank: 'Private',
  decorations: 'Silver Star',
  appointment: 'Tea Break',
  unit: '44 Division',
  date: `01/01/20${20 + (index % 4)}`
}));

export const sampleSickData: any[] = Array.from({ length: 50 }, (_, index) => ({
  number: index + 1,
  armyNumber: 'NA5826778GB',
  rank: 'Major',
  name: 'Sakara Taore',
  department: `Oncology`,
  admission: index % 2 === 0 ? 'Yes' : 'No',
  sickDays: 5,
  excuse: 'Shaving'
}));

export const sampleGuardData: any[] = Array.from({ length: 50 }, (_, index) => ({
  number: index + 1,
  armyNumber: 'NA5826778GB',
  rank: 'Major',
  name: 'Sakara Taore',
  offence: 'Refused to salute',
  dateDetained: '23/03/2025',
  detainedBy: 'Marvin McKinney',
  releasedBy: 'Okoro Paul'
}));

export const sampleStaffData: any[] = Array.from({ length: 50 }, () => ({
  armyNumber: 'NA5826778GB',
  rank: 'Major',
  name: 'Sakara Taore',
  dob: '27/09/1982',
  maritalStatus: 'Married',
  tradeClass: 'Trade Class',
  doe: '13/06/1995'
}));

export const sampleMammyData: any[] = Array.from({ length: 50 }, (_, index) => ({
  sn: index + 1,
  shopOwner: 'Esther Yusuf',
  rentage: '1 year',
  name: 'Sakara Taore',
  shopNumber: index + 12,
  rentageFee: '4,000 ',
  phone: '08067255677',
  businessType: 'Sells Peper onion, rice and bean'
}));

export const sampleEquipmentData: any[] = Array.from({ length: 50 }, (_, index) => ({
  sn: index + 1,
  name: 'Printing machine',
  status: 'unserviceable',
  year: '2020',
  remark: 'However rare side effects observed......'
}));

export const sampleVehicleData: any[] = Array.from({ length: 50 }, (_, index) => ({
  sn: index + 1,
  type: 'Ford F-150',
  chassis: 'SV30-0169266',
  engine: 'V8-123456',
  year: '2009',
  serviceability: 'Yes',
  yearIssued: '2010'
}));

export const sampleAccommodationData: any[] = Array.from({ length: 50 }, (_, index) => ({
  sn: index + 1,
  armyNumber: 'NA5826778GB',
  rank: 'Major',
  name: 'Sakara Taore',
  blockNo: 12,
  roomNo: 3,
  unit: '44 Nigerian Refer',
  remarks: 'Was allocated yesterday '
}));

export const sampleMailData: any[] = Array.from({ length: 50 }, (index: number) => ({
  sn: index + 1,
  subject: 'Troops Deployment',
  toFrom: '23 Nigerian Army Refere.',
  ref: 'NA45689',
  date: '27/09/1982',
  file: true
}));

export const sampleLeaveData: any[] = Array.from({ length: 50 }, (_, index) => ({
  number: index + 1,
  armyNumber: 'NA5826778GB',
  rank: 'Major',
  name: 'Sakara Taore',
  destination: 'Lagos',
  status: index % 2 === 0 ? 'Recommending officer signed' : 'Commanding officer signed'
}));

export const sampleUnitData: any[] = Array.from({ length: 50 }, (_, index) => ({
  sn: index + 1,
  ltrOfReg: 100,
  auth: 'Major',
  wynType: 500,
  country: 'Nigeria',
  regNo: `NA657880${index + 1}`,
  buttNo: `${index + 1}775NB`
}));

export const sampleDisciplineData: any[] = Array.from({ length: 50 }, (_, index) => ({
  number: index + 1,
  drafterName: 'Sakara Taore',
  from: '44 Nigeria Reference Hospital',
  to: '44 Nigeria Reference Hospital',
  branch: 'Medical'
}));

export const sampleTrialData: any[] = Array.from({ length: 50 }, (_, index) => ({
  number: index + 1,
  accusedNumber: 'NA5826778GB',
  rank: 'Major',
  name: 'Sakara Taore',
  unit: '44 Nigeria Reference Hospital '
}));

export const sampleLeaveList: any[] = Array.from({ length: 50 }, (_, index) => ({
  number: index + 1,
  armyNumber: 'NA5826778GB',
  rank: 'Major',
  name: 'Sakara Taore',
  destination: 'Lagos',
  numberOfDays: 10,
  returnDate: `01/01/20${20 + (index % 4)}`,
  status: index % 2 === 0 ? 'Active Leave' : 'Absent'
}));

export const sampleOrderTwoData: any[] = Array.from({ length: 50 }, (_, index) => ({
  no: index + 1,
  issueNo: 'NA768236',
  officer: 'Sakara Taore',
  issueNumber: `NA657880${index + 1}`,
  sheetNumber: `${index + 1}775NB`,
  unit: '44 Nigeria Army Reference Hospital',
  date: `01/01/20${20 + (index % 4)}`
}));

export const mockOfficerBioData = {
  status: 'active',
  image: '/unitBible/mock-user.svg',
  name: 'John Doe',
  pno: 'NA123456',
  rank: 'Major',
  corps: 'Infantry',
  qualification: 'BSc Military Science',
  dateOfBirth: '01/01/1980',
  directorate: 'FCM',
  dateOfCommission: '01/01/2005',
  sex: 'Male',
  bloodGroup: 'A+',
  genotype: 'AA',
  dateOfCommission2: '01/01/2010',
  dateOfLastPromotion: '01/01/2020',
  dateOfTakingStrength: '01/01/2015',
  religion: 'Christian',
  dateOfPostedIn: '01/01/2022',
  maritalStatus: 'Married',
  phoneNumber: '+2348012345678',
  placeOfBirth: 'Lagos',
  stateOfOrigin: 'Lagos',
  lga: 'Ikeja',
  permanentAddress: '123 Army Barracks, Lagos',
  emailAddress: 'john.doe@email.com',
  numberOfChildren: '2',
  numberOfWives: '1',
  nameOfChildren: ['Jane Doe', 'Jack Doe'],
  nameOfWives: ['Mary Doe'],
  nameOfNextOfKin: 'Mary Doe',
  relationshipWithNextOfKin: 'Spouse',
  addressOfNextOfKin: '123 Army Barracks, Lagos',
  phoneNumberOfNextOfKin: '+2348012345678',
  honourAndAward: 'Best Officer 2020',
  operations: [
    { operation: 'Operation Peace', date: '01/01/2018', location: 'Maiduguri' },
    { operation: 'Operation Unity', date: '01/01/2019', location: 'Abuja' }
  ],
  lastThreeUnits: { a: 'Unit A', b: 'Unit B', c: 'Unit C' },
  remarks: 'Excellent service record.'
};
export const initialBiodataState= {
  name: '',
  pno: '',
  rank: 'Major',
  corps: '',
  qualification: '',
  dateOfBirth: '',
  directorate: 'FCM',
  dateOfCommission: '',
  sex: 'Male',
  bloodGroup: 'A+',
  genotype: 'AA',
  dateOfCommission2: '',
  dateOfLastPromotion: '',
  dateOfTakingStrength: '',
  religion: 'Christian',
  dateOfPostedIn: '',
  maritalStatus: 'Single',
  phoneNumber: '',
  placeOfBirth: '',
  stateOfOrigin: '',
  lga: '',
  permanentAddress: '',
  emailAddress: '',
  numberOfChildren: '0',
  numberOfWives: '0',
  nameOfChildren: [''],
  nameOfWives: [''],
  nameOfNextOfKin: '',
  relationshipWithNextOfKin: 'Brother',
  addressOfNextOfKin: '',
  photo: "",
  phoneNumberOfNextOfKin: '',
  honourAndAward: '',
  operations: [{ operation: '', date: '', location: '' }],
  lastThreeUnits: { a: '', b: '', c: '' },
  remarks: ''
};
export const initialSickReport: any = {
  officer_id: '',
  recommending_officer_id: '',
  excuse_duty: '',

  admission: '',
  admission_days: '',
  sick_leave_days: '',
  return_date: '',
  remarks: ''
};

export const mockOrderData = {
  header: {
    title: 'PART ONE ORDER BY',
    commandingOfficer:
      'MAJOR GEN. USAMAN DOGO (NA/1178) MSS FCM MBBS (NIG) FWC 44 NIGERIA ARMY HOSPITAL KADUNA'
  },
  personalDetails: {
    rank: 'Major',
    name: 'Joe Micheal Okoro',
    serviceNo: 'NA 787984',
    decorations: 'Silver star',
    issueNo: '02/34',
    unit: '02/34',
    appointment: 'Guard Mounting',
    date: '02/34'
  },
  routineActivities: [
    { time: '0600 HR', activity: 'Reveille', days: 'Daily' },
    { time: '0605 HR', activity: 'Morning PT', days: 'Monday/Wednesday' },
    { time: '0700HR', activity: 'Sick Report Parade', days: 'Daily' },
    { time: '0700HR', activity: 'Muster Parade', days: 'Daily' },
    { time: '0700HR', activity: 'CO Admin Parade', days: 'Wednesday' },
    { time: '0700HR', activity: 'Inspection of Quarter Guard', days: 'Mondays' },
    { time: '0700HR', activity: 'HOD Meetings', days: 'Mondays' },
    { time: '0700HR', activity: "CO Admin's Orders/Interviews", days: 'Thursdays' },
    { time: '0700HR', activity: 'Tea Break', days: 'Thursdays' },
    { time: '0700HR', activity: 'Padre Hour', days: 'Fridays' },
    { time: '0700HR', activity: 'Evening Games', days: 'Tuesdays/Thursday' },
    { time: '0600 HR', activity: 'Guard Mountings', days: 'Daily' }
  ],
  dutyDepartment: {
    department: 'Ortho Surgeon on call',
    date: '22/05/25',
    rank: 'Captain',
    serviceNo: 'NA890567',
    name: 'Joshua Peter Momoh'
  },
  firePicketGuardDuty: {
    dutyDuration: '0600',
    location: 'Location',
    serviceNo: 'NA756789',
    name: 'Timothy Baba Poko'
  },
  noticeBoardInfo: {
    subject: 'Deployment',
    timeOut: '1300',
    comment:
      'Alcohol based exposures through inadvertently consuming hand sanitizer, have been observed to produce However rare side effects observed among children can be metabolic acidosis, coma, respiratory depression',
    signatory: {
      name: 'Taribo Jude',
      rank: 'Major Gen',
      appointment: 'Supervisor'
    }
  },
  dateCreated: '01/01/2023',
  timeCreated: '12:00 PM'
};

export const mockPartTwoOrderData = {
  unit: '44 NIGERIAN ARMY REFERENCE HOSPITAL',
  phone: '+2348071792603',
  email: 'reference.hospital@yahoo.com',
  location: 'KADUNA',
  header: {
    partOrder: 'PART II ORDER 001',
    issueNo: 'ISS/2024/001',
    date: '15/07/2024',
    unit: '44 NARH',
    sheetNo: 'SH-001'
  },
  strengthIncrease: {
    postedIn: 'Senior officer',
    rank: 'Captain',
    name: 'John Doe',
    serviceNo: 'NA/12345',
    appointment: 'Medical Officer',
    previousUnit: '82 Division Hospital',
    effectiveDate: '01/08/2024',
    corps: 'NAMC',
    authority: 'AHQ Letter Ref 123/2024'
  },
  strengthDecrease: {
    postedOut: 'Senior officer',
    rank: 'Major',
    name: 'Jane Smith',
    serviceNo: 'NA/67890',
    appointment: 'Chief Medical Officer',
    previousUnit: '44 NARH',
    effectiveDate: '31/07/2024',
    corps: 'NAMC',
    authority: 'AHQ Letter Ref 124/2024'
  },
  payAllowance1: {
    postedOut: 'Officer',
    rank: 'Lieutenant',
    name: 'Mike Johnson',
    serviceNo: 'NA/11111',
    appointment: 'Nurse',
    previousUnit: 'Command Hospital',
    effectiveDate: '15/07/2024',
    corps: 'NAMC',
    authority: 'Command Letter Ref 125/2024'
  },
  payAllowance2: {
    from: 'Senior officer',
    rank: 'Colonel',
    name: 'Sarah Wilson',
    serviceNo: 'NA/22222',
    appointment: 'Director Medical Services',
    previousUnit: 'AHQ Medical Corps',
    effectiveDate: '01/08/2024',
    corps: 'NAMC',
    authority: 'AHQ Letter Ref 126/2024'
  },
  miscellaneous: {
    from: 'Child birth',
    rank: 'Captain',
    name: 'David Brown',
    serviceNo: 'NA/33333',
    appointment: 'Pharmacist',
    previousUnit: '44 NARH',
    effectiveDate: '20/07/2024',
    corps: 'NAMC',
    authority: 'Unit Letter Ref 127/2024'
  },
  distribution: [
    { id: 1, name: 'HQ 1 DIV', copies: 'Two Copies', subName: 'AHQ DAPP', subCopies: 'One Copy' },
    { id: 2, name: 'HQ 2 DIV', copies: 'One Copy', subName: 'AHQ DAPP', subCopies: 'Two Copies' },
    { id: 3, name: 'HQ 3 DIV', copies: 'Three Copies', subName: 'AHQ DAPP', subCopies: 'One Copy' }
  ]
};

export const mockSickFormData = {
  armyNumber: 'SA2023001',
  rank: 'Sergeant',
  name: 'John Doe Smith',
  department: 'Medical Corps',
  excuseDuty: 'Excuse all duty',
  excuseDutyDays: '14',
  admission: 'Yes',
  admissionDays: '7',
  sickLeaveDays: '21',
  returnDate: '08/15/2025',
  remarks:
    'Patient requires complete rest and medication compliance. Follow-up appointment scheduled for next week.'
};

export const mockLeaveFormData = {
  armyNumber: 'LF2025001',
  rank: 'Captain',
  name: 'Michael Thompson',
  destination: 'Lagos, Nigeria',
  numberOfDays: '14',
  from: '08/15/2025',
  to: '08/29/2025',
  reasonForApplication:
    'Annual leave to visit family and attend to personal matters. This is a well-deserved break after completing the intensive training program.',
  signature: '',
  // Recommending Officer
  recRank: 'Major',
  recName: 'Sarah Johnson',
  appointment: 'Head of Department',
  remark: 'Recommended',
  noOfDaysRecommended: '14',
  recSignature: '',
  // Commanding Officer
  cmdRank: 'Colonel',
  cmdName: 'John Smith',
  cmdAppointment: 'Commanding Officer',
  cmdRemark: 'Approve',
  noOfDaysApprove: '14',
  returnDate: '08/30/2025',
  cmdSignature: ''
};

export const mockTrialFormData = {
  accusedNumber: 'ACC2025001',
  rank: 'Private',
  name: 'David Wilson',
  unit: '3rd Battalion Infantry Regiment',
  q1: 'Yes, I have received a copy of the charge sheet and summary of evidence more than 24 hours ago. I have had sufficient time to review and understand all documents provided.',
  q2: 'Yes, I have heard and understand the charges that have been read against me clearly.',
  q3: 'Yes, I fully understand the nature and implications of the charges brought against me.',
  q4: 'No, I have not agreed in writing that witnesses against me need not give their evidence in person. I would like the witnesses to appear in person.',
  q5: 'I wish to give evidence on oath regarding the facts of the case and would like to present matters in mitigation of punishment.',
  q6: 'Yes, I wish to adduce evidence in my defence including character witnesses and documentation that supports my case.',
  q7: 'I will accept your award and do not elect to be tried by court martial.',
  finding: 'Guilty of the charge as presented',
  award: 'Reduction in rank and 14 days detention',
  date: '03/08/2025',
  rankOfficer: 'Major',
  appointment: 'Commanding Officer',
  signature: ''
};

export const mockDisciplineFormData = {
  // The Accused
  accusedRank: 'Private',
  accusedName: 'John Michael Smith',
  accusedArmyNo: 'NA2025001',
  accusedUnit: '2nd Battalion Infantry Regiment',
  statementOfOffence:
    'Disobedience to lawful command contrary to good order and military discipline',
  punishableUnderSection: 'Section 62 of the Armed Forces Act',
  particularsOfOffence:
    'That the accused on 15th July 2025 at approximately 14:30 hours at the barracks, when ordered by his platoon sergeant to clean the weapons storage area, willfully refused to carry out the lawful command without reasonable excuse.',

  // Offence Reported By
  reporterRank: 'Sergeant',
  reporterName: 'James Robert Wilson',
  reporterArmyNo: 'NA1998045',
  reporterUnit: '2nd Battalion Infantry Regiment',

  // Witness
  witnessRank: 'Corporal',
  witnessName: 'Sarah Michelle Johnson',
  witnessArmyNo: 'NA2010023',
  witnessUnit: '2nd Battalion Infantry Regiment',

  // To Be Tried By
  trialRank: 'Major',
  trialName: 'David Andrew Thompson',
  trialArmyNo: 'NA1995012',
  trialUnit: '2nd Battalion Infantry Regiment',

  // Company or Equivalent Commander
  coFindings:
    'Guilty as charged. The accused willfully disobeyed a direct lawful order from a superior officer.',
  coAward: 'Confinement to barracks for 7 days and extra duties',
  coRecommendations: 'Recommend disciplinary action and additional training on military discipline',
  coDate: '20/07/2025',
  coRank: 'Captain',
  coName: 'Michael John Brown',
  coNumber: 'NA2000056',
  coSignature: 'M.J. Brown',

  // BN Commander or Equivalent
  bnFinding: 'Concur with company commander findings. Pattern of insubordination noted.',
  bnAward: 'Reduction in rank and 14 days detention',
  bnRecommendations: 'Recommend transfer to different unit and mandatory leadership counseling',
  bnDate: '22/07/2025',
  bnRank: 'Lieutenant Colonel',
  bnName: 'Robert Charles Davis',
  bnNumber: 'NA1990034',
  bnSignature: 'R.C. Davis',

  // BDE/GAR Commander or Equivalent
  bdeFindings: 'Findings upheld. Serious breach of military discipline requiring firm action.',
  bdeAward: 'Reduction in rank, 21 days detention, and forfeiture of pay',
  bdeRecommendations: 'Immediate remedial training and psychological evaluation',
  bdeDate: '25/07/2025',
  bdeRank: 'Colonel',
  bdeName: 'Patricia Anne Miller',
  bdeNumber: 'NA1985019',
  bdeSignature: 'P.A. Miller',

  // General Officer Commanding or Equivalent
  gocFindings: 'Final review completed. All findings and recommendations approved.',
  gocAward: 'Final award: Reduction to Private, 30 days detention, loss of privileges',
  gocRecommendations: 'Complete disciplinary rehabilitation program before return to active duty',
  gocDate: '28/07/2025',
  gocRank: 'Brigadier',
  gocName: 'William George Anderson',
  gocNumber: 'NA1982007',
  gocSignature: 'W.G. Anderson'
};

export const mockSignalFormData = {
  drafterName: 'JOHN MICHAEL SMITH',
  from: 'HQ 3rd Infantry Brigade',
  to: 'All Battalion Commanders',
  info: 'Divisional HQ, Artillery Command, Signal Regiment',
  precedenceAction: 'ROUTINE',
  branch: 'Operations',
  precedenceInfo: 'PRIORITY',
  telephoneNumber: '+234-803-555-0123',
  dateTimeGroupMonth: '030825Z AUG 25',
  digSerialNo: 'SIG2025/08/003',
  nameInBlockLetters: 'MAJOR DAVID ANDREW WILSON',
  messageInstructions:
    'For immediate action. Acknowledge receipt within 2 hours. Copy to be filed under operational directives.',
  releasingOfficerRank: 'Lieutenant Colonel',
  securityClassification: 'RESTRICTED',
  originatorNumber: 'OP/25/0803',
  text: 'SUBJECT: OPERATIONAL READINESS EXERCISE THUNDER BOLT 2025\n\n1. REFERENCE: DIVISION OPERATION ORDER 15/2025 DTG 010825Z AUG 25\n\n2. SITUATION: All units are to conduct immediate readiness assessment in preparation for Exercise Thunder Bolt 2025 scheduled to commence 150600Z AUG 25.\n\n3. MISSION: Conduct comprehensive equipment and personnel readiness verification by 050600Z AUG 25.\n\n4. EXECUTION:\n   a. Phase 1: Equipment inspection and maintenance verification\n   b. Phase 2: Personnel medical and training status confirmation\n   c. Phase 3: Submit consolidated readiness report\n\n5. ADMIN AND LOG: Standard field exercise protocols apply. Medical support on standby.\n\n6. COMMAND AND SIGNAL: Report directly to Brigade Operations by secure communication.',
  internalDistribution: 'CO - Action\nOps Officer - Info\nS1 - Info\nS4 - Action\nRSM - Info',
  fileNumberReference:
    'OPS/EXER/2025/THUNDERBOLT\nRef: Div Comd Letter 45/2025\nCopy to: Training Wing, Medical Corps',
  pageNumber: '1',
  totalPages: '2',
  additionalInfo:
    'Classification review date: 03 FEB 2026\nDistribution restriction: For official use only\nSecurity handling: Store in classified registry',
  thisMessageAppropriate: true,
  refersToClassified: true,
  doesNotReferClassified: false,
  commGenSerial: 'GEN/OP/2025/156',
  seniorReceived: '030830Z AUG 25',
  system: 'SECURE COMMS',
  timeInOut: '030800Z/030830Z'
};

export const mockGuardFormData = {
  armyNumber: 'NA2025012',
  rank: 'Private',
  name: 'MICHAEL JOHN WILLIAMS',
  offence: 'Absence without official leave (AWOL) for 48 hours',
  dateDetained: '2025-08-02',
  detainedBy: 'Sergeant Major Thompson',
  releasedBy: 'Captain David Brown',
  remark:
    'Soldier was found at unauthorized location during duty hours. Showed remorse and cooperation during detention. Recommended for disciplinary action and additional duty assignment. No previous disciplinary issues on record.'
};

export const mockStaffFormData = {
  armyNumber: 'NA2025045',
  rank: 'Major',
  name: 'SARAH ELIZABETH JOHNSON',
  dob: '15/03/1985',
  maritalStatus: 'Married',
  tradeClass: 'Medical Officer Class 1',
  doe: '12/05/2008',
  dolp: '20/11/2023',
  dtos: '15/02/2025',
  currentDepartment: 'Army Reference Hospital',
  directorate: 'Medical Services Directorate',
  lastThreeUnits: [
    '3rd Field Ambulance Unit',
    'Army Medical College',
    '1st Military Hospital Lagos'
  ],
  corps: 'Nigerian Army Medical Corps',
  phoneNumber: '+234-803-456-7890',
  remarks:
    'Highly competent medical officer with extensive field experience. Specializes in emergency medicine and trauma surgery. Completed advanced medical training in the UK. Recommended for promotion to Lieutenant Colonel. Excellent leadership qualities and mentoring skills for junior medical staff.'
};

export const mockMailFormData = {
  toFrom: 'From: 82 Division Hospital Enugu\nTo: Nigerian Army Medical Corps Headquarters',
  subject: 'Monthly Medical Supply Requirements and Equipment Status Report',
  date: '15/12/2024',
  fileRef: 'NA/82DIV/MED/2024/0847',
  uploadedFile: {
    name: 'Medical_Supply_Report_December_2024.pdf',
    size: 2847620, // ~2.85MB
    type: 'application/pdf',
    file: null // Mock file object would go here
  }
};

export const mockAccommodationFormData = {
  armyNumber: 'NA2025078',
  rank: 'Captain',
  name: 'JAMES MICHAEL ANDERSON',
  blockNo: 'Block C-14',
  roomNo: 'Room 207',
  unit: '82 Division Medical Corps',
  allocationDate: '2024-11-15',
  remark:
    'Officer allocated to single occupancy room with attached bathroom facilities. Room includes basic furniture, internet connection, and air conditioning. Allocation valid for 2 years subject to posting orders. Any damages to room facilities will be charged to occupant.'
};

export const mockMammyFormData = {
  shopOwner: 'FATIMA ABDULLAHI MOHAMMED',
  rentage: '₦25,000',
  shopNumber: 'MM-A14',
  natureOfBusiness: 'Food & Beverages - Restaurant Services',
  phoneNumber: '+234 803 456 7890',
  allocationDate: '2024-10-15',
  remark:
    'Shop allocated for food service operations within military quarters. Approved for breakfast, lunch and dinner services to military personnel and families. Must maintain high hygiene standards and competitive pricing. Health inspection required monthly. Rental agreement valid for 2 years with renewal option.',
  uploadedImage: '/mock-mammy-user.svg'
};

export const mockLibraryFormData = {
  bookTitle: 'The Art of War',
  author: 'Sun Tzu',
  isbn: '978-0140449198',
  genre: 'Historical',
  language: 'English',
  issuedDate: '2024-07-15',
  numberOfCopies: '3',
  bookCover: '/mock-art-of-war.jpg'
};

export const sampleLibraryData = [
  {
    sn: 1,
    bookTitle: 'The Art of War',
    author: 'Sun Tzu',
    genre: 'Historical',
    noCopies: 3,
    date: '2024-07-15'
  },
  {
    sn: 2,
    bookTitle: 'Things Fall Apart',
    author: 'Chinua Achebe',
    genre: 'Fiction',
    noCopies: 5,
    date: '2024-07-10'
  },
  {
    sn: 3,
    bookTitle: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    noCopies: 2,
    date: '2024-06-28'
  },
  {
    sn: 4,
    bookTitle: 'Half of a Yellow Sun',
    author: 'Chimamanda Ngozi Adichie',
    genre: 'Historical Fiction',
    noCopies: 4,
    date: '2024-06-20'
  },
  {
    sn: 5,
    bookTitle: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    noCopies: 6,
    date: '2024-06-15'
  }
];

export const mockEquipmentFormData = {
  equipmentName: 'Defibrillator',
  functionStatus: 'Serviceable',
  yearPurchased: '2021',
  lastServiceDate: '2024-05-10',
  serviceDetails: 'Routine maintenance completed. Battery replaced and software updated.',
  remark: 'Ready for emergency use. Next service due in 12 months.'
};

export const mockVehicleFormData = {
  typeModel: 'Toyota Hiace Ambulance',
  chassisNumber: 'JHFGH12K3L4567890',
  engineNumber: 'ENG2024AMB1234',
  yearOfMake: '2022',
  yearIssued: '2023',
  serviceabilityState: 'Yes',
  howDeployed: 'Ambulance',
  dateOfLastService: '12/06/24',
  serviceDetails: 'Full service completed. Oil, filters, and brake pads replaced.',
  remark: 'Vehicle in excellent condition. Ready for deployment.'
};

export const mockUnitFormData = {
  ltrOfReq: 'LTR/REQ/2024/081',
  auth: 'HQ AUTH/2024/56',
  wpnType: 'AK-47 Rifle',
  countryOfOrigin: 'Nigeria',
  regNo: 'NA-ARM-2024-001',
  buttNo: 'B-1023',
  assignedFmnUnit: '82 Division, Enugu',
  armouryLocation: 'Main Armoury Block B',
  condition: 'Serviceable',
  dateToc: '12/07/24',
  status: 'Active',
  purposeOfIssue: 'Routine patrol and security operations',
  remark: 'Weapon issued in good condition. To be returned after operation.'
};


export const LOGO_BASE64 = "data:image/png;base64,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"