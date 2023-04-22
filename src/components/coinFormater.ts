import { ethers } from "ethers";
export function format(value: string | null | undefined) {
  const cifras = 4; // Cambiar a conveniencia o poner como param?
  try {
    if (value) {
      const formated = ethers.utils.formatEther(value);
      const toCorrectCiphers = parseFloat(formated).toFixed(cifras);
      return toCorrectCiphers.toString();
    }
    return "0";
  } catch {
    return "0";
  }
}

export function formatAllowances(value: string | null | undefined) {
  if (value) {
    try {
      if (parseFloat(value) > parseFloat("999999999999999999")) {
        return "999999999999999999";
      } else return format(value);
    } catch {
      return "0";
    }
  } else {
    return "0";
  }
}
