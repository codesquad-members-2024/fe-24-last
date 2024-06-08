import { Spin } from "antd";

const Loading = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%"
        }}>
            <Spin />
        </div>
    );
};

export default Loading;
