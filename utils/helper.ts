const toTimeString = (secNum: number) => {
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - hours * 3600) / 60);

  return `
  ${hours > 0 ? `${hours}Stunden und` : ''}${
    minutes > 0 ? `${minutes}Minuten` : '1 Minute'
  }`;
};

export { toTimeString };
