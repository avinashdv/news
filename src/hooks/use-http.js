const useHttp = () => {
  const sendRequest = async (incomingData, storeData) => {
    try {
      const url = `${incomingData.url}?q=${incomingData.sources}&apiKey=0b44854c142e438aa8eae67feafb5e53`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const result = await response.json();
      storeData(result);
    } catch (err) {
      return {
        error: err.message,
      };
    }
  };

  return {
    sendRequest,
  };
};

export default useHttp;
