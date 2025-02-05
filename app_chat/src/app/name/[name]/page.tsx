const paths = [
    { name: 'kim' },
    { name: 'lee' },
    { name: 'park' }
];

// 동적 경로 생성을 위한 함수
export async function generateStaticParams() {
    return paths.map(path => ({ name: path.name }));
}

// 페이지 컴포넌트
export default async function Name({ params }: { params: { name: string } }) {
    const isValid = paths.some(path => path.name === params.name);

    return (
        <main className="container">
            {isValid ? (
                <>
                    <h1 className="title">Name = &quot;{params.name}&quot;</h1>
                    <p className="msg">{params.name}님, 안녕하세요!</p>
                </>
            ) : (
                <>
                    <h1 className="title"> &quot;{params.name}&quot;</h1>
                    <p className="msg"> &quot;{params.name}&quot;은(는) 사용할 수 없습니다.</p>
                </>
            )}

            <div>
                <a href="/" className="back-link">Go Back!!</a>
            </div>
        </main>
    );
}
