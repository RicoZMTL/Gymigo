import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "login") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "logout") {
    return { ...state, loggedIn: false };
  }
  if (action.type === "complete") {
    return { ...state, profileComplete: true };
  }
  if (action.type === "nameFormComplete") {
    return {
      ...state,
      nameFormComplete: true,
      firstName: action.profileNamePayload.firstName,
      lastName: action.profileNamePayload.lastName
    };
  }
  if (action.type === "scheduleFormComplete") {
    return {
      ...state,
      scheduleFormComplete: true,
      availabilitiesSchedule: action.profileSchedulePayload.availabilities
    };
  }
  if (action.type === "timeFormComplete") {
    return {
      ...state,
      timeFormComplete: true,
      availabilitiesTime: action.profileTimePayload
    };
  }
  if (action.type === "goalsFormComplete") {
    return {
      ...state,
      goalsFormComplete: true,
      profileGoals: action.profileGoalsPayload
    };
  }
  if (action.type === "experienceFormComplete") {
    return {
      ...state,
      experienceFormComplete: true,
      profileExp: action.profileExpPayload
    };
  }
  return state;
};

const store = createStore(
  reducer,
  {
    loggedIn: false,
    nameFormComplete: undefined,
    firstName: "",
    lastName: "",
    scheduleFormComplete: undefined,
    availabilitiesSchedule: undefined,
    timeFormComplete: undefined,
    availabilitiesTime: undefined,
    goalsFormComplete: undefined,
    profileGoals: undefined,
    profileExp: undefined,
    experienceFormComplete: undefined,
    profileComplete: undefined
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
