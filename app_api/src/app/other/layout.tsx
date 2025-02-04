import './style.css';

export default function OtherLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
            <body>
                <h1 className="header">Sample Web Application</h1>
                {children}
                <div className="footer">
                    <hr/>
                    <p className="footer-cotent">
                        copyright 2025 Kim.
                    </p>
                </div>
            </body>
        </html>
    );
}