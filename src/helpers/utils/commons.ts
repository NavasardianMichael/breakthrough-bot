export const combineClassNames = (
  ...classNames: ReadonlyArray<string | undefined | boolean>
) => {
  return classNames.filter((className) => !!className).join(" ");
};

export const copyToClipboard = (newClip: string) => {
  navigator.clipboard.writeText(newClip)
}

export const generateRandomId = (prefix?: string) => {
  return `${prefix ? `${prefix}-` : ''}temp-id-${Math.round(Math.random() * 100_000)}`
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));