import React from 'react'

export function PaddingAllOutlined () {
  return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.99998 0.999976C1.44769 0.999976 0.999976 1.44769 0.999976 1.99998V13C0.999976 13.5523 1.44769 14 1.99998 14H13C13.5523 14 14 13.5523 14 13V1.99998C14 1.44769 13.5523 0.999976 13 0.999976H1.99998ZM1.99998 1.99998L13 1.99998V13H1.99998V1.99998ZM4.49996 3.99996C4.22382 3.99996 3.99996 4.22382 3.99996 4.49996V10.5C3.99996 10.7761 4.22382 11 4.49996 11H10.5C10.7761 11 11 10.7761 11 10.5V4.49996C11 4.22382 10.7761 3.99996 10.5 3.99996H4.49996ZM4.99996 9.99996V4.99996H9.99996V9.99996H4.99996Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
}

export function PaddingBottomOutlined () {
  return <PaddingLeftOutlined style={{transform: "rotate(-90deg)"}}/>
}

export function PaddingControlsToggleOutlined () {
  return (
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M3 0h6v1H3V0zM0 3v6h1V3H0zm11 0v6h1V3h-1zm-8 9h6v-1H3v1z" fillRule="evenodd" fillOpacity=".8" fill="#000" stroke="none"></path></svg>
  )
}

export function PaddingLeftOutlined ({ style }: any) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" style={style} xmlns="http://www.w3.org/2000/svg"><path d="M0 12V0h1v12H0zm3-9h6v6H3V3zm1 1v4h4V4H4z" fillRule="evenodd" fillOpacity="1" fill="#000" stroke="none"></path></svg>
  )
}

export function PaddingLeftRightOutlined () {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M0 12V0h1v12H0zm3-9h6v6H3V3zm1 1v4h4V4H4zm7 8V0h1v12h-1z" fillRule="evenodd" fillOpacity="1" fill="#000" stroke="none"></path></svg>
  )
}

export function PaddingRightOutlined () {
  return <PaddingLeftOutlined style={{transform: "rotate(180deg)"}}/>
}

export function PaddingTopBottomOutlined () {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h6v6H3V3zm1 1v4h4V4H4zm8 8H0v-1h12v1zm0-11H0V0h12v1z" fillRule="evenodd" fillOpacity="1" fill="#000" stroke="none"></path></svg>
  )
}

export function PaddingTopOutlined () {
  return <PaddingLeftOutlined style={{transform: "rotate(90deg)"}}/>
}
