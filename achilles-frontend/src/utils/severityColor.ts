export const criticalSeverityColor = 'rgb(155,37,116)';
export const highSeverityColor = 'rgb(235, 26, 33)';
export const moderateSeverityColor = 'rgb(240, 178, 84)';
export const lowSeverityColor = 'rgb(100,100,255)';

export const safetyColor = 'rgb(34,139,34)';

export const severityColor = (severity?: string | null): string => {
  if (!severity || typeof severity !== 'string') {
    return 'rgb(128, 128, 128, 0.5)';
  }

  const severityCase = severity.toLowerCase().trim();

  if (severityCase === 'critical') return criticalSeverityColor;
  if (severityCase === 'high') return highSeverityColor;
  if (severityCase === 'low') return lowSeverityColor;
  if (severityCase === 'moderate') return moderateSeverityColor;

  return 'rgb(128, 128, 128, 0.5)';
};
