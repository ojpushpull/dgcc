import {json} from 'react-router';
import { useLoaderData } from '@remix-run/react';

export const loader = ({params}) => {
    const {handle} = params;

    return json({
        handle
    });
}

export default function ProductHandle() {
    const {handle} = useLoaderData();

    return (
        <div className="product-wrapper">
            <h2> Product Handle: {handle} </h2>
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