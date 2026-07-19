const memberTypes = {
  founder: {
    label: 'Founder', tier: 'Obsidian', letter: 'F', primary: '#c8fa48', deep: '#151613', soft: '#e6f7b8', contrast: '#151613',
    intro: 'Executive benefits selected for building and running your company.', passAudience: 'founders.', accessTitle: 'Executive access',
    accessDescription: 'Business, travel, leadership and every community-wide benefit.', demoColor: '#1c1e1a', demoText: '#ffffff'
  },
  employee: {
    label: 'Employee', tier: 'Cobalt', letter: 'E', primary: '#8eafff', deep: '#2447a7', soft: '#dfe7ff', contrast: '#13245a',
    intro: 'Professional benefits selected for career growth, productivity and daily life.', passAudience: 'professionals.', accessTitle: 'Professional access',
    accessDescription: 'Career, workspace, learning, lifestyle and community-wide benefits.', demoColor: '#3f68dd', demoText: '#ffffff'
  },
  student: {
    label: 'Student', tier: 'Violet', letter: 'S', primary: '#c4b5ff', deep: '#5941bb', soft: '#e8e2ff', contrast: '#251862',
    intro: 'Learning and early-career benefits selected to help you build your foundation.', passAudience: 'students.', accessTitle: 'Campus access',
    accessDescription: 'Learning, productivity, career-entry and community-wide benefits.', demoColor: '#7c61de', demoText: '#ffffff'
  },
  unemployed: {
    label: 'Between opportunities', tier: 'Amber', letter: 'O', primary: '#ffd17e', deep: '#a76015', soft: '#fae8c7', contrast: '#3d2608',
    intro: 'Opportunity benefits selected for skills, job-readiness and your next chapter.', passAudience: 'your next move.', accessTitle: 'Opportunity access',
    accessDescription: 'Skills, job-search, productivity and community-wide benefits.', demoColor: '#e9a63e', demoText: '#33220a'
  }
};

const demoAccounts = [
  { email:'founder@foundry.demo', password:'demo123', role:'founder', name:'Haile Adugna', subtitle:'Founder · Modern Ethiopia', id:'FDRY-F-260071' },
  { email:'employee@foundry.demo', password:'demo123', role:'employee', name:'Sara Bekele', subtitle:'Marketing Manager · Meraki Group', id:'FDRY-E-260184' },
  { email:'student@foundry.demo', password:'demo123', role:'student', name:'Nahom Tesfaye', subtitle:'Business Student · AAU', id:'FDRY-S-260239' },
  { email:'opportunity@foundry.demo', password:'demo123', role:'unemployed', name:'Liya Girma', subtitle:'Product Designer · Open to work', id:'FDRY-O-260306' },
  { email:'admin@foundry.demo', password:'demo123', role:'admin', name:'Community Admin', subtitle:'Foundry Operations', id:'ADMIN' }
];

const baseOffers = [
  { id:'aws', brand:'aws', title:'$5,000 in cloud credits', category:'business', label:'TECH', value:'Up to $5,000', color:'#c8fa48', text:'#151613', description:'Build, test and scale with startup-friendly cloud credits for eligible Foundry businesses.', eligibility:['founder'], featured:true, status:'active' },
  { id:'qatar', brand:'QATAR\nAIRWAYS', title:'20% off global flights', category:'travel', label:'TRAVEL', value:'Up to 20% off', color:'#f37e60', text:'#ffffff', description:'Access member-only fares across more than 170 destinations for business and personal travel.', eligibility:['founder'], featured:true, status:'active' },
  { id:'wework', brand:'WEWORK', title:'3 months workspace free', category:'business', label:'WORKSPACE', value:'3 months free', color:'#668fe9', text:'#ffffff', description:'Work flexibly from premium workspaces and business lounges in participating cities.', eligibility:['founder','employee'], featured:true, status:'active' },
  { id:'canva', brand:'Canva', title:'50% off Canva Teams', category:'business', label:'DESIGN', value:'Save 50%', color:'#b89cff', text:'#201444', description:'Create polished presentations, social content and team assets with premium design tools.', eligibility:['founder','employee','student','unemployed'], featured:true, status:'active' },
  { id:'hyatt', brand:'HYATT', title:'Complimentary room upgrade', category:'travel', label:'HOTELS', value:'Free upgrade', color:'#e7d2af', text:'#3c2d18', description:'Receive a complimentary room upgrade when available at participating properties.', eligibility:['founder'], featured:false, status:'active' },
  { id:'selam', brand:'SELAM\nCOFFEE', title:'Buy one, get one coffee', category:'local', label:'ADDIS PERK', value:'Buy 1, get 1', color:'#d99b6c', text:'#3a1f0c', description:'Meet, work or recharge with a complimentary second coffee at participating branches.', eligibility:['founder','employee','student','unemployed'], featured:false, status:'active' },
  { id:'notion', brand:'Notion', title:'6 months of Plus free', category:'business', label:'PRODUCTIVITY', value:'6 months free', color:'#dfe0db', text:'#151613', description:'Organize projects, documents, coursework and your professional portfolio in one place.', eligibility:['founder','employee','student','unemployed'], featured:true, status:'active' },
  { id:'linkedin', brand:'LinkedIn', title:'3 months Premium Career', category:'career', label:'CAREER', value:'3 months free', color:'#7eb6e8', text:'#0b3155', description:'Strengthen your profile, reach decision-makers and access advanced career insights.', eligibility:['founder','employee','student','unemployed'], featured:false, status:'active' },
  { id:'coursera', brand:'COURSERA', title:'40% off professional certificates', category:'learning', label:'LEARNING', value:'Save 40%', color:'#8ba7ee', text:'#12214f', description:'Build practical, verifiable skills with selected professional certificate programs.', eligibility:['employee','student','unemployed'], featured:true, status:'active' },
  { id:'safaricom', brand:'SAFARICOM', title:'Business data bundle bonus', category:'business', label:'CONNECTIVITY', value:'25% extra data', color:'#79c66a', text:'#12320d', description:'Keep your work connected with additional data on selected professional plans.', eligibility:['founder','employee'], featured:false, status:'active' },
  { id:'wellness', brand:'THE\nWELL', title:'25% off member wellness', category:'lifestyle', label:'WELLNESS', value:'Save 25%', color:'#9fc8b4', text:'#153328', description:'Access selected recovery, fitness and wellbeing services built for busy professionals.', eligibility:['founder','employee'], featured:false, status:'active' },
  { id:'jobfair', brand:'TALENT\nROOM', title:'Priority career room access', category:'career', label:'OPPORTUNITY', value:'Priority entry', color:'#f0bc68', text:'#3c280a', description:'Join curated employer rooms, CV clinics and interview-practice sessions before public release.', eligibility:['employee','student','unemployed'], featured:true, status:'active' }
];

const seedApplications = [
  { id:'AP-1842', name:'Marta Alemu', initials:'MA', role:'founder', detail:'Co-founder · Tena Foods', submitted:'Today, 09:42', status:'pending' },
  { id:'AP-1841', name:'Henok Desta', initials:'HD', role:'employee', detail:'Account Manager · R&D Group', submitted:'Today, 08:15', status:'pending' },
  { id:'AP-1840', name:'Betelhem Tadesse', initials:'BT', role:'student', detail:'Economics · AAU', submitted:'Yesterday', status:'pending' },
  { id:'AP-1839', name:'Yared Kebede', initials:'YK', role:'unemployed', detail:'Data Analyst · Open to work', submitted:'Yesterday', status:'pending' }
];

const seedMembers = [
  { id:'FDRY-F-260071', name:'Haile Adugna', email:'founder@foundry.demo', phone:'+251 911 242 801', city:'Addis Ababa', role:'founder', organization:'Modern Ethiopia', title:'Founder & CEO', status:'active', verification:'verified', expires:'2027-07-17', notes:'Founding community member.', excludedBenefits:[] },
  { id:'FDRY-E-260184', name:'Sara Bekele', email:'employee@foundry.demo', phone:'+251 922 110 441', city:'Addis Ababa', role:'employee', organization:'Meraki Group', title:'Marketing Manager', status:'active', verification:'verified', expires:'2027-07-17', notes:'', excludedBenefits:[] },
  { id:'FDRY-S-260239', name:'Nahom Tesfaye', email:'student@foundry.demo', phone:'+251 933 208 915', city:'Addis Ababa', role:'student', organization:'Addis Ababa University', title:'Business Student', status:'active', verification:'verified', expires:'2027-07-17', notes:'', excludedBenefits:[] },
  { id:'FDRY-O-260306', name:'Liya Girma', email:'opportunity@foundry.demo', phone:'+251 944 601 118', city:'Addis Ababa', role:'unemployed', organization:'Independent', title:'Product Designer', status:'active', verification:'verified', expires:'2027-07-17', notes:'Open to product and UX roles.', excludedBenefits:[] },
  { id:'FDRY-F-260412', name:'Marta Alemu', email:'marta@tena.demo', phone:'+251 911 553 902', city:'Addis Ababa', role:'founder', organization:'Tena Foods', title:'Co-founder', status:'active', verification:'verified', expires:'2027-06-02', notes:'Food manufacturing founder.', excludedBenefits:[] },
  { id:'FDRY-E-260488', name:'Henok Desta', email:'henok@rd.demo', phone:'+251 922 893 311', city:'Bishoftu', role:'employee', organization:'R&D Group', title:'Account Manager', status:'active', verification:'verified', expires:'2027-05-19', notes:'', excludedBenefits:['wellness'] },
  { id:'FDRY-S-260522', name:'Betelhem Tadesse', email:'betelhem@aau.demo', phone:'+251 933 201 767', city:'Addis Ababa', role:'student', organization:'Addis Ababa University', title:'Economics Student', status:'active', verification:'verified', expires:'2027-04-12', notes:'', excludedBenefits:[] },
  { id:'FDRY-O-260577', name:'Yared Kebede', email:'yared@career.demo', phone:'+251 944 019 334', city:'Addis Ababa', role:'unemployed', organization:'Independent', title:'Data Analyst', status:'active', verification:'pending', expires:'2027-03-28', notes:'Verification follow-up required.', excludedBenefits:[] },
  { id:'FDRY-F-260601', name:'Ruth Mamo', email:'ruth@orbit.demo', phone:'+251 911 608 451', city:'Hawassa', role:'founder', organization:'Orbit Commerce', title:'Managing Director', status:'active', verification:'verified', expires:'2027-02-15', notes:'', excludedBenefits:['qatar'] },
  { id:'FDRY-E-260634', name:'Kaleb Getachew', email:'kaleb@nova.demo', phone:'+251 922 774 610', city:'Addis Ababa', role:'employee', organization:'Nova Systems', title:'Software Engineer', status:'suspended', verification:'verified', expires:'2026-12-30', notes:'Account suspended pending review.', excludedBenefits:[] },
  { id:'FDRY-S-260688', name:'Saron Fikru', email:'saron@astu.demo', phone:'+251 933 407 265', city:'Adama', role:'student', organization:'ASTU', title:'Engineering Student', status:'active', verification:'verified', expires:'2027-01-20', notes:'', excludedBenefits:[] },
  { id:'FDRY-E-260720', name:'Dawit Kassahun', email:'dawit@vertex.demo', phone:'+251 944 782 411', city:'Addis Ababa', role:'employee', organization:'Vertex Advisory', title:'Financial Analyst', status:'expired', verification:'verified', expires:'2026-06-30', notes:'Renewal reminder sent.', excludedBenefits:[] }
];

const seedBenefitClicks = { aws:824, qatar:612, wework:544, canva:1094, hyatt:331, selam:720, notion:988, linkedin:801, coursera:744, safaricom:510, wellness:462, jobfair:680 };
const seedBenefitCategories = [
  { id:'business', name:'Business', color:'#c8fa48', icon:'▦' },
  { id:'career', name:'Career', color:'#f0bc68', icon:'↗' },
  { id:'learning', name:'Learning', color:'#9f8aea', icon:'◆' },
  { id:'travel', name:'Travel', color:'#f37e60', icon:'✦' },
  { id:'lifestyle', name:'Lifestyle', color:'#9fc8b4', icon:'◌' },
  { id:'local', name:'Local', color:'#79a7e8', icon:'⌂' }
];
const seedPartners = [
  { id:'PARTNER-SELAM', company:'Selam Coffee', contactName:'Mekdes Alemu', email:'partner@foundry.demo', password:'demo123', benefitIds:['selam'], status:'active', createdAt:'2026-07-01T08:00:00.000Z' }
];
const seedUsageLogs = [
  { id:'USE-1003', partnerId:'PARTNER-SELAM', benefitId:'selam', memberId:'FDRY-F-260071', verifiedAt:'2026-07-17T08:42:00.000Z', status:'redeemed', updatedAt:'2026-07-17T08:43:00.000Z' },
  { id:'USE-1002', partnerId:'PARTNER-SELAM', benefitId:'selam', memberId:'FDRY-S-260239', verifiedAt:'2026-07-16T12:18:00.000Z', status:'not_used', updatedAt:'2026-07-16T12:22:00.000Z' },
  { id:'USE-1001', partnerId:'PARTNER-SELAM', benefitId:'selam', memberId:'FDRY-E-260184', verifiedAt:'2026-07-15T15:06:00.000Z', status:'redeemed', updatedAt:'2026-07-15T15:07:00.000Z' }
];

const eventDate = (days, hour = 17, minute = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

const seedEvents = [
  { id:'EVENT-FOUNDERS', title:'Founder Leadership Roundtable', organizer:'Foundry Community', eventType:'networking', customType:'', summary:'A small, candid room for founders navigating growth, hiring and capital decisions.', description:'Join a moderated peer roundtable designed for practical exchange between company builders. The conversation is confidential, focused and intentionally limited in size.', status:'published', featured:true, startAt:eventDate(12,18), endAt:eventDate(12,20), timezone:'Africa/Addis_Ababa', rsvpDeadline:eventDate(10,18), capacity:28, guestPolicy:'members-only', format:'in-person', venue:'The Urban Center', address:'Meskel Square, Addis Ababa', onlineLink:'', costType:'free', price:'', agenda:'18:00 Arrival and introductions\n18:20 Moderated founder roundtable\n19:30 Peer connections and refreshments', requirements:'Bring one current leadership challenge you are comfortable discussing. A live Foundry membership card is required at entry.', dressCode:'Smart casual', ageRestriction:'18+', accessibility:'Step-free access is available. Contact the community team for seating or interpretation support.', contactEmail:'events@foundry.community', contactPhone:'+251 911 000 101', eligibility:['founder'], visualMode:'color', color:'#151613', image:null, rsvpCount:19 },
  { id:'EVENT-COFFEE', title:'Foundry Community Coffee', organizer:'Foundry Community', eventType:'social', customType:'', summary:'Meet members from every part of the community over an easy Saturday coffee.', description:'A relaxed gathering for introductions, conversation and community updates. Come for thirty minutes or stay for the full session.', status:'published', featured:true, startAt:eventDate(18,10), endAt:eventDate(18,12), timezone:'Africa/Addis_Ababa', rsvpDeadline:eventDate(17,18), capacity:80, guestPolicy:'one-guest', format:'in-person', venue:'Selam Coffee · Bole', address:'Bole Road, Addis Ababa', onlineLink:'', costType:'free', price:'', agenda:'Open arrival from 10:00, community welcome at 10:30, member introductions and open networking.', requirements:'Show your active Foundry membership QR at check-in.', dressCode:'Come as you are', ageRestriction:'None', accessibility:'Ground-floor venue with accessible entrance.', contactEmail:'events@foundry.community', contactPhone:'+251 911 000 101', eligibility:['founder','employee','student','unemployed'], visualMode:'color', color:'#d99b6c', image:null, rsvpCount:47 },
  { id:'EVENT-CAREER', title:'Career Launch Lab', organizer:'Foundry Talent Room', eventType:'workshop', customType:'', summary:'A hands-on CV, portfolio and interview workshop with local hiring leaders.', description:'Work through practical career materials in guided sessions, receive peer feedback and hear directly from recruiters about what creates a strong first impression.', status:'published', featured:true, startAt:eventDate(25,14), endAt:eventDate(25,17), timezone:'Africa/Addis_Ababa', rsvpDeadline:eventDate(23,18), capacity:60, guestPolicy:'members-only', format:'hybrid', venue:'Iceaddis', address:'Bole Sub-City, Addis Ababa', onlineLink:'https://meet.example.com/foundry-career-lab', costType:'free', price:'', agenda:'CV clinic; portfolio review; interview practice; recruiter Q&A.', requirements:'Bring a draft CV or portfolio. Online attendees need a camera-enabled device and stable connection.', dressCode:'Casual', ageRestriction:'16+', accessibility:'Live captions are provided online. The venue has step-free access.', contactEmail:'talent@foundry.community', contactPhone:'', eligibility:['employee','student','unemployed'], visualMode:'color', color:'#8eafff', image:null, rsvpCount:34 },
  { id:'EVENT-WEBINAR', title:'Digital Safety for Modern Teams', organizer:'Foundry Learning', eventType:'webinar', customType:'', summary:'A practical online briefing on protecting accounts, teams and customer information.', description:'A focused digital session covering password hygiene, access controls, common social-engineering risks and a simple incident response checklist.', status:'published', featured:false, startAt:eventDate(31,19), endAt:eventDate(31,20,30), timezone:'Africa/Addis_Ababa', rsvpDeadline:eventDate(31,17), capacity:250, guestPolicy:'members-only', format:'online', venue:'', address:'', onlineLink:'https://meet.example.com/foundry-digital-safety', costType:'free', price:'', agenda:'Threat overview; practical controls; response checklist; audience Q&A.', requirements:'A stable internet connection and current browser.', dressCode:'', ageRestriction:'None', accessibility:'Live captions and a recording transcript will be available.', contactEmail:'learning@foundry.community', contactPhone:'', eligibility:['founder','employee','student','unemployed'], visualMode:'color', color:'#9f8aea', image:null, rsvpCount:72 }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const titleCase = value => String(value || '').replace(/\b\w/g, c => c.toUpperCase());
const generatePassword = () => `Fdy-${Math.random().toString(36).slice(2,7)}-${Math.floor(100 + Math.random() * 900)}!`;
const backend = window.FoundryBackend;
const backendEnabled = () => Boolean(backend?.configured?.());
const syncBackend = (domain,payload) => backendEnabled() ? backend.sync(domain,payload).catch(error => console.error(`Sync failed: ${domain}`,error)) : Promise.resolve();

let currentUser = null;
let offers = loadOffers();
let activeOffer = null;
let activeFilter = 'all';
let savedOnly = false;
let saved = new Set();
let toastTimer;
let qrInterval;
let applicationStep = 1;
let pendingCreateImage = null;
let pendingEditImage = null;
let pendingCreateGallery = [];
let pendingEditGallery = [];
let editingMemberExclusions = new Set();
let scannerStream = null;
let scannerFrame = 0;
let lastScannedCode = '';
let activeQrCode = '';
let activeEvent = null;
let activeEventFilter = 'upcoming';
let pendingEventImage = null;
let editingEventPeople = [];
let pendingCalendarType = null;
let guestRegistrationEmail = '';

const seedEventEnhancements = {
  'EVENT-FOUNDERS': { latitude:9.0108, longitude:38.7613, mapLabel:'The Urban Center', people:[
    { id:'PERSON-ALMAZ', type:'host', name:'Almaz Yohannes', title:'Community Director · Foundry', description:'Almaz designs founder programs and facilitates candid peer conversations across the Foundry community.', website:'', image:null },
    { id:'PERSON-SAMUEL', type:'speaker', name:'Samuel Bekele', title:'Founder · Blue Nile Ventures', description:'Samuel is a technology founder and early-stage investor focused on durable companies built across East Africa.', website:'https://example.com', image:null }
  ]},
  'EVENT-COFFEE': { latitude:8.9986, longitude:38.7904, mapLabel:'Selam Coffee · Bole', openRegistration:true, people:[{ id:'SPONSOR-SELAM', type:'sponsor', name:'Selam Coffee', title:'Community hospitality partner', description:'Selam Coffee brings locally sourced Ethiopian coffee and welcoming spaces to Foundry community gatherings.', website:'https://example.com', image:null }] },
  'EVENT-CAREER': { latitude:9.0192, longitude:38.8125, mapLabel:'Iceaddis', people:[{ id:'PERSON-MERON', type:'speaker', name:'Meron Tadesse', title:'People & Culture Lead', description:'Meron helps growing teams build fair hiring systems and practical early-career pathways.', website:'', image:null }] },
  'EVENT-WEBINAR': { latitude:null, longitude:null, mapLabel:'Online event', people:[] }
};

function normalizeEvent(item) {
  const enhancement = seedEventEnhancements[item.id] || {};
  const inferredAccessibility = item.accessibilityOptions || (item.accessibility?.toLowerCase().includes('step-free') ? ['step-free'] : []);
  return { ...item, latitude:item.latitude ?? enhancement.latitude ?? null, longitude:item.longitude ?? enhancement.longitude ?? null, mapLabel:item.mapLabel || enhancement.mapLabel || item.venue || item.address || '', people:Array.isArray(item.people) ? item.people : (enhancement.people || []).map(person => ({...person})), dressCodePreset:item.dressCodePreset || 'custom', agePreset:item.agePreset || 'custom', photographyPolicy:item.photographyPolicy || 'allowed', idRequirement:item.idRequirement || (item.requirements?.toLowerCase().includes('membership') ? 'membership' : 'none'), idRequirementCustom:item.idRequirementCustom || '', accessibilityOptions:inferredAccessibility, allowDaySelection:Boolean(item.allowDaySelection), openRegistration:item.openRegistration ?? Boolean(enhancement.openRegistration) };
}

function loadEvents() {
  try {
    const stored = JSON.parse(localStorage.getItem('foundry-events') || 'null');
    const defaults = backendEnabled()?[]:seedEvents.map(item => normalizeEvent({...item, eligibility:[...item.eligibility]}));
    if (!Array.isArray(stored)) return defaults;
    if (localStorage.getItem('foundry-events-schema') !== '3') {
      const existingIds = new Set(stored.map(item => item.id));
      const migrated = [...stored.map(item => { const normalized=normalizeEvent(item); if(item.id==='EVENT-COFFEE'&&localStorage.getItem('foundry-events-schema')==='2')normalized.openRegistration=true; return normalized; }), ...defaults.filter(item => !existingIds.has(item.id))];
      localStorage.setItem('foundry-events', JSON.stringify(migrated));
      localStorage.setItem('foundry-events-schema', '3');
      return migrated;
    }
    return stored.map(normalizeEvent);
  } catch (_) { return backendEnabled()?[]:seedEvents.map(item => ({...item, eligibility:[...item.eligibility]})); }
}

function saveEvents(events) {
  localStorage.setItem('foundry-events', JSON.stringify(events));
  syncBackend('events', events);
}

function loadEventRsvps() {
  if (!currentUser?.email) return {};
  try { return JSON.parse(localStorage.getItem(`foundry-event-rsvps-${currentUser.email}`) || '{}'); }
  catch (_) { return {}; }
}

function saveEventRsvps(rsvps) {
  if (currentUser?.email) localStorage.setItem(`foundry-event-rsvps-${currentUser.email}`, JSON.stringify(rsvps));
  syncBackend('rsvps', rsvps);
}

function eventRsvpRecord(item) {
  const value = loadEventRsvps()[item.id];
  if (!value) return null;
  if (typeof value === 'string') return { status:value, email:currentUser?.email || '', days:[], guestRequested:false, guestName:'', guestEmail:'', updatedAt:new Date().toISOString() };
  return value;
}

function eventDays(item) {
  const days=[];
  const cursor=new Date(item.startAt), end=new Date(item.endAt);
  cursor.setHours(12,0,0,0);end.setHours(12,0,0,0);
  while(cursor<=end && days.length<14){days.push({value:cursor.toISOString().slice(0,10),label:new Intl.DateTimeFormat('en',{weekday:'long',month:'short',day:'numeric',timeZone:item.timezone || 'UTC'}).format(cursor)});cursor.setDate(cursor.getDate()+1);}
  return days;
}

function loadOffers() {
  try {
    const custom = JSON.parse(localStorage.getItem('foundry-custom-offers') || '[]');
    const overrides = JSON.parse(localStorage.getItem('foundry-benefit-overrides') || '{}');
    const deleted = new Set(JSON.parse(localStorage.getItem('foundry-deleted-benefits') || '[]'));
    const defaults=backendEnabled()?[]:baseOffers;
    return [...defaults, ...custom].filter(offer => !deleted.has(offer.id)).map(offer => ({ ...offer, ...(overrides[offer.id] || {}) }));
  }
  catch (_) { return backendEnabled()?[]:[...baseOffers]; }
}

function loadCategories() {
  try {
    const stored = JSON.parse(localStorage.getItem('foundry-benefit-categories') || 'null');
    return Array.isArray(stored) ? stored : backendEnabled()?[]:seedBenefitCategories.map(item => ({...item}));
  } catch (_) { return backendEnabled()?[]:seedBenefitCategories.map(item => ({...item})); }
}

function saveCategories(categories) {
  localStorage.setItem('foundry-benefit-categories', JSON.stringify(categories));
  syncBackend('categories', categories);
}

function categoryById(id) {
  return loadCategories().find(category => category.id === id) || { id, name:titleCase(id), color:'#d9d7cf', icon:'◇' };
}

function loadPartners() {
  try {
    const stored = JSON.parse(localStorage.getItem('foundry-partners') || 'null');
    return Array.isArray(stored) ? stored : backendEnabled()?[]:seedPartners.map(item => ({...item, benefitIds:[...item.benefitIds]}));
  } catch (_) { return backendEnabled()?[]:seedPartners.map(item => ({...item, benefitIds:[...item.benefitIds]})); }
}

function savePartners(partners) {
  const local=backendEnabled()?partners.map(({password,...partner})=>partner):partners;
  localStorage.setItem('foundry-partners', JSON.stringify(local));
  if (currentUser?.role === 'admin') syncBackend('partners', partners);
}

function loadUsageLogs() {
  try {
    const stored = JSON.parse(localStorage.getItem('foundry-usage-logs') || 'null');
    return Array.isArray(stored) ? stored : backendEnabled()?[]:seedUsageLogs.map(item => ({...item}));
  } catch (_) { return backendEnabled()?[]:seedUsageLogs.map(item => ({...item})); }
}

function saveUsageLogs(logs) {
  localStorage.setItem('foundry-usage-logs', JSON.stringify(logs));
  if (currentUser?.role === 'admin') syncBackend('usage-logs', logs);
}

function getBenefitClaims(id) {
  const claims = JSON.parse(localStorage.getItem('foundry-benefit-claims') || '{}');
  return Number(claims[id] || 0);
}

function getBenefitUsage(id, status = 'redeemed') {
  return loadUsageLogs().filter(log => log.benefitId === id && (!status || log.status === status)).length;
}

function loadMembers() {
  try {
    const savedMembers = JSON.parse(localStorage.getItem('foundry-members') || 'null');
    return Array.isArray(savedMembers) ? savedMembers : backendEnabled()?[]:seedMembers.map(member => ({...member, excludedBenefits:[...member.excludedBenefits]}));
  } catch (_) { return backendEnabled()?[]:seedMembers.map(member => ({...member, excludedBenefits:[...member.excludedBenefits]})); }
}

function saveMembers(members) {
  const local=backendEnabled()?members.map(({password,...member})=>member):members;
  localStorage.setItem('foundry-members', JSON.stringify(local));
  if (currentUser?.role === 'admin') syncBackend('members', members);
}

function getMemberByEmail(email) {
  return loadMembers().find(member => member.email.toLowerCase() === String(email).toLowerCase());
}

function getClickMap() {
  try { return JSON.parse(localStorage.getItem('foundry-benefit-clicks') || '{}'); }
  catch (_) { return {}; }
}

function getBenefitClicks(id) {
  const tracked = getClickMap();
  return (backendEnabled()?0:(seedBenefitClicks[id] || 0)) + (tracked[id] || 0);
}

function trackBenefitEvent(id, eventName = 'click') {
  const key = eventName === 'claim' ? 'foundry-benefit-claims' : 'foundry-benefit-clicks';
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  data[id] = (data[id] || 0) + 1;
  localStorage.setItem(key, JSON.stringify(data));
  syncBackend('benefit-event', {benefitId:id,eventName});
}

function tgHaptic(type = 'light') {
  try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(type); } catch (_) {}
}

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  $('p', toast).textContent = message;
  toast.classList.add('active');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('active'), 2200);
}

function showAuthView(name) {
  $$('.auth-view').forEach(view => view.classList.toggle('active', view.dataset.authView === name));
  if (name === 'apply') resetApplication();
  if (name === 'demo') renderDemoAccounts();
  $('#loginError').textContent = '';
}

function renderDemoAccounts() {
  const members = loadMembers();
  const demoProfiles = demoAccounts.map(account => account.role === 'admin' ? account : ({...account,...members.find(member => member.id === account.id)}));
  const accounts = [...demoProfiles, ...loadPartners().map(partner => ({...partner, role:'partner', name:partner.company, subtitle:'Partner verification portal'}))];
  $('#demoList').innerHTML = accounts.map(account => {
    const type = memberTypes[account.role];
    const color = type?.demoColor || (account.role === 'partner' ? '#f0bc68' : '#c8fa48');
    const text = type?.demoText || '#151613';
    const label = type ? `${type.label} · ${type.tier} card` : account.role === 'partner' ? `${account.company} · QR verification portal` : 'Benefit and membership management';
    return `<button class="demo-account" data-demo-email="${escapeHtml(account.email)}" style="--demo:${color};--demo-text:${text}"><i>${type?.letter || (account.role === 'partner' ? 'P' : 'A')}</i><span><b>${escapeHtml(account.email)}</b><small>${escapeHtml(label)}</small></span><strong>→</strong></button>`;
  }).join('');
}

function authenticate(email, password) {
  const normalized = email.trim().toLowerCase();
  const partner = loadPartners().find(item => item.email.toLowerCase() === normalized);
  if (partner) return partner.status === 'active' && partner.password === password ? {...partner, role:'partner', name:partner.company, subtitle:'Partner verification portal'} : null;
  const admin = demoAccounts.find(item => item.role === 'admin' && item.email.toLowerCase() === normalized);
  if (admin) return (localStorage.getItem('foundry-admin-password') || admin.password) === password ? admin : null;
  const member = getMemberByEmail(normalized);
  if (!member) return null;
  const demo = demoAccounts.find(item => item.id === member.id);
  const expectedPassword = member.password || demo?.password;
  return expectedPassword && expectedPassword === password ? {...demo,...member,role:member.role,email:member.email,name:member.name,id:member.id,subtitle:`${member.title} · ${member.organization}`} : null;
}

async function performLogin(email,password) {
  $('#loginError').textContent='';
  try {
    const account=backendEnabled()?await backend.signIn(email.trim().toLowerCase(),password):authenticate(email,password);
    if(!account)throw new Error('The email or password is incorrect.');
    offers=loadOffers();signIn(account);
  } catch(error) {
    const message=error.message||'Sign-in failed. Check your details and try again.';
    if(backendEnabled()&&/email.*(confirm|verif)|not confirmed/i.test(message)){
      showAuthView('email-pending');return;
    }
    $('#loginError').textContent=message;
  }
}

async function refreshRemoteData(){
  if(!backendEnabled()||!currentUser||$('.admin-modal[aria-hidden="false"]'))return;
  try{await backend.bootstrap();offers=loadOffers();if(currentUser.role==='admin')renderAdmin();else if(currentUser.role==='partner')renderPartnerApp(false);else{const member=getMemberByEmail(currentUser.email);if(member)currentUser={...currentUser,...member,subtitle:`${member.title} · ${member.organization}`};renderMemberExperience();}}catch(error){console.error('Background refresh failed',error)}
}

function signIn(account) {
  const member = ['admin','partner'].includes(account.role) ? null : getMemberByEmail(account.email);
  if (member?.status && member.status !== 'active') {
    showAuthView('login');
    $('#loginError').textContent = `This membership is ${member.status}. Contact the community administrator.`;
    return;
  }
  currentUser = member ? { ...account, ...member, subtitle:`${member.title} · ${member.organization}` } : { ...account };
  sessionStorage.setItem('foundry-session', account.email);
  $('#authShell').classList.add('hidden');
  closeOffer();
  closeQr();
  $('#memberApp').classList.add('hidden');
  $('#adminApp').classList.add('hidden');
  $('#partnerApp').classList.add('hidden');
  if (account.role === 'admin') {
    $('#adminApp').classList.remove('hidden');
    renderAdmin();
  } else if (account.role === 'partner') {
    $('#partnerApp').classList.remove('hidden');
    renderPartnerApp();
  } else {
    $('#memberApp').classList.remove('hidden');
    applyMemberTheme();
    saved = new Set(JSON.parse(localStorage.getItem(`foundry-saved-${account.email}`) || '[]'));
    renderMemberExperience();
    navigate('home');
  }
  tgHaptic('medium');
}

function signOut(destination = 'login') {
  backend?.signOut?.();
  currentUser = null;
  sessionStorage.removeItem('foundry-session');
  $('#memberApp').classList.add('hidden');
  $('#adminApp').classList.add('hidden');
  $('#partnerApp').classList.add('hidden');
  stopPartnerScanner();
  $('#authShell').classList.remove('hidden');
  showAuthView(destination);
  if (destination === 'login') $('#loginEmail').focus();
}

function applyMemberTheme() {
  const type = memberTypes[currentUser.role];
  const root = document.documentElement.style;
  root.setProperty('--member-primary', type.primary);
  root.setProperty('--member-deep', type.deep);
  root.setProperty('--member-soft', type.soft);
  root.setProperty('--member-contrast', type.contrast);
}

function eligibleOffers() {
  if (!currentUser || !memberTypes[currentUser.role]) return [];
  const exclusions = new Set(currentUser.excludedBenefits || []);
  return offers.filter(offer => offer.status !== 'draft' && offer.eligibility.includes(currentUser.role) && !exclusions.has(offer.id));
}

function renderMemberExperience() {
  const type = memberTypes[currentUser.role];
  const names = currentUser.name.split(' ');
  const initials = names.map(part => part[0]).slice(0,2).join('').toUpperCase();
  const available = eligibleOffers();
  $$('[data-member-name]').forEach(el => el.textContent = el.closest('.profile-identity') ? currentUser.name : currentUser.name.toUpperCase());
  $$('[data-member-first]').forEach(el => el.textContent = `${names[0]}.`);
  $$('[data-member-initials]').forEach(el => el.textContent = initials);
  $$('[data-role-label]').forEach(el => el.textContent = type.label);
  $$('[data-tier-name]').forEach(el => el.textContent = type.tier);
  $$('[data-card-letter]').forEach(el => el.textContent = type.letter);
  $('#memberIntro').textContent = type.intro;
  $('#accessCount').textContent = `${available.length} benefits available`;
  $('#profileBenefitCount').textContent = available.length;
  $('#profileSubtitle').textContent = currentUser.subtitle;
  $('#membershipContextText').textContent = `${type.label} access · ${available.length} available`;
  $('#cardPassAudience').textContent = type.passAudience;
  $('#cardAccessTitle').textContent = type.accessTitle;
  $('#cardAccessDescription').textContent = type.accessDescription;
  $('#qrMemberId').textContent = currentUser.id;
  const hour = new Date().getHours();
  $('#memberGreeting').textContent = hour < 12 ? 'GOOD MORNING' : hour < 18 ? 'GOOD AFTERNOON' : 'GOOD EVENING';
  renderFeatured();
  renderHomeEvents();
  renderPopular();
  renderMemberEvents();
  renderBenefits();
  updateSavedCount();
}

function openMemberSettings() {
  if (!currentUser || !memberTypes[currentUser.role]) return;
  const form = $('#memberSettingsForm');
  ['name','email','phone','city','organization','title'].forEach(key => { form.elements[key].value = currentUser[key] || ''; });
  form.elements.language.value = currentUser.language || 'en';
  form.elements.twoFactor.checked = Boolean(currentUser.twoFactor);
  form.elements.emailAlerts.checked = currentUser.emailAlerts !== false;
  form.elements.telegramAlerts.checked = currentUser.telegramAlerts !== false;
  form.elements.usageReceipts.checked = currentUser.usageReceipts !== false;
  form.elements.currentPassword.value = '';
  form.elements.newPassword.value = '';
  form.elements.confirmPassword.value = '';
  $('#memberSecurityError').textContent = '';
  $$('[data-self-tab]').forEach((button,index) => button.classList.toggle('active', index === 0));
  $$('[data-self-panel]').forEach((panel,index) => panel.classList.toggle('active', index === 0));
  openAdminModal('memberSettingsModal');
}

async function saveMemberSettings(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const members = loadMembers();
  const index = members.findIndex(member => member.id === currentUser.id);
  if (index < 0) return;
  const email = data.get('email').trim().toLowerCase();
  if (members.some((member,memberIndex) => memberIndex !== index && member.email.toLowerCase() === email) || loadPartners().some(partner => partner.email.toLowerCase() === email)) {
    $('#memberSecurityError').textContent = 'That email is already used by another account.';
    return;
  }
  const currentPassword = members[index].password || demoAccounts.find(account => account.id === members[index].id)?.password || '';
  const newPassword = data.get('newPassword').trim();
  if (newPassword) {
    if (!backendEnabled() && data.get('currentPassword') !== currentPassword) { $('#memberSecurityError').textContent = 'Current password is incorrect.'; return; }
    if (newPassword !== data.get('confirmPassword')) { $('#memberSecurityError').textContent = 'New passwords do not match.'; return; }
    if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) { $('#memberSecurityError').textContent = 'Use at least one letter and one number.'; return; }
  }
  members[index] = {
    ...members[index], name:data.get('name').trim(), email, phone:data.get('phone').trim(), city:data.get('city').trim(), organization:data.get('organization').trim(), title:data.get('title').trim(), language:data.get('language'), twoFactor:data.get('twoFactor') === 'on', emailAlerts:data.get('emailAlerts') === 'on', telegramAlerts:data.get('telegramAlerts') === 'on', usageReceipts:data.get('usageReceipts') === 'on', ...(!backendEnabled()&&newPassword ? {password:newPassword} : {})
  };
  try{if(backendEnabled())await backend.sync('profile',{...members[index],...(newPassword?{newPassword}:{})});}
  catch(error){$('#memberSecurityError').textContent=error.message||'Settings could not be saved.';return;}
  saveMembers(members);
  currentUser = {...currentUser,...members[index],subtitle:`${members[index].title} · ${members[index].organization}`};
  sessionStorage.setItem('foundry-session', email);
  closeAdminModal('memberSettingsModal');
  renderMemberExperience();
  renderDemoAccounts();
  showToast('Member settings saved');
}

function offerBrand(brand) {
  return escapeHtml(brand).replace(/\n/g, '<br>');
}

function companyName(offer) {
  return String(offer?.brand || 'the company').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function partnershipDescription(offer) {
  return offer.partnershipDescription || `Foundry partnered with ${companyName(offer)} to make this member-only offer available to eligible community members.`;
}

function companyDescription(offer) {
  return offer.companyDescription || `${companyName(offer)} provides products and services selected for their relevance to the Foundry community.`;
}

function offerVisualStyle(offer, variable = '--tile') {
  if (offer.visualMode === 'image' && offer.image) {
    return `background-image:linear-gradient(180deg,rgba(10,11,9,.04),rgba(10,11,9,.42)),url(&quot;${escapeHtml(offer.image)}&quot;);background-size:cover;background-position:center;color:#fff`;
  }
  return `${variable}:${offer.color || '#c8fa48'};${variable}-text:${offer.text || '#151613'}`;
}

function offerVisualClass(offer) {
  return offer.visualMode === 'image' && offer.image ? ' image-visual' : '';
}

function renderFeatured() {
  const selected = eligibleOffers().filter(o => o.featured).slice(0,4);
  $('#featureRail').innerHTML = selected.map(offer => `<article class="feature-card" data-offer="${escapeHtml(offer.id)}"><div class="offer-art${offerVisualClass(offer)}" style="${offerVisualStyle(offer, '--art')}"><span class="art-logo">${offerBrand(offer.brand)}</span><span class="art-letter">${escapeHtml(offer.brand[0])}</span><span class="saving-pill">${escapeHtml(offer.value.toUpperCase())}</span></div><div class="offer-copy"><span>${escapeHtml(offer.label)}</span><h3>${escapeHtml(offer.title)}</h3><p>Included with your ${escapeHtml(memberTypes[currentUser.role].tier)} access.</p><button>View benefit <b>↗</b></button></div></article>`).join('');
  $('#railDots').innerHTML = selected.map((_, index) => `<i class="${index === 0 ? 'active' : ''}"></i>`).join('');
}

function renderPopular() {
  const selected = eligibleOffers().filter(o => !o.featured).slice(0,3);
  $('#popularList').innerHTML = selected.map(offer => `<article class="popular-item" data-offer="${escapeHtml(offer.id)}"><div class="brand-tile${offerVisualClass(offer)}" style="${offerVisualStyle(offer)}">${offerBrand(offer.brand)}</div><div><h3>${escapeHtml(offer.title)}</h3><p>${escapeHtml(offer.label)} · ${escapeHtml(offer.value)}</p></div><span>›</span></article>`).join('');
}

function eligibleEvents() {
  if (!currentUser || !memberTypes[currentUser.role]) return [];
  return loadEvents().filter(item => item.status === 'published' && item.eligibility.includes(currentUser.role));
}

function eventTypeLabel(item) {
  return item.eventType === 'other' ? item.customType || 'Community event' : titleCase(item.eventType);
}

function eventDateLabel(value, detailed = false) {
  const date = new Date(value);
  return new Intl.DateTimeFormat('en', detailed ? {weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'} : {month:'short',day:'numeric'}).format(date);
}

function eventDateTimeParts(value, timezone) {
  const date = new Date(value);
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone:timezone || 'UTC', weekday:'short', month:'short', day:'numeric', hour:'numeric', minute:'2-digit', hour12:true }).formatToParts(date).map(part => [part.type,part.value]));
  return { date:`${parts.weekday}, ${parts.month} ${parts.day}`.toUpperCase(), time:`${parts.hour}:${parts.minute} ${parts.dayPeriod}`.toUpperCase() };
}

function eventMapEmbedUrl(latitude, longitude) {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}&z=15&output=embed`;
}

function eventDirectionsUrl(latitude, longitude) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${latitude},${longitude}`)}`;
}

function renderEventPeopleEditor() {
  const editor = $('#eventPeopleEditor');
  if (!editor) return;
  editor.innerHTML = editingEventPeople.length ? editingEventPeople.map((person,index) => `<article class="event-person-editor-row" data-event-person-editor="${index}"><div class="event-person-editor-image" style="${person.image ? `background-image:url(&quot;${escapeHtml(person.image)}&quot;)` : ''}">${person.image ? '' : escapeHtml((person.name || person.type || 'P')[0].toUpperCase())}</div><div class="event-person-editor-fields"><label>Type<select data-person-field="type"><option value="speaker" ${person.type === 'speaker' ? 'selected' : ''}>Speaker</option><option value="host" ${person.type === 'host' ? 'selected' : ''}>Host</option><option value="sponsor" ${person.type === 'sponsor' ? 'selected' : ''}>Sponsor</option></select></label><label>Name or company<input data-person-field="name" value="${escapeHtml(person.name)}" required /></label><label>Title or partnership role<input data-person-field="title" value="${escapeHtml(person.title)}" /></label><label>Website<input data-person-field="website" type="url" value="${escapeHtml(person.website)}" placeholder="https://" /></label><label class="person-editor-full">Details<textarea data-person-field="description" maxlength="700">${escapeHtml(person.description)}</textarea></label></div><div class="event-person-editor-actions"><label><input type="file" accept="image/png,image/jpeg,image/webp" data-person-image="${index}" /><span>${person.type === 'sponsor' ? 'Upload logo' : 'Upload photo'}</span></label><button type="button" data-remove-event-person="${index}">Remove</button></div></article>`).join('') : `<div class="event-people-empty-admin">No contributors added. Add a speaker, host or sponsor when relevant.</div>`;
}

function addEventPerson(type) {
  editingEventPeople.push({ id:`PERSON-${Date.now()}`, type, name:'', title:'', description:'', website:'', image:null });
  renderEventPeopleEditor();
}

function updateEventPersonField(target) {
  const row = target.closest('[data-event-person-editor]');
  const person = editingEventPeople[Number(row?.dataset.eventPersonEditor)];
  if (person && target.dataset.personField) person[target.dataset.personField] = target.value;
}

function updateAdminEventMapPreview() {
  const form = $('#adminEventForm');
  const latitude = Number(form.elements.latitude?.value);
  const longitude = Number(form.elements.longitude?.value);
  const preview = $('#adminEventMapPreview');
  if (!preview) return;
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || !form.elements.latitude.value || !form.elements.longitude.value) {
    preview.innerHTML = `<div><b>Exact map preview</b><small>Add latitude and longitude to select the member map and enable live weather.</small></div>`;
    return;
  }
  preview.innerHTML = `<iframe title="Admin event map preview" loading="lazy" src="${eventMapEmbedUrl(latitude,longitude)}"></iframe><div><b>${escapeHtml(form.elements.mapLabel.value || form.elements.venue.value || 'Selected event location')}</b><small>Members will be able to move this map and open directions.</small></div>`;
}

function weatherCodeDetails(code) {
  if (code === 0) return ['☀','Clear'];
  if ([1,2].includes(code)) return ['🌤','Partly cloudy'];
  if (code === 3) return ['☁','Overcast'];
  if ([45,48].includes(code)) return ['🌫','Foggy'];
  if ([51,53,55,56,57].includes(code)) return ['🌦','Drizzle'];
  if ([61,63,65,66,67,80,81,82].includes(code)) return ['🌧','Rain'];
  if ([71,73,75,77,85,86].includes(code)) return ['🌨','Snow'];
  if ([95,96,99].includes(code)) return ['⛈','Thunderstorm'];
  return ['◌','Variable conditions'];
}

async function renderEventWeather(item) {
  const panel = $('#eventWeatherPanel');
  const content = $('#eventWeatherContent');
  if (!panel || !content) return;
  const latitude = Number(item.latitude), longitude = Number(item.longitude);
  if (item.format === 'online' || !Number.isFinite(latitude) || !Number.isFinite(longitude)) { panel.classList.add('hidden'); return; }
  panel.classList.remove('hidden');
  const daysAway = Math.ceil((new Date(item.startAt) - new Date()) / 86400000);
  if (daysAway > 16) { content.innerHTML = `<div class="weather-future"><span>◷</span><div><b>Forecast available closer to the event</b><small>Live hourly weather will appear here 16 days before it starts.</small></div></div>`; return; }
  if (daysAway < -1) { content.innerHTML = `<div class="weather-future"><span>✓</span><div><b>This event has ended</b><small>The live event-time forecast is no longer available.</small></div></div>`; return; }
  content.innerHTML = `<div class="weather-loading">Checking the live hourly forecast…</div>`;
  const cacheKey = `foundry-weather-${item.id}-${String(item.startAt).slice(0,13)}`;
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    let forecast = cached?.expires > Date.now() ? cached.data : null;
    if (!forecast) {
      if (backendEnabled()) forecast = await backend.weather(latitude,longitude,new Date(item.startAt).toISOString().slice(0,10));
      else { const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&timezone=${encodeURIComponent(item.timezone || 'auto')}&forecast_days=16`;const response = await fetch(url);if (!response.ok) throw new Error('Weather service unavailable');forecast = await response.json(); }
      localStorage.setItem(cacheKey, JSON.stringify({expires:Date.now() + 60 * 60 * 1000,data:forecast}));
    }
    const localHour = new Intl.DateTimeFormat('sv-SE', {timeZone:item.timezone || 'UTC',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).format(new Date(item.startAt)).replace(' ','T').slice(0,13);
    const index = forecast.hourly.time.findIndex(value => value.startsWith(localHour));
    if (index < 0) throw new Error('Hourly forecast not yet available');
    const [icon,condition] = weatherCodeDetails(forecast.hourly.weather_code[index]);
    const rain = forecast.hourly.precipitation_probability[index];
    const advice = rain >= 50 ? 'Rain is possible — consider bringing an umbrella.' : forecast.hourly.wind_speed_10m[index] >= 25 ? 'Expect stronger wind around event time.' : 'Conditions currently look comfortable for arrival.';
    content.innerHTML = `<div class="weather-primary"><span>${icon}</span><div><strong>${Math.round(forecast.hourly.temperature_2m[index])}°</strong><b>${escapeHtml(condition)}</b><small>Feels like ${Math.round(forecast.hourly.apparent_temperature[index])}°</small></div></div><div class="weather-stat"><span>RAIN</span><b>${rain}%</b><small>Probability</small></div><div class="weather-stat"><span>WIND</span><b>${Math.round(forecast.hourly.wind_speed_10m[index])} km/h</b><small>At start time</small></div><p>${escapeHtml(advice)} <small>Updated hourly</small></p>`;
  } catch (_) {
    content.innerHTML = `<div class="weather-future"><span>◌</span><div><b>Weather temporarily unavailable</b><small>We’ll retry automatically when this event is opened again.</small></div></div>`;
  }
}

function openEventPerson(index) {
  const person = activeEvent?.displayPeople?.[Number(index)] || activeEvent?.people?.[Number(index)];
  if (!person) return;
  const visual = $('#eventPersonImage');
  visual.style.backgroundImage = person.image ? `url("${person.image}")` : '';
  visual.classList.toggle('has-image', Boolean(person.image));
  $('span', visual).textContent = (person.name || person.type || 'P')[0].toUpperCase();
  $('#eventPersonType').textContent = person.type.toUpperCase();
  $('#eventPersonName').textContent = person.name;
  $('#eventPersonTitle').textContent = person.title || titleCase(person.type);
  $('#eventPersonDescription').textContent = person.description || 'More details will be shared by the event organizer.';
  $('#eventPersonWebsite').classList.toggle('hidden', !person.website);
  $('#eventPersonWebsite').href = person.website || '#';
  openAdminModal('eventPersonModal');
}

function eventLocation(item) {
  if (item.format === 'online') return 'Online event';
  if (item.format === 'hybrid') return `${item.venue || item.address || 'Venue to be announced'} + online`;
  return item.venue || item.address || 'Venue to be announced';
}

function eventVisualStyle(item) {
  if (item.visualMode === 'image' && item.image) return `background-image:linear-gradient(180deg,rgba(8,9,7,.04),rgba(8,9,7,.58)),url(&quot;${escapeHtml(item.image)}&quot;);background-size:cover;background-position:center;color:#fff`;
  return `background:${item.color || '#c8fa48'};color:${item.color === '#151613' ? '#fff' : '#151613'}`;
}

function eventCard(item, compact = false) {
  const status = eventRsvpRecord(item)?.status;
  return `<article class="member-event-card${compact ? ' compact-event-card' : ''}" data-event-id="${escapeHtml(item.id)}"><div class="member-event-visual" style="${eventVisualStyle(item)}"><span>${escapeHtml(eventTypeLabel(item).toUpperCase())}</span><b>${escapeHtml(eventDateLabel(item.startAt))}</b></div><div class="member-event-copy"><div class="event-card-meta"><span>${escapeHtml(titleCase(item.format))}</span>${status && status !== 'not-going' ? `<i>${status === 'going' ? '✓ Going' : '? Maybe'}</i>` : ''}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(eventLocation(item))}</p><div class="event-card-foot"><small>${Number(item.rsvpCount || 0) + (status === 'going' ? 1 : 0)} attending</small><span>View event ↗</span></div></div></article>`;
}

function renderHomeEvents() {
  const list = eligibleEvents().filter(item => item.featured && new Date(item.endAt) >= new Date()).sort((a,b) => new Date(a.startAt) - new Date(b.startAt)).slice(0,3);
  $('#homeEventSectionHead').classList.remove('hidden');
  $('#homeEventList').classList.remove('hidden');
  $('#homeEventList').innerHTML = list.length ? list.map(item => eventCard(item, true)).join('') : `<div class="home-event-empty"><span>◌</span><div><b>No featured events yet</b><small>Open Events to see every event available to your membership.</small></div><button data-go="events">View events ↗</button></div>`;
}

function renderMemberEvents() {
  if (!currentUser || !memberTypes[currentUser.role]) return;
  const rsvps = loadEventRsvps();
  let list = eligibleEvents().sort((a,b) => new Date(a.startAt) - new Date(b.startAt));
  if (activeEventFilter === 'upcoming') list = list.filter(item => new Date(item.endAt) >= new Date());
  if (activeEventFilter === 'rsvped') list = list.filter(item => ['going','maybe'].includes(typeof rsvps[item.id] === 'string' ? rsvps[item.id] : rsvps[item.id]?.status));
  $$('[data-event-filter]').forEach(button => button.classList.toggle('active', button.dataset.eventFilter === activeEventFilter));
  $('#memberEventGrid').innerHTML = list.map(item => eventCard(item)).join('');
  $('#eventEmptyState').style.display = list.length ? 'none' : 'block';
}

function displayEventPeople(item) {
  const people = Array.isArray(item.people) ? item.people.filter(person => person.name) : [];
  if (!people.some(person => ['host','organizer'].includes(person.type) && person.name.toLowerCase() === String(item.organizer).toLowerCase())) {
    people.unshift({id:'AUTO-ORGANIZER',type:'organizer',name:item.organizer,title:'Event organizer',description:`${item.organizer} is coordinating this event and its attendee experience.`,website:'',image:null});
  }
  return people;
}

function requirementIcon(kind) {
  const icons={dress:'♟',age:'18',accessibility:'♿',photography:'◉',identity:'▣'};
  return icons[kind] || '✓';
}

function eventRequirementCards(item) {
  const cards=[];
  if (item.dressCode && !/^none$/i.test(item.dressCode)) cards.push(['dress','Dress code',item.dressCode]);
  if (item.ageRestriction && !/^(none|all ages)$/i.test(item.ageRestriction)) cards.push(['age','Age policy',item.ageRestriction]);
  const accessibilityDescription=String(item.accessibility || '').trim();
  const normalizedAccessibility=accessibilityDescription.toLowerCase().replace(/[^a-z0-9]/g,'');
  const accessibilityOptions=(item.accessibilityOptions || []).map(value => titleCase(value.replaceAll('-',' '))).filter(label => !normalizedAccessibility.includes(label.toLowerCase().replace(/[^a-z0-9]/g,'')));
  const accessibility=[...accessibilityOptions,accessibilityDescription].filter(Boolean).join(' · ');
  if (accessibility) cards.push(['accessibility','Accessibility',accessibility]);
  const photoLabels={allowed:'Photography allowed',limited:'Limited photography',consent:'Ask before photographing','no-photography':'No photography','official-only':'Official photographer only'};
  if (item.photographyPolicy) cards.push(['photography','Photography',photoLabels[item.photographyPolicy] || titleCase(item.photographyPolicy)]);
  const idLabels={none:'No ID required',membership:'Live Foundry membership QR',government:'Government-issued ID',student:'Student ID',invitation:'Invitation or ticket',custom:item.idRequirementCustom || 'Custom entry requirement'};
  if (item.idRequirement && item.idRequirement !== 'none') cards.push(['identity','Entry identification',idLabels[item.idRequirement] || item.idRequirement]);
  return cards;
}

function openEventDetail(id) {
  const item = eligibleEvents().find(eventItem => eventItem.id === id);
  if (!item) return;
  activeEvent = item;
  $('#eventDetailVisual').setAttribute('style', eventVisualStyle(item));
  $('#eventDetailType').textContent = eventTypeLabel(item).toUpperCase();
  $('#eventDetailDate').textContent = eventDateLabel(item.startAt);
  $('#eventDetailFormat').textContent = titleCase(item.format);
  $('#eventDetailCost').textContent = item.costType === 'free' ? 'Free' : item.price || titleCase(item.costType);
  $('#eventDetailRsvpCount').textContent = `${Number(item.rsvpCount || 0) + (eventRsvpRecord(item)?.status === 'going' ? 1 : 0)} attending`;
  $('#eventDetailTitle').textContent = item.title;
  $('#eventDetailSummary').textContent = item.summary;
  $('#eventDetailDescription').textContent = item.description;
  const start = eventDateTimeParts(item.startAt,item.timezone), end = eventDateTimeParts(item.endAt,item.timezone);
  $('#eventStartDate').textContent = start.date;
  $('#eventStartTime').textContent = start.time;
  $('#eventEndDate').textContent = end.date;
  $('#eventEndTime').textContent = end.time;
  $('#eventTimezoneLabel').textContent = String(item.timezone || 'UTC').replaceAll('_',' ');
  $('#eventDetailFacts').innerHTML = `<div><span>RSVP DEADLINE</span><b>${escapeHtml(eventDateLabel(item.rsvpDeadline,true))}</b><small>Registration closes before the event</small></div><div><span>CAPACITY</span><b>${escapeHtml(String(item.capacity))} attendees</b><small>${escapeHtml(item.guestPolicy.replaceAll('-',' '))}</small></div><div><span>ORGANIZER</span><b>${escapeHtml(item.organizer)}</b><small>${escapeHtml(eventTypeLabel(item))}</small></div><div><span>ADMISSION</span><b>${escapeHtml(item.price || titleCase(item.costType))}</b><small>${escapeHtml(titleCase(item.format))}</small></div>`;
  const people = displayEventPeople(item);
  $('#eventPeopleSection').classList.toggle('hidden', !people.length);
  activeEvent.displayPeople = people;
  const indexedPeople=people.map((person,index)=>({person,index}));
  const organizers=indexedPeople.filter(({person})=>person.type==='organizer');
  const speakers=indexedPeople.filter(({person})=>['speaker','host'].includes(person.type));
  const sponsors=indexedPeople.filter(({person})=>person.type==='sponsor');
  const portraitCard=({person,index})=>`<button type="button" class="event-person-tile" data-event-person="${index}"><span class="event-person-tile-image${person.image ? ' has-image' : ''}" style="${person.image ? `background-image:url(&quot;${escapeHtml(person.image)}&quot;)` : ''}">${person.image ? '' : escapeHtml(person.name[0].toUpperCase())}</span><i>${escapeHtml(person.type.toUpperCase())}</i><b>${escapeHtml(person.name)}</b><small>${escapeHtml(person.title || titleCase(person.type))}</small><em>View details ↗</em></button>`;
  $('#eventPeopleGrid').className='event-people-groups';
  $('#eventPeopleGrid').innerHTML=`${organizers.length?`<section class="event-organizer-group"><div class="event-people-group-title"><span>EVENT ORGANIZER</span><small>Tap to view details</small></div>${organizers.map(({person,index})=>`<button type="button" class="event-organizer-card" data-event-person="${index}"><span class="event-organizer-mark${person.image?' has-image':''}" style="${person.image?`background-image:url(&quot;${escapeHtml(person.image)}&quot;)`:''}">${person.image?'':escapeHtml(person.name[0].toUpperCase())}</span><div><b>${escapeHtml(person.name)}</b><small>${escapeHtml(person.title||'Event organizer')}</small><em>View organizer profile</em></div><strong>↗</strong></button>`).join('')}</section>`:''}${speakers.length?`<section class="event-speakers-group"><div class="event-people-group-title"><span>SPEAKERS / PRESENTERS / HOSTS</span><small>${speakers.length} featured</small></div><div class="event-speaker-grid">${speakers.map(portraitCard).join('')}</div></section>`:''}${sponsors.length?`<section class="event-sponsors-group"><div class="event-people-group-title"><span>SPONSORS</span><small>Event partners</small></div><div class="event-sponsor-grid">${sponsors.map(({person,index})=>`<button type="button" class="event-sponsor-card" data-event-person="${index}"><span class="event-sponsor-logo${person.image?' has-image':''}" style="${person.image?`background-image:url(&quot;${escapeHtml(person.image)}&quot;)`:''}">${person.image?'':escapeHtml(person.name[0].toUpperCase())}</span><b>${escapeHtml(person.name)}</b><small>${escapeHtml(person.title||'Event sponsor')}</small></button>`).join('')}</div></section>`:''}`;
  const sections = [['Agenda',item.agenda],['Attendance requirements',item.requirements]].filter(([,value]) => value);
  $('#eventDetailInformation').innerHTML = sections.map(([title,value]) => `<section><h3>${escapeHtml(title)}</h3><p>${escapeHtml(value).replace(/\n/g,'<br>')}</p></section>`).join('');
  const requirementCards = eventRequirementCards(item);
  $('#eventRequirementsSection').classList.toggle('hidden', !requirementCards.length);
  $('#eventRequirementGrid').innerHTML = requirementCards.map(([kind,label,value]) => `<article class="event-requirement-card ${kind}"><span>${requirementIcon(kind)}</span><div><small>${escapeHtml(label.toUpperCase())}</small><b>${escapeHtml(value)}</b></div></article>`).join('');
  const latitude = Number(item.latitude), longitude = Number(item.longitude);
  const hasMap = item.format !== 'online' && Number.isFinite(latitude) && Number.isFinite(longitude);
  $('#eventMapSection').classList.toggle('hidden', !hasMap);
  if (hasMap) {
    $('#eventMapPlace').textContent = item.mapLabel || item.venue || 'Event location';
    $('#eventMapAddress').textContent = item.address || `${latitude}, ${longitude}`;
    $('#eventMapFrame').src = eventMapEmbedUrl(latitude,longitude);
    $('#eventMapLink').href = eventDirectionsUrl(latitude,longitude);
  } else $('#eventMapFrame').removeAttribute('src');
  $('#eventDetailContact').innerHTML = `<span>Questions?</span><b>${escapeHtml(item.contactEmail)}</b>${item.contactPhone ? `<small>${escapeHtml(item.contactPhone)}</small>` : ''}`;
  updateEventRsvpButtons();
  openAdminModal('eventDetailModal');
  renderEventWeather(item);
  tgHaptic('light');
}

function updateEventRsvpButtons() {
  if (!activeEvent) return;
  const record = eventRsvpRecord(activeEvent);
  const deadlinePassed = new Date(activeEvent.rsvpDeadline) < new Date();
  const panel=$('.event-rsvp-prominent'), heading=$('b',panel), eyebrow=$('div:first-child>span',panel), help=$('#eventRsvpHelp'), actions=$('.event-rsvp-actions',panel);
  panel.classList.toggle('registered',record?.status === 'going');
  panel.classList.toggle('cancelled',record?.status === 'cancelled');
  if(record?.status === 'going'){
    eyebrow.textContent='YOU’RE ON THE LIST';heading.textContent='Add it to your calendar';help.textContent=`Registration saved for ${record.email || currentUser?.email}.`;
    actions.innerHTML=`<button type="button" data-calendar="google">Google Calendar</button><button type="button" data-calendar="apple">Apple Calendar</button><button type="button" data-manage-rsvp>Manage RSVP</button>${activeEvent.openRegistration ? '<button type="button" data-share-registration>Share guest link</button>' : ''}`;
  } else if(record?.status === 'maybe'){
    eyebrow.textContent='INTERESTED';heading.textContent='Want us to save your place?';help.textContent='Confirm when you are ready, or manage your response.';
    actions.innerHTML=`<button type="button" data-event-rsvp="going">✓ Confirm attendance</button><button type="button" data-manage-rsvp>Manage RSVP</button>`;
  } else if(record?.status === 'cancelled'){
    eyebrow.textContent='ATTENDANCE CANCELLED';heading.textContent='We’re sorry you can’t join us';help.textContent='Your place has been released. You can register again while RSVP remains open.';
    actions.innerHTML=`<button type="button" data-event-rsvp="going" ${deadlinePassed ? 'disabled' : ''}>Register again</button>`;
  } else {
    eyebrow.textContent='YOU’RE INVITED';heading.textContent='Come be part of it';help.textContent=deadlinePassed?'The RSVP deadline has passed.':`Choose your response by ${eventDateLabel(activeEvent.rsvpDeadline,true)}.`;
    actions.innerHTML=`<button type="button" data-event-rsvp="going" ${deadlinePassed ? 'disabled' : ''}>✓ Save my place</button><button type="button" data-event-rsvp="maybe" ${deadlinePassed ? 'disabled' : ''}>Maybe</button><button type="button" data-event-rsvp="not-going">Can’t attend</button>${activeEvent.openRegistration ? '<button type="button" data-share-registration>Share guest link</button>' : ''}`;
  }
}

function setEventRsvp(status) {
  if (!activeEvent) return;
  const rsvps = loadEventRsvps();
  if (new Date(activeEvent.rsvpDeadline) < new Date() && !rsvps[activeEvent.id]) return showToast('The RSVP deadline has passed');
  const existing=eventRsvpRecord(activeEvent);
  if (status === 'going' && existing?.status !== 'going' && Number(activeEvent.rsvpCount || 0) >= Number(activeEvent.capacity || Infinity)) return showToast('This event is currently full');
  const defaultDays=eventDays(activeEvent).map(day=>day.value);
  rsvps[activeEvent.id] = {status,email:existing?.email || currentUser?.email || '',days:existing?.days?.length?existing.days:defaultDays,guestRequested:existing?.guestRequested || false,guestName:existing?.guestName || '',guestEmail:existing?.guestEmail || '',updatedAt:new Date().toISOString()};
  saveEventRsvps(rsvps);
  if(status==='going'||status==='cancelled')backend?.sendEmail?.(rsvps[activeEvent.id].email,status==='going'?'rsvp-confirmation':'rsvp-cancelled',{eventTitle:activeEvent.title,dateLabel:eventDateLabel(activeEvent.startAt,true),location:eventLocation(activeEvent),manageUrl:location.href}).catch(()=>{});
  updateEventRsvpButtons();
  renderHomeEvents();
  renderMemberEvents();
  $('#eventDetailRsvpCount').textContent = `${Number(activeEvent.rsvpCount || 0) + (status === 'going' ? 1 : 0)} attending`;
  showToast(status === 'going' ? 'RSVP confirmed' : status === 'maybe' ? 'RSVP saved as maybe' : 'RSVP updated');
  tgHaptic('medium');
}

function calendarDetails(item){
  const start=new Date(item.startAt).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const end=new Date(item.endAt).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const location=item.format==='online'?item.onlineLink:[item.venue,item.address].filter(Boolean).join(', ');
  return {start,end,location,details:`${item.summary}\n\n${item.requirements || ''}\n\nContact: ${item.contactEmail}`};
}

function addEventToCalendar(type){
  if(!activeEvent)return;
  const record=eventRsvpRecord(activeEvent),email=record?.email || currentUser?.email || guestRegistrationEmail;
  if(!email){pendingCalendarType=type;$('#eventEmailForm').reset();openAdminModal('eventEmailModal');return;}
  const data=calendarDetails(activeEvent);
  if(type==='google'){
    const url=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(activeEvent.title)}&dates=${data.start}/${data.end}&details=${encodeURIComponent(data.details)}&location=${encodeURIComponent(data.location)}`;
    window.open(url,'_blank','noopener');
  }else{
    const escapeIcs=value=>String(value||'').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
    const ics=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Foundry//Events//EN\r\nBEGIN:VEVENT\r\nUID:${activeEvent.id}@foundry.community\r\nDTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}\r\nDTSTART:${data.start}\r\nDTEND:${data.end}\r\nSUMMARY:${escapeIcs(activeEvent.title)}\r\nDESCRIPTION:${escapeIcs(data.details)}\r\nLOCATION:${escapeIcs(data.location)}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'}));link.download=`${activeEvent.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.ics`;link.click();setTimeout(()=>URL.revokeObjectURL(link.href),500);
  }
  showToast(type==='google'?'Opening Google Calendar':'Apple calendar file created');
}

function openManageRsvp(){
  if(!activeEvent)return;
  const record=eventRsvpRecord(activeEvent) || {days:[],guestRequested:false,guestName:'',guestEmail:''};
  const form=$('#eventManageRsvpForm'),days=eventDays(activeEvent),allowDays=activeEvent.allowDaySelection || days.length>1;
  $('#manageRsvpDays').classList.toggle('hidden',!allowDays);
  $('#manageRsvpDays').innerHTML=allowDays?`<p>Which days will you attend?</p>${days.map(day=>`<label><input type="checkbox" name="attendanceDays" value="${day.value}" ${(record.days||[]).includes(day.value)?'checked':''}/><span>${escapeHtml(day.label)}</span></label>`).join('')}`:'';
  const guestAllowed=activeEvent.guestPolicy!=='members-only';
  $('.guest-request-toggle',form).classList.toggle('hidden',!guestAllowed);
  form.elements.guestRequested.checked=guestAllowed&&Boolean(record.guestRequested);
  form.elements.guestName.value=record.guestName||'';form.elements.guestEmail.value=record.guestEmail||'';
  $('#guestRequestFields').classList.toggle('active',form.elements.guestRequested.checked);
  $('#manageRsvpMessage').textContent=record.status==='cancelled'?'Your previous attendance was cancelled.':'';
  openAdminModal('eventManageRsvpModal');
}

function saveManagedRsvp(event){
  event.preventDefault();if(!activeEvent)return;
  const form=event.currentTarget,existing=eventRsvpRecord(activeEvent)||{},days=[...form.querySelectorAll('[name=attendanceDays]:checked')].map(input=>input.value);
  if((activeEvent.allowDaySelection||eventDays(activeEvent).length>1)&&!days.length){$('#manageRsvpMessage').textContent='Select at least one attendance day.';return;}
  const guestRequested=form.elements.guestRequested.checked&&!$('.guest-request-toggle',form).classList.contains('hidden');
  if(guestRequested&&!form.elements.guestName.value.trim()){ $('#manageRsvpMessage').textContent='Add your guest’s name.';return; }
  const rsvps=loadEventRsvps();rsvps[activeEvent.id]={...existing,status:'going',days:days.length?days:existing.days,guestRequested,guestName:guestRequested?form.elements.guestName.value.trim():'',guestEmail:guestRequested?form.elements.guestEmail.value.trim():'',updatedAt:new Date().toISOString()};saveEventRsvps(rsvps);
  closeAdminModal('eventManageRsvpModal');updateEventRsvpButtons();showToast(guestRequested?'RSVP and guest request updated':'RSVP updated');
}

function cancelEventAttendance(){
  if(!activeEvent||!window.confirm('Cancel your attendance and release your place?'))return;
  const rsvps=loadEventRsvps(),existing=eventRsvpRecord(activeEvent)||{};rsvps[activeEvent.id]={...existing,status:'cancelled',guestRequested:false,guestName:'',guestEmail:'',updatedAt:new Date().toISOString()};saveEventRsvps(rsvps);
  closeAdminModal('eventManageRsvpModal');updateEventRsvpButtons();renderHomeEvents();renderMemberEvents();showToast('Attendance cancelled — your place was released');
}

async function shareGuestRegistration(){
  if(!activeEvent)return;
  const url=`${location.origin}${location.pathname}?register=${encodeURIComponent(activeEvent.id)}`;
  try{if(navigator.share)await navigator.share({title:activeEvent.title,text:`Register for ${activeEvent.title}`,url});else{await navigator.clipboard.writeText(url);showToast('Guest registration link copied');}}catch(_){showToast('Guest registration link ready to share');}
}

function saveCalendarEmail(event){
  event.preventDefault();if(!activeEvent)return;
  const email=new FormData(event.currentTarget).get('email').trim().toLowerCase(),rsvps=loadEventRsvps(),existing=eventRsvpRecord(activeEvent)||{status:'going',days:eventDays(activeEvent).map(day=>day.value)};
  if(currentUser?.email){rsvps[activeEvent.id]={...existing,email};saveEventRsvps(rsvps);}else guestRegistrationEmail=email;
  closeAdminModal('eventEmailModal');const type=pendingCalendarType;pendingCalendarType=null;if(type)addEventToCalendar(type);
}

async function openGuestRegistration(id){
  let item=loadEvents().find(eventItem=>eventItem.id===id&&eventItem.status==='published'&&eventItem.openRegistration);
  if(!item&&backendEnabled()){try{item=await backend.publicEvent(id)}catch(_){}}
  showAuthView('guest-event');
  if(!item){$('#guestEventTitle').textContent='Registration unavailable';$('#guestEventSummary').textContent='This event is not available for open guest registration on this device.';$('#guestEventRegistrationForm').classList.add('hidden');return;}
  activeEvent=item;$('#guestEventRegistrationForm').classList.remove('hidden');$('#guestEventTitle').textContent=item.title;$('#guestEventSummary').textContent=`${item.summary} · ${eventDateLabel(item.startAt,true)}`;$('#guestEventRegistrationForm').elements.eventId.value=item.id;
  const days=eventDays(item),showDays=item.allowDaySelection||days.length>1;$('#guestRegistrationDays').classList.toggle('hidden',!showDays);$('#guestRegistrationDays').innerHTML=showDays?`<p>Select attendance days</p>${days.map(day=>`<label><input type="checkbox" name="attendanceDays" value="${day.value}" checked/><span>${escapeHtml(day.label)}</span></label>`).join('')}`:'';
}

function submitGuestRegistration(event){
  event.preventDefault();if(!activeEvent)return;
  const data=new FormData(event.currentTarget),days=data.getAll('attendanceDays');
  if((activeEvent.allowDaySelection||eventDays(activeEvent).length>1)&&!days.length){$('#guestRegistrationError').textContent='Select at least one attendance day.';return;}
  const registrations=JSON.parse(localStorage.getItem('foundry-guest-registrations')||'[]');
  const registration={id:`GUEST-${Date.now()}`,eventId:activeEvent.id,name:data.get('name').trim(),email:data.get('email').trim().toLowerCase(),phone:data.get('phone').trim(),days:days.length?days:eventDays(activeEvent).map(day=>day.value),status:'going',createdAt:new Date().toISOString()};
  registrations.push(registration);localStorage.setItem('foundry-guest-registrations',JSON.stringify(registrations));guestRegistrationEmail=registration.email;
  syncBackend('guest-registration',registration);
  event.currentTarget.classList.add('hidden');$('#guestRegistrationSuccess').classList.remove('hidden');$('#guestRegistrationError').textContent='';
}

function benefitCard(offer) {
  return `<article class="benefit-card" data-offer="${escapeHtml(offer.id)}"><div class="benefit-logo${offerVisualClass(offer)}" style="${offerVisualStyle(offer)}">${offerBrand(offer.brand)}</div><span>${escapeHtml(offer.label)}</span><h3>${escapeHtml(offer.title)}</h3><p>${escapeHtml(offer.value)}</p><button class="heart ${saved.has(offer.id) ? 'saved' : ''}" data-save="${escapeHtml(offer.id)}" aria-label="Save benefit">${saved.has(offer.id) ? '♥' : '♡'}</button></article>`;
}

function renderBenefits() {
  if (!currentUser || !memberTypes[currentUser.role]) return;
  const categories = loadCategories().filter(category => eligibleOffers().some(offer => offer.category === category.id));
  if (activeFilter !== 'all' && !categories.some(category => category.id === activeFilter)) activeFilter = 'all';
  $('#filterRow').innerHTML = `<button class="${activeFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>${categories.map(category => `<button class="${activeFilter === category.id ? 'active' : ''}" data-filter="${escapeHtml(category.id)}">${escapeHtml(category.name)}</button>`).join('')}`;
  const query = ($('#offerSearch').value || '').trim().toLowerCase();
  const filtered = eligibleOffers().filter(offer => {
    const categoryMatch = activeFilter === 'all' || offer.category === activeFilter;
    const searchMatch = `${offer.brand} ${offer.title} ${offer.label}`.toLowerCase().includes(query);
    return categoryMatch && searchMatch && (!savedOnly || saved.has(offer.id));
  });
  $('#benefitGrid').innerHTML = filtered.map(benefitCard).join('');
  $('#benefitCount').textContent = filtered.length;
  $('#emptyState').style.display = filtered.length ? 'none' : 'block';
  updateSavedCount();
}

function updateSavedCount() {
  $('#savedCountLabel').textContent = `${saved.size} offer${saved.size === 1 ? '' : 's'} saved`;
}

function toggleSave(id) {
  if (!currentUser) return;
  if (saved.has(id)) { saved.delete(id); showToast('Removed from saved'); }
  else { saved.add(id); showToast('Benefit saved'); }
  localStorage.setItem(`foundry-saved-${currentUser.email}`, JSON.stringify([...saved]));
  syncBackend('saved', [...saved]);
  tgHaptic('medium');
  renderBenefits();
  if (activeOffer?.id === id) $('#saveOffer').classList.toggle('saved', saved.has(id));
}

function openOffer(id) {
  const offer = offers.find(item => item.id === id);
  if (!offer || !currentUser || !offer.eligibility.includes(currentUser.role)) return;
  activeOffer = offer;
  trackBenefitEvent(id, 'click');
  $('#sheetVisual').style.background = offer.visualMode === 'image' && offer.image ? `linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.45)),url("${offer.image}") center/cover` : offer.color;
  $('#sheetVisual').style.color = offer.text || '#151613';
  $('#sheetBrand').innerHTML = offerBrand(offer.brand);
  $('#sheetSave').textContent = offer.value.toUpperCase();
  $('#sheetCategory').textContent = offer.label;
  $('#sheetTitle').textContent = offer.title;
  $('#sheetDescription').textContent = offer.description;
  $('#sheetValue').textContent = offer.value;
  $('#sheetPartnershipDescription').textContent = partnershipDescription(offer);
  $('#sheetCompanyName').textContent = companyName(offer);
  $('#sheetCompanyDescription').textContent = companyDescription(offer);
  const gallery = Array.isArray(offer.gallery) ? offer.gallery : [];
  $('#sheetGallery').classList.toggle('hidden', !gallery.length);
  $('#sheetGallery').innerHTML = gallery.map((image,index) => `<figure><img src="${escapeHtml(image)}" alt="${escapeHtml(companyName(offer))} image ${index + 1}" loading="lazy" /></figure>`).join('');
  $('#sheetEligibility').textContent = `${memberTypes[currentUser.role].tier} access`;
  $('#saveOffer').classList.toggle('saved', saved.has(id));
  $('#offerSheet').classList.add('active');
  $('#sheetBackdrop').classList.add('active');
  $('#offerSheet').setAttribute('aria-hidden', 'false');
  tgHaptic('light');
}

function closeOffer() {
  $('#offerSheet')?.classList.remove('active');
  $('#sheetBackdrop')?.classList.remove('active');
  $('#offerSheet')?.setAttribute('aria-hidden', 'true');
}

function navigate(viewName) {
  $$('.view').forEach(view => view.classList.toggle('active', view.dataset.view === viewName));
  $$('.bottom-nav button').forEach(button => button.classList.toggle('active', button.dataset.go === viewName));
  const active = $(`.view[data-view="${viewName}"]`);
  if (active) active.scrollTop = 0;
  if (viewName === 'benefits') renderBenefits();
  if (viewName === 'events') renderMemberEvents();
  tgHaptic('light');
}

function openQr() {
  $('#qrModal').classList.add('active');
  $('#qrModal').setAttribute('aria-hidden', 'false');
  let seconds = 30;
  generateMemberQr();
  $('#qrTimer').textContent = '00:30';
  clearInterval(qrInterval);
  qrInterval = setInterval(() => {
    seconds -= 1;
    if (seconds <= 0) { seconds = 30; generateMemberQr(); }
    $('#qrTimer').textContent = `00:${String(seconds).padStart(2,'0')}`;
  }, 1000);
  tgHaptic('medium');
}

function verificationHash(value) {
  let hash = 2166136261;
  const source = `foundry-private-community-v1|${value}`;
  for (let i = 0; i < source.length; i++) { hash ^= source.charCodeAt(i); hash = Math.imul(hash, 16777619); }
  return (hash >>> 0).toString(36).toUpperCase();
}

function createQrPayload(member) {
  const expires = Math.floor(Date.now() / 1000) + 45;
  const nonce = Math.random().toString(36).slice(2,8).toUpperCase();
  const body = `FDRY1|${member.id}|${expires}|${nonce}`;
  return `${body}|${verificationHash(body)}`;
}

async function generateMemberQr() {
  if (!currentUser || !memberTypes[currentUser.role]) return;
  try { activeQrCode = backendEnabled() ? (await backend.issueQr()).token : createQrPayload(currentUser); }
  catch (error) { showToast(error.message || 'Could not refresh QR'); return; }
  const qr = window.qrcode(0, 'M');
  qr.addData(activeQrCode);
  qr.make();
  $('#generatedQr').innerHTML = qr.createSvgTag({ cellSize:5, margin:2, scalable:true });
  $('#qrManualCode').textContent = activeQrCode;
}

function parseMemberQr(value) {
  const parts = String(value || '').trim().split('|');
  if (parts.length !== 5 || parts[0] !== 'FDRY1') return { error:'This is not a Foundry member code.' };
  const [prefix, memberId, expires, nonce, signature] = parts;
  const body = `${prefix}|${memberId}|${expires}|${nonce}`;
  if (verificationHash(body) !== signature) return { error:'This verification code is invalid.' };
  if (Number(expires) < Math.floor(Date.now() / 1000)) return { error:'This verification code has expired. Ask the member to refresh it.' };
  const member = loadMembers().find(item => item.id === memberId);
  if (!member) return { error:'Member was not found in this portal.' };
  if (member.status !== 'active' || member.verification !== 'verified') return { error:`Membership is ${member.status === 'active' ? member.verification : member.status}.` };
  return { member, expires:Number(expires) };
}

function closeQr() {
  $('#qrModal')?.classList.remove('active');
  $('#qrModal')?.setAttribute('aria-hidden', 'true');
  clearInterval(qrInterval);
}

function resetApplication() {
  applicationStep = 1;
  $('#applicationForm').reset();
  $('#applicationError').textContent='';
  showApplicationStep();
}

function showApplicationStep() {
  $$('.application-step').forEach(step => step.classList.toggle('active', Number(step.dataset.step) === applicationStep));
  $('#applicationStepLabel').textContent = `Step ${applicationStep} of 5`;
  $('#applicationProgress').style.width = `${applicationStep * 20}%`;
  $('#prevApplication').style.display = applicationStep > 1 ? 'block' : 'none';
  $('#nextApplication').style.display = applicationStep < 5 ? 'block' : 'none';
  $('#submitApplication').style.display = applicationStep === 5 ? 'block' : 'none';
  if (applicationStep === 3) renderProfessionalFields();
  if (applicationStep === 5) renderApplicationReview();
}

function selectedApplicationRole() {
  return new FormData($('#applicationForm')).get('memberRole');
}

function renderProfessionalFields() {
  const role = selectedApplicationRole();
  const variants = {
    founder: { title:'Tell us about your business.', copy:'Business details help us confirm your founder membership.', fields:[['Company or venture','company','e.g. Modern Ethiopia'],['Your title','title','e.g. Founder & CEO'],['Industry','industry','e.g. Marketing & technology'],['Team size','teamSize','e.g. 12']] },
    employee: { title:'Tell us about your work.', copy:'Professional details help us confirm your employee membership.', fields:[['Organization','company','Company name'],['Job title','title','e.g. Marketing Manager'],['Department or function','industry','e.g. Growth'],['Years of experience','teamSize','e.g. 5']] },
    student: { title:'Tell us about your studies.', copy:'Education details help us confirm your student membership.', fields:[['Institution','company','University or college'],['Program or major','title','e.g. Business Administration'],['Current year','industry','e.g. Third year'],['Expected graduation','teamSize','e.g. 2028']] },
    unemployed: { title:'Tell us about your background.', copy:'Your experience and skills shape your opportunity membership profile.', fields:[['Most recent organization','company','Optional'],['Most recent role','title','e.g. Product Designer'],['Primary skill area','industry','e.g. UX and research'],['Years of experience','teamSize','e.g. 3']] }
  };
  const config = variants[role] || variants.employee;
  $('#professionalTitle').textContent = config.title;
  $('#professionalCopy').textContent = config.copy;
  $('#dynamicProfessionalFields').innerHTML = config.fields.map(([label,name,placeholder], index) => `<label class="${index === 0 || index === 1 ? 'full-field' : ''}">${escapeHtml(label)}${role === 'unemployed' && index === 0 ? ' <span class="optional">Optional</span>' : ''}<input name="${name}" placeholder="${escapeHtml(placeholder)}" ${role === 'unemployed' && index === 0 ? '' : 'required'} /></label>`).join('');
}

function validateApplicationStep() {
  const step = $(`.application-step[data-step="${applicationStep}"]`);
  const fields = $$('input,select,textarea', step);
  for (const field of fields) {
    if (!field.checkValidity()) { field.reportValidity(); return false; }
  }
  if (applicationStep === 1 && !selectedApplicationRole()) return false;
  if(applicationStep===2){const form=$('#applicationForm');if(form.elements.password.value!==form.elements.confirmPassword.value){form.elements.confirmPassword.setCustomValidity('Passwords do not match');form.elements.confirmPassword.reportValidity();return false}form.elements.confirmPassword.setCustomValidity('');if(!/[A-Za-z]/.test(form.elements.password.value)||!/[0-9]/.test(form.elements.password.value)){form.elements.password.setCustomValidity('Include at least one letter and one number');form.elements.password.reportValidity();return false}form.elements.password.setCustomValidity('');}
  return true;
}

function renderApplicationReview() {
  const data = Object.fromEntries(new FormData($('#applicationForm')).entries());
  const type = memberTypes[data.memberRole];
  $('#applicationReview').innerHTML = `<div class="review-header"><span class="review-role-dot" style="--review-color:${type.demoColor};--review-text:${type.demoText}">${type.letter}</span><div><b>${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</b><small>${escapeHtml(type.label)} application · ${escapeHtml(type.tier)} card</small></div></div><div class="review-grid"><div><span>EMAIL</span><b>${escapeHtml(data.email)}</b></div><div><span>PHONE</span><b>${escapeHtml(data.phone)}</b></div><div><span>ORGANIZATION</span><b>${escapeHtml(data.company || 'Not provided')}</b></div><div><span>ROLE / PROGRAM</span><b>${escapeHtml(data.title)}</b></div><div><span>EXPERTISE</span><b>${escapeHtml(data.expertise)}</b></div><div><span>CITY</span><b>${escapeHtml(data.city)}</b></div></div>`;
}

async function submitApplication() {
  if (!validateApplicationStep()) return;
  const data = Object.fromEntries(new FormData($('#applicationForm')).entries());
  const reference = `FDRY-AP-${String(Math.floor(1000 + Math.random() * 9000))}`;
  const safeData={...data};delete safeData.password;delete safeData.confirmPassword;
  const application={id:reference.replace('FDRY-',''),email:data.email.trim().toLowerCase(),name:`${data.firstName} ${data.lastName}`.trim(),initials:`${data.firstName[0]}${data.lastName[0]}`.toUpperCase(),role:data.memberRole,detail:`${data.title}${data.company ? ` · ${data.company}` : ''}`,submitted:'Just now',submittedAt:new Date().toISOString(),status:'pending',data:safeData};
  const button=$('#submitApplication');$('#applicationError').textContent='';button.disabled=true;button.textContent='Submitting…';
  try{
    if(!backendEnabled())throw new Error('Registration is temporarily unavailable because the secure backend is not connected.');
    await backend.registerApplication(application,data.password);
    $('#applicationReference').textContent=reference;showAuthView('submitted');tgHaptic('heavy');
  }catch(error){$('#applicationError').textContent=error.message||'The application could not be submitted. Please try again.';}
  finally{button.disabled=false;button.innerHTML='Submit application <span>↗</span>';}
}

function toDateTimeLocal(value) {
  if (!value) return '';
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0,16);
}

function allLocalEventRsvps() {
  const records = {};
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (!key?.startsWith('foundry-event-rsvps-')) continue;
    try { records[key] = JSON.parse(localStorage.getItem(key) || '{}'); } catch (_) {}
  }
  return records;
}

function eventRsvpTotal(item) {
  const localGoing = Object.values(allLocalEventRsvps()).filter(record => record[item.id] === 'going' || record[item.id]?.status === 'going').length;
  let guestGoing=0;try{guestGoing=JSON.parse(localStorage.getItem('foundry-guest-registrations')||'[]').filter(registration=>registration.eventId===item.id&&registration.status==='going').length;}catch(_){}
  return Number(item.rsvpCount || 0) + localGoing + guestGoing;
}

function renderAdminEvents() {
  if (!$('#adminEventTable')) return;
  const events = loadEvents();
  const now = new Date();
  const query = ($('#adminEventSearch')?.value || '').trim().toLowerCase();
  const status = $('#adminEventStatus')?.value || 'all';
  const filtered = events.filter(item => `${item.title} ${item.organizer} ${eventTypeLabel(item)} ${item.venue}`.toLowerCase().includes(query) && (status === 'all' || item.status === status));
  const metrics = [
    ['PUBLISHED',events.filter(item => item.status === 'published').length,'Visible to selected members','#668f3f'],
    ['UPCOMING',events.filter(item => item.status === 'published' && new Date(item.endAt) >= now).length,'On the community calendar','#668fe9'],
    ['CONFIRMED',events.reduce((sum,item) => sum + eventRsvpTotal(item),0),'Seed and member RSVPs','#7d63e8'],
    ['DRAFTS',events.filter(item => item.status === 'draft').length,'Not visible to members','#d77755']
  ];
  $('#eventMetricGrid').innerHTML = metrics.map(([label,value,sub,color]) => `<article class="event-admin-metric" style="--event-metric:${color}"><span>${label}</span><strong>${value}</strong><small>${sub}</small></article>`).join('');
  $('#adminEventCount').textContent = `${filtered.length} event${filtered.length === 1 ? '' : 's'}`;
  $('#adminEventTable').innerHTML = `<div class="event-table-header"><span>EVENT</span><span>SCHEDULE</span><span>ACCESS</span><span>RSVPS</span><span>STATUS</span><span></span></div>${filtered.map(item => `<div class="event-table-row"><div class="event-admin-identity"><i style="${eventVisualStyle(item)}">${escapeHtml(eventDateLabel(item.startAt))}</i><span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(eventTypeLabel(item))} · ${escapeHtml(item.organizer)}</small></span></div><div class="event-admin-date"><b>${escapeHtml(eventDateLabel(item.startAt,true))}</b><small>${escapeHtml(eventLocation(item))}</small></div><div class="table-eligibility">${item.eligibility.map(roleBadge).join('')}</div><div class="event-admin-rsvp"><b>${eventRsvpTotal(item)} / ${escapeHtml(String(item.capacity))}</b><small>${Math.min(100,Math.round(eventRsvpTotal(item) / Math.max(1,item.capacity) * 100))}% filled</small></div><span class="status-tag ${escapeHtml(item.status)}">${escapeHtml(item.status)}</span><button class="table-edit-button" data-edit-event="${escapeHtml(item.id)}">Edit</button></div>`).join('')}`;
}

function defaultEventDates() {
  return { start:eventDate(14,18), end:eventDate(14,20), deadline:eventDate(12,18) };
}

function renderAdminGuestRegistrations(eventId){
  const panel=$('#adminGuestRegistrationPanel');if(!panel)return;
  let registrations=[];try{registrations=JSON.parse(localStorage.getItem('foundry-guest-registrations')||'[]').filter(item=>item.eventId===eventId);}catch(_){}
  panel.classList.toggle('hidden',!eventId||!registrations.length);
  $('#adminGuestRegistrationList').innerHTML=registrations.map(item=>`<article><div><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.email)}${item.phone?` · ${escapeHtml(item.phone)}`:''}</small></div><span>${escapeHtml(item.status)}</span><small>${(item.days||[]).length} day${(item.days||[]).length===1?'':'s'}</small></article>`).join('');
}

function openEventForm(id = null) {
  const form = $('#adminEventForm');
  const item = id ? loadEvents().find(eventItem => eventItem.id === id) : null;
  form.reset();
  pendingEventImage = item?.image || null;
  $('#eventCoverImage').value = '';
  $('#eventImageName').textContent = pendingEventImage ? 'Current cover image retained' : '1600 × 900 recommended';
  $('#eventFormError').textContent = '';
  $('#eventEligibilityError').textContent = '';
  form.elements.eventId.value = item?.id || '';
  const defaults = defaultEventDates();
  const values = item || { eventType:'conference', status:'published', featured:true, startAt:defaults.start, endAt:defaults.end, timezone:'Africa/Addis_Ababa', rsvpDeadline:defaults.deadline, capacity:100, guestPolicy:'members-only', format:'in-person', costType:'free', visualMode:'color', color:'#c8fa48', eligibility:['founder','employee','student','unemployed'], people:[] };
  ['title','organizer','eventType','customType','summary','description','status','timezone','capacity','guestPolicy','format','venue','address','latitude','longitude','mapLabel','onlineLink','costType','price','agenda','requirements','dressCode','ageRestriction','accessibility','contactEmail','contactPhone','color'].forEach(key => { if (form.elements[key]) form.elements[key].value = values[key] ?? ''; });
  form.elements.dressCodePreset.value=values.dressCodePreset || 'custom';form.elements.agePreset.value=values.agePreset || 'custom';form.elements.photographyPolicy.value=values.photographyPolicy || 'allowed';form.elements.idRequirement.value=values.idRequirement || 'none';form.elements.idRequirementCustom.value=values.idRequirementCustom || '';
  $$('[name="accessibilityOptions"]',form).forEach(input=>input.checked=(values.accessibilityOptions||[]).includes(input.value));form.elements.allowDaySelection.checked=Boolean(values.allowDaySelection);form.elements.openRegistration.checked=Boolean(values.openRegistration);
  editingEventPeople = (values.people || []).map(person => ({...person}));
  renderEventPeopleEditor();
  form.elements.startAt.value = toDateTimeLocal(values.startAt);
  form.elements.endAt.value = toDateTimeLocal(values.endAt);
  form.elements.rsvpDeadline.value = toDateTimeLocal(values.rsvpDeadline);
  form.elements.featured.value = values.featured ? 'yes' : 'no';
  $$('input[name="eventEligibility"]', form).forEach(input => input.checked = values.eligibility.includes(input.value));
  $$('input[name="eventVisualMode"]', form).forEach(input => input.checked = input.value === (values.visualMode || 'color'));
  $('#eventFormEyebrow').textContent = item ? 'EDIT COMMUNITY EVENT' : 'NEW COMMUNITY EVENT';
  $('#eventFormTitle').textContent = item ? `Edit ${item.title}` : 'Create an event';
  $('#saveEventButton').innerHTML = `${item ? 'Save changes' : 'Publish event'} <span>↗</span>`;
  $('#deleteEvent').classList.toggle('hidden', !item);
  $('#adminEventSharePanel').classList.toggle('hidden',!item?.openRegistration);
  $('#adminEventShareUrl').value=item?.openRegistration?`${location.origin}${location.pathname}?register=${encodeURIComponent(item.id)}`:'';
  renderAdminGuestRegistrations(item?.id);
  updateEventPreview();
  updateAdminEventMapPreview();
  adminNavigate('event-create');
}

function updateEventPreview() {
  const form = $('#adminEventForm');
  if (!form) return;
  const data = new FormData(form);
  const visualMode = data.get('eventVisualMode') || 'color';
  const preview = $('#eventPreviewVisual');
  preview.style.cssText = visualMode === 'image' && pendingEventImage ? `background-image:linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.5)),url("${pendingEventImage}");background-size:cover;background-position:center;color:#fff` : `background:${data.get('color') || '#c8fa48'};color:#151613`;
  $('#eventPreviewType').textContent = (data.get('eventType') === 'other' ? data.get('customType') : data.get('eventType') || 'Event').toUpperCase();
  $('#eventPreviewDate').textContent = data.get('startAt') ? eventDateLabel(data.get('startAt')) : 'DATE';
  $('#eventPreviewTitle').textContent = data.get('title') || 'Your event name';
  const format = data.get('format') || 'in-person';
  $('#eventPreviewLocation').textContent = format === 'online' ? 'Online event' : data.get('venue') || data.get('address') || titleCase(format);
  const roles = data.getAll('eventEligibility');
  $('#eventPreviewEligibility').innerHTML = roles.length ? roles.map(roleBadge).join('') : '<small>Select membership types</small>';
}

function saveEvent(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const eligibility = data.getAll('eventEligibility');
  const startAt = new Date(data.get('startAt'));
  const endAt = new Date(data.get('endAt'));
  const deadline = new Date(data.get('rsvpDeadline'));
  const format = data.get('format');
  const visualMode = data.get('eventVisualMode') || 'color';
  const error = message => { $('#eventFormError').textContent = message; return false; };
  $('#eventFormError').textContent = '';
  $('#eventEligibilityError').textContent = '';
  if (!eligibility.length) { $('#eventEligibilityError').textContent = 'Select at least one membership category.'; return; }
  if (data.get('eventType') === 'other' && !data.get('customType').trim()) return error('Add the custom event type.');
  if (endAt <= startAt) return error('The event end must be after its start.');
  if (deadline > startAt) return error('The RSVP deadline must be before the event starts.');
  if (['in-person','hybrid'].includes(format) && (!data.get('venue').trim() || !data.get('address').trim())) return error('Add both venue and address for an in-person or hybrid event.');
  const latitude = data.get('latitude').trim() === '' ? null : Number(data.get('latitude'));
  const longitude = data.get('longitude').trim() === '' ? null : Number(data.get('longitude'));
  if (['in-person','hybrid'].includes(format) && (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180)) return error('Add valid latitude and longitude for the interactive map and live weather.');
  if (['online','hybrid'].includes(format) && !data.get('onlineLink').trim()) return error('Add the online access link for an online or hybrid event.');
  if (data.get('costType') === 'paid' && !data.get('price').trim()) return error('Add the event price and currency.');
  if (visualMode === 'image' && !pendingEventImage) return error('Upload a cover image or choose a colour poster.');
  if (editingEventPeople.some(person => !person.name.trim())) return error('Add a name for every speaker, host or sponsor, or remove the empty entry.');
  if(data.get('idRequirement')==='custom'&&!data.get('idRequirementCustom').trim())return error('Add the custom ID or entry requirement.');
  const events = loadEvents();
  const existingIndex = events.findIndex(item => item.id === data.get('eventId'));
  const previous = existingIndex >= 0 ? events[existingIndex] : null;
  const record = { id:previous?.id || `EVENT-${Date.now()}`, title:data.get('title').trim(), organizer:data.get('organizer').trim(), eventType:data.get('eventType'), customType:data.get('customType').trim(), summary:data.get('summary').trim(), description:data.get('description').trim(), status:data.get('status'), featured:data.get('featured') === 'yes', startAt:startAt.toISOString(), endAt:endAt.toISOString(), timezone:data.get('timezone'), rsvpDeadline:deadline.toISOString(), capacity:Number(data.get('capacity')), guestPolicy:data.get('guestPolicy'), format, venue:data.get('venue').trim(), address:data.get('address').trim(), latitude, longitude, mapLabel:data.get('mapLabel').trim() || data.get('venue').trim(), onlineLink:data.get('onlineLink').trim(), costType:data.get('costType'), price:data.get('price').trim(), agenda:data.get('agenda').trim(), requirements:data.get('requirements').trim(), dressCode:data.get('dressCode').trim(), ageRestriction:data.get('ageRestriction').trim(), accessibility:data.get('accessibility').trim(), contactEmail:data.get('contactEmail').trim(), contactPhone:data.get('contactPhone').trim(), people:editingEventPeople.map(person => ({...person,name:person.name.trim(),title:person.title.trim(),description:person.description.trim(),website:person.website.trim()})), eligibility, visualMode, color:data.get('color'), image:visualMode === 'image' ? pendingEventImage : null, rsvpCount:Number(previous?.rsvpCount || 0), createdAt:previous?.createdAt || new Date().toISOString(), updatedAt:new Date().toISOString() };
  record.dressCodePreset=data.get('dressCodePreset');record.dressCode=data.get('dressCodePreset')==='custom'?data.get('dressCode').trim():titleCase(data.get('dressCodePreset').replaceAll('-',' '));record.agePreset=data.get('agePreset');record.ageRestriction=data.get('agePreset')==='custom'?data.get('ageRestriction').trim():data.get('agePreset')==='none'?'None':data.get('agePreset');record.photographyPolicy=data.get('photographyPolicy');record.idRequirement=data.get('idRequirement');record.idRequirementCustom=data.get('idRequirementCustom').trim();record.accessibilityOptions=data.getAll('accessibilityOptions');record.allowDaySelection=data.get('allowDaySelection')==='on';record.openRegistration=data.get('openRegistration')==='on';
  if (existingIndex >= 0) events[existingIndex] = record; else events.unshift(record);
  saveEvents(events);
  renderAdminEvents();
  adminNavigate('events');
  showToast(existingIndex >= 0 ? 'Event changes saved' : record.status === 'draft' ? 'Event draft saved' : 'Event published');
}

function deleteCurrentEvent() {
  const id = $('#adminEventForm').elements.eventId.value;
  const item = loadEvents().find(eventItem => eventItem.id === id);
  if (!item || !window.confirm(`Delete “${item.title}”? Existing local RSVP records will no longer be shown.`)) return;
  saveEvents(loadEvents().filter(eventItem => eventItem.id !== id));
  syncBackend('delete-event',{id});
  pendingEventImage = null;
  renderAdminEvents();
  adminNavigate('events');
  showToast('Event deleted');
}

function adminNavigate(name) {
  $$('.admin-view').forEach(view => view.classList.toggle('active', view.dataset.adminView === name));
  $$('[data-admin-go]').forEach(button => button.classList.toggle('active', button.dataset.adminGo === name && button.closest('nav')));
  $('.admin-sidebar').classList.remove('open');
  if (name === 'overview') renderOverviewAnalytics();
  if (name === 'members') renderAdminMembers();
  if (name === 'events') renderAdminEvents();
  if (name === 'benefits') renderAdminBenefits();
  if (name === 'partners') renderAdminPartners();
  if (name === 'applications') renderApplications();
  if (name === 'create') { updateCreateVisualMode(); updateBenefitPreview(); }
  if (name === 'event-create') updateEventPreview();
  if (name === 'settings') loadAdminSettings();
}

function roleBadge(role) {
  const type = memberTypes[role];
  return `<i title="${escapeHtml(type.label)}" style="--badge:${type.demoColor};--badge-text:${type.demoText}">${type.letter}</i>`;
}

function renderAdmin() {
  offers = loadOffers();
  populateCategorySelects();
  const members = loadMembers();
  const storedApplications = JSON.parse(localStorage.getItem('foundry-applications') || '[]');
  const pending = [...storedApplications, ...(backendEnabled()?[]:seedApplications)].filter(app => app.status === 'pending').length;
  const metrics = [
    ['TOTAL MEMBERS',members.length,`${members.filter(member => member.status === 'active').length} currently active`,'◎','#668fe9','#e0e7fb'],
    ['ACTIVE BENEFITS',offers.filter(o => o.status === 'active').length,'Across all access levels','◇','#668f3f','#e6f3d6'],
    ['PENDING APPLICATIONS',pending,'Requires review','＋','#d77755','#f6e3dc'],
    ['VERIFIED USE',loadUsageLogs().filter(log => log.status === 'redeemed').length,'Recorded by partners','▣','#7d63e8','#e8e1fb']
  ];
  $('#metricGrid').innerHTML = metrics.map(([label,value,sub,icon,color,soft]) => `<article class="metric-card" style="--metric:${color};--metric-soft:${soft}"><div><span>${label}</span><i>${icon}</i></div><strong>${value}</strong><small>${sub}</small></article>`).join('');
  $('#applicationBadge').textContent = pending;
  renderOverviewAnalytics();
  renderDistribution();
  renderAdminMembers();
  renderAdminEvents();
  renderAdminBenefits();
  renderAdminPartners();
  renderApplications();
  loadAdminSettings();
  adminNavigate('overview');
}

function renderOverviewAnalytics() {
  if (!$('#categoryPerformance')) return;
  const categoryStats = loadCategories().map(({id:key,name:label,color,icon}) => {
    const items = offers.filter(offer => offer.status === 'active' && offer.category === key);
    return { key,label,color,icon,count:items.length,clicks:items.reduce((sum,offer) => sum + getBenefitClicks(offer.id),0),claims:items.reduce((sum,offer) => sum + getBenefitClaims(offer.id),0),usage:items.reduce((sum,offer) => sum + getBenefitUsage(offer.id),0) };
  });
  $('#categoryPerformance').innerHTML = categoryStats.map(stat => `<article class="category-performance-card" style="--category-color:${stat.color}"><div><span>${escapeHtml(stat.icon)}</span><small>${escapeHtml(stat.label)}</small></div><strong>${stat.clicks.toLocaleString()}</strong><p>${stat.claims} claims · ${stat.usage} verified uses</p></article>`).join('');
  const ranked = [...offers].filter(offer => offer.status === 'active').sort((a,b) => getBenefitClicks(b.id) - getBenefitClicks(a.id)).slice(0,5);
  const max = Math.max(...ranked.map(offer => getBenefitClicks(offer.id)),1);
  $('#topClickedBenefits').innerHTML = ranked.map((offer,index) => `<div class="top-click-row"><span class="rank-number">0${index+1}</span><div class="rank-brand${offerVisualClass(offer)}" style="${offerVisualStyle(offer)}">${offerBrand(offer.brand)}</div><div class="rank-copy"><b>${escapeHtml(offer.title)}</b><span><i style="width:${Math.round(getBenefitClicks(offer.id)/max*100)}%"></i></span><small>${getBenefitClicks(offer.id).toLocaleString()} detail clicks</small></div><strong>${Math.round(getBenefitClicks(offer.id)/max*100)}%</strong></div>`).join('');
  const totalClicks = offers.reduce((sum,offer) => sum + getBenefitClicks(offer.id),0);
  const claimsMap = JSON.parse(localStorage.getItem('foundry-benefit-claims') || '{}');
  const trackedClaims = Object.values(claimsMap).reduce((sum,value) => sum + Number(value || 0),0);
  const impressions = Math.max(18420, Math.round(totalClicks * 2.4));
  const claims = 382 + trackedClaims;
  const usage = loadUsageLogs().filter(log => log.status === 'redeemed').length;
  const steps = [
    ['Benefit impressions',impressions,100],['Detail-page clicks',totalClicks,Math.round(totalClicks/impressions*100)],['Claim button clicks',claims,Math.max(5,Math.round(claims/impressions*100))],['Verified usage',usage,Math.max(3,Math.round(usage/impressions*100))]
  ];
  $('#benefitFunnel').innerHTML = steps.map(([label,value,width],index) => `<div class="funnel-step"><div><span>${index+1}</span><b>${label}</b><strong>${Number(value).toLocaleString()}</strong></div><i style="width:${Math.max(width,10)}%"></i><small>${index === 0 ? 'Discovery' : `${Math.round(value/steps[index-1][1]*100)}% from previous step`}</small></div>`).join('');
}

function renderDistribution() {
  const roles = ['founder','employee','student','unemployed'];
  const counts = roles.map(role => ({ role, count: offers.filter(o => o.status === 'active' && o.eligibility.includes(role)).length }));
  const max = Math.max(...counts.map(item => item.count), 1);
  $('#accessDistribution').innerHTML = counts.map(({role,count}) => { const type = memberTypes[role]; return `<div class="distribution-row" style="--dist:${type.demoColor}"><div class="distribution-label"><i></i><span><b>${escapeHtml(type.label)}</b><small>${escapeHtml(type.tier)} access</small></span></div><div class="distribution-track"><i style="width:${Math.round(count/max*100)}%"></i></div><strong>${count}</strong></div>`; }).join('');
}

function renderAdminMembers() {
  if (!$('#adminMemberTable')) return;
  const members = loadMembers();
  const query = ($('#adminMemberSearch')?.value || '').trim().toLowerCase();
  const roleFilter = $('#adminMemberFilter')?.value || 'all';
  const filtered = members.filter(member => {
    const matchesQuery = `${member.name} ${member.email} ${member.organization} ${member.title}`.toLowerCase().includes(query);
    return matchesQuery && (roleFilter === 'all' || member.role === roleFilter);
  });
  $('#adminMemberCount').textContent = `${filtered.length} member${filtered.length === 1 ? '' : 's'}`;
  $('#memberSegmentGrid').innerHTML = Object.keys(memberTypes).map(role => {
    const type = memberTypes[role];
    const count = members.filter(member => member.role === role).length;
    return `<article class="member-segment-card" style="--segment:${type.demoColor};--segment-text:${type.demoText}"><span>${type.letter}</span><div><small>${escapeHtml(type.label.toUpperCase())}</small><strong>${count}</strong><p>${escapeHtml(type.tier)} members</p></div></article>`;
  }).join('');
  $('#adminMemberTable').innerHTML = `<div class="member-table-header"><span>MEMBER</span><span>MEMBERSHIP</span><span>ORGANIZATION</span><span>STATUS</span><span>ACCESS</span><span></span></div>${filtered.map(member => {
    const type = memberTypes[member.role];
    const allowed = offers.filter(offer => offer.status === 'active' && offer.eligibility.includes(member.role) && !(member.excludedBenefits || []).includes(offer.id)).length;
    const initials = member.name.split(' ').map(part => part[0]).slice(0,2).join('').toUpperCase();
    return `<div class="member-table-row"><div class="member-cell"><i style="--member-role:${type.demoColor};--member-role-text:${type.demoText}">${initials}</i><span><b>${escapeHtml(member.name)}</b><small>${escapeHtml(member.email)}</small></span></div><span class="member-type-tag" style="--member-role:${type.demoColor};--member-role-text:${type.demoText}">${escapeHtml(type.label)}</span><div class="member-org"><b>${escapeHtml(member.organization)}</b><small>${escapeHtml(member.title)}</small></div><span class="status-tag ${escapeHtml(member.status)}">${escapeHtml(member.status)}</span><div class="member-access-count"><b>${allowed}</b><small>${(member.excludedBenefits || []).length} excluded</small></div><button class="table-edit-button" data-edit-member="${escapeHtml(member.id)}">Edit</button></div>`;
  }).join('')}`;
}

function openAdminModal(id) {
  const modal = $(`#${id}`);
  modal.classList.add('active');
  modal.setAttribute('aria-hidden','false');
}

function closeAdminModal(id) {
  const modal = $(`#${id}`);
  modal?.classList.remove('active');
  modal?.setAttribute('aria-hidden','true');
}

function openMemberEditor(id) {
  const member = loadMembers().find(item => item.id === id);
  if (!member) return;
  const form = $('#memberEditForm');
  form.elements.memberId.value = member.id;
  ['name','email','phone','city','organization','title','notes','role','status','verification','expires'].forEach(key => { if (form.elements[key]) form.elements[key].value = member[key] || ''; });
  form.elements.password.value = '';
  form.elements.language.value = member.language || 'en';
  form.elements.twoFactor.checked = Boolean(member.twoFactor);
  form.elements.emailAlerts.checked = member.emailAlerts !== false;
  form.elements.telegramAlerts.checked = member.telegramAlerts !== false;
  form.elements.usageReceipts.checked = member.usageReceipts !== false;
  $('#memberBenefitSearch').value = '';
  editingMemberExclusions = new Set(member.excludedBenefits || []);
  $$('[data-member-tab]').forEach((button,index) => button.classList.toggle('active',index === 0));
  $$('[data-member-panel]').forEach((panel,index) => panel.classList.toggle('active',index === 0));
  renderMemberExclusions(member);
  openAdminModal('memberEditModal');
}

function renderMemberExclusions(memberOverride = null) {
  const form = $('#memberEditForm');
  const member = memberOverride || loadMembers().find(item => item.id === form.elements.memberId.value);
  if (!member) return;
  const role = form.elements.role.value || member.role;
  const query = ($('#memberBenefitSearch')?.value || '').trim().toLowerCase();
  const available = offers.filter(offer => offer.status === 'active' && offer.eligibility.includes(role));
  const filtered = available.filter(offer => `${offer.brand} ${offer.title} ${categoryById(offer.category).name}`.toLowerCase().includes(query));
  $('#memberBenefitExclusions').innerHTML = filtered.length ? filtered.map(offer => `<label><input type="checkbox" data-member-exclusion value="${escapeHtml(offer.id)}" ${editingMemberExclusions.has(offer.id) ? 'checked' : ''}/><span class="exclusion-brand${offerVisualClass(offer)}" style="${offerVisualStyle(offer)}">${offerBrand(offer.brand)}</span><div><b>${escapeHtml(offer.title)}</b><small>${escapeHtml(categoryById(offer.category).name)}${offer.id.startsWith('custom-') ? ' · Custom benefit' : ''}</small></div><i>Hide</i></label>`).join('') : `<p class="panel-help">${query ? 'No benefits match your search.' : 'No active benefits are assigned to this membership type.'}</p>`;
  const allowed = available.filter(offer => !editingMemberExclusions.has(offer.id)).length;
  $('#memberAccessSummary').innerHTML = `<div><span>MEMBERSHIP</span><b>${escapeHtml(memberTypes[role].tier)}</b></div><div><span>AVAILABLE BENEFITS</span><b>${allowed}</b></div><div><span>EXCLUDED</span><b>${editingMemberExclusions.size}</b></div>`;
}

function saveMemberEdit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const members = loadMembers();
  const index = members.findIndex(member => member.id === data.get('memberId'));
  if (index < 0) return;
  const password = data.get('password').trim();
  members[index] = { ...members[index], name:data.get('name').trim(), email:data.get('email').trim(), phone:data.get('phone').trim(), city:data.get('city').trim(), organization:data.get('organization').trim(), title:data.get('title').trim(), notes:data.get('notes').trim(), role:data.get('role'), status:data.get('status'), verification:data.get('verification'), expires:data.get('expires'), excludedBenefits:[...editingMemberExclusions], language:data.get('language'), twoFactor:data.get('twoFactor') === 'on', emailAlerts:data.get('emailAlerts') === 'on', telegramAlerts:data.get('telegramAlerts') === 'on', usageReceipts:data.get('usageReceipts') === 'on', ...(password ? {password} : {}) };
  saveMembers(members);
  closeAdminModal('memberEditModal');
  renderAdminMembers();
  renderAdmin();
  adminNavigate('members');
  showToast('Member profile and access updated');
}

function populateCategorySelects() {
  const categories = loadCategories();
  $$('[data-category-select]').forEach(select => {
    const selected = select.value;
    const placeholder = select.closest('#createBenefitForm') ? '<option value="">Select category</option>' : '';
    select.innerHTML = placeholder + categories.map(category => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`).join('');
    if (categories.some(category => category.id === selected)) select.value = selected;
  });
}

function renderCategoryEditor() {
  const categories = loadCategories();
  $('#categoryEditorList').innerHTML = categories.map(category => {
    const inUse = offers.filter(offer => offer.category === category.id).length;
    return `<div class="category-editor-row" data-category-row="${escapeHtml(category.id)}"><input data-category-name value="${escapeHtml(category.name)}" aria-label="Category name"/><input data-category-color type="color" value="${escapeHtml(category.color)}" aria-label="Category color"/><input data-category-icon maxlength="2" value="${escapeHtml(category.icon)}" aria-label="Category icon"/><small>${inUse} benefit${inUse === 1 ? '' : 's'}</small><button type="button" class="admin-secondary" data-save-category="${escapeHtml(category.id)}">Save</button><button type="button" class="category-delete" data-delete-category="${escapeHtml(category.id)}" ${inUse ? 'disabled title="Reassign benefits before deleting"' : ''}>×</button></div>`;
  }).join('');
}

function saveCategoryFromRow(id) {
  const row = $(`[data-category-row="${CSS.escape(id)}"]`);
  const categories = loadCategories();
  const category = categories.find(item => item.id === id);
  if (!row || !category) return;
  category.name = $('[data-category-name]', row).value.trim() || category.name;
  category.color = $('[data-category-color]', row).value;
  category.icon = $('[data-category-icon]', row).value.trim() || '◇';
  saveCategories(categories);
  populateCategorySelects(); renderCategoryEditor(); renderAdminBenefits(); renderOverviewAnalytics(); renderBenefits();
  showToast('Benefit category updated');
}

function addCategory(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get('name').trim();
  let id = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const categories = loadCategories();
  if (!id || categories.some(category => category.id === id)) id = `${id || 'category'}-${Date.now().toString().slice(-4)}`;
  categories.push({ id, name, color:data.get('color'), icon:data.get('icon').trim() || '◇' });
  saveCategories(categories);
  event.currentTarget.reset(); event.currentTarget.elements.color.value = '#c8fa48'; event.currentTarget.elements.icon.value = '◇';
  populateCategorySelects(); renderCategoryEditor(); renderAdminBenefits();
  showToast('Benefit category created');
}

function deleteCategory(id) {
  if (offers.some(offer => offer.category === id)) return showToast('Reassign its benefits before deleting');
  saveCategories(loadCategories().filter(category => category.id !== id));
  syncBackend('delete-category',{id});
  populateCategorySelects(); renderCategoryEditor(); renderAdminBenefits(); renderOverviewAnalytics();
  showToast('Category deleted');
}

function renderAdminBenefits() {
  const query = ($('#adminBenefitSearch')?.value || '').trim().toLowerCase();
  const list = offers.filter(o => `${o.brand} ${o.title} ${o.label}`.toLowerCase().includes(query));
  $('#adminBenefitCount').textContent = `${list.length} benefit${list.length === 1 ? '' : 's'}`;
  $('#benefitCategoryStrip').innerHTML = loadCategories().map(category => `<article style="--category-color:${category.color}"><span>${escapeHtml(category.icon)}</span><div><b>${escapeHtml(category.name)}</b><small>${offers.filter(offer => offer.category === category.id).length} benefits</small></div></article>`).join('');
  $('#adminBenefitTable').innerHTML = `<div class="table-header"><span>BENEFIT</span><span>CATEGORY</span><span>MEMBER ACCESS</span><span>STATUS</span><span></span></div>${list.map(offer => `<div class="table-row"><div class="table-brand"><i class="${offerVisualClass(offer)}" style="--table-color:${offer.color};${offer.visualMode === 'image' && offer.image ? offerVisualStyle(offer) : ''}">${offerBrand(offer.brand)}</i><span><b>${escapeHtml(offer.title)}</b><small>${getBenefitClicks(offer.id).toLocaleString()} clicks · ${getBenefitClaims(offer.id)} claims · ${getBenefitUsage(offer.id)} uses</small></span></div><span class="category-tag">${escapeHtml(categoryById(offer.category).name)}</span><div class="table-eligibility">${offer.eligibility.map(roleBadge).join('')}</div><span class="status-tag ${escapeHtml(offer.status)}">${escapeHtml(offer.status)}</span><button class="table-edit-button" data-edit-benefit="${escapeHtml(offer.id)}">Edit</button></div>`).join('')}`;
}

function openBenefitEditor(id) {
  const offer = offers.find(item => item.id === id);
  if (!offer) return;
  const form = $('#benefitEditForm');
  form.elements.benefitId.value = offer.id;
  ['brand','title','category','value','description','status','color'].forEach(key => { if (form.elements[key]) form.elements[key].value = offer[key] || (key === 'color' ? '#c8fa48' : ''); });
  form.elements.partnershipDescription.value = partnershipDescription(offer);
  form.elements.companyDescription.value = companyDescription(offer);
  $$('input[name="eligibility"]', form).forEach(input => input.checked = offer.eligibility.includes(input.value));
  $$('input[name="visualMode"]', form).forEach(input => input.checked = input.value === (offer.visualMode || 'color'));
  form.elements.featured.checked = Boolean(offer.featured);
  pendingEditImage = offer.image || null;
  pendingEditGallery = [...(offer.gallery || [])];
  $('#editBenefitImage').value = '';
  $('#editBenefitGallery').value = '';
  $('#editGalleryError').textContent = '';
  renderAdminGallery('edit');
  $('#editBenefitError').textContent = '';
  openAdminModal('benefitEditModal');
}

function saveBenefitEdit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const eligibility = data.getAll('eligibility');
  const visualMode = data.get('visualMode') || 'color';
  if (!eligibility.length) { $('#editBenefitError').textContent = 'Select at least one membership type.'; return; }
  if (visualMode === 'image' && !pendingEditImage) { $('#editBenefitError').textContent = 'Upload an image or switch to colour + words.'; return; }
  const id = data.get('benefitId');
  const overrides = JSON.parse(localStorage.getItem('foundry-benefit-overrides') || '{}');
  overrides[id] = { brand:data.get('brand').trim(), title:data.get('title').trim(), category:data.get('category'), label:categoryById(data.get('category')).name.toUpperCase(), value:data.get('value').trim(), description:data.get('description').trim(), partnershipDescription:data.get('partnershipDescription').trim(), companyDescription:data.get('companyDescription').trim(), gallery:[...pendingEditGallery], status:data.get('status'), color:data.get('color'), eligibility, featured:data.get('featured') === 'on', visualMode, image:visualMode === 'image' ? pendingEditImage : null };
  localStorage.setItem('foundry-benefit-overrides', JSON.stringify(overrides));
  offers = loadOffers();
  syncBackend('benefits', offers);
  closeAdminModal('benefitEditModal');
  renderAdminBenefits();
  renderOverviewAnalytics();
  renderDistribution();
  showToast('Benefit changes saved');
}

function deleteCurrentBenefit() {
  const id = $('#benefitEditForm').elements.benefitId.value;
  const offer = offers.find(item => item.id === id);
  if (!offer || !window.confirm(`Delete “${offer.title}”? This removes it from every member and partner.`)) return;
  const custom = JSON.parse(localStorage.getItem('foundry-custom-offers') || '[]').filter(item => item.id !== id);
  localStorage.setItem('foundry-custom-offers', JSON.stringify(custom));
  const deleted = new Set(JSON.parse(localStorage.getItem('foundry-deleted-benefits') || '[]'));
  deleted.add(id);
  localStorage.setItem('foundry-deleted-benefits', JSON.stringify([...deleted]));
  const overrides = JSON.parse(localStorage.getItem('foundry-benefit-overrides') || '{}');
  delete overrides[id];
  localStorage.setItem('foundry-benefit-overrides', JSON.stringify(overrides));
  const partners = loadPartners().map(partner => ({...partner, benefitIds:(partner.benefitIds || []).filter(benefitId => benefitId !== id)}));
  savePartners(partners);
  offers = loadOffers();
  syncBackend('delete-benefit',{id});
  closeAdminModal('benefitEditModal');
  renderAdminBenefits(); renderOverviewAnalytics(); renderDistribution(); renderAdminPartners();
  showToast('Benefit deleted');
}

function allApplications() {
  const stored = JSON.parse(localStorage.getItem('foundry-applications') || '[]');
  const statuses = JSON.parse(localStorage.getItem('foundry-application-statuses') || '{}');
  const merged=[...stored,...(backendEnabled()?[]:seedApplications)].filter((app,index,list)=>list.findIndex(item=>item.id===app.id)===index);
  return merged.map(app => ({...app, status:statuses[app.id] || app.status}));
}

function renderApplications() {
  const apps = allApplications();
  $('#applicationTable').innerHTML = `<div class="table-header"><span>APPLICANT</span><span>TYPE</span><span>REFERENCE</span><span>SUBMITTED</span><span>ACTION</span></div>${apps.map(app => `<div class="application-row"><div class="applicant"><i>${escapeHtml(app.initials)}</i><span><b>${escapeHtml(app.name)}</b><small>${escapeHtml(app.detail)}</small></span></div><span class="category-tag">${escapeHtml(memberTypes[app.role]?.label || app.role)}</span><small>${escapeHtml(app.id)}</small><small>${escapeHtml(app.submitted)}</small><div class="application-actions-row">${app.status === 'pending' ? `<button data-application-action="declined" data-application-id="${escapeHtml(app.id)}">Decline</button><button class="approve" data-application-action="approved" data-application-id="${escapeHtml(app.id)}">Approve</button>` : `<span class="status-tag ${app.status === 'approved' ? 'active' : 'draft'}">${escapeHtml(app.status)}</span>`}</div></div>`).join('')}`;
}

async function setApplicationStatus(id, status) {
  try{if(backendEnabled())await backend.sync('application-status',{id,status});}
  catch(error){showToast(error.message||'Application status could not be changed');return;}
  const statuses = JSON.parse(localStorage.getItem('foundry-application-statuses') || '{}');
  statuses[id] = status;
  localStorage.setItem('foundry-application-statuses', JSON.stringify(statuses));
  renderApplications();
  renderAdmin();
  adminNavigate('applications');
  showToast(`Application ${status}`);
}

function initializeBenefitStoryFields() {
  const createForm = $('#createBenefitForm');
  const createAnchor = $('.divider-title', createForm);
  createAnchor.insertAdjacentHTML('beforebegin', `<div class="form-section-title divider-title benefit-story-title"><span>◎</span><div><h2>Partnership & company story</h2><p>Add the context members will see beneath the offer terms.</p></div></div><div class="admin-field-grid benefit-story-fields"><label class="admin-full-field">About the partnership<textarea name="partnershipDescription" maxlength="700" placeholder="Explain why Foundry and this company partnered, and what the relationship gives members." required></textarea></label><label class="admin-full-field">About the company<textarea name="companyDescription" maxlength="700" placeholder="Introduce the company, its work, values or relevant services." required></textarea></label></div><label class="gallery-upload-field"><input id="createBenefitGallery" type="file" accept="image/png,image/jpeg,image/webp" multiple /><span>＋</span><div><b>Add company images</b><small>Up to 5 JPG, PNG or WebP images · optimized automatically</small></div></label><div class="admin-gallery-preview" id="createGalleryPreview"></div><p class="form-error" id="createGalleryError"></p>`);
  const editForm = $('#benefitEditForm');
  const editAnchor = $('.form-section-title.divider-title', editForm);
  editAnchor.insertAdjacentHTML('beforebegin', `<div class="form-section-title divider-title benefit-story-title"><span>◎</span><div><h2>Partnership & company story</h2><p>Edit the long-form content shown in the member offer.</p></div></div><div class="admin-field-grid benefit-story-fields"><label class="admin-full-field">About the partnership<textarea name="partnershipDescription" maxlength="700" required></textarea></label><label class="admin-full-field">About the company<textarea name="companyDescription" maxlength="700" required></textarea></label></div><label class="gallery-upload-field"><input id="editBenefitGallery" type="file" accept="image/png,image/jpeg,image/webp" multiple /><span>＋</span><div><b>Add company images</b><small>Up to 5 images total · select more or remove existing images</small></div></label><div class="admin-gallery-preview" id="editGalleryPreview"></div><p class="form-error" id="editGalleryError"></p>`);
}

function renderAdminGallery(mode) {
  const images = mode === 'create' ? pendingCreateGallery : pendingEditGallery;
  const target = mode === 'create' ? $('#createGalleryPreview') : $('#editGalleryPreview');
  target.innerHTML = images.map((image,index) => `<figure><img src="${escapeHtml(image)}" alt="Gallery image ${index + 1}"/><button type="button" data-remove-gallery="${mode}" data-gallery-index="${index}" aria-label="Remove image">×</button><small>${index + 1}</small></figure>`).join('');
  target.classList.toggle('hidden', !images.length);
}

function removeGalleryImage(mode, index) {
  if (mode === 'create') pendingCreateGallery.splice(index,1);
  else pendingEditGallery.splice(index,1);
  renderAdminGallery(mode);
}

function updateBenefitPreview() {
  const form = $('#createBenefitForm');
  const data = new FormData(form);
  const color = data.get('color') || '#c8fa48';
  $('#previewLogo').textContent = data.get('brand') || 'BRAND';
  const imageMode = data.get('visualMode') === 'image' && pendingCreateImage;
  $('#previewLogo').classList.toggle('image-preview', Boolean(imageMode));
  $('#previewLogo').style.background = imageMode ? `linear-gradient(180deg,rgba(0,0,0,.03),rgba(0,0,0,.4)),url("${pendingCreateImage}") center/cover` : color;
  $('#previewCategory').textContent = data.get('category') ? categoryById(data.get('category')).name : 'CATEGORY';
  $('#previewTitle').textContent = data.get('title') || 'Your benefit title';
  $('#previewValue').textContent = data.get('value') || 'Member value';
  const selected = data.getAll('eligibility');
  $('#previewEligibility').innerHTML = selected.length ? selected.map(roleBadge).join('') : '<small>Select membership types</small>';
  const partnerEnabled = data.get('createPartner') === 'on';
  $('#partnerPreview').innerHTML = partnerEnabled ? `<span>PARTNER PORTAL</span><b>${escapeHtml(data.get('partnerCompany') || data.get('brand') || 'Partner company')}</b><small>${escapeHtml(data.get('partnerEmail') || 'Add login email')}</small>` : '<span>PARTNER PORTAL</span><b>No partner login</b><small>Enable partner access to verify real usage.</small>';
}

function updateCreateVisualMode() {
  const mode = new FormData($('#createBenefitForm')).get('visualMode') || 'color';
  $('#createColorField').classList.toggle('hidden', mode !== 'color');
  $('#createImageField').classList.toggle('hidden', mode !== 'image');
}

async function readImageFile(file,bucket='benefit-images',folder='uploads') {
  const dataUrl = await new Promise((resolve,reject) => {
    if (!file) return resolve(null);
    if (!['image/png','image/jpeg','image/webp'].includes(file.type)) return reject(new Error('Use a JPG, PNG or WebP image.'));
    if (file.size > 1.5 * 1024 * 1024) return reject(new Error('Image must be smaller than 1.5 MB.'));
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('The image could not be read.'));
    reader.readAsDataURL(file);
  });
  return dataUrl && backendEnabled() ? backend.uploadImage(dataUrl,bucket,folder) : dataUrl;
}

function optimizeGalleryImage(file) {
  return new Promise((resolve,reject) => {
    if (!['image/png','image/jpeg','image/webp'].includes(file.type)) return reject(new Error('Gallery images must be JPG, PNG or WebP.'));
    if (file.size > 3 * 1024 * 1024) return reject(new Error('Each gallery image must be smaller than 3 MB.'));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('A gallery image could not be read.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('A gallery image could not be opened.'));
      image.onload = () => {
        const scale = Math.min(1, 1400 / image.width, 900 / image.height);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff'; context.fillRect(0,0,canvas.width,canvas.height);
        context.drawImage(image,0,0,canvas.width,canvas.height);
        resolve(canvas.toDataURL('image/jpeg',0.78));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function addGalleryFiles(mode, fileList) {
  const current = mode === 'create' ? pendingCreateGallery : pendingEditGallery;
  const files = [...fileList];
  const error = mode === 'create' ? $('#createGalleryError') : $('#editGalleryError');
  if (current.length + files.length > 5) { error.textContent = 'Use up to 5 company images per benefit.'; return; }
  try {
    const optimizedData = await Promise.all(files.map(optimizeGalleryImage));
    const optimized = backendEnabled() ? await Promise.all(optimizedData.map(image=>backend.uploadImage(image,'benefit-images','galleries'))) : optimizedData;
    current.push(...optimized);
    error.textContent = '';
    renderAdminGallery(mode);
  } catch (galleryError) { error.textContent = galleryError.message; }
}

function createBenefit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const eligibility = data.getAll('eligibility');
  const visualMode = data.get('visualMode') || 'color';
  if (!eligibility.length) { $('#eligibilityError').textContent = 'Select at least one membership type.'; return; }
  if (visualMode === 'image' && !pendingCreateImage) { $('#createImageError').textContent = 'Upload an image or use colour + words.'; return; }
  const createPartner = data.get('createPartner') === 'on';
  const partnerEmail = data.get('partnerEmail').trim().toLowerCase();
  const partnerPassword = data.get('partnerPassword').trim();
  if (createPartner && (!data.get('partnerCompany').trim() || !partnerEmail || partnerPassword.length < 8)) { $('#partnerCreateError').textContent = 'Add the company, a valid email and a password of at least 8 characters.'; return; }
  if (createPartner && [...demoAccounts, ...loadPartners()].some(account => account.email.toLowerCase() === partnerEmail)) { $('#partnerCreateError').textContent = 'That email is already used by another account.'; return; }
  $('#eligibilityError').textContent = '';
  $('#createImageError').textContent = '';
  $('#partnerCreateError').textContent = '';
  const custom = JSON.parse(localStorage.getItem('foundry-custom-offers') || '[]');
  const benefitId = `custom-${Date.now()}`;
  custom.unshift({ id:benefitId, brand:data.get('brand').trim(), title:data.get('title').trim(), category:data.get('category'), label:categoryById(data.get('category')).name.toUpperCase(), value:data.get('value').trim(), color:data.get('color'), text:'#151613', description:data.get('description').trim(), partnershipDescription:data.get('partnershipDescription').trim(), companyDescription:data.get('companyDescription').trim(), gallery:[...pendingCreateGallery], eligibility, featured:data.get('featured') === 'on', status:data.get('status'), visualMode, image:visualMode === 'image' ? pendingCreateImage : null });
  localStorage.setItem('foundry-custom-offers', JSON.stringify(custom));
  if (createPartner) {
    const partners = loadPartners();
    partners.unshift({ id:`PARTNER-${Date.now()}`, company:data.get('partnerCompany').trim(), contactName:data.get('partnerContact').trim(), email:partnerEmail, password:partnerPassword, benefitIds:[benefitId], status:'active', createdAt:new Date().toISOString() });
    savePartners(partners);
  }
  offers = loadOffers();
  syncBackend('benefits', offers).then(()=>createPartner&&syncBackend('partners',loadPartners()));
  form.reset();
  form.elements.color.value = '#c8fa48';
  pendingCreateImage = null;
  pendingCreateGallery = [];
  $('#createBenefitImage').value = '';
  $('#createImageName').textContent = '1200 × 750 recommended';
  $('#createBenefitGallery').value = '';
  $('#createGalleryError').textContent = '';
  renderAdminGallery('create');
  $('#partnerCreateFields').classList.add('hidden');
  updateCreateVisualMode();
  renderAdminBenefits();
  renderDistribution();
  renderOverviewAnalytics();
  updateBenefitPreview();
  renderAdminPartners(); renderDemoAccounts();
  showToast(createPartner ? 'Benefit and partner login created' : 'Benefit published to selected members');
  adminNavigate('benefits');
}

function formatActivityDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Unknown time' : date.toLocaleString([], {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
}

function usageStatusLabel(status) {
  return ({verified:'Verified',redeemed:'Redeemed',not_used:'Not used',rejected:'Rejected',cancelled:'Cancelled'})[status] || titleCase(status);
}

function renderUsageRows(logs, editable = false) {
  if (!logs.length) return '<div class="empty-admin-state">No verification activity yet.</div>';
  return logs.map(log => {
    const member = loadMembers().find(item => item.id === log.memberId);
    const offer = offers.find(item => item.id === log.benefitId);
    const partner = loadPartners().find(item => item.id === log.partnerId);
    return `<article class="usage-log-row"><span class="usage-status-dot ${escapeHtml(log.status)}"></span><div><b>${escapeHtml(member?.name || log.memberId)}</b><small>${escapeHtml(offer?.title || 'Deleted benefit')} · ${escapeHtml(partner?.company || 'Partner')}</small></div><time>${escapeHtml(formatActivityDate(log.verifiedAt))}</time>${editable ? `<select data-usage-status="${escapeHtml(log.id)}"><option value="verified" ${log.status === 'verified' ? 'selected' : ''}>Verified</option><option value="redeemed" ${log.status === 'redeemed' ? 'selected' : ''}>Redeemed</option><option value="not_used" ${log.status === 'not_used' ? 'selected' : ''}>Not used</option><option value="rejected" ${log.status === 'rejected' ? 'selected' : ''}>Rejected</option><option value="cancelled" ${log.status === 'cancelled' ? 'selected' : ''}>Cancelled</option></select>` : `<span class="status-tag ${escapeHtml(log.status)}">${escapeHtml(usageStatusLabel(log.status))}</span>`}</article>`;
  }).join('');
}

function renderAdminPartners() {
  if (!$('#adminPartnerList')) return;
  const partners = loadPartners();
  const logs = loadUsageLogs().sort((a,b) => new Date(b.verifiedAt) - new Date(a.verifiedAt));
  const redeemed = logs.filter(log => log.status === 'redeemed').length;
  const claims = offers.reduce((sum, offer) => sum + getBenefitClaims(offer.id), 0);
  $('#usageMetricGrid').innerHTML = [
    ['PARTNER ACCOUNTS',partners.length,'Companies with portal access','▣','#668fe9','#e0e7fb'],
    ['QR VERIFICATIONS',logs.length,'All scanned member codes','◎','#668f3f','#e6f3d6'],
    ['VERIFIED USE',redeemed,'Partner-confirmed redemptions','✓','#d77755','#f6e3dc'],
    ['CLAIM → USE',claims ? `${Math.round(redeemed / claims * 100)}%` : '—',`${claims} tracked claim clicks`,'↗','#7d63e8','#e8e1fb']
  ].map(([label,value,sub,icon,color,soft]) => `<article class="metric-card" style="--metric:${color};--metric-soft:${soft}"><div><span>${label}</span><i>${icon}</i></div><strong>${value}</strong><small>${sub}</small></article>`).join('');
  $('#adminPartnerList').innerHTML = partners.length ? partners.map(partner => `<article class="partner-account-row"><i>${escapeHtml(partner.company.split(' ').map(word => word[0]).slice(0,2).join('').toUpperCase())}</i><div><b>${escapeHtml(partner.company)}</b><small>${escapeHtml(partner.email)} · ${(partner.benefitIds || []).length} assigned benefit${(partner.benefitIds || []).length === 1 ? '' : 's'}</small></div><span class="status-tag ${escapeHtml(partner.status)}">${escapeHtml(partner.status)}</span></article>`).join('') : '<div class="empty-admin-state">Partner accounts appear here when created with a benefit.</div>';
  $('#adminUsageLog').innerHTML = renderUsageRows(logs.slice(0,8));
}

function partnerNavigate(name) {
  $$('.partner-view').forEach(view => view.classList.toggle('active', view.dataset.partnerView === name));
  $$('[data-partner-go]').forEach(button => button.classList.toggle('active', button.dataset.partnerGo === name));
  $('.partner-sidebar').classList.remove('open');
  renderPartnerApp(false);
}

function renderPartnerApp(resetView = true) {
  if (!currentUser || currentUser.role !== 'partner') return;
  const partner = loadPartners().find(item => item.id === currentUser.id) || currentUser;
  const benefits = offers.filter(offer => (partner.benefitIds || []).includes(offer.id));
  const logs = loadUsageLogs().filter(log => log.partnerId === partner.id).sort((a,b) => new Date(b.verifiedAt) - new Date(a.verifiedAt));
  const initials = partner.company.split(' ').map(word => word[0]).slice(0,2).join('').toUpperCase();
  $('#partnerAccountInitials').textContent = initials;
  $('#partnerAccountName').textContent = partner.company;
  $('#partnerMetricGrid').innerHTML = `<article><span>TODAY</span><strong>${logs.filter(log => new Date(log.verifiedAt).toDateString() === new Date().toDateString()).length}</strong><small>QR checks</small></article><article><span>REDEEMED</span><strong>${logs.filter(log => log.status === 'redeemed').length}</strong><small>Confirmed uses</small></article><article><span>PENDING</span><strong>${logs.filter(log => log.status === 'verified').length}</strong><small>Need final status</small></article>`;
  $('#partnerBenefitList').innerHTML = benefits.length ? benefits.map(offer => `<article><div class="rank-brand${offerVisualClass(offer)}" style="${offerVisualStyle(offer)}">${offerBrand(offer.brand)}</div><div><b>${escapeHtml(offer.title)}</b><small>${escapeHtml(categoryById(offer.category).name)} · ${getBenefitUsage(offer.id)} verified uses</small></div><span class="status-tag ${escapeHtml(offer.status)}">${escapeHtml(offer.status)}</span></article>`).join('') : '<div class="empty-admin-state">No active benefits are assigned to this account.</div>';
  $('#partnerUsageLog').innerHTML = renderUsageRows(logs, true);
  const form = $('#partnerAccountForm');
  form.elements.company.value = partner.company || '';
  form.elements.contactName.value = partner.contactName || '';
  form.elements.email.value = partner.email || '';
  form.elements.password.value = '';
  if (resetView) partnerNavigate('verify');
}

async function startPartnerScanner() {
  openAdminModal('partnerScannerModal');
  $('#scannerError').textContent = '';
  $('#partnerVerificationResult').classList.add('hidden');
  $('#partnerManualCode').value = '';
  lastScannedCode = '';
  try {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error('Camera access is not available here. Paste the member code below.');
    scannerStream = await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}}});
    const video = $('#partnerQrVideo');
    video.srcObject = scannerStream;
    await video.play();
    scanPartnerFrame();
  } catch (error) { $('#scannerError').textContent = error.message || 'Camera could not be opened. Paste the member code instead.'; }
}

function scanPartnerFrame() {
  const video = $('#partnerQrVideo');
  const canvas = $('#partnerQrCanvas');
  if (!scannerStream || !video.videoWidth) { scannerFrame = requestAnimationFrame(scanPartnerFrame); return; }
  canvas.width = video.videoWidth; canvas.height = video.videoHeight;
  const context = canvas.getContext('2d', {willReadFrequently:true});
  context.drawImage(video,0,0,canvas.width,canvas.height);
  const result = window.jsQR(context.getImageData(0,0,canvas.width,canvas.height).data, canvas.width, canvas.height, {inversionAttempts:'dontInvert'});
  if (result?.data && result.data !== lastScannedCode) { lastScannedCode = result.data; verifyPartnerCode(result.data); }
  else scannerFrame = requestAnimationFrame(scanPartnerFrame);
}

function stopPartnerScanner() {
  cancelAnimationFrame(scannerFrame);
  scannerStream?.getTracks().forEach(track => track.stop());
  scannerStream = null;
  const video = $('#partnerQrVideo');
  if (video) video.srcObject = null;
}

function closePartnerScanner() {
  stopPartnerScanner();
  closeAdminModal('partnerScannerModal');
}

async function verifyPartnerCode(code) {
  if (backendEnabled()) {
    try {
      stopPartnerScanner();const result=await backend.verifyQr(code);const member=result.member;const validBenefits=result.eligibleBenefits||[];const log={id:result.log.id,partnerId:result.log.partnerId,benefitId:result.log.benefitId,memberId:member.id,verifiedAt:result.log.verifiedAt,status:'verified',updatedAt:new Date().toISOString()};const logs=loadUsageLogs();logs.unshift(log);localStorage.setItem('foundry-usage-logs',JSON.stringify(logs));
      $('#scannerError').textContent='';$('#partnerVerificationResult').classList.remove('hidden');$('#partnerVerificationResult').innerHTML=`<div class="verification-success">✓</div><p class="eyebrow">ACTIVE MEMBER</p><h3>${escapeHtml(member.name)}</h3><p>${escapeHtml(memberTypes[member.role].tier)} · ${escapeHtml(member.id)}</p><label>Eligible benefit<select id="verifiedBenefitSelect">${validBenefits.map(item=>`<option value="${escapeHtml(item.id)}" ${item.id===log.benefitId?'selected':''}>${escapeHtml(item.title)}</option>`).join('')}</select></label><div class="verification-actions"><button type="button" data-verification-outcome="redeemed" data-log-id="${escapeHtml(log.id)}">Mark redeemed</button><button type="button" data-verification-outcome="not_used" data-log-id="${escapeHtml(log.id)}">Not used</button><button type="button" data-verification-outcome="rejected" data-log-id="${escapeHtml(log.id)}">Reject</button></div><small>Secure server verification was logged automatically.</small>`;renderPartnerApp(false);return;
    } catch (error) { $('#scannerError').textContent=error.message||'Verification failed';lastScannedCode='';return; }
  }
  const parsed = parseMemberQr(code);
  if (parsed.error) { $('#scannerError').textContent = parsed.error; lastScannedCode = ''; scannerFrame = requestAnimationFrame(scanPartnerFrame); return; }
  stopPartnerScanner();
  const partner = loadPartners().find(item => item.id === currentUser.id);
  const validBenefits = offers.filter(offer => (partner?.benefitIds || []).includes(offer.id) && offer.status === 'active' && offer.eligibility.includes(parsed.member.role) && !(parsed.member.excludedBenefits || []).includes(offer.id));
  if (!validBenefits.length) { $('#scannerError').textContent = 'Membership is valid, but this member is not eligible for any benefit assigned to your account.'; return; }
  const offer = validBenefits[0];
  const logs = loadUsageLogs();
  const log = { id:`USE-${Date.now()}`, partnerId:partner.id, benefitId:offer.id, memberId:parsed.member.id, verifiedAt:new Date().toISOString(), status:'verified', updatedAt:new Date().toISOString() };
  logs.unshift(log); saveUsageLogs(logs);
  $('#scannerError').textContent = '';
  $('#partnerVerificationResult').classList.remove('hidden');
  $('#partnerVerificationResult').innerHTML = `<div class="verification-success">✓</div><p class="eyebrow">ACTIVE MEMBER</p><h3>${escapeHtml(parsed.member.name)}</h3><p>${escapeHtml(memberTypes[parsed.member.role].tier)} · ${escapeHtml(parsed.member.id)}</p><label>Eligible benefit<select id="verifiedBenefitSelect">${validBenefits.map(item => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.title)}</option>`).join('')}</select></label><div class="verification-actions"><button type="button" data-verification-outcome="redeemed" data-log-id="${escapeHtml(log.id)}">Mark redeemed</button><button type="button" data-verification-outcome="not_used" data-log-id="${escapeHtml(log.id)}">Not used</button><button type="button" data-verification-outcome="rejected" data-log-id="${escapeHtml(log.id)}">Reject</button></div><small>Verification was logged automatically. You can change the final status now or later.</small>`;
  renderPartnerApp(false);
}

function updateUsageStatus(id, status, benefitId = null) {
  const logs = loadUsageLogs();
  const log = logs.find(item => item.id === id);
  if (!log) return;
  log.status = status; log.updatedAt = new Date().toISOString();
  if (benefitId) log.benefitId = benefitId;
  saveUsageLogs(logs);
  syncBackend('usage-status',{id,status,benefitId:benefitId||log.benefitId});
  renderPartnerApp(false); renderAdminPartners(); renderOverviewAnalytics(); renderAdminBenefits();
  showToast(`Usage marked ${usageStatusLabel(status).toLowerCase()}`);
}

function savePartnerAccount(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const partners = loadPartners();
  const partner = partners.find(item => item.id === currentUser.id);
  if (!partner) return;
  const email = data.get('email').trim().toLowerCase();
  if (partners.some(item => item.id !== partner.id && item.email.toLowerCase() === email)) return showToast('That email is already in use');
  partner.company = data.get('company').trim(); partner.contactName = data.get('contactName').trim(); partner.email = email;
  if (data.get('password').trim()) partner.password = data.get('password').trim();
  savePartners(partners); syncBackend('partner-profile',{...partner,newPassword:data.get('password').trim()}); currentUser = {...currentUser,...partner,name:partner.company}; sessionStorage.setItem('foundry-session', partner.email);
  renderPartnerApp(false); renderDemoAccounts(); showToast('Partner account updated');
}

function loadAdminSettings() {
  const settings = JSON.parse(localStorage.getItem('foundry-admin-settings') || '{}');
  const profile = { adminName:currentUser?.name||'Community Admin', adminEmail:currentUser?.email||'', adminTitle:'Community Operations Lead', adminPhone:currentUser?.phone||'', ...(settings.profile || {}) };
  const profileForm = $('#adminProfileForm');
  Object.entries(profile).forEach(([key,value]) => { if (profileForm.elements[key]) profileForm.elements[key].value = value; });
  const initials = profile.adminName.split(' ').map(part => part[0]).slice(0,2).join('').toUpperCase();
  $('#settingsAvatar').textContent = initials;
  $('#adminAccountInitials').textContent = initials;
  $('#adminAccountName').textContent = profile.adminName;
  ['notifications','community'].forEach(section => {
    const form = section === 'notifications' ? $('#adminNotificationsForm') : $('#communitySettingsForm');
    const values = settings[section] || {};
    Object.entries(values).forEach(([key,value]) => { if (!form.elements[key]) return; if (form.elements[key].type === 'checkbox') form.elements[key].checked = Boolean(value); else form.elements[key].value = value; });
  });
  const security = settings.security || {};
  $('#adminSecurityForm').elements.twoFactor.checked = Boolean(security.twoFactor);
  $('#adminSecurityForm').elements.sessionTimeout.value = security.sessionTimeout || '30';
}

function saveSettingsSection(section, values) {
  const settings = JSON.parse(localStorage.getItem('foundry-admin-settings') || '{}');
  settings[section] = values;
  localStorage.setItem('foundry-admin-settings', JSON.stringify(settings));
  syncBackend('settings',settings);
  $('#settingsSaved').textContent = 'Saved just now';
  showToast('Admin settings saved');
  loadAdminSettings();
}

function formValues(form) {
  const values = {};
  $$('input,select,textarea', form).forEach(field => { if (!field.name || field.type === 'password') return; values[field.name] = field.type === 'checkbox' ? field.checked : field.value; });
  return values;
}

function exportMembers() {
  const rows = loadMembers().map(member => ({ID:member.id,Name:member.name,Email:member.email,Phone:member.phone,City:member.city,Membership:memberTypes[member.role].label,Organization:member.organization,Title:member.title,Status:member.status,Verification:member.verification,Expires:member.expires,'Excluded benefits':(member.excludedBenefits || []).join(', '),'Two-step verification':member.twoFactor ? 'Enabled' : 'Disabled',Language:member.language || 'en'}));
  downloadWorkbook('foundry-members.xlsx', [{name:'Members',rows}]);
  showToast('Excel member list exported');
}

function usageExportRows(logs) {
  return logs.map(log => {
    const member = loadMembers().find(item => item.id === log.memberId);
    const offer = offers.find(item => item.id === log.benefitId);
    const partner = loadPartners().find(item => item.id === log.partnerId);
    return {Usage_ID:log.id,Verified_at:log.verifiedAt,Updated_at:log.updatedAt,Status:usageStatusLabel(log.status),Member_ID:log.memberId,Member:member?.name || '',Membership:memberTypes[member?.role]?.label || '',Benefit:offer?.title || 'Deleted benefit',Partner:partner?.company || ''};
  });
}

function downloadWorkbook(filename, sheets) {
  if (!window.XLSX) return showToast('Excel export library did not load');
  const workbook = XLSX.utils.book_new();
  sheets.forEach(({name,rows}) => {
    const worksheet = XLSX.utils.json_to_sheet(rows.length ? rows : [{Message:'No records'}]);
    worksheet['!cols'] = Object.keys(rows[0] || {Message:''}).map(key => ({wch:Math.max(12,Math.min(34,key.length + 7))}));
    XLSX.utils.book_append_sheet(workbook, worksheet, name.slice(0,31));
  });
  XLSX.writeFile(workbook, filename, {compression:true});
}

function exportAllUsage() {
  downloadWorkbook('foundry-partner-usage.xlsx', [{name:'Usage',rows:usageExportRows(loadUsageLogs())},{name:'Partners',rows:loadPartners().map(partner => ({Company:partner.company,Contact:partner.contactName,Email:partner.email,Status:partner.status,Benefits:(partner.benefitIds || []).map(id => offers.find(offer => offer.id === id)?.title || id).join(', ')}))}]);
  showToast('Excel usage report exported');
}

function exportCurrentPartnerUsage() {
  downloadWorkbook('foundry-partner-usage.xlsx', [{name:'Usage',rows:usageExportRows(loadUsageLogs().filter(log => log.partnerId === currentUser.id))}]);
  showToast('Excel usage report exported');
}

function setupTelegram() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  tg.ready();
  tg.expand();
  try { tg.setHeaderColor('#f2f0e9'); tg.setBackgroundColor('#f2f0e9'); } catch (_) {}
}

function initializeEventEnhancements() {
  const form = $('#adminEventForm');
  const addressLabel = form.elements.address.closest('label');
  addressLabel.insertAdjacentHTML('afterend', `<label>Map latitude<input name="latitude" type="number" step="any" placeholder="e.g. 9.0108" /></label><label>Map longitude<input name="longitude" type="number" step="any" placeholder="e.g. 38.7613" /></label><label class="admin-full-field">Map place title<input name="mapLabel" placeholder="e.g. The Urban Center" /></label><div class="admin-full-field admin-event-map-preview" id="adminEventMapPreview"><div><b>Exact map preview</b><small>Add latitude and longitude to select the member map and enable live weather.</small></div></div>`);
  const eligibilityTitle = $('#eventEligibilityPicker').previousElementSibling;
  eligibilityTitle.insertAdjacentHTML('beforebegin', `<div class="form-section-title divider-title"><span>05</span><div><h2>Speakers, hosts & sponsors</h2><p>Add photos, logos and details members can open.</p></div></div><div class="event-contributor-toolbar"><button type="button" class="admin-secondary" data-add-event-person="speaker">＋ Speaker</button><button type="button" class="admin-secondary" data-add-event-person="host">＋ Host</button><button type="button" class="admin-secondary" data-add-event-person="sponsor">＋ Sponsor</button></div><div class="event-people-editor" id="eventPeopleEditor"></div>`);
  eligibilityTitle.querySelector('span').textContent = '06';
  const visualTitle = [...form.querySelectorAll('.form-section-title')].find(title => title.textContent.includes('Event visual'));
  if (visualTitle) visualTitle.querySelector('span').textContent = '07';
  $('.event-detail-card', $('#eventDetailModal')).innerHTML = `<button type="button" class="event-detail-close" data-close-admin-modal="eventDetailModal">×</button><div class="event-detail-visual" id="eventDetailVisual"><div><span id="eventDetailType">EVENT</span><b id="eventDetailDate">DATE</b></div></div><div class="event-detail-content"><div class="event-detail-meta"><span id="eventDetailFormat">IN PERSON</span><span id="eventDetailCost">FREE</span><span id="eventDetailRsvpCount">0 attending</span></div><h2 id="eventDetailTitle">Community event</h2><p class="event-detail-summary" id="eventDetailSummary"></p><div class="event-rsvp-panel event-rsvp-prominent"><div><span>RESERVE YOUR PLACE</span><b>Your RSVP</b><small id="eventRsvpHelp">Choose your attendance status.</small></div><div class="event-rsvp-actions"><button type="button" data-event-rsvp="going">✓ Going</button><button type="button" data-event-rsvp="maybe">? Maybe</button><button type="button" data-event-rsvp="not-going">Not going</button></div></div><section class="event-date-time-section"><div class="event-section-heading"><span>EVENT DATE & TIME</span><small id="eventTimezoneLabel"></small></div><div class="event-date-time-grid"><article><span>START DATE</span><strong id="eventStartDate">—</strong><small>START TIME</small><b id="eventStartTime">—</b></article><i>→</i><article><span>END DATE</span><strong id="eventEndDate">—</strong><small>END TIME</small><b id="eventEndTime">—</b></article></div></section><section class="event-weather-section" id="eventWeatherPanel"><div class="event-section-heading"><span>WEATHER AT EVENT TIME</span><small>Live hourly forecast</small></div><div id="eventWeatherContent" class="event-weather-content"><div class="weather-loading">Checking the forecast…</div></div></section><div class="event-fact-grid" id="eventDetailFacts"></div><p class="event-detail-description" id="eventDetailDescription"></p><section class="event-people-section" id="eventPeopleSection"><div class="event-people-groups" id="eventPeopleGrid"></div></section><div class="event-information" id="eventDetailInformation"></div><section class="event-map-section" id="eventMapSection"><div class="event-map-heading"><div><span>EVENT LOCATION</span><h3 id="eventMapPlace">Venue</h3><p id="eventMapAddress"></p></div><a id="eventMapLink" target="_blank" rel="noopener">Open in Maps ↗</a></div><iframe id="eventMapFrame" title="Interactive event location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section><div class="event-detail-contact" id="eventDetailContact"></div></div>`;
  document.body.insertAdjacentHTML('beforeend', `<div class="admin-modal event-person-modal" id="eventPersonModal" aria-hidden="true"><div class="admin-modal-card event-person-card"><button type="button" class="event-detail-close" data-close-admin-modal="eventPersonModal">×</button><div class="event-person-image" id="eventPersonImage"><span>F</span></div><p class="eyebrow" id="eventPersonType">SPEAKER</p><h2 id="eventPersonName">Name</h2><h3 id="eventPersonTitle"></h3><p id="eventPersonDescription"></p><a id="eventPersonWebsite" target="_blank" rel="noopener">Visit profile ↗</a></div></div>`);
  const memberInfoGrid = form.elements.contactPhone.closest('.admin-field-grid');
  memberInfoGrid.insertAdjacentHTML('afterend', `<div class="event-policy-admin"><div class="admin-field-grid"><label>Dress code style<select name="dressCodePreset"><option value="none">No dress code</option><option value="casual">Casual</option><option value="smart-casual">Smart casual</option><option value="business">Business</option><option value="business-formal">Business formal</option><option value="cocktail">Cocktail</option><option value="black-tie">Black tie</option><option value="cultural">Cultural or traditional</option><option value="custom">Custom</option></select></label><label>Age policy<select name="agePreset"><option value="none">No age restriction</option><option value="all-ages">All ages</option><option value="13+">13+</option><option value="16+">16+</option><option value="18+">18+</option><option value="21+">21+</option><option value="custom">Custom</option></select></label><label>Photography policy<select name="photographyPolicy"><option value="allowed">Photography allowed</option><option value="limited">Limited photography</option><option value="consent">Ask before photographing</option><option value="no-photography">No photography</option><option value="official-only">Official photographer only</option></select></label><label>ID requirement<select name="idRequirement"><option value="none">No ID required</option><option value="membership">Foundry membership QR</option><option value="government">Government-issued ID</option><option value="student">Student ID</option><option value="invitation">Invitation or ticket</option><option value="custom">Custom requirement</option></select></label><label class="admin-full-field">Custom ID or entry requirement<input name="idRequirementCustom" placeholder="Used when Custom requirement is selected" /></label></div><div class="event-accessibility-admin"><span>Accessibility available</span><label><input type="checkbox" name="accessibilityOptions" value="step-free" /> Step-free access</label><label><input type="checkbox" name="accessibilityOptions" value="accessible-restroom" /> Accessible restroom</label><label><input type="checkbox" name="accessibilityOptions" value="reserved-seating" /> Reserved seating</label><label><input type="checkbox" name="accessibilityOptions" value="live-captions" /> Live captions</label><label><input type="checkbox" name="accessibilityOptions" value="sign-language" /> Sign-language support</label><label><input type="checkbox" name="accessibilityOptions" value="quiet-space" /> Quiet space</label></div><label class="settings-toggle event-day-toggle"><div><b>Allow attendance-day selection</b><small>For multi-day events, attendees can manage which days they will attend.</small></div><input name="allowDaySelection" type="checkbox" /></label><label class="settings-toggle"><div><b>Open guest registration link</b><small>Creates a shareable registration page for people without a member account.</small></div><input name="openRegistration" type="checkbox" /></label></div>`);
  $('.event-policy-admin').insertAdjacentHTML('beforeend', `<div class="admin-event-share-panel hidden" id="adminEventSharePanel"><span>OPEN REGISTRATION LINK</span><div><input id="adminEventShareUrl" readonly /><button type="button" data-copy-registration>Copy link</button></div><small>Anyone with this URL can open the guest registration page.</small></div>`);
  $('.event-policy-admin').insertAdjacentHTML('beforeend', `<div class="admin-guest-registration-panel hidden" id="adminGuestRegistrationPanel"><span>GUEST REGISTRATIONS ON THIS DEVICE</span><div id="adminGuestRegistrationList"></div></div>`);
  $('#eventDetailInformation').insertAdjacentHTML('afterend', `<section class="event-requirements-section" id="eventRequirementsSection"><div class="event-section-heading"><span>KNOW BEFORE YOU GO</span><small>Event requirements</small></div><div class="event-requirement-grid" id="eventRequirementGrid"></div></section>`);
  $('#eventMapSection').before($('.event-rsvp-panel'));
  document.body.insertAdjacentHTML('beforeend', `<div class="admin-modal" id="eventManageRsvpModal" aria-hidden="true"><div class="admin-modal-card manage-rsvp-card"><div class="admin-modal-head"><div><p class="eyebrow">YOUR REGISTRATION</p><h2>Manage RSVP</h2></div><button type="button" data-close-admin-modal="eventManageRsvpModal">×</button></div><form id="eventManageRsvpForm"><div id="manageRsvpDays" class="manage-rsvp-days"></div><label class="guest-request-toggle"><input type="checkbox" name="guestRequested" /><span><b>Request to bring a guest</b><small>Guest access may require organizer approval.</small></span></label><div class="guest-request-fields" id="guestRequestFields"><label>Guest name<input name="guestName" /></label><label>Guest email<input name="guestEmail" type="email" /></label></div><p class="manage-rsvp-message" id="manageRsvpMessage"></p><div class="admin-modal-actions split-actions"><button type="button" class="danger-button" id="cancelEventAttendance">Cancel attendance</button><span></span><button type="button" class="admin-secondary" data-close-admin-modal="eventManageRsvpModal">Close</button><button type="submit" class="admin-primary">Save RSVP</button></div></form></div></div><div class="admin-modal" id="eventEmailModal" aria-hidden="true"><div class="admin-modal-card email-capture-card"><div class="admin-modal-head"><div><p class="eyebrow">CALENDAR DELIVERY</p><h2>Add your email</h2></div><button type="button" data-close-admin-modal="eventEmailModal">×</button></div><p>Enter an email so your registration and calendar details have a contact address.</p><form id="eventEmailForm"><label>Email address<input name="email" type="email" required /></label><button class="admin-primary" type="submit">Save and continue</button></form></div></div>`);
  $('.auth-action-panel').insertAdjacentHTML('beforeend', `<div class="auth-view guest-registration-view" data-auth-view="guest-event"><button class="auth-back" data-auth-go="welcome">← Back</button><p class="eyebrow">OPEN EVENT REGISTRATION</p><h2 id="guestEventTitle">Register for this event</h2><p class="auth-lead" id="guestEventSummary"></p><form id="guestEventRegistrationForm" class="auth-form"><input type="hidden" name="eventId" /><label>Full name<input name="name" required /></label><label>Email address<input name="email" type="email" required /></label><label>Phone number<input name="phone" /></label><div id="guestRegistrationDays" class="manage-rsvp-days"></div><label class="check-label"><input type="checkbox" name="consent" required /> I agree to the event requirements and registration terms.</label><button class="primary-button" type="submit">Register for event <span>↗</span></button><p class="form-error" id="guestRegistrationError"></p></form><div class="guest-registration-success hidden" id="guestRegistrationSuccess"><span>✓</span><h3>Registration received</h3><p>Your RSVP has been saved on this device.</p><button class="secondary-button" type="button" data-calendar="google">Add to Google Calendar</button><button class="secondary-button" type="button" data-calendar="apple">Add to Apple Calendar</button></div></div>`);
}

initializeBenefitStoryFields();
initializeEventEnhancements();

document.addEventListener('click', event => {
  const authGo = event.target.closest('[data-auth-go]');
  if (authGo) return showAuthView(authGo.dataset.authGo);
  const go = event.target.closest('[data-go]');
  if (go) return navigate(go.dataset.go);
  const adminGo = event.target.closest('[data-admin-go]');
  if (adminGo) return adminNavigate(adminGo.dataset.adminGo);
  const partnerGo = event.target.closest('[data-partner-go]');
  if (partnerGo) return partnerNavigate(partnerGo.dataset.partnerGo);
  const toastButton = event.target.closest('[data-toast]');
  if (toastButton) return showToast(toastButton.dataset.toast);
  const saveButton = event.target.closest('[data-save]');
  if (saveButton) { event.stopPropagation(); return toggleSave(saveButton.dataset.save); }
  const offer = event.target.closest('[data-offer]');
  if (offer) return openOffer(offer.dataset.offer);
  const eventCardTarget = event.target.closest('[data-event-id]');
  if (eventCardTarget) return openEventDetail(eventCardTarget.dataset.eventId);
  const eventRsvp = event.target.closest('[data-event-rsvp]');
  if (eventRsvp) return setEventRsvp(eventRsvp.dataset.eventRsvp);
  const calendar = event.target.closest('[data-calendar]');
  if (calendar) return addEventToCalendar(calendar.dataset.calendar);
  if (event.target.closest('[data-manage-rsvp]')) return openManageRsvp();
  if (event.target.closest('[data-share-registration]')) return shareGuestRegistration();
  if (event.target.closest('[data-copy-registration]')) { navigator.clipboard?.writeText($('#adminEventShareUrl').value); return showToast('Open registration link copied'); }
  const eventFilter = event.target.closest('[data-event-filter]');
  if (eventFilter) { activeEventFilter = eventFilter.dataset.eventFilter; return renderMemberEvents(); }
  const eventPerson = event.target.closest('[data-event-person]');
  if (eventPerson) return openEventPerson(eventPerson.dataset.eventPerson);
  const addPerson = event.target.closest('[data-add-event-person]');
  if (addPerson) return addEventPerson(addPerson.dataset.addEventPerson);
  const removePerson = event.target.closest('[data-remove-event-person]');
  if (removePerson) { editingEventPeople.splice(Number(removePerson.dataset.removeEventPerson),1); return renderEventPeopleEditor(); }
  const demo = event.target.closest('[data-demo-email]');
  if (demo) {
    const demoAccount = [...demoAccounts, ...loadPartners().map(partner => ({...partner,role:'partner'}))].find(account => account.email === demo.dataset.demoEmail) || getMemberByEmail(demo.dataset.demoEmail);
    const demoPassword = demoAccount?.role === 'admin' ? (localStorage.getItem('foundry-admin-password') || 'demo123') : demoAccount?.password || 'demo123';
    $('#loginEmail').value = demo.dataset.demoEmail;
    $('#loginPassword').value = demoPassword;
    return performLogin(demo.dataset.demoEmail, demoPassword);
  }
  const applicationAction = event.target.closest('[data-application-action]');
  if (applicationAction) return setApplicationStatus(applicationAction.dataset.applicationId, applicationAction.dataset.applicationAction);
  const editMember = event.target.closest('[data-edit-member]');
  if (editMember) return openMemberEditor(editMember.dataset.editMember);
  const editBenefit = event.target.closest('[data-edit-benefit]');
  if (editBenefit) return openBenefitEditor(editBenefit.dataset.editBenefit);
  const editEvent = event.target.closest('[data-edit-event]');
  if (editEvent) return openEventForm(editEvent.dataset.editEvent);
  const closeModal = event.target.closest('[data-close-admin-modal]');
  if (closeModal) return closeAdminModal(closeModal.dataset.closeAdminModal);
  const memberTab = event.target.closest('[data-member-tab]');
  if (memberTab) {
    $$('[data-member-tab]').forEach(button => button.classList.toggle('active', button === memberTab));
    $$('[data-member-panel]').forEach(panel => panel.classList.toggle('active', panel.dataset.memberPanel === memberTab.dataset.memberTab));
    if (memberTab.dataset.memberTab === 'exclusions') renderMemberExclusions();
    return;
  }
  const selfTab = event.target.closest('[data-self-tab]');
  if (selfTab) {
    $$('[data-self-tab]').forEach(button => button.classList.toggle('active', button === selfTab));
    $$('[data-self-panel]').forEach(panel => panel.classList.toggle('active', panel.dataset.selfPanel === selfTab.dataset.selfTab));
    return;
  }
  const settingsGo = event.target.closest('[data-settings-go]');
  if (settingsGo) {
    $$('[data-settings-go]').forEach(button => button.classList.toggle('active', button === settingsGo));
    $$('[data-settings-panel]').forEach(panel => panel.classList.toggle('active', panel.dataset.settingsPanel === settingsGo.dataset.settingsGo));
  }
  const saveCategory = event.target.closest('[data-save-category]');
  if (saveCategory) return saveCategoryFromRow(saveCategory.dataset.saveCategory);
  const removeCategory = event.target.closest('[data-delete-category]');
  if (removeCategory) return deleteCategory(removeCategory.dataset.deleteCategory);
  const outcome = event.target.closest('[data-verification-outcome]');
  if (outcome) return updateUsageStatus(outcome.dataset.logId, outcome.dataset.verificationOutcome, $('#verifiedBenefitSelect')?.value);
  const removeGallery = event.target.closest('[data-remove-gallery]');
  if (removeGallery) return removeGalleryImage(removeGallery.dataset.removeGallery, Number(removeGallery.dataset.galleryIndex));
});

document.addEventListener('change', event => {
  const exclusion = event.target.closest('[data-member-exclusion]');
  if (exclusion) {
    exclusion.checked ? editingMemberExclusions.add(exclusion.value) : editingMemberExclusions.delete(exclusion.value);
    renderMemberExclusions();
  }
  const usage = event.target.closest('[data-usage-status]');
  if (usage) updateUsageStatus(usage.dataset.usageStatus, usage.value);
  const personImage = event.target.closest('[data-person-image]');
  if (personImage) {
    const index = Number(personImage.dataset.personImage);
    readImageFile(personImage.files[0],'event-images','people').then(image => { if (editingEventPeople[index]) editingEventPeople[index].image = image; renderEventPeopleEditor(); }).catch(error => showToast(error.message));
  }
});

$('#loginForm').addEventListener('submit', async event => {
  event.preventDefault();
  await performLogin($('#loginEmail').value,$('#loginPassword').value);
});

$('#togglePassword').addEventListener('click', event => {
  const input = $('#loginPassword');
  input.type = input.type === 'password' ? 'text' : 'password';
  event.currentTarget.textContent = input.type === 'password' ? 'Show' : 'Hide';
});
$('#forgotPassword').addEventListener('click',async()=>{const email=$('#loginEmail').value.trim().toLowerCase();if(!email)return $('#loginError').textContent='Enter your email address first.';if(!backendEnabled())return showToast('Password reset requires the connected backend');try{await backend.requestPasswordReset(email);showToast('Password reset email sent')}catch(error){$('#loginError').textContent=error.message}});
$('#resetPasswordForm').addEventListener('submit',async event=>{event.preventDefault();const form=event.currentTarget,password=form.elements.password.value;if(password!==form.elements.confirmPassword.value)return $('#resetPasswordError').textContent='Passwords do not match.';if(!/[A-Za-z]/.test(password)||!/[0-9]/.test(password))return $('#resetPasswordError').textContent='Include at least one letter and one number.';try{await backend.updatePassword(password);$('#resetPasswordError').textContent='';showToast('Password updated');showAuthView('login')}catch(error){$('#resetPasswordError').textContent=error.message}});

$('#copyDemoPassword').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('demo123'); showToast('Demo password copied'); }
  catch (_) { showToast('Demo password: demo123'); }
});

$('#applicationBack').addEventListener('click', () => applicationStep > 1 ? (applicationStep--, showApplicationStep()) : showAuthView('welcome'));
$('#prevApplication').addEventListener('click', () => { applicationStep--; showApplicationStep(); });
$('#nextApplication').addEventListener('click', () => { if (!validateApplicationStep()) return; applicationStep++; showApplicationStep(); });
$('#applicationForm').addEventListener('submit', async event => { event.preventDefault(); await submitApplication(); });

$('#filterRow').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  activeFilter = button.dataset.filter;
  $$('#filterRow button').forEach(item => item.classList.toggle('active', item === button));
  renderBenefits();
});
$('#openSearch').addEventListener('click', () => { $('#searchWrap').classList.add('active'); $('#offerSearch').focus(); });
$('#closeSearch').addEventListener('click', () => { $('#offerSearch').value = ''; $('#searchWrap').classList.remove('active'); renderBenefits(); });
$('#offerSearch').addEventListener('input', renderBenefits);
$('#savedOnly').addEventListener('click', event => { savedOnly = !savedOnly; event.currentTarget.classList.toggle('active', savedOnly); renderBenefits(); });
$('#profileSaved').addEventListener('click', () => { savedOnly = true; $('#savedOnly').classList.add('active'); navigate('benefits'); });
$('#memberSettingsButton').addEventListener('click', openMemberSettings);
$('#memberAccountSettings').addEventListener('click', openMemberSettings);
$('#memberSettingsForm').addEventListener('submit', saveMemberSettings);
$('#eventManageRsvpForm').addEventListener('submit', saveManagedRsvp);
$('#eventManageRsvpForm').elements.guestRequested.addEventListener('change',event=>$('#guestRequestFields').classList.toggle('active',event.target.checked));
$('#cancelEventAttendance').addEventListener('click', cancelEventAttendance);
$('#eventEmailForm').addEventListener('submit', saveCalendarEmail);
$('#guestEventRegistrationForm').addEventListener('submit', submitGuestRegistration);
$('#switchAccount').addEventListener('click', () => signOut('demo'));
$('#logoutButton').addEventListener('click', () => signOut('login'));
$('#sheetClose').addEventListener('click', closeOffer);
$('#sheetBackdrop').addEventListener('click', closeOffer);
$('#saveOffer').addEventListener('click', () => activeOffer && toggleSave(activeOffer.id));
$('#claimOffer').addEventListener('click', () => { if (activeOffer) trackBenefitEvent(activeOffer.id, 'claim'); closeOffer(); showToast('Benefit unlocked — details sent'); tgHaptic('heavy'); });
$('#showQr').addEventListener('click', openQr);
$('#closeQr').addEventListener('click', closeQr);
$('#qrModal').addEventListener('click', event => { if (event.target.id === 'qrModal') closeQr(); });
$('#featureRail').addEventListener('scroll', event => {
  const rail = event.currentTarget;
  if (!rail.firstElementChild) return;
  const index = Math.round(rail.scrollLeft / (rail.firstElementChild.offsetWidth + 13));
  $$('#railDots i').forEach((dot, i) => dot.classList.toggle('active', i === index));
}, { passive:true });

$('#adminLogout').addEventListener('click', () => signOut('login'));
$('#adminMenu').addEventListener('click', () => $('.admin-sidebar').classList.toggle('open'));
$('#adminBenefitSearch').addEventListener('input', renderAdminBenefits);
$('#adminEventSearch').addEventListener('input', renderAdminEvents);
$('#adminEventStatus').addEventListener('change', renderAdminEvents);
$('#adminMemberSearch').addEventListener('input', renderAdminMembers);
$('#adminMemberFilter').addEventListener('change', renderAdminMembers);
$('#exportMembers').addEventListener('click', exportMembers);
$('#exportUsage').addEventListener('click', exportAllUsage);
$('#memberEditForm').addEventListener('submit', saveMemberEdit);
$('#memberEditForm').elements.role.addEventListener('change', () => { editingMemberExclusions = new Set([...editingMemberExclusions].filter(id => offers.some(offer => offer.id === id && offer.eligibility.includes($('#memberEditForm').elements.role.value)))); renderMemberExclusions(); });
$('#memberBenefitSearch').addEventListener('input', () => renderMemberExclusions());
$('#generateMemberPassword').addEventListener('click', () => { $('#memberEditForm').elements.password.value = generatePassword(); });
$('#benefitEditForm').addEventListener('submit', saveBenefitEdit);
$('#deleteBenefit').addEventListener('click', deleteCurrentBenefit);
$('#manageCategories').addEventListener('click', () => { renderCategoryEditor(); openAdminModal('categoryModal'); });
$('#addCategoryForm').addEventListener('submit', addCategory);
$('#createBenefitForm').addEventListener('input', updateBenefitPreview);
$('#createBenefitForm').addEventListener('change', () => { updateCreateVisualMode(); updateBenefitPreview(); });
$('#createBenefitForm').addEventListener('submit', createBenefit);
$('#cancelBenefit').addEventListener('click', () => adminNavigate('benefits'));
$('#createEventButton').addEventListener('click', () => openEventForm());
$('#adminEventForm').addEventListener('input', event => { updateEventPersonField(event.target); updateEventPreview(); if (['latitude','longitude','mapLabel','venue'].includes(event.target.name)) updateAdminEventMapPreview(); });
$('#adminEventForm').addEventListener('change', event => { updateEventPersonField(event.target); updateEventPreview(); if (['latitude','longitude','mapLabel','venue'].includes(event.target.name)) updateAdminEventMapPreview(); });
$('#adminEventForm').addEventListener('submit', saveEvent);
$('#cancelEvent').addEventListener('click', () => adminNavigate('events'));
$('#deleteEvent').addEventListener('click', deleteCurrentEvent);
$('#eventCoverImage').addEventListener('change', async event => {
  try { pendingEventImage = await readImageFile(event.target.files[0],'event-images','covers'); $('#eventFormError').textContent = ''; $('#eventImageName').textContent = event.target.files[0]?.name || 'Cover image selected'; updateEventPreview(); }
  catch (error) { pendingEventImage = null; event.target.value = ''; $('#eventFormError').textContent = error.message; }
});
$('#createPartnerToggle').addEventListener('change', event => { $('#partnerCreateFields').classList.toggle('hidden', !event.target.checked); updateBenefitPreview(); });
$('#generatePartnerPassword').addEventListener('click', () => { $('#createBenefitForm').elements.partnerPassword.value = generatePassword(); updateBenefitPreview(); });
$('#createBenefitImage').addEventListener('change', async event => {
  try { pendingCreateImage = await readImageFile(event.target.files[0],'benefit-images','covers'); $('#createImageError').textContent = ''; $('#createImageName').textContent = event.target.files[0]?.name || '1200 × 750 recommended'; updateBenefitPreview(); }
  catch (error) { pendingCreateImage = null; event.target.value = ''; $('#createImageError').textContent = error.message; }
});
$('#editBenefitImage').addEventListener('change', async event => {
  try { pendingEditImage = await readImageFile(event.target.files[0],'benefit-images','covers'); $('#editBenefitError').textContent = ''; }
  catch (error) { pendingEditImage = null; event.target.value = ''; $('#editBenefitError').textContent = error.message; }
});
$('#createBenefitGallery').addEventListener('change', async event => { await addGalleryFiles('create', event.target.files); event.target.value = ''; });
$('#editBenefitGallery').addEventListener('change', async event => { await addGalleryFiles('edit', event.target.files); event.target.value = ''; });

$('#adminProfileForm').addEventListener('submit', event => { event.preventDefault(); saveSettingsSection('profile', formValues(event.currentTarget)); });
$('#adminNotificationsForm').addEventListener('submit', event => { event.preventDefault(); saveSettingsSection('notifications', formValues(event.currentTarget)); });
$('#communitySettingsForm').addEventListener('submit', event => { event.preventDefault(); saveSettingsSection('community', formValues(event.currentTarget)); });
$('#adminSecurityForm').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const current = localStorage.getItem('foundry-admin-password') || 'demo123';
  const next = form.elements.newPassword.value;
  if (!backendEnabled() && form.elements.currentPassword.value !== current) { $('#securityError').textContent = 'Current password is incorrect.'; return; }
  if (next !== form.elements.confirmPassword.value) { $('#securityError').textContent = 'New passwords do not match.'; return; }
  if (!/[A-Za-z]/.test(next) || !/\d/.test(next)) { $('#securityError').textContent = 'Use at least one letter and one number.'; return; }
  if(!backendEnabled())localStorage.setItem('foundry-admin-password', next);
  const settings = JSON.parse(localStorage.getItem('foundry-admin-settings') || '{}');
  settings.security = { twoFactor:form.elements.twoFactor.checked, sessionTimeout:form.elements.sessionTimeout.value };
  localStorage.setItem('foundry-admin-settings', JSON.stringify(settings));
  try{if(backendEnabled())await backend.updatePassword(next);await syncBackend('settings',settings);}
  catch(error){$('#securityError').textContent=error.message||'Security settings could not be updated.';return;}
  form.elements.currentPassword.value = ''; form.elements.newPassword.value = ''; form.elements.confirmPassword.value = '';
  $('#securityError').textContent = '';
  showToast('Password and security updated');
});
$('#signOutOtherSessions').addEventListener('click', () => showToast('Other admin sessions signed out'));

$('#partnerLogout').addEventListener('click', () => signOut('login'));
$('#partnerMenu').addEventListener('click', () => $('.partner-sidebar').classList.toggle('open'));
$('#startPartnerScan').addEventListener('click', startPartnerScanner);
$('#closePartnerScanner').addEventListener('click', closePartnerScanner);
$('#partnerScannerModal').addEventListener('click', event => { if (event.target.id === 'partnerScannerModal') closePartnerScanner(); });
$('#verifyManualCode').addEventListener('click', () => verifyPartnerCode($('#partnerManualCode').value));
$('#partnerAccountForm').addEventListener('submit', savePartnerAccount);
$('#exportPartnerUsage').addEventListener('click', exportCurrentPartnerUsage);

$$('.admin-modal').forEach(modal => modal.addEventListener('click', event => { if (event.target === modal) closeAdminModal(modal.id); }));

setupTelegram();
renderDemoAccounts();
if(backendEnabled())$$('[data-auth-go="demo"]').forEach(button=>button.classList.add('hidden'));
window.addEventListener('focus',refreshRemoteData);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshRemoteData()});setInterval(refreshRemoteData,60000);
const previousSession = sessionStorage.getItem('foundry-session');
const sessionPartner = loadPartners().find(account => account.email === previousSession);
const sessionMember = getMemberByEmail(previousSession || '');
const previousAccount = demoAccounts.find(account => account.role === 'admin' && account.email === previousSession) || (sessionPartner ? {...sessionPartner,role:'partner',name:sessionPartner.company} : null) || (sessionMember ? {...demoAccounts.find(account => account.id === sessionMember.id),...sessionMember,role:sessionMember.role} : null);
const sharedRegistrationEvent = new URLSearchParams(location.search).get('register');
if (backend?.recoverySession) showAuthView('reset-password');
else if (sharedRegistrationEvent) openGuestRegistration(sharedRegistrationEvent);
else if (backendEnabled() && backend.hasSession()) backend.restore().then(account=>{if(account){offers=loadOffers();signIn(account)}});
else if (previousAccount) signIn(previousAccount);
