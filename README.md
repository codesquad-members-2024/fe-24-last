# NOTION_TEAM_02

|                    [슈니](https://github.com/schnee98)                     |                   [우디](https://github.com/minjeongHEO)                   |
| :------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/84198371?v=4" width=200> | <img src="https://avatars.githubusercontent.com/u/96780693?v=4" width=200> |
|                                  Frontend                                  |                                  Frontend                                  |
|                             Learning by doing                              |                         가만 놔두면 다 해결 돼...                          |

### 팀 노션

[🎲 Link](https://github.com/NotionTeam02)

### 팀 이슈

[😺 Link](https://github.com/NotionTeam02/fe-notion/issues)

### 구조

[Mermaid Flowcharts - Basic Syntax](https://mermaid.js.org/syntax/flowchart.html)

```mermaid
graph TD;
    A(Article.tsx)
    B(BlockController.tsx)
    C(useBlockController.tsx)
    D(useKeyEvent.tsx)
    E(useCursorStore.tsx):::zustand
    classDef zustand fill:#f96

    F(EditableBlock.tsx)
    G(ParagraphTag)
    H(HeaderTag)
    I(UnorderedItemTag)
    J(OrderedListTag)
    K(OrderedItemTag)
    L(ImageTag)
    Z1(BlockTag.tsx)
    Z2(BlockTag.tsx)
    Z3(BlockTag.tsx)
    Z4(BlockTag.tsx)
    Z5(BlockTag.tsx)

    A-->B
    C-->B
    E-->C
    D-->C
    B-->F
    F-->G
    F-->H
    F-->I
    F-->J
    F-->L
    G-->Z1
    H-->Z2
    I-->Z3
    J-->K
    K-->Z4
    L-->Z5
```

### 팝업

```mermaid
graph TD;
    P1(AddPopup.tsx)
    P2(EditPopup.tsx)
    P3(SubPopup.tsx)
    P4(PreviewPopup.tsx)
    P5(PreviewPopup.tsx)
    Z(BlockTag.tsx)

    Z-->P1 --> P5
    Z-->P2 --> P3 --> P4
```
