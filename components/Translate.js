import React from 'react'
import { withtranslations } from '../shared/context/TranslationContext';
import compose from "recompose/compose";
import withProps from "recompose/withProps";

const InnerComponent = ({ transLatedtext }) => {
    return <>{transLatedtext}</>
}

export const Translate = compose(
    withtranslations,
    withProps(({ translations, id }) => {
        return { transLatedtext: translations.get(id) }
    })
)(InnerComponent)