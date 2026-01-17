// Utility to manage Emergency SOS alerts using localStorage for demo purposes
const EMERGENCY_STORAGE_KEY = 'utsav_emergency_alerts';

export const getEmergencyAlerts = () => {
    const alerts = localStorage.getItem(EMERGENCY_STORAGE_KEY);
    return alerts ? JSON.parse(alerts) : [];
};

export const saveEmergencyAlert = (alertData) => {
    const alerts = getEmergencyAlerts();
    const newAlert = {
        id: `sos-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'active',
        ...alertData
    };
    alerts.unshift(newAlert);
    localStorage.setItem(EMERGENCY_STORAGE_KEY, JSON.stringify(alerts));
    return newAlert;
};

export const clearEmergencyAlerts = () => {
    localStorage.removeItem(EMERGENCY_STORAGE_KEY);
};

export const respondToAlert = (alertId, vendorData) => {
    const alerts = getEmergencyAlerts();
    const updatedAlerts = alerts.map(alert => {
        if (alert.id === alertId) {
            return { ...alert, status: 'responded', responder: vendorData };
        }
        return alert;
    });
    localStorage.setItem(EMERGENCY_STORAGE_KEY, JSON.stringify(updatedAlerts));
};
