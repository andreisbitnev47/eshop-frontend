import React from 'react';
import graphql from "graphql-tag";
import PropTypes from 'prop-types';
import compose from "recompose/compose";
import withProps from "recompose/withProps";
import withContext from "recompose/withContext";
import getContext from "recompose/getContext";
import setDisplayName from "recompose/setDisplayName";
import { withQueryOptionsAndLoading } from '../hocs/customQuery';
import { get } from 'https';

const TRANSLATIONS_QUERY = graphql`
    query translations($language: String!) {
        translations{
            id
            key
            translation(language: $language)
        }
    }
`

const contextOptions = { translations: PropTypes.object }

export const TranslationsProvider = compose(
    setDisplayName('TranslationsProvider'),
    withQueryOptionsAndLoading(TRANSLATIONS_QUERY),
    withProps(({ data }) => ({ translationsArr: data.translations })),
    withContext(
        contextOptions,
        ({ translationsArr }) => {
            return { translations: new Map(translationsArr.map(({ key, translation }) => [key, translation])) };
        }
    )
)(props => React.Children.only(props.children));

export const withtranslations = compose(
    getContext(contextOptions),
    withContext(contextOptions, ({ translations }) => {
        return { translations }
    }),
);