import mongoose from "mongoose";

export function createNewElement(type = "text", content = "") {
  return {
    _id: new mongoose.Types.ObjectId(),
    type,
    content,
  };
}

export function createNewBlock(element) {
  return {
    _id: new mongoose.Types.ObjectId(),
    columnList: [[element]],
  };
}

export function addBlock(blockList, blockIndex, block) {
  const newBlockList = [...blockList];
  newBlockList.splice(blockIndex, 0, block);
  return newBlockList;
}

export function addElement(blockList, targetIndexInfo, element) {
  const newBlockList = [...blockList];
  const { blockIndex, columnIndex, elementIndex } = targetIndexInfo;
  const block = blockList[blockIndex];
  if (!block) {
    newBlockList.splice(
      blockIndex,
      0,
      createNewBlock(element ?? createNewElement())
    );
    return newBlockList;
  }
  const column = block.columnList[columnIndex];
  if (!column) {
    block.columnList.splice(columnIndex, 0, [element ?? createNewElement()]);
    return newBlockList;
  }
  column.splice(elementIndex, 0, element ?? createNewElement());
  return newBlockList;
}

export function deleteElement(blockList, targetIndexInfo) {
  const newBlockList = [...blockList];
  const { blockIndex, columnIndex, elementIndex } = targetIndexInfo;
  const block = newBlockList[blockIndex];
  if (!block) {
    return newBlockList;
  }
  const column = block.columnList[columnIndex];
  if (!column) {
    return newBlockList;
  }
  column.splice(elementIndex, 1);

  if (column.length === 0) {
    block.columnList.splice(columnIndex, 1);
  }
  if (block.columnList.length === 0) {
    newBlockList.splice(blockIndex, 1);
  }

  return newBlockList;
}

export function moveElement(blockList, elementIndexInfo, targetIndexInfo) {
  const { blockIndex, columnIndex, elementIndex } = elementIndexInfo;
  const movedElement =
    blockList[blockIndex]?.columnList[columnIndex]?.[elementIndex];

  if (!movedElement) {
    throw new Error("Element not found");
  }

  const elementAddedBlockList = addElement(
    blockList,
    targetIndexInfo,
    movedElement
  );
  return deleteElement(elementAddedBlockList, elementIndexInfo);
}

export function indexGuard(
  blockList,
  { blockIndex, columnIndex, elementIndex }
) {
  if (blockIndex === undefined) {
    return;
  }
  const block = blockList[blockIndex];
  if (!block) {
    throw new Error("Block not found");
  }
  if (columnIndex === undefined) {
    return;
  }
  const column = block.columnList[columnIndex];
  if (!column) {
    throw new Error("Column not found");
  }
  if (elementIndex === undefined) {
    return;
  }
  const element = column[elementIndex];
  if (!element) {
    throw new Error("Element not found");
  }
}
