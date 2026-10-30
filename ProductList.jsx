
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

export const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      ['Snake Plant', 299],
      ['Peace Lily', 349],
      ['Areca Palm', 499],
      ['Spider Plant', 249],
      ['Rubber Plant', 399],
      ['Dracaena', 379]
    ]
  },
  {
    category: 'Aromatic Plants',
    plants: [
      ['Lavender', 299],
      ['Rosemary', 199],
      ['Mint', 99],
      ['Jasmine', 249],
      ['Lemon Balm', 179],
      ['Basil', 129]
    ]
  },
  {
    category: 'Decorative Plants',
    plants: [
      ['Monstera', 599],
      ['Golden Pothos', 229],
      ['ZZ Plant', 449],
      ['Calathea', 429],
      ['Fiddle Leaf Fig', 699],
      ['Chinese Money Plant', 329]
    ]
  }
];

const plantImages = [
  'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=600',
  'https://images.unsplash.com/photo-1597055181300-c6c0e4e4a3d7?w=600',
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600',
  'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=600',
  'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600',
  'https://images.unsplash.com/photo-1600411832986-5a447a9e4b3c?w=600'
];

export default function ProductList({ onNavigate = () => {} }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  const cartQuantity = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const addedToCart = Object.fromEntries(
    cart.map(item => [item.name, true])
  );

  return (
    <>
      <nav className="navbar">
        <b onClick={() => onNavigate('home')}>
          🌿 Paradise Nursery
        </b>
        <div>
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => onNavigate('plants')}>Plants</button>
          <button onClick={() => onNavigate('cart')}>
            🛒 Cart ({cartQuantity})
          </button>
        </div>
      </nav>

      <main className="page">
        <header>
          <small>FIND YOUR GREEN</small>
          <h1>Our Plants</h1>
        </header>

        {plantsArray.map((category, categoryIndex) => (
          <section className="product-list" key={category.category}>
            <h2>{category.category}</h2>

            <div className="grid">
              {category.plants.map(([name, price], index) => {
                const image = plantImages[
                  (categoryIndex * 6 + index) % plantImages.length
                ];

                const plant = { name, price, cost: price, image };

                return (
                  <article className="plant" key={name}>
                    <img
                      src={image}
                      alt={name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '7px'
                      }}
                    />

                    <h3>{name}</h3>
                    <p>Beautiful, easy-care plant for your home.</p>
                    <b>₹{price}</b>

                    <button
                      disabled={!!addedToCart[name]}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {addedToCart[name]
                        ? 'Added to Cart'
                        : 'Add to Cart'}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
