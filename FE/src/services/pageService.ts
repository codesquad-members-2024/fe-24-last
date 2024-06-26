const serverURL = process.env.REACT_APP_API;

const getPagesData = async (tableName: string) => {
    try {
        const response = await fetch(serverURL + tableName);
        if (!response.ok) {
            throw new Error(
                `요청이 잘못되었습니다. 상태 코드: ${response.status}`
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const postNewPage = async (parentId: string | null) => {
    try {
        const response = await fetch(serverURL + "newPage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "untitled",
                blocklist: [{
                    type: "p",
                    content: "",
                    children: [],
                    }],
                parent_id: !!parentId ? parentId : null,
            }),
        });
        if (!response.ok)
            throw new Error(
                `요청이 잘못되었습니다. 상태 코드: ${response.status}`
            );

        const newPageData = await response.json();
        return newPageData;
    } catch (error) {
        console.error("Failed!! error:", error);
    }
};
// new template 생성 post 함수 

const deletePage = async (id: string) => {
    try {
        const response = await fetch(`${serverURL}delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok)
            throw new Error(
                `요청이 잘못되었습니다. 상태 코드: ${response.status}`
            );
        console.log("성공!");
    } catch (error) {
        console.error("Failed!! error:", error);
    }
};

const patchTitle = async (tableName: string, title: {title: string;}) => {
    try {
        const response = await fetch(serverURL + tableName, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(title),
        });
        if (!response.ok)
            throw new Error(
                `요청이 잘못되었습니다. 상태 코드: ${response.status}`
            );
    } catch (error) {
        console.error("Failed!! error:", error);
    }
};

const patchBlock = async (tableName: string, block: any) => {
    try {
        const response = await fetch(serverURL + tableName, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(block),
        });
        if (!response.ok)
            throw new Error(
                `요청이 잘못되었습니다. 상태 코드: ${response.status}`
            );
    } catch (error) {
        console.error("Failed!! error:", error);
    }
};

export { getPagesData, postNewPage, deletePage, patchTitle, patchBlock };
