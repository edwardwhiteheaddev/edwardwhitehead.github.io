import { ConnectData } from "@/schemas";

export function LetsConnectSection(props: ConnectData) {
    return (
        <section className="lets-connect kyros-section">
            <h2 className="lets-connect__title">{props.title}</h2>
            <ul className="lets-connect__links" role="list">
                {props.channels.map((channel) => (
                    <li key={channel.network} className="lets-connect__item">
                        <a className="lets-connect__link" href={channel.url} target="_blank" rel="noopener noreferrer">
                            {channel.network}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="lets-connect__content" dangerouslySetInnerHTML={{ __html: props.contentHtml }} />
        </section>
    );
}
