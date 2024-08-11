const objectToFormData = (obj) => {
  const formData = new FormData();

  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
};
export default objectToFormData;
