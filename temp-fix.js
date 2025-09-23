// Updated handleInputChange function
const handleInputChange = (e) => {
  const { name, value } = e.target;
  
  // If it's the car registration field, normalize it in real-time
  if (name === 'carRegistration') {
    const normalizedValue = normalizeRegistration(value);
    setFormData(prev => ({
      ...prev,
      [name]: normalizedValue
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};

