import {
  ON_DELETE_CLIENT,
  ON_DELETE_COMPANY,
  ON_DELETE_STAFF,
  ON_CREATE_CLIENT,
  ON_CREATE_COMPANY,
  ON_CREATE_STAFF,
  ON_DELETE_RESIDENCE,
  ON_CREATE_RESIDENCE,
  ON_UPDATE_CLIENT,
  ON_UPDATE_STAFF,
  ON_UPDATE_COMPANY,
  ON_UPDATE_RESIDENCE,
} from 'utils/constants';

export const subscriptions = (actions) => [
  {
    type: ON_DELETE_CLIENT,
    action: (clientData) => actions.removeClient(clientData.value.data.onDeleteClient.id),
  },
  {
    type: ON_DELETE_COMPANY,
    action: (companyData) => actions.removeCompany(companyData.value.data.onDeleteCompany.id),
  },
  {
    type: ON_DELETE_RESIDENCE,
    action: (residenceData) => actions.removeResidence(residenceData.value.data.onDeleteResidence.id),
  },
  {
    type: ON_DELETE_STAFF,
    action: (staffData) => actions.removeStaff(staffData.value.data.onDeleteStaff.id),
  },
  {
    type: ON_CREATE_CLIENT,
    action: (clientData) => actions.addClient(clientData.value.data.onCreateClient),
  },
  {
    type: ON_CREATE_STAFF,
    action: (staffData) => actions.addStaff(staffData.value.data.onCreateStaff),
  },
  {
    type: ON_CREATE_COMPANY,
    action: (companyData) => actions.addCompany(companyData.value.data.onCreateCompany),
  },
  {
    type: ON_CREATE_RESIDENCE,
    action: (residenceData) => actions.addResidence(residenceData.value.data.onCreateResidence),
  },
  {
    type: ON_UPDATE_CLIENT,
    action: (clientData) => actions.updateClient(clientData.value.data.onUpdateClient),
  },
  {
    type: ON_UPDATE_STAFF,
    action: (staffData) => actions.updateStaff(staffData.value.data.onUpdateStaff),
  },
  {
    type: ON_UPDATE_COMPANY,
    action: (companyData) => actions.updateStaff(companyData.value.data.onUpdateCompany),
  },
  {
    type: ON_UPDATE_RESIDENCE,
    action: (residenceData) => actions.updateStaff(residenceData.value.data.onUpdateResidence),
  },
];
