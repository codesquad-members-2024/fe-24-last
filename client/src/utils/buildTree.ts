import { Page, PageTree } from "../components/SideBar";

export const buildPageTree = (pages: Page[]): PageTree[] => {
  const pageMap: { [key: string]: PageTree } = {};

  pages.forEach((page) => {
    pageMap[page._id] = { ...page, children: [] };
  });

  const rootPages = pages.reduce<PageTree[]>((acc, page) => {
    if (page.parent_id) {
      if (pageMap[page.parent_id]) {
        pageMap[page.parent_id].children.push(pageMap[page._id]);
      }
    } else {
      acc.push(pageMap[page._id]);
    }
    return acc;
  }, []);

  return rootPages;
};
