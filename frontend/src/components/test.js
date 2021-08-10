import React from "react";
import ReactDOM from "react-dom";
import HTMLFlipBook from "react-pageflip";
import "./index.scss";

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import plaintext from 'highlight.js/lib/languages/plaintext';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('scss', scss);

const PageCover = React.forwardRef((props, ref) => {
    return (
        <div className={"page page-cover page-cover-" + props.pos} ref={ref} data-density="hard">
            <div className="page-content">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
});

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref} data-density={props.density | "soft"}>
            <div className="page-content">
                <h2 className="page-header">Page header - {props.number}</h2>
                <div
                    className="page-image"
                    style={{ backgroundImage: "url(images/html/" + props.image + ")" }}
                ></div>
                <div className="page-text">{props.children}</div>
                <div className="page-footer">{props.number + 1}</div>
            </div>
        </div>
    );
});

class DemoBlock extends React.Component {
    constructor(props) {
        super(props);

        const pages = [<PageCover key={0} pos="top">BOOK TITLE</PageCover>];

        let pageNum = 0;
        for (let i = 0; i < 100; i++) {
            pageNum++;
            if (pageNum > 8) pageNum = 1;
            pages.push(<Page key={i + 1} image={(pageNum) + ".jpg"} number={i + 1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna.</Page>);
        }

        pages.push(<PageCover key={101} pos="bottom">THE END</PageCover>);

        this.state = {
            page: 0,
            totalPage: 0,
            orientation: 'landscape',
            state: 'read',
            pages: pages
        };
    }

    nextButtonClick = () => {
        this.flipBook.getPageFlip().flipNext();
    }

    prevButtonClick = () => {
        this.flipBook.getPageFlip().flipPrev();
    }

    onPage = (e) => {
        this.setState({
            page: e.data,
        });
    }

    onChangeOrientation = (e) => {
        this.setState({
            orientation: e.data,
        });
    }

    onChangeState = (e) => {
        this.setState({
            state: e.data,
        });
    }

    componentDidMount() {
        this.setState({
            totalPage: this.flipBook.getPageFlip().getPageCount(),
        });
    }

    render() {
        return (
            <div>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item">
                            <img src="..." className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                    </div>
                    <button classNameName="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<DemoBlock />, document.getElementById("demoBlock"));

document.addEventListener('DOMContentLoaded', function () {
    const codesElement = document.querySelectorAll('code');
    for (const el of codesElement) {
        hljs.highlightBlock(el);
    }

    let isVisible = false;
    const demoSource = document.querySelector('.demo-source');

    document.querySelector('.btn-source').addEventListener('click', () => {
        if (!isVisible)
            demoSource.style.display = 'block'
        else
            demoSource.style.display = 'none'

        isVisible = !isVisible;
    });
});