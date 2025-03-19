import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { validateAlphaNumeric, validatePhone } from "./helper";

const useForm = <A extends object>(initial: A) => {
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState<
    Partial<Record<keyof A, string | string[]>>
  >({});
  const [changed, setChanged] = useState(false);
  const touchMap = useMemo(
    () =>
      Object.keys(initial).reduce(
        (acc, el) => ({ ...acc, [el]: false }),
        {} as { [key in keyof A]: boolean }
      ),
    [initial]
  );
  const [touched, setTouched] = useState(touchMap);

  // Use a local state for immediate UI updates
  const [localInputs, setLocalInputs] = useState(initial);

  const handleTouch = useCallback((touch: keyof A) => {
    setTouched((prev) => ({
      ...prev,
      [touch]: true,
    }));
  }, []);

  // Debounced state update
  const debouncedSetInputs = useDebouncedCallback((newInputs) => {
    setInputs(newInputs);
  }, 100);

  const handleChange = useCallback(
    <N extends keyof A, V extends A[N]>(name: N, customValue?: V) =>
      (e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>) => {
        const value = e?.target.value;
        let newValue = customValue ?? value;
        handleTouch(name);

        const numAsStr = e?.target.getAttribute("data-number-string");
        const num = e?.target.getAttribute("data-number");
        const isDate = e?.target.getAttribute("data-date");

        const condition_1 =
          numAsStr === "alphanumeric" && !validateAlphaNumeric(value);
        const condition_2 = numAsStr === "phone" && !validatePhone(value);
        const condition_3 = (num || numAsStr === true) && isNaN(+value);

        if (condition_1 || condition_2 || condition_3) return;

        if (num) newValue = +value;
        if (isDate) newValue = new Date(value);

        setErrors((prev) => ({ ...prev, [name]: undefined }));
        setChanged(true);

        // Update local state immediately for responsiveness
        setLocalInputs((prev) => ({
          ...prev,
          [name]: newValue,
        }));

        // Debounce the actual state update
        debouncedSetInputs({
          ...inputs,
          [name]: newValue,
        });
      },
    [handleTouch, inputs, debouncedSetInputs]
  );

  const setValue = useCallback(
    <A extends keyof typeof inputs, B extends (typeof inputs)[A]>(
      key: A,
      value: B | ((prevState: B) => B)
    ) => {
      setChanged(true);
      setErrors((prev) => ({ ...prev, [key]: undefined }));

      let newValue: B;
      if (typeof value === "function") {
        newValue = (value as (prevState: B) => B)(inputs[key] as B);
      } else {
        newValue = value;
      }

      // Update local state immediately
      setLocalInputs((prev) => ({
        ...prev,
        [key]: newValue,
      }));

      // Debounce the actual state update
      debouncedSetInputs({
        ...inputs,
        [key]: newValue,
      });
    },
    [inputs, debouncedSetInputs]
  );

  return {
    touched,
    inputs: localInputs, // Return local inputs for UI rendering
    actualInputs: inputs, // Keep the actual inputs for form submission
    setInputs,
    handleTouch,
    setTouched,
    setValue,
    handleChange,
    errors,
    setErrors,
    changed,
    setChanged,
  };
};

export default useForm;
