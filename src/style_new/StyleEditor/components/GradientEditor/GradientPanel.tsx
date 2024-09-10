import React, { useCallback, useEffect, useRef, useState } from "react";
import { computePercentage, GradientStop, interpolateColor } from "./constants";
import { uuid } from "../../../../utils";
import css from "./index.less";

export default function GradientPanel({
  gradientColor,
  stops,
  setStops,
  curElementId,
  setCurElementId,
}: {
  gradientColor: string;
  stops: GradientStop[];
  setStops: (value: GradientStop[]) => void;
  curElementId: string | null;
  setCurElementId: (value: string | null) => void;
}) {
  const [dragStartFlag, setDragStartFlag] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState(0);
  const [elementStartPosition, setElementStartPosition] = useState(0);

  const [moveMarkerEndTime, setMoveMarkerEndTime] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  // 设置渐变停止点位置
  const setGradientStopPosition = (position: number) => {
    // 更新渐变停止点的位置，并确保位置是有效的百分比
    const temp = stops;
    const index = temp.findIndex((stop) => stop.id === curElementId);
    temp[index].position = computePercentage(position);
    // 更新渐变停止点的位置，并确保位置是有效的百分比
    temp.sort((stopA, stopB) => stopA.position - stopB.position);
    setStops([...temp]);
  };

  // 添加渐变停止点
  const addGradientStop = useCallback(
    (position: number) => {
      // 确保位置是有效的百分比
      position = computePercentage(position);
      const temp = [...stops];

      // 找到新停止点应该插入的位置
      const index = temp.findIndex((stop) => stop.position > position);
      // 获取新停止点两边的停止点颜色
      const leftStop = index > 0 ? temp[index - 1] : temp[0];
      const rightStop = index !== -1 ? temp[index] : temp[temp.length - 1];

      // 创建新的停止点对象
      const newStop = {
        id: uuid(),
        position,
        color:
          position <= leftStop.position
            ? leftStop.color
            : position >= rightStop.position
            ? rightStop.color
            : interpolateColor(leftStop, rightStop, position),
      };

      // 将新停止点插入到正确的位置
      temp.splice(index === -1 ? temp.length : index, 0, newStop);
      setStops(temp);
    },
    [stops]
  );

  const onMouseDown = useCallback(
    (id: any, event: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        // 计算鼠标按下时的位置百分比
        const position = ((event.clientX - rect.left) / rect.width) * 100;
        setCurElementId(id);
        setDragStartFlag(true);
        setDragStartPosition(position);
        // 存储元素的初始位置
        const temp = [...stops];
        setElementStartPosition(
          temp.find((stop) => stop.id === id)?.position || 0
        );
      }
    },
    [stops]
  );

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!dragStartFlag) {
        return;
      }
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        // 计算鼠标移动时的新位置百分比
        const position = ((event.clientX - rect.left) / rect.width) * 100;
        const newPosition =
          elementStartPosition + (position - dragStartPosition);
        setGradientStopPosition(newPosition);
      }
    },
    [dragStartFlag, elementStartPosition, dragStartPosition, ref.current]
  );

  const onMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    setDragStartFlag(false);
    setMoveMarkerEndTime(+new Date());
    setCurElementId(null);
    event.stopPropagation();
  };

  const addMarker = (event: React.MouseEvent<HTMLDivElement>) => {
    if (moveMarkerEndTime > -1 && +new Date() - moveMarkerEndTime < 10) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const position = ((event.clientX - rect.left) / rect.width) * 100;
    addGradientStop(position);
  };

  return (
    <>
      {dragStartFlag && (
        <div
          className={css["overlay-when-drag"]}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      )}
      <div
        className={css["gradient-panel__slider"]}
        style={{ background: gradientColor }}
        onClick={addMarker}
        ref={ref}
      >
        {stops.map(
          ({ position, color, id }, index: React.Key | null | undefined) => {
            return (
              <div
                key={`${id}-${index}`}
                style={{
                  left: `${position}%`,
                  zIndex: id === curElementId ? 20 : 1,
                }}
                onMouseDown={(e) => onMouseDown(id, e)}
                onMouseUp={onMouseUp}
                onClick={(event) => event.stopPropagation()}
                className={`${css["gradient-panel__slider-marker"]} ${
                  id === curElementId
                    ? css["gradient-panel__slider-marker_active"]
                    : ""
                }`}
              >
                <div
                  id={color}
                  style={{ backgroundColor: color }}
                  className={`${css["gradient-panel__slider-marker__color"]}`}
                />
              </div>
            );
          }
        )}
      </div>
    </>
  );
}
