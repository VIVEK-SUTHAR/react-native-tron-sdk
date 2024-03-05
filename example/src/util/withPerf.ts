function withPerf(func: () => unknown) {
  const start = performance.now();
  const result = func();
  const end = performance.now();
  const executionTime = end - start;
  console.log(`Execution Time in ${executionTime} milliseconds.`);

  return result;
}

export default withPerf;

function displaySubstring(inputString: unknown) {
  if (typeof inputString !== 'string') {
    throw new Error('Input must be a string');
  }

  if (inputString.length < 3) {
    throw new Error('String length must be at least 3 characters');
  }

  const firstThree = inputString.slice(0, 3);
  const lastThree = inputString.slice(-3);

  return `${firstThree}...${lastThree}`;
}
export { displaySubstring };
