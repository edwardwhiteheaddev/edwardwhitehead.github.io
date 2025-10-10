import { WhyThisMattersData } from "@/schemas";

export function WhyThisMattersSection(props: WhyThisMattersData) {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>{props.title}</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>{props.details}</p>
            <div dangerouslySetInnerHTML={{ __html: props.contentHtml }} style={{ textAlign: 'center', fontSize: '1rem', lineHeight: '1.6' }} />
        </div>
    );
}