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
    id: 'Unit Arms',
    label: 'Unit Arms',
    icon: ArmsIcon,
    hasSubmenu: true,
    submenuItems: [
      { label: 'Add new', action: 'add', rout: '/unit/add' },
      { label: 'Arms list', action: 'list', rout: '/unit/list' }
    ]
  },
  // {
  //   id: 'Ammunitions',
  //   label: 'Ammunitions',
  //   icon: ArmsIcon,
  //   hasSubmenu: true,
  //   submenuItems: [
  //     { label: 'Add new', action: 'add' },
  //     { label: 'Ammunitions list', action: 'list' }
  //   ]
  // },
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
export const initialBiodataState: BiodataFormData = {
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
  phoneNumberOfNextOfKin: '',
  honourAndAward: '',
  operations: [{ operation: '', date: '', location: '' }],
  lastThreeUnits: { a: '', b: '', c: '' },
  remarks: '',
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
