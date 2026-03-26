import ReactGA from 'react-ga4';

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics Measurement ID is missing or invalid. Check your .env file.');
    return;
  }
  ReactGA.initialize(measurementId);
};

export const logPageView = (path: string, title?: string) => {
  ReactGA.send({ hitType: "pageview", page: path, title });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
