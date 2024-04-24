import React, { useMemo, useState, CSSProperties, useCallback, useEffect } from 'react'
import { getRealKey } from '../../utils'
import { useStyleEditorContext } from '../..'
import { Panel, Image, ColorEditor, ReloadOutlined } from '../../components'
import css from './index.less';

interface BackgroundProps {
  value: CSSProperties
  onChange: (value: {key: string, value: any} | {key: string, value: any} []) => void
  config: {
    [key: string]: any
  }
}

const DEFAULT_CONFIG = {
  disableBackgroundColor: false,
  disableBackgroundImage: false,
  keyMap: {},
  useImportant: false
}

export function Background ({value, onChange, config}: BackgroundProps) {
  const context = useStyleEditorContext()
  const [{
    keyMap,
    useImportant,
    disableBackgroundColor,
    disableBackgroundImage,
  }] = useState({ ...DEFAULT_CONFIG, ...config })
  const [forceRenderKey, setForceRenderKey] = useState<number>(Math.random()); // 用于点击重置按钮重新渲染获取新value

  const defaultBackgroundValue: CSSProperties & Record<string, any> = useMemo(() => {
    const defaultValue = Object.assign({ }, value)
    Object.entries(defaultValue).forEach(([ key, value ] ) => {
      if (typeof value === 'string') {
        // TODO: 全局处理
        // @ts-ignore
        defaultValue[key] = value.replace(/!.*$/, '')
      }
    })

    return defaultValue
  }, [forceRenderKey]);

  const refresh = useCallback(() => {
    onChange([
      { key: "backgroundColor", value: void 0 },
      { key: "backgroundImage", value: void 0 },
      { key: "backgroundRepeat", value: void 0 },
      { key: "backgroundPosition", value: void 0 },
      { key: "backgroundSize", value: void 0 },
    ]);
    setForceRenderKey(forceRenderKey + 1);
  }, [forceRenderKey]);

  return (
    <Panel title='背景' key={forceRenderKey}>
      <Panel.Content>
        {
          disableBackgroundColor ? null : 
          <ColorEditor
            // TODO
            // @ts-ignore
            style={{ flex: 2 }}
            defaultValue={defaultBackgroundValue[getRealKey(keyMap, 'backgroundColor')] || defaultBackgroundValue.backgroundColor}
            onChange={(value) => onChange({key: getRealKey(keyMap, 'backgroundColor'), value: `${value}${useImportant ? '!important' : ''}`})}
          />
        }
        {
          disableBackgroundImage ? null : 
          <Image
            style={{ flex: 1 }}
            tip='背景图'
            defaultValue={{
              backgroundImage: defaultBackgroundValue.backgroundImage,
              backgroundRepeat: defaultBackgroundValue.backgroundRepeat,
              backgroundPosition: defaultBackgroundValue.backgroundPosition,
              backgroundSize: defaultBackgroundValue.backgroundSize,
            }}
            onChange={(value: { key: string, value: string}) => onChange({key: getRealKey(keyMap, value.key), value: `${value.value}${useImportant ? '!important' : ''}`})}
            upload={context.upload}
          />
        }
        <div className={css.icon} data-mybricks-tip={`{content:'重置背景',position:'left'}`} onClick={refresh}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="6"
            viewBox="0 0 12 6"
          >
            <path
              fill="#000"
              fill-opacity="1"
              fill-rule="nonzero"
              stroke="none"
              d="M11.5 3.5H.5v-1h11v1z"
            ></path>
          </svg>
        </div>
      </Panel.Content>
      {/* {disableBackgroundImage ? null : (
        <Panel.Content>
          <Image
            tip='背景图'
            defaultValue={{
              backgroundImage: defaultBackgroundValue.backgroundImage,
              backgroundRepeat: defaultBackgroundValue.backgroundRepeat,
              backgroundPosition: defaultBackgroundValue.backgroundPosition,
              backgroundSize: defaultBackgroundValue.backgroundSize
            }}
            onChange={(value) => onChange({key: getRealKey(keyMap, value.key), value: `${value.value}${useImportant ? '!important' : ''}`})}
            upload={context.upload}
          />
        </Panel.Content>
      )} */}
    </Panel>
  )
}
