import { retrieveContext } from "../services/ragservice";

export async function retrieveLocal(query: string) {

    const docs =
        await retrieveContext(query);

    return docs.filter(
        doc => doc.distance < 0.45
    );
}