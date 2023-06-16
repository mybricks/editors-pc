import React, { useState, useCallback, CSSProperties } from 'react'

import {
  Input,
  Panel,
  Color,
  Select,
  Toggle,
  InputNumber,
  FontSizeOutlined,
  LineHeightOutlined,
  LetterSpacingOutlined,
  TextAlignLeftOutlined,
  TextAlignRightOutlined,
  TextAlignCenterOutlined
} from '../../components'
import { useInputNumber } from '../../hooks'

interface FontProps {
  value: CSSProperties
  onChange: (value: {key: string, value: any}) => void
  config: {
    [key: string]: any
  }
}

/** 字体选项 */
const FONT_FAMILY_OPTIONS = [
  { label: '默认', value: 'inherit' }
]

/** 字体加粗(原先的需求对标的某个app，忘了) */
const FONT_WEIGHT_OPTIONS = [
  {label: '极细', value: '100'},
  {label: '特细', value: '200'},
  {label: '细', value: '300'},
  {label: '标准', value: '400'},
  {label: '中黑', value: '500'},
  {label: '中粗', value: '700'},
  {label: '特粗', value: '900'}
]

const LINEHEIGHT_UNIT_OPTIONS = [
  {label: '默认', value: 'normal'},
  {label: '倍数', value: ''},
  {label: 'px', value: 'px'},
  {label: '%', value: '%'}
]
const LINEHEIGHT_UNIT_DISABLED_LIST = ['normal']
const LETTERSPACING_UNIT_OPTIONS = [
  {label: '默认', value: 'normal'},
  {label: 'px', value: 'px'}
]
const LETTERSPACING_UNIT_DISABLED_LIST = ['normal']

const DEFAULT_CONFIG = {
  disableTextAlign: false
}

export function Font ({value, onChange, config}: FontProps) {
  const [cfg] = useState(Object.assign(DEFAULT_CONFIG, config))

  const fontFamilyOptions = useCallback(() => {
    return FONT_FAMILY_OPTIONS
  }, [])

  const getTextAlignOptions = useCallback(() => {
    const useStart = ['start', 'end'].includes(value.textAlign as any)

    return [
      { label: <TextAlignLeftOutlined />, value: useStart ? 'start' : 'left' },
      { label: <TextAlignCenterOutlined />, value: 'center' },
      { label: <TextAlignRightOutlined />, value: useStart ? 'end' : 'right' }
    ]
  }, [])

  return (
    <Panel title='字体'>
      <Panel.Content>
        <Select
          style={{flex: '1 1 0%', padding: 0}}
          defaultValue={value.fontFamily}
          options={fontFamilyOptions()}
          onChange={(value) => onChange({key: 'fontFamily', value})}
        />
        <Color
          style={{width: 98}}
          defaultValue={value.color}
          onChange={(value) => onChange({key: 'color', value})}
        />
      </Panel.Content>
      <Panel.Content>
        <Select
          style={{flex: '1 1 0%', padding: 0}}
          defaultValue={value.fontWeight}
          options={FONT_WEIGHT_OPTIONS}
          onChange={(value) => onChange({key: 'fontWeight', value})}
        />
        <InputNumber
          style={{width: 60}}
          prefix={<FontSizeOutlined />}
          defaultValue={value.fontSize}
          onChange={(value) => onChange({key: 'fontSize', value})}
        />
      </Panel.Content>
      <Panel.Content>
        <InputNumber
          prefix={<LineHeightOutlined />}
          defaultValue={value.lineHeight}
          defaultUnitValue=''
          unitOptions={LINEHEIGHT_UNIT_OPTIONS}
          unitDisabledList={LINEHEIGHT_UNIT_DISABLED_LIST}
          onChange={(value) => onChange({key: 'lineHeight', value})}
        />
        <InputNumber
          prefix={<LetterSpacingOutlined />}
          defaultValue={value.letterSpacing}
          unitOptions={LETTERSPACING_UNIT_OPTIONS}
          unitDisabledList={LETTERSPACING_UNIT_DISABLED_LIST}
          onChange={(value) => onChange({key: 'letterSpacing', value})}
        />
      </Panel.Content>
      {cfg.disableTextAlign ? null : (
        <Panel.Content>
          <Toggle
            defaultValue={value.textAlign}
            options={getTextAlignOptions()}
            onChange={(value) => onChange({key: 'textAlign', value})}
          />
        </Panel.Content>
      )}
    </Panel>
  )
}
