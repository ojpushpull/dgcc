import { useLoaderData } from '@remix-run/react';
export const meta = () => {
    return {
        title: 'Hydrogen',
        descriptioon: 'A custom storefront powered by Hydrogen',
    };
};

export async function loader({context}) {
    return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index(){
    const {collections} = useLoaderData();
    console.log(collections);
    return <p>Hello from the bome pabe</p>;
}

const COLLECTIONS_QUERY = `#graphql
    query FeaturedCollections {
        collections(first: 3, query: "collection_type:smart"){
            nodes {
                id
                title
                handle
            }
        }
    }
`;