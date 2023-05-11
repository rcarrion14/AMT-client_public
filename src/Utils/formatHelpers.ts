import { BigNumber, ethers } from "ethers";

export function toFrontEndString(
  value: BigNumber,
  precision: number = 5
): string {
  const formatted = ethers.utils.formatEther(value);
  return parseFloat(formatted).toFixed(precision);
}
