import React, { useRef } from 'react'
import styled from "styled-components";
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, StrikethroughOutlined } from '@ant-design/icons';
import useOnClickOutside from '../../../../hooks/useOnClickOutSide';

const FONT_LIST = [
    { type: <BoldOutlined/>, tag: "bold" },
    { type: <ItalicOutlined/>, tag: "italic" },
    { type: <UnderlineOutlined/>, tag: "underline" },
    { type: <StrikethroughOutlined/>, tag: "line-through" }
]

interface TextSwitcherProps {
    setIsTextSwitcher: React.Dispatch<React.SetStateAction<boolean>>
}

const TextSwitcherBox = ({setIsTextSwitcher}: TextSwitcherProps) => {

    const textSwitcherRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(textSwitcherRef, setIsTextSwitcher)

    const applyStyle = (style: string) => {
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontWeight = style === 'bold' ? 'bold' : 'normal';
        span.style.fontStyle = style === 'italic' ? 'italic' : 'normal';
        span.style.textDecoration = style === 'underline' ? 'underline' : (style === 'line-through' ? 'line-through' : 'none');
        range.surroundContents(span);
        // handleContentChange(index, blockRef.current?.innerHTML || "");
        setIsTextSwitcher(false)
        // span이 중첩으로 쌓임 
        // 새로운 방법이 필요
    };
    
    return (
        <TextSwitcherContainer ref={textSwitcherRef}>
        {FONT_LIST.map((item, idx) => (
            <TextItem key={idx} onClick={()=>applyStyle(item.tag)}>{item.type}</TextItem>
        ))}
    </TextSwitcherContainer>
    )
}

export default TextSwitcherBox


const TextSwitcherContainer = styled.div`
    position: absolute;
    z-index: 10;
    border: none;
    border-radius: 5px;
    top: -110%;
    left: 0;
    width: 200px;
    height: 30px;
    display: flex;
    box-shadow: 0 0 3px;
    overflow: hidden;
    background-color: white;
    font-weight: bold
`;

const TextItem = styled.div`
    z-index: 10;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    &:hover {
        background-color: #e0e0e0;
    }
`;
