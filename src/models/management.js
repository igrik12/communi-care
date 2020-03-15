import { action, computed, thunk } from 'easy-peasy';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listCompanys, listStaffs } from '../graphql/queries';
import { createCompany, createStaff, createClient } from '../graphql/mutations';

const managementModel = {
  editModeOn: false,
  setEditModeOn: action((state, payload) => {
    state.editModeOn = payload;
  }),
  editType: 'new',
  setEditType: action((state, payload) => {
    state.editType = payload;
  }),
  data: computed(state => {
    const company = state.company;
    const staff = state.staff;
    const clients = state.clients;
    const completeData = { company, staff, clients };
    return completeData;
  }),
  company: { name: '', companyLogoUrl: '' },
  setCompany: action((state, payload) => {
    state.company = payload;
  }),
  companies: [],
  addCompany: action((state, payload) => {
    state.companies.push(payload);
  }),
  setCompanies: action((state, payload) => {
    state.companies = payload;
  }),
  getCompanies: thunk(async actions => {
    const ret = await API.graphql(graphqlOperation(listCompanys));
    actions.setCompanies(ret.data.listCompanys.items);
  }),
  staff: [],
  setStaff: action((state, payload) => {
    state.staff = payload;
  }),
  addStaff: action((state, payload) => {
    if (state.staff.some(s => s.username === payload.username)) return;
    state.staff.push(payload);
  }),
  clients: [],
  setClients: action((state, payload) => {
    state.clients = payload;
  }),
  addClient: action((state, payload) => {
    if (state.clients.some(client => client.name === payload.name)) return;
    state.clients.push(payload);
  }),
  formData: computed(state => {
    const company = state.company;
    const clients = state.clients;
    const staff = state.staff;
    return { company, clients, staff };
  }),
  submitFormData: thunk(async (actions, payload, { getState }) => {
    // 1. Check if company exist
    const { company, clients, staff } = getState().formData;
    let newCompany = companyExists(company, getState().companies);
    if (!newCompany) {
      newCompany = await createNewCompany(company);
      if (newCompany) {
        actions.addCompany(company);
      }
    }

    if (!newCompany) alert(`Failed to create company ${newCompany.name}. Check console for error`);

    const companyId = newCompany.id;

    // 2. Create every Staff with Company ID

    const staffIds = staff.forEach(await createNewStaff(companyId));
    // // 3. Create every client
    const clientIds = clients.forEach(await createNewClient(companyId));
    // // 4. Udpdate company ???
    // updateCompany(companyId, staffIds, clientIds);
  })
};

// Check if company with name X exists
const companyExists = (company, allCompanies) => {
  if (!allCompanies.length) return undefined;
  return allCompanies.find(comp => comp.name === company.name);
};

// Create new company
const createNewCompany = async company => {
  const { name, companyLogoUrl } = company;
  try {
    const details = { input: { name, companyLogoUrl } };
    const result = await API.graphql(graphqlOperation(createCompany, details));
    return result.data.createCompany;
  } catch (error) {
    console.error(`Failed to create company ${name}`);
    console.error(`Error: ${error}`);
    return undefined;
  }
};

const createNewStaff = companyId => async staff => {
  const { username, userType, permissions, password, email, phone_number } = staff;
  try {
    const details = {
      input: { username, userType, staffCompanyId: companyId, permissions: permissions.map(perm => perm.value) }
    };
    const result = await API.graphql(graphqlOperation(createStaff, details));
    const success = await Auth.signUp({ username, password, attributes: { email, phone_number } });
    return result.data.createStaff.id;
  } catch (error) {
    console.error(`Failed to create staff. Error: ${error}`);
    return undefined;
  }
};

const createNewClient = companyId => async client => {
  const { name } = client;
  try {
    const details = { input: { name, staffCompanyId: companyId } };
    const result = await API.graphql(graphqlOperation(createClient, details));
    return result.data.createClient.id;
  } catch (error) {
    console.error(`Failed to create client. Error: ${error}`);
    return undefined;
  }
};

// const validatePhoneNumber = phoneNumber => {
//   if(phoneNumber.charAt(0) !== /d\+1/){
//     phoneNumber.replace()
//   }
// };

export default managementModel;
