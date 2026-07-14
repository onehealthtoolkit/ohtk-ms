export const listToLines = (items?: string[]) => (items || []).join("\n");

export const linesToList = (value: string) =>
  value
    .split("\n")
    .map(item => item.trim())
    .filter(Boolean);

export const jsonToText = (value?: Record<string, unknown>) =>
  JSON.stringify(value || {}, null, 2);

export const parseJsonObject = (field: string, value: string) => {
  if (!value.trim()) {
    return { value: {} };
  }
  try {
    const parsed = JSON.parse(value);
    if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
      return { error: `${field} must be a JSON object` };
    }
    return { value: parsed };
  } catch (_) {
    return { error: `${field} must be valid JSON` };
  }
};

export const optionLabel = (
  code: string | undefined,
  options: { code: string; label: string }[]
) => options.find(option => option.code === code)?.label || code || "";
