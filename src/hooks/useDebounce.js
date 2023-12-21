import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Definir um timeout para atualizar o valor debounced após o delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpar o timeout caso o valor mude ou o componente seja desmontado
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Somente re-executar se o valor ou delay mudar

  return debouncedValue;
};

export default useDebounce;
