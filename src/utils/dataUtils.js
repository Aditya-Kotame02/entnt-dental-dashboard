export const getDashboardData = () => {
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const incidents = JSON.parse(localStorage.getItem("incidents")) || [];

  const upcomingAppointments = [...incidents]
    .filter(i => new Date(i.appointmentDate) >= new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const completedTreatments = incidents.filter(i => i.status === "Completed");
  const pendingTreatments = incidents.filter(i => i.status !== "Completed");

  const revenue = completedTreatments.reduce((sum, treatment) => {
    const cost = typeof treatment?.cost === 'number' && !isNaN(treatment.cost) ? treatment.cost : 0; 
    return sum + cost;}, 0);

  return {
    totalPatients: patients.length,
    upcomingAppointments,
    completedCount: completedTreatments.length,
    pendingCount: pendingTreatments.length,
    revenue,
  };
};
