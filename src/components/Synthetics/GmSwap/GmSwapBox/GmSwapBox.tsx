import { msg } from "@lingui/macro";

import { useMarketsInfoData } from "context/SyntheticsStateContext/hooks/globalsHooks";
import { useLocalizedMap } from "lib/i18n";
import { getByKey } from "lib/objects";
import { getGmSwapBoxAvailableModes } from "./getGmSwapBoxAvailableModes";
import { Mode, Operation } from "./types";

import Tab from "components/Tab/Tab";
import { GmSwapBoxDepositWithdrawal } from "./GmDepositWithdrawalBox/GmDepositWithdrawalBox";
import { GmShiftBox } from "./GmShiftBox/GmShiftBox";

import "./GmSwapBox.scss";

export type GmSwapBoxProps = {
  selectedMarketAddress?: string;
  onSelectMarket: (marketAddress: string) => void;
  operation: Operation;
  mode: Mode;
  onSetMode: (mode: Mode) => void;
  onSetOperation: (operation: Operation) => void;
};

const OPERATION_LABELS = {
  [Operation.Deposit]: msg`Buy GM`,
  [Operation.Withdrawal]: msg`Sell GM`,
  [Operation.Shift]: msg`Shift GM`,
};

const MODE_LABELS = {
  [Mode.Single]: msg`Single`,
  [Mode.Pair]: msg`Pair`,
};

const OPERATIONS = [Operation.Deposit, Operation.Withdrawal, Operation.Shift];

export function GmSwapBox(p: GmSwapBoxProps) {
  const { selectedMarketAddress, operation, mode, onSetMode, onSetOperation, onSelectMarket } = p;

  const marketAddress = selectedMarketAddress;

  const marketsInfoData = useMarketsInfoData();

  const marketInfo = getByKey(marketsInfoData, marketAddress);

  const availableModes = getGmSwapBoxAvailableModes(operation, marketInfo);

  const localizedOperationLabels = useLocalizedMap(OPERATION_LABELS);
  const localizedModeLabels = useLocalizedMap(MODE_LABELS);

  return (
    <div className="App-box GmSwapBox">
      <Tab
        options={OPERATIONS}
        optionLabels={localizedOperationLabels}
        option={operation}
        onChange={onSetOperation}
        className="Exchange-swap-option-tabs"
      />

      <Tab
        options={availableModes}
        optionLabels={localizedModeLabels}
        className="GmSwapBox-asset-options-tabs"
        type="inline"
        option={mode}
        onChange={onSetMode}
      />

      {operation === Operation.Deposit || operation === Operation.Withdrawal ? (
        <GmSwapBoxDepositWithdrawal
          selectedMarketAddress={selectedMarketAddress}
          onSelectMarket={onSelectMarket}
          operation={operation}
          mode={mode}
          onSetMode={onSetMode}
          onSetOperation={onSetOperation}
        />
      ) : (
        <GmShiftBox
          selectedMarketAddress={selectedMarketAddress}
          onSelectMarket={onSelectMarket}
          onSetMode={onSetMode}
          onSetOperation={onSetOperation}
        />
      )}
    </div>
  );
}
