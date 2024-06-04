import { Link } from "react-router-dom";
import { getPagesData } from "../services/pageService";
import { useEffect } from "react";

const SideBar = () => {
    useEffect(() => {
        const test = async () => {
            const result = await getPagesData();
            console.log(result)
        };
        test();
    }, []);
    return (
        <>
            <div>SideBar</div>
            <Link to="/page/1">
                <li>1번 페이지</li>
            </Link>
            <Link to="/page/2">
                <li>2번 페이지</li>
            </Link>
        </>
    );
};

export default SideBar;
