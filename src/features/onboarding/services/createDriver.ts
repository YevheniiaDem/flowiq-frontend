import { driver, type Config, type Driver } from "driver.js";
import "driver.js/dist/driver.css";

const FLOWIQ_DRIVER_CLASS = "flowiq-driver";

export function createFlowiqDriver(config: Config): Driver {
  return driver({
    animate: true,
    overlayColor: "#000",
    overlayOpacity: 0.65,
    smoothScroll: true,
    allowClose: true,
    allowKeyboardControl: true,
    stagePadding: 8,
    stageRadius: 12,
    popoverClass: FLOWIQ_DRIVER_CLASS,
    showProgress: true,
    showButtons: ["previous", "next", "close"],
  ...config,
  });
}
