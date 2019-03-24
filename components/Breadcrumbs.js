import Link from './Link';
import A from './A';

export const Breadcrumbs = ({ breadcrumbs }) => (
    <p className="breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => {
            if (breadcrumb.url) {
                return (
                    <span className="mr-2" key={index}>
                        <Link href={breadcrumb.url}>
                            <A href={breadcrumb.url}>{breadcrumb.title}</A>
                        </Link>
                    </span> 
                );
            } else {
                return (
                    <span key={index}>{breadcrumb.title}</span>
                );
            }
        })}
    </p>
);
