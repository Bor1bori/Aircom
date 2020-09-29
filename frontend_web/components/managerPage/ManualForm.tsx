const Manual = () => {
    return (
        <div className="container">
            <h1>Aircom 시작하기</h1>
            <div className="steps">
                <p>1. 아래 링크를 통해 aircom host 1.3.1.exe를 다운로드합니다. </p>
                <p>2. 다운로드 받은 파일을 설치 후, aircom 런쳐를 실행합니다.</p>
                <p>3. PC 연결 버튼을 눌러 사용자의 PC를 aircom과 연결해줍니다.</p>
                <button>Host 프로그램 다운로드</button>
                <p className="videoHeader">동영상으로 쉽게 따라해보세요.</p>
                <video controls width="500" height="300">
                    <source src="/media/cc0-videos/flower.webm"
                        type="video/webm" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </div>
            <style jsx>{`
            div, h1 {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
            }
            h1 {
                font-size: 32px;
                margin-top: 60px;
                margin-bottom: 40px;
            }
            .steps {
                width: 500px;
                justify-content: center;
            }
            p {
                font-size: 20px;
                margin-right: auto;
                margin-top: 20px;
            }
            button {
                width: 240px;
                height: 40px;
                border-radius: 20px;
                border: solid 1px #0052cc;
                font-size: 18px;
                color: #0052cc;
                background-color: #ffffff;
                margin-top: 45px;
                white-space: nowrap;
            }
            .videoHeader {
                font-size: 32px;
                margin: auto;
                margin-top: 49px;
            }
            video {
                margin-top: 40px;
                margin-bottom: 100px;
            }
            `}</style>
        </div>
    );
};

export default Manual;