import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { PageType } from "./SideBar";
import BlockEditor from "../components/BlockEditor/BlockEditor";
import TitleEditor from "../components/TitleEditor/TitleEditor";
const Page = () => {
    const { id } = useParams();
    const location = useLocation();
    const state: PageType = location.state || {};
    const { blocklist } = state;

    return (
        <PageContainer>
            <TitleEditor id={id} title={state.title}/>
            {blocklist &&
                blocklist.map((currentBlock, idx) => (
                    <BlockEditor
                        key={idx}
                        id={id}
                        type={currentBlock.type}
                        content={currentBlock.content}
                    />
                ))}
        </PageContainer>
    );
};

export default Page;

const PageContainer = styled.div`
    max-width: 100%;
    height: 100%;
`;