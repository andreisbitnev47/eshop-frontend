import Link from 'next/link'

export const Breadcrumbs = ({ breadcrumbs }) => (
    <p class="breadcrumbs">
        {breadcrumbs.map((breadcrumb, index) => {
            if (breadcrumb.url) {
                return (
                    <span class="mr-2" key={index}>
                        <Link href={breadcrumb.url}>
                            <a href="#">{breadcrumb.title}</a>
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
