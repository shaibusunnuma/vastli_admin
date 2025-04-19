// import { captureException, captureMessage } from "@sentry/react-native";
import { ENVIRONMENT } from "@/constants";

function error(error: any, ...optionalParams: any[]) {
  ENVIRONMENT === "development" && console.log(error, ...optionalParams);
}

function message(message?: any, ...optionalParams: any[]) {
  ENVIRONMENT === "development" && console.log(message, ...optionalParams);
}

const logger = {
  error,
  message,
};

export default logger;
