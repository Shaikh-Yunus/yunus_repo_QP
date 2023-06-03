import { Dimensions } from "react-native"
const Constants = {
    APP_NAME: 'Quarterpillars',
    BASE_URL:'http://qp.flymingotech.in/quarterpillars_backend/public/api/v1/',
    BASE_IMAGE_URL:'http://qp.flymingotech.in/quarterpillars_backend/public/',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    colors: {
        primaryColor: '#00A928',
        bodyBg: '#E5E5E5',
        inputBgColor: '#F5FFFA',
        textColor: '#000000',
        whiteColor: '#FFFFFF',
    },
    fontFamily: 'Avenir-Light',
    borderRadius: 10,
    padding: 18,
    margin: 18,
}
export default Constants