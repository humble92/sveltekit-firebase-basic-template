import { browser_title } from "$lib/helpers/utils";

export async function load({ route, parent }) {
    const parentData = await parent();
    const title = browser_title(parentData, (route.id ?? '/'));

    return {
      ...parentData,
      title: title,
    };
}