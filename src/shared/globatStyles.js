import Constants from "./Constants"
const globatStyles = {
    wrapper: {
        flex: 1,
    },
    logo: {
        width: 100,
        height: 100,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#1B3F24',
        opacity: 0.59,
    },
    button: {
        backgroundColor: Constants.colors.primaryColor,
        padding: 14,
        width: '100%',
        borderRadius: Constants.borderRadius,
        marginTop: 35,
    },
    btnText: {
        color: Constants.colors.whiteColor,
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
    inputText: {
        backgroundColor: Constants.colors.inputBgColor,
        padding: 11,
        borderRadius: 5,
        fontFamily: Constants.fontFamily,
        marginBottom: Constants.margin,
    },
    errorText : {
        color: 'red',
        marginBottom:5
    },
    dropDownBox: {
        width: '100%',
        backgroundColor: Constants.colors.inputBgColor,
        borderRadius: 5,
        marginBottom: Constants.margin,
    },
    dropdownTextStyle: {
        fontFamily: Constants.fontFamily,
        color: '#000000',
        opacity: 0.36,
        fontSize: 15,
        textAlign: 'left',
    },
    dropDownListStyle: {
        fontFamily: Constants.fontFamily,
    },
    noData: {
        minHeight: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#979797',
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    inputLabel: {
        fontFamily: Constants.fontFamily,
        marginTop: 10
    },
    followBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Constants.colors.whiteColor,
        borderRadius: 4,
        padding: 4,
        paddingLeft: Constants.padding,
        paddingRight: Constants.padding,
    },
    followBtnText: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.whiteColor,
    },
    btnAddAddress: {
        padding: 8,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: Constants.colors.primaryColor,
        borderRadius: Constants.borderRadius,
        marginTop: 12,
        marginBottom: 12,
    },
    btnTextAddress: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        fontSize: 20,
    },
    btnOutline: {
        padding: 14,
        width: '100%',
        borderRadius: Constants.borderRadius,
        marginTop: 35,
        borderWidth: 1,
        borderColor: Constants.colors.primaryColor,
    },
    btnOutlineText: {
        fontFamily: Constants.fontFamily,
        alignSelf: 'center',
        color: Constants.colors.primaryColor,
        textTransform: 'uppercase',
    },
}
export default globatStyles