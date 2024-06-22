import React, { useRef } from "react";
import {
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    StrikethroughOutlined,
} from "@ant-design/icons";
import useOnClickOutside from "../../../../hooks/useOnClickOutSide";
import * as S from "../../../../styles/TextSwitcherBoxStyle"

const FONT_LIST = [
    { type: <BoldOutlined />, tag: "bold" },
    { type: <ItalicOutlined />, tag: "italic" },
    { type: <UnderlineOutlined />, tag: "underline" },
    { type: <StrikethroughOutlined />, tag: "line-through" },
];

interface TextSwitcherProps {
    setIsTextSwitcher: React.Dispatch<React.SetStateAction<boolean>>;
    index: number;
    handleContentChange: (index: number, newContent: string) => void;
    blockRef: React.RefObject<HTMLDivElement>;
}

const TextSwitcherBox = ({
    setIsTextSwitcher,
    index,
    handleContentChange,
    blockRef,
}: TextSwitcherProps) => {
    const textSwitcherRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(textSwitcherRef, () => setIsTextSwitcher(false));

    const toggleStyle = (style: string, span: HTMLElement) => {
        switch (style) {
            case "bold":
                span.style.fontWeight = span.style.fontWeight === "bold" ? "normal" : "bold";
                break;
            case "italic":
                span.style.fontStyle = span.style.fontStyle === "italic" ? "normal" : "italic";
                break;
            case "underline":
                span.style.textDecoration = span.style.textDecoration === "underline" ? "none" : "underline";
                break;
            case "line-through":
                span.style.textDecoration = span.style.textDecoration === "line-through" ? "none" : "line-through";
                break;
            default:
                break;
        }
    };

    const applyStyle = (style: string) => {
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;

        const range = selection.getRangeAt(0);
        const { startContainer, endContainer } = range;

        if (
            startContainer.parentNode === endContainer.parentNode &&
            startContainer.nodeType === Node.TEXT_NODE &&
            startContainer.parentElement?.tagName === "SPAN"
        ) {
            const parent = startContainer.parentNode as HTMLElement;
            toggleStyle(style, parent);
            updateInnerHTML()
            return;
        }

        const fragment = document.createDocumentFragment();
        const cloneRange = range.cloneContents();

        cloneRange.childNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                toggleStyle(style, node as HTMLElement);
                fragment.appendChild(node.cloneNode(true));
            } else {
                const span = document.createElement("span");
                span.appendChild(node.cloneNode(true));
                toggleStyle(style, span);
                fragment.appendChild(span);
            }
        });

        range.deleteContents();
        range.insertNode(fragment);
        updateInnerHTML()
    };

    const updateInnerHTML = () => {
        const innerHtml = blockRef.current?.innerHTML
            ? blockRef.current.innerHTML
            : "";
        handleContentChange(index, innerHtml);
        setIsTextSwitcher(false);
    }

    return (
        <S.TextSwitcherContainer ref={textSwitcherRef}>
            {FONT_LIST.map((item, idx) => (
                <S.TextItem key={idx} onClick={() => applyStyle(item.tag)}>
                    {item.type}
                </S.TextItem>
            ))}
        </S.TextSwitcherContainer>
    );
};

export default TextSwitcherBox;

