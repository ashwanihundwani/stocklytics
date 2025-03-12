  const handleBackSpace = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index]) {
      inputReferences.current[index]?.focus();
      otp.pop();
    } else if (e.nativeEvent.key === 'Backspace' && index > 0 && !otp[index]) {
      if (otp[otp.length - 1] === '') {
        otp.pop();
      }
      otp.pop();
      inputReferences.current[index - 1]?.focus();
    }
  };
