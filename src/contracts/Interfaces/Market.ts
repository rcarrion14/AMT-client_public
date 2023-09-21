/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
    BaseContract,
    BigNumber,
    BigNumberish,
    BytesLike,
    CallOverrides,
    ContractTransaction,
    Overrides,
    PopulatedTransaction,
    Signer,
    utils,
  } from "ethers";
  import type {
    FunctionFragment,
    Result,
    EventFragment,
  } from "@ethersproject/abi";
  import type { Listener, Provider } from "@ethersproject/providers";
  import type {
    TypedEventFilter,
    TypedEvent,
    TypedListener,
    OnEvent,
    PromiseOrValue,
  } from "./common";
  
  export interface MarketInterface extends utils.Interface {
    functions: {
      "addrBtcb()": FunctionFragment;
      "addrUsdt()": FunctionFragment;
      "buy(uint256)": FunctionFragment;
      "charge(uint256)": FunctionFragment;
      "fee()": FunctionFragment;
      "owner()": FunctionFragment;
      "renounceOwnership()": FunctionFragment;
      "sell(uint256)": FunctionFragment;
      "setFee(uint256)": FunctionFragment;
      "setRate(uint256)": FunctionFragment;
      "transferOwnership(address)": FunctionFragment;
      "usdPer100Amt()": FunctionFragment;
      "withdrawAll()": FunctionFragment;
    };
  
    getFunction(
      nameOrSignatureOrTopic:
        | "addrBtcb"
        | "addrUsdt"
        | "buy"
        | "charge"
        | "fee"
        | "owner"
        | "renounceOwnership"
        | "sell"
        | "setFee"
        | "setRate"
        | "transferOwnership"
        | "usdPer100Amt"
        | "withdrawAll"
    ): FunctionFragment;
  
    encodeFunctionData(functionFragment: "addrBtcb", values?: undefined): string;
    encodeFunctionData(functionFragment: "addrUsdt", values?: undefined): string;
    encodeFunctionData(
      functionFragment: "buy",
      values: [PromiseOrValue<BigNumberish>]
    ): string;
    encodeFunctionData(
      functionFragment: "charge",
      values: [PromiseOrValue<BigNumberish>]
    ): string;
    encodeFunctionData(functionFragment: "fee", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(
      functionFragment: "renounceOwnership",
      values?: undefined
    ): string;
    encodeFunctionData(
      functionFragment: "sell",
      values: [PromiseOrValue<BigNumberish>]
    ): string;
    encodeFunctionData(
      functionFragment: "setFee",
      values: [PromiseOrValue<BigNumberish>]
    ): string;
    encodeFunctionData(
      functionFragment: "setRate",
      values: [PromiseOrValue<BigNumberish>]
    ): string;
    encodeFunctionData(
      functionFragment: "transferOwnership",
      values: [PromiseOrValue<string>]
    ): string;
    encodeFunctionData(
      functionFragment: "usdPer100Amt",
      values?: undefined
    ): string;
    encodeFunctionData(
      functionFragment: "withdrawAll",
      values?: undefined
    ): string;
  
    decodeFunctionResult(functionFragment: "addrBtcb", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addrUsdt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "charge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(
      functionFragment: "renounceOwnership",
      data: BytesLike
    ): Result;
    decodeFunctionResult(functionFragment: "sell", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRate", data: BytesLike): Result;
    decodeFunctionResult(
      functionFragment: "transferOwnership",
      data: BytesLike
    ): Result;
    decodeFunctionResult(
      functionFragment: "usdPer100Amt",
      data: BytesLike
    ): Result;
    decodeFunctionResult(
      functionFragment: "withdrawAll",
      data: BytesLike
    ): Result;
  
    events: {
      "OwnershipTransferred(address,address)": EventFragment;
      "amtBought(uint256,uint256)": EventFragment;
      "charged(uint256,uint256)": EventFragment;
      "userSold(uint256,uint256)": EventFragment;
    };
  
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "amtBought"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "charged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "userSold"): EventFragment;
  }
  
  export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
  }
  export type OwnershipTransferredEvent = TypedEvent<
    [string, string],
    OwnershipTransferredEventObject
  >;
  
  export type OwnershipTransferredEventFilter =
    TypedEventFilter<OwnershipTransferredEvent>;
  
  export interface amtBoughtEventObject {
    usdtFromUser: BigNumber;
    amtToUser: BigNumber;
  }
  export type amtBoughtEvent = TypedEvent<
    [BigNumber, BigNumber],
    amtBoughtEventObject
  >;
  
  export type amtBoughtEventFilter = TypedEventFilter<amtBoughtEvent>;
  
  export interface chargedEventObject {
    snapId: BigNumber;
    amount: BigNumber;
  }
  export type chargedEvent = TypedEvent<
    [BigNumber, BigNumber],
    chargedEventObject
  >;
  
  export type chargedEventFilter = TypedEventFilter<chargedEvent>;
  
  export interface userSoldEventObject {
    amountUsdt: BigNumber;
    amtFromUser: BigNumber;
  }
  export type userSoldEvent = TypedEvent<
    [BigNumber, BigNumber],
    userSoldEventObject
  >;
  
  export type userSoldEventFilter = TypedEventFilter<userSoldEvent>;
  
  export interface Market extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
  
    interface: MarketInterface;
  
    queryFilter<TEvent extends TypedEvent>(
      event: TypedEventFilter<TEvent>,
      fromBlockOrBlockhash?: string | number | undefined,
      toBlock?: string | number | undefined
    ): Promise<Array<TEvent>>;
  
    listeners<TEvent extends TypedEvent>(
      eventFilter?: TypedEventFilter<TEvent>
    ): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(
      eventFilter: TypedEventFilter<TEvent>
    ): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
  
    functions: {
      addrBtcb(overrides?: CallOverrides): Promise<[string]>;
  
      addrUsdt(overrides?: CallOverrides): Promise<[string]>;
  
      buy(
        amountUsdt: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      charge(
        snapId: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      fee(overrides?: CallOverrides): Promise<[BigNumber]>;
  
      owner(overrides?: CallOverrides): Promise<[string]>;
  
      renounceOwnership(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      sell(
        amountAmt: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      setFee(
        _fee: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      setRate(
        _usdPer100Amt: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
  
      usdPer100Amt(overrides?: CallOverrides): Promise<[BigNumber]>;
  
      withdrawAll(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<ContractTransaction>;
    };
  
    addrBtcb(overrides?: CallOverrides): Promise<string>;
  
    addrUsdt(overrides?: CallOverrides): Promise<string>;
  
    buy(
      amountUsdt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    charge(
      snapId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    fee(overrides?: CallOverrides): Promise<BigNumber>;
  
    owner(overrides?: CallOverrides): Promise<string>;
  
    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    sell(
      amountAmt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    setFee(
      _fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    setRate(
      _usdPer100Amt: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    usdPer100Amt(overrides?: CallOverrides): Promise<BigNumber>;
  
    withdrawAll(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  
    callStatic: {
      addrBtcb(overrides?: CallOverrides): Promise<string>;
  
      addrUsdt(overrides?: CallOverrides): Promise<string>;
  
      buy(
        amountUsdt: PromiseOrValue<BigNumberish>,
        overrides?: CallOverrides
      ): Promise<void>;
  
      charge(
        snapId: PromiseOrValue<BigNumberish>,
        overrides?: CallOverrides
      ): Promise<void>;
  
      fee(overrides?: CallOverrides): Promise<BigNumber>;
  
      owner(overrides?: CallOverrides): Promise<string>;
  
      renounceOwnership(overrides?: CallOverrides): Promise<void>;
  
      sell(
        amountAmt: PromiseOrValue<BigNumberish>,
        overrides?: CallOverrides
      ): Promise<void>;
  
      setFee(
        _fee: PromiseOrValue<BigNumberish>,
        overrides?: CallOverrides
      ): Promise<void>;
  
      setRate(
        _usdPer100Amt: PromiseOrValue<BigNumberish>,
        overrides?: CallOverrides
      ): Promise<void>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: CallOverrides
      ): Promise<void>;
  
      usdPer100Amt(overrides?: CallOverrides): Promise<BigNumber>;
  
      withdrawAll(overrides?: CallOverrides): Promise<void>;
    };
  
    filters: {
      "OwnershipTransferred(address,address)"(
        previousOwner?: PromiseOrValue<string> | null,
        newOwner?: PromiseOrValue<string> | null
      ): OwnershipTransferredEventFilter;
      OwnershipTransferred(
        previousOwner?: PromiseOrValue<string> | null,
        newOwner?: PromiseOrValue<string> | null
      ): OwnershipTransferredEventFilter;
  
      "amtBought(uint256,uint256)"(
        usdtFromUser?: null,
        amtToUser?: null
      ): amtBoughtEventFilter;
      amtBought(usdtFromUser?: null, amtToUser?: null): amtBoughtEventFilter;
  
      "charged(uint256,uint256)"(
        snapId?: null,
        amount?: null
      ): chargedEventFilter;
      charged(snapId?: null, amount?: null): chargedEventFilter;
  
      "userSold(uint256,uint256)"(
        amountUsdt?: null,
        amtFromUser?: null
      ): userSoldEventFilter;
      userSold(amountUsdt?: null, amtFromUser?: null): userSoldEventFilter;
    };
  
    estimateGas: {
      addrBtcb(overrides?: CallOverrides): Promise<BigNumber>;
  
      addrUsdt(overrides?: CallOverrides): Promise<BigNumber>;
  
      buy(
        amountUsdt: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      charge(
        snapId: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      fee(overrides?: CallOverrides): Promise<BigNumber>;
  
      owner(overrides?: CallOverrides): Promise<BigNumber>;
  
      renounceOwnership(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      sell(
        amountAmt: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      setFee(
        _fee: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      setRate(
        _usdPer100Amt: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
  
      usdPer100Amt(overrides?: CallOverrides): Promise<BigNumber>;
  
      withdrawAll(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<BigNumber>;
    };
  
    populateTransaction: {
      addrBtcb(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  
      addrUsdt(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  
      buy(
        amountUsdt: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      charge(
        snapId: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      fee(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  
      owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  
      renounceOwnership(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      sell(
        amountAmt: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      setFee(
        _fee: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      setRate(
        _usdPer100Amt: PromiseOrValue<BigNumberish>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      transferOwnership(
        newOwner: PromiseOrValue<string>,
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
  
      usdPer100Amt(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  
      withdrawAll(
        overrides?: Overrides & { from?: PromiseOrValue<string> }
      ): Promise<PopulatedTransaction>;
    };
  }
  