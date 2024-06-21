import React, { useRef } from 'react'
import styled from "styled-components";
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, StrikethroughOutlined } from '@ant-design/icons';
import useOnClickOutside from '../../../../hooks/useOnClickOutSide';

const FONT_LIST = [
    { type: <BoldOutlined/>, tag: "bold"},
    { type: <ItalicOutlined/>, tag: "italic"},
    { type: <UnderlineOutlined/>, tag: "underline"},
    { type: <StrikethroughOutlined/>, tag: "line-through"}
]

interface TextSwitcherProps {
    setIsTextSwitcher: React.Dispatch<React.SetStateAction<boolean>>
}

const TextSwitcherBox = ({setIsTextSwitcher}: TextSwitcherProps) => {

    const textSwitcherRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(textSwitcherRef, setIsTextSwitcher)

    const toggleStyle = (style: string, span: HTMLElement) => {
        switch (style) {
            case 'bold':
                span.style.fontWeight = span.style.fontWeight === 'bold' ? 'normal' : 'bold';
                break;
            case 'italic':
                span.style.fontStyle = span.style.fontStyle === 'italic' ? 'normal' : 'italic';
                break;
            case 'underline':
                span.style.textDecoration = span.style.textDecoration === 'underline' ? 'none' : 'underline';
                break;
            case 'line-through':
                span.style.textDecoration = span.style.textDecoration === 'line-through' ? 'none' : 'line-through';
                break;
            default:
                break;
        }
    }

    const applyStyle = (style: string) => {
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;

        const range = selection.getRangeAt(0);
        const cloneRange = range.cloneContents();
        const fragment = document.createDocumentFragment();

        const spans: HTMLElement[] = [];
        cloneRange.childNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                spans.push(node as HTMLElement);
            } else {
                const span = document.createElement('span');
                span.appendChild(node.cloneNode(true));
                spans.push(span);
            }
        });

        spans.forEach(node => {
            toggleStyle(style, node);
            fragment.appendChild(node);
        });
        range.deleteContents();
        range.insertNode(fragment);
        setIsTextSwitcher(false);
        // 블럭의 innerHTML을  디비에 저장하기
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
