export const getIncidents = () => JSON.parse(localStorage.getItem("incidents")) || [];

export const saveIncidents = (data) => {
  localStorage.setItem("incidents", JSON.stringify(data));
};

export const addIncident = (incident) => {
  const incidents = getIncidents();
  incidents.push(incident);
  saveIncidents(incidents);
};

export const updateIncident = (updated) => {
  const incidents = getIncidents().map(i => i.id === updated.id ? updated : i);
  saveIncidents(incidents);
};

export const deleteIncident = (id) => {
  const incidents = getIncidents().filter(i => i.id !== id);
  saveIncidents(incidents);
};
