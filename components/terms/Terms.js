import { isArray } from "lodash";

export const Terms = ({ title, paragraphs, subTitles }) => (
    <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
        <div className="container">
            <h2 className="mb-4" style={{ textAlign: 'center', margin: '20px 0 20px 0' }}>{title}</h2>
            <div className="row">
                {paragraphs.map((paragraph, index) => (
                    <div key={`terms_${index}`}>
                        {subTitles && Array.isArray(subTitles) && subTitles[index] && 
                            <h3>{subTitles[index]}</h3>
                        }
                        <div>
                            <p className="content_paragraph">{ paragraph }</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);