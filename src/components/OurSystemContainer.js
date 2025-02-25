import Title from "./title";

function OurSystemContainer({ items }) {
  return (
    <div className="ourSystemContainer">
      <div>
        <Title title="نظامنا" />
      </div>
      <div className="CardeContainer">
        {items.map((item, index) => (
          <div key={index} className="ourSystemcard">
            <div className={`cardImageContainer ${item.imageClass}`}></div>
            <h5 className="ourSystext">{item.text}</h5>
            {item.price && <h6 className="ourPrice">{item.price}</h6>}
            {item.note && <p className="ourNote">{item.price}</p>}
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurSystemContainer;
