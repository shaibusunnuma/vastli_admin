// import { captureException, captureMessage } from "@sentry/react-native";
import { ENVIRONMENT } from "@/constants";

function error(error: any, ...optionalParams: any[]) {
  ENVIRONMENT === "development" && console.log(error, ...optionalParams);
}

function message(message?: any, ...optionalParams: any[]) {
  ENVIRONMENT === "development" && console.log(message, ...optionalParams);
}

export default {
  error,
  message,
};
