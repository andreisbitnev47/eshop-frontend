import React from 'react'

export default function({ href, classnames, children, styles }) {
    return <a 
        href={`${process.env.FRONTEND_URL}${href}`}
        className={classnames}
        style={styles}
    >{children}</a>
}