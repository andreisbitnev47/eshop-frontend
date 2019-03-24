import Link from 'next/link';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { withRouter } from 'next/router'

export const InnerComponent = ({ children, as, href, language}) => {
    const queryParam = href.indexOf('?') === -1 ? '?' : '&';
    if (as) {
        return <Link as={`/${language}${as}`} href={`${href}${queryParam}language=${language}`}>{children}</Link>
    } else {
        return <Link as={`/${language}${href}`} href={`${href}${queryParam}language=${language}`}>{children}</Link>
    }
}

export default compose(
    withRouter,
    withProps(({ router }) => ({
        language: router.query.language,
    })),
)(InnerComponent)