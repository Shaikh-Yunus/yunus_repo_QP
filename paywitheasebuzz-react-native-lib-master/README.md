# paywitheasebuzz-react-native-lib

## For More description of iOS and Android setup refer below link

https://github.com/easebuzz/paywitheasebuzz-react-native-lib/blob/master/paywitheasebuzz-react-native-lib/documentation.pdf


## React Native Integration Code (Java Script):

1.0 Write below JavaScript Code to Start Payment using Easebuzz Payment Gateway


1.1 Import following components 
 ```
import {Platform, Button, NativeModules,NativeEventEmitter} from 'react-native';
 ```

1.2 Import EasebuzzCheckout module to your component:
  ```
     import EasebuzzCheckout from 'react-native-easebuzz-kit';
 ```

1.3 Write below code in Call Payment Menthod.

Call EasebuzzCheckout.open method with the payment request parameters as options. This method returns a JS Promise where then part corresponds to a successful payment response or failure response and the catch part corresponds to any sdk failure i.e event failed etc.


 ```
const callPaymentGateway  = () => {
  var options = {
    access_key: "Access key",
    pay_mode: "This can be “test” or “production"
  }

  EasebuzzCheckout.open(options).then((data) => {
    //handle the payment success & failed response here
    console.log("Payment Response:") 
    console.log(data);
  }).catch((error) => {
    //handle sdk failure issue here
    console.log("SDK Error:")
    console.log(error);
  });
}

 ```
## For More description of request and Response refer below link.

https://docs.easebuzz.in/mobile-integration-react-native/handle-response

## For More description of Android and iOS setup refer below link.

https://docs.easebuzz.in/mobile-integration-react-native
