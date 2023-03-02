import {json} from 'react-router';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({params, context}) => {
    const {handle} = params;
    const {product} = await context.storefront.query(PRODUCT_QUERY, {
        variables: {
            handle,
        },
    });

    if (!product?.id) {
        throw new Response(null, {status: 404});
    }

    return json({
        handle,
        product,
    });
}

function PrintJson({data}){
    return (
        <details className="outline-outline-2 outline-blue-300 p-4 my-2">
            <summary>Product Json</summary>
            <pre>{JSON.stringify(data, null, 2)}</pre>

        </details>
    )
}

export default function ProductHandle() {
    const {handle, product} = useLoaderData();

    return (
        <div className="product-wrapper">
            <h2> Product Handle: {handle} </h2>
            <PrintJson data={product} />
        </div>
    );
}

const PRODUCT_QUERY = `#graphql
    query product($handle: String!) {
        product(handle: $handle) {
        id
        title
        handle
        vendor
      }
    }
`;