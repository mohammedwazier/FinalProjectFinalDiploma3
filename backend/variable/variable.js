const dataRegis = {
  _id: "",
  username: "",
  email: "",
  password: "",
  statusRegis: false,
  ssid: "",
  pwd: "",
  statusReset: 0,
  createdAt: (new Date()),
  updatedAt: (new Date())
};

const dataMonitoring = {
  _id: "",
  username: "",
  suhu: "",
  airQuality: "",
  humidity: "",
  lvlPakan: "",
  lvlMinum: "",
  status: "calibrate",
  updatedAt: (new Date())
};

const statusMonitoring = {
  _id: "",
  username: "",
  startDate: "",
  endDate: "",
  startHour:"",
  endHour:"",
  // pakan: {
  //   lvlMin: "",
  //   lvlMax: "",
  //   status: "",
  //   filling: false
  // },
  // minum: {
  //   lvlMin: "",
  //   lvlMax: "",
  //   status: "",
  //   filling: false
  // },
  statusMonitoringNow: "", //1 min(60), 10 min(60000), 30 min(1800), 1 hour(3600)
  updatedAt: (new Date())
};

const dataSession = {
  _id: "",
  username: "",
  token: "",
  expireAt: ""
};

module.exports = {
  dataRegis,
  dataMonitoring,
  statusMonitoring,
  dataSession
};
