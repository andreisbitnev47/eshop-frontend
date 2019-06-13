import { graphql } from "react-apollo";
import compose from "recompose/compose";
import branch from "recompose/branch";
import renderComponent from "recompose/renderComponent";
import { withRouter } from 'next/router'

const isLoading = props => props.data.loading;

const renderWhileLoading = component => branch(
    isLoading,
    renderComponent(component),
)

export const withQueryOptions = (query, options = {}) => Component => compose(
    withRouter,
    graphql(
        query,
        {
            skip: ({ skip }) => !!skip,
            options: ({ router }) => {
                const language = router.query.language || 'en';
                const parentResults = options || {};
                if (parentResults.variables) {
                    Object.keys(parentResults.variables).forEach((key) => {
                        if(typeof parentResults.variables[key] === 'function') {
                            parentResults.variables[key] = parentResults.variables[key]();
                        }
                    });
                }
                return ({ ...parentResults, variables: { language, ...parentResults.variables }});
            }
        }
    )
)(Component)

export const withQueryOptionsAndLoading = (query, options = {}) => Component => compose(
    withQueryOptions(query, options),
    renderWhileLoading(() => null),
)(Component);