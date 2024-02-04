export function isEmail(value: string) {
  return value.includes("@");
}
export function hasMinLength(value: string) {
  return value.length >= 8;
}
export function isEqualsToOtherValue(value: string, otherValue: string) {
  return value === otherValue;
}
