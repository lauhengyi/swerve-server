const formatProperties = (properties: string): string => {
  return properties
    .split(',')
    .map((property) => property.trim())
    .join(' ');
};

export default formatProperties;
