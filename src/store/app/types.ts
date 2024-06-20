
export type AppSlice = {
  isNavbarOpened: boolean
}

export type AppActionPayloads = {
  setAppOptions: Partial<AppSlice>
  setIsNavbarOpened: AppSlice['isNavbarOpened']
}
