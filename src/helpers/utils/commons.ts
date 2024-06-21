export const combineClassNames = (
  ...classNames: ReadonlyArray<string | undefined | boolean>
) => {
  return classNames.filter((className) => !!className).join(" ");
};

export const copyToClipboard = (newClip: string) => {
  navigator.clipboard.writeText(newClip)
}