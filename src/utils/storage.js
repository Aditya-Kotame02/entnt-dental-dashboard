export const getPatients = () => JSON.parse(localStorage.getItem("patients")) || [];

export const savePatients = (data) => {
  localStorage.setItem("patients", JSON.stringify(data));
};

export const addPatient = (patient) => {
  const patients = getPatients();
  patients.push(patient);
  savePatients(patients);
};

export const updatePatient = (updated) => {
  const patients = getPatients().map(p =>
    p.id === updated.id ? updated : p
  );
  savePatients(patients);
};

export const deletePatient = (id) => {
  const patients = getPatients().filter(p => p.id !== id);
  savePatients(patients);
};
