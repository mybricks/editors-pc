import React, { useState, CSSProperties } from "react";

import {
  Panel,
  InputNumber,
  WidthOutlined,
  HeightOutlined,
  MaxWidthOutlined,
  MaxHeightOutlined,
  MinWidthOutlined,
  MinHeightOutlined,
} from "../../components";

import type { ChangeEvent, PanelBaseProps } from "../../type";

const UNIT_OPTIONS = [
  { label: "%", value: "%" },
  { label: "px", value: "px" },
  { label: "继承", value: "inherit" },
  { label: "默认", value: "auto" },
];
const UNIT_DISABLED_LIST = ["auto", "inherit"];

interface SizeProps extends PanelBaseProps {
  value: CSSProperties;
  onChange: ChangeEvent;
}

const DEFAULT_CONFIG = {
  disableWidth: false,
  disableHeight: false,
  disableMaxWidth: true,
  disableMaxHeight: true,
  disableMinWidth: true,
  disableMinHeight: true,
};

export function Size({ value, onChange, config, showTitle, collapse }: SizeProps) {
  const [cfg] = useState({ ...DEFAULT_CONFIG, ...config });
  // console.warn("Size", value, cfg.disableWidth, cfg.disableHeight);
  return (
    <Panel title="尺寸" showTitle={showTitle} collapse={collapse}>
      {!(cfg.disableWidth && cfg.disableHeight) && (
        <Panel.Content>
          {cfg.disableWidth ? null : (
            <InputNumber
              tip="宽"
              prefix={<WidthOutlined />}
              prefixTip={"宽"}
              defaultValue={value.width}
              unitOptions={UNIT_OPTIONS}
              unitDisabledList={UNIT_DISABLED_LIST}
              onChange={(value) => onChange({ key: "width", value })}
              showIcon={true}
            />
          )}
          {cfg.disableHeight ? null : (
            <InputNumber
              tip="高"
              prefix={<HeightOutlined />}
              prefixTip={"高"}
              defaultValue={value.height}
              unitOptions={UNIT_OPTIONS}
              unitDisabledList={UNIT_DISABLED_LIST}
              onChange={(value) => onChange({ key: "height", value })}
              showIcon={true}
            />
          )}
        </Panel.Content>
      )}
      {!(cfg.disableMaxWidth && cfg.disableMaxHeight) && (
        <Panel.Content>
          {cfg.disableMaxWidth ? null : (
            <InputNumber
              tip="最大宽"
              prefix={<MaxWidthOutlined />}
              prefixTip={"最大宽"}
              defaultValue={value.maxWidth}
              unitOptions={UNIT_OPTIONS}
              unitDisabledList={UNIT_DISABLED_LIST}
              onChange={(value) => onChange({ key: "max-width", value })}
              showIcon={true}
            />
          )}
          {cfg.disableMaxHeight ? null : (
            <InputNumber
              tip="最大高"
              prefix={<MaxHeightOutlined />}
              prefixTip={"最大高"}
              defaultValue={value.maxHeight}
              unitOptions={UNIT_OPTIONS}
              unitDisabledList={UNIT_DISABLED_LIST}
              onChange={(value) => onChange({ key: "max-height", value })}
              showIcon={true}
            />
          )}
        </Panel.Content>
      )}
      {!(cfg.disableMinWidth && cfg.disableMinHeight) && (
        <Panel.Content>
          {cfg.disableMinWidth ? null : (
            <InputNumber
              tip="最小宽"
              prefix={<MinWidthOutlined />}
              prefixTip={"最小宽"}
              defaultValue={value.minWidth}
              unitOptions={UNIT_OPTIONS}
              unitDisabledList={UNIT_DISABLED_LIST}
              onChange={(value) => onChange({ key: "min-width", value })}
              showIcon={true}
            />
          )}
          {cfg.disableMinHeight ? null : (
            <InputNumber
              tip="最小高"
              prefix={<MinHeightOutlined />}
              prefixTip={"最小高"}
              defaultValue={value.minHeight}
              unitOptions={UNIT_OPTIONS}
              unitDisabledList={UNIT_DISABLED_LIST}
              onChange={(value) => onChange({ key: "min-height", value })}
              showIcon={true}
            />
          )}
        </Panel.Content>
      )}
    </Panel>
  );
}
