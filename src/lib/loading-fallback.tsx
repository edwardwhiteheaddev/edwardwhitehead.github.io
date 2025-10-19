export default function LoadingFallback() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            padding: '2rem'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(220, 38, 38, 0.3)',
                    borderTop: '3px solid #dc2626',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem'
                }} />
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
                    Loading projects...
                </p>
            </div>
        </div>
    );
}