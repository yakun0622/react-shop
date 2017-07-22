export const parseArgs = ( param ) => {
    switch ( param.trim() ) {
        case 'start':
            return 'flex-start'
        case 'end':
            return 'flex-end'
        case 'between':
            return 'space-between'
        default:
            return param
            break
    }
}