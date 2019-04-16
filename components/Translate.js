import React from 'react'
import { withtranslations } from '../shared/context/TranslationContext';
import compose from "recompose/compose";
import withProps from "recompose/withProps";

const InnerComponent = ({ transLatedtext }) => {
    return <>{transLatedtext}</>
}

export const Translate = compose(
    withtranslations,
    withProps(({ translations, id, variables }) => {
        let transLatedtext = translations.get(id) || id;
        if (variables) {
            Object.keys.forEach((key) => {
                transLatedtext = transLatedtext.split(`{{${key}}}`).join(variables.key);
            });
        }
        return { transLatedtext }
    })
)(InnerComponent)