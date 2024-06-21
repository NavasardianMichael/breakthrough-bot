import { MOBILE_WIDTH_BREAKPOINT } from 'helpers/constants/app'

export const getIsMobileWidth = () => {
    return window.innerWidth <= MOBILE_WIDTH_BREAKPOINT
}