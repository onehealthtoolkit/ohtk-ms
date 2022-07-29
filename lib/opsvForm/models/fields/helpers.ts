type ContextType = {
  value: any;
  required?: boolean;
};

export function valueIsUndefinedAndNotRequiredGuard(
  context: ContextType,
  validateFunction: () => boolean
) {
  return () => {
    // if is not required and value is undefined then validateFunction should not be apply.

    if (context.value == undefined && !context.required) {
      return true;
    }
    return validateFunction();
  };
}
