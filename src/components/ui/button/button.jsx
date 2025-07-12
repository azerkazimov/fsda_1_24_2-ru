import "./button.css"

export default function Button({children , className='btn-primary'}) {
    return (
        <button className={`btn ${className}`}>
            {children}
        </button>
    );
}