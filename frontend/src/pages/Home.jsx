import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section>
            <p className="eyebrow">GBandit Test Tenant</p>
            <h1>Chess Demo</h1>
            <p className="lede">
                This frontend is served from the shared Nginx deploymenta. The API calls
                go through the Rust gateway to the tenant backend.
                This is version 23.
            </p>
            <div className="actions">
                <Link to="/health" className="btn">Check API health</Link>
                <Link to="/board" className="btn">Load board state</Link>
            </div>
        </section>
    );
}
