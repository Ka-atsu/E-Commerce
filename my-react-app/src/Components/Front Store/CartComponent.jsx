import React, { useEffect, useState, useCallback } from 'react';

const CartComponent = ({ setCartCount }) => {
    const [cart, setCart] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);

    const fetchCart = useCallback(async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/cart'); // Adjust the endpoint as necessary
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            const data = await response.json();
            setCart(data.cart || []); // Ensure cart is an array
            
            // Calculate grand total
            const total = (data.cart || []).reduce((acc, item) => {
                const price = parseFloat(item.amount) || 0; // Convert to number
                return acc + (price * item.quantity);
            }, 0);
            setGrandTotal(total);

            // Count unique products (not quantity)
            const uniqueProductCount = data.cart.filter((item, index, self) =>
                index === self.findIndex((t) => t.id === item.id) // Count only unique products
            ).length;
            setCartCount(uniqueProductCount); // Set unique product count
        } catch (error) {
            console.error(error);
        }
    }, [setCartCount]);

    useEffect(() => {
        fetchCart(); // Call fetchCart when the component mounts
    }, [fetchCart]);

    const handleRemove = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/cart/remove/${id}`, { // Adjusted endpoint
                method: 'DELETE',
            });
            fetchCart(); // Refresh the cart
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateQuantity = async (id, quantity) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/cart/update/${id}`, { // Adjusted endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });
            fetchCart(); // Refresh the cart
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <p>Total unique items in cart: {cart.filter((item, index, self) =>
                        index === self.findIndex((t) => t.id === item.id) // Count only unique products
                    ).length}</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price per Item</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => {
                                const price = parseFloat(item.amount) || 0; // Convert amount to number
                                const totalPrice = price * item.quantity; // Calculate total price

                                return (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                            />
                                        </td>
                                        <td>${price.toFixed(2)}</td>
                                        <td>${totalPrice.toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
        </div>
    );
};

export default CartComponent;