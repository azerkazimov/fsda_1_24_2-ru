import Button from "../ui/button/button";
import "./event-card.css"

export default function EventCard({event}) {
    return (
        <div className="event-card">
            <div className="event-card-overlay"></div>
            <img src={event?.img} alt="cup" className="card-image"/>
            <h3 className="card-title">{event?.title}</h3>
            <Button>More</Button>
        </div>
    );
}