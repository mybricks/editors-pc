import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";

import { ColorEditor, InputNumber } from "../../components";
import { Panel } from "../";

import css from "./index.less";
import { Radio } from "antd";
import { AddButton, MinusButton } from "./icon";
import {
  GradientEditorProps,
  GradientStop,
  defalutGradientStops,
} from "./constants";

export function GradientEditor({
  defaultValue,
  onChange,
  options = [],
}: GradientEditorProps) {
  const [gradientType, setGradientType] = useState("linear");
  const [shapeType, setShapeType] = useState("ellipse");
  const [deg, setDeg] = useState(90);
  const [stops, setStops] = useState<GradientStop[]>(
    options || defalutGradientStops
  );

  useEffect(() => {
    if (defaultValue) {
      const { type, direction, stops } = parseGradient(defaultValue);
      setGradientType(type);
      if (type === "linear" && direction) {
        setDeg(parseInt(direction));
      } else if (direction) {
        setShapeType(direction);
      }
      if (stops.length > 0) {
        setStops(stopSort(stops));
      }
    }
  }, [defaultValue]);

  const stopSort = useCallback((arr: GradientStop[]) => {
    return arr.sort(
      (a, b) => a.position && b.position && a.position - b.position
    );
  }, []);

  const addColor = useCallback(() => {
    const { color = "#ffffff", position = 50 } = stops[stops.length - 1] || {};
    setStops([
      ...stops,
      {
        // 可以继续对齐figma
        color: color,
        position: position + 1 <= 100 ? position + 1 : 100,
      },
    ]);
    handleChange();
  }, [stops]);

  const removeColor = useCallback(
    (index: number) => {
      if (stops.length < 2) return;
      setStops(stops.filter((_, i) => i !== index));
      handleChange();
    },
    [stops]
  );

  const finalValue = useMemo(() => {
    const colors = `(${
      gradientType === "linear" ? deg + "deg" : shapeType
    }${stops.map((stop) => `, ${stop.color} ${stop.position}%`).join("")})`;
    const newValue = `${gradientType}-gradient${colors}`;
    console.log("[96m [ newValue ]-102-newValue/index.tsx」 [0m", newValue);
    return newValue;
  }, [gradientType, deg, shapeType, stops]);

  const handleChange = useCallback(() => {
    if (onChange) {
      onChange(finalValue);
      console.log(
        "[96m [ finalValue ]-102-「GradientEditor/index.tsx」 [0m",
        finalValue
      );
    }
  }, [finalValue, gradientType, deg, shapeType, stops]);

  const changeProperty = useCallback(
    (property: string, value: any, index: number, isSort = false) => {
      setStops((prevStops) => {
        const temp = prevStops.map((stop, i) =>
          i === index ? { ...stop, [property]: value } : stop
        );
        return isSort ? stopSort(temp) : temp;
      });
      handleChange();
    },
    [onChange, finalValue, stops]
  );

  const changeGradientType = useCallback(
    (value: string) => {
      setGradientType(value);
      handleChange();
    },
    [onChange, handleChange]
  );
  const changeShapeType = useCallback(
    (value: string) => {
      setShapeType(value);
      handleChange();
    },
    [onChange, handleChange]
  );

  const [activeStopPosition, setActiveStopPosition] = useState<number | null>(
    null
  );
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePreviewClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = previewRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const position = Math.floor((x / rect.width) * 100);
    const newStop = { color: "#ffffff", position };
    setStops((prevStops) => {
      prevStops.push(newStop);
      return stopSort(prevStops);
    });
    setActiveStopPosition(position);
  };

  return (
    <div style={{ width: "100%", marginTop: 12 }}>
      <div
        className={css.preview}
        style={{ backgroundImage: finalValue }}
        ref={previewRef}
        onClick={handlePreviewClick}
      >
        {stops.map((stop, index) => {
          const { position, color } = stop;
          return (
            <div
              key={position + color}
              draggable="true"
              className={css.stop}
              style={{ left: `${position}%` }}
              onClick={(e) => {
                setActiveStopPosition(position);
                e.stopPropagation(); // 阻止事件冒泡
              }}
              onDragStart={(e) => {
                e.stopPropagation();
                setActiveStopPosition(position);
              }}
              onDragEnd={(e) => {
                console.log(e);
                setActiveStopPosition(null);
              }}
            >
              <div
                key={index}
                className={`${css.stopHandle} ${
                  position === activeStopPosition ? css.active : ""
                }`}
              >
                <div style={{ backgroundColor: color }}></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={css.top}>
        <RadioGroup
          options={[
            { value: "linear", label: "线性" },
            { value: "radial", label: "径向" },
          ]}
          onChange={(value) => changeGradientType(value.target.value)}
          value={gradientType}
        ></RadioGroup>
        {gradientType === "linear" ? (
          <InputNumber
            tip="渐变线方向角度"
            defaultValue={deg}
            onChange={(value) => {
              setDeg(parseInt(value));
              handleChange();
            }}
            style={{ flex: 2 }}
            type={"number"}
          />
        ) : (
          <RadioGroup
            options={[
              { value: "ellipse", label: "椭圆" },
              { value: "circle", label: "圆形" },
            ]}
            onChange={(value) => changeShapeType(value.target.value)}
            value={shapeType}
          />
        )}
        <Panel.Item style={{ width: 30, padding: 0 }} onClick={addColor}>
          <AddButton />
        </Panel.Item>
      </div>
      <div className={css.stops}>
        {stops?.length > 0 &&
          stops.map((stop, index) => {
            const { color, position } = stop;
            if (!color) return null;
            return (
              <Panel.Content
                key={color + position}
                style={{ padding: "3px 0" }}
              >
                <ColorEditor
                  defaultValue={color}
                  style={{ flex: 8 }}
                  // key={color} // 可以解决排序color不更新问题但是会导致没法一直改颜色
                  onChange={(color) => {
                    changeProperty("color", color, index);
                    setActiveStopPosition(position);
                  }}
                />
                <InputNumber
                  tip="位置"
                  defaultValue={position}
                  onChange={(position) => {
                    const newPosition = Number(position);
                    changeProperty(
                      "position",
                      newPosition > 100 ? 100 : newPosition,
                      index,
                      true
                    );
                    setActiveStopPosition(Number(newPosition));
                  }}
                  style={{ flex: 3 }}
                  type={"number"}
                  defaultUnitValue=""
                />
                <Panel.Item
                  style={{ width: 30, padding: 0 }}
                  onClick={() => removeColor(index)}
                  className={stops.length <= 2 ? css.disabled : ""}
                >
                  <MinusButton />
                </Panel.Item>
              </Panel.Content>
            );
          })}
      </div>
    </div>
  );
}

// 解析颜色
function parseGradient(gradientString: string): {
  type: string;
  direction?: string;
  stops: GradientStop[];
} {
  let match;
  let direction;

  // 匹配 linear-gradient
  match = gradientString.match(/(\d+deg),\s*(.+)/);
  if (match) {
    const direction = match[1].trim();
    const type = "linear";
    return { type, direction, stops: parseStops(match[2].trim()) };
  } else {
    // 匹配 radial-gradient
    match = gradientString.match(/radial-gradient\(([^)]+)\)\s*,?\s*(.*)/);
    if (match) {
      const match1 = match[1].split(", ");
      direction = match1[0];
      gradientString = match1[1] + match[2];
      const type = "radial";
      return { type, direction, stops: parseStops(gradientString) };
    }
  }
  return { type: "linear", stops: [] };
}

function parseStops(stopsString: string): GradientStop[] {
  const stops = [];
  const colors = stopsString.split(", ");
  let currentPercentage = 0;

  for (let i = 0; i < colors.length; i++) {
    const colorStop = colors[i].trim();
    const match = colorStop.match(/(.*)\s+(\d+)?%/);
    if (match) {
      const color = match[1];
      const position = match[2] ? parseInt(match[2], 10) : currentPercentage;
      stops.push({ color, position });
      currentPercentage = position;
    }
  }

  return stops;
}

const RadioGroup = ({
  onChange,
  value,
  options,
}: {
  onChange: (value: any) => void;
  value: string;
  options: { value: string; label: string }[];
}) => (
  <div className={css.radioGroup}>
    <Radio.Group
      options={options}
      buttonStyle={"solid"}
      onChange={onChange}
      value={value}
      optionType="button"
      size="small"
      style={{ backgroundColor: "#efefef" }}
    />
  </div>
);
