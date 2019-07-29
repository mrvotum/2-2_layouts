import React from 'react';
import './App.css';

import products from './components/dataBase';

/******************************
 * Ваша реализация компонента
 *****************************/

const VIEW_LIST = 'view_list';
const VIEW_MODULE = 'view_module';

class Store extends React.Component {
  state = {
    viewModule: true,
  };
  constructor(props) {
    super(props);
    this.onSwitch = this.onSwitch.bind(this);
  }
  onSwitch() {
    this.setState({ viewModule: !this.state.viewModule });
  }

  getShopItems(products, cardView) {
    return products.map(product => {
      let cardProps = {
        title: product.name,
        caption: product.color,
        img: product.img,
        price: `$${product.price}`,
      };
      if (cardView) {
        return <ShopCard {...cardProps} />;
      }
      return <ShopItem {...cardProps} />;
    });
  }

  render() {
    return (
      <div>
        <div className="toolbar">
          <IconSwitch
            icon={this.state.viewModule ? VIEW_LIST : VIEW_MODULE}
            onSwitch={this.onSwitch}
          />
        </div>
        <CardsView
          layout={this.props.layout}
          cards={this.getShopItems(this.props.products, this.state.viewModule)}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Store products={products} />
      </div>
    );
  }
}

/******************************
 * Не вносить изменния ниже
 ******************************/
const Button = props => {
  const { label } = props;
  return (
    <button className="btn">
      {label}
      <span className="bg" />
    </button>
  );
};

const CardsView = props => {
  const { cards } = props;

  const renderCards = cards => {
    return cards.map((card, i) => {
      return <div key={`card-${i}`}>{card}</div>;
    });
  };

  return <div className="row">{renderCards(cards)}</div>;
};

const Icon = props => {
  const { name, size } = props;
  return (
    <i className="material-icons" style={{ fontSize: size }}>
      {name}
    </i>
  );
};

const IconSwitch = props => {
  const { icon, onSwitch } = props;
  return (
    <div className="switch-view" onClick={onSwitch}>
      <Icon size={42} name={icon} />
    </div>
  );
};

const ShopCard = props => {
  const { title, caption, img, price } = props;

  return (
    <div className="shop-card">
      <div className="title">{title}</div>
      <div className="desc">{caption}</div>
      <div className="slider">
        <figure>
          <img src={img} alt={title} />
        </figure>
      </div>

      <div className="cta">
        <div className="price">{price}</div>
        <Button label="Add to cart" />
      </div>
    </div>
  );
};

const ShopItem = props => {
  let { title, caption, img, price } = props;
  return (
    <div className="shop-item">
      <div className="thumb">
        <figure>
          <img src={img} alt={title} />
        </figure>
      </div>
      <div className="title">{title}</div>
      <div className="desc">{caption}</div>
      <div className="price">{price}</div>
      <Button label="Add to cart" />
    </div>
  );
};

export default App;