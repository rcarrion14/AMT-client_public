import { ethers } from "ethers";
export function formatter(value: ethers.BigNumber) {
  const limitUp = parseFloat("99999999999999999999");
  const limitDown = parseFloat("0.000001");
  const auxNumb = parseFloat(ethers.utils.formatEther(value));
  if (auxNumb > limitUp) return limitUp;
  if (auxNumb < limitDown) return 0;
  return auxNumb;
}
