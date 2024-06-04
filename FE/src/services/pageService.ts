const serverURL = process.env.REACT_APP_API;

const getPagesData = async () => {
    try {
        const response = await fetch(serverURL + "pagesList");
        if (!response.ok) {
            throw new Error(`요청이 잘못되었습니다. 상태 코드: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const postNewPage = async () => {
    try {
        const response = await fetch(serverURL + "pagesList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "",
                blocklist: [],
                parent_id: null,
            }),
        });
        if (!response.ok) {
            throw new Error(`요청이 잘못되었습니다. 상태 코드: ${response.status}`);
        } else {
            console.log("성공");
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("Failed to submit new Pages:", error);
    }
};

export { getPagesData, postNewPage };
