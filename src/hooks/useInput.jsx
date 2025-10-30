import { useState } from 'react';

function useInput(defaultValue = '') {
  // 1. Buat state untuk menyimpan nilai input
  const [value, setValue] = useState(defaultValue);

  // 2. Buat fungsi handler yang akan memperbarui state
  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  // 3. Kembalikan nilai dan fungsi handler
  return [value, onValueChangeHandler];
}

export default useInput;