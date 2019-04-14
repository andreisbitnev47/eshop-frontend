import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent'
import { withRouter } from 'next/router'
import ErrorMessage from './ErrorMessage'
import get from 'lodash/get';

import Link from './Link';
import A from './A';
import { Translate } from './Translate';

export const productQuery = gql`
  query productQuery($handle: String!, $language: String!) {
    productByHandle(handle: $handle) {
        id
        handle
        title(language: $language)
        price
        imgBig
        descriptionLong(language: $language)
    }
  }
`

const InnerComponent = ({ breadcrumbs }) => (
    <p className="breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => {
            if (breadcrumb.url) {
                return (
                    <span className="mr-2" key={index}>
                        <Link href={breadcrumb.url}>
                            <A href={breadcrumb.url} styles={{ color: '#f2f2f2' }}>
                                {breadcrumb.id ?
                                    <Translate id={breadcrumb.id}/> :
                                    breadcrumb.title}
                            </A>
                        </Link>
                    </span> 
                );
            } else {
                return (
                    <span key={index} style={{ color: 'white' }}>
                        {breadcrumb.id ?
                            <Translate id={breadcrumb.id}/> :
                            breadcrumb.title}
                    </span>
                );
            }
        })}
        <style jsx>{`
            @media only screen and (max-width: 991px) {
                .breadcrumbs {
                    font-size: 24px !important;
                }
            }
        `}</style>
    </p>
);

export const DynamicInnerComponent = ({ breadcrumbs, router }) => (
    <Query query={productQuery} variables={{ handle: router.query.handle, language: router.query.language }}>
      {({ loading, error, data: { productByHandle }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading posts.' />
        if (loading) return <div>Loading</div>
        const title = get(productByHandle, 'title', '');
        const updatedBreadCrumbs = breadcrumbs.map((breadcrumb) => {
            if (breadcrumb.dynamic === 'product') {
                breadcrumb.title = title;
            }
            return breadcrumb;
        })
        return <InnerComponent breadcrumbs={updatedBreadCrumbs}/>;
      }}
    </Query>
);

export const Breadcrumbs = compose(
    withRouter,
    branch(
        ({ breadcrumbs }) => breadcrumbs.find(breadcrumb => breadcrumb.dynamic === 'product'), 
        renderComponent(DynamicInnerComponent)
    )
)(InnerComponent);