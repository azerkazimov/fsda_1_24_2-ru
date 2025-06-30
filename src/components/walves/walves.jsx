import "./walves.css"

export default function Walves({transform, top, left, scale}) {
    const dynamicStyles ={
        top: top,
        left: left,
        transform: transform,
        scale: scale
    }
    return (
        <div className="walves" style={dynamicStyles}>
            <img src="/walves.png" alt="walves" />
        </div>
    );
}