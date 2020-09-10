const LandingPageForm = () => {
    return (
        <div className="container">
            <img src={require("../../styles/images/slide-1.png")} />
            <h1>스마트폰만 있다면 언제<br/>어디서나 경험하는 고사양의 PC환경</h1>
            <style jsx>{`
                img{
                    width: 100%;
                    height: 100%;
                    opacity: 0.5;
                    box-sizing: border-box;
                }
                h1 {
                    font-family: "Apple SD Gothic";
                    font-size: 40px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: -0.17px;
                    color: #ffffff;
                    position: absolute;
                    align-text: center;
                    top: 270px
                }
                .container {
                    display: flex;
                    justify-content: center;
                    position: relative;
                    text-align: center;
                    background-color: #000000; 
                }
            `}</style>
        </div>
    );
};

export default LandingPageForm;