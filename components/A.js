import React from 'react'

export default function({ href, classNames, children }) {
    return <a href={`${process.env.FRONTEND_URL}${href}`} className={classNames}>{children}</a>
}